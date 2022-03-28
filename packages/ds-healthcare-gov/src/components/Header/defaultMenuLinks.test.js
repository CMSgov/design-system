import defaultMenuLinks, {
  defaultMenuLinks as namedExportDefaultMenuLinks,
} from './defaultMenuLinks';

describe('MenuList', function () {
  it('includes a named export', () => {
    // Some apps may need to import the default menu links in order to extend them
    expect(typeof namedExportDefaultMenuLinks).toBe('function');
  });

  it('leaves out login link if hideLoginLink true', () => {
    expect(
      defaultMenuLinks(undefined, undefined, undefined, undefined, undefined, true)
    ).toMatchSnapshot();
  });

  it('leaves out logout link if hideLogoutLink true', () => {
    expect(
      defaultMenuLinks(undefined, undefined, undefined, undefined, undefined, undefined, true)
    ).toMatchSnapshot();
  });

  it('leaves out locale links if hideLanguageSwitch true', () => {
    expect(
      defaultMenuLinks(
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
      expect(defaultMenuLinks()).toMatchSnapshot();
    });

    it('returns array of menu list objects with subpath', () => {
      expect(defaultMenuLinks('en', 'tax-tool/')).toMatchSnapshot();
    });

    it('returns array of menu list objects with absolute URLs', () => {
      expect(defaultMenuLinks('en', undefined, 'https://www.healthcare.gov')).toMatchSnapshot();
    });

    it('returns array of menu list objects with custom locale switch link', () => {
      expect(
        defaultMenuLinks('en', undefined, undefined, 'https://ayudalocal.cuidadodesalud.gov/es')
      ).toMatchSnapshot();
    });
  });

  describe('Spanish', () => {
    it('returns array of menu list objects', () => {
      expect(defaultMenuLinks('es')).toMatchSnapshot();
    });

    it('returns array of menu list objects with subpath', () => {
      expect(defaultMenuLinks('es', 'tax-tool/')).toMatchSnapshot();
    });

    it('returns array of menu list objects with absolute URLs', () => {
      expect(defaultMenuLinks('es', undefined, 'https://www.healthcare.gov')).toMatchSnapshot();
    });

    it('returns array of menu list objects with custom locale switch link', () => {
      expect(
        defaultMenuLinks('es', undefined, undefined, 'https://localhelp.healthcare.gov')
      ).toMatchSnapshot();
    });
  });
});
