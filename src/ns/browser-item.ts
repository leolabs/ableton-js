import { Ableton } from "..";
import { Namespace } from ".";

export interface RawBrowserItem {
  id: string;
  children: RawBrowserItem[];
  name: string;
  is_loadable: boolean;
  is_selected: boolean;
  is_device: boolean;
  is_folder: boolean;
  source: string;
  uri: string;
}

export interface GettableProperties {
  children: RawBrowserItem[];
  is_device: boolean;
  is_folder: boolean;
  is_loadable: boolean;
  is_selected: boolean;
  name: string;
  source: string;
  uri: string;
}

export interface TransformedProperties {
  children: BrowserItem[];
}

export interface SettableProperties {}

export interface ObservableProperties {}

export class BrowserItem extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, public raw: RawBrowserItem) {
    super(ableton, "browser-item", raw.id);
    this.transformers = {
      children: (children) => children.map((c) => new BrowserItem(ableton, c)),
    };

    this.cachedProps = {
      children: true,
      is_device: true,
      is_folder: true,
      is_loadable: false,
      is_selected: false,
      name: true,
      source: true,
      uri: true,
    };
  }
}
