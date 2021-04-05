import { request } from '@octokit/request';

const accessToken = process.argv[3];

// PR is a Github pull request.
interface Imports {
  repo: string;
  importLine: string;
}

// getPRs fetches open pull requests from a repo in the CMS-WDS org,
// filtering out tags that aren't meant for review like WIP.
async function searchRepos(searchString: string): Promise<{ value: Imports[]; error: Error }> {
  // connect to github
  const requestWithAuth = request.defaults({
    baseUrl: 'https://github.cms.gov/api/v3',
    headers: {
      authorization: 'token ' + accessToken,
      accept: 'application/vnd.github.v3.text-match+json',
    },
  });

  try {
    const resp = await requestWithAuth('GET /search/code', {
      q: searchString + ' language:JSON',
    });
    const imports: Imports[] = [];
    for (const item of resp.data.items) {
      const fragment = item.text_matches[0].fragment;
      const importLineBegin = fragment.search(searchString + '":');
      const importLineEnd = fragment.indexOf(',', importLineBegin);
      const importLine =
        importLineBegin === -1 || importLineEnd === -1
          ? searchString + ' Unable to pull version number automatically'
          : fragment.substring(importLineBegin, importLineEnd);

      imports.push({ repo: item.repository.full_name + ' | ' + item.path, importLine });
    }
    return { value: imports, error: null };
  } catch (err) {
    return { value: [], error: err };
  }
}

function exit(err: Error) {
  console.log(err);
  process.exit(1);
}

async function main() {
  const hcgovRepos = await searchRepos('ds-healthcare-gov');
  if (hcgovRepos.error) {
    exit(hcgovRepos.error);
  }
  const medicareRepos = await searchRepos('ds-medicare-gov');
  if (medicareRepos.error) {
    exit(medicareRepos.error);
  }

  const oldCoreRepos = await searchRepos('design-system-core');
  if (oldCoreRepos.error) {
    exit(oldCoreRepos.error);
  }

  const coreRepos = await searchRepos('design-system"');
  if (coreRepos.error) {
    exit(coreRepos.error);
  }

  const imports = hcgovRepos.value
    .concat(medicareRepos.value)
    .concat(oldCoreRepos.value)
    .concat(coreRepos.value);

  for (const im of imports) {
    console.log(im.repo + ': ' + im.importLine);
  }
}

main();
