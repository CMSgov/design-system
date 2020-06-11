const colors = require('colors/safe');
const getValues = require('../getValues');

describe('getValues', () => {
  let stats = {};
  const retrievalMethod = (branch) => stats[branch].size;

  beforeEach(() => {
    stats = {
      current: {
        size: 10,
      },
      latest: {
        size: 25,
      },
    };
  });

  it('returns array of current value, latest value, and difference between the two', () => {
    const values = getValues(retrievalMethod);
    expect(values).toEqual([
      stats.current.size,
      stats.latest.size,
      colors.green(stats.current.size - stats.latest.size),
    ]);
  });

  it('colors difference with red when less than latest value', () => {
    const values = getValues(retrievalMethod, false);
    expect(values[2]).toEqual(colors.green(stats.current.size - stats.latest.size));
  });

  it('skips color when no difference', () => {
    stats.latest.size = stats.current.size;
    const values = getValues(retrievalMethod, false);
    expect(values[2]).toEqual(0);
  });
});
