import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { summarizeData } from './utils';

const TEST_COVERAGE_TYPES = ['react', 'wc'];

type SummaryData = {
  total: number;
  covered: number;
  skipped: number;
};

const getFilePath = (type: string): string => {
  return path.resolve(__dirname, 'coverage-data', `coverage-summary-${type}.json`);
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

  if ('total' in parsedData && 'covered' in parsedData) {
    return parsedData as SummaryData;
  } else {
    throw new Error(`Invalid data in ${filePath}`);
  }
});

const combinedCoverage = summarizeData(combinedParsedData);

try {
  const artifactPath = path.resolve(__dirname, 'coverage-data');
  if (!existsSync(artifactPath)) {
    mkdirSync(artifactPath);
  }
  const artifactFile = path.resolve(artifactPath, 'coverage-summary.json');
  writeFileSync(artifactFile, JSON.stringify(combinedCoverage, null, 2));
} catch (error) {
  throw new Error(`Error generating coverage data: ${error}`);
}
