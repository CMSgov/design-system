import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { summarizeData } from './utils';

const TEST_COVERAGE_TYPES = ['react', 'wc'];

type SummaryData = {
  total: number;
  covered: number;
  skipped: number;
};

const getFilePath = (type?: string): string => {
  const filename = type ? `coverage-summary-${type}.json` : 'coverage-summary.json';
  return path.resolve(__dirname, 'coverage-data', filename);
};

const readFile = (path: string) => {
  try {
    return readFileSync(path, 'utf-8');
  } catch (error) {
    throw new Error(`Error reading ${path}: ${error}`);
  }
};

const combinedParsedData = TEST_COVERAGE_TYPES.map((type) => {
  const filePath = getFilePath(type);
  const unparsedData = readFile(filePath);
  const parsedData = JSON.parse(unparsedData);

  if (!parsedData.total || !parsedData.covered) {
    throw new Error(`Invalid data in ${filePath}`);
  } else {
    return parsedData as SummaryData;
  }
});

const combinedCoverage = summarizeData(combinedParsedData);

try {
  const artifactPath = getFilePath();
  writeFileSync(artifactPath, JSON.stringify(combinedCoverage, null, 2));
} catch (error) {
  throw new Error(`Error generating coverage data: ${error}`);
}
