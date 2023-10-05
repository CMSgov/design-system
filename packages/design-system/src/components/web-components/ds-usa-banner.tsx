import React from 'react';
import { define } from './preactement/define';
import { UsaBanner, UsaBannerProps } from '../UsaBanner/index';

const attributes = ['class-name', 'root-id'];

interface WrapperProps extends UsaBannerProps {
  rootId?: string;
}

const Wrapper = ({ rootId, ...otherProps }: WrapperProps) => (
  <UsaBanner {...otherProps} id={rootId} />
);

define('ds-usa-banner', () => Wrapper, { attributes });
