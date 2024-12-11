import { UtagContainer } from '../../analytics/index';
import { WAIT_TIME } from './analytics';

export function mockTealium() {
  const tealiumMock = jest.fn();
  (window as any as UtagContainer).utag = {
    link: tealiumMock,
  };
  jest.useFakeTimers();
  return tealiumMock;
}

export function unmockTealium() {
  jest.resetAllMocks();
  jest.useRealTimers();
}

export function waitForAnalytics() {
  jest.advanceTimersByTime(WAIT_TIME);
  new Promise((resolve) => setTimeout(resolve, 0));
}

type TestFunction = (params: {
  tealiumMock: jest.Mock<any, any>;
  waitForAnalytics: typeof waitForAnalytics;
}) => Promise<any>;

export function testAnalytics(testName: string, fn: TestFunction) {
  test(testName, async () => {
    const tealiumMock = mockTealium();
    const returnVal = await fn({ tealiumMock, waitForAnalytics });
    unmockTealium();
    return returnVal;
  });
}

testAnalytics.skip = (testName: string, fn: TestFunction) => {
  test.skip(testName, () => fn({} as any));
};
