import { config } from '@cmsgov/design-system';

config(config.HEALTHCARE_DEFAULTS);

export { config };

export function headerSendsAnalytics() {
  return config().headerSendsAnalytics;
}

export function setHeaderSendsAnalytics(value: boolean) {
  config({ headerSendsAnalytics: value });
}
