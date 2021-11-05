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

and go through the interactive prompt to choose the release version. See notes on [SemVer release format](#versioning). **For beta releases,** you must select the "custom version" option and manually enter your version. It will automatically apply the version bumps, commit it to a branch, and tag it as a release.

## 2. Publish to npm

Find out your tag name from the previous step and run

```
yarn publish-release <tag name>
```

After successfully publishing, there will be three zip files for uploading to the GitHub release in the next step.

**Note:** You must be logged in to an NPM account with publishing rights on the `cmsgov` organization. To request access, create a [Jira ticket on the QPP Tools and Access board](https://jira.cms.gov/browse/QTA-847) with your EUA and NPM username. Reach out on the [`#cms-design-system` channel](https://cmsgov.slack.com/archives/CHH0381RD) for any questions on this process.

## 3. Create a release on GitHub

1. [Draft a new release on GitHub](https://github.com/CMSgov/design-system/releases/new)
1. Tag the release with the newly created tag from the previous step (i.e. `core-2.0.0`).
1. Title the release using the release number (i.e. `2.0.0`)
1. Attach the release zip created from the previous step (i.e. `cmsgov-design-system-2.0.0.tgz`) to the release as an asset
1. Create release notes broken down into the following sections:

   ```
   # [Design System](https://www.npmjs.com/package/@cmsgov/design-system)
   # [Shared Scripts](https://www.npmjs.com/package/@cmsgov/design-system-scripts)
   # [Documentation site](https://www.npmjs.com/package/@cmsgov/design-system-docs)
   # 🤖 Updated dependencies
   ```

   Each of these top-level sections can have one or more of the following categories:

   ```
   ## 🚨 Breaking changes
   ## 🚀 Added
   ## 💅 Changed
   ## 🛠 Fixed
   ## 📦 Internal
   ```

   **Note**: View commits since the last release by going to the [releases page](https://github.com/CMSgov/design-system/releases) or by running: `` git log `git describe --tags --abbrev=0`..HEAD --oneline ``

1. Review the release notes and publish

## 4. Update the design.cms.gov documentation website

1. Connect to CMS VPN `cloudvpn.cms.gov`.

1. [Log in to CB Core](https://ci.backends.cms.gov/wds/job/design-system/job/deploy-design-system/) to Deploy the CMS Design System documentation website.

   **Note**: Your CB Core user will need to be a member of the `wd-user` group or you will be unable to see the linked job above.

1. Select `Build with Parameters` on the side navigation menu.

1. Enter the `branch` created in the first step (i.e. `release-2.0.0`) as the branch to deploy.

Deploying the documentation website is a multi-stage pipeline that executes the deploy in two stages:

- The first child job builds `design-system`, creates a tarball from the resulting artifacts, then uploads the tarball to S3.
- The second child job downloads the tarball from S3, expands it onto the node Jenkins is using for the deploy, then copies the files to Netstorage via `scp`.

**Note**: For a manual process: Visit the [Documentation deploy process page](https://confluence.cms.gov/display/HCDSG/Documentation+deploy+proces) in Confluence for these instructions.

## 5. Create a PR for the release branch

The `yarn release` script will have created and pushed a release branch. Create a PR for the release branch titled after the release (i.e. `Release 2.0.0`). Merge the PR into master after the changes are approved.

# Sketch Library Release Process

1. Download the [Sketch file from GitHub](https://github.com/CMSgov/design-system/blob/master/design-assets/CMS-Design-System-UI-kit.sketch)
1. Update the CMSDS Sketch file locally with your changes
1. Update the .xml file found in the `design-assets` folder in the following ways:
   - Update the item `title` with the version number
     - Example: `CMS Design System UI kit - v1.1`
   - Update `pubDate` using [RFC822 format](https://hackage.haskell.org/package/time-http-0.5/docs/Data-Time-Format-RFC822.html)
     - Example: `Mon, 13 Apr 2020 15:11:00`
   - Update `enclosure sparkle:version` number
     - Example: `sparkle:version="1.1"`
1. [Create a PR](https://github.com/CMSgov/design-system/blob/master/CONTRIBUTING.md#submitting-a-pull-request) with the updates to the .xml file and Sketch file
   - Add a title and short description for your changes.

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

### Beta release

Beta releases will follow all the semantic versioning guidelines above but also append `.beta-[number]`, e.g. `2.0.0-beta.1`. Beta versions start at 1 and are incremented each time we need to release an updated beta for this release.
