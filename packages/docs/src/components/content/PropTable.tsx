import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableCaption,
  Badge,
} from '@cmsgov/design-system';
import propData from '../../../data/propData.json';

interface PropTableProps {
  children: React.ReactNode;
  componentName: string;
  subset?: string[];
  /**
   * Name of currently selected theme
   */
  theme: string;
}

/**
 * A component to display a Design System component's prop table
 * It loads all props for all components and then finds the appropriate props for the passed in `componentName`
 */
const PropTable = ({ children, componentName, subset }: PropTableProps) => {
  // get the props for the specified components
  let componentPropData = propData[componentName].filter(
    (prop) => !prop.description?.includes('@hide-prop')
  );

  if (subset) {
    componentPropData = componentPropData.filter((prop) => subset.includes(prop.name));
  }

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
        {componentPropData
          .filter((prop) => !prop.description?.includes('@hide-prop'))
          .map((prop) => (
            <TableRow key={prop.name}>
              <TableCell headers="columnname" stackedTitle="Name">
                {prop.name && <code className="ds-u-font-weight--bold">{prop.name}</code>}
                {prop.required && <Badge className="ds-u-margin-left--1">required</Badge>}
              </TableCell>
              <TableCell headers="columntype" stackedTitle="Type">
                {prop.type && <code>{prop.type}</code>}
              </TableCell>
              <TableCell headers="columndefault" stackedTitle="Default">
                {prop.defaultValue && <code>{prop.defaultValue}</code>}
              </TableCell>
              <TableCell headers="columndescription" stackedTitle="Description">
                {prop.description && (
                  <span dangerouslySetInnerHTML={{ __html: prop.description }} />
                )}
              </TableCell>
            </TableRow>
          ))}
        {children}
      </TableBody>
    </Table>
  );
};

export default PropTable;
