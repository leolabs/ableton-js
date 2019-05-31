import net from "net";
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
  event: "result" | "error" | "connect" | "disconnect" | string;
  data: any;
}

export class Ableton {
  private client: net.Socket;
  private msgMap = new Map<
    string,
    { res: (data: any) => any; rej: (data: any) => any }
  >();
  private eventListeners = new Map<string, (data: any) => any>();
  private connectListeners: (() => any)[] = [];
  private disconnectListeners: (() => any)[] = [];

  public song = new Song(this);

  constructor(private host = "127.0.0.1", private port = 9001) {
    this.client = new net.Socket();
    this.client.connect(port, host, console.log);
    this.client.on("data", this.handleIncoming.bind(this));
  }

  close() {
    this.client.destroy();
  }

  handleIncoming(msg: Buffer) {
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
        for (const listener of this.disconnectListeners) {
          listener();
        }
        return;
      }

      if (data.event === "connect") {
        for (const listener of this.connectListeners) {
          listener();
        }
        return;
      }

      const eventCallback = this.eventListeners.get(data.event);
      if (eventCallback) {
        return eventCallback(data.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async sendCommand(
    ns: string,
    nsid: number | undefined,
    name: string,
    args?: { [k: string]: any },
    timeout: number = 2000,
  ): Promise<any> {
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

  addConnectionListener(event: "connect" | "disconnect", listener: () => any) {
    (event === "connect"
      ? this.connectListeners
      : this.disconnectListeners
    ).push(listener);
  }

  removeConnectionListener(
    event: "connect" | "disconnect",
    listener: () => any,
  ) {
    switch (event) {
      case "connect":
        this.connectListeners = this.connectListeners.filter(
          l => l !== listener,
        );
        break;
      case "disconnect":
        this.disconnectListeners = this.disconnectListeners.filter(
          l => l !== listener,
        );
        break;
    }
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

  async addListener(
    ns: string,
    nsid: number | undefined,
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

    return result;
  }

  async removeListener(
    ns: string,
    nsid: number | undefined,
    prop: string,
    eventId: string,
  ) {
    await this.sendCommand(ns, nsid, "remove_listener", { prop });
    this.eventListeners.delete(eventId);
  }

  sendRaw(msg: string) {
    const buffer = Buffer.from(msg);
    this.client.write(buffer);
  }
}
