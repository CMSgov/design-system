import { config } from '@cmsgov/design-system';

export function headerSendsAnalytics() {
  return config().headerSendsAnalytics;
}

export function setHeaderSendsAnalytics(value: boolean) {
  config({ headerSendsAnalytics: value });
}
