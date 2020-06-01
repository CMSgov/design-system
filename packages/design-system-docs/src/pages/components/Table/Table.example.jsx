import { Table, TableWrapper } from '@cmsgov/design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const simpleHeaders = [
  { title: 'Branch', key: 'branch' },
  { title: 'Article', key: 'article' },
  { title: 'Responsibility', key: 'responsibility' },
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

ReactDOM.render(
  <TableWrapper>
    <Table
      caption="System of Government"
      headers={simpleHeaders}
      data={simpleData}
      striped
      stacked="md"
      firstCellIsHeader
    />
  </TableWrapper>,
  document.getElementById('js-example')
);
