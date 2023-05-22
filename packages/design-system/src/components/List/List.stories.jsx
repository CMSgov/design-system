import React from 'react';
export default {
  title: 'Foundations/Typography/List',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

const listMarkup = (type) => {
  const label = type.charAt(0).toUpperCase() + type.slice(1);
  let className = 'ds-c-list';
  let Tag = 'ul';

  if (type === 'unstyled') className = 'ds-c-list ds-c-list--bare';

  if (type === 'ordered') Tag = 'ol';

  return (
    <>
      <Tag className={className} aria-labelledby={`${type}-list-id`}>
        <li>{label} list item 1</li>
        <li>{label} list item 2</li>
      </Tag>
    </>
  );
};

export const AllLists = () => (
  <>
    {listMarkup('unordered')}
    {listMarkup('ordered')}
    {listMarkup('unstyled')}
  </>
);

export const AllListsOnDark = AllLists.bind({});
AllListsOnDark.parameters = {
  // Must supply `layout: 'fullscreen'` when we use `onDark: true`
  onDark: true,
  layout: 'fullscreen',
};

export const unorderedList = () => listMarkup('unordered');

export const orderedList = () => listMarkup('ordered');

export const unstyledList = () => listMarkup('unstyled');
