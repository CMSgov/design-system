import { toCurrency, unmaskValue } from './maskHelpers';

describe('maskHelpers', function () {
  describe('Currency', () => {
    it('accepts already masked value', () => expect(toCurrency('1,234.50')).toBe('1,234.50'));

    it('adds commas', () => {
      expect(toCurrency('1234')).toBe('1,234');
      expect(toCurrency('12345')).toBe('12,345');
      expect(toCurrency('123456')).toBe('123,456');
      expect(toCurrency('1234567')).toBe('1,234,567');
      expect(toCurrency('12345678')).toBe('12,345,678');
      expect(toCurrency('123456789')).toBe('123,456,789');
      expect(toCurrency('12345678.90')).toBe('12,345,678.90');
      expect(toCurrency('1234.95')).toBe('1,234.95');
    });

    it('accepts negative values', () => expect(toCurrency('-1234')).toBe('-1,234'));

    it('removes non-supported characters', () => expect(toCurrency('1!a2@b3#c')).toBe('123'));

    it('trims any decimal digits after the hundredths place', () =>
      expect(toCurrency('123.456789')).toBe('123.45'));

    it('appends a zero in the hundredths place if there is a non-zero digit in the tenths place', () =>
      expect(toCurrency('12.3')).toBe('12.30'));

    it('trims leading zeroes unless value is less than 1', () => {
      expect(toCurrency('000101')).toBe('101');
      expect(toCurrency('0')).toBe('0');
      expect(toCurrency('0000.11')).toBe('0.11');
    });

    it('removes all decimal points after the first', () => {
      expect(toCurrency('1..2.3...4..5')).toBe('1.23');
      expect(toCurrency('....67')).toBe('0.67');
    });

    it('removes decimal if value is a whole number', () =>
      expect(toCurrency('123.00')).toBe('123'));

    // Number.MAX_SAFE_INTEGER === 9007199254740991
    it('supports numbers greater than Number.MAX_SAFE_INTEGER', () =>
      expect(toCurrency('9999999999999999.99')).toBe('9,999,999,999,999,999.99'));
  });

  describe('unmaskValue', () => {
    it('returns value when mask is undefined', () => {
      expect(unmaskValue(' 1,234 Foo ')).toBe(' 1,234 Foo ');
    });

    it('returns value when mask is unknown', () => {
      expect(unmaskValue('1,234', 'foo')).toBe('1,234');
    });

    it('exits when value is undefined or null', () => {
      expect(unmaskValue()).toBeUndefined();
      expect(unmaskValue(null)).toBeNull();
    });

    it('returns same string back when there are no numeric characters in the value', () => {
      expect(unmaskValue('banana', 'currency')).toBe('banana');
      expect(unmaskValue('banana', 'zip')).toBe('banana');
      expect(unmaskValue('banana', 'ssn')).toBe('banana');
      expect(unmaskValue('banana', 'phone')).toBe('banana');
    });

    it('returns just the numbers when there is other garbage mixed in', () => {
      expect(unmaskValue('b4n4n4', 'currency')).toBe('444');
      expect(unmaskValue('b4n4n4', 'zip')).toBe('444');
      expect(unmaskValue('b4n4n4', 'ssn')).toBe('444');
      expect(unmaskValue('b4n4n4', 'phone')).toBe('444');

      expect(unmaskValue('a1.b2c3', 'currency')).toBe('1.23');
      expect(unmaskValue('1,,00.b', 'currency')).toBe('100.');
      expect(unmaskValue('1-1-1-2-3-4', 'zip')).toBe('111234');
      expect(unmaskValue('4---31', 'ssn')).toBe('431');
      expect(unmaskValue('--2-3444', 'phone')).toBe('23444');
    });

    it('removes mask from currency value', () => {
      const name = 'currency';

      expect(unmaskValue('', name)).toBe('');
      expect(unmaskValue(' 1,234 ', name)).toBe('1234'); // whitespace
      expect(unmaskValue('1,234', name)).toBe('1234');
      expect(unmaskValue('1,234.5', name)).toBe('1234.5');
      expect(unmaskValue('1,234,000.50', name)).toBe('1234000.50');
      expect(unmaskValue('-1,234,000.50', name)).toBe('-1234000.50');
    });

    it('removes mask from zip code', () => {
      const name = 'zip';

      expect(unmaskValue('', name)).toBe('');
      expect(unmaskValue(' 12345 ', name)).toBe('12345');
      expect(unmaskValue('12345-6789', name)).toBe('123456789');
    });

    it('removes mask from ssn value', () => {
      const name = 'ssn';

      expect(unmaskValue('', name)).toBe('');
      expect(unmaskValue(' 123-45-6789 ', name)).toBe('123456789');
      expect(unmaskValue('123456789', name)).toBe('123456789');
      expect(unmaskValue('***-**-6789', name)).toBe('*****6789');
    });

    it('removes mask from phone number', () => {
      const name = 'phone';

      expect(unmaskValue('', name)).toBe('');
      expect(unmaskValue(' 123-456-7890 ', name)).toBe('1234567890');
    });
  });
});
