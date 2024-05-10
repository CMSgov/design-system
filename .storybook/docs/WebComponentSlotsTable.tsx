import { useOf } from '@storybook/blocks';

/**
 * A table documenting a web component's available slots
 */
export const WebComponentSlotsTable = ({ of }) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);
  if (resolvedOf.type !== 'story') {
    return null;
  }
  const slots = resolvedOf.story.parameters?.docs?.slots;
  if (!slots) {
    return null;
  }

  const rows = Object.entries(slots).map(([slotName, slot]: any) => (
    <tr key={slotName}>
      <td>
        <strong>{slotName}</strong>
      </td>
      <td>
        <p>{slot?.description ?? ''}</p>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 id="slots">Slots</h2>
      <p>
        One limitation of element attributes is that they can only contain strings. Slots are a way
        of passing HTML content as inputs to web components when there are multiple kinds of inputs
        that need to be passed. For instance, the <code>&lt;ds-choice&gt;</code> element can receive
        both HTML for "checked children" and "unchecked children", which are dynamically shown or
        hidden depending on the checked state. To pass HTML as a slot inside your web component, use
        either{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot">
          the slot element
        </a>{' '}
        with a <code>name</code> attribute that matches one of the slots in the table below or{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot">
          the slot attribute
        </a>{' '}
        on an element type of your choosing.
      </p>
      <table className="docblock-argstable">
        <thead className="docblock-argstable-head">
          <tr>
            <th style={{ minWidth: '10rem' }}>
              <span>Name</span>
            </th>
            <th>
              <span>Description</span>
            </th>
          </tr>
        </thead>
        <tbody className="docblock-argstable-body">{rows}</tbody>
      </table>
      <br />
    </>
  );
};
