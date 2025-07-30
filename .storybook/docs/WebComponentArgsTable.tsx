import { Markdown, useOf } from '@storybook/blocks';
import { Tabs, TabPanel } from '../../packages/design-system/src/components';

function optToCodeBlock(opt: undefined | string) {
  const formattedOpt = opt === undefined ? 'undefined' : `"${opt}"`;
  return <code>{formattedOpt}</code>;
}

function getTypeLabel(argType: any) {
  const controlType = argType.control?.type ?? argType.control;
  const mapping = argType?.mapping;
  if (mapping) {
    return mapping.filter((type) => type).map((type) => <code>{type}</code>);
  }
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
// but by extracting the generateTable function out into a separate function we needed to explicitly define
// that type since it cannot be inferred when the function is defined.
interface ArgType {
  table?: {
    disable?: boolean;
  };
  controlsOnly?: boolean;
  description?: string;
  control?:
    | {
        type?: string;
      }
    | string;
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

  if (subcomponents) {
    return (
      <Tabs>
        <TabPanel key={`${title}`} id={`${title}_id`} tab={title}>
          {generateTable(argTypes as unknown as Record<string, ArgType>)}
        </TabPanel>
        {Object.keys(subcomponents).map((key) => {
          return (
            <TabPanel key={key} id={`${key}`} tab={key}>
              {generateTable(subcomponents[key] as Record<string, ArgType>)}
            </TabPanel>
          );
        })}
      </Tabs>
    );
  }
  return generateTable(argTypes as unknown as Record<string, ArgType>);
};
