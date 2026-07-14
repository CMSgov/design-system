// import { insertVersionsIntoVersionsJson, commitLegacyVersionBump } from './legacy-versions';
import { bumpLegacyVersionsOnMain } from './legacy-versions';

bumpLegacyVersionsOnMain();
// insertVersionsIntoVersionsJson({
//   'design-system': '13.2.2',
//   'ds-medicare-gov': '15.2.2',
//   'ds-healthcare-gov': '17.2.2',
//   'ds-cms-gov': '13.2.2',
// });

// insertVersionsIntoVersionsJson({
//   'design-system': '18.1.0',
//   'ds-medicare-gov': '18.1.0',
//   'ds-healthcare-gov': '18.1.0',
//   'ds-cms-gov': '18.1.0',
// });

// commitLegacyVersionBump({
//   'design-system': '13.2.2',
//   'ds-medicare-gov': '15.2.2',
//   'ds-healthcare-gov': '17.2.2',
//   'ds-cms-gov': '13.2.2',
// });
