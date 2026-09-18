import { parseJsonAttr, parseOptionalBooleanAttr } from './wrapperUtils';

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

describe('parseOptionalBooleanAttr', () => {
  it('returns undefined when the attribute is absent', () => {
    expect(parseOptionalBooleanAttr(undefined)).toBe(undefined);
  });

  it('reads a valueless attribute as true', () => {
    expect(parseOptionalBooleanAttr('')).toBe(true);
  });

  it('reads "false" as false', () => {
    expect(parseOptionalBooleanAttr('false')).toBe(false);
  });

  it('reads any other value as true', () => {
    expect(parseOptionalBooleanAttr('true')).toBe(true);
    expect(parseOptionalBooleanAttr('0')).toBe(true);
  });
});
