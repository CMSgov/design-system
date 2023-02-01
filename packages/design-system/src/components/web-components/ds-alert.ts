import register from 'preact-custom-element';
import Alert, { AlertProps } from '../Alert/Alert';

const observedAttributes: Array<keyof AlertProps> = [
  'className',
  'heading',
  'headingId',
  'hideIcon',
  'role',
  'weight',
  'variation',
];

// In order for slots to work with `preact-custom-element`, shadow dom has to be
// enabled, but unfortunately that will break the styles because they're global.
register(Alert, 'ds-alert', observedAttributes, { shadow: false });
