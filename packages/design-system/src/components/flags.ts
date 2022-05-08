type errorPlacementValue = 'top' | 'bottom';

interface flagsType {
  ERROR_PLACEMENT_DEFAULT: errorPlacementValue;
  ALERT_SENDS_ANALYTICS: boolean;
  BUTTON_SENDS_ANALYTICS: boolean;
  DIALOG_SENDS_ANALYTICS: boolean;
  HELP_DRAWER_SENDS_ANALYTICS: boolean;
  DISPLAY_INLINE_ERROR_ICON: boolean;
}

// featureFlags.js
const flags: flagsType = {
  ERROR_PLACEMENT_DEFAULT: 'top',
  ALERT_SENDS_ANALYTICS: false,
  BUTTON_SENDS_ANALYTICS: false,
  DIALOG_SENDS_ANALYTICS: false,
  HELP_DRAWER_SENDS_ANALYTICS: false,
  DISPLAY_INLINE_ERROR_ICON: false,
};

export function setInlineErrorIconDisplay(value: boolean): void {
  flags.DISPLAY_INLINE_ERROR_ICON = value;
}

export function errorPlacementDefault(): errorPlacementValue {
  return flags.ERROR_PLACEMENT_DEFAULT;
}

export function setErrorPlacementDefault(value: errorPlacementValue): void {
  flags.ERROR_PLACEMENT_DEFAULT = value;
}

export function alertSendsAnalytics(): boolean {
  return flags.ALERT_SENDS_ANALYTICS;
}

export function setAlertSendsAnalytics(value: boolean): void {
  flags.ALERT_SENDS_ANALYTICS = value;
}

export function buttonSendsAnalytics(): boolean {
  return flags.BUTTON_SENDS_ANALYTICS;
}

export function setButtonSendsAnalytics(value: boolean): void {
  flags.BUTTON_SENDS_ANALYTICS = value;
}

export function dialogSendsAnalytics(): boolean {
  return flags.DIALOG_SENDS_ANALYTICS;
}

export function setDialogSendsAnalytics(value: boolean): void {
  flags.DIALOG_SENDS_ANALYTICS = value;
}

export function helpDrawerSendsAnalytics(): boolean {
  return flags.HELP_DRAWER_SENDS_ANALYTICS;
}

export function setHelpDrawerSendsAnalytics(value: boolean): void {
  flags.HELP_DRAWER_SENDS_ANALYTICS = value;
}
