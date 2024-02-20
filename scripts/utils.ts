import c from 'chalk';
import { execSync, spawnSync } from 'node:child_process';
import { select } from '@inquirer/prompts';

/**
 * Execute a shell command and wait for the response. Note that this does not
 * work for interactive commands. For that, use shI.
 */
export function sh(command: string, hideOutput?: boolean): string {
  const options = hideOutput ? { stdio: 'pipe' as const } : {};
  return execSync(command, options).toString().trim();
}

/**
 * Uses node's `spawnSync` method to spawn an interactive process, which means
 * you must pass all args as an array instead of including them in the command
 * string.
 */
export function shI(command: string, args: string[]) {
  spawnSync(command, args, { stdio: 'inherit' });
}

export function verifyGhInstalled() {
  try {
    sh('gh --version');
  } catch (error) {
    console.log(
      `Please check to make sure you have the ${c.green(
        'gh'
      )} tool installed (https://cli.github.com)`
    );
    process.exit(1);
  }
}

/**
 * Fetch open milestones and let one be selected. Returns a GH milestone object.
 */
export async function chooseMilestone() {
  const milestoneJSON = sh('gh api repos/CMSgov/design-system/milestones');
  const milestoneQuery = JSON.parse(milestoneJSON);

  let milestone;
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

export function versionFromTag(tag: string): string {
  return tag.replace(/@cmsgov\/.*@(.*)$/, '$1');
}
