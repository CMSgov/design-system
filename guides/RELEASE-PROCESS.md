# Release process

1. **Publish to NPM**

   1. Ensure you are logged into NPM. Check your user account with `npm whoami`.

      **Note**: Your NPM account must access to the CMS group and provide a valid access token. To add a token, edit your `~/.npmrc` file so the contents are `//registry.npmjs.org/:_authToken={token}`

   1. Checkout the latest `master` branch and ensure that you don't have any local changes. If you do have local changes [stash or discard](https://docs.gitlab.com/ee/topics/git/numerous_undo_possibilities_in_git/#quickly-save-local-changes) them before going to the next step.
   1. Check for unexpected visual regressions. The app must be running locally in order for the tests to run, so run `yarn start` if the app isn't up already.
      ```
      backstop test
      ```
      If there are expected visual changes, run `backstop approve` to save the new reference files. This should ideally be handled before the release process begins.
   1. Run the release script to automatically begin the release process and publish to NPM.
      ```
      yarn release
      ```
      This script will install dependencies, build design system assets, and run the linter and tests. If everything passes, `lerna` will prompt you for the new version number, which should follow the [SemVer release format](#versioning). After the versions are updated, the script will create a tagged release commit (prefaced with `core-`), a branch (prefaced with `release-`) containing the release commit, and a zip for the Github release notes.
   1. The last step in the script will prompt you to continue with publishing to NPM. Proceed if everything is ready.
   1. After the release script is completed, make sure to merge the release branch (i.e. `release-2.0.0`) into master.

1. **Create a release on GitHub**

   1. [Draft a new release on GitHub](https://github.com/CMSgov/design-system/releases/new)
   1. Tag the release with the newly created tag from the previous step (i.e. `core-2.0.0`).
   1. Title the release using the release number (i.e. `2.0.0`)
   1. Attach the release zip created from the previous step (i.e. `cmsgov-design-system-2.0.0.tgz`) to the release as an asset
   1. Use the template below for the release notes

   ```
   ## 🚨 Breaking/Behavioral changes
   ## 🚀 Added
   ## 💅 Changed
   ## 🛠 Fixed
   ## 📦 Internal
   ## 🚫 Deprecated
   ```

   **Note**: View commits since the last release by going to the [releases page](https://github.com/CMSgov/design-system/releases) or by running: `` git log `git describe --tags --abbrev=0`..HEAD --oneline ``

   1. Review the release notes and publish

1. **Update the design.cms.gov documentation website**

   1. [Log in to CBJ](https://cloudbeesjenkins.cms.gov/prod-master/job/wds/job/Design%20System/job/Deploy%20design-system/) to Deploy the CMS Design System documentation website.

      **Note**: Your CBJ user will need to be a member of the `wd-user` group or you will be unable to see the linked job above.

   1. Select the tag created in the first step (i.e. `core-2.0.0`) as the branch to deploy.

   Deploying the documentation website is a multi-stage pipeline that executes the deploy in two stages:

   - The first child job builds `design-system`, creates a tarball from the resulting artifacts, then uploads the tarball to S3.
   - The second child job downloads the tarball from S3, expands it onto the node Jenkins is using for the deploy, then copies the files to Netstorage via `scp`.

   **Note**: For a manual process: Visit the [Documentation deploy process page](https://confluence.cms.gov/display/HCDSG/Documentation+deploy+proces) in Confluence for these instructions.

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
