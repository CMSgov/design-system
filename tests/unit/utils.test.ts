import { summarizeData } from './utils';

const mockedData = {
  skipped: 2,
  covered: 15,
  total: 20,
};

const anotherMockedData = {
  skipped: 0,
  covered: 153,
  total: 172,
};

describe('summarizeData', () => {
  it('should return sum totals of data', () => {
    const data = [mockedData, anotherMockedData];
    const result = summarizeData(data);
    expect(result).toEqual({ total: 192, covered: 168, skipped: 2 });
  });
});
