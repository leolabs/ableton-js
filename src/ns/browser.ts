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
}

export interface SettableProperties {}

export interface ObservableProperties {
  filter_type: never;
  filter_type_has_listener: boolean;
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
  constructor(ableton: Ableton, public raw: RawBrowser) {
    super(ableton, "browser", raw.id);
    this.transformers = {
      audio_effects: (audio_effects) =>
        audio_effects.map(
          (audio_effect) => new BrowserItem(ableton, audio_effect),
        ),
      clips: (clips) => clips.map((clip) => new BrowserItem(ableton, clip)),
      colors: (colors) =>
        colors.map((color) => new BrowserItem(ableton, color)),
      current_project: (current_project) =>
        current_project.map((c) => new BrowserItem(ableton, c)),
      drums: (drums) => drums.map((drum) => new BrowserItem(ableton, drum)),
      instruments: (instruments) =>
        instruments.map((instrument) => new BrowserItem(ableton, instrument)),
      max_for_live: (max_for_live) =>
        max_for_live.map((max) => new BrowserItem(ableton, max)),
      midi_effects: (midi_effects) =>
        midi_effects.map(
          (midi_effect) => new BrowserItem(ableton, midi_effect),
        ),
      packs: (packs) => packs.map((pack) => new BrowserItem(ableton, pack)),
      plugins: (plugins) =>
        plugins.map((plugin) => new BrowserItem(ableton, plugin)),
      samples: (samples) =>
        samples.map((sample) => new BrowserItem(ableton, sample)),
      sounds: (sounds) =>
        sounds.map((sound) => new BrowserItem(ableton, sound)),
      user_library: (user_library) =>
        user_library.map((user) => new BrowserItem(ableton, user)),
      user_folders: (user_folders) =>
        user_folders.map(
          (user_folder) => new BrowserItem(ableton, user_folder),
        ),
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

  public async loadItem(item: BrowserItem) {
    return this.sendCommand("load_item", { id: item.raw.id });
  }

  public async previewItem(item: BrowserItem) {
    return this.sendCommand("preview_item", { id: item.raw.id });
  }

  public async stopPreview() {
    return this.sendCommand("stop_preview");
  }
}
