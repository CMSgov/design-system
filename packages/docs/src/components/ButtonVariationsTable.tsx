import React, { ReactElement } from 'react';
import {
  Badge,
  Button,
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

  function b(buttonInstance: ReactElement, isUsed?: boolean) {
    return isUsed === false ? unused : buttonInstance;
  }

  return (
    <Table
      stackable
      stackableBreakpoint="md"
      className="c-button-variations-table ds-u-margin-bottom--2"
    >
      <TableCaption>Table of button variations</TableCaption>
      <TableHead>
        <TableRow>
          <col />
          <TableCell scope="col">Default</TableCell>
          <TableCell scope="col">Alternate</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell rowSpan={3} component="th">
            On light
          </TableCell>
          <TableCell>{b(<Button>Default</Button>, uses?.outline?.main?.onLight)}</TableCell>
          <TableCell>
            {b(<Button isAlternate>Alternate</Button>, uses?.outline?.alternate?.onLight)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            {b(<Button variation="solid">Solid</Button>, uses?.solid?.main?.onLight)}
          </TableCell>
          <TableCell>
            {b(
              <Button variation="solid" isAlternate>
                Solid alternate
              </Button>,
              uses?.solid?.alternate?.onLight
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            {b(<Button variation="ghost">Ghost</Button>, uses?.ghost?.main?.onLight)}
          </TableCell>
          <TableCell>
            {b(
              <Button variation="ghost" isAlternate>
                Ghost alternate
              </Button>,
              uses?.ghost?.alternate?.onLight
            )}
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell rowSpan={3} component="th">
            On dark
          </TableCell>
          <TableCell className="ds-base--inverse">
            {b(
              <Button onDark>
                Default <span className="ds-u-visibility--screen-reader">on dark</span>
              </Button>,
              uses?.outline?.main?.onDark
            )}
          </TableCell>
          <TableCell className="ds-base--inverse">
            {b(
              <Button isAlternate onDark>
                Alternate <span className="ds-u-visibility--screen-reader">on dark</span>
              </Button>,
              uses?.outline?.alternate?.onDark
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="ds-base--inverse">
            {b(
              <Button variation="solid" onDark>
                Solid <span className="ds-u-visibility--screen-reader">on dark</span>
              </Button>,
              uses?.solid?.main?.onDark
            )}
          </TableCell>
          <TableCell className="ds-base--inverse">
            {b(
              <Button variation="solid" isAlternate onDark>
                Solid alternate <span className="ds-u-visibility--screen-reader">on dark</span>
              </Button>,
              uses?.solid?.alternate?.onDark
            )}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="ds-base--inverse">
            {b(
              <Button variation="ghost" onDark>
                Ghost <span className="ds-u-visibility--screen-reader">on dark</span>
              </Button>,
              uses?.ghost?.main?.onDark
            )}
          </TableCell>
          <TableCell className="ds-base--inverse">
            {b(
              <Button variation="ghost" isAlternate onDark>
                Ghost alternate <span className="ds-u-visibility--screen-reader">on dark</span>
              </Button>,
              uses?.ghost?.alternate?.onDark
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ButtonVariationsTable;
