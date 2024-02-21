import testResponse from './test/test-get-response';
import systemTokens from '../test/tokens/System.Value.json';
import coreTokens from '../test/tokens/Theme.core.json';
import cmsgovTokens from '../test/tokens/Theme.cmsgov.json';
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
