import { AnalyticsFunction, sendLinkEvent } from './analytics';
import type { ErrorPlacement } from './InlineError/useInlineError';

export interface Config {
  /**
   * Sets the default error placement for form-field components, which is the placement
   * of the error message relative to the field input. Accepts string values of 'top' or
   * 'bottom'.
   */
  errorPlacementDefault: ErrorPlacement;
  /**
   * Changing this setting allows applications to override the default `onAnalyticsEvent`
   * handler function for all analytics-enabled components. To override it for a single
   * component instance, use the `onAnalyticsEvent` prop instead.
   */
  defaultAnalyticsFunction: AnalyticsFunction;
  /**
   * Controls whether alert components send analytics data by default. To override this
   * setting for an individual alert instance, use the `analytics` prop.
   */
  alertSendsAnalytics: boolean;
  /**
   * Controls whether button components send analytics data by default. To override this
   * setting for an individual button instance, use the `analytics` prop.
   */
  buttonSendsAnalytics: boolean;
  /**
   * Controls whether dialog components send analytics data by default. To override this
   * setting for an individual dialog instance, use the `analytics` prop.
   */
  dialogSendsAnalytics: boolean;
  /**
   * Controls whether help drawer components send analytics data by default. To override
   * this setting for an individual help drawer instance, use the `analytics` prop.
   */
  helpDrawerSendsAnalytics: boolean;
  /**
   * Controls whether the header component send analytics data. Defaults to true.
   */
  headerSendsAnalytics: boolean;
  /**
   * Controls whether the footer component send analytics data. Defaults to true.
   */
  footerSendsAnalytics: boolean;
  /**
   * Controls whether third-party-external-link components send analytics data by default.
   * To override this setting for an individual alert instance, use the `analytics` prop.
   */
  thirdPartyExternalLinkSendsAnalytics: boolean;
}

export type PartialConfig = Partial<Config>;

export const DEFAULTS: Config = Object.freeze({
  errorPlacementDefault: 'top',
  defaultAnalyticsFunction: sendLinkEvent,
  alertSendsAnalytics: false,
  buttonSendsAnalytics: false,
  dialogSendsAnalytics: false,
  helpDrawerSendsAnalytics: false,
  headerSendsAnalytics: false,
  footerSendsAnalytics: false,
  thirdPartyExternalLinkSendsAnalytics: false,
});

export const HEALTHCARE_DEFAULTS: Config = {
  ...DEFAULTS,
  errorPlacementDefault: 'bottom',
  headerSendsAnalytics: true,
  footerSendsAnalytics: true,
  thirdPartyExternalLinkSendsAnalytics: true,
};

const _config = { ...DEFAULTS };

export function config(incomingConfig?: PartialConfig): Config {
  Object.assign(_config, incomingConfig);
  return _config;
}

config.DEFAULTS = DEFAULTS;
config.HEALTHCARE_DEFAULTS = HEALTHCARE_DEFAULTS;

// Deprecated stuff

function depWarning(fnName: string) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      `The '${fnName}' function is deprecated. Please use the global 'config' function instead.`
    );
  }
}

export function setDefaultAnalyticsFunction(analyticsFunction: AnalyticsFunction) {
  depWarning('setDefaultAnalyticsFunction');
  config({ defaultAnalyticsFunction: analyticsFunction });
}

export const defaultAnalyticsFunction = config().defaultAnalyticsFunction;

export function errorPlacementDefault(): ErrorPlacement {
  depWarning('setDefaultAnalyticsFunction');
  return config().errorPlacementDefault;
}

export function setErrorPlacementDefault(value: ErrorPlacement): void {
  depWarning('setErrorPlacementDefault');
  config({ errorPlacementDefault: value });
}

export function alertSendsAnalytics(): boolean {
  depWarning('alertSendsAnalytics');
  return config().alertSendsAnalytics;
}

export function setAlertSendsAnalytics(value: boolean): void {
  depWarning('setAlertSendsAnalytics');
  config({ alertSendsAnalytics: value });
}

export function buttonSendsAnalytics(): boolean {
  depWarning('buttonSendsAnalytics');
  return config().buttonSendsAnalytics;
}

export function setButtonSendsAnalytics(value: boolean): void {
  depWarning('setButtonSendsAnalytics');
  config({ buttonSendsAnalytics: value });
}

export function dialogSendsAnalytics(): boolean {
  depWarning('dialogSendsAnalytics');
  return config().dialogSendsAnalytics;
}

export function setDialogSendsAnalytics(value: boolean): void {
  depWarning('setDialogSendsAnalytics');
  config({ dialogSendsAnalytics: value });
}

export function helpDrawerSendsAnalytics(): boolean {
  depWarning('helpDrawerSendsAnalytics');
  return config().helpDrawerSendsAnalytics;
}

export function setHelpDrawerSendsAnalytics(value: boolean): void {
  depWarning('setHelpDrawerSendsAnalytics');
  config({ helpDrawerSendsAnalytics: value });
}
