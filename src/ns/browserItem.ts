import { Ableton } from "..";
import { Namespace } from ".";

export interface BrowserItemIterator {
    [Symbol.iterator](): Iterator<BrowserItem>;
}

export interface BrowserItemVector {
    append: (browserItemVector: BrowserItemVector) => void
    extend: (browserItemVector: BrowserItemVector) => void
}

export interface RawBrowserItem {
    id: string;
    iter_childrens: RawBrowserItem[];
    name: string;
    is_loadable: boolean;
    is_selected: boolean;
    is_device: boolean;
    is_folder: boolean;
    source: string;
    uri: string;
}

export interface GettableProperties {
    children: BrowserItemVector;
    is_device: boolean;
    is_folder: boolean;
    is_loadable: boolean;
    is_selected: boolean;
    iter_children: BrowserItem[];
    name: string;
    iter_childrens: RawBrowserItem[];
    source: string;
    uri: string;

}

export interface TransformedProperties {
    iter_childrens: BrowserItem[];
}

export interface SettableProperties { }

export interface ObservableProperties {

}

export class BrowserItem extends Namespace<
    GettableProperties,
    TransformedProperties,
    SettableProperties,
    ObservableProperties
> {

    constructor(ableton: Ableton, public raw: RawBrowserItem) {
        super(ableton, "browser-item", raw.id);
        this.transformers = {
            iter_childrens: (iter_childrens) => iter_childrens.map((iter_children) => new BrowserItem(ableton, iter_children)),

        };

        this.cachedProps = {
            children: true,
            is_device: true,
            is_folder: true,
            is_loadable: false,
            is_selected: false,
            iter_children: true,
            iter_childrens: true,
            name: true,
            source: true,
            uri: true,
        };

    }
    public async get_iter_childrens() {
        return this.sendCommand("get_iter_childrens");
    }

}

