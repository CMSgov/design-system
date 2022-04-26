import React from 'react';
import { Table, TableHead, TableRow, TableBody, TableCell } from '@cmsgov/design-system';

const headings = [
  { displayName: 'Name', propName: 'name', cellClassName: 'ds-u-font-weight--bold' },
  { displayName: 'Type', propName: 'type' },
  { displayName: 'Default', propName: 'defaultValue' },
  { displayName: 'Description', propName: 'description', cellElement: 'p' },
];

const mockData = [
  {
    name: 'bordered',
    type: 'boolean',
    defaultValue: null,
    description: 'Applies a border to the accordion content.',
  },
  {
    name: 'className',
    type: 'string',
    defaultValue: 'css-class',
    description: 'Class to be applied to the outer <div> that contains all accordion items.',
  },
];

/**
 * A component to display a Design System component's prop table
 */
const PropTable = () => {
  // most cells use <code>, but not all
  const renderCell = (heading, data) => {
    const dataToDisplay = data[heading.propName];
    if (dataToDisplay) {
      const Element = heading.cellElement || 'code';
      const className = heading.cellClassName;
      return <Element className={className}>{dataToDisplay}</Element>;
    }

    return <></>;
  };

  return (
    <Table stackable stackableBreakpoint="md" className="c-prop-table">
      <TableHead>
        <TableRow>
          {headings.map(({ displayName }) => (
            <TableCell component="th" key={displayName}>
              {displayName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {mockData.map((dataItem, index) => (
          <TableRow key={index}>
            {headings.map((heading) => (
              <TableCell
                key={`${heading.displayName}-${dataItem[heading.propName]}`}
                stackedTitle={heading.displayName}
              >
                {renderCell(heading, dataItem)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PropTable;
