/* global driver */
import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/a11y/constants';
import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/a11y/assertNoAxeViolations';
import { getElementByClassName } from '@cmsgov/design-system-scripts/helpers/a11y';

const rootURL = `${ROOT_URL}/example/components.dialog.react/`;

describe('Modal Dialog component', () => {
  it('Should have no accessibility violations', async () => {
    await driver.get(rootURL);

    let el = await getElementByClassName('ds-c-button--solid');
    el.click();

    el = await getElementByClassName('ds-c-dialog');

    // TODO: implement `inert` to prevent main application node from containing focusable elements
    // Remove this temporarily disabled rule
    await assertNoAxeViolations(rootURL, 'aria-hidden-focus');
  });
});
