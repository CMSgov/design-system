/* eslint-disable filenames/match-exported */
/**
 * @file Initializes and exports a single i18next instance,
 *  responsible for rendering internationalized strings.
 */
import en from './locale/en.json';
import es from './locale/es.json';
import i18n from 'i18next';

const resources = {
  // TODO: This is all wrong, but this is a band-aid until we can release a breaking change.
  // The keys of this resources object are supposed to be the languages, but we're using
  // the namespaces feature as our language switcher because that will allow us to continue
  // to set the language on a per-component basis. Otherwise, after upgrading to the latest
  // version of i18next we'd have to start setting the language at the i18nInstance level.
  common: {
    en,
    es,
  },
};

let i18nInstance;
let t;

function init() {
  // Bail if we've already initialized i18n. This can happen
  // if there are multiple internationalized components
  if (i18nInstance) return;

  i18nInstance = i18n.createInstance(
    {
      interpolation: {
        escapeValue: false, // React doesn't need this
      },
      lng: 'common',
      resources,
    },
    function (err, _t) {
      if (err) {
        throw new Error(err);
      }

      t = _t;
    }
  );
}

init();

export const translate = t;
export default i18nInstance;
