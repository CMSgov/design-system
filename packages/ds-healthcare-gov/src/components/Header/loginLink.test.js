import loginLink from './loginLink';
const translate = (key) => key;

describe('loginLink', () => {
  it('returns /login link', () => {
    expect(loginLink(translate, false)).toMatchSnapshot();
  });

  it('returns link with deConsumer param', () => {
    expect(loginLink(translate, true)).toMatchSnapshot();
  });

  it('returns link with absolute URL', () => {
    expect(loginLink(translate, false, 'https://www.healthcare.gov')).toMatchSnapshot();
  });

  it('returns link with custom class and id', () => {
    expect(
      loginLink(translate, false, 'https://www.healthcare.gov', 'custom-id', 'custom-class')
    ).toMatchSnapshot();
  });
});
