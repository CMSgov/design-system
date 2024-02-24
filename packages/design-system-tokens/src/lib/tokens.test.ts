import path from 'path';
import { readTokenFiles } from './tokens';

describe('readTokenFiles', () => {
  const tokens = readTokenFiles(path.resolve(__dirname, '..', '__mocks__', 'tokens'));

  it('reads all files', () => {
    expect(Object.keys(tokens)).toMatchSnapshot();
  });

  it('flattens tokens', () => {
    const systemTokens = tokens['System.Value.json'];
    expect(systemTokens['color.ocean.50']).toBeDefined();
    expect(systemTokens['radius.default']).toBeDefined();
  });
});
