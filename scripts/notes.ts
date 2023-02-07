import { execSync } from 'node:child_process';
import themes from '../themes.json';

export interface PRDetails {
  hash: string;
  ticket: string | null;
  description: string;
  ghpr: string;
  labels: string[] | null;
}

let compTarget, currTarget;

if (process.argv.length == 2) {
  console.log(
    'Please provide a target tag/branch name to compare the current branch HEAD against.'
  );
  process.exit(1);
} else {
  compTarget = process.argv[2];
  currTarget = process.argv[3] ?? 'HEAD';
}

/**
 * Grabs latest tag from each theme and returns an array of `theme: version` items.
 */
export const getLatestVersions = () => {
  const versions: { [key: string]: string } = {};
  Object.entries(themes).forEach((theme) => {
    const pkgn = theme[1].packageName;
    const vers = execSync(`git tag --sort=taggerdate | grep "${pkgn}" | tail -1`).toString().trim();
    versions[theme[0]] = vers.replace(/^@cmsgov\/.*@(.*)$/, '$1');
  });
  return versions;
};

/**
 * Accepts: A github pr number
 * Returns: Array of labels applied to the PR or null if none.
 */
const getGithubLabels = (pr: string) => {
  const l = JSON.parse(execSync(`gh pr view ${pr} --json=labels`).toString());
  const labels = l.labels.map((label: typeof l.labels) => {
    return label['name'];
  });
  if (labels.length) return labels;
  return null;
};

/**
 * Filters out 'Publish', or anything that doesn't fit our template
 */
const initialFilter = /^.\s(\w*)\s\[([\w-]*)\]\s(.*)\s\(#(\d*)\)$/;

/**
 * Get the difference between one branch and another as a list of
 * commits with pr #'s and description. --cherry is used to perform a
 * diff check to rule out commits which just have different hashes.
 */
const logData = execSync(
  `git log --author-date-order --pretty=oneline --cherry ${compTarget}...${currTarget}`
).toString();
const filteredLogArray = logData.split('\n').filter((line: string) => line.match(initialFilter));

/**
 * Generate an array of objects for each PR/commit from the filtered
 * git log generated above. This data can be sorted into draft notes.
 */
const sortedLogData = filteredLogArray.map((line: string): PRDetails => {
  const matched = line.match(initialFilter);

  if (matched) {
    const labels = getGithubLabels(matched[4]);
    const ticket = /no|release/i.test(matched[2].toLowerCase()) ? null : matched[2];
    return {
      hash: matched[1],
      ticket: ticket,
      description: matched[3],
      ghpr: matched[4],
      labels: labels,
    };
  } else {
    console.log(
      `One of the items in the returned set did not match the filter ${initialFilter.toString()}.`
    );
    console.log(filteredLogArray);
    process.exit(1);
  }
});

// const mdTemplate = (version: string, items: PRDetails[]): string => {
//   return `
//     ## [Design System](https://www.npmjs.com/package/@cmsgov/design-system) [${version}]
//     ## [Documentation site](https://www.npmjs.com/package/@cmsgov/design-system-docs) [${version}]
//     ## [Healthcare.gov Design System](https://www.npmjs.com/package/@cmsgov/ds-healthcare-gov) [${version}]
//     ## [Medicare.gov Design System](https://www.npmjs.com/package/@cmsgov/ds-medicare-gov) [${version}]
//     ## Updated dependencies

//     ### 🚨 Breaking changes
//     ### 🚀 Added
//     ### 💅 Changed
//     ### 🛠 Fixed
//     ### 📦 Internal
//   `
// }

const ticketedWork = sortedLogData.filter((pr) => {
  return pr.ticket;
});
const unticketedWork = sortedLogData.filter((pr) => {
  return !pr.ticket;
});

ticketedWork.forEach((pr) => {
  console.log(`${pr.hash} ${pr.ticket} .. ${pr.labels}`);
});
console.log(`${ticketedWork.length} items`);

// gh release create v${version} --notes-file release-${version}-notes.md --draft --prerelease
// make sure particular name doesn't already exist / error condition on conflict
// ticketed work outputs list of links for Kara, unticketed (if tagged) will be added to the list as usual.
