import { ROOT_URL } from '@cmsgov/design-system-scripts/helpers/a11y/constants';
import assertNoAxeViolations from '@cmsgov/design-system-scripts/helpers/a11y/assertNoAxeViolations';

const rootURL = `${ROOT_URL}/example/components.navigation-menu.react/`;

describe('NavigationMenu component', () => {
  it('Should have no accessibility violations', async () => {
    await assertNoAxeViolations(rootURL);
  });
});
