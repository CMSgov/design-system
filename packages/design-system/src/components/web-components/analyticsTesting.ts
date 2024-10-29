import { UtagContainer } from '../analytics/index';
import { config } from '../config';

export function mockTealium() {
  const tealiumMock = jest.fn();
  (window as any as UtagContainer).utag = {
    link: tealiumMock,
  };
  jest.useFakeTimers();
  return tealiumMock;
}

export function unmockTealium() {
  jest.resetAllMocks();
  jest.useRealTimers();
}

export function waitForAnalytics() {
  jest.advanceTimersToNextTimer();
  new Promise((resolve) => setTimeout(resolve, 0));
}

type TestFunction = (params: {
  tealiumMock: jest.Mock<any, any>;
  waitForAnalytics: typeof waitForAnalytics;
}) => Promise<any>;

export function testAnalytics(testName: string, fn: TestFunction) {
  test(testName, async () => {
    const tealiumMock = mockTealium();
    const returnVal = await fn({ tealiumMock, waitForAnalytics });
    unmockTealium();
    return returnVal;
  });
}

testAnalytics.skip = (testName: string, fn: TestFunction) => {
  test.skip(testName, () => fn({} as any));
};

export function testAnalyticsEvents({ tagName, renderComponent, configField, triggerAction }) {
  beforeEach(() => {
    config({ [configField]: true });
  });

  afterEach(() => {
    config({ [configField]: false });
  });

  testAnalytics('sends analytics event', async ({ tealiumMock, waitForAnalytics }) => {
    renderComponent();
    await triggerAction();
    await waitForAnalytics();
    expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
  });

  testAnalytics('disables analytics event tracking', async ({ tealiumMock, waitForAnalytics }) => {
    renderComponent({ analytics: 'false' });
    await triggerAction();
    await waitForAnalytics();
    expect(tealiumMock).not.toHaveBeenCalled();
  });

  testAnalytics(
    'setting analytics to true overrides flag value',
    async ({ tealiumMock, waitForAnalytics }) => {
      config({ [configField]: false });
      renderComponent({ analytics: 'true' });
      await triggerAction();
      await waitForAnalytics();
      expect(tealiumMock).toHaveBeenCalled();
    }
  );

  testAnalytics(
    'overrides analytics event tracking on open',
    async ({ tealiumMock, waitForAnalytics }) => {
      renderComponent({ 'analytics-label-override': 'alternate content' });
      await triggerAction();
      await waitForAnalytics();
      expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    }
  );

  testAnalytics.skip(
    'allows default analytics function to be ovewridden',
    async ({ tealiumMock, waitForAnalytics }) => {
      let analyticsEvent;
      renderComponent();
      document.querySelector(tagName).addEventListener('ds-analytics-event', (event: any) => {
        event.preventDefault();
        analyticsEvent = event.detail.event;
      });
      await triggerAction();
      await waitForAnalytics();
      expect(tealiumMock).not.toHaveBeenCalled();
      expect(analyticsEvent).toBeDefined();
      expect(analyticsEvent).toMatchSnapshot();
    }
  );
}
