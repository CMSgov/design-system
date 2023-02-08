import { execSync } from 'node:child_process';
import themes from '../themes.json';
import chalk from 'chalk';

export interface PRDetails {
  author: string;
  ghpr: string;
  hash: string;
  labels: string[] | null;
  ticket: string | null;
  title: string;
}

const c = chalk;

/**
 * Handle command line arguments
 */
let compTarget: string, currTarget: string;

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
const getGithubPrInfo = (pr: string) => {
  process.stdout.write('.');
  const d = JSON.parse(execSync(`gh pr view ${pr} --json=labels,author`).toString());
  const labels = d.labels.map((label: typeof d.labels) => {
    return label['name'];
  });
  return {
    labels: labels.length ? labels : null,
    author: d.author.name,
  };
};

export const getOrganizedHistory = () => {
  /**
   * Filters out 'Publish', or anything that doesn't fit our template
   * of '[ticket/no-ticket] title'
   */
  const initialFilter = /^.\s(\w*)\s\[([\w\s-]*)\]\s(.*)\s\(#(\d*)\)$/;

  /**
   * Get the difference between one branch and another as a list of
   * commits with pr #'s and description. --cherry is used to perform a
   * diff check to rule out commits which just have different hashes.
   */
  const logData = execSync(
    `git log --author-date-order --pretty=oneline --cherry ${compTarget}...${currTarget}`
  )
    .toString()
    .split('\n');
  const filteredLogArray = logData.filter((line: string) => line.match(initialFilter));

  /**
   * Generate an array of objects for each PR/commit from the filtered
   * git log generated above. This data can be sorted into draft notes.
   */
  const organizedHistory = filteredLogArray.map((line: string): PRDetails => {
    const matched = line.match(initialFilter);

    if (matched) {
      const { labels, author } = getGithubPrInfo(matched[4]);
      const ticket = /no|release/i.test(matched[2].toLowerCase()) ? null : matched[2];
      return {
        author: author,
        ghpr: matched[4],
        hash: matched[1],
        labels: labels,
        ticket: ticket,
        title: matched[3],
      };
    } else {
      console.log(
        `One of the items in the returned set did not match the filter ${initialFilter.toString()}.`
      );
      console.log(filteredLogArray);
      process.exit(1);
    }
  });

  return organizedHistory;
};

// const mdTemplate = (version: string, items: PRDetails[]): string => {
//   const templ = `
//     ## [Design System](https://www.npmjs.com/package/@cmsgov/design-system) [${v}]
//     ## [Documentation site](https://www.npmjs.com/package/@cmsgov/design-system-docs) [${v}]
//     ## [Healthcare.gov Design System](https://www.npmjs.com/package/@cmsgov/ds-healthcare-gov) [${v}]
//     ## [Medicare.gov Design System](https://www.npmjs.com/package/@cmsgov/ds-medicare-gov) [${v}]
//     ## Updated dependencies

//     ### 🚨 Breaking changes
//     ### 🚀 Added
//     ### 💅 Changed
//     ### 🛠 Fixed
//     ### 📦 Internal
//   `
// }

console.log(
  `\nGenerating release notes for diff between ${c.green(compTarget)} and ${c.greenBright(
    currTarget
  )}\n`
);
console.log(`${c.cyan('🤖 Fetching PR data')}`);
const organizedLog = getOrganizedHistory();
console.log(`${c.cyanBright(' done!')}`);

const ticketedWork = organizedLog.filter((pr) => {
  return pr.ticket;
});
const unticketedWork = organizedLog.filter((pr) => {
  // don't include bump commits
  return !pr.ticket && !/bump/.test(pr.title);
});

console.log(
  `\n  Found: ${c.green(ticketedWork.length)} ticketed items and, ${c.yellow(
    unticketedWork.length
  )} items\n`
);
console.log(c.black.bgCyanBright(' Ticketed '));
console.table(ticketedWork, ['ticket', 'title', 'author', 'ghpr', 'labels']);
console.log('\n' + c.black.bgYellow(' Un-Ticketed '));
console.table(unticketedWork, ['author', 'title', 'ghpr', 'labels']);
// ticketedWork.forEach((pr) => {
//   console.log(`${pr.hash} ${pr.ticket} .. ${pr.labels}`);
// });
// console.log(`ticketed: ${ticketedWork.length} items`);

// unticketedWork.forEach((pr) => {
//   console.log(`${pr.author} - ${pr.title} .. #${pr.ghpr}`);
// });
// console.log(`unticketed: ${unticketedWork.length} items`);

// gh release create v${version} --notes-file release-${version}-notes.md --draft --prerelease
// make sure particular name doesn't already exist / error condition on conflict
// ticketed work outputs list of links for Kara, unticketed (if tagged) will be added to the list as usual.
