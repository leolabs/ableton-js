import os from "os";
import path from "path";
import dgram from "dgram";
import { truncate } from "lodash";
import { EventEmitter } from "events";
import { v4 } from "uuid";
import semver from "semver";
import { unzipSync, deflateSync } from "zlib";
import LruCache from "lru-cache";
import { unwatchFile, watchFile } from "fs";
import { readFile, writeFile } from "fs/promises";
import pLimit from "p-limit";

import { Song } from "./ns/song";
import { Internal } from "./ns/internal";
import { Application } from "./ns/application";
import { Midi } from "./ns/midi";
import { getPackageVersion } from "./util/package-version";
import { Cache, isCached, CacheResponse } from "./util/cache";
import { Logger } from "./util/logger";
import { Session } from "./ns/session";

const SERVER_PORT_FILE = "ableton-js-server.port";
const CLIENT_PORT_FILE = "ableton-js-client.port";

const limit = pLimit(200);

interface Command {
  uuid: string;
  ns: string;
  nsid?: string;
  name: string;
  etag?: string;
  cache?: boolean;
  args?: { [k: string]: any };
}

interface Response {
  uuid: string;
  event: "result" | "error" | "connect" | "disconnect" | string;
  data: any;
}

type DisconnectEventType = "realtime" | "heartbeat";
type ConnectEventType = DisconnectEventType | "start";

interface EventMap {
  connect: [ConnectEventType];
  disconnect: [DisconnectEventType];
  raw_message: [string];
  message: [any];
  error: [Error];
  ping: [number];
}

export interface EventListener {
  prop: string;
  eventId: string;
  listener: (data: any) => any;
}

export class TimeoutError extends Error {
  constructor(
    public message: string,
    public payload: Command,
  ) {
    super(message);
  }
}

export class DisconnectError extends Error {
  constructor(
    public message: string,
    public payload: Command,
  ) {
    super(message);
  }
}

export interface AbletonOptions {
  /**
   * Name of the file containing the port of the Remote Script. This
   * file is expected to be in the OS' tmp directory.
   *
   * @default ableton-js-server.port
   */
  serverPortFile?: string;

  /**
   * Name of the file containing the port of the client. This file
   * is created in the OS' tmp directory if it doesn't exist yet.
   *
   * @default ableton-js-client.port
   */
  clientPortFile?: string;

  /**
   * Defines how regularly ableton-js should ping the Remote Script
   * to check if it's still reachable, in milliseconds.
   *
   * @default 2000
   */
  heartbeatInterval?: number;

  /**
   * Defines how long ableton-js waits for an answer from the Remote
   * Script after sending a command before throwing a timeout error.
   *
   * @default 2000
   */
  commandTimeoutMs?: number;

  /**
   * Defines how long ableton-js waits for an answer from the Remote
   * Script after sending a command logging a warning about the delay.
   *
   * @default 1000
   */
  commandWarnMs?: number;

  /**
   * Options for the response cache.
   */
  cacheOptions?: LruCache.Options<string, any>;

  /**
   * Completely disables the cache.
   */
  disableCache?: boolean;

  /**
   * Set this to allow ableton-js to log messages. If you set this to
   * `console`, log messages are printed to the standard output.
   */
  logger?: Logger;
}

export class Ableton extends EventEmitter<EventMap> {
  private client: dgram.Socket | undefined;
  private msgMap = new Map<
    string,
    {
      res: (data: any) => any;
      rej: (data: any) => any;
      clearTimeout: () => any;
    }
  >();
  private timeoutMap = new Map<number, () => unknown>();
  private eventListeners = new Map<string, Array<(data: any) => any>>();
  private heartbeatInterval: NodeJS.Timeout | undefined;
  private _isConnected = false;
  private buffer: Buffer[][] = [];
  private latency: number = 0;
  private messageId: number = 0;

  private serverPort: number | undefined;

  public cache?: Cache;
  public song = new Song(this);
  public session = new Session(this); // added for red session ring control
  public application = new Application(this);
  public internal = new Internal(this);
  public midi = new Midi(this);

  private clientPortFile: string;
  private serverPortFile: string;
  private logger: Logger | undefined;
  private clientState: "closed" | "starting" | "started" = "closed";
  private cancelDisconnectEvents: Array<() => unknown> = [];

  constructor(private options?: AbletonOptions) {
    super();

    this.logger = options?.logger;

    if (!options?.disableCache) {
      this.cache = new LruCache<string, any>({
        max: 500,
        ttl: 1000 * 60 * 10,
        ...options?.cacheOptions,
      });
    }

    this.clientPortFile = path.join(
      os.tmpdir(),
      this.options?.clientPortFile ?? CLIENT_PORT_FILE,
    );

    this.serverPortFile = path.join(
      os.tmpdir(),
      this.options?.serverPortFile ?? SERVER_PORT_FILE,
    );
  }

