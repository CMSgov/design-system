#!/usr/bin/env node
const yargs = require('yargs');
const { logIntroduction } = require('./gulp/common/logUtil');

// The yargs library actually made it so you have to access `.argv` at the end
// or else it won't do anything. Not sure what the reasoning there was.
// eslint-disable-next-line no-unused-expressions
yargs
  .usage('Usage: $0 <command> [options]')
  .command({
    command: '*',
    handler: () => {
      yargs.showHelp();
    },
  })
  .command({
    command: 'build <sourceDir>',
    desc: 'Builds the design system source and outputs compiled JavaScript and Sass.',
    builder: (yargs) => {
      describeSourceOptions(yargs);
    },
    handler: async (argv) => {
      const { buildSrc } = require('./gulp/build');

      process.env.NODE_ENV = 'production';
      await logIntroduction(argv.sourceDir);
      await buildSrc(argv.sourceDir, { ...argv });
    },
  })
  .command({
    command: 'build-docs <sourceDir> <docsDir>',
    desc: 'Builds the design system source and its corresponding documentation site',
    builder: (yargs) => {
      describeSourceOptions(yargs);
      describeDocsOptions(yargs);
    },
    handler: async (argv) => {
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');

      process.env.NODE_ENV = 'production';
      await logIntroduction(argv.sourceDir);
      await buildSrc(argv.sourceDir, { ...argv });
      await buildDocs(argv.sourceDir, argv.docsDir, { ...argv });
    },
  })
  .command({
    command: 'start <sourceDir> <docsDir>',
    desc:
      'Builds and hosts the documentation site locally with a webpack dev server. Changes will be automatically rebuilt and reloaded with browsersync when detected in either the source or docs directories',
    builder: (yargs) => {
      describeSourceOptions(yargs);
      describeDocsOptions(yargs);
    },
    handler: async (argv) => {
      const { buildSrc } = require('./gulp/build');
      const { buildDocs } = require('./gulp/docs');
      const { watchDocs } = require('./gulp/watch');

      process.env.NODE_ENV = 'development';
      await logIntroduction(argv.sourceDir);
      await buildSrc(argv.sourceDir, { ...argv });
      await buildDocs(argv.sourceDir, argv.docsDir, { ...argv });
      await watchDocs(argv.sourceDir, argv.docsDir, { ...argv });
    },
  })
  .command({
    command: 'test <directory>',
    desc: 'Runs unit tests in a directory.',
    builder: (yargs) => {
      yargs
        .positional('directory', {
          desc: 'The relative path to the directory where test files are located.',
          type: 'string',
          demandOption: true,
        })
        .option('updateSnapshot', {
          desc:
            'Alias: -u. Use this flag to re-record every snapshot that fails during this test run',
          alias: 'u',
          type: 'boolean',
          default: false,
        })
        .option('watch', {
          desc: 'Alias: -w. Watch files for changes and rerun all tests when something changes',
          alias: 'w',
          type: 'boolean',
          default: false,
        })
        .option('core', {
          desc:
            'Internal flag used by the core CMSDS to modify the jest config. Unless you are on the core CMSDS team, you can ignore this.',
          type: 'boolean',
          default: false,
        });
    },
    handler: async (argv) => {
      const { run } = require('jest');
      const unitConfig = require('./jest/unit.config.js');

      process.env.NODE_ENV = 'test';
      run([
        '--config',
        JSON.stringify(unitConfig(argv.directory, argv.core)),
        ...(argv.updateSnapshot ? ['--updateSnapshot'] : []),
        ...(argv.watch ? ['--watch'] : []),
      ]);
    },
  })
  .command({
    command: 'test:e2e <directory>',
    desc: 'Runs e2e tests in a directory.',
    builder: (yargs) => {
      yargs
        .positional('directory', {
          desc: 'The relative path to the directory where test files are located.',
          type: 'string',
          demandOption: true,
        })
        .option('buildPath', {
          desc: 'The path to the directory containing documentation site build files.',
          type: 'string',
          demandOption: true,
        })
        .option('skipBuild', {
          desc: 'Use this flag to skip rebuilding the documentation site before running e2e tests.',
          type: 'boolean',
          default: false,
        })
        .option('headless', {
          desc: 'Runs e2e tests with headless chrome browser testing.',
          type: 'boolean',
          default: true,
        });
    },
    handler: async (argv) => {
      const { run } = require('jest');
      const e2eConfig = require('./jest/e2e.config.js');

      process.env.NODE_ENV = 'test';
      process.env.BUILD_PATH = argv.buildPath;
      process.env.SKIP_BUILD = argv.skipBuild;
      process.env.HEADLESS = argv.headless;
      run(['--config', JSON.stringify(e2eConfig(argv.directory))]);
    },
  })
  .command({
    command: 'lint <directories..>',
    desc: 'Runs prettier, stylelint and eslint on one or more directories.',
    builder: (yargs) => {
      yargs
        .positional('directories..', {
          desc:
            'The relative paths to one or more directories. Linting will be run on the "src" folder inside the provided directories.',
          type: 'string',
          demandOption: true,
        })
        .option('fix', {
          desc:
            'Alias: -f. Automatically fix, where possible, violations reported by eslint and stylelint. Prettier autoformats regardless of this flag.',
          alias: 'f',
          type: 'boolean',
          default: false,
        })
        .option('ignorePatterns', {
          desc:
            'Glob patterns to be ignored by prettier, eslint, and stylelint. By default "node_modules" and "dist" directories are ignored.',
          type: 'array',
          default: ['**/node_modules/**', '**/dist/**'],
        })
        .option('failAfterError', {
          desc: 'Process will exit with an error code (1) on linter error.',
          type: 'boolean',
          default: false,
        })
        .option('disableStylelint', {
          desc: 'Flag to opt out of running stylelint on files.',
          type: 'boolean',
          default: false,
        })
        .option('disableEslint', {
          desc: 'Flag to opt out of running eslint on files.',
          type: 'boolean',
          default: false,
        })
        .option('disablePrettier', {
          desc: 'Flag to opt out of running prettier on files.',
          type: 'boolean',
          default: false,
        });
    },
    handler: async (argv) => {
      const { lintDirectories } = require('./gulp/lint');
      const { directories, fix, ignorePatterns, failAfterError, ...disable } = argv;

      process.env.NODE_ENV = 'test';
      await lintDirectories(directories, fix, ignorePatterns, failAfterError, disable);
    },
  })
  .demandCommand()
  .help().argv;

