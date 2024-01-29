import { COOKIE_KEY, getPrivacySettings, setPrivacySettings } from './privacySettings';

function removeCookie() {
  document.cookie = `${COOKIE_KEY}=1; expires=1 Jan 1970 00:00:00 GMT;`;
}

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

  it('returns default settings if no cookie is set', () => {
    removeCookie();
    expect(getPrivacySettings()).toEqual({
      0: '0',
      c3: '0',
      c2: '0',
      c1: '0',
      c4: '0',
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
