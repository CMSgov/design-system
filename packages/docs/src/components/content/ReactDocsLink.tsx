import React from 'react';
import { makeStorybookUrl } from '../../helpers/urlUtils';

interface ReactDocsLinkProps {
  /**
   * Name of component
   */
  children: string;
  /**
   * ID of the component's doc page in Storybook.
   */
  storyId: string;
  theme: string;
}

const ReactDocsLink = ({ storyId, theme, children }: ReactDocsLinkProps) => (
  <a href={makeStorybookUrl(storyId, theme, 'docs')}>Storybook &quot;{children}&quot; page</a>
);

export default ReactDocsLink;
