const { existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');
const path = require('path');
const { summarizeData } = require('./utils');

class CoverageReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;
  }

  onRunComplete() {
    // if the coverage flag is false, no need to parse json summary documents
    if (this._globalConfig.collectCoverage !== true) return;
    const isWebComponent = this._options.type === 'wc';

    const coveragePath = path.resolve(__dirname, 'coverage-data', 'coverage-summary.json');
    let coverageReport;
    try {
      coverageReport = JSON.parse(readFileSync(coveragePath, 'utf-8'));
    } catch (error) {
      throw new Error(`Invalid coverage summary file: ${coveragePath}. File is empty.`);
    }

    let results;
    if (isWebComponent) {
      const wcData = Object.entries(coverageReport)
        .filter(([key]) => key.includes('web-components'))
        .map(([, data]) => summarizeData(Object.values(data)));

      if (wcData.length === 0) {
        results = summarizeData(Object.values(coverageReport.total));
      } else {
        results = summarizeData(wcData);
      }
    } else if (coverageReport.total) {
      results = summarizeData(Object.values(coverageReport.total));
    } else {
      throw new Error(`No parsed coverage data.`);
    }

    try {
      const artifactPath = path.resolve(__dirname, 'coverage-data');
      if (!existsSync(artifactPath)) {
        mkdirSync(artifactPath);
      }

      const artifactFile = path.resolve(artifactPath, this._options.file);
      writeFileSync(artifactFile, JSON.stringify(results, null, 2));
    } catch (e) {
      throw new Error(`Error writing coverage summary artifact: ${e}`);
    }
  }
}

module.exports = CoverageReporter;
