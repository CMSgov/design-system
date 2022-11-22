import React from 'react';
import Table from './Table';
import TableCaption from './TableCaption';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableBody from './TableBody';

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {
    dense: {
      table: {
        disable: true,
      },
    },
  },
};

const tableTemplateData = {
  headings: [
    { displayName: 'Document title', propName: 'documentTitle' },
    { displayName: 'Description', propName: 'description' },
    { displayName: 'Links', propName: 'links' },
    { displayName: 'Year', propName: 'year' },
  ],
  data: [
    {
      documentTitle: 'Declaration of Independence',
      description:
        'Statement adopted by the Continental Congress declaring independence from the British Empire.',
      links: (
        <a href="# ">
          {' '}
          https://billofrightsinstitute.org/founding-documents/declaration-of-independence/
        </a>
      ),
      year: '1776',
    },
    {
      documentTitle: 'Bill of Rights',
      description:
        'The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.',
      links: <a href="# ">https://billofrightsinstitute.org/founding-documents/bill-of-rights/</a>,
      year: '1791',
    },
  ],
};

const multiHeaderTableData = {
  headings: [
    { displayName: 'Name', propName: 'name', bodyComponent: 'th' },
    { displayName: 'Street', propName: 'street' },
    { displayName: 'ZIP code', propName: 'zipcode' },
    { displayName: 'Employer', propName: 'employer' },
    { displayName: 'Industry', propName: 'industry' },
  ],
  data: [
    {
      name: 'John Doe',
      street: '123 Braavos Ave.',
      zipcode: '20005',
      employer: 'Acme Co.',
      industry: 'Healthcare',
    },
    {
      name: 'John Doe',
      street: "456 King's Landing",
      zipcode: '20005',
      employer: 'Acme Co.',
      industry: 'Healthcare',
    },
  ],
};

const Template = (args) => (
  <Table {...args}>
    <TableCaption>Table</TableCaption>
    <TableHead>
      <TableRow>
        {tableTemplateData.headings.map(({ displayName }) => (
          <TableCell key={displayName}>{displayName}</TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {tableTemplateData.data.map((dataItem, index) => (
        <TableRow key={index}>
          {tableTemplateData.headings.map((heading) => (
            <TableCell
              key={`${heading.displayName}-${dataItem[heading.propName]}`}
              stackedTitle={heading.displayName}
            >
              {dataItem[heading.propName]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export const ScrollableTable = Template.bind({});
ScrollableTable.args = {
  scrollable: true,
};

export const StackableTable = Template.bind({});
StackableTable.args = {
  stackable: true,
  stackableBreakpoint: 'md',
};

export const MultiHeaderTable = () => (
  <Table>
    <TableCaption>Household members</TableCaption>
    <col />
    <colgroup span="2" />
    <colgroup span="2" />
    <TableHead>
      <TableRow>
        <TableCell component="td" rowSpan="1" />
        <TableCell component="th" colSpan="2" scope="colgroup">
          Address
        </TableCell>
        <TableCell colSpan="2" scope="colgroup">
          Employment
        </TableCell>
      </TableRow>
      <TableRow>
        {multiHeaderTableData.headings.map(({ displayName }) => (
          <TableCell component="th" scope="col" key={displayName}>
            {displayName}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {multiHeaderTableData.data.map((dataItem, index) => (
        <TableRow key={index}>
          {multiHeaderTableData.headings.map((heading) => (
            <TableCell
              key={`${heading.displayName}-${dataItem[heading.displayName]}`}
              component={heading.bodyComponent || 'td'}
            >
              {dataItem[heading.propName]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </Table>
);
