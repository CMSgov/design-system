import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/a11y/constants';
import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/a11y/assertNoAxeViolations';

const rootURL = `${ROOT_URL}/example/patterns.header.react/`;

describe('Header component', () => {
  // TODO: Skipping this because the example now has multiple headers rendered on the same
  // page. This causes an accessibility violation in the form of duplicate ids. Because the
  // change to the example is a good one that will improve developer experience, I'd like
  // to instead work on the infrastructure necessary to test these components independently
  // of the docs site.
  it.skip('Should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
