import path from 'path';

function githubUrl(pathname = '') {
  return path.join(process.env.githubUrl || '', pathname);
}

export default githubUrl;
