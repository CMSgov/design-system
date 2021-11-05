import { Button } from '@cmsgov/design-system';
import PropTypes from 'prop-types';

// Add `secondary` button type, which is not supported in the core
Button.propTypes.variation = PropTypes.oneOf([
  'primary',
  'secondary',
  'danger',
  'success',
  'transparent',
]);
