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
  headerSendsAnalytics: boolean;
}

export type PartialConfig = Partial<Config>;

export const DEFAULTS: Config = Object.freeze({
  errorPlacementDefault: ErrorPlacement.Top,
  alertSendsAnalytics: false,
  buttonSendsAnalytics: false,
  dialogSendsAnalytics: false,
  helpDrawerSendsAnalytics: false,
  headerSendsAnalytics: false,
});

export const HEALTHCARE_DEFAULTS: Config = {
  ...DEFAULTS,
  errorPlacementDefault: ErrorPlacement.Bottom,
};

const _config = { ...DEFAULTS };

export function config(incomingConfig?: PartialConfig): Config {
  Object.assign(_config, incomingConfig);
  return _config;
}

config.DEFAULTS = DEFAULTS;
config.HEALTHCARE_DEFAULTS = HEALTHCARE_DEFAULTS;
