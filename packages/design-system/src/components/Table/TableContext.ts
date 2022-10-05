import { createContext } from 'react';

export interface TableContextType {
  stackable: boolean;
  warningDisabled: boolean;
}

export const TableContext = createContext({
  stackable: false,
  warningDisabled: false,
} as TableContextType);

export default TableContext;
