import * as React from 'react';

export interface TableBodyProps {
    /**
     * The table body contents, usually `TableRow`.
     */
    children?: React.ReactNode;
    /**
     * Additional classes to be added to the table body element.
     */
    className?: string;
}

declare const TableBody: React.FC<TableBodyProps>;

export default TableBody;

