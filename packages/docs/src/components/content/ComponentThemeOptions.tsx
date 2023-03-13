import React from 'react';
import capitalize from 'lodash/capitalize';
import uniqueId from 'lodash/uniqueId';
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableCaption,
} from '@cmsgov/design-system';
import ColorSwatch from './ColorSwatch';
import { getComponentVariables, getThemeColorName, ThemeName } from '../../helpers/themeTokens';

interface ComponentThemeOptionsProps {
  /**
   * Current theme name
   */
  theme: string;
  /**
   * The name of the component to render the customization table for
   */
  componentname: string;
}

/**
 * Looks up the value found in the component mapping and returns where it maps to along with the specific
 * theme color variable name and swatch for colors.
 */
const lookupThemeValue = (theme: string, value: string): any => {
  const keyName = getThemeColorName(theme as ThemeName, value);
  const elem = keyName ? (
    <span>
      <ColorSwatch colorTokenName={keyName} title={`hex value: ${value}`} />
      <code>--color-{keyName}</code>
    </span>
  ) : (
    <span>
      <code>{value}</code>
    </span>
  );
  return elem;
};

/**
 * Takes a js object with name-value pairs and creates a list of configuration configuration
 * options with values from the token component theme loaded.
 */
const ComponentThemeOptions = ({ theme, componentname }: ComponentThemeOptionsProps) => {
  componentname = componentname.toLowerCase();
  const componentVariables = getComponentVariables(theme as ThemeName, componentname);
  const componentOptions = (
    <Table scrollable stackable borderless>
      <TableCaption className="ds-u-visibility--screen-reader">
        CSS variables for {componentname}{' '}
      </TableCaption>
      <TableHead>
        <TableRow>
          <TableCell component="th" align="left" id="columnthemevalue">
            Variable
          </TableCell>
          <TableCell component="th" align="left" id="columnthemevalue">
            Default {capitalize(theme)} Theme Value
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody role="rowgroup">
        {Object.keys(componentVariables).map((key) => (
          <TableRow role="row" key={uniqueId('config_option_')}>
            <TableCell stackedTitle="Variable" headers="columnvariable">
              <code className="ds-u-font-weight--bold">
                --{componentname}
                {key}
              </code>
            </TableCell>
            <TableCell
              stackedTitle={`Default ${capitalize(theme)} Theme Value`}
              headers="columnthemevalue"
            >
              {lookupThemeValue(theme, componentVariables[key])}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <section className="c-configuration-options ds-u-padding-bottom--3">{componentOptions}</section>
  );
};

export default ComponentThemeOptions;
