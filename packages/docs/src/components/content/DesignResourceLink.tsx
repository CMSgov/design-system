import React from 'react';
import { withPrefix } from 'gatsby';
import { makeSketchUrl } from '../../helpers/urlUtils';

interface DesignResourceLinkProps {
  /**
   * Current theme name.
   */
  theme: string;
  sketchId: string;
}

const DesignResourceLink = ({ sketchId, theme }: DesignResourceLinkProps) => {
  return (
    <p>
      <a href={makeSketchUrl(sketchId, theme)} className="ds-u-display--flex">
        <img
          alt=""
          src={withPrefix('/images/sketch-icon.png')}
          className="ds-u-display--inline ds-u-margin-right--1"
          style={{ height: '1.25em' }}
        />
        Sketch symbol
      </a>
    </p>
  );
};

export default DesignResourceLink;
