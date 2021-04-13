/**
 * Blast Analytics code to be included in the <head>.
 * This loads additional tracking scripts, like Google Analytics.
 * @return {String}
 */
function createAnalyticsTag() {
  const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
  return `
      <script>
        window.tealiumEnvironment = "${env}";
      </script>
      <script src="//tags.tiqcdn.com/utag/cmsgov/cms-design/prod/utag.sync.js"></script>
    `;
}

module.exports = createAnalyticsTag;
