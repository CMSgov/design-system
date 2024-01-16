import { AnalyticsFunction, sendLinkEvent } from './analytics';

export enum ErrorPlacement {
  Top = 'top',
  Bottom = 'bottom',
}

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
   * Controls whether help drawer components send analytics data by default. To override this
   * setting for an individual help drawer instance, use the `analytics` prop.
   */
  helpDrawerSendsAnalytics: boolean;
  /**
   * Controls whether the header component send analytics data by default. Alternatively,
   * this can be set on the header instance itself using the `analytics` prop.
   */
  headerSendsAnalytics: boolean;
}

export type PartialConfig = Partial<Config>;

export const DEFAULTS: Config = Object.freeze({
  errorPlacementDefault: ErrorPlacement.Top,
  defaultAnalyticsFunction: sendLinkEvent,
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

// Deprecated stuff

export function setDefaultAnalyticsFunction(analyticsFunction: AnalyticsFunction) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(
      'The `setDefaultAnalyticsFunction` function is deprecated. Please use `config` instead.'
    );
  }
  config({ defaultAnalyticsFunction: analyticsFunction });
}

export const defaultAnalyticsFunction = config().defaultAnalyticsFunction;
