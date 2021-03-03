import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <Table scrollable>
      <TableCaption>Responsive scrollable table</TableCaption>
      <TableHead>
        <TableRow>
          <TableCell>Document title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Links</TableCell>
          <TableCell>Year</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Declaration of Independence</TableCell>
          <TableCell>
            Statement adopted by the Continental Congress declaring independence from the British
            Empire.
          </TableCell>
          <TableCell>
            <a href="# ">
              https://billofrightsinstitute.org/founding-documents/declaration-of-independence/
            </a>
          </TableCell>
          <TableCell>1776</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bill of Rights</TableCell>
          <TableCell>
            The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.
          </TableCell>
          <TableCell>
            <a href="# ">https://billofrightsinstitute.org/founding-documents/bill-of-rights/</a>
          </TableCell>
          <TableCell>1791</TableCell>
        </TableRow>
      </TableBody>
    </Table>
    {/* Firefox and NVDA seem to be buggy with how it currently handles responsive stacked tables, 
    at least compared to other browser/screen reader combos. Even though Table navigation is wonky, 
    you can still move through the content with the arrow keys normally.
    Refer to this link for more context: https://github.com/CMSgov/design-system/pull/935#issuecomment-778341817
    */}
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
            An executive order granting freedom to slaves in designated southern states.
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
