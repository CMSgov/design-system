/* global driver */
import { ROOT_URL } from '../helpers/e2e/constants';

import assertNoAxeViolations from '../helpers/e2e/assertNoAxeViolations';
import { getElementByClassName } from '../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.usabanner/`;

describe('Usa banner component', () => {
  it('Usa banner should render', async () => {
    await driver.get(rootURL);

    const el = await getElementByClassName('c-usa-banner');
    expect(el).toBeTruthy();
  });

  it('Badge should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
