export enum ErrorPlacement {
  Top = 'top',
  Bottom = 'bottom',
}

interface flagsType {
  ERROR_PLACEMENT_DEFAULT: ErrorPlacement;
  ALERT_SENDS_ANALYTICS: boolean;
  BUTTON_SENDS_ANALYTICS: boolean;
  DIALOG_SENDS_ANALYTICS: boolean;
  HELP_DRAWER_SENDS_ANALYTICS: boolean;
}

// featureFlags.js
const flags: flagsType = {
  ERROR_PLACEMENT_DEFAULT: ErrorPlacement.Top,
  ALERT_SENDS_ANALYTICS: false,
  BUTTON_SENDS_ANALYTICS: false,
  DIALOG_SENDS_ANALYTICS: false,
  HELP_DRAWER_SENDS_ANALYTICS: false,
};

export function errorPlacementDefault(): ErrorPlacement {
  return flags.ERROR_PLACEMENT_DEFAULT;
}

export function setErrorPlacementDefault(value: ErrorPlacement): void {
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
