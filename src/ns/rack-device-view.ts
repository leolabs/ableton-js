import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { Chain, RawChain } from "./chain.js";
import { DrumPad, RawDrumPad } from "./drum-pad.js";

export interface GettableProperties {
  /** Drum racks only; `null` on other rack types. */
  drum_pads_scroll_position: number | null;
  is_collapsed: boolean;
  is_showing_chain_devices: boolean;
  selected_chain: RawChain | null;
  /** Drum racks only; `null` on other rack types. */
  selected_drum_pad: RawDrumPad | null;
}

export interface TransformedProperties {
  selected_chain: Chain | null;
  selected_drum_pad: DrumPad | null;
}

export interface SettableProperties {
  drum_pads_scroll_position: number;
  is_collapsed: boolean;
  is_showing_chain_devices: boolean;
  /** Live object id of the chain to select, or `null` to clear. */
  selected_chain: string | null;
  /** Live object id of the drum pad to select. */
  selected_drum_pad: string;
}

export interface ObservableProperties {
  drum_pads_scroll_position: number | null;
  is_collapsed: boolean;
  is_showing_chain_devices: boolean;
  selected_chain: RawChain | null;
  selected_drum_pad: RawDrumPad | null;
}

/**
 * View aspects of a rack device.
 */
export class RackDeviceView extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton, nsid: string) {
    super(ableton, "rack-device-view", nsid);

    this.transformers = {
      selected_chain: (chain) => (chain ? new Chain(ableton, chain) : null),
      selected_drum_pad: (pad) => (pad ? new DrumPad(ableton, pad) : null),
    };

    this.cachedProps = {
      selected_chain: true,
      selected_drum_pad: true,
    };
  }
}
