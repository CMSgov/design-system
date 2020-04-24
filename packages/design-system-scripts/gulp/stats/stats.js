/**
 * Analyze the transpiled files and compare against the files in the latest release. This is a useful way to track the impact of any changes made in the
 * current branch, allowing us to track effects on filesize, specificity, etc.
 * This task assumes the file has already been transpiled, so it should be
 * preceded by other build tasks.
 */
const cssstats = require('cssstats');
const fs = require('mz/fs');
const getPackageName = require('../common/getPackageName');
const logStats = require('./logStats');
const path = require('path');
const { sum } = require('lodash');
const { logError, logTask } = require('../common/logUtil');

const tmpPath = path.resolve('./tmp');

const SKIP_LATEST_MESSAGE =
  'If it is expected that the latest release does not exist in node_modules, add the `--skipLatest` flag to skip this part.';

/**
 * @return {Promise} Resolves with a css stats object
 */
async function getCSSStats(cssPath) {
  try {
    const css = await fs.readFile(cssPath, 'utf8');
    return cssstats(css);
  } catch (error) {
    logError('getCSSStats', 'Error collecting CSS stats');
    console.error(error);
  }
}

/**
 * Get the CSS stats from a file on the current branch and the latest release.
 * @param {boolean} skipLatest - Whether to also get stats for the file in the latest release
 * @return {Promise<{current, latest}>}
 */
async function getStatsObject(dir, packageName, skipLatest = false) {
  let current;
  let latest;

  const currentCSSPath = path.resolve(dir, 'dist', 'index.css');
  if (fs.existsSync(currentCSSPath)) {
    current = await getCSSStats(currentCSSPath);
  } else {
    logError('getStatsObject', `Unable to find current css in ${currentCSSPath}`);
    return;
  }

  if (!skipLatest && packageName) {
    const latestCSSPath = path.resolve('node_modules', packageName, 'dist', 'index.css');
    if (fs.existsSync(latestCSSPath)) {
      latest = await getCSSStats(latestCSSPath);
    } else {
      logError('getStatsObject', `Unable to find latest release css in ${latestCSSPath}`);
      latest = current;
    }
  }

  return { current, latest };
}

/**
 * @return {Promise} Resolves with the sum of all .woff2 file sizes, assumes valid fontDir
 */
function getFontsSize(fontDir) {
  return fs
    .readdir(fontDir)
    .then((files) => {
      return Promise.all(
        // Array of .woff2 file sizes
        files
          .filter((name) => name.match(/\.woff2$/))
          .map((name) => {
            return fs.stat(path.resolve(fontDir, name)).then((stats) => stats.size);
          })
      );
    })
    .then(sum)
    .catch(() => {
      logError('getFontSize', 'Error collecting font sizes');
    });
}

/**
 * Analyze the file sizes of all .woff2 font files and add to the stats object
 * @return {Promise}
 */
async function getFontsStats(dir, packageName, currentStats, skipLatest = false) {
  // Get stats from current dist font directory if it exists
  const currentFontDir = path.resolve(dir, 'dist', 'fonts');
  if (fs.existsSync(currentFontDir)) {
    const current = await getFontsSize(currentFontDir);
    currentStats.current.totalFontFileSize = current;
  } else {
    logError('getFontsStats', `Unable to find current fonts in ${currentFontDir}`);
    currentStats.current.totalFontFileSize = '0';
  }

  // Get stats from previous release font directory if it exists and if skipLatest flag is not used
  if (!skipLatest && packageName) {
    const previousFontDir = path.resolve('node_modules', packageName, 'dist', 'fonts');
    if (fs.existsSync(previousFontDir)) {
      const latest = await getFontsSize(previousFontDir);
      currentStats.latest.totalFontFileSize = latest;
    } else {
      logError(
        'getFontsStats',
        `Unable to find latest release fonts in ${previousFontDir}. ${SKIP_LATEST_MESSAGE}`
      );
      currentStats.latest.totalFontFileSize = currentStats.current.totalFontFileSize;
    }
  }
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
    .then((body) => body.replace(/{{ROW_DATA}}/, JSON.stringify(chartRows)))
    .then((body) => {
      if (!fs.existsSync(tmpPath)) {
        fs.mkdir(tmpPath).then(() => body);
      }

      return body;
    })
    .then((body) => fs.writeFile(outputPath, body, 'utf8'))
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

/**
 * Note: Unless the `--skipLatest` flag is specified, this task requires that
 * the package being built has a copy of the latest published version of itself
 * in node_modules, whether that be as a `devDependency` or some other mechanism.
 */
async function printStats(sourcePackageDir, options) {
  let message = 'Gathering css & font stats';
  if (!options.skipLatest) {
    message += 'and comparing against the latest release';
  }
  logTask('🔍 ', message);

  const packageName = await getPackageName(sourcePackageDir);
  const stats = await getStatsObject(sourcePackageDir, packageName, options.skipLatest);
  if (stats) {
    await getFontsStats(sourcePackageDir, packageName, stats, options.skipLatest);
    await logStats(stats, options.skipLatest);
    await createSpecificityGraph(stats);
    await saveStats(stats);
  }
}

module.exports = { printStats };
