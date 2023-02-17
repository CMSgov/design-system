import { execSync } from 'node:child_process';
import chalk from 'chalk';
import readline from 'readline';

interface PRDetails {
  author: string;
  ghpr: number;
  hash: string;
  labels: string[] | null;
  ticket: string | null;
  title: string;
}

interface Note {
  title: string;
  number: number;
  category: string;
}

interface Notes {
  core: Note[];
  docs: Note[];
  healthcare: Note[];
  medicare: Note[];
}

const c = chalk;

const mdTemplate = (notes: Notes) => {
  // let template = `## [Design System](https://www.npmjs.com/package/@cmsgov/design-system) []`
  // template += if (prs.core.breaking.length()) { return '' }
  //   ## [Documentation site](https://www.npmjs.com/package/@cmsgov/design-system-docs) [${v}]
  //   ## [Healthcare.gov Design System](https://www.npmjs.com/package/@cmsgov/ds-healthcare-gov) [${v}]
  //   ## [Medicare.gov Design System](https://www.npmjs.com/package/@cmsgov/ds-medicare-gov) [${v}]
  //   ## Updated dependencies
  //   ### 🚨 Breaking changes
  //   ### 🚀 Added
  //   ### 💅 Changed
  //   ### 🛠 Fixed
  //   ### 📦 Internal
  // `
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// current milestone reference
const cm = JSON.parse(execSync('gh api repos/CMSgov/design-system/milestones').toString())[0];

/**
 * Get list of PR's associated with the current milestone formatted
 * for our use as a PRDetails object.
 */
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
      title: pr.title.replace(/\[(.+)\]\s+(.*)/, '$2'),
    };
  });
  return prs;
};

/**
 * Organizes Note(s) by the category/section they should belong in.
 * In order to keep this code as simple as possible, this just breaks up
 * pr's by their impacts. Right now if an item impacts multiple items, it
 * will be presented in each of those sections. An item will also be placed
 * in multiple type categories if it belongs to multiple.
 */
const organizeNotes = (data: PRDetails[]): Notes => {
  const notes = { core: [], healthcare: [], medicare: [], docs: [] } as Notes;
  const checkImpacts = (pr: any, category: string) => {
    const data = { title: pr.title, number: pr.ghpr, category: category };
    if (pr.labels.includes('Impacts: Core')) notes.core.push(data);
    if (pr.labels.includes('Impacts: Healthcare')) notes.healthcare.push(data);
    if (pr.labels.includes('Impacts: Medicare')) notes.medicare.push(data);
    if (pr.labels.includes('Impacts: Documentation')) notes.docs.push(data);
  };
  data.forEach((pr) => {
    if (!pr.labels?.length) return;
    if (pr.labels.includes('Type: Added')) checkImpacts(pr, 'added');
    if (pr.labels.includes('Type: Breaking')) checkImpacts(pr, 'breaking');
    if (pr.labels.includes('Type: Changed')) checkImpacts(pr, 'changed');
    if (pr.labels.includes('Type: Fixed')) checkImpacts(pr, 'fixed');
    if (pr.labels.includes('Type: Internal')) checkImpacts(pr, 'internal');
  });
  return notes;
};

/**
 * display jira links with associated title to copy/paste to PM
 */
const displayJiraTickets = (data: PRDetails[]) => {
  console.log(`\n-- ${c.green('JIRA Tickets')} --`);
  const notes = data
    .filter((pr) => {
      return !pr.ticket?.toLowerCase().includes('ticket');
    })
    .map((pr) => {
      return { ticket: `https://jira.cms.gov/browse/${pr.ticket}`, title: pr.title };
    });
  notes.forEach((note) => console.log(`${note.ticket} - ${note.title}`));
  console.log('\n');
};

/**
 * Starting point for generating notes
 */
console.log(
  `\nCurrent milestone ${c.green(cm.title)} with ${
    cm.open_issues > 0 ? c.redBright(cm.open_issues) : c.gray(cm.open_issues)
  } open issues and ${c.magenta(cm.closed_issues)} closed issues.`
);

// Ensure we have the correct milestone.
rl.question(
  '\nIs this the correct Milestone and are you ready to create notes? (Y/n): ',
  (answer) => {
    answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === ''
      ? start()
      : process.exit(0);
  }
);

const start = () => {
  const prs = getPRs();
  const organizedPRs = organizeNotes(prs);
  console.log(organizedPRs);
  displayJiraTickets(prs);
  process.exit(0);
};

// create text changelog to go in dist folder?