  private handleConnect(type: ConnectEventType) {
    if (!this._isConnected) {
      this._isConnected = true;
      this.logger?.info("Live connected", { type });
      this.emit("connect", type);
    }
  }

  private handleDisconnect(type: DisconnectEventType) {
    if (this._isConnected) {
      this._isConnected = false;
      this.eventListeners.clear();

      // If the disconnect is caused by missed heartbeats, keep
      // pending requests. Live might just be temporarily hanging.
      if (type === "realtime") {
        this.msgMap.forEach((msg) => msg.clearTimeout());
        this.msgMap.clear();
      }

      this.logger?.info("Live disconnected", { type });
      this.emit("disconnect", type);
    }
  }

  /**
   * If connected, returns immediately. Otherwise,
   * it waits for a connection event before returning.
   */
  async waitForConnection() {
    if (this._isConnected) {
      return;
    } else {
      return Promise.race([
        new Promise((res) => this.once("connect", res)),
        this.internal.get("ping").catch(() => new Promise(() => {})),
      ]);
    }
  }

  /**
   * Starts the server and waits for a connection with Live to be established.
   *
   * @param timeoutMs
   * If set, the function will throw an error if it can't establish a connection
   * in the given time. Should be higher than 2000ms to avoid false positives.
   */
  async start(timeoutMs?: number) {
    if (this.clientState !== "closed") {
      this.logger?.warn(
        "Tried calling start, but client is already " + this.clientState,
      );
      return this.waitForConnection();
    }

    this.clientState = "starting";

    // The recvBufferSize is set to macOS' default value, so the
    // socket behaves the same on Windows and doesn't drop any packets
    this.client = dgram.createSocket({ type: "udp4", recvBufferSize: 786896 });
    this.client.addListener("message", this.handleIncoming.bind(this));

    this.client.addListener("listening", async () => {
      const port = this.client?.address().port;
      this.logger?.info("Client is bound and listening", { port });

      // Write used port to a file so Live can read from it on startup
      await writeFile(this.clientPortFile, String(port));
    });

    this.client.bind(undefined, "127.0.0.1");

    // Wait for the server port file to exist
    const sentPort = await new Promise<boolean>(async (res) => {
      try {
        const serverPort = await readFile(this.serverPortFile);
        this.serverPort = Number(serverPort.toString());
        this.logger?.info("Server port:", { port: this.serverPort });
        res(false);
      } catch (e) {
        this.logger?.info(
          "Server doesn't seem to be online yet, waiting for it to go online...",
        );
      }

      // Set up a watcher in case the server port changes
      watchFile(this.serverPortFile, async (curr) => {
        if (curr.isFile()) {
          const serverPort = await readFile(this.serverPortFile);
          const newPort = Number(serverPort.toString());

          if (!isNaN(newPort) && newPort !== this.serverPort) {
            this.logger?.info("Server port changed:", { port: newPort });
            this.serverPort = Number(serverPort.toString());

            if (this.client) {
              try {
                const port = this.client.address().port;
                this.logger?.info("Sending port to Live:", { port });
                await this.setProp("internal", "", "client_port", port);
                res(true);
                return;
              } catch (e) {
                this.logger?.info("Sending port to Live failed", { e });
              }
            }
          }

          res(false);
        }
      });
    });

    // Send used port to Live in case the plugin is already started
    if (!sentPort) {
      try {
        const port = this.client.address().port;
        this.logger?.info("Sending port to Live:", { port });
        await this.setProp("internal", "", "client_port", port);
      } catch (e) {
        this.logger?.info("Live doesn't seem to be loaded yet, waiting...");
      }
    }

    this.logger?.info("Checking connection...");
    const connection = this.waitForConnection();

    if (timeoutMs) {
      const timeout = new Promise((_, rej) =>
        setTimeout(() => rej("Connection timed out."), timeoutMs),
      );
      await Promise.race([connection, timeout]);
    } else {
      await connection;
    }

    this.logger?.info("Got connection!");

    this.clientState = "started";
    this.handleConnect("start");

    const heartbeat = async () => {
      // Add a cancel function to the array of heartbeats
      let canceled = false;
      const cancel = () => {
        canceled = true;
        this.logger?.debug("Cancelled heartbeat");
      };
      this.cancelDisconnectEvents.push(cancel);

      try {
        await this.internal.get("ping");
        this.handleConnect("heartbeat");
      } catch (e) {
        // If the heartbeat has been canceled, don't emit a disconnect event
        if (!canceled && this._isConnected) {
          this.logger?.warn("Heartbeat failed:", { error: e, canceled });
          this.handleDisconnect("heartbeat");
        }
      } finally {
        this.cancelDisconnectEvents = this.cancelDisconnectEvents.filter(
          (e) => e !== cancel,
        );
      }
    };

    this.heartbeatInterval = setInterval(
      heartbeat,
      this.options?.heartbeatInterval ?? 2000,
    );
    heartbeat();

    this.internal
      .get("version")
      .then((v) => {
        const jsVersion = getPackageVersion();
        if (semver.lt(v, jsVersion)) {
          this.logger?.warn(
            `The installed version of your AbletonJS plugin (${v}) is lower than the JS library (${jsVersion}).`,
            "Please update your AbletonJS plugin to the latest version: https://git.io/JvaOu",
          );
        }
      })
      .catch(() => {});
  }

