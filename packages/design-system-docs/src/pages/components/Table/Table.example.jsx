import {
  Table,
  TableBody,
  TableCaption,
  TableDataCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Table stackBreakpoint="sm" scrollable>
    <TableCaption>Responsive Table</TableCaption>
    <TableHead>
      <TableRow>
        <TableHeaderCell id={'column' + 1} scope="col">
          Document title
        </TableHeaderCell>
        <TableHeaderCell id={'column' + 2} scope="col">
          Description
        </TableHeaderCell>
        <TableHeaderCell id={'column' + 3} scope="col">
          Year
        </TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableDataCell scope="row" stackedTitle="Document title" headers={'column' + 1}>
          Declaration of Independence
        </TableDataCell>
        <TableDataCell scope="row" stackedTitle="Description" headers={'column' + 2}>
          Statement adopted by the Continental Congress declaring independence from the British
          Empire.
        </TableDataCell>
        <TableDataCell scope="row" stackedTitle="Year" headers={'column' + 3}>
          1776
        </TableDataCell>
      </TableRow>
      <TableRow>
        <TableDataCell scope="row" stackedTitle="Document title" headers={'column' + 1}>
          Bill of Rights
        </TableDataCell>
        <TableDataCell scope="row" stackedTitle="Description" headers={'column' + 2}>
          The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.
        </TableDataCell>
        <TableDataCell scope="row" stackedTitle="Year" headers={'column' + 3}>
          1791
        </TableDataCell>
      </TableRow>
    </TableBody>
  </Table>,
  document.getElementById('js-example')
);
