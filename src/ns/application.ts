import { Ableton } from "../index.js";
import { Namespace } from "./index.js";
import { ApplicationView } from "./application-view.js";
import { Browser } from "./browser.js";

/** Live's `Application.MessageButtons`. */
export type MessageButtons =
  | "OK_BUTTON"
  | "OK_NEW_SET_BUTTON"
  | "OK_RETRY_BUTTON"
  | "SAVE_DONT_SAVE_BUTTON"
  | "OK_ACCOUNT_BUTTON"
  | "OK_PURCHASE_BUTTON";

/** Live's `Application.PushDialogType`. */
export type PushDialogType =
  | "MESSAGE_BOX"
  | "OUT_OF_UNLOCKS_DIALOG"
  | "RENT_TO_OWN_LICENSE_EXPIRED_DIALOG";

/** Live's `Application.Variants`. */
export type ApplicationVariant =
  | "Beta"
  | "Intro"
  | "Lite"
  | "Standard"
  | "Suite"
  | "Trial";

/** Live's `Application.UnavailableFeature`. */
export type UnavailableFeature = "note_velocity_ranges_and_probabilities";

export interface RawControlSurface {
  readonly type_name: string;
}

export interface GettableProperties {
  average_process_usage: number;
  bugfix_version: number;
  build_id: string;
  control_surfaces: (RawControlSurface | null)[];
  current_dialog_button_count: number;
  current_dialog_message: string;
  major_version: number;
  minor_version: number;
  number_of_push_apps_running: number;
  open_dialog_count: number;
  peak_process_usage: number;
  unavailable_features: UnavailableFeature[];
  variant: ApplicationVariant;
  version: string;
  // browser / view: exposed as application.browser / application.view
}

export interface TransformedProperties {}

export interface SettableProperties {}

export interface ObservableProperties {
  average_process_usage: number;
  control_surfaces: (RawControlSurface | null)[];
  open_dialog_count: number;
  peak_process_usage: number;
  unavailable_features: UnavailableFeature[];
}

export interface ShowOnTheFlyMessageOptions {
  buttons?: MessageButtons;
  enableMarkup?: boolean;
  showSuccessIcon?: boolean;
  pushDialogType?: PushDialogType;
  timeout?: number;
}

export class Application extends Namespace<
  GettableProperties,
  TransformedProperties,
  SettableProperties,
  ObservableProperties
> {
  constructor(ableton: Ableton) {
    super(ableton, "application");

    this.cachedProps = {
      control_surfaces: true,
      unavailable_features: true,
    };
  }

  public readonly browser = new Browser(this.ableton);
  public readonly view = new ApplicationView(this.ableton);

  /** Returns true if the given entry exists in Options.txt. */
  async hasOption(optionName: string): Promise<boolean> {
    return this.sendCommand("has_option", [optionName]);
  }

  /** Presses a button, by index, on the current message box. */
  async pressCurrentDialogButton(index: number) {
    return this.sendCommand("press_current_dialog_button", [index]);
  }

  // Live's show_message is not wrapped: it requires a Base.Text, which cannot
  // be instantiated from Python. Use showOnTheFlyMessage for free-form strings.

  /**
   * Shows a message box with a free-form string, returning the pressed button index.
   *
   * This command blocks until the user pushes a button, so the timeout defaults to
   * 60000ms. Increase the timeout if you expect the user to take longer to close
   * the dialog.
   */
  async showOnTheFlyMessage(
    message: string,
    options: ShowOnTheFlyMessageOptions = {},
  ) {
    return this.sendCommand(
      "show_on_the_fly_message",
      {
        message,
        buttons: options.buttons ?? "OK_BUTTON",
        enable_markup: options.enableMarkup ?? false,
        show_success_icon: options.showSuccessIcon ?? false,
        push_dialog_type: options.pushDialogType ?? "MESSAGE_BOX",
      },
      undefined,
      options.timeout ?? 60000,
    ) as Promise<number>;
  }
}
