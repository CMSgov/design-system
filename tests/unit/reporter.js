const { readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { summarizeData } = require('./utils');

class Reporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete() {
    // if the coverage flag is false, no need to parse json summary documents
    if (this._globalConfig.collectCoverage !== true) return;

    const coveragePath = path.resolve(__dirname, 'coverage-data', 'coverage-summary.json');
    const coverageReport = readFileSync(coveragePath, 'utf-8');
    const isWebComponent = this._options.type === 'wc';
    if (!coverageReport) {
      throw new Error(`Invalid coverage summary file: ${coveragePath}. File is empty.`);
    }

    const parsedCoverageReport = JSON.parse(coverageReport);
    let results;

    if (isWebComponent) {
      const wcData = Object.entries(parsedCoverageReport)
        .filter(([key]) => key.includes('web-components'))
        .map(([, data]) => summarizeData(Object.values(data)));
      results = summarizeData(wcData);
    } else if (parsedCoverageReport.total) {
      results = summarizeData(Object.values(parsedCoverageReport.total));
    } else {
      throw new Error(`No parsed coverage data.`);
    }

    const artifactPath = path.resolve(__dirname, 'coverage-data', this._options.file);

    try {
      writeFileSync(artifactPath, JSON.stringify(results, null, 2));
    } catch (e) {
      throw new Error(`Error writing coverage summary artifact: ${e}`);
    }
  }
}

module.exports = Reporter;
