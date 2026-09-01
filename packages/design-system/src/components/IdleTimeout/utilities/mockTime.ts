// setting Date.now() to a set time for Jest tests
let dateNowMock: jest.SpyInstance<number, []>;

export function mockTime(timestamp: number) {
  dateNowMock = jest.spyOn(Date, 'now').mockImplementation(() => timestamp);
}

export function restoreTime() {
  dateNowMock.mockRestore();
}
