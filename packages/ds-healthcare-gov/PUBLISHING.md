# Release process

## 1. Create a release commit and tag

The first step before we publish our release to npm is to create the release commit and tag. The commit will contain the version bump in our package files and will be added to a branch that can be merged into master using a pull request. That commit will be tagged so we can use it right away when we publish to npm.

### 1a. Choose a starting point

For most releases, we will be creating our release tag from the HEAD of the `master` branch—the latest reviewed version of our codebase. In this case, you can simply

```
git checkout master
```

before moving on.

However, in some cases we may want to create the release tag from another commit. See the next two subsections about the two most common cases where you would not start at the HEAD of `master`.

#### **Special case:** We only want to release work merged up to a certain point in time

and all other commits after that should not be included in the release. In this case you can check out the last commit you want to include before moving on.

```
git checkout <commit hash>
```

#### **Special case:** We have a **hotfix** to include on top of a previous release

Start by checking out the previous release:

```
git fetch --tags
git checkout tags/<tag name>
```

Then find out the commit hash or hashes of the hotfix changes and cherry-pick them on to your current detached HEAD:

```
git cherry-pick <hotfix commit hash>
```

When the cherry-picking has been resolved, you can move on to the next step.

### 1b. Run the release script to create the release commit and tag

Run

```
yarn release
```

and go through the interactive prompt to choose the release version. See notes on [SemVer release format](#versioning). It will automatically apply the version bumps, commit it to a branch, and tag it as a release.

## 2. Publish to npm

Find out your tag name from the previous step and run

```
yarn publish-release <tag name>
```

After successfully publishing, there will be three zip files for uploading to the GitHub release in the next step.

**Note:** You must be logged in to an NPM account with publishing rights on the `cmsgov` organization. To request access, create a [Jira ticket on the QPP Tools and Access board](https://jira.cms.gov/browse/QTA-847) with your EUA and NPM username. Reach out on the [`#cms-design-system` channel](https://cmsgov.slack.com/archives/CHH0381RD) for any questions on this process.

## 3. Create a release on GitHub

1. [Draft a new release on GitHub](https://github.com/CMSgov/hcgov-design-system/releases/new)
1. For the tag, use the format `v*` (ie. `v1.1.0`)
1. For the title, use the release number (ie. `1.1.0`)
1. Create release notes broken down into the following sections (omitting unused sections):

   ```
   ## 🚨 Breaking changes
   ## 🚀 Added
   ## 💅 Changed
   ## 🛠 Fixed
   ## 📦 Internal
   ```

1. Review the release notes and publish

## 4. Update the documentation site

```
yarn gh-pages
```

## 5. Create a PR for the release branch

The `yarn release` script will have created and pushed a release branch. Create a PR for the release branch titled after the release (i.e. `Release 2.0.0`). Merge the PR into master after the changes are approved.

# Versioning

The design system follows the [SemVer specification](http://semver.org/).

## Semantic Versioning

### Patch release

Bug fixes and other minor changes: Increment the last number, e.g. `1.0.1`

Examples:

- Backwards compatible Sass/JS bug fixes
- Tiny visual changes to make the UI more consistent

### Minor release

Backwards compatible new functionality, newly deprecated APIs, or substantial new functionality/improvements to private code: Increment the middle number, e.g. `1.1.0`

Examples:

- Addition of a new component
- New classes, global variables, mixins, functions, or deprecated code
- Minor visual changes to existing components

### Major release

Changes which break backwards compatibility: Increment the first number, e.g. `2.0.0`

Example changes:

- Renamed or removed classes, mixins, functions, placeholders, or global variables.
- Major visual changes to existing components
