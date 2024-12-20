const { existsSync, mkdirSync, writeFileSync } = require('fs');
const path = require('path');

class CountsReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete(_, overallResults) {
    const type = this._options.type;
    const results = {
      total: overallResults.numTotalTests,
      passed: overallResults.numPassedTests,
      failed: overallResults.numFailedTests,
      skipped: overallResults.numPendingTests,
    };

    try {
      const artifactPath = path.resolve(__dirname, 'coverage-data');
      if (!existsSync(artifactPath)) {
        mkdirSync(artifactPath);
      }

      const artifactFile = path.resolve(artifactPath, `test-summary-${type}.json`);
      writeFileSync(artifactFile, JSON.stringify(results, null, 2));
    } catch (e) {
      throw new Error(`Error writing test summary artifact: ${e}`);
    }
  }
}

module.exports = CountsReporter;
