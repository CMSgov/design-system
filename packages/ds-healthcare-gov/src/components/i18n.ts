/* eslint-disable filenames/match-exported */
/**
 * @file Initializes and exports a single i18next instance,
 *  responsible for rendering internationalized strings.
 */
import en from './locale/en.json';
import es from './locale/es.json';
import { i18n, Language } from '@cmsgov/design-system';

// TODO: This may look very weird, but it's a band-aid until we can release a breaking change.
// Inside each language object (which holds all the translations), we are adding a namespace
// for each of the languages. In our old API for healthcare.gov, the language was passed to
// each component that needed it. Now we want to have the language set in one place, and we
// want to try to auto- detect the language first. In order to be backwards-compatible with
// the old API, we need to be able to switch languages inside each component's render
// function. Instead actually calling `i18n.changeLanguage` inside a render function (which
// would make that function impure), we'll set the namespace to `es` or `en`. When we fully
// deprecate the old per- component language API, we can remove this hack. - PW
i18n.addResourceBundle('en', 'en', en, true);
i18n.addResourceBundle('en', 'es', es, true);
i18n.addResourceBundle('es', 'es', es, true);
i18n.addResourceBundle('es', 'en', en, true);
// This is what we'll keep long term:
i18n.addResourceBundle('en', 'healthcare', en);
i18n.addResourceBundle('es', 'healthcare', es);

export { i18n, Language };
export default i18n;
