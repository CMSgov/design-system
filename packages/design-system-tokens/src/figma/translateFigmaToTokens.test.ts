import testResponse from './__mocks__/test-get-response';
import systemTokens from '../__mocks__/tokens/System.Value.json';
import coreTokens from '../__mocks__/tokens/Theme.core.json';
import cmsgovTokens from '../__mocks__/tokens/Theme.cmsgov.json';
import { tokenFilesFromLocalVariables } from './translateFigmaToTokens';

describe('tokenFilesFromLocalVariables', () => {
  it('matches snapshot', () => {
    const tokenFiles = tokenFilesFromLocalVariables(testResponse);
    const expected = {
      'System.Value.json': systemTokens,
      'Theme.core.json': coreTokens,
      'Theme.cmsgov.json': cmsgovTokens,
    };
    expect(tokenFiles).toEqual(expected);
  });
});
