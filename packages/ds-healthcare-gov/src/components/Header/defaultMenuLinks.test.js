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
      expect(defaultMenuLinks({ subpath: 'tax-tool/' })).toMatchSnapshot();
    });

    it('returns array of menu list objects with absolute URLs', () => {
      expect(defaultMenuLinks({ primaryDomain: 'https://www.healthcare.gov' })).toMatchSnapshot();
    });

    it('returns array of menu list objects with custom locale switch link', () => {
      expect(
        defaultMenuLinks({
          switchLocaleLink: 'https://ayudalocal.cuidadodesalud.gov/es',
        })
      ).toMatchSnapshot();
    });
  });

  describe('Spanish', () => {
    it('returns array of menu list objects', () => {
      const links = defaultMenuLinks();
      expect(links).toMatchSnapshot();
    });

    it('returns array of menu list objects with subpath', () => {
      setLanguage('es');
      expect(defaultMenuLinks({ subpath: 'tax-tool/' })).toMatchSnapshot();
      setLanguage('en');
    });

    it('returns array of menu list objects with absolute URLs', () => {
      setLanguage('es');
      expect(
        defaultMenuLinks({ primaryDomain: 'https://www.cuidadodesalud.gov' })
      ).toMatchSnapshot();
      setLanguage('en');
    });

    it('returns array of menu list objects with custom locale switch link', () => {
      setLanguage('es');
      expect(
        defaultMenuLinks({ switchLocaleLink: 'https://localhelp.healthcare.gov' })
      ).toMatchSnapshot();
      setLanguage('en');
    });
  });
});
