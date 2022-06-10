import { UtagContainer, sendLinkEvent } from './events';

describe('sendLinkEvent', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

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
      (window as any as UtagContainer).utag = undefined;
      sendLinkEvent(gaEventProps);
      expect(mock).not.toHaveBeenCalled();
    });
  });

  describe('with Utag instance', () => {
    beforeEach(() => {
      (window as any as UtagContainer).utag = {
        link: jest.fn(),
      };
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('calls window.utag.link with event', () => {
      sendLinkEvent(gaEventProps);
      expect((window as any as UtagContainer).utag?.link).toHaveBeenCalledWith(gaEventProps);
    });
  });

  describe('with Utag instance - errors', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });
    it('catches errors on failed sendEvent', () => {
      (window as any as UtagContainer).utag = {
        link: jest.fn(() => {
          throw 'test event';
        }),
      };
      expect(sendLinkEvent(gaEventProps)).toBe('Error sending event to Tealium test event');
    });

    it('retries on missing utag.link', () => {
      const mock = jest.fn();
      jest.useFakeTimers();

      (window as any as UtagContainer).utag = { link: undefined };
      sendLinkEvent(gaEventProps);
      expect(mock).not.toHaveBeenCalled();

      (window as any as UtagContainer).utag = { link: mock };
      jest.runAllTimers();
      expect(mock).toHaveBeenCalled();
    });

    it('stops retry eventually', () => {
      jest.useFakeTimers();

      (window as any as UtagContainer).utag = { link: undefined };
      expect(sendLinkEvent(gaEventProps)).toBe(undefined);

      jest.runAllTimers();
      jest.runAllTimers();
      jest.runAllTimers();

      expect(setTimeout).toHaveBeenCalledTimes(3);
      expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 300);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 900);
    });
  });
});
