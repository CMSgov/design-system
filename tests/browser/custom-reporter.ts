import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';
import { writeFileSync, mkdirSync } from 'fs';
import path from 'path';

function extractTestGroupFromConfigPath(configPath: string | undefined): string {
  // If undefined, we’re likely running a unit test where no config path is provided.
  if (configPath === undefined) {
    return 'testing';
  }

  return path.basename(configPath).replace(/\.config\.ts$/, '');
}

class MyReporter implements Reporter {
  private passCount = 0;
  private failCount = 0;
  private skipCount = 0;
  private failingTests: { path: string; name: string }[] = [];
  private skippedTests: { path: string; name: string }[] = [];
  private isListMode = false;
  private totalTests = 0;
  private currentTestIndex = 0;
  private testGroup = '';
  private suite: Suite | undefined;

  private getHierarchyPath(test: TestCase): string {
    const path: string[] = [];
    let parent: Suite | undefined = test.parent;

    while (parent) {
      if (parent.title) {
        path.unshift(parent.title);
      }
      parent = parent.parent;
    }

    if (path.length > 0) {
      path[0] = `[${path[0]}]`;
    }

    return path.join(' > ');
  }

  onBegin(config: FullConfig, suite: Suite) {
    this.testGroup = extractTestGroupFromConfigPath(config.configFile);
    this.suite = suite;
    const totalFiles = new Set(suite.allTests().map((test) => test.location.file)).size;
    this.totalTests = suite.allTests().length;

    console.log(`Running ${totalFiles} files with ${suite.allTests().length} tests`);
    if (process.argv.includes('--list')) {
      this.isListMode = true;
      console.log('Listing matching tests with hierarchy paths:');
      suite.allTests().forEach((test) => {
        const hierarchyPath = this.getHierarchyPath(test);
        console.log(`${hierarchyPath} > ${test.title}`);
      });
      console.log(
        `\nTotal: ${this.totalTests} tests in ${totalFiles} file${totalFiles > 1 ? 's' : ''}`
      );
      return;
    }

    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin() {
    this.currentTestIndex++;
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (this.isListMode) return;

    const hierarchyPath = this.getHierarchyPath(test);

    console.log(
      `[${this.currentTestIndex}/${this.totalTests}] ${hierarchyPath} > ${test.title}: ${result.status}`
    );
  }

  // Playwright calls onTestEnd once per attempt, so counting there counts a retried test
  // twice. A test's final outcome is only settled once every attempt has run.
  private countOutcomes() {
    for (const test of this.suite?.allTests() ?? []) {
      const entry = { path: this.getHierarchyPath(test), name: test.title };

      switch (test.outcome()) {
        // A test that failed and then passed on retry is not a failure.
        case 'expected':
        case 'flaky':
          this.passCount++;
          break;
        case 'unexpected':
          this.failCount++;
          this.failingTests.push(entry);
          break;
        case 'skipped':
          this.skipCount++;
          this.skippedTests.push(entry);
          break;
      }
    }
  }

  onEnd(result: FullResult) {
    if (this.isListMode) return;

    this.countOutcomes();

    console.log(`Finished the run: ${result.status}`);
    console.log(`Summary:`);
    console.log(` - Passed: ${this.passCount}`);
    console.log(` - Failed: ${this.failCount}`);
    console.log(` - Skipped: ${this.skipCount}`);

    if (this.failingTests.length > 0) {
      console.log(`\nFailing Tests:`);
      for (const test of this.failingTests) {
        console.log(`  ${test.path} > ${test.name}`);
      }
    }

    const reportDirectory = path.resolve(__dirname, `test-results/${this.testGroup}`);
    const reportPath = path.resolve(reportDirectory, 'test-report.json');

    try {
      mkdirSync(reportDirectory, { recursive: true });
      writeFileSync(
        reportPath,
        JSON.stringify(
          {
            status: result.status,
            summary: {
              passed: this.passCount,
              failed: this.failCount,
              skipped: this.skipCount,
            },
            failingTests: this.failingTests,
            skippedTests: this.skippedTests,
          },
          null,
          2
        )
      );
      console.log(`JSON report written to ${reportPath}`);
    } catch (error) {
      console.error('Failed to write JSON report:', error);
    }
  }
}

export default MyReporter;
