# Scan Design System Dependents Tool

This tool gathers the versions of our design systems currently being used in the CMS-WDS organization on github.cms.gov.

You can run this tool from the root of the repository directory with the following command:

```
yarn scan-dependents
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

## Scan versions of the design systems in use

This is the default behavior of the script if no additional options are specified, the script will print out design system versions in use by our dependents.

## Scan dependencies of dependents

You can scan for which versions of certain dependencies our dependents are using with

```
yarn scan-dependents --dependency <dependency-package-name>
```

For example, this would scan for which version of React our dependencies are using:

```
yarn scan-dependents --dependency react
```

## Additional options

### Scanning only a subset of our design systems

Example:

```
yarn scan-dependents --designSystems @cmsgov/design-system @cmsgov/ds-healthcare-gov --dependency node-sass
```

This will scan only dependents of the core and healthcare design systems to find out what version of `node-sass` they're using if any.
