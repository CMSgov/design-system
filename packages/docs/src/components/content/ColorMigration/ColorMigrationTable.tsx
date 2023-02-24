import React from 'react';
import ColorExampleRow, { ColorExampleRowProps } from '../ColorExampleRow';

const nullBefore = <div className="ds-u-text-align--center">did not exist</div>;
const nullAfter = <div className="ds-u-text-align--center">removed</div>;

export interface ColorMigrationTableProps {
  colorRows: Array<[ColorExampleRowProps | null, ColorExampleRowProps | null]>;
}

const ColorMigrationTable = ({ colorRows }: ColorMigrationTableProps) => (
  <div className="ds-u-margin-top--2">
    <table className="c-color-migration-table ds-c-table ds-c-table--borderless">
      <thead>
        <tr>
          <th>Before</th>
          <th>After</th>
        </tr>
      </thead>
      <tbody>
        {colorRows.map(([color1, color2], index) => (
          <tr key={index}>
            <td>{color1 ? <ColorExampleRow {...color1} /> : nullBefore}</td>
            <td>{color2 ? <ColorExampleRow {...color2} /> : nullAfter}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ColorMigrationTable;
