export enum ErrorPlacement {
  Top = 'top',
  Bottom = 'bottom',
}

export interface Config {
  errorPlacementDefault: ErrorPlacement;
  alertSendsAnalytics: boolean;
  buttonSendsAnalytics: boolean;
  dialogSendsAnalytics: boolean;
  helpDrawerSendsAnalytics: boolean;
}

export type PartialConfig = Partial<Config>;

export const defaultConfig: Config = Object.freeze({
  errorPlacementDefault: ErrorPlacement.Top,
  alertSendsAnalytics: false,
  buttonSendsAnalytics: false,
  dialogSendsAnalytics: false,
  helpDrawerSendsAnalytics: false,
});

const _config = { ...defaultConfig };

export function config(incomingConfig: PartialConfig): Config {
  Object.assign(_config, incomingConfig);
  return _config;
}
