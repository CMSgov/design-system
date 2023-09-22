import { define } from 'preactement';
import Badge from '../Badge/Badge';

const attributes = ['class-name', 'size', 'variation'];

define('ds-badge', () => Badge, { attributes });