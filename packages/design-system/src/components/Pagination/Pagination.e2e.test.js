/* global driver */
import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/e2e/constants';

import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/e2e/assertNoAxeViolations';
import { getElementById } from '@cmsgov/design-system-scripts/helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.pagination.react/`;

describe('Pagination component', () => {
  it('should render default component', async () => {
    await driver.get(rootURL);

    const el = await getElementById('test-default');
    expect(el).toBeTruthy();
  });

  it('should have no accessibility violations', async () => {
    await driver.get(rootURL);
    await assertNoAxeViolations(null, 'color-contrast');
  });
});
