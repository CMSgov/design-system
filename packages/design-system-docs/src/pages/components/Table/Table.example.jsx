import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Table stackBreakpoint="sm" scrollable>
    <TableCaption>Responsive Table</TableCaption>
    <TableHead>
      <TableRow>
        <TableCell id="column_1">Document title</TableCell>
        <TableCell id="column_2">Description</TableCell>
        <TableCell id="column_3">Links</TableCell>
        <TableCell id="column_4">Year</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      <TableRow>
        <TableCell stackedTitle="Document title" headers="column_1">
          Declaration of Independence
        </TableCell>
        <TableCell stackedTitle="Description" headers="column_2">
          Statement adopted by the Continental Congress declaring independence from the British
          Empire.
        </TableCell>
        <TableCell stackedTitle="Links" headers="column_3">
          <em>
            <a href="# ">
              https://billofrightsinstitute.org/founding-documents/declaration-of-independence/
            </a>
          </em>
        </TableCell>
        <TableCell stackedTitle="Year" headers="column_4">
          1776
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell stackedTitle="Document title" headers="column_1">
          Bill of Rights
        </TableCell>
        <TableCell stackedTitle="Description" headers="column_2">
          The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.
        </TableCell>
        <TableCell stackedTitle="Links" headers="column_3">
          <em>
            <a href="# ">https://billofrightsinstitute.org/founding-documents/bill-of-rights/</a>
          </em>
        </TableCell>
        <TableCell stackedTitle="Year" headers="column_4">
          1791
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>,
  document.getElementById('js-example')
);
