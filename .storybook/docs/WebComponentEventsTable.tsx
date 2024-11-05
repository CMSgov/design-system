import { Markdown, useOf } from '@storybook/blocks';

/**
 * A table documenting a web component's custom events
 */
export const WebComponentEventsTable = ({ of }) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);
  if (resolvedOf.type !== 'story') {
    return null;
  }
  const componentEvents = resolvedOf.story.parameters?.docs?.componentEvents;
  if (!componentEvents) {
    return null;
  }

  const rows = Object.entries(componentEvents).map(([eventName, event]: any) => (
    <tr key={eventName}>
      <td>
        <strong>{eventName}</strong>
      </td>
      <td>
        <p>
          <Markdown>{event?.description ?? ''}</Markdown>
        </p>
      </td>
      <td>
        <p>
          <Markdown>{event.eventObjectDescription}</Markdown>
        </p>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 id="events">Custom events</h2>
      <table className="docblock-argstable">
        <thead className="docblock-argstable-head">
          <tr>
            <th style={{ minWidth: '10rem' }}>
              <span>Name</span>
            </th>
            <th>
              <span>Description</span>
            </th>
            <th>
              <span>Event object</span>
            </th>
          </tr>
        </thead>
        <tbody className="docblock-argstable-body">{rows}</tbody>
      </table>
      <br />
    </>
  );
};
