const flags = {
  HEADER_SENDS_ANALYTICS: true,
};

export function headerSendsAnalytics() {
  return flags.HEADER_SENDS_ANALYTICS;
}

export function setHeaderSendsAnalytics(value: boolean) {
  flags.HEADER_SENDS_ANALYTICS = value;
}
