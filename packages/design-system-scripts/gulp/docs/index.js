/**
 * This task group generates our design system documentation. It handles things
 * like parsing our CSS/JSX comments, generating JSON data files, and ultimately
 * generating the HTML files which get published as the public site.
 */
const cleanDist = require('./common/cleanDist');
const del = require('del');
const getDocsDistPath = require('../common/getDocsDistPath');
const merge = require('gulp-merge-json');
const parseReactFile = require('./parseReactFile');
const path = require('path');
const streamPromise = require('../common/streamPromise');
const { logTask } = require('../common/logUtil');

const reactDataDirectory = `tmp/data`;
const reactDataFilename = 'react-doc.json';
const reactDataPath = path.resolve(reactDataDirectory, reactDataFilename);

function extractReactDocs() {
  // docs:react
}

module.exports = {
  async buildDocs(docsPackageDir, docsPath, rootPath) {
    let message = 'Starting the documentation generation task';

    if (shared.rootPath !== '') {
      message += ` with a root path of ${shared.rootPath}`;
    }

    logTask('🏃 ', message);

    await cleanDist(`${docsPackageDir}/dist`);
    // return gulp.series(
    //   'docs:clean',
    //   'docs:react',
    //   'docs:generate-pages',
    //   'docs:public',
    //   seriesDone => {
    //     seriesDone();
    //     done();
    //   }
    // )();
  }
};

module.exports = (gulp, shared) => {
  gulp.task('docs:fonts:core', () => {
    logTask('🔡 ', 'Copying fonts from core package into "public" directory');

    return gulp
      .src('packages/core/fonts/*')
      .pipe(gulp.dest(getDocsDistPath(shared.docsPath, shared.rootPath, '/public/fonts')));
  });

  gulp.task('docs:fonts:theme', done => {
    if (shared.theme) {
      logTask(
        '🔡 ',
        `Copying fonts from "${shared.theme}/src/font" directory into "public" directory`
      );

      return gulp
        .src(`packages/${shared.theme}/src/fonts/**/*`)
        .pipe(gulp.dest(getDocsDistPath(shared.docsPath, shared.rootPath, '/public/fonts')));
    } else {
      done();
    }
  });

  // The docs use the design system's Sass files, which don't have the
  // images inlined, so we need to be able to reference them by their URL

  gulp.task('docs:images:core', () => {
    logTask('🏞 ', 'Copying images from core package into "public" directory');

    return gulp
      .src('packages/core/images/*')
      .pipe(gulp.dest(getDocsDistPath(shared.docsPath, shared.rootPath, '/public/images')));
  });

  gulp.task(
    'docs:images',
    gulp.series('docs:images:core', () => {
      logTask('🏞 ', 'Copying images from "src" directory into "public" directory');

      return gulp
        .src(`${docsPkgDirectory}/src/**/images/*`)
        .pipe(gulp.dest(getDocsDistPath(shared.docsPath, shared.rootPath, '/public')));
    })
  );

  gulp.task('docs:fonts', gulp.series('docs:fonts:core', 'docs:fonts:theme'));

  // Convenience-task for copying assets to the "public" directory

  gulp.task('docs:public', gulp.series('docs:fonts', 'docs:images'));

  /**
   * Generate HTML pages from CSS and JS comments and Markdown files. This
   * happens within a chain of promises.
   * @return {Promise}
   */
  gulp.task('docs:generate-pages');

  // Extract info from React component files for props documentation
  gulp.task('docs:react', () => {
    logTask('🌪 ', 'Generating React propType documentation and grabbing raw example code');

    const packages = `{${shared.packages.join(',')}}`;

    return gulp
      .src([`packages/${packages}/src/**/*.jsx`, `!packages/${packages}/src/**/*.test.jsx`])
      .pipe(parseReactFile({ nameAfter: 'packages/' }, shared.rootPath))
      .pipe(merge({ fileName: reactDataFilename }))
      .pipe(gulp.dest(reactDataDirectory));
  });

  gulp.task('docs:build', done => {
    let message = 'Starting the documentation generation task';

    if (shared.rootPath !== '') {
      message += ` with a root path of ${shared.rootPath}`;
    }

    logTask('🏃 ', message);

    return gulp.series(
      'docs:clean',
      'docs:react',
      'docs:generate-pages',
      'docs:public',
      seriesDone => {
        seriesDone();
        done();
      }
    )();
  });
};
