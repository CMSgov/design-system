/* global driver */
import { ROOT_URL } from '../../helpers/e2e/constants';

import assertNoAxeViolations from '../../helpers/e2e/assertNoAxeViolations';
import { getElementByClassName } from '../../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.card/`;

describe('Card component', () => {
  it('Card should render', async () => {
    await driver.get(rootURL);

    const el = await getElementByClassName('ds-c-card');
    expect(el).toBeTruthy();
  });

  it('Card should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
