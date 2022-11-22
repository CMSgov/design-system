import React from 'react';
import LogoEnSvg from './LogoEnSvg';
import LogoEsSvg from './LogoEsSvg';
import { Language } from '@cmsgov/design-system';

export interface LogoProps {
  locale?: Language;
}

export function Logo(props: LogoProps) {
  return <span className="hc-c-logo">{props.locale === 'es' ? <LogoEsSvg /> : <LogoEnSvg />}</span>;
}

Logo.defaultProps = {
  locale: 'en',
};

export default Logo;
