import React from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell, Badge } from '@cmsgov/design-system';

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
      <TableHead>
        <TableRow>
          <TableCell component="th" key="Name">
            Name
          </TableCell>
          <TableCell component="th" key="Type">
            Type
          </TableCell>
          <TableCell component="th" key="Default">
            Default
          </TableCell>
          <TableCell component="th" key="Description">
            Description
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {props.data.map((dataItem) => (
          <TableRow key={dataItem.id}>
            <TableCell key="name" stackedTitle="Name">
              {dataItem.name && <code className="ds-u-font-weight--bold">{dataItem.name}</code>}
              {dataItem.isRequired && <Badge className="ds-u-margin-left--1">required</Badge>}
            </TableCell>
            <TableCell key="type" stackedTitle="Type">
              {dataItem.type && <code>{dataItem.type}</code>}
            </TableCell>
            <TableCell key="defaultValue" stackedTitle="Default">
              {dataItem.defaultValue && <code>{dataItem.defaultValue}</code>}
            </TableCell>
            <TableCell key="description" stackedTitle="Description">
              <ContentRenderer data={dataItem.description} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PropTable;
