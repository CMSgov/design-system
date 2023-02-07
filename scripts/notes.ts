import { execSync } from 'node:child_process';

let target;

if (process.argv.length == 2) {
  console.log(
    'Please provide a target tag/branch name to compare the current branch HEAD against.'
  );
  process.exit(1);
} else {
  target = process.argv[2];
}

/**
 * Accepts: A github pr number
 * Returns: Array of labels applied to the PR or null if none.
 */
const getGithubLabels = (pr: string) => {
  const l = JSON.parse(execSync(`gh pr view ${pr} --json=labels`).toString());
  const labels = l.labels.map((label: typeof l.labels) => {
    return label['name'];
  });
  if (labels.length) return labels;
  return null;
};

/**
 * Filters out 'Publish', or anything that doesn't fit our template
 */
const initialFilter = /^.\s(\w*)\s\[([\w-]*)\]\s(.*)\s\(#(\d*)\)$/;

/**
 * Get the difference between one branch and another as a list of
 * commits with pr #'s and description. --cherry is used to perform a
 * diff check to rule out commits which just have different hashes.
 */
const logData = execSync(`git log --pretty=oneline --cherry HEAD...${target}`).toString();
const filteredLogArray = logData.split('\n').filter((line: string) => line.match(initialFilter));

/**
 * Generate an array of objects for each PR/commit from the filtered
 * git log generated above. This data can be sorted into draft notes.
 */
const sortedLogData = filteredLogArray.map((line: string) => {
  const matched = line.match(initialFilter);

  if (matched) {
    const labels = getGithubLabels(matched[4]);
    const ticket = matched[2].toLowerCase().includes('no') ? null : matched[2];

    return {
      hash: matched[1],
      ticket: ticket,
      description: matched[3],
      ghpr: matched[4],
      labels: labels,
    };
  } else {
    console.log(
      `One of the items in the returned set did not match the filter ${initialFilter.toString()}.`
    );
    console.log(filteredLogArray);
    process.exit(1);
  }
});

console.log(sortedLogData);
