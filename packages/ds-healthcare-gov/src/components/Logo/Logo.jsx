import LogoEnSvg from './LogoEnSvg';
import LogoEsSvg from './LogoEsSvg';
import PropTypes from 'prop-types';
import React from 'react';

export function Logo(props) {
  return (
    <span className="hc-c-logo">
      {props.locale === 'es' ? <LogoEsSvg /> : <LogoEnSvg />}
    </span>
  );
}

Logo.defaultProps = {
  locale: 'en',
};

Logo.propTypes = {
  locale: PropTypes.oneOf(['en', 'es']),
};

export default Logo;
