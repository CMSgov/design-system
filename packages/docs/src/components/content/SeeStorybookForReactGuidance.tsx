import React from 'react';
import { makeStorybookUrl } from '../../helpers/urlUtils';

// Create a link component that uses urlUtils to create the link
// to the storybook page for the component

interface StorybookExampleFooterProps {
  /**
   * ID of the component's doc page in Storybook.
   */
  storyId: string;
  /**
   * Current theme name.
   */
  theme: string;
}

const SeeStorybookForReactGuidance = ({ theme, storyId }: StorybookExampleFooterProps) => {
  return (
    <p>
      See <a href={makeStorybookUrl(storyId, theme, 'docs')}>Storybook</a> for React guidance of
      this component.
    </p>
  );
};

export default SeeStorybookForReactGuidance;
