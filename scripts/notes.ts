import { execSync } from 'node:child_process';
import * as themes from '../themes.json';
import { writeFileSync } from 'node:fs';
import _ from 'underscore';

const chalk = require('chalk');
const prompt = require('readline-sync');

interface PRDetails {
  author: string;
  ghpr: number;
  hash: string;
  labels: string[] | null;
  ticket: string | null;
  title: string;
}

interface PRNote {
  impacts: string;
  type: string;
  title: string;
  pr_number: number;
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

/**
 * Current milestone reference
 */
const chooseMilestone = () => {
  let answer, milestone;
  const milestoneQuery = JSON.parse(
    execSync('gh api repos/CMSgov/design-system/milestones').toString()
  );

  if (milestoneQuery.length < 1) {
    console.error('There are currently no milestones defined.');
  } else if (milestoneQuery.length === 1) {
    milestone = milestoneQuery[0];
  } else {
    console.log(c.yellow('Current Milestones:'));
    milestoneQuery.forEach((ms: any, i: number) => {
      console.log(`  ${i + 1}. ${c.cyan(ms.title)}`);
    });
    answer = prompt.question('Which milestone? (number): ').trim();
    if (answer >= 0 && answer < milestoneQuery.length + 1) {
      milestone = milestoneQuery[answer - 1];
    } else {
      console.log(c.red(`Please enter a number between 1 and ${milestoneQuery.length}`));
    }
  }
  return milestone;
};

/**
 * Grabs latest tag from each theme and returns an array of `theme: version` items.
 */
export const getLatestVersions = () => {
  const versions: { [key: string]: string } = {};
  Object.entries(themes).forEach((theme) => {
    const pkgn = theme[1].packageName;
    const vers = execSync(`git ls-remote --tags --sort tag origin | grep "${pkgn}" | tail -1`)
      .toString()
      .trim();
    versions[theme[0]] = vers.replace(/\w+\s+refs\/tags\/@cmsgov\/.*@(.*)$/, '$1');
  });
  return versions;
};
const versions = getLatestVersions();

export const getLatestCoreTag = () => {
  const tagResults = execSync(
    `git ls-remote --tags --sort tag origin | grep "${themes.core.packageName}" | tail -1`
  )
    .toString()
    .trim();
  return tagResults.replace(/\w+\s+refs\/tags\/(.*)$/gi, '$1');
};
const latestCoreTag = getLatestCoreTag();

/**
 * Get list of PR's associated with the current milestone formatted
 * for our use as a PRDetails object.
 */
const getPRs = () => {
  const prData = JSON.parse(
    // limit to 200 results so we get more than the 30 default
    execSync(
      `gh pr list --search milestone:'"${title}"' --state merged -L 200 --json title,url,labels,number,author,mergeCommit`
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
const organizeNotes = (ghPrData: PRDetails[]) => {
  const notes: PRNote[] = [];

  ghPrData.forEach((pr: PRDetails) => {
    const note = {} as PRNote;
    if (!pr.labels?.length) return;

    if (pr.labels.length !== 2) {
      console.error(
        '\nPRs are required to have exactly one Impacts: label and at exactly one Type: label.'
      );
      console.log(pr);
      console.log();
      process.exit(1);
    }

    pr.labels.forEach((label) => {
      const t = label.match(/Type: (\w+)/i);
      const i = label.match(/Impacts: (\w+)/i);

      if (t) note.type = t[1].toLowerCase();
      if (i) note.impacts = i[1].toLowerCase();
    });

    note.title = pr.title;
    note.pr_number = pr.ghpr;

    notes.push(note);
  });

  /**
   * sort these notes in a particular order
   */
  const order = ['core', 'healthcare', 'medicare', 'cmsgov', 'documentation'];
  const typeOrder = ['breaking', 'changed', 'added', 'fixed', 'internal'];

  const sorted = _.chain(notes)
    .sortBy((note) => _.indexOf(order, note.impacts))
    .groupBy((note) => note.impacts)
    .map((system) => {
      return _.sortBy(system, (t) => _.indexOf(typeOrder, t.type));
    })
    .value();

  return sorted;
};

const makeNotesMD = (notes: PRNote[][]): string => {
  let md = '';
  let lastSystem = '';
  let lastType = '';

  const capitalize = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  _.flatten(notes).forEach((note) => {
    const { impacts, type, title, pr_number } = note;
    const typIcon = icon[type];
    const sameSystem = lastSystem === impacts;
    const sameType = lastType === type;
    lastSystem = impacts;
    lastType = type;

    if (!theme[impacts]?.incomplete) {
      if (sameType && sameSystem) {
        md += `- ${title} (#${pr_number})\n`;
      }
      if (!sameType && sameSystem) {
        md += `### ${typIcon} ${capitalize(type)}\n`;
        md += `- ${title} (#${pr_number})\n`;
      }
      if (!sameSystem || (!sameSystem && !sameType)) {
        // the first item from this group, let's print a title and the first type
        if (theme[impacts]) {
          md += `## [${theme[impacts].longName}](${theme[impacts].urlNpm}) [${versions[impacts]}]\n`;
        } else {
          // the documentation site url is not listed in themes
          // and needs to be handled outside that, any outliers
          // will receive a link to our github repo
          const sysUrl =
            impacts === 'documentation'
              ? 'https://design.cms.gov'
              : 'https://github.com/CMSgov/design-system';
          const sysName = impacts.charAt(0).toUpperCase() + impacts.slice(1);
          md += `## [${sysName}](${sysUrl})\n`;
        }
        if (theme[impacts] && impacts !== 'core') {
          md += 'All changes from the core design system and...\n';
        }
        md += `### ${typIcon} ${capitalize(type)}\n`;
        md += `- ${title} (#${pr_number})\n`;
      }
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
      ticket: `https://jira.cms.gov/browse/${pr.ticket?.replace(/(.+)\].*$/, '$1')}`,
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

  writeFileSync(fn, notes, { encoding: 'utf8' });

  let successUrl: string;
  const draftPre = versions.core.includes('beta') ? '--draft --prerelease' : '--draft';

  try {
    successUrl = execSync(
      `gh release create ${latestCoreTag} ${draftPre} --title ${versions.core} --notes-file ./${fn}`,
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
const milestone = chooseMilestone();
const { title, open_issues, closed_issues } = milestone;
console.log(
  `\nCurrent milestone ${c.green(milestone.title)} with ${
    open_issues > 0 ? c.redBright(open_issues) : c.gray(open_issues)
  } open issues and ${c.magenta(closed_issues)} closed issues.`
);

const prs = getPRs();
const organizedPRs = organizeNotes(prs);
const notesMD = makeNotesMD(organizedPRs).trim();

displayJiraTickets(prs);

console.log(`\n-- ${c.cyan('Notes')} --`);
console.log(notesMD);

const publishOk = prompt
  .question('\nDo these notes look OK to publish as a Draft? (Y/n): ')
  .trim()
  .toLowerCase();

if (publishOk === 'y' || publishOk === '') {
  publishNotes(notesMD);
} else {
  process.exit(0);
}
