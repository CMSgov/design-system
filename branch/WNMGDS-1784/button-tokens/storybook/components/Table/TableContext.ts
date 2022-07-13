import React from 'react';

export interface TableContextType {
  stackable: boolean;
  warningDisabled: boolean;
}

export const TableContext = React.createContext({
  stackable: false,
  warningDisabled: false,
} as TableContextType);

export default TableContext;
