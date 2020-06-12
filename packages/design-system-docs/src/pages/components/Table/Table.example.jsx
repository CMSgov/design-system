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
  { title: 'Branch', key: 'branch', type: 'text', width: '20' },
  { title: 'Article', key: 'article', type: 'text', width: '30' },
  { title: 'Responsibility', key: 'responsibility', type: 'text', width: '50' },
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

const tableId = 'tbl-' + Math.random().toString(36).substr(2, 9);

const renderHeader = () => {
  return (
    <TableRow>
      {simpleHeaders.map((header, index) => {
        return (
          <TableHeaderCell
            key={header.key}
            title={header.title}
            type={header.type}
            width={header.width}
            scope="col"
            id={tableId + '_col_' + index}
          />
        );
      })}
    </TableRow>
  );
};

const renderRows = () => {
  return simpleData.map((data, index) => {
    return (
      <TableRow key={uniqueId('row_')}>
        <TableHeaderCell
          scope="row"
          stackedTitle="Branch"
          title={data.branch}
          id={tableId + '_row_' + index}
          headers={tableId + '_col_' + '0'}
        />
        <TableDataCell
          data={data.article}
          stackedTitle="Article"
          headers={(tableId + '_row_' + index, tableId + '_col_' + '1')}
        />
        <TableDataCell
          data={data.responsibility}
          stackedTitle="Responsibility"
          headers={(tableId + '_row_' + index, tableId + '_col_' + '2')}
        />
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