  /** Closes the client */
  async close() {
    this.logger?.info("Closing the client");
    unwatchFile(this.serverPortFile);

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    if (this.client) {
      const closePromise = new Promise((res) =>
        this.client?.once("close", res),
      );
      this.client.close();
      await closePromise;
    }

    this.clientState = "closed";
    this._isConnected = false;
    this.logger?.info("Client closed");
  }

  /**
   * Returns the latency between the last command and its response.
   * This is a rough measurement, so don't rely too much on it.
   */
  getPing() {
    return this.latency;
  }

  private setPing(latency: number) {
    this.latency = latency;
    this.emit("ping", this.latency);
  }

  private handleIncoming(msg: Buffer, info: dgram.RemoteInfo) {
    try {
      const messageId = msg[0];
      const messageIndex = msg[1];
      const totalMessages = msg[2];
      const message = msg.subarray(3);

      // Reset the timeout when receiving a new message
      this.timeoutMap.get(messageId)?.();

      if (messageIndex === 0 && totalMessages === 1) {
        this.handleUncompressedMessage(unzipSync(message).toString());
        return;
      }

      if (!this.buffer[messageId]) {
        this.buffer[messageId] = [];
      }

      this.buffer[messageId][messageIndex] = message;

      if (this.buffer[messageId].filter(Boolean).length === totalMessages) {
        this.handleUncompressedMessage(
          unzipSync(Buffer.concat(this.buffer[messageId])).toString(),
        );
        delete this.buffer[messageId];
      }
    } catch (e) {
      this.buffer = [];
      this.emit("error", e as Error);
    }
  }

  private handleUncompressedMessage(msg: string) {
    this.emit("raw_message", msg);
    const data: Response = JSON.parse(msg);
    const functionCallback = this.msgMap.get(data.uuid);

    this.emit("message", data);

    if (data.event === "result" && functionCallback) {
      this.msgMap.delete(data.uuid);
      return functionCallback.res(data.data);
    }

    if (data.event === "error" && functionCallback) {
      this.msgMap.delete(data.uuid);
      return functionCallback.rej(new Error(data.data));
    }

    if (data.event === "disconnect") {
      return this.handleDisconnect("realtime");
    }

    if (data.event === "connect") {
      // If some heartbeat ping from the old connection is still pending,
      // cancel it to prevent a double disconnect/connect event.
      this.cancelDisconnectEvents.forEach((cancel) => cancel());

      if (data.data?.port && data.data?.port !== this.serverPort) {
        this.logger?.info("Got new server port via connect:", {
          port: data.data.port,
        });
        this.serverPort = data.data.port;
      }

      return this.handleConnect(
        this.clientState === "starting" ? "start" : "realtime",
      );
    }

    const eventCallback = this.eventListeners.get(data.event);
    if (eventCallback) {
      return eventCallback.forEach((cb) => cb(data.data));
    }

    if (data.uuid) {
      this.logger?.warn("Message could not be assigned to any request:", {
        msg,
      });
    }
  }

  /**
   * Sends a raw command to Ableton. Usually, you won't need this.
   * A good starting point in general is the `song` prop.
   */
  async sendCommand(command: Omit<Command, "uuid">): Promise<any> {
    return limit(
      () =>
        new Promise((res, rej) => {
          const msgId = v4();
          const payload: Command = {
            uuid: msgId,
            ...command,
          };
          const msg = JSON.stringify(payload);
          const timeout = this.options?.commandTimeoutMs ?? 2000;
          const arg = truncate(JSON.stringify(command.args), { length: 100 });
          const cls = command.nsid
            ? `${command.ns}(${command.nsid})`
            : command.ns;

          this.messageId = (this.messageId + 1) % 256;

          let timeoutId: NodeJS.Timeout | null = null;

          const clearCurrentTimeout = () => {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
          };

          const startTimeout = () => {
            clearCurrentTimeout();

            timeoutId = setTimeout(() => {
              rej(
                new TimeoutError(
                  `The command ${cls}.${command.name}(${arg}) timed out after ${timeout} ms.`,
                  payload,
                ),
              );
            }, timeout);
          };

          this.timeoutMap.set(this.messageId, startTimeout);

          const currentTimestamp = Date.now();
          this.msgMap.set(msgId, {
            res: (result: any) => {
              const duration = Date.now() - currentTimestamp;

              if (duration > (this.options?.commandWarnMs ?? 1000)) {
                this.logger?.warn(`Command took longer than expected`, {
                  command,
                  duration,
                });
              }

              this.setPing(duration);
              clearCurrentTimeout();
              res(result);
            },
            rej,
            clearTimeout: () => {
              clearCurrentTimeout();
              rej(
                new DisconnectError(
                  `Live disconnected before being able to respond to ${cls}.${command.name}(${arg})`,
                  payload,
                ),
              );
            },
          });

          this.sendRaw(msg, this.messageId).finally(startTimeout);
        }),
    );
  }

