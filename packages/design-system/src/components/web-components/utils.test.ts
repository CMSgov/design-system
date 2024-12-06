import { isPossibleValue } from './utils';

type Fruit = 'apple' | 'banana' | 'cherry';

const acceptableFruit: Fruit[] = ['apple', 'banana', 'cherry'] as const;

describe('isPossibleValue', () => {
  it('should return true if the value is in the possibleValues array', () => {
    const value = 'apple' as Fruit;
    expect(isPossibleValue(value, acceptableFruit)).toBe(true);
  });

  it('should return false if the value is not in the possibleValues array', () => {
    const value = 'orange';
    expect(isPossibleValue(value, acceptableFruit)).toBe(false);
  });

  it('should return false if the possibleValues array is empty', () => {
    const value = 'apple' as Fruit;
    const possibleValues: readonly string[] = [];
    expect(isPossibleValue(value, possibleValues)).toBe(false);
  });

  it('should return false if the value is an empty string', () => {
    const value = '';
    expect(isPossibleValue(value, acceptableFruit)).toBe(false);
  });
});
