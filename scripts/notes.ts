import { execSync } from 'node:child_process';
import chalk from 'chalk';
import readline from 'readline';
import themes from '../themes.json';
import { writeFileSync } from 'node:fs';

interface PRDetails {
  author: string;
  ghpr: number;
  hash: string;
  labels: string[] | null;
  ticket: string | null;
  title: string;
}

type Themes = typeof themes | any;
const theme: Themes = themes;

const c = chalk;

const icons = {
  breaking: '🚨',
  added: '🚀',
  changed: '💅',
  fixed: '🛠',
  internal: '📦',
};

type Icons = typeof icons | any;
const icon: Icons = icons;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Current milestone reference
 */
const milestone = JSON.parse(execSync('gh api repos/CMSgov/design-system/milestones').toString())[0];
const { title: milestoneTitle, open_issues, closed_issues } = milestone;

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
const versions = getLatestVersions();

export const getLatestCoreTag = () => {
  return execSync(`git tag --sort=taggerdate | grep "${themes.core.packageName}" | tail -1`)
    .toString()
    .trim();
};

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
const organizeNotes = (data: PRDetails[]) => {
  const notes: any = [];
  data.forEach((pr: PRDetails) => {
    if (!pr.labels?.length) return;

    const noteData: any[] = [];
    const prImpacts: string[] = [];
    const prType: string[] = [];

    pr.labels.forEach((label) => {
      const t = label.match(/Type: (\w+)/i);
      const i = label.match(/Impacts: (\w+)/i);

      if (t) prType.push(t[1].toLowerCase());
      if (i) prImpacts.push(i[1].toLowerCase());
    });

    if (prImpacts.length < 1 || prType.length !== 1) {
      console.error(
        '\nPRs are required to have at least one Impacts: label and at exactly one Type: label.'
      );
      console.log(pr);
      console.log();
      process.exit(1);
    }

    prImpacts.forEach((i) => {
      noteData.push([i, prType[0], pr.title, pr.ghpr]);
    });

    notes.push(...noteData);
  });

  return notes.sort();
};

const makeNotesMD = (notes: any[]): string => {
  let md = '';
  let lastSystem = '';
  let lastType = '';

  const upCase = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  notes.forEach((note) => {
    const [sys, typ, title, num] = note;
    const typIcon = icon[typ];
    const sameSystem = lastSystem === sys;
    const sameType = lastType === typ;
    lastSystem = sys;
    lastType = typ;

    if (sameType && sameSystem) {
      md += `- ${title} (#${num})\n`;
    }
    if (!sameType && sameSystem) {
      md += `### ${typIcon} ${upCase(typ)}\n`;
      md += `- ${title} (#${num})\n`;
    }
    if (!sameSystem || (!sameSystem && !sameType)) {
      // the first item from this group, let's print a title and the first type
      const url = theme[sys].urlNpm ? theme[sys].urlNpm : 'https://design.cms.gov';
      md += `## [${theme[sys].longName}](${url}) [${versions[sys]}]\n`;
      md += `### ${typIcon} ${upCase(typ)}\n`;
      md += `- ${title} (#${num})\n`;
    }
  });
  return md + '\n';
};

/**
 * Display jira links with associated title to copy/paste
 */
const displayJiraTickets = (data: PRDetails[]) => {
  console.log(`\n-- ${c.green('JIRA Tickets')} --`);
  const notes = data
    .filter((pr) => !pr.ticket?.toLowerCase().includes('ticket'))
    .map((pr) => ({
      ticket: `https://jira.cms.gov/browse/${pr.ticket}`,
      title: pr.title,
    }));
  const unticketed = data.filter((pr) => pr.ticket?.toLowerCase().includes('ticket'));
  notes.forEach((note) => console.log(`${note.ticket} - ${note.title}`));
  console.log(`\n-- ${c.yellow('Unticketed')} --`);
  unticketed.forEach((note) => console.log(`${note.author} - ${note.ticket} - ${note.title}`));
};

/**
 * Writes notes to fs and uses gh-cli to create notes for latest @cmsgov tag
 */
const publishNotes = (notes: string) => {
  const fn = `${versions.core}-release-notes.md`;

  try {
    writeFileSync(fn, notes, { encoding: 'utf8' });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  let successUrl;
  const draftPre = versions.core.includes('beta') ? '--draft --prerelease' : '--draft';

  try {
    successUrl = execSync(
      `gh release create ${getLatestCoreTag()} ${draftPre} --title ${
        versions.core
      }-test --notes-file ./${fn}`,
      { encoding: 'utf8' }
    );
    console.log(`\n-- ${c.blueBright('Success!')} --`);
    console.log('A draft for these notes can be found at the url below.');
    console.log(c.redBright('Please validate and update as needed before release.\n'));
    console.log(successUrl);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

/**
 * Starting point for generating notes
 */
console.log(
  `\nCurrent milestone ${c.green(cm.title)} with ${
    cm.open_issues > 0 ? c.redBright(cm.open_issues) : c.gray(cm.open_issues)
  } open issues and ${c.magenta(cm.closed_issues)} closed issues.`
);

const prs = getPRs();
const organizedPRs = organizeNotes(prs);
const notesMD = makeNotesMD(organizedPRs).trim();

displayJiraTickets(prs);

console.log(`\n-- ${c.cyan('Notes')} --`);
console.log(notesMD);

rl.question('\nDo these notes look OK to publish as a Draft? (Y/n): ', (answer) => {
  answer.trim().toLowerCase() === 'y' || answer.trim().toLowerCase() === ''
    ? publishNotes(notesMD)
    : process.exit(0);
});
