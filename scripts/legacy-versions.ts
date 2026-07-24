import c from 'chalk';
import path from 'path';
import fs from 'node:fs/promises';
import semver from 'semver';
import { sh, getCurrentBranch, pushBranch, REVIEWERS } from './utils';
import { getPackageVersions } from './versions';

export const root = path.join(__dirname, '..');

/**
 * Inserts released versions into `versions.json`, preserving descending
 * semantic version order for each design system.
 *
 * @param releasedVersions Mapping of theme package names to released versions.
 */
export async function insertVersionsIntoVersionsJson(releasedVersions: Record<string, string>) {
  const versionsFileName = path.join(root, 'versions.json');

  const contents = await fs.readFile(versionsFileName, 'utf8');
  const versionsJson = JSON.parse(contents);

  for (const [themePackage, releasedVersion] of Object.entries(releasedVersions)) {
    const existingVersions = versionsJson[themePackage];

    if (!Array.isArray(existingVersions)) {
      throw new Error(`Could not find a version array for "${themePackage}" in versions.json.`);
    }

    const updatedVersions = [...existingVersions, releasedVersion];
    const uniqueVersions = [...new Set(updatedVersions)]; // In case of duplicates

    versionsJson[themePackage] = uniqueVersions.sort(semver.rcompare); // Sorts in descending order.
  }

  await fs.writeFile(versionsFileName, `${JSON.stringify(versionsJson, null, 2)}\n`);
}

/**
 * Commits the `versions.json` updates for a legacy release.
 *
 * @param releasedVersions Mapping of theme package names to released versions.
 */
export async function commitLegacyVersionBump(releasedVersions: Record<string, string>) {
  sh('git add versions.json');

  const stagedFiles = sh('git diff --cached --name-only');

  if (!stagedFiles.includes('versions.json')) {
    console.log(c.yellow('No changes to versions.json to commit.'));
    return;
  }

  const tags = Object.entries(releasedVersions).map(
    ([themePackageName, version]) => `@cmsgov/${themePackageName}@${version}`
  );

  const commitMessage = 'Publish Legacy\n\n' + tags.map((tag) => ` - ${tag}`).join('\n');

  sh(`git commit -m "${commitMessage}"`);

  console.log(c.green('Created legacy version bump commit.'));
}

/**
 * Creates and checks out a temporary branch from the latest `main`.
 *
 * TODO: Share this branch-creation utility with `bumpMain`.
 */
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

/**
 * Creates a pull request for the legacy version bump on `main`.
 *
 * TODO: Share this pull-request creation logic with `bumpMain`.
 * @param reviewers GitHub usernames to request for review.
 */
export async function createLegacyPullRequest(reviewers: string[]) {
  const d = new Date().getDate();
  const m = new Date().getMonth() + 1;

  const title = `[RELEASE] ${m}/${d} Legacy version bump main`;
  const body = 'Adds the released legacy version(s) to versions.json on main.';
  const formattedReviewers = reviewers.map((r) => `--reviewer "${r}"`).join(' ');

  sh(`gh pr create --base main --title "${title}" --body "${body}" ${formattedReviewers}`);
}

export async function bumpLegacyVersionsOnMain() {
  console.log(c.green(`Creating a legacy version-bump branch to merge into ${c.cyan('main')}...`));
  const originalBranch = getCurrentBranch();
  const releasedVersions = getPackageVersions();

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
