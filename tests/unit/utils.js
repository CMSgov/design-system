const INITIAL_COUNTS = { total: 0, covered: 0, skipped: 0 };

const summarizeData = (data, initialValue = INITIAL_COUNTS) => {
  return data.reduce(
    (acc, { total, covered, skipped }) => ({
      total: acc.total + total,
      covered: acc.covered + covered,
      skipped: acc.skipped + skipped,
    }),
    initialValue
  );
};

module.exports = { summarizeData };
