// If this ever gets to be more of a pain than it's worth, just delete it. I wrote this
// to aid in catching regressions when migrating from our old token system to using JSON
// and integrating with Figma. - Patrick

import path from 'path';
import { readTokenFiles } from '../lib/readTokenFiles';
import { tokenFilesToCssFiles } from './translate';

const realTokensByFile = readTokenFiles(path.resolve(__dirname, '..', 'tokens'));
const cssFiles = tokenFilesToCssFiles(realTokensByFile);

describe('CSS snapshots', () => {
  Object.entries(cssFiles).forEach(([fileName, fileContents]) => {
    test(`variables in ${fileName} match snapshot`, () => {
      const variables = fileContents.split('\n').filter((line) => line.startsWith('--'));
      variables.sort();
      expect(variables.join('\n')).toMatchSnapshot();
    });
  });
});
