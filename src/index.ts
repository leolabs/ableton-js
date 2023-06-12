import os from "os";
import path from "path";
import dgram from "dgram";
import { EventEmitter } from "events";
import { v4 } from "uuid";
import semver from "semver";
import { unzipSync, deflateSync } from "zlib";
import LruCache from "lru-cache";
import { unwatchFile, watchFile } from "fs";
import { readFile, writeFile } from "fs/promises";

import { Song } from "./ns/song";
import { Internal } from "./ns/internal";
import { Application } from "./ns/application";
import { Midi } from "./ns/midi";
import { getPackageVersion } from "./util/package-version";
import { Cache, isCached, CacheResponse } from "./util/cache";
import { Logger } from "./util/logger";

const SERVER_PORT_FILE = "ableton-js-server.port";
const CLIENT_PORT_FILE = "ableton-js-client.port";

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

interface ConnectionEventEmitter {
  on(e: "connect", l: (t: ConnectEventType) => void): this;
  on(e: "disconnect", l: (t: DisconnectEventType) => void): this;
  on(e: "message", l: (t: any) => void): this;
  on(e: "error", l: (t: Error) => void): this;
  on(e: "ping", l: (t: number) => void): this;
}

export interface EventListener {
  prop: string;
  eventId: string;
  listener: (data: any) => any;
}

export class TimeoutError extends Error {
  constructor(public message: string, public payload: Command) {
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
   * Options for the response cache.
   */
  cacheOptions?: LruCache.Options<string, any>;

  /**
   * Set this to allow ableton-js to log messages. If you set this to
   * `console`, log messages are printed to the standard output.
   */
  logger?: Logger;
}

export class Ableton extends EventEmitter implements ConnectionEventEmitter {
  private client: dgram.Socket | undefined;
  private msgMap = new Map<
    string,
    {
      res: (data: any) => any;
      rej: (data: any) => any;
      clearTimeout: () => any;
    }
  >();
  private eventListeners = new Map<string, Array<(data: any) => any>>();
  private heartbeatInterval: NodeJS.Timeout | undefined;
  private _isConnected = false;
  private buffer: Buffer[] = [];
  private latency: number = 0;

  private serverPort: number | undefined;

  public cache: Cache;
  public song = new Song(this);
  public application = new Application(this);
  public internal = new Internal(this);
  public midi = new Midi(this);

  private clientPortFile: string;
  private serverPortFile: string;
  private logger: Logger | undefined;
  private clientState: "closed" | "starting" | "started" = "closed";
  private cancelDisconnectEvent = false;

  constructor(private options?: AbletonOptions) {
    super();

    this.logger = options?.logger;

    this.cache = new LruCache<string, any>({
      max: 500,
      ttl: 1000 * 60 * 10,
      ...options?.cacheOptions,
    });

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
      this.msgMap.forEach((msg) => msg.clearTimeout());
      this.msgMap.clear();
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
      return;
    }

    this.clientState = "starting";

    this.client = dgram.createSocket({ type: "udp4" });
    this.client.addListener("message", this.handleIncoming.bind(this));

    this.client.addListener("listening", async () => {
      const port = this.client?.address().port;
      this.logger?.info("Client is bound and listening", { port });
      // Write used port to a file so Live can read from it
      await writeFile(this.clientPortFile, String(port));
    });

    try {
      // Try binding to the port that was used last for better start performance
      this.logger?.info("Checking if a stored port exists", {
        file: this.clientPortFile,
      });
      const clientPort = await readFile(this.clientPortFile);
      const port = Number(clientPort.toString());
      this.logger?.info("Trying to bind to the most recent port", { port });
      this.client.bind(port, "127.0.0.1");
    } catch (error) {
      this.logger?.info(
        "Couldn't bind to last port, binding to any free port instead",
        { error },
      );
      this.client.bind(undefined, "127.0.0.1");
    }

