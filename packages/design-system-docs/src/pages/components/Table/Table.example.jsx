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
import uniqueId from 'lodash.uniqueid';

const simpleHeaders = [
  { title: 'Branch', key: 'branch' },
  { title: 'Article', key: 'article', width: '20' },
  { title: 'Responsibility', key: 'responsibility' },
  { title: 'Checks and balances', key: 'checks' },
];

const simpleData = [
  {
    branch: 'Legislative',
    article: 'Article I of the Constitution establishes the legislative branch',
    responsibility:
      'Article I explains that Congress makes laws. Congress (the Senate and the House of Representatives) is the legislative branch of the U.S. government.',
    checks:
      "Congress confirms or rejects the president's nominees and can remove the president from office in exceptional circumstances.",
  },
  {
    branch: 'Executive',
    article: 'Article II of the Constitution establishes the executive branch',
    responsibility:
      'The executive branch enforces the laws that Congress passes. The executive branch makes sure all the people follow the laws of the United States. The president is the head of the executive branch.',
    checks:
      'The president can veto legislation created by Congress and nominates heads of federal agencies.',
  },
  {
    branch: 'Judicial',
    article: 'Article III of the Constitution establishes the judicial branch',
    responsibility:
      'One responsibility of the judicial branch is to decide if government laws and actions follow the Constitution.',
    checks:
      'The Justices of the Supreme Court, who can overturn unconstitutional laws, are nominated by the president and confirmed by the Senate.',
  },
];

const renderRows = () => {
  return simpleData.map((row, rowIndex) => {
    return (
      <TableRow key={uniqueId('row_')}>
        {simpleHeaders.map((header, columnIndex) => {
          if (columnIndex === 0) {
            return (
              <TableHeaderCell
                key={header.key}
                scope="row"
                id={'row' + rowIndex}
                stackedTitle={header.title}
                headers={'column' + header.key}
              >
                {row[header.key]}
              </TableHeaderCell>
            );
          } else {
            return (
              <TableDataCell
                key={header.key}
                stackedTitle={header.title}
                headers={('row' + rowIndex, 'column' + header.key)}
              >
                {row[header.key]}
              </TableDataCell>
            );
          }
        })}
      </TableRow>
    );
  });
};

ReactDOM.render(
  <Table stackBreakpoint="sm" scrollable striped>
    <TableCaption>System of Government</TableCaption>
    <TableHead>
      <TableRow>
        {simpleHeaders.map((header) => {
          return (
            <TableHeaderCell
              key={header.key}
              width={header.width}
              scope="col"
              id={'column' + header.key}
            >
              {header.title}
            </TableHeaderCell>
          );
        })}
      </TableRow>
    </TableHead>
    <TableBody>{renderRows()}</TableBody>
  </Table>,
  document.getElementById('js-example')
);
