## Summary

- Overview of changes
- A link to the Jira ticket for quick reference

<!--
  If this PR resolves a GitHub Issue, add that number below.
  Otherwise, feel free to remove this line.
-->

- Closes #XXXX

## How to test

1. Instructions on how to test the changes in this PR.

## Checklist

- [ ] Prefixed the PR title with the [Jira ticket number](https://jira.cms.gov/projects/CMSDS/) as `[CMSDS-####] Title` or [NO-TICKET] if this is unticketed work.
- [ ] Selected appropriate `Type` (only one) label for this PR, if it is a breaking change, label should only be `Type: Breaking`
- [ ] Selected appropriate `Impacts`, multiple can be selected.
- [ ] Selected appropriate release milestone
- [ ] Confirmed that the base branch appropriately matches the selected release milestone. In most cases, the base branch should **not** be main. For example, a PR assigned to the `19.0.0` milestone should target `milestone-19-0-0`.

## Merge Guidance

> 🛑 Before merging, confirm whether the PR should be squashed or merged with its commit history preserved.

**Select "Squash and merge" when:**

- Merging a single-feature PR, such as a bug fix, new functionality, or documentation update.

The PR’s commits will be combined into one commit using the PR title, such as: `[CMSDS-####] Description of the change`.

**Select "Create a merge commit" when:**

- Syncing one long-lived branch into another, such as `milestone-18-2-0` into `milestone-19-0-0`.
- Merging a milestone branch into `main`.

This preserves the branch’s commit history and records the merge explicitly.

## AI Usage

- [ ] USED_AI: I attest that I have read, understood, and take ownership of all AI-generated code in this PR.
- [ ] NO_AI: I did not use AI.

### IF you did use AI please answer these questions:

#### Type of assistance:

- [ ] Code generation
- [ ] Documentation
- [ ] Debugging
- [ ] Testing
- [ ] Refactoring
- [ ] Other

#### AI System used:

- [ ] ChatGPT
- [ ] Claude
- [ ] Gemini
- [ ] GitHub Copilot

#### Level of modification:

- [ ] As-is (AI generated all code in this submission)
- [ ] Modified (You made some changes to the AI's generation)
- [ ] Used as inspiration

<!-- Feel free to remove items or sections that are not applicable -->

### If this is a change to design:

- [ ] If visual regression image references have been changed, design **MUST** be assigned to review. In this instance, **designer approval is a requirement** before the PR can be merged.

### If this is a change to code:

- [ ] Created or updated unit tests to cover any new or modified code
- [ ] Verified that running both `npm run test:unit` and `npm run test:browser:all` were each successful
- [ ] If necessary, updated unit-test snapshots (`npm run test:unit:update`) and browser-test snapshots (`npm run test:browser:all:update`)

### If this is a change to documentation/content:

- [ ] Checked for spelling and grammatical errors
- [ ] Communicate the assigned milestone/release date with Design so they can communicate appropriately
