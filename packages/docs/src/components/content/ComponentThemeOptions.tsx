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
import { getComponentVariables, ThemeName } from '../../helpers/themeTokens';
import { isProduction } from '../../helpers/urlUtils';

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
        {componentVariables.map((variableInfo) => (
          <TableRow role="row" key={uniqueId('config_option_')}>
            <TableCell stackedTitle="Variable" headers="columnvariable">
              <code className="ds-u-font-weight--bold">{variableInfo.variableName}</code>
            </TableCell>
            <TableCell
              stackedTitle={`Default ${capitalize(theme)} Theme Value`}
              headers="columnthemevalue"
            >
              <span>
                {variableInfo.resolvedToken.$type === 'color' && (
                  <ColorSwatch
                    fill={variableInfo.resolvedValue}
                    title={`hex value: ${variableInfo.resolvedValue}`}
                  />
                )}
                <code>{variableInfo.value}</code>
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  if ((!componentVariables || componentVariables.length == 0) && !isProduction()) {
    console.error(
      'You are trying to render componentVariables inside of a call to ComponentThemeOptions. The componentVariables array is either undefined or empty. This will prevent the table from rendering.'
    );
  }

  return (
    componentVariables.length > 0 && (
      <section className="c-configuration-options ds-u-padding-bottom--3">
        {componentOptions}
      </section>
    )
  );
};

export default ComponentThemeOptions;
