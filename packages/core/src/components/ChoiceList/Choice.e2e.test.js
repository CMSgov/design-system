/* global driver */
import { ROOT_URL } from '../../helpers/e2e/constants';

import assertNoAxeViolations from '../../helpers/e2e/assertNoAxeViolations';
import { getElementByClassName } from '../../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.choice.choicelist/`;
const inverseURL = `${ROOT_URL}/example/components.choice.inversed/`;

describe('Choice component', () => {
  it('Should render', async() => {
    await driver.get(rootURL);

    const el = await getElementByClassName('ds-c-fieldset');
    expect(el).toBeTruthy();
  });

  it('Should have no accessibility violations', async() => {
    await assertNoAxeViolations(rootURL);
  });

  it('Inverse layout should have no accessibility violations', async() => {
    await assertNoAxeViolations(inverseURL);
  });
});
