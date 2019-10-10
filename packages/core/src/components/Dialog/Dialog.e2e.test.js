/* global driver */
import { ROOT_URL } from '../../helpers/e2e/constants';
import assertNoAxeViolations from '../../helpers/e2e/assertNoAxeViolations';
import { getElementByClassName } from '../../helpers/e2e';

const rootURL = `${ROOT_URL}/example/components.dialog.react/`;

describe('Modal Dialog component', () => {
  it('Should render', async() => {
    await driver.get(rootURL);

    const el = await getElementByClassName('ds-c-button');
    expect(el).toBeTruthy();
  });

  it('Should open the modal dialog on click', async() => {
    await driver.get(rootURL);

    let el = await getElementByClassName('ds-c-button--success');
    el.click();

    el = await getElementByClassName('ds-c-dialog');
    expect(el).toBeTruthy();
  });

  it('Should have no accessibility violations', async() => {
    await driver.get(rootURL);

    let el = await getElementByClassName('ds-c-button--success');
    el.click();

    el = await getElementByClassName('ds-c-dialog');

    // TODO: implement `inert` to prevent main application node from containing focusable elements
    // Remove this temporarily disabled rule
    await assertNoAxeViolations(null, 'aria-hidden-focus');
  });
});
