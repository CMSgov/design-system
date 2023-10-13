import React from 'react';
import { useOf } from '@storybook/blocks';

function optToString(opt: undefined | string) {
  return opt === undefined ? 'undefined' : `"${opt}"`;
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
        return 'string';
      case 'boolean':
        return 'boolean';
      case 'radio':
      case 'inline-radio':
      case 'select':
        return argType.options?.map(optToString).join(' | ');
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
          <th>
            <span>Name</span>
          </th>
          <th>
            <span>Description</span>
          </th>
          <th>
            <span>Default</span>
          </th>
        </tr>
      </thead>
      <tbody className="docblock-argstable-body">
        {Object.entries(argTypes).map(([key, argType]) => {
          const typeLabel = getTypeLabel(argType);
          return (
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
                {typeLabel && (
                  <div>
                    <p>
                      <code>{typeLabel}</code>
                    </p>
                  </div>
                )}
              </td>
              <td>
                <span>-</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
