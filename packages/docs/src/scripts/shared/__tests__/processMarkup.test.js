import processMarkup from '../processMarkup';

describe('processMarkup', () => {
  describe('{{modifier}}', () => {
    let markup;

    beforeEach(() => {
      markup = '<span class="foo {{modifier}}"></span>';
    });

    it('replaces modifier tag with empty string', () => {
      expect(processMarkup(markup)).toMatch(/class="foo"/);
    });

    it('replaces modifier tag with modifier className', () => {
      expect(processMarkup(markup, { className: 'bar' })).toMatch(
        /class="foo bar"/
      );
    });
  });

  it('replaces lorem-s tag', () => {
    expect(processMarkup('{{lorem-s}}')).toMatch(
      /We the People of the United States/
    );
  });

  it('replaces lorem-m tag', () => {
    expect(processMarkup('{{lorem-m}}')).toMatch(
      /We the People of the United States/
    );
  });

  it('replaces lorem-l tag', () => {
    expect(processMarkup('{{lorem-l}}')).toMatch(
      /We the People of the United States/
    );
  });
});
