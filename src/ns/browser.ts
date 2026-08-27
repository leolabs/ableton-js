import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { BrowserItem, RawBrowserItem } from "./browser-item.js";

/** Live's `Browser.FilterType`. */
export type BrowserFilterType =
  | "disabled"
  | "hotswap_off"
  | "instrument_hotswap"
  | "audio_effect_hotswap"
  | "midi_effect_hotswap"
  | "drum_pad_hotswap"
  | "midi_track_devices"
  | "samples"
  | "count";

/** Live's `Browser.Relation`. */
export type BrowserRelation = "ancestor" | "equal" | "descendant" | "none";

export interface GettableProperties {
  audio_effects: RawBrowserItem[];
  clips: RawBrowserItem[];
  colors: RawBrowserItem[];
  current_project: RawBrowserItem[];
  drums: RawBrowserItem[];
  filter_type: BrowserFilterType;
  instruments: RawBrowserItem[];
  legacy_libraries: RawBrowserItem[];
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
  legacy_libraries: BrowserItem[];
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

export interface SettableProperties {
  filter_type: BrowserFilterType;
}

export interface ObservableProperties {
  filter_type: BrowserFilterType;
  /** Bang-only; fires when the browser finishes a full refresh. */
  full_refresh: never;
  // remote script stalls when hotswap is activated, so we only get a bang when deactivated
  hotswap_target: BrowserItem;
}

export interface RawBrowser {
  readonly id: string;
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
      legacy_libraries: makeBrowserItems,
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
      filter_type: false,
      instruments: true,
      legacy_libraries: true,
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

  /** Returns the relation between the given browser item and the current hotswap target. */
  public async relationToHotswapTarget(item: BrowserItem): Promise<BrowserRelation> {
    return this.sendCommand("relation_to_hotswap_target", { id: item.raw.id });
  }

  /** Stops the current preview. */
  public async stopPreview() {
    return this.sendCommand("stop_preview");
  }
}
