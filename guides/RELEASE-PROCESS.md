# Release process

Below are the steps for creating a new release and publishing it to NPM.

## 1) Create a release commit

1. **Run prepublish script**: From the root of your local git repo, run the following to bump the [version](versioning), build the documentation, and transpile + bundle `dist` assets.

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
