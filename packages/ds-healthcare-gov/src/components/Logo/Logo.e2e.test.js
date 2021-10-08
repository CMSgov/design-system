/* global driver */
import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/e2e/constants';

import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/e2e/assertNoAxeViolations';
import { getElementByClassName } from '@cmsgov/design-system-scripts/helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.logo/`;

describe('Logo component', () => {
  it('Should render', async () => {
    await driver.get(rootURL);

    const el = await getElementByClassName('hc-c-logo');
    expect(el).toBeTruthy();
  });

  it('Should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
