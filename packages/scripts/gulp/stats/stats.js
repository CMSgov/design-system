/**
 * Analyze the transpiled files and compare against the files in the latest release. This is a useful way to track the impact of any changes made in the
 * current branch, allowing us to track effects on filesize, specificity, etc.
 * This task assumes the file has already been transpiled, so it should be
 * preceded by other build tasks.
 */
const _ = require('lodash');
const cssstats = require('cssstats');
const fs = require('mz/fs');
const getPackageName = require('../common/getPackageName');
const logStats = require('./logStats');
const path = require('path');
const { logError, logTask } = require('../common/logUtil');

const tmpPath = path.resolve('./tmp');

/**
 * Get the CSS stats from a file on the current branch and the latest release.
 * @param {boolean} skiplatest - Whether to also get stats for the file in the latest release
 * @return {Promise<{current, latest}>}
 */
async function getCSSStats(dir, packageName, skiplatest = false) {
  const currentPath = path.resolve(dir, 'dist/index.css');
  const latestPath = path.resolve('node_modules', packageName, 'dist/index.css');
  let current;
  let latest;

  const css = await fs.readFile(currentPath, 'utf8');
  current = cssstats(css);

  // Conditionally check the file in the latest release. Allowing this step to
  // be skipped enables us to run it on files that don't yet exist in the latest release
  if (!skiplatest) {
    try {
      const css = await fs.readFile(latestPath, 'utf8');
      latest = cssstats(css);
    } catch {
      logError('getCSSStats', 'Unable to get latest release CSS');
      latest = current;
    }
  } else {
    logTask('getCSSStats', 'Not checking against latest release');
    latest = current;
  }

  return { current, latest };
}

/**
 * @return {Promise} Resolves with the sum of all .woff2 file sizes
 */
function getFontSizes(fontDir) {
  return fs
    .readdir(fontDir)
    .then(files => {
      return Promise.all(
        // Array of .woff2 file sizes
        files
          .filter(name => name.match(/\.woff2$/))
          .map(name => {
            return fs.stat(path.resolve(fontDir, name)).then(stats => stats.size);
          })
      );
    })
    .then(_.sum);
}

/**
 * Analyze the file sizes of all .woff2 font files and add to the stats object
 * @param {Object} currentStats - Current and latest release stats
 * @return {Promise}
 */
function getFontStats(dir, packageName, currentStats) {
  const currentFontDir = path.resolve(dir, 'dist', 'fonts');
  const latestFontDir = path.resolve(
    'node_modules',
    packageName,
    // TODO: Add this once we're in v4: 'dist',
    'fonts'
  );
  return getFontSizes(currentFontDir)
    .then(total => {
      currentStats.current.totalFontFileSize = total;
    })
    .then(() => getFontSizes(latestFontDir))
    .then(total => {
      currentStats.latest.totalFontFileSize = total;
    })
    .then(() => currentStats);
}

/**
 * Creates an HTML file where a specificity graph can be viewed.
 * @param {Object} stats - CSS Stats output
 * @return {Promise}
 */
function createSpecificityGraph(stats) {
  const outputPath = path.resolve(tmpPath, `specificity.html`);
  const specificity = stats.current.selectors.getSpecificityGraph();
  const selectors = stats.current.selectors.values;
  const chartRows = specificity.map((val, index) => {
    const tooltip = `<strong>${val}</strong><br /><code>${selectors[index]}</code>`;
    return [index, val, tooltip];
  });

  return fs
    .readFile(path.resolve(__dirname, 'chart-template.html'), 'utf8')
    .then(body => body.replace(/{{ROW_DATA}}/, JSON.stringify(chartRows)))
    .then(body => {
      if (!fs.existsSync(tmpPath)) {
        fs.mkdir(tmpPath).then(() => body);
      }

      return body;
    })
    .then(body => fs.writeFile(outputPath, body, 'utf8'))
    .then(() => {
      logTask('📈 ', `Specificity graph created: ${outputPath}`);
    });
}

// IMPORTANT: This needs to be called AFTER any method that relies on the functions within the object.
function saveStats(currentStats) {
  const outputPath = path.resolve(tmpPath, `cssstats.json`);
  const body = JSON.stringify(currentStats.current);

  return fs.writeFile(outputPath, body, 'utf8').then(() => {
    logTask('📈 ', `Exported cssstats: ${outputPath}`);
    return currentStats;
  });
}

module.exports = (gulp, argv) => {
  gulp.task('stats', async () => {
    logTask('🔍 ', 'Gathering stats and comparing against the latest release');

    const dir = argv.sourcePackageDir;
    const packageName = await getPackageName(dir);
    const stats = await getCSSStats(dir, packageName, argv.skiplatest);
    await getFontStats(dir, packageName, stats);
    await logStats(stats);
    await createSpecificityGraph(stats);
    await saveStats(stats);
  });
};
