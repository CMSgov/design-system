import fs from 'fs';
import path from 'path';
import MyReporter from './custom-reporter';
import { Suite, TestCase, TestResult, FullResult, FullConfig } from '@playwright/test/reporter';

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

const reportPath = path.resolve(__dirname, 'test-results/testing/test-report.json');

test('JSON report matches snapshot', () => {
  const mockSuite = {
    title: 'Sample Suite',
    allTests: () => [
      {
        title: 'Test 1',
        location: { file: 'sample-suite.test.ts' },
        parent: { title: 'Sample Suite', parent: null },
        outcome: () => 'expected',
      },
      {
        title: 'Test 2',
        location: { file: 'sample-suite.test.ts' },
        parent: { title: 'Sample Suite', parent: null },
        outcome: () => 'unexpected',
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

  const generatedReport = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

  expect(generatedReport).toMatchSnapshot();
});

test('does not report a failure when a test fails and then passes on retry', () => {
  const flakyTest = {
    title: 'Flaky test',
    location: { file: 'sample-suite.test.ts' },
    parent: { title: 'Sample Suite', parent: null },
    outcome: () => 'flaky',
  } as unknown as TestCase;

  const mockSuite = {
    title: 'Sample Suite',
    allTests: () => [flakyTest],
  } as unknown as Suite;

  const reporter = new MyReporter();
  reporter.onBegin(mockConfig, mockSuite);

  // Playwright calls onTestEnd once per attempt, so a retried test reports twice.
  reporter.onTestEnd(flakyTest, { status: 'failed', retry: 0 } as TestResult);
  reporter.onTestEnd(flakyTest, { status: 'passed', retry: 1 } as TestResult);

  // A run whose only failure recovered on retry ends as passed.
  reporter.onEnd({ status: 'passed', startTime: new Date(), duration: 0 } as FullResult);

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

  // The retried test is counted once, as a pass, so the counts still add up to the one test run.
  expect(report.summary).toEqual({ passed: 1, failed: 0, skipped: 0 });
  expect(report.failingTests).toEqual([]);
});
