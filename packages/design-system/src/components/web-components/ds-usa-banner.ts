import register from '@amindunited/preact-custom-element';
import UsaBanner from '../UsaBanner/UsaBanner';

const attributes = ['class-name', 'id'];

register(UsaBanner, 'ds-usa-banner', attributes as any);
