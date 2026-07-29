import markQuery from './markQuery';

describe('markQuery', () => {
  it('marks the query within the body', () => {
    const body = 'This is a test body.';
    const query = 'test';
    const expectedBody = 'This is a <mark>test</mark> body....';

    expect(markQuery(body, query)).toBe(expectedBody);
  });

  it('escapes dangerous characters', () => {
    const body = "return {i18n('account created')};";
    const dangerousQuery = 'i18n(';
    const expectedBody = "return {<mark>i18n(</mark>'account created')};...";

    expect(markQuery(body, dangerousQuery)).toBe(expectedBody);
  });
});
