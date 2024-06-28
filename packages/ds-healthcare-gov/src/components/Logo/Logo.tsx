import classnames from 'classnames';
import LogoEnSvg from './LogoEnSvg';
import LogoEsSvg from './LogoEsSvg';
import { getLanguage } from '@cmsgov/design-system';

export interface LogoProps {
  className?: string;
  wrapperId?: string;
  titleId?: string;
}

export function Logo(props: LogoProps) {
  return (
    <span id={props.wrapperId} className={classnames('hc-c-logo', props.className)}>
      {getLanguage() === 'es' ? (
        <LogoEsSvg titleId={props.titleId} />
      ) : (
        <LogoEnSvg titleId={props.titleId} />
      )}
    </span>
  );
}

export default Logo;
