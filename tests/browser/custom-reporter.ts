import type {
  FullConfig,
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from '@playwright/test/reporter';

class MyReporter implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log(`Starting the run with ${suite.allTests().length} tests`);
  }

  // onTestBegin(test: TestCase, result: TestResult) {
  //   console.log(`Starting test ${test.title}`);
  // }

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
    console.log(`Finished test ${hierarchyPath} > ${test.title}: ${result.status}`);
  }

  onEnd(result: FullResult) {
    console.log(`Finished the run: ${result.status}`);
  }
}

export default MyReporter;
