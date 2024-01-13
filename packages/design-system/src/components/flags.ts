import { ErrorPlacement, config } from './config';

export function errorPlacementDefault(): ErrorPlacement {
  return config().errorPlacementDefault;
}

export function setErrorPlacementDefault(value: ErrorPlacement): void {
  config({ errorPlacementDefault: value });
}

export function alertSendsAnalytics(): boolean {
  return config().alertSendsAnalytics;
}

export function setAlertSendsAnalytics(value: boolean): void {
  config({ alertSendsAnalytics: value });
}

export function buttonSendsAnalytics(): boolean {
  return config().buttonSendsAnalytics;
}

export function setButtonSendsAnalytics(value: boolean): void {
  config({ buttonSendsAnalytics: value });
}

export function dialogSendsAnalytics(): boolean {
  return config().dialogSendsAnalytics;
}

export function setDialogSendsAnalytics(value: boolean): void {
  config({ dialogSendsAnalytics: value });
}

export function helpDrawerSendsAnalytics(): boolean {
  return config().helpDrawerSendsAnalytics;
}

export function setHelpDrawerSendsAnalytics(value: boolean): void {
  config({ helpDrawerSendsAnalytics: value });
}
