// setting Date.now() to a set time for Jest tests
let dateNowMock;

export function mockTime(timestamp) {
  dateNowMock = jest.spyOn(Date, 'now').mockImplementation(() => timestamp);
}

export function restoreTime() {
  dateNowMock.mockRestore();
}
