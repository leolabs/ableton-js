import { Ableton } from "..";
import { Namespace } from ".";
import { ApplicationView } from "./application-view";

export interface GettableProperties {
  bugfix_version: number;
  major_version: number;
  minor_version: number;
  version: string;
  current_dialog_button_count: number;
  current_dialog_message: string;
  open_dialog_count: number;
  // More properties are available
}

export interface TransformedProperties {}

export interface SettableProperties {}

export interface ObservableProperties {
  open_dialog_count: number;
}

export class Application extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "application");
  }

  public view = new ApplicationView(this.ableton);

  public async pressCurrentDialogButton(index: number) {
    return this.sendCommand("press_current_dialog_button", [index]);
  }
}
