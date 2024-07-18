import { Button } from '@cmsgov/design-system';
import { makeStorybookUrl } from '../../helpers/urlUtils';
import ExampleFooter from './ExampleFooter';

interface StorybookExampleFooterProps {
  /**
   * story id from storybook url
   * example: `components-[COMPONENT_NAME]--default`
   */
  storyId: string;
  /**
   * Current theme
   */
  theme: string;
  hidden?: boolean;
}

/**
 * Goes below storybook-based examples and allows people to click a link to go directly
 * to the story within Storybook.
 */
const StorybookExampleFooter = ({ theme, storyId, hidden }: StorybookExampleFooterProps) => {
  return (
    <div hidden={hidden} className="c-storybook-example-footer">
      <ExampleFooter
        sourceLink={
          <Button
            href={makeStorybookUrl(storyId, theme)}
            rel="noreferrer"
            variation="ghost"
            size="small"
          >
            View interactive React examples in Storybook
          </Button>
        }
      />
    </div>
  );
};

export default StorybookExampleFooter;
