import { Markdown, useOf } from '@storybook/blocks';
import { useState } from 'react';

function optToCodeBlock(opt: undefined | string) {
  const formattedOpt = opt === undefined ? 'undefined' : `"${opt}"`;
  return <code>{formattedOpt}</code>;
}

function getTypeLabel(argType: any) {
  const controlType = argType.control?.type;
  if (controlType) {
    switch (controlType) {
      case 'text':
      case 'number':
        return <code>string</code>;
      case 'boolean':
        return (
          <>
            <code>"true"</code>
            <code>"false"</code>
          </>
        );
      case 'radio':
      case 'inline-radio':
      case 'select':
        return argType.options?.map(optToCodeBlock);
      case 'object':
        return 'See description';
    }
  }
}

// This interface was previously inferred by Typescript when the argTypes variable was assigned,
// but by extracting the generateTable function out into a separate function we needed to expliclty define
// that type since it cannot be inferred when the function is defined.
interface ArgType {
  table?: {
    disable?: boolean;
  };
  controlsOnly?: boolean;
  description?: string;
  control?: {
    type?: string;
  };
  options?: string[];
}

function generateTable(args: Record<string, ArgType>): React.ReactElement {
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
            <span>Accepted values</span>
          </th>
        </tr>
      </thead>
      <tbody className="docblock-argstable-body">
        {Object.entries(args)
          .filter(([_key, argType]) => !argType.table?.disable && !argType.controlsOnly)
          .map(([key, argType]) => (
            <tr>
              <td>
                <strong>{key}</strong>
              </td>
              <td>
                {argType.description && (
                  <div style={{ marginBottom: '4px' }}>
                    <p>
                      <Markdown>{argType.description}</Markdown>
                    </p>
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
}

/**
 * A table documenting a web component's supported attributes
 */
export const WebComponentArgsTable = ({ of }) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta']);
  const argTypes = resolvedOf.type === 'story' ? resolvedOf.story.argTypes : {};
  const subcomponents = resolvedOf.type === 'story' ? resolvedOf.story.subcomponents : undefined;
  const title = resolvedOf.type === 'story' ? resolvedOf.story.title.split('/')[1] : '';
  const [currentTab, setCurrentTab] = useState(title);

  const handleTabClick = (tab) => {
    setCurrentTab(tab);
  };

  if (subcomponents) {
    return (
      <>
        <div className="sb-tab-container">
          <div role="tablist" style={{ whiteSpace: 'normal' }}>
            <button
              onClick={() => handleTabClick(title)}
              type="button"
              role="tab"
              className={currentTab === title ? 'sb-tabbutton sb-tabbutton__active' : 'tabbutton'}
            >
              {title}
            </button>
            {Object.keys(subcomponents).map((key) => {
              return (
                <button
                  onClick={() => handleTabClick(key)}
                  type="button"
                  role="tab"
                  className={currentTab === key ? 'sb-tabbutton sb-tabbutton__active' : 'tabbutton'}
                >
                  {key}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          {currentTab === title && <div>{generateTable(argTypes)}</div>}
          {Object.keys(subcomponents).map((key) => {
            return (
              currentTab === key && (
                <div key={key}>{generateTable(subcomponents[key] as Record<string, ArgType>)}</div>
              )
            );
          })}
        </div>
      </>
    );
  }
  return generateTable(argTypes);
};
