import React from 'react';
import LogoEnSvg from './LogoEnSvg';
import LogoEsSvg from './LogoEsSvg';
import { getLanguage } from '@cmsgov/design-system';

export interface LogoProps {
  className?: string;
  titleId?: string;
}

export function Logo(props: LogoProps) {
  return (
    <span className="hc-c-logo">
      {getLanguage() === 'es' ? (
        <LogoEsSvg titleId={props.titleId} className={props.className ?? ''} />
      ) : (
        <LogoEnSvg titleId={props.titleId} className={props.className ?? ''} />
      )}
    </span>
  );
}

export default Logo;
