import dgram from "dgram";
import { EventEmitter } from "events";
import uuid from "uuid";
import semver from "semver";
import { unzipSync } from "zlib";
import { Song } from "./ns/song";
import { Internal } from "./ns/internal";
import { getPackageVersion } from "./util/package-version";

interface Command {
  uuid: string;
  ns: string;
  nsid?: number;
  name: string;
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

export class Ableton extends EventEmitter implements ConnectionEventEmitter {
  private client: dgram.Socket;
  private msgMap = new Map<
    string,
    { res: (data: any) => any; rej: (data: any) => any }
  >();
  private eventListeners = new Map<string, Array<(data: any) => any>>();
  private heartbeatInterval: NodeJS.Timeout;
  private _isConnected = true;
  private cancelConnectionEvent = false;
  private buffer: Buffer[] = [];
  private latency: number = 0;

  public song = new Song(this);
  public internal = new Internal(this);

  constructor(
    private host = "127.0.0.1",
    private sendPort = 9011,
    private listenPort = 9010,
    heartbeatInterval = 2000,
  ) {
    super();
    this.client = dgram.createSocket({ type: "udp4", reuseAddr: true });
    this.client.bind(this.listenPort, host);
    this.client.addListener("message", this.handleIncoming.bind(this));
    this.heartbeatInterval = setInterval(async () => {
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
          this.emit("disconnect", "heartbeat");
        }
      }
    }, heartbeatInterval);

    this.internal
      .get("version")
      .then(v => {
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
          unzipSync(Buffer.concat(this.buffer.filter(b => b))).toString(),
        );
        this.buffer = [];
      }
    } catch (e) {
      this.buffer = [];
    }
  }

  private handleUncompressedMessage(msg: string) {
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
      this.msgMap.clear();
      this.eventListeners.clear();
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
      return eventCallback.forEach(cb => cb(data.data));
    }

    throw new Error("Message could not be assigned to any request: " + msg);
  }

  async sendCommand(
    ns: string,
    nsid: number | undefined,
    name: string,
    args?: { [k: string]: any },
    timeout: number = 2000,
  ): Promise<any> {
    return new Promise((res, rej) => {
      const msgId = uuid.v4();
      const payload: Command = {
        uuid: msgId,
        ns,
        nsid,
        name,
        args,
      };
      const msg = JSON.stringify(payload);

      const timeoutId = setTimeout(() => {
        const arg = JSON.stringify(args);
        const cls = nsid ? `${ns}(${nsid})` : ns;
        rej(
          new TimeoutError(
            [
              `The command ${cls}.${name}(${arg}) timed out after ${timeout} ms.`,
              `Please make sure that Ableton is running and that you have the latest`,
              `version of AbletonJS' midi script installed, listening on port`,
              `${this.sendPort} and sending on port ${this.listenPort}.`,
            ].join(" "),
            payload,
          ),
        );
      }, timeout);

      const currentTimestamp = Date.now();
      this.msgMap.set(msgId, {
        res: (data: any) => {
          this.setPing(Date.now() - currentTimestamp);
          clearTimeout(timeoutId);
          res(data);
        },
        rej,
      });

      this.sendRaw(msg);
    });
  }

  async getProp(ns: string, nsid: number | undefined, prop: string) {
    return this.sendCommand(ns, nsid, "get_prop", { prop });
  }

  async setProp(
    ns: string,
    nsid: number | undefined,
    prop: string,
    value: any,
  ) {
    return this.sendCommand(ns, nsid, "set_prop", { prop, value });
  }

  async addPropListener(
    ns: string,
    nsid: number | undefined,
    prop: string,
    listener: (data: any) => any,
  ) {
    const eventId = uuid.v4();
    const result = await this.sendCommand(ns, nsid, "add_listener", {
      prop,
      nsid,
      eventId,
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
    nsid: number | undefined,
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
        listeners.filter(l => l !== listener),
      );
      return true;
    }

    if (listeners.length === 1) {
      this.eventListeners.delete(eventId);
      await this.sendCommand(ns, nsid, "remove_listener", { prop, nsid });
      return true;
    }
  }

  sendRaw(msg: string) {
    const buffer = Buffer.from(msg);
    this.client.send(buffer, 0, buffer.length, this.sendPort, this.host);
  }

  isConnected() {
    return this._isConnected;
  }
}

export { getPackageVersion } from "./util/package-version";
