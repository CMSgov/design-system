import { UtagContainer } from '../analytics/index';
import { config } from '../config';

export function testAnalyticsEvents({ tagName, renderComponent, configField, triggerAction }) {
  function before() {
    config({ [configField]: true });
    const tealiumMock = jest.fn();
    (window as any as UtagContainer).utag = {
      link: tealiumMock,
    };
    jest.useFakeTimers();
    return tealiumMock;
  }

  function after() {
    config({ [configField]: false });
    jest.resetAllMocks();
    jest.useRealTimers();
  }

  function waitForAnalytics() {
    jest.advanceTimersToNextTimer();
    new Promise((resolve) => setTimeout(resolve, 0));
  }

  it('sends analytics event', async () => {
    const tealiumMock = before();
    renderComponent();
    await triggerAction();
    await waitForAnalytics();
    expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    after();
  });

  it('disables analytics event tracking', async () => {
    const tealiumMock = before();
    renderComponent({ analytics: 'false' });
    await triggerAction();
    await waitForAnalytics();
    expect(tealiumMock).not.toHaveBeenCalled();
    after();
  });

  it('setting analytics to true overrides flag value', async () => {
    const tealiumMock = before();
    config({ [configField]: false });
    renderComponent({ analytics: 'true' });
    await triggerAction();
    await waitForAnalytics();
    expect(tealiumMock).toHaveBeenCalled();
    after();
  });

  it('overrides analytics event tracking on open', async () => {
    const tealiumMock = before();
    renderComponent({ 'analytics-label-override': 'alternate content' });
    await triggerAction();
    await waitForAnalytics();
    expect(tealiumMock.mock.calls[0]).toMatchSnapshot();
    after();
  });

  it.skip('allows default analytics function to be ovewridden', async () => {
    const tealiumMock = before();
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
    after();
  });
}
