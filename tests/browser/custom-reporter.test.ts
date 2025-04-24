import fs from 'fs';
import path from 'path';
import MyReporter from './custom-reporter';
import { Suite, TestCase, TestResult, FullResult, FullConfig } from '@playwright/test/reporter';

test('JSON report matches snapshot', () => {
  const mockConfig: FullConfig = {
    forbidOnly: false,
    fullyParallel: false,
    globalSetup: null,
    globalTeardown: null,
    maxFailures: 0,
    projects: [],
    reporter: [],
    reportSlowTests: null,
    rootDir: './',
    quiet: false,
    shard: null,
    updateSnapshots: 'missing',
    version: '1.0',
    workers: 1,
    globalTimeout: 0,
    grep: /.*/,
    grepInvert: null,
    metadata: {},
    preserveOutput: 'always',
    webServer: null,
  };

  const mockSuite = {
    title: 'Sample Suite',
    allTests: () => [
      {
        title: 'Test 1',
        location: { file: 'sample-suite.test.ts' },
        parent: { title: 'Sample Suite', parent: null },
      },
      {
        title: 'Test 2',
        location: { file: 'sample-suite.test.ts' },
        parent: { title: 'Sample Suite', parent: null },
      },
    ],
  } as unknown as Suite;

  const reporter = new MyReporter();
  reporter.onBegin(mockConfig, mockSuite);

  reporter.onTestEnd(
    { title: 'Test 1', parent: mockSuite } as TestCase,
    { status: 'passed' } as TestResult
  );
  reporter.onTestEnd(
    { title: 'Test 2', parent: mockSuite } as TestCase,
    { status: 'failed' } as TestResult
  );

  const mockResult: FullResult = {
    status: 'failed',
    startTime: new Date(),
    duration: 0,
  };
  reporter.onEnd(mockResult);

  const reportDirectory = path.resolve(__dirname, 'test-results/testing');
  const reportPath = path.resolve(reportDirectory, 'test-report.json');
  const generatedReport = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

  expect(generatedReport).toMatchSnapshot();
});
