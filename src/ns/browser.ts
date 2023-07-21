import { Ableton } from "..";
import { Namespace } from ".";
import { BrowserItem, RawBrowserItem } from "./browser-item";

export interface GettableProperties {
  audio_effects: RawBrowserItem[];
  clips: RawBrowserItem[];
  colors: RawBrowserItem[];
  current_project: RawBrowserItem[];
  drums: RawBrowserItem[];
  instruments: RawBrowserItem[];
  max_for_live: RawBrowserItem[];
  midi_effects: RawBrowserItem[];
  packs: RawBrowserItem[];
  plugins: RawBrowserItem[];
  samples: RawBrowserItem[];
  sounds: RawBrowserItem[];
  user_library: RawBrowserItem[];
  user_folders: RawBrowserItem[];
  hotswap_target: RawBrowserItem;
}

export interface TransformedProperties {
  audio_effects: BrowserItem[];
  clips: BrowserItem[];
  colors: BrowserItem[];
  current_project: BrowserItem[];
  drums: BrowserItem[];
  instruments: BrowserItem[];
  max_for_live: BrowserItem[];
  midi_effects: BrowserItem[];
  packs: BrowserItem[];
  plugins: BrowserItem[];
  samples: BrowserItem[];
  sounds: BrowserItem[];
  user_library: BrowserItem[];
  user_folders: BrowserItem[];
  hotswap_target: BrowserItem;
}

export interface SettableProperties {}

export interface ObservableProperties {
  filter_type: never;
  // remote script stalls when hotswap is activated, so we only get a bang when deactivated
  hotswap_target: BrowserItem;
}

export interface RawBrowser {
  id: string;
}

export class Browser extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "browser");

    const makeBrowserItems = (items: RawBrowserItem[]) =>
      items.map((item) => new BrowserItem(ableton, item));

    this.transformers = {
      audio_effects: makeBrowserItems,
      clips: makeBrowserItems,
      colors: makeBrowserItems,
      current_project: makeBrowserItems,
      drums: makeBrowserItems,
      instruments: makeBrowserItems,
      max_for_live: makeBrowserItems,
      midi_effects: makeBrowserItems,
      packs: makeBrowserItems,
      plugins: makeBrowserItems,
      samples: makeBrowserItems,
      sounds: makeBrowserItems,
      user_library: makeBrowserItems,
      user_folders: makeBrowserItems,
      hotswap_target: (t) => new BrowserItem(ableton, t),
    };

    this.cachedProps = {
      audio_effects: true,
      clips: true,
      colors: true,
      current_project: true,
      drums: true,
      instruments: true,
      max_for_live: true,
      midi_effects: true,
      packs: true,
      plugins: true,
      samples: true,
      sounds: true,
      user_library: true,
      user_folders: true,
      hotswap_target: true,
    };
  }

  /** Loads the provided browser item. */
  public async loadItem(item: BrowserItem) {
    return this.sendCommand("load_item", { id: item.raw.id });
  }

  /** Previews the provided browser item. */
  public async previewItem(item: BrowserItem) {
    return this.sendCommand("preview_item", { id: item.raw.id });
  }

  /** Stops the current preview. */
  public async stopPreview() {
    return this.sendCommand("stop_preview");
  }
}
