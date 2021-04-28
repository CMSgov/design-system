import { sendAnalyticsEvent } from './SendAnalytics';

describe('sendAnalyticsEvent', () => {
  const gaEventProps = {
    ga_eventType: 'cmsds',
    ga_eventCategory: 'test category',
    ga_eventAction: 'test action',
    ga_eventLabel: 'test label',
    ga_eventValue: 'test value',
  };

  describe('without utag instance', () => {
    it('does nothing if window.utag does not exist', () => {
      const mock = jest.fn();
      window.utag = undefined;
      sendAnalyticsEvent({}, gaEventProps);
      expect(mock).not.toHaveBeenCalled();
    });
  });

  describe('with Utag instance', () => {
    beforeEach(() => {
      window.utag = {
        link: jest.fn(),
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('calls window.utag.link with default props', () => {
      sendAnalyticsEvent({}, gaEventProps);
      expect(window.utag?.link).toHaveBeenCalledWith(gaEventProps);
    });

    it('calls window.utag.link with extra props', () => {
      const gaEventExtraProps = {
        ga_eventType: 'cmsds',
        ga_eventCategory: 'test category',
        ga_eventAction: 'test action',
        ga_eventLabel: 'test label',
        ga_eventValue: 'test value',
        ga_extraProps1: 'test extra props 1',
        ga_extraProps2: 'test extra props 2',
      };
      sendAnalyticsEvent(gaEventExtraProps, gaEventProps);
      expect(window.utag?.link).toHaveBeenCalledWith(gaEventExtraProps);
    });
  });

  describe('with Utag instance - errors', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('catches errors on failed sendEvent', () => {
      window.utag = {
        link: jest.fn(() => {
          // eslint-disable-next-line no-throw-literal
          throw 'test event';
        }),
      };
      expect(sendAnalyticsEvent({}, gaEventProps)).toBe(
        'Error sending event to Tealium test event'
      );
    });

    it('retries on missing utag.link', () => {
      const mock = jest.fn();
      jest.useFakeTimers();

      window.utag = { link: undefined };
      sendAnalyticsEvent({}, gaEventProps);
      expect(mock).not.toHaveBeenCalled();

      window.utag = { link: mock };
      jest.runAllTimers();
      expect(mock).toHaveBeenCalled();
    });

    it('stops retry eventually', () => {
      jest.useFakeTimers();

      window.utag = { link: undefined };
      expect(sendAnalyticsEvent({}, gaEventProps)).toBe(undefined);

      jest.runAllTimers();
      jest.runAllTimers();
      jest.runAllTimers();

      expect(setTimeout).toHaveBeenCalledTimes(3);
      expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 300);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 900);
    });
  });
});
