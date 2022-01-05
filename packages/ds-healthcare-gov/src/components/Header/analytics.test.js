import { sendHeaderEvent } from './analytics';
import { setHeaderSendsAnalytics } from '../flags';

describe('sendHeaderEvent', () => {
  beforeEach(() => {
    window.utag = {
      link: jest.fn(),
    };
  });

  it('sends a basic analytics event', () => {
    sendHeaderEvent('Click here!');
    expect(window.utag.link.mock.calls[0][0]).toMatchSnapshot();
  });

  it('sends an analytics event with a url', () => {
    sendHeaderEvent('Link to somewhere', 'https://somewhere');
    expect(window.utag.link.mock.calls[0][0]).toMatchSnapshot();
  });

  it('should not send an analytics event when feature flag is off', () => {
    setHeaderSendsAnalytics(false);
    sendHeaderEvent("Don't look at me!");
    expect(window.utag.link).not.toHaveBeenCalled();
  });
});
