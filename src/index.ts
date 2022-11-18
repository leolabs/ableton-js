import dgram from "dgram";
import { EventEmitter } from "events";
import { v4 } from "uuid";
import semver from "semver";
import { unzipSync, deflateSync } from "zlib";
import LruCache from "lru-cache";

import { Song } from "./ns/song";
import { Internal } from "./ns/internal";
import { Application } from "./ns/application";
import { Midi } from "./ns/midi";
import { getPackageVersion } from "./util/package-version";
import { Cache, isCached, CacheResponse } from "./util/cache";

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

type ConnectionEventType = "realtime" | "heartbeat";

interface ConnectionEventEmitter {
  on(e: "connect", l: (t: ConnectionEventType) => void): this;
  on(e: "disconnect", l: (t: ConnectionEventType) => void): this;
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
  host?: string;
  sendPort?: number;
  listenPort?: number;
  heartbeatInterval?: number;
  cacheOptions?: LruCache.Options<string, any>;
}

export class Ableton extends EventEmitter implements ConnectionEventEmitter {
  private client: dgram.Socket;
  private msgMap = new Map<
    string,
    {
      res: (data: any) => any;
      rej: (data: any) => any;
      clearTimeout: () => any;
    }
  >();
  private eventListeners = new Map<string, Array<(data: any) => any>>();
  private heartbeatInterval: NodeJS.Timeout;
  private _isConnected = false;
  private cancelConnectionEvent = false;
  private buffer: Buffer[] = [];
  private latency: number = 0;

  private host: string;
  private sendPort: number;
  private listenPort: number;

  public cache: Cache;
  public song = new Song(this);
  public application = new Application(this);
  public internal = new Internal(this);
  public midi = new Midi(this);

  constructor(options?: AbletonOptions) {
    super();

    this.host = options?.host ?? "127.0.0.1";
    this.sendPort = options?.sendPort ?? 39041;
    this.listenPort = options?.listenPort ?? 39031;

    this.client = dgram.createSocket({ type: "udp4" });
    this.client.bind(this.listenPort, this.host);
    this.client.addListener("message", this.handleIncoming.bind(this));

    this.cache = new LruCache<string, any>({
      max: 500,
      ttl: 1000 * 60 * 10,
      ...options?.cacheOptions,
    });

    const heartbeat = async () => {
      this.cancelConnectionEvent = false;

      try {
        await this.song.get("current_song_time");
        if (!this._isConnected && !this.cancelConnectionEvent) {
          this._isConnected = true;
          this.emit("connect", "heartbeat");
        }
      } catch (e) {
        if (this._isConnected && !this.cancelConnectionEvent) {
          this._isConnected = false;
          this.eventListeners.clear();
          this.msgMap.forEach((msg) => msg.clearTimeout());
          this.msgMap.clear();
          this.emit("disconnect", "heartbeat");
        }
      }
    };

    this.heartbeatInterval = setInterval(
      heartbeat,
      options?.heartbeatInterval ?? 2000,
    );
    heartbeat();

    this.internal
      .get("version")
      .then((v) => {
        const jsVersion = getPackageVersion();
        if (semver.lt(v, jsVersion)) {
          console.warn(
            `The installed version of your AbletonJS plugin (${v}) is lower than the JS library (${jsVersion}).`,
            "Please update your AbletonJS plugin to the latest version: https://git.io/JvaOu",
          );
        }
      })
      .catch(() => {});
  }

  close() {
    this.cancelConnectionEvent = true;
    clearInterval(this.heartbeatInterval);
    this.client.close();
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
      this.eventListeners.clear();
      this.msgMap.forEach((msg) => msg.clearTimeout());
      this.msgMap.clear();
      if (this._isConnected === true) {
        this._isConnected = false;
        this.cancelConnectionEvent = true;
        this.emit("disconnect", "realtime");
      }
      return;
    }

    if (data.event === "connect") {
      if (this._isConnected === false) {
        this._isConnected = true;
        this.cancelConnectionEvent = true;
        this.emit("connect", "realtime");
      }
      return;
    }

    const eventCallback = this.eventListeners.get(data.event);
    if (eventCallback) {
      return eventCallback.forEach((cb) => cb(data.data));
    }

    if (data.uuid) {
      this.emit(
        "error",
        "Message could not be assigned to any request: " + msg,
      );
    }
  }

  /**
   * Sends a raw command to Ableton. Usually, you won't need this.
   * A good starting point in general is the `song` prop.
   */
  async sendCommand(
    command: Omit<Command, "uuid">,
    timeout: number = 2000,
  ): Promise<any> {
    return new Promise((res, rej) => {
      const msgId = v4();
      const payload: Command = {
        uuid: msgId,
        ...command,
      };
      const msg = JSON.stringify(payload);

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
              `version of AbletonJS' midi script installed and renamed to "AbletonJS", listening on port`,
              `${this.sendPort} and sending on port ${this.listenPort}.`,
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

  async sendCachedCommand(
    command: Omit<Command, "uuid" | "cache">,
    timeout?: number,
  ) {
    const args = command.args?.prop ?? JSON.stringify(command.args);
    const cacheKey = [command.ns, command.nsid, args].filter(Boolean).join("/");
    const cached = this.cache.get(cacheKey);

    const result: CacheResponse = await this.sendCommand(
      { ...command, etag: cached?.etag, cache: true },
      timeout,
    );

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
      this.client.send(chunk, 0, chunk.length, this.sendPort, this.host);
    }
  }

  isConnected() {
    return this._isConnected;
  }
}

export { getPackageVersion } from "./util/package-version";