  async sendCachedCommand(command: Omit<Command, "uuid" | "cache">) {
    const args = command.args?.prop ?? JSON.stringify(command.args);
    const cacheKey = [command.ns, command.nsid, args].filter(Boolean).join("/");
    const cached = this.cache?.get(cacheKey);

    const result: CacheResponse = await this.sendCommand({
      ...command,
      etag: cached?.etag,
      cache: true,
    });

    if (isCached(result)) {
      if (!cached) {
        throw new Error("Tried to get an object that isn't cached.");
      } else {
        return cached.data;
      }
    } else {
      if (result.etag) {
        this.cache?.set(cacheKey, result);
      }

      return result.data;
    }
  }

  async getProp(
    ns: string,
    nsid: string | undefined,
    prop: string,
    cache?: boolean,
  ) {
    const params = { ns, nsid, name: "get_prop", args: { prop } };

    if (cache && this.cache) {
      return this.sendCachedCommand(params);
    } else {
      return this.sendCommand(params);
    }
  }

  async setProp(
    ns: string,
    nsid: string | undefined,
    prop: string,
    value: any,
  ) {
    return this.sendCommand({
      ns,
      nsid,
      name: "set_prop",
      args: { prop, value },
    });
  }

  async addPropListener(
    ns: string,
    nsid: string | undefined,
    prop: string,
    listener: (data: any) => any,
  ) {
    const eventId = v4();
    const result = await this.sendCommand({
      ns,
      nsid,
      name: "add_listener",
      args: { prop, nsid, eventId },
    });

    if (!this.eventListeners.has(result)) {
      this.eventListeners.set(result, [listener]);
    } else {
      this.eventListeners.set(result, [
        ...this.eventListeners.get(result)!,
        listener,
      ]);
    }

    return () => this.removePropListener(ns, nsid, prop, result, listener);
  }

  async removePropListener(
    ns: string,
    nsid: string | undefined,
    prop: string,
    eventId: string,
    listener: (data: any) => any,
  ) {
    const listeners = this.eventListeners.get(eventId);
    if (!listeners) {
      return false;
    }

    if (listeners.length > 1) {
      this.eventListeners.set(
        eventId,
        listeners.filter((l) => l !== listener),
      );
      return true;
    }

    if (listeners.length === 1) {
      this.eventListeners.delete(eventId);
      await this.sendCommand({
        ns,
        nsid,
        name: "remove_listener",
        args: { prop, nsid },
      });
      return true;
    }
  }

  /**
   * Removes all event listeners that were attached to properties.
   * This is useful for clearing all listeners when Live
   * disconnects, for example.
   */
  removeAllPropListeners() {
    this.eventListeners.clear();
  }

  async sendRaw(msg: string, messageId: number) {
    if (!this.client || !this.serverPort) {
      throw new Error(
        "The client hasn't been started yet. Please call start() first.",
      );
    }

    const buffer = deflateSync(Buffer.from(msg));

    const byteLimit = this.client.getSendBufferSize() - 100;
    const totalChunks = Math.ceil(buffer.byteLength / byteLimit);

    // Split the message into chunks if it becomes too large
    for (let i = 0; i < totalChunks; i++) {
      const chunk = Buffer.concat([
        // Message ID (1 byte) - identifies which message this chunk belongs to
        Buffer.alloc(1, messageId),
        // Chunk index (1 byte) - 0, 1, 2, ... for regular chunks
        Buffer.alloc(1, i),
        // Total chunks (1 byte) - number of chunks in this message
        Buffer.alloc(1, totalChunks),
        // Chunk data
        buffer.subarray(i * byteLimit, i * byteLimit + byteLimit),
      ]);
      this.client.send(chunk, 0, chunk.length, this.serverPort, "127.0.0.1");
      // Add a bit of a delay between sent chunks to reduce the chance of the
      // receiving buffer filling up which would cause chunks to be discarded.
      await new Promise((res) => setTimeout(res, 1));
    }
  }

  isConnected() {
    return this._isConnected;
  }
}

export { getPackageVersion } from "./util/package-version";
