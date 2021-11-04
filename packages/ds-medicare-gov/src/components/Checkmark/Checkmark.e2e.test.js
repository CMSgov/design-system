import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/e2e/constants';

import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/e2e/assertNoAxeViolations';
import { getElementById } from '@cmsgov/design-system-scripts/helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.checkmark-icon.react/`;

describe('Checkmark component', () => {
  it('Should render', async () => {
    await driver.get(rootURL);

    const el = await getElementById('js-example');
    expect(el).toBeTruthy();
  });
  
  it('Should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
