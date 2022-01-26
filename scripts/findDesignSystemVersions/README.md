# Find Design System Versions Tool

This tool gathers the versions of our design systems currently being used the CMS-WDS organization on github.cms.gov.

You can run this tool from the root of the repository directory with the following command:

```
yarn scan-versions
```

## Setup

First, you'll need to create a personal access token through GitHub Enterprise.

In the top right of CMS github, click your user icon > Settings.
Choose Developer Settings in the left menu.
Choose personal access tokens.

Generate a new token.

This token can either be stored in a `.env` file or passed to the tool through the command line.

### Save token to .env file

In `.env` in the root of the repository directory, add

```
GHE_ACCESS_TOKEN=token
```

where `token` is your access token.

### Pass token through CLI

Pass it to the command like this

```
yarn scan-versions --token YOUR_PERSONAL_ACCESS_TOKEN
```
