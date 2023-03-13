import Cookies from 'js-cookie';

const cookies = Cookies.withConverter({
  read: (value) => decodeURI(value),
  write: (value) => encodeURI(value as string),
});

/**
 * Returns a string for the cookie's domain that will work for all subdomains
 * of the current domain (e.g. "healthcare.gov") unless we're not on a .gov
 * site right now.
 */
export function getCookieDomain() {
  if (typeof window === 'undefined') {
    return;
  }

  const parts = window.location.hostname.split('.');
  // Starting from the end and working back means that this logic will now support
  // any number of subdomains in the hostname (including zero).
  const tld = parts[parts.length - 1]; // Last item
  const domain = parts[parts.length - 2]; // Second to last item

  if (domain && tld === 'gov') {
    // From MDN:
    //   Contrary to earlier specifications, leading dots in domain names are ignored,
    //   but browsers may decline to set the cookie containing such dots.
    return `${domain}.${tld}`;
  }
}

export const COOKIE_KEY = 'OPTOUTMULTI';
export const COOKIE_EXPIRES = 365 * 3; // 3 years
export const COOKIE_DOMAIN = getCookieDomain();

export function getPrivacySettings() {
  const cookieString = cookies.get(COOKIE_KEY);
  if (!cookieString && COOKIE_DOMAIN) {
    throw new Error(
      `Privacy settings error: ${COOKIE_KEY} is not set. Check to make sure your app has Tealium enabled.`
    );
  }
  const pairs = cookieString.split('|');
  const settings = pairs.reduce((obj, pair) => {
    const [key, value] = pair.split(':');
    obj[key] = value;
    return obj;
  }, {});
  return settings;
}

export function setPrivacySettings(settings) {
  const cookieString = Object.keys(settings)
    .map((key) => `${key}:${settings[key]}`)
    .join('|');

  cookies.set(COOKIE_KEY, cookieString, {
    expires: COOKIE_EXPIRES,
    domain: COOKIE_DOMAIN,
  });
}

// Set a default if we're not on a healthcare.gov/cuidadodesalud.gov environment
if (!COOKIE_DOMAIN && !cookies.get(COOKIE_KEY)) {
  setPrivacySettings({ 0: '0', c3: '0', c2: '0', c1: '0', c4: '0' });
}
