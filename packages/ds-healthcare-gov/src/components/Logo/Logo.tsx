import LogoEnSvg from './LogoEnSvg';
import LogoEsSvg from './LogoEsSvg';
import React from 'react';

type Language = 'en' | 'es';

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
