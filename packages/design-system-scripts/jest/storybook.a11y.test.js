const a11yvars = require('../helpers/a11y/constants');
const assertNoAxeViolations = require('../helpers/a11y/assertNoAxeViolations');

// storybookTests defined as global in a11y.config.js
test.each(storybookTests)('%s', async (title, sbURL) => {
  await assertNoAxeViolations(a11yvars.ROOT_URL + sbURL);
});
