/* global driver */
import { getElementByClassName } from '@cmsgov/design-system-scripts/helpers/e2e';
import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/e2e/constants';

import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/e2e/assertNoAxeViolations';

const rootURL = `${ROOT_URL}/example/components.autocomplete.react/`;

describe('Autocomplete component', () => {
  it('Should render', async () => {
    await driver.get(rootURL);

    const autocompleteField = await getElementByClassName('ds-u-clearfix ds-c-autocomplete');
    expect(autocompleteField).toBeTruthy();
  });

  it('Should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
