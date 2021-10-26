/**
 * Analyze the transpiled files and compare against the files in the latest release. This is a useful way to track the impact of any changes made in the
 * current branch, allowing us to track effects on filesize, specificity, etc.
 * This task assumes the file has already been transpiled, so it should be
 * preceded by other build tasks.
 */
const cssstats = require('cssstats');
const fs = require('mz/fs');
const got = require('got');
const getPackageName = require('../common/getPackageName');
const logStats = require('./logStats');
const path = require('path');
const { sum } = require('lodash');
const { logError, logTask } = require('../common/logUtil');

const tmpPath = path.resolve('./tmp');

const SKIP_LATEST_MESSAGE =
  'If it is expected that the latest release is not in NPM, add the `--skipLatest` flag to skip this part.';

// Gets current CSS stats data from the local CSS entry point file
async function getCurrentCssStats(dir) {
  const currentCssPath = path.resolve(dir, 'dist', 'css', 'index.css');
  if (fs.existsSync(currentCssPath)) {
    try {
      const css = await fs.readFile(currentCssPath, 'utf8');
      return cssstats(css);
    } catch (error) {
      logError('getCurrentCssStats', 'Error collecting CSS stats');
      console.error(error);
    }
  } else {
    logError('getCurrentCssStats', `Unable to find current css in ${currentCssPath}`);
  }
}

// Gets CSS stats from the latest release, use unpkg to easily grab the last release in NPM
async function getLatestCssStats(packageName) {
  const latestCssUrl = `https://unpkg.com/${packageName}@latest/dist/css/index.css`;
  try {
    const response = await got(latestCssUrl);
    return cssstats(response.body);
  } catch (error) {
    logError(
      'getLatestCssStats',
      `Unable to download latest css from ${latestCssUrl}. ${SKIP_LATEST_MESSAGE}`
    );
    console.error(error);
  }
}

/**
 * Get the CSS stats from a file on the current branch and the latest release.
 * @param {boolean} skipLatest - Whether to also get stats for the file in the latest release
 * @return {Promise<{current, latest}>}
 */
async function getStatsObject(dir, packageName, skipLatest = false) {
  const current = await getCurrentCssStats(dir);
  const latest = !skipLatest && packageName ? await getLatestCssStats(packageName) : current;
  return { current, latest };
}

// Gets sum of all .woff2 file sizes from the local font directory
async function getCurrentFontSize(dir) {
  const currentFontDir = path.resolve(dir, 'dist', 'fonts');
  if (fs.existsSync(currentFontDir)) {
    return fs
      .readdir(currentFontDir)
      .then((files) => {
        return Promise.all(
          // Array of .woff2 file sizes
          files
            .filter((name) => name.match(/\.woff2$/))
            .map((name) => {
              return fs.stat(path.resolve(currentFontDir, name)).then((stats) => stats.size);
            })
        );
      })
      .then(sum)
      .catch(() => {
        logError('getFontSize', 'Error collecting font sizes');
      });
  } else {
    logError('getFontsStats', `Unable to find current fonts in ${currentFontDir}`);
    return '0';
  }
}

/**
 * Analyze the file sizes of all .woff2 font files and add to the stats object
 * @return {Promise}
 */
async function getFontsStats(dir, packageName, currentStats, skipLatest = false) {
  const currentFontSize = await getCurrentFontSize(dir);
  // TODO: Find a way to total up font file sizes from latest NPM release
  // currently latest font size stats is broken
  const latestFontSize =
    !skipLatest && packageName ? await getCurrentFontSize(dir) : currentFontSize;

  currentStats.current.totalFontFileSize = currentFontSize;
  currentStats.latest.totalFontFileSize = latestFontSize;
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
        fs.mkdir(tmpPath)
          .then(() => body)
          .catch((error) => {
            logError('createSpecificityGraph', 'Error reading chart-template.html');
            console.error(error);
          });
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
async function printStats(sourceDir, options) {
  let message = 'Gathering css & font stats';
  if (!options.skipLatest) {
    message += ' and comparing against the latest release';
  }
  logTask('🔍 ', message);

  const packageName = await getPackageName(sourceDir);
  const stats = await getStatsObject(sourceDir, packageName, options.skipLatest);
  if (stats) {
    await getFontsStats(sourceDir, packageName, stats, options.skipLatest);
    await logStats(stats, options.skipLatest);
    await createSpecificityGraph(stats);
    await saveStats(stats);
  }
}

module.exports = { printStats };
