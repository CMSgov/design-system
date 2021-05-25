type errorPlacementValue = 'top' | 'bottom';

interface flagsType {
  ERROR_PLACEMENT_DEFAULT: errorPlacementValue;
  ALERT_SENDS_ANALYTICS: boolean;
  DIALOG_SENDS_ANALYTICS: boolean;
  HELP_DRAWER_SENDS_ANALYTICS: boolean;
}

// featureFlags.js
const flags: flagsType = {
  ERROR_PLACEMENT_DEFAULT: 'top',
  ALERT_SENDS_ANALYTICS: false,
  DIALOG_SENDS_ANALYTICS: false,
  HELP_DRAWER_SENDS_ANALYTICS: false,
};

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
