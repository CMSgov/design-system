import path from 'path';
import pkg from '../../../package.json';

function githubUrl(pathname = '') {
  return `https://github.com/${path.join(pkg.repository, pathname)}`;
}

export default githubUrl;
