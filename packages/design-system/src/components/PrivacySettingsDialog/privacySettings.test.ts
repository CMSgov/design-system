import { COOKIE_KEY, getPrivacySettings, setPrivacySettings } from './privacySettings';

describe('default privacy settings', function () {
  it('sets cookie with default values if not set', () => {
    const expectedValue = encodeURI('0:0|c3:0|c2:0|c1:0|c4:0');
    expect(document.cookie).toEqual(`${COOKIE_KEY}=${expectedValue}`);
  });
});

describe('getPrivacySettings', function () {
  it('reads cookie string into settings object', () => {
    const encoded = encodeURI('0:0|c3:1|c2:1|c1:0|c4:1');
    document.cookie = `${COOKIE_KEY}=${encoded}`;
    expect(getPrivacySettings()).toEqual({
      0: '0',
      c3: '1',
      c2: '1',
      c1: '0',
      c4: '1',
    });
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
    const expectedValue = encodeURI('0:0|c3:0|c2:0|c1:0|c4:1');
    expect(document.cookie).toEqual(`${COOKIE_KEY}=${expectedValue}`);
  });
});
