import React from 'react';
import {
  CoreTheme,
  CoreComponentTheme,
  HealthcareTheme,
  HealthcareComponentTheme,
  MedicareTheme,
  MedicareComponentTheme,
} from 'design-system-tokens/src/themes';
import _ from 'lodash';
import uniqueId from 'lodash/uniqueId';

const componentThemes = {
  core: CoreComponentTheme,
  healthcare: HealthcareComponentTheme,
  medicare: MedicareComponentTheme,
};
const masterThemes = { core: CoreTheme, healthcare: HealthcareTheme, medicare: MedicareTheme };

type ThemeNames = 'core' | 'healthcare' | 'medicare';
export interface ComponentThemeOptionsProps {
  /**
   * One of the availabe theme names in lowercase as presented in ThemeNames
   */
  theme: ThemeNames;
  /**
   * The name of the component to render the customization table for
   */
  componentname: string;
}

/**
 * Looks up the value found in the component mapping and returns where it maps to along with the specific
 * theme color variable name and swatch for colors.
 */
const lookupThemeValue = (theme: ThemeNames, value: string): any => {
  const keyName = _.findKey(masterThemes[theme].color, (v) => String(v) === value);
  const elem = keyName ? (
    <span>
      <span
        title={`hex value: ${value}`}
        className={`ds-u-fill--${keyName} c-swatch__preview ds-u-margin-right--1 ds-u-radius--pill `}
      ></span>
      <code>$color-{keyName}</code>
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
 *
 * @TODO: when theming is added, update to useEffect on theme change to get new values
 */
const ComponentThemeOptions = ({ theme, componentname }: ComponentThemeOptionsProps) => {
  componentname = componentname.toLowerCase();
  const currentTheme = componentThemes[theme];
  const componentOptions = (
    <table className="ds-c-table" role="table">
      <thead role="rowgroup">
        <tr role="row">
          <th className="ds-c-table__cell--align-left" role="columnheader" scope="col">
            Variable
          </th>
          <th className="ds-c-table__cell--align-left" role="columnheader" scope="col">
            Default {_.capitalize(theme)} Theme Value
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup">
        {Object.keys(currentTheme[componentname]).map((key) => (
          <tr role="row" key={uniqueId('config_option_')}>
            <td>
              <code className="ds-u-font-weight--bold">
                ${componentname}
                {key}
              </code>
            </td>
            <td>{lookupThemeValue(theme, currentTheme[componentname][key])}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <section className="c-configuration-options ds-u-padding-bottom--3">{componentOptions}</section>
  );
};

export default ComponentThemeOptions;
