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

export interface PropTableDataItem {
  name: string;
  type?: string;
  defaultValue?: string;
  description?: string;
  isRequired?: boolean;
  id: string;
}

interface PropTableProps {
  data: PropTableDataItem[];
}

/**
 * A component to display a Design System component's prop table
 */
const PropTable = (props: PropTableProps) => {
  return (
    <Table className="c-prop-table" stackable scrollable compact>
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
        {props.data.map((dataItem) => (
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
              <ContentRenderer data={dataItem.description} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PropTable;
