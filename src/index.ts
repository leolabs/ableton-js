import dgram from "dgram";
import { EventEmitter } from "events";
import uuid from "uuid";
import { Song } from "./ns/song";
import { Internal } from "./ns/internal";
import packageInfo from "../package.json";
import semver from "semver";

interface Command {
  uuid: string;
  ns: string;
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
}

export interface EventListener {
  prop: string;
  eventId: string;
  listener: (data: any) => any;
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

  public song = new Song(this);
  public internal = new Internal(this);

  constructor(
    private host = "127.0.0.1",
    private sendPort = 9001,
    private listenPort = 9000,
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

    this.internal.get("version").then(v => {
      if (semver.lt(v, packageInfo.version)) {
        console.warn(
          `The installed version of your AbletonJS plugin (${v}) is lower than the JS library (${packageInfo.version}).`,
          "Please update your AbletonJS plugin to the latest version: https://git.io/JvaOu",
        );
      }
    });
  }

  close() {
    this.cancelConnectionEvent = true;
    clearInterval(this.heartbeatInterval);
    this.client.close();
  }

  handleIncoming(msg: Buffer, info: dgram.RemoteInfo) {
    try {
      const data: Response = JSON.parse(msg.toString());
      const functionCallback = this.msgMap.get(data.uuid);

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
    } catch (e) {}
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
      const msg = JSON.stringify({
        uuid: msgId,
        ns,
        nsid,
        name,
        args,
      } as Command);

      const timeoutId = setTimeout(() => rej(new Error("Timeout")), timeout);

      this.msgMap.set(msgId, {
        res: (data: any) => {
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
