import truncate from "lodash/truncate.js";
import { v4 } from "uuid";
import semver from "semver";
import LruCache from "lru-cache";
import pLimit from "p-limit";

import { Song } from "./ns/song.js";
import { Internal } from "./ns/internal.js";
import { Application } from "./ns/application.js";
import { Midi } from "./ns/midi.js";
import { packageVersion } from "./util/package-version.js";
import { Cache, isCached, CacheResponse } from "./util/cache.js";
import { Logger } from "./util/logger.js";
import { Session } from "./ns/session.js";
import { EventEmitter } from "./util/event-emitter.js";
import { hmacSha256Hex } from "./util/hmac-sha256.js";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 39031;

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

function truncateCommandArgs(command: Omit<Command, "uuid">) {
  if (command.ns === "internal" && command.name === "authenticate") {
    return "{ hash: *** }";
  }

  return truncate(JSON.stringify(command.args), { length: 100 });
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
   * WebSocket host of the Remote Script.
   *
   * @default 127.0.0.1
   */
  host?: string;

  /**
   * WebSocket port of the Remote Script.
   *
   * @default 39031
   */
  port?: number;

  /**
   * Shared secret matching PASSWORD in Config.py.
   * Sent as HMAC-SHA256 of the plugin's per-connection salt.
   */
  password?: string;

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
   * @default 3000
   */
  commandTimeoutMs?: number;

  /**
   * Defines how long ableton-js waits for an answer from the Remote
   * Script after sending a command logging a warning about the delay.
   *
   * @default 2000
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
  private client: WebSocket | undefined;
  private msgMap = new Map<
    string,
    {
      res: (data: any) => any;
      rej: (data: any) => any;
      clearTimeout: () => any;
    }
  >();
  private eventListeners = new Map<string, Array<(data: any) => any>>();
  private heartbeatInterval: ReturnType<typeof setInterval> | undefined;
  private reconnectTimer: ReturnType<typeof setTimeout> | undefined;
  private _isConnected = false;
  private latency: number = 0;
  private reconnectDelay = 250;
  private shouldReconnect = false;

  private host: string;
  private port: number;

  public cache?: Cache;
  public song = new Song(this);
  public session = new Session(this); // added for red session ring control
  public application = new Application(this);
  public internal = new Internal(this);
  public midi = new Midi(this);

  private logger: Logger | undefined;
  private clientState: "closed" | "starting" | "started" = "closed";
  private cancelDisconnectEvents: Array<() => unknown> = [];

  constructor(private options?: AbletonOptions) {
    super();

    this.logger = options?.logger;
    this.host = options?.host ?? DEFAULT_HOST;
    this.port = options?.port ?? DEFAULT_PORT;

    if (!options?.disableCache) {
      this.cache = new LruCache<string, any>({
        max: 500,
        ttl: 1000 * 60 * 10,
        ...options?.cacheOptions,
      });
    }
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
      this.cache?.clear();

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
    }

    return new Promise<void>((res, rej) => {
      this.once("connect", () => res());
      this.once("error", (error) => rej(error));
    });
  }

  /**
   * Starts the client and waits for a connection with Live to be established.
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
    this.shouldReconnect = true;
    this.logger?.info("Connecting to Live", { url: this.socketUrl() });
    this.connectSocket();

    this.logger?.info("Checking connection...");
    const connection = this.waitForConnection();

    if (timeoutMs) {
      try {
        const timeout = new Promise((_, rej) =>
          setTimeout(() => rej(new Error("Connection timed out.")), timeoutMs),
        );
        await Promise.race([connection, timeout]);
      } catch (e) {
        await this.close();
        throw e;
      }
    } else {
      await connection;
    }

    this.logger?.info("Got connection!");

    this.clientState = "started";
    this.handleConnect("start");

    const heartbeat = async () => {
      if (
        !this._isConnected ||
        !this.client ||
        this.client.readyState !== WebSocket.OPEN
      ) {
        return;
      }

      // A long in-flight command (e.g. set_data with a large payload) already
      // proves the socket is alive; pinging would race its 3s timeout.
      if (this.msgMap.size > 0) {
        return;
      }

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
          this.closeCurrentSocket();
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
        const jsVersion = packageVersion;
        if (semver.lt(v, jsVersion)) {
          this.logger?.warn(
            `The installed version of your AbletonJS plugin (${v}) is lower than the JS library (${jsVersion}).`,
            "Please update your AbletonJS plugin to the latest version: https://git.io/JvaOu",
          );
        }
      })
      .catch(() => {});
  }

  private socketUrl() {
    return `ws://${this.host}:${this.port}`;
  }

  private connectSocket() {
    if (!this.shouldReconnect) {
      return;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = undefined;
    }

    if (this.client) {
      const previous = this.client;
      this.client = undefined;
      previous.close();
    }

    const url = this.socketUrl();
    const ws = new WebSocket(url);
    this.client = ws;

    ws.addEventListener("open", () => {
      this.reconnectDelay = 250;
    });

    ws.addEventListener("message", (event) => {
      if (typeof event.data === "string") {
        this.handleIncoming(event.data);
      }
    });

    ws.addEventListener("close", () => {
      if (this.client === ws) {
        this.client = undefined;
      }
      this.handleDisconnect("realtime");
      this.scheduleReconnect();
    });
  }

  private closeCurrentSocket() {
    if (!this.client || this.client.readyState === WebSocket.CLOSED) {
      this.client = undefined;
      this.scheduleReconnect();
      return;
    }

    this.client.close();
  }

  private scheduleReconnect() {
    if (!this.shouldReconnect || this.reconnectTimer) {
      return;
    }

    const delay = this.reconnectDelay;
    this.reconnectDelay = Math.min(this.reconnectDelay * 2, 2000);
    this.logger?.info("Reconnecting to Live", { delay, url: this.socketUrl() });
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = undefined;
      this.connectSocket();
    }, delay);
  }

  /** Closes the client */
  async close() {
    this.logger?.info("Closing the client");
    this.shouldReconnect = false;

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = undefined;
    }

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    if (this.client) {
      const socket = this.client;
      if (socket.readyState === WebSocket.CLOSED) {
        this.client = undefined;
      } else {
        const closePromise = new Promise<void>((res) => {
          socket.addEventListener("close", () => res(), { once: true });
        });
        socket.close();
        await closePromise;
        this.client = undefined;
      }
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

  private handleIncoming(msg: string) {
    try {
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

      if (data.event === "result" || data.event === "error") {
        return;
      }

      if (data.event === "disconnect") {
        this.handleDisconnect("realtime");
        this.closeCurrentSocket();
        return;
      }

      if (data.event === "connect") {
        this.handleServerConnect(data);
        return;
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
    } catch (e) {
      this.emit("error", e as Error);
    }
  }

  private async handleServerConnect(data: Response) {
    this.cancelDisconnectEvents.forEach((cancel) => cancel());

    if (data.data?.port && data.data?.port !== this.port) {
      this.logger?.info("Got server port via connect:", {
        port: data.data.port,
      });
    }

    if (data.data?.requiresAuth) {
      if (!this.options?.password) {
        this.abortAuthentication(
          new Error(
            "The AbletonJS plugin requires a password. Pass it to the constructor.",
          ),
        );
        return;
      }

      if (!data.data?.salt) {
        this.abortAuthentication(
          new Error(
            "The AbletonJS plugin did not send an authentication salt.",
          ),
        );
        return;
      }

      try {
        const hash = hmacSha256Hex(this.options.password, data.data.salt);
        await this.sendCommand({
          ns: "internal",
          name: "authenticate",
          args: { hash },
        });
      } catch (e) {
        const error =
          e instanceof Error ? e : new Error("Authentication failed");
        this.abortAuthentication(error);
        return;
      }
    }

    this.handleConnect(this.clientState === "starting" ? "start" : "realtime");
  }

  private abortAuthentication(error: Error) {
    this.logger?.error(error.message);
    this.shouldReconnect = false;
    this.clientState = "closed";
    this.emit("error", error);
    this.closeCurrentSocket();
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
          const timeout = this.options?.commandTimeoutMs ?? 3000;
          const args = truncateCommandArgs(command);
          const cls = command.nsid
            ? `${command.ns}(${command.nsid})`
            : command.ns;

          let timeoutId: ReturnType<typeof setTimeout> | null = null;

          const clearCurrentTimeout = () => {
            if (timeoutId) {
              clearTimeout(timeoutId);
            }
          };

          const finish = () => {
            this.msgMap.delete(msgId);
            clearCurrentTimeout();
          };

          const startTimeout = () => {
            clearCurrentTimeout();

            timeoutId = setTimeout(() => {
              finish();
              rej(
                new TimeoutError(
                  `The command ${cls}.${command.name}(${args}) timed out after ${timeout} ms.`,
                  payload,
                ),
              );
            }, timeout);
          };

          const currentTimestamp = Date.now();
          this.msgMap.set(msgId, {
            res: (result: any) => {
              const duration = Date.now() - currentTimestamp;

              if (duration > (this.options?.commandWarnMs ?? 2000)) {
                this.logger?.warn(`Command took longer than expected`, {
                  command,
                  duration,
                });
              }

              this.setPing(duration);
              finish();
              res(result);
            },
            rej: (error: any) => {
              finish();
              rej(error);
            },
            clearTimeout: () => {
              finish();
              rej(
                new DisconnectError(
                  `Live disconnected before being able to respond to ${cls}.${command.name}(${args})`,
                  payload,
                ),
              );
            },
          });

          this.sendRaw(msg)
            .then(startTimeout)
            .catch((error) => {
              finish();
              rej(error);
            });
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

  async sendRaw(msg: string) {
    if (this.clientState === "closed") {
      throw new Error(
        "The client hasn't been started yet. Please call start() first.",
      );
    }

    if (!this.client || this.client.readyState !== WebSocket.OPEN) {
      throw new Error("The client is disconnected.");
    }

    this.client.send(msg);
  }

  isConnected() {
    return this._isConnected;
  }
}

export * from "./util/package-version.js";
