import {
  COOKIE_DOMAIN,
  COOKIE_EXPIRES,
  COOKIE_KEY,
  getPrivacySettings,
  setPrivacySettings,
} from './privacySettings';

jest.mock('js-cookie', () => {
  const mock = {
    get: jest.fn(() => '0:0|c3:1|c2:1|c1:0|c4:1'),
    set: jest.fn(),
    withConverter: jest.fn(() => mock),
  };
  return mock;
});

describe('Privacy settings cookie config', () => {
  it('should configure js-cookie to decodeURI/encodeURI', () => {
    const Cookies = require('js-cookie');
    expect(Cookies.withConverter).toHaveBeenCalled();
    const encoded = '0:0%7Cc3:0%7Cc2:0%7Cc1:0%7Cc4:1';
    const decoded = '0:0|c3:0|c2:0|c1:0|c4:1';
    const config = Cookies.withConverter.mock.calls[0][0];
    expect(config.read(encoded)).toEqual(decoded);
    expect(config.write(decoded)).toEqual(encoded);
  });

  it("should not set a default cookie for testing if there's already a value", () => {
    const Cookies = require('js-cookie');
    // The cookie should be "set" because our mock always returns a value for Cookie.get
    expect(Cookies.set).not.toHaveBeenCalled();
  });
});

describe('getPrivacySettings', function () {
  it('reads cookie string into settings object', () => {
    const Cookies = require('js-cookie');
    expect(getPrivacySettings()).toEqual({
      0: '0',
      c3: '1',
      c2: '1',
      c1: '0',
      c4: '1',
    });
    expect(Cookies.get).toHaveBeenCalledWith(COOKIE_KEY);
  });
});

describe('setPrivacySettings', function () {
  it('writes cookie string from settings object', () => {
    setPrivacySettings({
      0: '0',
      c3: '0',
      c2: '0',
      c1: '0',
      c4: '1',
    });
    const Cookies = require('js-cookie');
    expect(Cookies.set).toHaveBeenCalledWith(COOKIE_KEY, '0:0|c3:0|c2:0|c1:0|c4:1', {
      expires: COOKIE_EXPIRES,
      domain: COOKIE_DOMAIN,
    });
  });
});
