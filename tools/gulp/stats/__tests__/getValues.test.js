const colors = require('colors/safe');
const getValues = require('../getValues');

describe('getValues', () => {
  let stats = {};
  const retrievalMethod = branch => stats[branch].size;

  beforeEach(() => {
    stats = {
      current: {
        size: 10
      },
      master: {
        size: 25
      }
    };
  });

  it('returns array of current value, master value, and difference between the two', () => {
    const values = getValues(retrievalMethod);
    expect(values).toEqual([
      stats.current.size,
      stats.master.size,
      colors.green(stats.current.size - stats.master.size)
    ]);
  });

  it('colors difference with red when less than master value', () => {
    const values = getValues(retrievalMethod, false);
    expect(values[2]).toEqual(colors.red(stats.current.size - stats.master.size));
  });

  it('skips color when no difference', () => {
    stats.master.size = stats.current.size;
    const values = getValues(retrievalMethod, false);
    expect(values[2]).toEqual(0);
  });
});
