import testResponse from './__mocks__/test-get-response';
import systemTokens from '../__mocks__/tokens/System.Value.json';
import coreTokens from '../__mocks__/tokens/Theme.core.json';
import cmsgovTokens from '../__mocks__/tokens/Theme.cmsgov.json';
import {
  StringType,
  guessNumberType,
  tokenFilesFromLocalVariables,
} from './translateFigmaToTokens';

describe('tokenFilesFromLocalVariables', () => {
  it('matches snapshot', async () => {
    const resolvers = {
      number: (variableName: string) => Promise.resolve(guessNumberType(variableName) ?? 'number'),
      string: (variableName: string) => Promise.resolve('string' as StringType),
    };
    const tokenFiles = await tokenFilesFromLocalVariables(testResponse, {}, resolvers);
    const expected = {
      'System.Value.json': systemTokens,
      'Theme.core.json': coreTokens,
      'Theme.cmsgov.json': cmsgovTokens,
    };
    expect(tokenFiles).toEqual(expected);
  });
});
