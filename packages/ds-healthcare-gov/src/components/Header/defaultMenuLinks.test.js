import defaultMenuLinks, {
  defaultMenuLinks as namedExportDefaultMenuLinks,
} from './defaultMenuLinks';
import { setLanguage } from '@cmsgov/design-system';

describe('MenuList', function () {
  it('includes a named export', () => {
    // Some apps may need to import the default menu links in order to extend them
    expect(typeof namedExportDefaultMenuLinks).toBe('function');
  });

  it('leaves out login link if hideLoginLink true', () => {
    expect(defaultMenuLinks({ hideLoginLink: true })).toMatchSnapshot();
  });

  it('leaves out logout link if hideLogoutLink true', () => {
    expect(defaultMenuLinks({ hideLogoutLink: true })).toMatchSnapshot();
  });

  it('leaves out locale links if hideLanguageSwitch true', () => {
    expect(defaultMenuLinks({ hideLanguageSwitch: true })).toMatchSnapshot();
  });

  it('leaves out the myProfile and myApplicationsAndCoverage when customLinksPassedIn is true', () => {
    expect(defaultMenuLinks({ customLinksPassedIn: true })).toMatchSnapshot();
  });

  describe('English', () => {
    it('returns array of menu list objects', () => {
      expect(defaultMenuLinks()).toMatchSnapshot();
    });

    it('returns array of menu list objects with subpath', () => {
      expect(defaultMenuLinks({ locale: 'en', subpath: 'tax-tool/' })).toMatchSnapshot();
    });

    it('returns array of menu list objects with absolute URLs', () => {
      expect(
        defaultMenuLinks({ locale: 'en', primaryDomain: 'https://www.healthcare.gov' })
      ).toMatchSnapshot();
    });

    it('returns array of menu list objects with custom locale switch link', () => {
      expect(
        defaultMenuLinks({
          locale: 'en',
          switchLocaleLink: 'https://ayudalocal.cuidadodesalud.gov/es',
        })
      ).toMatchSnapshot();
    });
  });

  describe('Spanish', () => {
    it('returns array of menu list objects', () => {
      // Make sure you can specify the language through the deprecated `locale` prop or by the global setting
      const linksA = defaultMenuLinks({ locale: 'es' });
      setLanguage('es');
      const linksB = defaultMenuLinks();
      expect(linksA).toEqual(linksB);
      expect(linksB).toMatchSnapshot();
    });

    it('returns array of menu list objects with subpath', () => {
      expect(defaultMenuLinks({ locale: 'es', subpath: 'tax-tool/' })).toMatchSnapshot();
    });

    it('returns array of menu list objects with absolute URLs', () => {
      expect(
        defaultMenuLinks({ locale: 'es', primaryDomain: 'https://www.cuidadodesalud.gov' })
      ).toMatchSnapshot();
    });

    it('returns array of menu list objects with custom locale switch link', () => {
      expect(
        defaultMenuLinks({ locale: 'es', switchLocaleLink: 'https://localhelp.healthcare.gov' })
      ).toMatchSnapshot();
    });
  });
});
