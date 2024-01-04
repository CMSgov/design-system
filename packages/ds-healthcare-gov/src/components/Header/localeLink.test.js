import localeLink from './localeLink';
const translate = (key) => key;

describe('localeLink', () => {
  it('returns Spanish link', () => {
    expect(localeLink(translate, 'en')).toMatchSnapshot();
  });

  it('returns English link', () => {
    expect(localeLink(translate, 'es')).toMatchSnapshot();
  });

  it('returns Spanish link with subpath', () => {
    expect(localeLink(translate, 'en', 'tax-tool/')).toMatchSnapshot();
  });

  it('returns English link with subpath', () => {
    expect(localeLink(translate, 'es', 'tax-tool/')).toMatchSnapshot();
  });

  it('returns Spanish link with custom switch link', () => {
    expect(
      localeLink(translate, 'en', undefined, 'https://ayudalocal.cuidadodesalud.gov/es')
    ).toMatchSnapshot();
  });

  it('returns English link with custom switch link', () => {
    expect(
      localeLink(translate, 'es', undefined, 'https://localhelp.healthcare.gov')
    ).toMatchSnapshot();
  });

  it('returns link with custom class and id', () => {
    expect(
      localeLink(translate, 'es', undefined, undefined, 'custom-id', 'custom-class')
    ).toMatchSnapshot();
  });
});
