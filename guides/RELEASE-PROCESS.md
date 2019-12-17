# Release process

1. **Create a release draft on GitHub**

   1. [Draft a new release on GitHub](https://github.com/CMSgov/design-system/releases/new)
   1. Tag the release using the [SemVer specification release format](#versioning). For example, `v1.1.0`
   1. Title the release using the release number. For example, `1.1.0`
   1. Follow the format below for the release notes

   ```
   ## 🚨 Breaking/Behavioral changes
   ## 🚀 Added
   ## 💅 Changed
   ## 🛠 Fixed
   ## 📦 Internal
   ## 🚫 Deprecated
   ```

   **Note**: View commits since the last release on github by going to the [releases page](https://github.com/CMSgov/design-system/releases) or run: `` git log `git describe --tags --abbrev=0`..HEAD --oneline ``

1. **Create a release commit**

   1. Checkout the latest `master` branch and ensure that you don't have any local changes. If you do have local changes [stash or discard](https://docs.gitlab.com/ee/topics/git/numerous_undo_possibilities_in_git/#quickly-save-local-changes) them before going to the next step.
      ```
      git pull && git status
      ```
   1. Run the test suite and ensure JS unit tests, JS linting, and Sass linting pass locally.
      ```
      yarn install && yarn test
      ```
   1. Check for unexpected visual regressions. The app must be running locally in order for the tests to run, so run `yarn start` if the app isn't up already.
      ```
      backstop test
      ```
      If there are expected visual changes, run `backstop approve` to save the new reference files.
   1. Run the prepublish script from the root of your local git repo. This will bump the version, build the documentation, and transpile + bundle `dist` assets.
      ```
      ./scripts/prepublish.sh
      ```
   1. Create a new branch for the new release, commit the changes and push the branch up. Follow the normal PR process for reviewing and merging the branch into master. In this example replace v1.1.0 with your version:
      ```
      git checkout -b v1.1.0
      git add --all
      git commit -m "Release v1.1.0"
      git push --set-upstream origin v1.1.0
      ```

1. **Publish to NPM**

   1. Log into NPM as `cmsgov` with `npm adduser`. Check your user account with `npm whoami`.

      1. To use an access token, edit your `~/.npmrc` file so the contents are `//registry.npmjs.org/:_authToken={token}`

   1. Run the publish to NPM script.

      ```
      ./scripts/publish.sh
      ```

      This will run `npm publish` for each public package in `packages/`.
      **Note**: You should only publish the `master` branch to NPM. The publish script above will check out the `master` branch if it isn't currently the `HEAD`.

      **Note:** You will need to have your own NPM account and get access to the cmsgov NPM org in order to publish.

   1. Publish the release notes after the npm package is updated

1. **Update the design.cms.gov documentation website**

   1. [Log in to CBJ](https://cloudbeesjenkins.cms.gov/prod-master/job/wds/job/Design%20System/job/Deploy%20design-system/) to Deploy the CMS Design System documentation website.

      **Note**: Your CBJ user will need to be a member of the `wd-user` group or you will be unable to see the linked job above.

   1. Select the branch you'd like to deploy. The default is set to `master`.

   Deploying the documentation website is a multi-stage pipeline that executes the deploy in two stages:

   - The first child job builds `design-system`, creates a tarball from the resulting artifacts, then uploads the tarball to S3.
   - The second child job downloads the tarball from S3, expands it onto the node Jenkins is using for the deploy, then copies the files to Netstorage via `scp`.

   **Note**: For a manual process: Visit the [Documentation deploy process page](https://confluence.cms.gov/display/HCDSG/Documentation+deploy+proces) in Confluence for these instructions.

   1. After the new site is deployed, update the visual regression references and put up a PR for the updates.

   ```
   backstop reference
   ```

1. **Finalize and publish release on GitHub**

   1. Create a release zip that includes all the build files
   1. Name it according to the following naming convention (i.e. design-system-v1.1.0.zip)

   ```
   design-system-v{version}.zip
   ```

   1. Upload the zip as a release asset
   1. Review the release notes and publish

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
