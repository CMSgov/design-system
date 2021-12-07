/* eslint-disable react/no-multi-comp */
import React from 'react';

export default {
  title: 'Typography/List',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
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
      <h2 className="ds-h6" id={`${type}-list-id`}>
        {label} list title
      </h2>
      <Tag className={className} aria-labelledby={`${type}-list-id`}>
        <li>List item 1</li>
        <li>List item 2</li>
      </Tag>
    </>
  );
};

// export const unorderedList = () => listMarkup('unordered');
export const unorderedList = () => (
  <>
    <h2 className="ds-h6" id="unordered-list-id">
      Unordered list title
    </h2>
    <ul className="ds-c-list" aria-labelledby="unordered-list-id">
      <li>List item 1</li>
      <li>List item 2</li>
    </ul>
  </>
);

export const orderedList = () => listMarkup('ordered');

export const unstyledList = () => listMarkup('unstyled');
