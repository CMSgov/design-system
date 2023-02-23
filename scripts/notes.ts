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
}

interface Notes {
  [key: string | symbol]: Note[];
}

interface Categories {
  title?: string;
  url?: string;
  version?: string;
  items?: Notes;
}

const c = chalk;

const mdTemplate = () => {
  let t = '';

  t += '{{#.}}';
  t += '## [{{title}}]({{&url}}) []\n';
  t += '{{#breaking }}### 🚨 Breaking changes\n{{/breaking}}';
  t += '{{#breaking }}';
  t += '  - {{&title}} (#{{&number}})\n';
  t += '{{/breaking}}';
  t += '{{#added}}### 🚀 Added\n{{/added}}';
  t += '{{#added}}';
  t += '  - {{&title}} (#{{&number}})\n';
  t += '{{/added}}';
  t += '{{#changed}}### 💅 Changed\n{{/changed}}';
  t += '{{#changed}}';
  t += '  - {{&title}} (#{{&number}})\n';
  t += '{{/changed}}';
  t += '{{#fixed}}### 🛠 Fixed\n{{/fixed}}';
  t += '{{#fixed}}';
  t += '  - {{&title}} (#{{&number}})\n';
  t += '{{/fixed}}';
  t += '{{#internal}}### 📦 Internal\n{{/internal}}';
  t += '{{#internal}}';
  t += '  - {{&title}} (#{{&number}})\n';
  t += '{{/internal}}';
  t += '{{/.}}';

  return t;
};

const writeMd = (data: Categories[]): string => {
  let notes = '';

  data.forEach((section) => {
    if (!section.items?.length) return;
    if (section.items.breaking) {
      notes += '### 🚨 Breaking changes\n';
      section.items.breaking.forEach((i) => {
        notes += `  - ${i.title} (${i.number})`;
      });
    }
    if (section.items.added) {
      notes += '### 🚀 Added\n';
      section.items.added.forEach((i) => {
        notes += `  - ${i.title} (${i.number})`;
      });
    }
    if (section.items.changed) {
      notes += '### 💅 Changed\n';
      section.items.changed.forEach((i) => {
        notes += `  - ${i.title} (${i.number})`;
      });
    }
    if (section.items.fixed) {
      notes += '### 🛠 Fixed\n';
      section.items.fixed.forEach((i) => {
        notes += `  - ${i.title} (${i.number})`;
      });
    }
    if (section.items.internal) {
      notes += '### 📦 Internal\n';
      section.items.internal.forEach((i) => {
        notes += `  - ${i.title} (${i.number})`;
      });
    }
  });

  return notes;
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
const organizeNotes = (data: PRDetails[]): Categories => {
  const notes = [
    {
      title: 'Design System',
      url: 'https://www.npmjs.com/package/@cmsgov/design-system',
      items: [],
    },
    {
      title: 'Healthcare.gov Design System',
      url: 'https://www.npmjs.com/package/@cmsgov/ds-healthcare-gov',
      items: [],
    },
    {
      title: 'Medicare.gov Design System',
      url: 'https://www.npmjs.com/package/@cmsgov/ds-medicare-gov',
      items: [],
    },
    { title: 'Documentation Site', url: 'https://design.cms.gov', items: [] },
  ] as Categories;

  const checkObj = (o: any, k: any) => {
    return (o[k] = o[k] || []);
  };

  const placeNote = (pr: PRDetails, cat: string, isImpact: boolean) => {
    const theNote = { title: pr.title, number: pr.ghpr };

    // if (pr.labels?.includes('Impacts: Core')) checkObj(notes[0].items, cat).push(n) ;
    // if (pr.labels?.includes('Impacts: Healthcare')) checkObj(notes[1].items, cat).push(n);
    // if (pr.labels?.includes('Impacts: Medicare')) checkObj(notes[2].items, cat).push(n);
    // if (pr.labels?.includes('Impacts: CMSgov')) checkObj(notes[2].items, cat).push(n);
    // if (pr.labels?.includes('Impacts: Documentation')) checkObj(notes[3].items, cat).push(n);
  };

  data.forEach((pr) => {
    // const notes = []

    if (!pr.labels?.length) return;

    const pr_impacts = [];
    const pr_type = [];

    pr.labels.forEach((label) => {
      const t = label.replace(/Type: /, '').toLowerCase();
      const i = label.replace(/Impacts: /, '').toLowerCase();

      if (t) pr_type.push(t);
      if (i) pr_impacts.push(i);
    });

    if (pr_impacts.length < 1 || pr_type.length !== 1) {
      console.error(
        'PRs are required to have at least one Impacts: label and at exactly one Type: label.'
      );
      console.log(pr);
    }
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
