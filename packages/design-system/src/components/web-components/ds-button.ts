import { define } from 'preactement';
import Button from '../Button/Button';

const attributes = [
  'class-name',
  'disabled',
  'href',
  'is-alternate',
  'on-dark',
  'size',
  'type',
  'variation',
  'analytics',
  'analytics-label-override',
  'analytics-event-type-override',
  'analytics-parent-heading',
  'analytics-parent-type',
];

define('ds-button', () => Button, { attributes });
