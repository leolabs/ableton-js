import { Ableton } from "..";
import { Namespace } from ".";

export interface GettableProperties { }

export interface TransformedProperties { }

export interface SettableProperties {
    test: string
}

export interface ObservableProperties { }

export class Session extends Namespace<
    GettableProperties,
    TransformedProperties,
    SettableProperties,
    ObservableProperties
> {
    constructor(ableton: Ableton) {
        super(ableton, "session", undefined);
    }

    public async testFromTs(index: number) {
        return this.sendCommand("test", { stuff: index.toString() });
    }
}