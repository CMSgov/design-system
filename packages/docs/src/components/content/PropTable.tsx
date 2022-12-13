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
import ContentRenderer from './ContentRenderer';
import corePropData from '../../../data/props-design-system.json';
import healthcarePropData from '../../../data/props-ds-healthcare-gov.json';
import medicarePropData from '../../../data/props-ds-medicare-gov.json';

interface PropTableProps {
  children: React.ReactNode;
  componentName: string;
  /**
   * Name of currently selected theme
   */
  theme: string;
}

/**
 * A component to display a Design System component's prop table
 * It loads all props for all components and then finds the appropriate props for the passed in `componentName`
 */
const PropTable = ({ children, componentName, theme }: PropTableProps) => {
  // get the props for the specified components
  const componentPropData =
    corePropData[componentName] ??
    healthcarePropData[componentName] ??
    medicarePropData[componentName];

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
        {componentPropData.map((prop) => (
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
              {prop.description && <span dangerouslySetInnerHTML={{ __html: prop.description }} />}
            </TableCell>
          </TableRow>
        ))}
        {children}
      </TableBody>
    </Table>
  );
};

export default PropTable;