function describeSourceOptions(yargs) {
  yargs
    .positional('sourceDir', {
      desc: 'The relative path to your main design-system package (that contains a src directory)',
      type: 'string',
      demandOption: true,
    })
    .option('typescript', {
      desc:
        'Alias: -t. Use this flag enable typescript support and generate typescript definition files. Requires tsconfig.json to be defined.',
      alias: 't',
      type: 'boolean',
      default: false,
    })
    .option('skipLatest', {
      desc:
        'This flag will skip comparison to the latest release when collecting stats. Use this option if it is expected that the latest release does not exist in node_modules.',
      type: 'boolean',
      default: false,
    })
    .option('core', {
      desc:
        'Internal flag used by the core CMSDS to modify supported module formats. Unless you are on the core CMSDS team, you can ignore this.',
      type: 'boolean',
      default: false,
    });
}

function describeDocsOptions(yargs) {
  yargs
    .positional('docsDir', {
      desc:
        'The relative paths to your docs-package directory. The built documentation site will be saved to the "dist" directory of this directory.',
      type: 'string',
      demandOption: true,
    })
    .option('name', {
      desc: 'Name of the design system. This is used to render documentation content.',
      type: 'string',
      default: 'CMS Design System',
    })
    .option('githubUrl', {
      type: 'string',
      desc: 'The base path for your GitHub repository URLs.',
      default: 'https://github.com/CMSgov/design-system',
    })
    .option('npmPackage', {
      type: 'string',
      desc: 'The name of your design system NPM package',
      default: '@cmsgov/design-system',
    })
    .option('rootPath', {
      desc:
        'The path of the docs site relative to the domain root. For example, if your docs site is hosted at www.domain.com/design/ your rootPath would be `design/`',
      type: 'string',
      default: '',
    });
}
