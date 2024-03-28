import Table from './Table';
import TableCaption from './TableCaption';
import TableHead from './TableHead';
import TableRow from './TableRow';
import TableCell from './TableCell';
import TableBody from './TableBody';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table as any,
  subcomponents: {
    TableCaption,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
  },
  parameters: {
    docs: {
      underlyingHtmlElements: ['table'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Table>;

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
        <a href="https://billofrightsinstitute.org/founding-documents/declaration-of-independence/">
          https://billofrightsinstitute.org/founding-documents/declaration-of-independence/
        </a>
      ),
      year: '1776',
    },
    {
      documentTitle: 'Articles of Confederation',
      description: 'This document served as the United Statesʼ first constitution.',
      links: (
        <a href="https://www.archives.gov/milestone-documents/articles-of-confederation">
          https://www.archives.gov/milestone-documents/articles-of-confederation
        </a>
      ),
      year: '1777',
    },
    {
      documentTitle: 'The Constitution',
      description:
        'Replaced the Articles of Confederation with a new form of government. It created a federal system with a national government composed of 3 separated powers, and included both reserved and concurrent powers of states',
      links: (
        <a href="https://billofrightsinstitute.org/primary-sources/constitution">
          https://billofrightsinstitute.org/primary-sources/constitution
        </a>
      ),
      year: '1787',
    },
    {
      documentTitle: 'Bill of Rights',
      description:
        'The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.',
      links: (
        <a href="https://billofrightsinstitute.org/founding-documents/bill-of-rights/">
          https://billofrightsinstitute.org/founding-documents/bill-of-rights/
        </a>
      ),
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

export const Default: Story = {
  render: function Component(args) {
    return (
      <Table {...args}>
        <TableCaption>Founding documents</TableCaption>
        <TableHead>
          <TableRow>
            {tableTemplateData.headings.map(({ displayName, propName }) => (
              <TableCell key={displayName} id={propName}>
                {displayName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableTemplateData.data.map((dataItem) => (
            <TableRow key={dataItem.documentTitle}>
              {tableTemplateData.headings.map((heading) => (
                <TableCell
                  key={`${heading.displayName}-${dataItem[heading.propName]}`}
                  headers={heading.propName}
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
  },
};

export const StackableTable: Story = {
  ...Default,
  args: {
    stackable: true,
    stackableBreakpoint: 'md',
  },
};

export const MultiHeaderTable: Story = {
  render: function Component() {
    return (
      <Table>
        <TableCaption>Household members</TableCaption>
        <col />
        <colgroup span={2} />
        <colgroup span={2} />
        <TableHead>
          <TableRow>
            <TableCell component="td" rowSpan={1} />
            <TableCell component="th" colSpan={2} scope="colgroup">
              Address
            </TableCell>
            <TableCell colSpan={2} scope="colgroup">
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
                  component={heading.bodyComponent || ('td' as any)}
                >
                  {dataItem[heading.propName]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};
