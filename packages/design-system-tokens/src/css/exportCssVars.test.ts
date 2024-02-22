import path from 'path';
import { readTokenFiles } from '../lib/tokens';
import { tokenFilesToCssFiles } from './exportCssVars';

describe('tokenFilesToCssFiles', () => {
  const tokensByFile = readTokenFiles(path.resolve(__dirname, '..', 'test', 'tokens'));

  it('works', () => {
    expect(tokenFilesToCssFiles(tokensByFile)).toMatchSnapshot();
  });
});
