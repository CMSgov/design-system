import { define } from 'preactement';
import Alert from '../Alert/Alert';

const attributes = [
  'class-name',
  'heading',
  'heading-id',
  'hide-icon',
  'role',
  'weight',
  'variation',
];

define('ds-alert', () => Promise.resolve(Alert), { attributes });
