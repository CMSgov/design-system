/* eslint-disable filenames/match-exported */
/**
 * @file Initializes and exports a single i18next instance,
 *  responsible for rendering internationalized strings.
 */
import en from '../locale/en.json';
import es from '../locale/es.json';
import i18n from 'i18next';

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
      lng: 'en', // 'en' | 'es'
      resources: {
        en: {
          translation: en,
        },
        es: {
          translation: es,
        },
      },
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
