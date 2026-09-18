import { parseJsonAttr } from './wrapperUtils';

describe('parseJsonAttr', () => {
  it('returns undefined when the attribute is absent', () => {
    expect(parseJsonAttr(undefined)).toBe(undefined);
  });

  it('parses a JSON attribute value', () => {
    expect(parseJsonAttr('[{"label":"One"}]')).toEqual([{ label: 'One' }]);
  });

  it('returns the raw string when the value is not JSON', () => {
    expect(parseJsonAttr('One')).toBe('One');
  });
});
