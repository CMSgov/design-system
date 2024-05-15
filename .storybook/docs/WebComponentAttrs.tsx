import humanizeList from 'humanize-react';
import { useOf } from '@storybook/blocks';

interface WebComponentAttrsProps {
  of?: any;
}

/**
 * If the component we're documenting passes extra props through to an HTML element,
 * we want to include documentation about that. Rather than listing out all the
 * additional attributes for those HTML elements in our props table, we will add
 * a link to the Github file naming these attributes. Looks for a `underlyingAttrLists`
 * array in `story.parameters.docs` to determine if it should show this additional
 * text and what elements' documentation it should link to.
 */
export const WebComponentAttrs = ({ of }) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);
  if (resolvedOf.type !== 'story') {
    return null;
  }

  const elements = resolvedOf.story.parameters?.docs?.underlyingAttrLists;
  if (!elements) {
    return null;
  }

  const attrLists = elements.map((name) => (
    <a
      href={`https://github.com/CMSgov/design-system/tree/main/packages/design-system/src/components/web-components/shared-attributes/${name}`}
      key={name}
    >
      {name}
    </a>
  ));
  const formattedAttrLists = humanizeList(attrLists, { conjunction: 'and' });

  return (
    <>
      <h3 id="additional-props">Additional attributes</h3>
      <p>
        This component includes attributes from the {formattedAttrLists} attribute allowlist(s).
        Because web components are just fancy HTML tags, if you find a needed attribute is missing,
        you can query the DOM and manually apply the attribute using the solution that works best
        for you and your project.
      </p>
      <br />
    </>
  );
};
