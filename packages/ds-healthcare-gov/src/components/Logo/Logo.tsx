import React from 'react';
import classnames from 'classnames';
import LogoEnSvg from './LogoEnSvg';
import LogoEsSvg from './LogoEsSvg';
import { Language } from '@cmsgov/design-system';

export interface LogoProps {
  locale?: Language;
  className?: string;
}

export function Logo(props: LogoProps) {
  return (
    <span className={classnames('hc-c-logo', props.className)}>
      {props.locale === 'es' ? <LogoEsSvg /> : <LogoEnSvg />}
    </span>
  );
}

Logo.defaultProps = {
  locale: 'en',
};

export default Logo;
