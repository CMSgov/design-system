import c from 'chalk';
import path from 'path';
import fs from 'node:fs/promises';
import semver from 'semver';
import { sh, getCurrentBranch } from './utils';
// import { getPackageVersions } from './versions';
import { confirm } from '@inquirer/prompts';

const REVIEWERS = ['tamara-corbalt'];

export const root = path.join(__dirname, '..');
export async function insertVersionsIntoVersionsJson(releasedVersions: Record<string, string>) {
  const versionsFileName = path.join(root, 'versions.json');

  const contents = await fs.readFile(versionsFileName, 'utf8');
  const versionsJson = JSON.parse(contents);

  for (const [designSystem, releasedVersion] of Object.entries(releasedVersions)) {
    const existingVersions = versionsJson[designSystem];

    if (!Array.isArray(existingVersions)) {
      throw new Error(`Could not find a version array for "${designSystem}" in versions.json.`);
    }

    const updatedVersions = [...existingVersions, releasedVersion];
    const uniqueVersions = [...new Set(updatedVersions)]; // In case of duplicates

    versionsJson[designSystem] = uniqueVersions.sort(semver.rcompare); // Sorts in descending order.
  }

  await fs.writeFile(versionsFileName, `${JSON.stringify(versionsJson, null, 2)}\n`);
}

export async function commitLegacyVersionBump(releasedVersions: Record<string, string>) {
  sh('git add versions.json');

  const stagedFiles = sh('git diff --cached --name-only');

  if (!stagedFiles.includes('versions.json')) {
    console.log(c.yellow('No changes to versions.json to commit.'));
    return;
  }

  const tags = Object.entries(releasedVersions).map(
    ([packageName, version]) => `@cmsgov/${packageName}@${version}`
  );

  const commitMessage = 'Publish Legacy\n\n' + tags.map((tag) => ` - ${tag}`).join('\n');

  sh(`git commit -m "${commitMessage}"`);

  console.log(c.green('Created legacy version bump commit.'));
}

// TODO: This has very similar logic to as in `bumpMain` (release.ts)
// Refactor so both workflows can use a shared utility.
export async function createBranchFromMain() {
  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;
  const y = new Date().getFullYear();
  const H = new Date().getHours();
  const M = new Date().getMinutes();

  const tempBranch = `version-bump-${y}-${m}-${d}-${H}-${M}`;
  sh('git fetch origin main');
  sh(`git checkout -b ${tempBranch} origin/main`);

  return tempBranch;
}

// TODO: Refactor this with the standard main version-bump workflow in
// `bumpMain` (release.ts) so both use a shared pull-request utility.
export async function createLegacyPullRequest(reviewers: string[]) {
  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;

  const title = `[DO NOT MERGE][TEST LEGACY VERSION BUMP] ${m}/${d} Legacy version bump main`;
  const body = 'Adds the released legacy version(s) to versions.json on main.';
  const formattedReviewers = reviewers.map((r) => `--reviewer "${r}"`).join(' ');

  sh(`gh pr create --base main --title "${title}" --body "${body}" ${formattedReviewers}`);
}

// TODO: we can also reuse this function in a few places here.
export async function pushBranch(branchName: string) {
  sh(`git push --set-upstream origin ${branchName}`);
}

export async function bumpLegacyVersionsOnMain() {
  const yes = await confirm({
    message: `Would you like to add these legacy versions to versions.json on ${c.cyan('main')}?`,
  });

  if (!yes) {
    console.log(c.green('Skipping legacy version updates on main.'));
    return;
  }
  const originalBranch = getCurrentBranch();
  // const releasedVersions = getPackageVersions();
  const releasedVersions = {
    'design-system': '13.2.2',
    'ds-medicare-gov': '15.2.2',
    'ds-healthcare-gov': '17.2.2',
    'ds-cms-gov': '13.2.2',
  };

  // Create a branch from the latest main.
  const tempBranch = await createBranchFromMain();
  // Insert releasedVersions into versions.json.
  await insertVersionsIntoVersionsJson(releasedVersions);
  // Commit, push the branch & open pull request.
  await commitLegacyVersionBump(releasedVersions);
  await pushBranch(tempBranch);
  await createLegacyPullRequest(REVIEWERS);
  // Back to original branch.
  sh(`git checkout ${originalBranch}`);
}
