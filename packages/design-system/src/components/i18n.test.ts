import {
  getLanguage,
  setLanguage,
  getTranslations,
  addTranslations,
  languageMatches,
  fallbackLocale,
  translate,
  t,
  tWithLanguage,
} from './i18n';

describe('i18n', () => {
  afterEach(() => {
    setLanguage('en');
  });

  describe('getLanguage and setLanguage', () => {
    it('getLanguage and setLanguage work', () => {
      expect(getLanguage()).toEqual('en');
      setLanguage('es');
      expect(getLanguage()).toEqual('es');
    });
  });

  describe('getTranslations and addTranslations', () => {
    function expectCoreTranslationSnapshot(translations: any) {
      expect(translations?.usaBanner?.bannerLabel).toMatchSnapshot();
    }

    it('getTranslation without parameter returns translations from current language (English', () => {
      expectCoreTranslationSnapshot(getTranslations());
    });

    it('getTranslation without parameter returns translations from current language (Spanish)', () => {
      setLanguage('es');
      expectCoreTranslationSnapshot(getTranslations());
    });

    it('getTranslation returns core English translations', () => {
      expectCoreTranslationSnapshot(getTranslations('en'));
    });

    it('getTranslation returns core Spanish translations', () => {
      expectCoreTranslationSnapshot(getTranslations('es'));
    });

    it('addTranslations adds translations to expected language set', () => {
      addTranslations('es', { hello: 'mundo' });
      expect(getTranslations('es').hello).toEqual('mundo');
    });
  });

  describe('languageMatches', () => {
    it('matches languages with no subtags', () => {
      expect(languageMatches('de', 'de')).toBe(true);
    });

    it('differentiates languages with no subtags', () => {
      expect(languageMatches('de', 'fr')).toBe(false);
    });

    it('matches languages with same subtags', () => {
      expect(languageMatches('de-AT', 'de-AT')).toBe(true);
    });

    it('matches languages with different subtags', () => {
      expect(languageMatches('de-AT', 'de-CH')).toBe(true);
    });

    it('differentiates languages with same subtags', () => {
      expect(languageMatches('fr-CA', 'en-CA')).toBe(false);
    });

    it('matches language with current language', () => {
      expect(languageMatches('en-US')).toBe(true);
    });

    it('differentiates language with current language', () => {
      expect(languageMatches('es-US')).toBe(false);
    });
  });

  describe('fallbackLocale', () => {
    it("falls back to language only if locale with subtag doesn't exist", () => {
      expect(fallbackLocale('en', 'LOOMPALAND')).toEqual('en');
    });

    it('uses full locale with subtag if possible', () => {
      // Note, this could give a false negative when testing on a system that
      // doesn't have the en-US locale installed.
      expect(fallbackLocale('en', 'US')).toEqual('en-US');
    });
  });

  describe('translate', () => {
    it('returns expected translation for key (default)', () => {
      expect(translate(undefined, 'usaBanner.bannerLabel')).toMatchSnapshot();
    });

    it('returns expected translation for key (English)', () => {
      expect(translate('en', 'usaBanner.bannerLabel')).toMatchSnapshot();
    });

    it('returns expected translation for key (Spanish)', () => {
      expect(translate('es', 'usaBanner.bannerLabel')).toMatchSnapshot();
    });

    it('interpolates translation string with provided data', () => {
      addTranslations('en', { favoriteColor: 'My favorite color is {{color}}.' });
      expect(translate('en', 'favoriteColor', { color: 'blue' })).toEqual(
        'My favorite color is blue.'
      );
      expect(translate('en', 'favoriteColor', { color: 'red' })).toEqual(
        'My favorite color is red.'
      );
    });

    it('throws error if key does not resolve to a string', () => {
      expect(() => translate('en', 'usaBanner')).toThrowErrorMatchingSnapshot();
    });
  });

  describe('t', () => {
    it('returns expected translation for key (default)', () => {
      expect(t('usaBanner.bannerLabel')).toMatchSnapshot();
    });

    it('returns expected translation for key (English)', () => {
      setLanguage('en');
      expect(t('usaBanner.bannerLabel')).toMatchSnapshot();
    });

    it('returns expected translation for key (Spanish)', () => {
      setLanguage('es');
      expect(t('usaBanner.bannerLabel')).toMatchSnapshot();
    });

    it('interpolates translation string with provided data', () => {
      addTranslations('en', { favoriteColor: 'My favorite color is {{color}}.' });
      expect(t('favoriteColor', { color: 'blue' })).toEqual('My favorite color is blue.');
      expect(t('favoriteColor', { color: 'red' })).toEqual('My favorite color is red.');
    });
  });

  describe('tWithLanguage', () => {
    it('generated t function returns expected translation for key (default)', () => {
      const t2 = tWithLanguage('en');
      expect(t2('usaBanner.bannerLabel')).toMatchSnapshot();
    });

    it('generated t function returns expected translation for key (English)', () => {
      const t2 = tWithLanguage('en');
      expect(t2('usaBanner.bannerLabel')).toMatchSnapshot();
    });

    it('generated t function returns expected translation for key (Spanish)', () => {
      const t2 = tWithLanguage('es');
      expect(t2('usaBanner.bannerLabel')).toMatchSnapshot();
    });

    it('generated t function interpolates translation string with provided data', () => {
      addTranslations('es', { favoriteColor: 'My favorite color is {{color}}.' });
      const t2 = tWithLanguage('es');
      expect(t2('favoriteColor', { color: 'blue' })).toEqual('My favorite color is blue.');
      expect(t2('favoriteColor', { color: 'red' })).toEqual('My favorite color is red.');
    });
  });
});
