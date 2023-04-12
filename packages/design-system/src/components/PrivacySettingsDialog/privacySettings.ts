export const COOKIE_KEY = 'OPTOUTMULTI';
export const COOKIE_MAX_AGE = 365 * 3; // 3 years
export const COOKIE_DOMAIN = getCookieDomain();

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

function readCookie(name: string) {
  if (typeof document === 'undefined') {
    return;
  }

  const item = document.cookie
    .split(';')
    .map((item) => item.trim().split('='))
    .find(([itemName]) => itemName === name);
  const value = item?.[1];
  if (typeof value === 'string') {
    return decodeURI(value);
  }
}

function writeCookie(name: string, value: string) {
  if (typeof document === 'undefined') {
    return;
  }

  // See https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie
  const base = `${name}=${encodeURI(value)}`;
  const age = `; max-age=${COOKIE_MAX_AGE}`;
  const domain = COOKIE_DOMAIN ? `; domain=${COOKIE_DOMAIN}` : '';
  const path = '; path=/'; // Should apply to any path on the site

  document.cookie = `${base}${age}${domain}${path}`;
}

export interface PrivacySettings {
  '0': '0' | '1';
  c3: '0' | '1';
  c2: '0' | '1';
  c1: '0' | '1';
  c4: '0' | '1';
}

export function getPrivacySettings(): PrivacySettings {
  const cookieString = readCookie(COOKIE_KEY);
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
  }, {} as PrivacySettings);
  return settings;
}

export function setPrivacySettings(settings: PrivacySettings) {
  const cookieString = Object.keys(settings)
    .map((key) => `${key}:${settings[key]}`)
    .join('|');

  writeCookie(COOKIE_KEY, cookieString);
}

// Set a default if we're not on a .gov environment
if (!COOKIE_DOMAIN && !readCookie(COOKIE_KEY)) {
  setPrivacySettings({ 0: '0', c3: '0', c2: '0', c1: '0', c4: '0' });
}
