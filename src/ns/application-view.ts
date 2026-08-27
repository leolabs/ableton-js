import { Ableton } from "../index.js";
import { Namespace } from "./index.js";

export type DocumentView = "Session" | "Arranger";
export type DetailView = "Detail" | "Detail/Clip" | "Detail/DeviceChain";
export type View = "Browser" | DocumentView | DetailView;

export type NavDirection = "up" | "down" | "left" | "right";

export interface GettableProperties {
  browse_mode: boolean;
  focused_document_view: DocumentView;
}

export interface TransformedProperties {}

export interface SettableProperties {}

export interface ObservableProperties {
  browse_mode: boolean;
  focused_document_view: DocumentView;
}

export class ApplicationView extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "application-view");
  }

  /** Returns the available main document subviews (e.g. Session, Arranger). */
  public async availableMainViews(): Promise<View[]> {
    return this.sendCachedCommand("available_main_views");
  }

  /** Shows and focuses the given view. */
  public async focusView(view: View) {
    return this.sendCommand("focus_view", [view]);
  }

  /** Hides the given view. */
  public async hideView(view: View) {
    return this.sendCommand("hide_view", [view]);
  }

  /**
   * Returns whether the given view is currently visible.
   * When `mainWindowOnly` is false, also checks the second window.
   */
  public async isViewVisible(view: View, mainWindowOnly = true) {
    return this.sendCommand("is_view_visible", [view, mainWindowOnly]);
  }

  /** Scrolls the given view in the given direction when possible. */
  public async scrollView(
    view: View,
    direction: NavDirection,
    modifierPressed?: boolean,
  ) {
    return this.sendCommand("scroll_view", {
      direction,
      view,
      modifier_pressed: modifierPressed,
    });
  }

  /** Shows the given view. */
  public async showView(view: View) {
    return this.sendCommand("show_view", [view]);
  }

  /**
   * Reveals the device chain and browser and starts hot-swap for the selected
   * device. Calling again stops hot-swap.
   */
  public async toggleBrowse() {
    return this.sendCommand("toggle_browse");
  }

  /** Zooms the given view in the given direction when possible. */
  public async zoomView(
    view: View,
    direction: NavDirection,
    modifierPressed?: boolean,
  ) {
    return this.sendCommand("zoom_view", {
      direction,
      view,
      modifier_pressed: modifierPressed,
    });
  }
}
