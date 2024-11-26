import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  private passCount = 0;
  private failCount = 0;
  private skipCount = 0;
  private failingTests: { path: string; name: string }[] = [];

  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const getHierarchyPath = (test: TestCase): string => {
      const path: string[] = [];
      let parent: Suite | undefined = test.parent;
      while (parent) {
        path.unshift(parent.title || '');
        parent = parent.parent;
      }
      return path.filter(Boolean).join(' > ');
    };

    const hierarchyPath = getHierarchyPath(test);

    switch (result.status) {
      case 'passed':
        this.passCount++;
        break;
      case 'failed':
        this.failCount++;
        this.failingTests.push({ path: hierarchyPath, name: test.title });
        break;
      case 'skipped':
        this.skipCount++;
        break;
    }

    console.log(`${hierarchyPath} > ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
    console.log(`Summary:`);
    console.log(`  - Passed: ${this.passCount}`);
    console.log(`  - Failed: ${this.failCount}`);
    console.log(`  - Skipped: ${this.skipCount}`);

    if (this.failingTests.length > 0) {
      console.log(`\nFailing Tests:`);
      for (const test of this.failingTests) {
        console.log(`  ${test.path} > ${test.name}`);
      }
    }
  }
}

export default MyReporter;
