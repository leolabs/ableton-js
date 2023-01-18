import { Ableton } from "..";
import { Namespace } from ".";

export type DocumentView = "Session" | "Arranger";
export type DetailView = "Detail" | "Detail/Clip" | "Detail/DeviceChain";
export type View = "Browser" | DocumentView | DetailView;

export enum NavDirection {
  "up",
  "down",
  "left",
  "right",
}

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

  async availableMainViews(): Promise<View[]> {
    return this.sendCachedCommand("available_main_views");
  }

  async focusView(view: View) {
    return this.sendCommand("focus_view", [view]);
  }

  async hideView(view: View) {
    return this.sendCommand("hide_view", [view]);
  }

  async isViewVisible(view: View, mainWindowOnly = true) {
    return this.sendCommand("is_view_visible", [view, mainWindowOnly]);
  }

  async scrollView(view: View, direction: NavDirection) {
    return this.sendCommand("scroll_view", [direction, view, true]);
  }

  async showView(view: View) {
    return this.sendCommand("show_view", [view]);
  }

  async toggleBrowse() {
    return this.sendCommand("toggle_browse");
  }

  async zoomView(view: View, direction: NavDirection) {
    return this.sendCommand("zoom_view", [direction, view, true]);
  }
}
