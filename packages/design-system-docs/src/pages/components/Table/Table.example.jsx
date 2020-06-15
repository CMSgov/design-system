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
  { title: 'Branch', key: 'branch', width: '20' },
  { title: 'Article', key: 'article', width: '30' },
  { title: 'Responsibility', key: 'responsibility', width: '50' },
];

const simpleData = [
  {
    branch: 'Legislative',
    article: 'Article I of the Constitution establishes the legislative branch',
    responsibility:
      'Article I explains that Congress makes laws. Congress (the Senate and the House of Representatives) is the legislative branch of the U.S. government.',
  },
  {
    branch: 'Executive',
    article: 'Article II of the Constitution establishes the executive branch',
    responsibility:
      'The executive branch enforces the laws that Congress passes. The executive branch makes sure all the people follow the laws of the United States. The president is the head of the executive branch.',
  },
  {
    branch: 'Judicial',
    article: 'Article III of the Constitution establishes the judicial branch',
    responsibility:
      'One responsibility of the judicial branch is to decide if government laws and actions follow the Constitution.',
  },
];

const renderHeader = () => {
  return (
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
  );
};

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
  <Table responsiveTable="sm" scrollable striped>
    <TableCaption>System of Government</TableCaption>
    <TableHead>{renderHeader()}</TableHead>
    <TableBody>{renderRows()}</TableBody>
  </Table>,
  document.getElementById('js-example')
);
