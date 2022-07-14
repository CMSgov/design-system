# Scan Design System Dependents Tool

This tool gathers the versions of our design systems currently being used in the CMS-WDS organization on github.cms.gov.

To see a full list of sub-commands and options available, run this from the root of the repository:

```
yarn scan-dependents --help
```

## Setup

First, you'll need to create a personal access token through GitHub Enterprise. Here are the [instructions for creating a token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) on github.com.

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
yarn scan-dependents --token YOUR_PERSONAL_ACCESS_TOKEN
```

## Common formulas

### Scan for the version of React our dependencies are using

```
yarn scan-dependents --dependency react
```

### Scan only a subset of our design systems

```
yarn scan-dependents --designSystems @cmsgov/ds-medicare-gov @cmsgov/ds-healthcare-gov --dependency node-sass
```

This will scan only dependents of the medicare and healthcare design systems to find out what version of `node-sass` they're using if any.

### Search JavaScript files for certain strings

```
yarn scan-dependents search ChoiceList --extensions js jsx tsx
```

Searches JavaScript and TypeScript files for "ChoiceList"
