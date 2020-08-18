import * as React from 'react';

export interface TableRowProps {
    /**
     * The table row contents, usually `TableDataCell` and `TableHeaderCell`.
     */
    children: React.ReactNode;
    /**
     * Additional classes to be added to the table row element.
     */
    className?: string;
}

declare const TableRow: React.FC<TableRowProps>;

export default TableRow;

