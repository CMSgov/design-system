#!/usr/bin/env node

const { execSync } = require('node:child_process');

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
const getLabels = (pr) => {
  const l = JSON.parse(execSync(`gh pr view ${pr} --json=labels`));
  const labels = l.labels.map((label) => {
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
const logData = execSync(`git log --pretty=oneline --cherry HEAD...${target}`, {
  encoding: 'UTF-8',
});

const filteredLogArray = logData.split('\n').filter((line) => line.match(initialFilter));

/**
 * A simple array of arrays which contain [commit hash, ticket, description, pr #]
 */
const sortedLogData = filteredLogArray.map((line) => {
  let m = line.match(initialFilter);
  return {
    hash: m[1],
    ticket: m[2],
    description: m[3],
    ghpr: m[4],
    labels: getLabels(m[4]),
  };
});

console.log(sortedLogData);
