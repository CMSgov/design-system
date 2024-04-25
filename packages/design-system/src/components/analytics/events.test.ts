import { UtagContainer, sendLinkEvent } from './events';

describe('sendLinkEvent', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  const eventProps = {
    event_type: 'ui interaction',
    event_name: 'test event',
    event_category: 'test category',
    event_action: 'test action',
    event_label: 'test label',
    event_extension: 'Design system integration',
  };

  describe('without utag instance', () => {
    it('does nothing if window.utag does not exist', () => {
      const mock = jest.fn();
      (window as any as UtagContainer).utag = undefined;
      sendLinkEvent(eventProps);
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
      sendLinkEvent(eventProps);
      expect((window as any as UtagContainer).utag?.link).toHaveBeenCalledWith(eventProps);
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
      const originalWarn = console.warn;
      console.warn = jest.fn();
      sendLinkEvent(eventProps);
      expect((console.warn as jest.Mock).mock.lastCall).toMatchSnapshot();
      console.warn = originalWarn;
    });

    it('retries on missing utag.link', () => {
      const mock = jest.fn();
      jest.useFakeTimers();

      (window as any as UtagContainer).utag = { link: undefined };
      sendLinkEvent(eventProps);
      expect(mock).not.toHaveBeenCalled();

      (window as any as UtagContainer).utag = { link: mock };
      jest.runAllTimers();
      expect(mock).toHaveBeenCalled();
    });

    it('stops retry eventually', () => {
      jest.useFakeTimers();

      (window as any as UtagContainer).utag = { link: undefined };
      expect(sendLinkEvent(eventProps)).toBe(undefined);

      jest.runAllTimers();
      jest.runAllTimers();
      jest.runAllTimers();

      expect(setTimeout).toHaveBeenCalledTimes(3);
      expect(setTimeout).toHaveBeenNthCalledWith(1, expect.any(Function), 300);
      expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 900);
    });
  });
});
