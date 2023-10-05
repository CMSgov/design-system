import { define } from './preactement/define';
import Alert from '../Alert/Alert';

const attributes = [
  'class-name',
  'heading',
  'heading-id',
  'hide-icon',
  'role',
  'weight',
  'variation',
  'analytics',
  'analytics-label-override',
  'analytics-event-type-override',
  'analytics-parent-heading',
  'analytics-parent-type',
  'id',
  'alert-ref',
];

define('ds-alert', () => Alert, { attributes });