import testResponse from './test/test-get-response';
import { tokenFilesFromLocalVariables } from './translateFigmaToTokens';

describe('tokenFilesFromLocalVariables', () => {
  it('matches snapshot', () => {
    const tokenFiles = tokenFilesFromLocalVariables(testResponse);
    expect(tokenFiles).toMatchSnapshot();
  });
});
