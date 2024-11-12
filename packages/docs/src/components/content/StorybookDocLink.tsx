import { makeStorybookUrl } from '../../helpers/urlUtils';

interface StorybookDocLinkProps {
  /**
   * Name of component
   */
  children: string;
  /**
   * ID of the component's doc page in Storybook.
   */
  storyId: string;
  theme: string;
  /**
   * Type of documentation, React or Web Component.
   */
  tech?: 'react' | 'wc';
}

const StorybookDocLink = ({ storyId, theme, children, tech = 'react' }: StorybookDocLinkProps) => (
  <a href={makeStorybookUrl(storyId, theme, 'docs')}>Storybook &quot;{children}&quot; page</a>
);

export default StorybookDocLink;
