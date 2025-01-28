import { makeStorybookUrl } from '../../helpers/urlUtils';
import linkAnalytics from '../../helpers/linkAnalytics';

// Create a link component that uses urlUtils to create the link
// to the storybook page for the component

interface StorybookExampleFooterProps {
  /**
   * ID of the component's doc page in Storybook.
   */
  storyId: string;
  /**
   * Do you want to visit React documentation or Web Component documentation?
   */
  tech?: 'react' | 'wc';
  /**
   * Current theme name.
   */
  theme: string;
}

const SeeStorybookForGuidance = ({
  theme,
  storyId,
  tech = 'react',
}: StorybookExampleFooterProps) => {
  return (
    <p>
      <a onClick={linkAnalytics} href={makeStorybookUrl(storyId, theme, 'docs')}>
        {tech === 'react' ? 'Review' : 'Go to'} Storybook for{' '}
        {tech === 'react' ? 'React' : 'Web Component'} guidance of this component.
      </a>
    </p>
  );
};

export default SeeStorybookForGuidance;
