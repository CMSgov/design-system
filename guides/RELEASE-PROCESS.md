# Release process

1. **Create a release commit**
   1. Run prepublish script from the root of your local git repo. This will bump the version, build the documentation, and transpile + bundle `dist` assets.
      ```
      ./scripts/prepublish.sh
      ```

   1. Commit and push to `master`:
      ```
      git commit -a -m "Release v[1.1.0]"
      git push
      ```
   1. Create a release
      1. [Draft a new release on GitHub](https://github.com/CMSgov/design-system/releases/new)
      1. Tag the release using the release number format. For example, `v1.1.0`
      1. Title the release using the release number. For example, `1.1.0`
      1. Follow the format below for the release notes, then publish.

      ```
      ## 🚨 Breaking changes
      ## 🚀 Added
      ## 💅 Changed
      ## 🛠 Fixed
      ## 📦 Internal
      ```

      **Note**: View commits since the last release on github by going to the [releases page](https://github.com/CMSgov/design-system/releases) or run: ```git log `git describe --tags --abbrev=0`..HEAD --oneline```
1. **Publish to NPM**
   1. Log into NPM as `cmsgov`: `npm whoami`.
      1. To use an access token, edit your `~/.npmrc` file so the contents are `//registry.npmjs.org/:_authToken={token}`
   1. Ensure JS unit tests, JS linting, and Sass linting pass locally.
      ```
      yarn test
      ```
   1. Publish the release to NPM by running
      ```
      ./scripts/publish.sh
      ```
      This will run `npm publish` for each public package in `packages/`.
      **Note**: You should only publish the `master` branch to NPM. The publish script above will check out the `master` branch if it isn't currently the `HEAD`.
1. **Update the documentation website**
   1. The only parameter needed for deployment is the Git branch you'd like to deploy. The default is set to `master`.

   1. [Deploy the CMS Design System](https://cloudbeesjenkins.cms.gov/prod-master/job/wds/job/Design%20System/job/Deploy%20design-system/) to Akamai Netstorage via an automated Jenkins pipeline.

   It is a multi-stage pipeline that executes the deploy in two stages:
      * The first child job builds `design-system`, creates a tarball from the resulting artifacts, then uploads the tarball to S3.
      * The second child job downloads the tarball from S3, expands it onto the node Jenkins is using for the deploy, then copies the files to Netstorage via `scp`.

   **Note**: Your CBJ user will need to be a member of the `wd-user` group or you will be unable to see the linked job above.

   **Note**: For a manual process: Visit the [Documentation deploy process page](https://confluence.cms.gov/display/HCDSG/Documentation+deploy+proces) in Confluence for these instructions.
