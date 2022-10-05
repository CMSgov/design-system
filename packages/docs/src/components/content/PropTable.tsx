import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableCaption,
  Badge,
} from '@cmsgov/design-system';
import { graphql, useStaticQuery } from 'gatsby';
import ContentRenderer from './ContentRenderer';
import { ComponentPropQuery, PropQuery } from '../../helpers/graphQLTypes';

export interface PropTableDataItem {
  name: string;
  type?: string;
  defaultValue?: string;
  description?: string;
  isRequired?: boolean;
  id: string;
}

interface PropTableProps {
  componentName: string;
}

/**
 * A component to display a Design System component's prop table
 * It loads all props for all components and then finds the appropriate props for the passed in `componentName`
 */
const PropTable = ({ componentName }: PropTableProps, theme: string) => {
  // load all props for all components
  const allPropData: ComponentPropQuery = useStaticQuery(graphql`
    query loadComponentPropsQuery {
      allComponentMetadata(filter: { displayName: { ne: "Template" } }) {
        edges {
          node {
            id
            displayName
            props {
              defaultValue {
                value
              }
              description {
                childMdx {
                  body
                }
                text
              }
              id
              name
              required
              tsType
            }
          }
        }
      }
    }
  `);

  // get the props for the specified components
  const propsForComponent = allPropData.allComponentMetadata.edges?.find(
    ({ node }) => node.displayName === componentName
  );

  // moving from the deeply nested graphql structure to something flatter
  const transformedData: PropTableDataItem[] = propsForComponent?.node.props.reduce(
    (acc, prop: PropQuery) => {
      // if prop description includes '@hide-prop`, don't show it in props table
      const hideProp = prop.description.text.match(/@hide-prop/i);
      if (!hideProp) {
        const newProp = {
          name: prop.name,
          type: prop.tsType?.raw || prop.tsType?.name,
          defaultValue: prop.defaultValue?.value,
          description: prop.description?.childMdx?.body,
          isRequired: prop.required,
          id: prop.id,
        };
        return [...acc, newProp];
      }
      return acc;
    },
    []
  );

  return (
    <Table className="c-prop-table" stackable scrollable borderless>
      <TableCaption>
        <span className="ds-u-visibility--screen-reader">React Properties Documentation</span>
      </TableCaption>
      <TableHead>
        <TableRow>
          <TableCell component="th" id="columnname">
            Name
          </TableCell>
          <TableCell component="th" id="columntype">
            Type
          </TableCell>
          <TableCell component="th" id="columndefault">
            Default
          </TableCell>
          <TableCell component="th" id="columndescription">
            Description
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transformedData.map((dataItem) => (
          <TableRow key={dataItem.id}>
            <TableCell headers="columnname" stackedTitle="Name">
              {dataItem.name && <code className="ds-u-font-weight--bold">{dataItem.name}</code>}
              {dataItem.isRequired && <Badge className="ds-u-margin-left--1">required</Badge>}
            </TableCell>
            <TableCell headers="columntype" stackedTitle="Type">
              {dataItem.type && <code>{dataItem.type}</code>}
            </TableCell>
            <TableCell headers="columndefault" stackedTitle="Default">
              {dataItem.defaultValue && <code>{dataItem.defaultValue}</code>}
            </TableCell>
            <TableCell headers="columndescription" stackedTitle="Description">
              <ContentRenderer data={dataItem.description} theme={theme} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PropTable;
