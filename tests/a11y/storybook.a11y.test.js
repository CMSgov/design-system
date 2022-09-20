const a11yvars = require('./constants');
const assertNoAxeViolations = require('./assertNoAxeViolations');

// storybookTests defined as global in a11y.config.js
test.each(storybookTests)('%s', async (title, sbURL) => {
  let config = {
    url: a11yvars.ROOT_URL + sbURL,
    delay: 100, // slight delay needed for all tests to account for false positives with color-contrast
    title: title,
  };

  switch (title) {
    case 'Components/Drawer Drawer Default':
    case 'Components/Drawer Drawer With Sticky Positioning':
      await assertNoAxeViolations({ ...config, delay: 1000 });
      break;
    default:
      await assertNoAxeViolations(config);
  }
});
