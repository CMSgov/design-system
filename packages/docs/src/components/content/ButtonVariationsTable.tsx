import React, { ReactElement } from 'react';
import {
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
  const unused = '(Unused)';

  function b(buttonInstance: ReactElement, isUsed?: boolean) {
    return isUsed === false ? unused : buttonInstance;
  }

  return (
    <>
      <Table stackable stackableBreakpoint="md" className="c-button-variations-table">
        <TableCaption>Button variations on light background</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell scope="col" id="header-variation">
              Variation
            </TableCell>
            <TableCell scope="col" id="header-main" className="ds-u-font-weight--normal">
              Main <small>(Default)</small>
            </TableCell>
            <TableCell scope="col" id="header-alt" className="ds-u-font-weight--normal">
              Alternate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" headers="header-variation" stackedTitle="Variation">
              Outline <small>(Default)</small>
            </TableCell>
            <TableCell headers="header-main" stackedTitle="Main (Default)">
              {b(<Button>Outline</Button>, uses?.outline?.main?.onLight)}
            </TableCell>
            <TableCell headers="header-alt" stackedTitle="Alternate">
              {b(<Button isAlternate>Outline alternate</Button>, uses?.outline?.alternate?.onLight)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" headers="header-variation" stackedTitle="Variation">
              Solid
            </TableCell>
            <TableCell headers="header-main" stackedTitle="Main (Default)">
              {b(<Button variation="solid">Solid</Button>, uses?.solid?.main?.onLight)}
            </TableCell>
            <TableCell headers="header-alt" stackedTitle="Alternate">
              {b(
                <Button variation="solid" isAlternate>
                  Solid alternate
                </Button>,
                uses?.solid?.alternate?.onLight
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" headers="header-variation" stackedTitle="Variation">
              Ghost
            </TableCell>
            <TableCell headers="header-main" stackedTitle="Main (Default)">
              {b(<Button variation="ghost">Ghost</Button>, uses?.ghost?.main?.onLight)}
            </TableCell>
            <TableCell headers="header-alt" stackedTitle="Alternate">
              {b(
                <Button variation="ghost" isAlternate>
                  Ghost alternate
                </Button>,
                uses?.ghost?.alternate?.onLight
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table stackable stackableBreakpoint="md" className="c-button-variations-table">
        <TableCaption>Button variations on dark background</TableCaption>
        <TableHead>
          <TableRow>
            <TableCell scope="col" id="header-variation-dark">
              Variation
            </TableCell>
            <TableCell scope="col" id="header-main-dark" className="ds-u-font-weight--normal">
              Main <small>(Default)</small>
            </TableCell>
            <TableCell scope="col" id="header-alt-dark" className="ds-u-font-weight--normal">
              Alternate
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" headers="header-variation-dark" stackedTitle="Variation">
              Outline <small>(Default)</small>
            </TableCell>
            <TableCell
              headers="header-main-dark"
              stackedTitle="Main (Default)"
              className="ds-base--inverse"
            >
              {b(
                <Button onDark>
                  Outline <span className="ds-u-visibility--screen-reader">on dark</span>
                </Button>,
                uses?.outline?.main?.onDark
              )}
            </TableCell>
            <TableCell
              headers="header-alt-dark"
              stackedTitle="Alternate"
              className="ds-base--inverse"
            >
              {b(
                <Button isAlternate onDark>
                  Outline alternate <span className="ds-u-visibility--screen-reader">on dark</span>
                </Button>,
                uses?.outline?.alternate?.onDark
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" headers="header-variation-dark" stackedTitle="Variation">
              Solid
            </TableCell>
            <TableCell
              headers="header-main-dark"
              stackedTitle="Main (Default)"
              className="ds-base--inverse"
            >
              {b(
                <Button variation="solid" onDark>
                  Solid <span className="ds-u-visibility--screen-reader">on dark</span>
                </Button>,
                uses?.solid?.main?.onDark
              )}
            </TableCell>
            <TableCell
              headers="header-alt-dark"
              stackedTitle="Alternate"
              className="ds-base--inverse"
            >
              {b(
                <Button variation="solid" isAlternate onDark>
                  Solid alternate <span className="ds-u-visibility--screen-reader">on dark</span>
                </Button>,
                uses?.solid?.alternate?.onDark
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" headers="header-variation-dark" stackedTitle="Variation">
              Ghost
            </TableCell>
            <TableCell
              headers="header-main-dark"
              stackedTitle="Main (Default)"
              className="ds-base--inverse"
            >
              {b(
                <Button variation="ghost" onDark>
                  Ghost <span className="ds-u-visibility--screen-reader">on dark</span>
                </Button>,
                uses?.ghost?.main?.onDark
              )}
            </TableCell>
            <TableCell
              headers="header-alt-dark"
              stackedTitle="Alternate"
              className="ds-base--inverse"
            >
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
    </>
  );
};

export default ButtonVariationsTable;
