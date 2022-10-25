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
        <li>{type} list item 1</li>
        <li>{type} list item 2</li>
      </Tag>
    </>
  );
};

export const AllLists = () => (
  <>
    <ul className="ds-c-list" aria-labelledby="unordered-list-id">
      <li>unordered list item 1</li>
      <li>unordered list item 2</li>
    </ul>
    <ol className="ds-c-list" aria-labelledby="ordered-list-id">
      <li>ordered list item 1</li>
      <li>ordered list item 2</li>
    </ol>
    <ul className="ds-c-list ds-c-list--bare" aria-labelledby="unstyled-list-id">
      <li>unstyled list item 1</li>
      <li>unstyled list item 2</li>
    </ul>
  </>
);

export const AllListsOnDark = () => (
  <>
    <ul className="ds-c-list" aria-labelledby="unordered-list-id">
      <li>unordered list item 1</li>
      <li>unordered list item 2</li>
    </ul>
    <ol className="ds-c-list" aria-labelledby="ordered-list-id">
      <li>ordered list item 1</li>
      <li>ordered list item 2</li>
    </ol>
    <ul className="ds-c-list ds-c-list--bare" aria-labelledby="unstyled-list-id">
      <li>unstyled list item 1</li>
      <li>unstyled list item 2</li>
    </ul>
  </>
);
AllListsOnDark.parameters = {
  baseInverse: true,
};

export const unorderedList = () => listMarkup('unordered');

export const orderedList = () => listMarkup('ordered');

export const unstyledList = () => listMarkup('unstyled');
