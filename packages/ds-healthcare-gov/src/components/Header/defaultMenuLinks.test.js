import defaultMenuLinks, {
  defaultMenuLinks as namedExportDefaultMenuLinks,
} from './defaultMenuLinks';

const t = (key) => key;

describe('MenuList', function () {
  it('includes a named export', () => {
    // Some apps may need to import the default menu links in order to extend them
    expect(typeof namedExportDefaultMenuLinks).toBe('function');
  });

  it('leaves out login link if hideLoginLink true', () => {
    expect(
      defaultMenuLinks(t, undefined, undefined, undefined, undefined, undefined, true)
    ).toMatchSnapshot();
  });

  it('leaves out logout link if hideLogoutLink true', () => {
    expect(
      defaultMenuLinks(t, undefined, undefined, undefined, undefined, undefined, undefined, true)
    ).toMatchSnapshot();
  });

  it('leaves out locale links if hideLanguageSwitch true', () => {
    expect(
      defaultMenuLinks(
        t,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      )
    ).toMatchSnapshot();
  });

  it('leaves out the myProfile and myApplicationsAndCoverage when customLinksPassedIn is true', () => {
    expect(
      defaultMenuLinks(
        t,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        true
      )
    ).toMatchSnapshot();
  });

  describe('English', () => {
    it('returns array of menu list objects', () => {
      expect(defaultMenuLinks(t)).toMatchSnapshot();
    });

    it('returns array of menu list objects with subpath', () => {
      expect(defaultMenuLinks(t, 'en', 'tax-tool/')).toMatchSnapshot();
    });

    it('returns array of menu list objects with absolute URLs', () => {
      expect(defaultMenuLinks(t, 'en', undefined, 'https://www.healthcare.gov')).toMatchSnapshot();
    });

    it('returns array of menu list objects with custom locale switch link', () => {
      expect(
        defaultMenuLinks(t, 'en', undefined, undefined, 'https://ayudalocal.cuidadodesalud.gov/es')
      ).toMatchSnapshot();
    });
  });

  describe('Spanish', () => {
    it('returns array of menu list objects', () => {
      expect(defaultMenuLinks(t, 'es')).toMatchSnapshot();
    });

    it('returns array of menu list objects with subpath', () => {
      expect(defaultMenuLinks(t, 'es', 'tax-tool/')).toMatchSnapshot();
    });

    it('returns array of menu list objects with absolute URLs', () => {
      expect(defaultMenuLinks(t, 'es', undefined, 'https://www.healthcare.gov')).toMatchSnapshot();
    });

    it('returns array of menu list objects with custom locale switch link', () => {
      expect(
        defaultMenuLinks(t, 'es', undefined, undefined, 'https://localhelp.healthcare.gov')
      ).toMatchSnapshot();
    });
  });
});
