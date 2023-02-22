import React from 'react';
import ColorExampleRow, { ColorExampleRowProps } from '../ColorExampleRow';

const none = null;

export interface ColorMigrationTableProps {
  colorRows: Array<[ColorExampleRowProps | null, ColorExampleRowProps | null]>;
}

const ColorMigrationTable = ({ colorRows }: ColorMigrationTableProps) => (
  <div className="ds-u-measure--wide ds-u-margin-top--2">
    <table className="c-compare-colors-table">
      <thead>
        <tr>
          <th className="ds-u-visibility--screen-reader">Before</th>
          <th className="ds-u-visibility--screen-reader">After</th>
        </tr>
      </thead>
      <tbody>
        {colorRows.map(([color1, color2], index) => (
          <tr key={index}>
            <td>{color1 ? <ColorExampleRow {...color1} /> : none}</td>
            <td>{color2 ? <ColorExampleRow {...color2} /> : none}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ColorMigrationTable;
