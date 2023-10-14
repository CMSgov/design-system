import React from 'react';
import { useOf } from '@storybook/blocks';

function joinElements(elements, delimiter) {
  return elements.map((el, index) => (
    <React.Fragment key={index}>
      {index > 0 && delimiter}
      {el}
    </React.Fragment>
  ));
}

function optToCodeBlock(opt: undefined | string) {
  const formattedOpt = opt === undefined ? 'undefined' : `"${opt}"`;
  return <code>{formattedOpt}</code>;
}

function getTypeLabel(argType: any) {
  // Actually, this type isn't very good
  // const inferredType = argType.type?.name;
  // if (inferredType) {
  //   return inferredType;
  // }

  const controlType = argType.control?.type;
  if (controlType) {
    switch (controlType) {
      case 'text':
        return <code>string</code>;
      case 'boolean':
        return <code>boolean</code>;
      case 'radio':
      case 'inline-radio':
      case 'select':
        return joinElements(argType.options?.map(optToCodeBlock), ' | ');
    }
  }
}

/**
 * A block that displays the story name or title from the of prop
 * - if a story reference is passed, it renders the story name
 * - if a meta reference is passed, it renders the stories' title
 * - if nothing is passed, it defaults to the primary story
 */
export const CustomArgsTable = ({ of }) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);
  const argTypes = resolvedOf.type === 'story' ? resolvedOf.story.argTypes : {};
  console.log(argTypes);
  // Not sure what to do yet about defaults

  return (
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
            <span>Values</span>
          </th>
        </tr>
      </thead>
      <tbody className="docblock-argstable-body">
        {Object.entries(argTypes).map(([key, argType]) => (
          <tr>
            <td>
              <strong>{key}</strong>
            </td>
            <td>
              {argType.description && (
                <div style={{ marginBottom: '4px' }}>
                  <p>{argType.description}</p>
                </div>
              )}
            </td>
            <td>
              <p>{getTypeLabel(argType)}</p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
