import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/e2e/constants';

import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/e2e/assertNoAxeViolations';
import { getElementByClassName } from '@cmsgov/design-system-scripts/helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.global-header.react/`;

describe('GlobalHeader component', () => {
  it('Should render', async () => {
    await driver.get(rootURL);

    const el = await getElementByClassName('m-c-globalHeader');
    expect(el).toBeTruthy();
  });
  
  it('Should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
