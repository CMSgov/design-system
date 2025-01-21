import { humanizeList } from '../../packages/docs/src/helpers/humanizeList';
import { useOf } from '@storybook/blocks';

interface HtmlElementArgsProps {
  of?: any;
}

/**
 * If the component we're documenting passes extra props through to an HTML element,
 * we want to include documentation about that. Rather than listing out all the
 * additional attributes for those HTML elements in our props table, we will add
 * some explanatory text with MDN documentation links to the bottom of our props
 * table. Looks for a `underlyingHtmlElements` array in `story.parameters.docs` to
 * determine if it should show this additional text and what elements' documentation
 * it should link to.
 */
export const HtmlElementArgs = ({ of }: HtmlElementArgsProps) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);
  if (resolvedOf.type !== 'story') {
    return null;
  }

  const elements = resolvedOf.story.parameters?.docs?.underlyingHtmlElements;
  if (!elements) {
    return null;
  }

  const elementNames = elements.map((name) => <code key={name}>{`<${name}>`}</code>);
  const elementLinks = elements.map((name) => (
    <a href={`https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${name}`} key={name}>
      {`<${name}>`}
    </a>
  ));
  const formattedElementNames = humanizeList(elementNames, { conjunction: 'or' });
  const formattedElementLinks = humanizeList(elementLinks, { conjunction: 'and' });

  return (
    <>
      <h3 id="additional-props">Additional props</h3>
      <p>
        This component passes any additional props to its underlying {formattedElementNames} element
        as attributes. See the corresponding MDN documentation for {formattedElementLinks} for a
        list of valid attributes.
      </p>
      <br />
    </>
  );
};
