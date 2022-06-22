/* global */
import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/a11y/constants';

import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/a11y/assertNoAxeViolations';

const rootURL = `${ROOT_URL}/example/components.badge/`;

describe('Badge component', () => {
  it('Badge should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
