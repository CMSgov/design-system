import _ from 'lodash';
import c from 'chalk';
import { chooseMilestone, sh, verifyGhInstalled } from './utils';
import { confirm } from '@inquirer/prompts';

type MergeCommit = { oid: string };
type PullRequest = { title: string; mergeCommit?: MergeCommit; mergedAt?: string };

function getPrMergeTime({ title, mergedAt }: PullRequest): number {
  if (!mergedAt) {
    throw new Error(`Unmerged commit found: '${title}'`);
  }

  return new Date(mergedAt).getTime();
}

function formatPr({ title, mergeCommit }: PullRequest) {
  if (!mergeCommit) {
    throw new Error(`Unmerged commit found: '${title}'`);
  }
  const hash = mergeCommit.oid.substring(0, 8);
  return `${c.cyan(hash)} - ${title}`;
}

(async () => {
  verifyGhInstalled();
  try {
    const milestone = await chooseMilestone();
    const query = `milestone:"${milestone.title}"`;
    const command = `gh pr list --search '${query}' --state merged -L 200 --json title,mergeCommit,mergedAt`;
    const unsortedPrs = JSON.parse(sh(command).toString());
    const prs: PullRequest[] = _.sortBy(unsortedPrs, [getPrMergeTime]);

    console.log(
      `The following pull requests were found for milestone ${c.green(milestone.title)}:`
    );
    console.log('');
    console.log(prs.map(formatPr).join('\n'));
    console.log('');
    console.log(
      'Their merge commits will be cherry-picked in the order they were originally merged.'
    );
    const ok = await confirm({
      message: 'Do you want to cherry-pick them onto your current branch now? (Y/n): ',
    });
    if (ok) {
      console.log('woohoo');
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
