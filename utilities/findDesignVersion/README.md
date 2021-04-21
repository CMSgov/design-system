In order to gather the version currently being used for the design system packages across the CMS-WDS organization, findDesignVersions.ts utility was created.

First, you'll need to create a personal access token through Github.

In the top right of CMS github, click your user icon > Settings.
Choose Developer Settings in the left menu.
Choose personal access tokens.

Generate a new token.

To run the utility you can then run from the command line:
ts-node utilities/findDesignVersion/findDesignVersions.ts -- YOUR_PERSONAL_ACCESS_TOKEN
