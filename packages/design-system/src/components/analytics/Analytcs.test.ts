import { sendTealiumEvent } from './Analytics';

describe('sendTealiumEvent', () => {
  const gaEventProps = {
    ga_eventCategory: 'test category',
    ga_eventAction: 'test action',
    ga_eventLabel: 'test label',
    ga_eventValue: 'test value',
  };

  describe('without utag instance', () => {
    it('does nothing if window.utag does not exist', () => {
      const mock = jest.fn();
      window.utag = undefined;
      sendTealiumEvent(gaEventProps);
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

    const expectedEventProps = {
      ga_eventType: 'cmsds',
      ga_eventCategory: 'test category',
      ga_eventAction: 'test action',
      ga_eventLabel: 'test label',
      ga_eventValue: 'test value',
    };

    it('calls window.utag.link with default props', () => {
      sendTealiumEvent(gaEventProps);
      expect(window.utag?.link).toHaveBeenCalledWith(expectedEventProps);
    });

    it('calls window.utag.link with extra props', () => {
      const gaEventExtraProps = {
        ga_eventCategory: 'test category',
        ga_eventAction: 'test action',
        ga_eventLabel: 'test label',
        ga_eventValue: 'test value',
        ga_extraProps1: 'test extra props 1',
        ga_extraProps2: 'test extra props 2',
      };
      const expectedEventExtraProps = {
        ga_eventType: 'cmsds',
        ga_eventCategory: 'test category',
        ga_eventAction: 'test action',
        ga_eventLabel: 'test label',
        ga_eventValue: 'test value',
        ga_extraProps1: 'test extra props 1',
        ga_extraProps2: 'test extra props 2',
      };
      sendTealiumEvent(gaEventExtraProps);
      expect(window.utag?.link).toHaveBeenCalledWith(expectedEventExtraProps);
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
      window.console.log = jest.fn();
      sendTealiumEvent(gaEventProps);
      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith('Error sending event to Tealium', 'test event');
    });

    it('retries on missing utag.link', () => {
      const mock = jest.fn();
      jest.useFakeTimers();

      window.utag = { link: undefined };
      sendTealiumEvent(gaEventProps);
      expect(mock).not.toHaveBeenCalled();

      window.utag = { link: mock };
      jest.runAllTimers();
      expect(mock).toHaveBeenCalled();
    });

    it('stops retry eventually', () => {
      jest.useFakeTimers();
      window.console.log = jest.fn();

      window.utag = { link: undefined };
      sendTealiumEvent(gaEventProps);

      jest.runAllTimers();
      jest.runAllTimers();
      jest.runAllTimers();

      expect(setTimeout).toHaveBeenCalledTimes(3);
      expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 300);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 900);

      // eslint-disable-next-line no-console
      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('Tealium event max retries reached')
      );
    });
  });
});
