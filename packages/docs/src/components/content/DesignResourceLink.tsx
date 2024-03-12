import React from 'react';
import { withPrefix } from 'gatsby';
import { FrontmatterInterface } from '../../helpers/graphQLTypes';
import { makeSketchUrl } from '../../helpers/urlUtils';

interface DesignResourceLinkProps {
  /**
   * Current theme name.
   */
  theme: string;
  frontmatter: FrontmatterInterface;
}

const DesignResourceLink = ({ theme, frontmatter }: DesignResourceLinkProps) => {
  const themeLinks = frontmatter[theme];
  const sketchId = themeLinks?.sketchLink || null;

  return (
    <p>
      {sketchId ? (
        <a href={makeSketchUrl(sketchId, theme)} className="ds-u-display--flex">
          <img
            alt=""
            src={withPrefix('/images/sketch-icon.png')}
            className="ds-u-display--inline ds-u-margin-right--1"
            style={{ height: '1.25em' }}
          />
          Sketch symbol
        </a>
      ) : (
        'This theme does not have a Sketch symbol.'
      )}
    </p>
  );
};

export default DesignResourceLink;
