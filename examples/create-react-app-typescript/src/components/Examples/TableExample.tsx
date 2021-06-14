import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from '@cmsgov/design-system';
import React from 'react';

function TableExample(): React.ReactElement {
  return (
    <div>
      <h2>Table Example</h2>
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
    </div>
  );
}

export default TableExample;
