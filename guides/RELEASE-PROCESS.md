# Release process

Below are the steps for creating a new release and publishing it to NPM.

## 1) Create a release commit

1. **Run prepublish script**: From the root of your local git repo, run the following to bump the [version](#versioning), build the documentation, and transpile + bundle `dist` assets.

   ```
   ./scripts/prepublish.sh
   ```
1. Commit and push to `master`:
   ```
   git commit -a -m "Release v[1.1.0]"
   ```
1. Create a release
   1. Draft a new release on GitHub
   1. For the tag, use the format `v*` (ie. `v1.1.0`)
   1. For the title, use the release number (ie. `1.1.0`)
   1. Follow the format below for the release notes, then publish.

      ```
      ## 🚀 Added
      ## 🚨 Breaking changes
      ## 💅 Changes
      ## 🛠 Fixed
      ## 📦 Internal
      ```

    ProTip: To view a log of commits since the last release, run:
    ```
    git log `git describe --tags --abbrev=0`..HEAD --oneline
    ```


## 2) Publish to NPM

1. Ensure you're logged into NPM as `cmsgov`: `npm whoami`
  1. To use an access token, edit your `~/.npmrc` file so the contents are `//registry.npmjs.org/:_authToken={token}`
1. Ensure tests pass locally: `yarn test`
1. **Publish packages**: From the root of your local git repo, run the following to publish the release to NPM. This will run `npm publish` for each public package in `packages/`.

   You should only ever publish the `master` branch to NPM. The script mentioned below will checkout the `master` branch if it isn't currently the `HEAD`.

   ```
   ./scripts/publish.sh
   ```

## 3) Update the documentation website

Visit the "Docs site deploy process" page in Confluence for these instructions.

# Versioning

The design system follows the [SemVer specification](http://semver.org/).

## Semantic Versioning

#### Patch release

Bug fixes and other minor changes: Increment the last number, e.g. `1.0.1`

Example changes:

- Backwards compatible Sass/JS bug fixes
- Tiny visual changes to make the UI more consistent

#### Minor release
Backwards compatible new functionality, newly deprecated APIs, or substantial new functionality/improvements to private code: Increment the middle number, e.g. `1.1.0`

Example changes:

- Addition of a new component
- New classes, global variables, mixins, functions, or deprecated code
- Minor visual changes to existing components

#### Major release

Changes which break backwards compatibility: Increment the first number, e.g. `2.0.0`

Example changes:

- Renamed or removed classes, mixins, functions, placeholders, or global variables.
- Major visual changes to existing components

## Auto-increment package versions

```
./scripts/prepublish.sh
```

This will prompt you to select the version bump type and update the versions in the `package.json` files in the repo.

# Automated Deployments (via Jenkins)

You can deploy `design-system` to Akamai Netstorage via an automated Jenkins pipeline.  You can find that job [here](https://cloudbeesjenkins.cms.gov/prod-master/job/wds/job/Design%20System/job/Deploy%20design-system/).  It is a multi-stage pipeline that executes the deploy in two stages:

1. The first child job builds `design-system`, creates a tarball from the resulting artifacts, then uploads the tarball to S3.
2. The second child job downloads the tarball from S3, expands it onto the node Jenkins is using for the deploy, then copies the files to Netstorage via `scp`.

The only parameter needed to initiate a deployment is the Git branch you'd like to deploy.  The default is set to `master` so if that is what you are deploying then you are just one click away.

NOTE: Your CBJ user will need to be a member of the `wd-user` group or you will be unable to see the linked job above.

