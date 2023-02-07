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
 * Returns: Array of labels applied to the PR
 */
const getLabels = (pr: string) => {
  const l = JSON.parse(execSync(`gh pr view ${pr} --json=labels`).toString());
  const labels = l.labels.map((label: typeof l.labels) => {
    return label['name'];
  });
  return labels;
};

/**
 * Filters out 'Publish', or anything that doesn't fit our template
 */
const initialFilter = /^.\s(\w*)\s\[([\w-]*)\]\s(.*)\s\(#(\d*)\)$/;

/**
 * Get the difference between one branch and another
 */
const logData = execSync(`git log --pretty=oneline --cherry HEAD...${target}`).toString();

const filteredLogArray = logData.split('\n').filter((line: string) => line.match(initialFilter));

/**
 * Generate an array of objects for each PR from the filtered git log
 */
const sortedLogData = filteredLogArray.map((line: string) => {
  const m = line.match(initialFilter);
  if (m) {
    return {
      hash: m[1],
      ticket: m[2],
      description: m[3],
      ghpr: m[4],
      labels: getLabels(m[4]),
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
