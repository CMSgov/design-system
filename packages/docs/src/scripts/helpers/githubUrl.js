import path from 'path';

function githubUrl(pathname = '') {
  return path.join(window.githubUrlBase, pathname);
}

export default githubUrl;
