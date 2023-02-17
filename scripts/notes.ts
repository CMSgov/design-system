import { execSync } from 'node:child_process';
import chalk from 'chalk';
import readline from 'readline';

export interface PRDetails {
  author: string;
  ghpr: string;
  hash: string;
  labels: string[] | null;
  ticket: string | null;
  title: string;
}

const c = chalk;

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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cm = JSON.parse(execSync('gh api repos/CMSgov/design-system/milestones').toString())[0];

const getPRs = () => {
  const prData = JSON.parse(
    execSync(
      `gh pr list --search "milestone:${cm.title}" --state merged --json title,url,labels,number,author,mergeCommit`
    ).toString()
  );
  const prs: PRDetails[] = prData.map((pr: any) => {
    return {
      author: pr.author.login,
      ghpr: pr.number,
      hash: pr.mergeCommit.oid,
      labels: pr.labels.map((label: any) => label.name),
      ticket: pr.title.replace(/\[(.+)\](.*)/, '$1'),
      title: pr.title.replace(/\[(.+)\](.*)/, '$2'),
    };
  });
  return prs;
};

const organizeNotes = (data: PRDetails[]) => {
  // const unticketed = data.filter(x => x.ticket?.toLowerCase().includes('ticketed'))
  // const ticketed = data.filter(x => !x.ticket?.toLowerCase().includes('ticketed'))
};

/**
 * Starting point for generating notes
 */
console.log(
  `\nCurrent milestone ${c.green(cm.title)} with ${
    cm.open_issues > 0 ? c.redBright(cm.open_issues) : c.gray(cm.open_issues)
  } open issues and ${c.magenta(cm.closed_issues)} closed issues.`
);

rl.question('\nDoes this milestone look good? (Y/n): ', (answer) => {
  answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === ''
    ? start()
    : process.exit(0);
});

const start = () => {
  const prs = getPRs();
  organizeNotes(prs);
  process.exit(0);
};

// create text changelog to go in dist folder?