    // Wait for the server port file to exist
    await new Promise<void>(async (res) => {
      try {
        const serverPort = await readFile(this.serverPortFile);
        this.serverPort = Number(serverPort.toString());
        this.logger?.info("Server port:", { port: this.serverPort });
        res();
      } catch (e) {}

      // Set up a watcher in case the server port changes
      watchFile(this.serverPortFile, async (curr) => {
        if (curr.isFile()) {
          const serverPort = await readFile(this.serverPortFile);
          const newPort = Number(serverPort.toString());

          if (!isNaN(newPort) && newPort !== this.serverPort) {
            this.logger?.info("Server port changed:", { port: newPort });
            this.serverPort = Number(serverPort.toString());
          }

          res();
        }
      });
    });

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
      try {
        await this.internal.get("ping");
        this.handleConnect("heartbeat");
      } catch (e) {
        if (!this.cancelDisconnectEvent) {
          this.handleDisconnect("heartbeat");
        }
      } finally {
        this.cancelDisconnectEvent = false;
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
      const index = msg[0];
      const message = msg.slice(1);

      this.buffer[index] = message;

      // 0xFF signals that the end of the buffer has been reached
      if (index === 255) {
        this.handleUncompressedMessage(
          unzipSync(Buffer.concat(this.buffer.filter((b) => b))).toString(),
        );
        this.buffer = [];
      }
    } catch (e) {
      this.buffer = [];
      this.logger?.warn("Couldn't handle message:", { error: e });
      this.emit("error", e);
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
      this.cancelDisconnectEvent = true;

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
    return new Promise((res, rej) => {
      const msgId = v4();
      const payload: Command = {
        uuid: msgId,
        ...command,
      };
      const msg = JSON.stringify(payload);
      const timeout = this.options?.commandTimeoutMs ?? 2000;

      const timeoutId = setTimeout(() => {
        const arg = JSON.stringify(command.args);
        const cls = command.nsid
          ? `${command.ns}(${command.nsid})`
          : command.ns;
        rej(
          new TimeoutError(
            [
              `The command ${cls}.${command.name}(${arg}) timed out after ${timeout} ms.`,
              `Please make sure that Ableton is running and that you have the latest`,
              `version of AbletonJS' MIDI script installed and renamed to "AbletonJS".`,
            ].join(" "),
            payload,
          ),
        );
      }, timeout);

      const currentTimestamp = Date.now();
      this.msgMap.set(msgId, {
        res: (result: any) => {
          this.setPing(Date.now() - currentTimestamp);
          clearTimeout(timeoutId);
          res(result);
        },
        rej,
        clearTimeout: () => {
          clearTimeout(timeoutId);
        },
      });

      this.sendRaw(msg);
    });
  }

  async sendCachedCommand(command: Omit<Command, "uuid" | "cache">) {
    const args = command.args?.prop ?? JSON.stringify(command.args);
    const cacheKey = [command.ns, command.nsid, args].filter(Boolean).join("/");
    const cached = this.cache.get(cacheKey);

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
        this.cache.set(cacheKey, result);
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

    if (cache) {
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

  sendRaw(msg: string) {
    if (!this.client || !this.serverPort) {
      throw new Error(
        "The client hasn't been started yet. Please call start() first.",
      );
    }

    const buffer = deflateSync(Buffer.from(msg));

    // Based on this thread, 7500 bytes seems like a safe value
    // https://stackoverflow.com/questions/22819214/udp-message-too-long
    const byteLimit = 7500;
    const chunks = Math.ceil(buffer.byteLength / byteLimit);

    // Split the message into chunks if it becomes too large
    for (let i = 0; i < chunks; i++) {
      const chunk = Buffer.concat([
        // Add a counter to the message, the last message is always 255
        Buffer.alloc(1, i + 1 === chunks ? 255 : i),
        buffer.slice(i * byteLimit, i * byteLimit + byteLimit),
      ]);
      this.client.send(chunk, 0, chunk.length, this.serverPort, "127.0.0.1");
    }
  }

  isConnected() {
    return this._isConnected;
  }
}

export { getPackageVersion } from "./util/package-version";
