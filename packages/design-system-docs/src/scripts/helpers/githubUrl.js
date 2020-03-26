import path from 'path';

function githubUrl(pathname = '') {
  return path.join(process.env.githubUrlBase ? process.env.githubUrlBase : '', pathname);
}

export default githubUrl;
