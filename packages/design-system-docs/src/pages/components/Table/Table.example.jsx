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
  <>
    <Table scrollable stackable stackableBreakpoint="sm">
      <TableCaption>Responsive scrollable table</TableCaption>
      <TableHead>
        <TableRow>
          <TableCell id="col_1">Document title</TableCell>
          <TableCell id="col_2">Description</TableCell>
          <TableCell id="col_3">Links</TableCell>
          <TableCell id="col_4">Year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell stackedTitle="Document title" headers="col_1">
            Declaration of Independence
          </TableCell>
          <TableCell stackedTitle="Description" headers="col_2">
            Statement adopted by the Continental Congress declaring independence from the British
            Empire.
          </TableCell>
          <TableCell stackedTitle="Link" headers="col_3">
            <a href="# ">
              https://billofrightsinstitute.org/founding-documents/declaration-of-independence/
            </a>
          </TableCell>
          <TableCell stackedTitle="Year" headers="col_4">
            1776
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell stackedTitle="Document title" headers="col_1">
            Bill of Rights
          </TableCell>
          <TableCell stackedTitle="Description" headers="col_2">
            The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.
          </TableCell>
          <TableCell stackedTitle="Link" headers="col_3">
            <a href="# ">https://billofrightsinstitute.org/founding-documents/bill-of-rights/</a>
          </TableCell>
          <TableCell stackedTitle="Year" headers="col_4">
            1791
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Table className="ds-u-margin-top--2" stackable stackableBreakpoint="md">
      <TableCaption>Responsive stackable table</TableCaption>
      <TableHead>
        <TableRow>
          <TableCell id="column_1">Document title</TableCell>
          <TableCell id="column_2">Description</TableCell>
          <TableCell id="column_3">Year</TableCell>
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
          <TableCell stackedTitle="Year" headers="column_3">
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
          <TableCell stackedTitle="Year" headers="column_3">
            1791
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell stackedTitle="Document title" headers="column_1">
            Declaration of Sentiments
          </TableCell>
          <TableCell stackedTitle="Description" headers="column_2">
            A document written during the Seneca Falls Convention outlining the rights that American
            women should be entitled to as citizens.
          </TableCell>
          <TableCell stackedTitle="Year" headers="column_3">
            1848
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell stackedTitle="Document title" headers="column_1">
            Emancipation Proclamation
          </TableCell>
          <TableCell stackedTitle="Description" headers="column_2">
            An executive order granting freedom to slaves in designated southern states.{' '}
          </TableCell>
          <TableCell stackedTitle="Year" headers="column_3">
            1863
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </>,
  document.getElementById('js-example')
);
