import React, { ReactElement } from 'react';
import {
  Badge,
  Button,
  NextIcon,
  Table,
  TableCaption,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@cmsgov/design-system';

interface VariationButtonUsage {
  main?: {
    onLight?: boolean;
    onDark?: boolean;
  };
  alternate?: {
    onLight?: boolean;
    onDark?: boolean;
  };
}

interface ThemeButtonUsage {
  outline?: VariationButtonUsage;
  solid?: VariationButtonUsage;
  ghost?: VariationButtonUsage;
}

const themeButtonUsage: { [theme: string]: ThemeButtonUsage } = {
  healthcare: {
    outline: {
      main: {
        onDark: false,
      },
      alternate: {
        onLight: false,
        onDark: false,
      },
    },
    solid: {
      main: {
        onDark: false,
      },
      alternate: {
        onLight: false,
        onDark: false,
      },
    },
    ghost: {
      main: {
        onDark: false,
      },
      alternate: {
        onLight: false,
        onDark: false,
      },
    },
  },
  medicare: {
    outline: {
      main: {
        onDark: false,
      },
      alternate: {
        onLight: false,
        onDark: false,
      },
    },
    ghost: {
      alternate: {
        onLight: false,
        onDark: false,
      },
    },
  },
};

export interface ButtonVariationsTableProps {
  /**
   * Name of currently selected theme
   */
  theme: string;
}

const ButtonVariationsTable = ({ theme }: ButtonVariationsTableProps) => {
  const uses = themeButtonUsage[theme] ?? {};
  const unused = <Badge variation="alert">Unused</Badge>;
  const noChange = <Badge>No change</Badge>;

  return (
    <>
      <Table stackable stackableBreakpoint="md" className="c-button-migration-table">
        <TableCaption>Mapping old button React code to new</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell scope="col">Looked like</TableCell>
            <TableCell scope="col">Old React</TableCell>
            <TableCell scope="col">New React</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Button>Outline</Button>
            </TableCell>
            <TableCell>
              <code>{'<Button...'}</code>
            </TableCell>
            <TableCell>{noChange}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button variation="solid">Primary</Button>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="primary"...'}</code>
            </TableCell>
            <TableCell>
              <code>{'<Button variation="solid"...'}</code>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table stackable stackableBreakpoint="md" className="c-button-migration-table">
        <TableCaption>Mapping old button HTML to new</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell scope="col">Looked like</TableCell>
            <TableCell scope="col">Old HTML</TableCell>
            <TableCell scope="col">New HTML</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Button>Outline</Button>
            </TableCell>
            <TableCell>
              <code>.ds-c-button</code>
            </TableCell>
            <TableCell>{noChange}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Button variation="solid">Primary</Button>
            </TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--primary"...'}</code>
            </TableCell>
            <TableCell>
              <code>{'<button class="ds-c-button ds-c-button--solid"...'}</code>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default ButtonVariationsTable;
