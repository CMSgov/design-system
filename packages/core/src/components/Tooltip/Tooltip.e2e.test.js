/* global driver */
import { ROOT_URL } from '../../helpers/e2e/constants';

import assertNoAxeViolations from '../../helpers/e2e/assertNoAxeViolations';
import { getElementById } from '../../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.tooltip.react/`;

describe('Tooltip component', () => {
  it('Should render', async() => {
    await driver.get(rootURL);

    expect(await getElementById('tooltip-1-id')).toBeTruthy();
    expect(await getElementById('tooltip-2-id')).toBeTruthy();
    expect(await getElementById('tooltip-3-id')).toBeTruthy();
  });

  it('Should have no accessibility violations', async() => {
    await assertNoAxeViolations(rootURL);
  });
});
