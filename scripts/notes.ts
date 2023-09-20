import * as themes from '../themes.json';
import _ from 'lodash';
import c from 'chalk';
import { confirm, select } from '@inquirer/prompts';
import { writeFileSync } from 'node:fs';
import { sh, verifyGhInstalled, versionFromTag } from './utils';

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

type Versions = { [key: string]: string };

type Themes = typeof themes | any;
const theme: Themes = themes;

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
async function chooseMilestone() {
  let milestone;
  let milestoneQuery;
  try {
    const milestoneJSON = sh('gh api repos/CMSgov/design-system/milestones');
    milestoneQuery = JSON.parse(milestoneJSON);
  } catch (err) {
    console.log(`${c.red('There was an error retrieving current milestones.')}`);
    console.log(
      `Please check to make sure you have the ${c.green(
        'gh'
      )} tool installed (https://cli.github.com)`
    );
    process.exit(1);
  }

  if (milestoneQuery.length < 1) {
    throw Error('There are currently no milestones defined.');
  } else if (milestoneQuery.length === 1) {
    milestone = milestoneQuery[0];
  } else {
    milestone = await select({
      message: 'Select an open milestone',
      choices: milestoneQuery.map((ms: any) => ({ name: ms.title, value: ms })),
    });
  }
  return milestone;
}

function fetchTags() {
  try {
    sh('git fetch --tags', true);
  } catch (error) {
    console.error(
      'Failed to fetch tags from origin. This is likely due to a local conflict. Please resolve and try again.\n'
    );
    console.error(c.red((error as Error)?.message));
    const hintCommand = c.cyan('git fetch origin tag <tagname>');
    console.error(
      `Hint: If you want to force a remote tag to override your local one, try '${hintCommand}''`
    );
    process.exit(1);
  }
}

function getLatestPackageTag(packageName: string): string {
  return sh(`git tag -l | grep "${packageName}@" | tail -1`);
}

/**
 * Grabs latest tag from each theme and returns an array of `theme: version` items.
 */
function getLatestVersions() {
  const versions: Versions = {};
  Object.entries(themes).forEach(([key, theme]) => {
    versions[key] = versionFromTag(getLatestPackageTag(theme.packageName));
  });
  return versions;
}

/**
 * Get list of PR's associated with the current milestone formatted
 * for our use as a PRDetails object.
 */
function getPRs(milestoneTitle: string) {
  const prData = JSON.parse(
    // limit to 200 results so we get more than the 30 default
    sh(
      `gh pr list --search milestone:'"${milestoneTitle}"' --state merged -L 200 --json title,url,labels,number,author,mergeCommit`
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
}

/**
 * Organizes Note(s) by the category/section they should belong in.
 * In order to keep this code as simple as possible, this just breaks up
 * pr's by their impacts. Right now if an item impacts multiple items, it
 * will be presented in each of those sections. An item will also be placed
 * in multiple type categories if it belongs to multiple.
 */
function organizeNotes(ghPrData: PRDetails[]) {
  const notes: PRNote[] = [];

  const matchLabels = (regex: RegExp, labels: string[]): string[] =>
    labels
      .map((label) => {
        const match = label.match(regex);
        return match && match[1].toLowerCase();
      })
      .filter((match): match is string => !!match);

  ghPrData.forEach((pr: PRDetails) => {
    const note = {} as PRNote;
    if (!pr.labels?.length) return;

    const types = matchLabels(/Type: (\w+)/i, pr.labels);
    const impacts = matchLabels(/Impacts: (\w+)/i, pr.labels);

    if (types.length !== 1 || impacts.length !== 1) {
      console.error(
        '\nPRs are required to have exactly one Impacts: label and at exactly one Type: label.'
      );
      console.log(pr);
      console.log();
      process.exit(1);
    }

    note.type = types[0];
    note.impacts = impacts[0];
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
}

function makeNotesMD(notes: PRNote[][], versions: Versions): string {
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
}

/**
 * Display jira links with associated title to copy/paste
 */
function displayJiraTickets(data: PRDetails[]) {
  const ticketRegex = /(\w+-\d+)/gi;

  console.log(`\n-- ${c.green('JIRA Tickets')} --`);
  data
    .filter((pr) => pr.ticket?.match(ticketRegex))
    .forEach((pr) => {
      const ticketMatches = pr.ticket?.match(ticketRegex);
      ticketMatches?.forEach((ticket) => {
        const ticketUrl = `https://jira.cms.gov/browse/${ticket}`;
        console.log(`- [${ticket}](${ticketUrl}) - ${pr.title}`);
      });
    });

  console.log(`\n-- ${c.yellow('Unticketed')} --`);
  data
    .filter((pr) => !pr.ticket || !pr.ticket?.match(ticketRegex))
    .forEach((pr) => {
      const prUrl = `https://github.com/CMSgov/design-system/pull/${pr.ghpr}`;
      console.log(`- [${pr.ticket}](${prUrl}) (${pr.author}) - ${pr.title}`);
    });
}

/**
 * Writes notes to fs and uses gh-cli to create notes for latest @cmsgov tag
 */
function publishNotes(notes: string, versions: Versions, tag: string) {
  const draftPre = versions.core.includes('beta') ? '--draft --prerelease' : '--draft';
  const fn = `./${versions.core}-release-notes.md`;
  writeFileSync(fn, notes, { encoding: 'utf8' });
  const successUrl = sh(
    `gh release create ${tag} ${draftPre} --title ${versions.core} --notes-file ${fn}`,
    true
  );
  sh(`rm ${fn}`, true);

  console.log(`\n-- ${c.blueBright('Success!')} --`);
  console.log('A draft for these notes can be found at the url below.');
  console.log(c.redBright('Please validate and update as needed before release.\n'));
  console.log(successUrl);
}

(async () => {
  verifyGhInstalled();
  try {
    /**
     * Starting point for generating notes
     */
    const milestone = await chooseMilestone();
    const { title, open_issues, closed_issues } = milestone;
    console.log(
      `Current milestone ${c.green(milestone.title)} with ${
        open_issues > 0 ? c.redBright(open_issues) : c.gray(open_issues)
      } open issues and ${c.magenta(closed_issues)} closed issues.`
    );

    fetchTags();
    const latestCoreTag = getLatestPackageTag(themes.core.packageName);
    const versions = getLatestVersions();

    const prs = getPRs(title);
    const organizedPRs = organizeNotes(prs);
    const notesMD = makeNotesMD(organizedPRs, versions).trim();

    displayJiraTickets(prs);

    console.log(`\n-- ${c.cyan('Notes')} --`);
    console.log(notesMD);
    console.log('');

    const publishOk = await confirm({
      message: 'Do these notes look OK to publish as a Draft? (Y/n): ',
    });
    if (publishOk) {
      publishNotes(notesMD, versions, latestCoreTag);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
