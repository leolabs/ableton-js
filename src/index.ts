import dgram from "dgram";
import uuid from "node-uuid";
import { Song } from "./ns/song";

interface Command {
  uuid: string;
  ns: string;
  name: string;
  args?: { [k: string]: any };
}

interface Response {
  uuid: string;
  event: "result" | "error" | string;
  data: any;
}

export class Ableton {
  private client: dgram.Socket;
  private msgMap = new Map<
    string,
    { res: (data: any) => any; rej: (data: any) => any }
  >();
  private eventListeners = new Map<string, (data: any) => any>();

  public song = new Song(this);

  constructor(
    private host = "127.0.0.1",
    private sendPort = 9001,
    private listenPort = 9000,
  ) {
    this.client = dgram.createSocket("udp4");
    this.client.bind(this.listenPort, host);
    this.client.addListener("message", this.handleIncoming.bind(this));
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

      const eventCallback = this.eventListeners.get(data.event);
      if (eventCallback) {
        return eventCallback(data.data);
      }
    } catch (e) {}
  }

  async sendCommand(
    ns: string,
    nsid: string | undefined,
    name: string,
    args?: { [k: string]: any },
    timeout: number = 2000,
  ) {
    return new Promise((res, rej) => {
      const msgId = uuid.v1();
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

  async getProp(ns: string, nsid: string | undefined, prop: string) {
    return this.sendCommand(ns, nsid, "get_prop", { prop });
  }

  async setProp(
    ns: string,
    nsid: string | undefined,
    prop: string,
    value: any,
  ) {
    return this.sendCommand(ns, nsid, "set_prop", { prop, value });
  }

  async addListener(
    ns: string,
    nsid: string | undefined,
    prop: string,
    listener: (data: any) => any,
  ) {
    const eventId = uuid.v1();
    const result = await this.sendCommand(ns, nsid, "add_listener", {
      prop,
      eventId,
    });

    if (result === eventId) {
      this.eventListeners.set(eventId, listener);
    }
  }

  async removeListener(
    ns: string,
    nsid: string | undefined,
    prop: string,
    eventId: string,
  ) {
    await this.sendCommand(ns, nsid, "remove_listener", { prop });
    this.eventListeners.delete(eventId);
  }

  sendRaw(msg: string) {
    const buffer = Buffer.from(msg);
    this.client.send(buffer, 0, buffer.length, this.sendPort, this.host);
  }
}
