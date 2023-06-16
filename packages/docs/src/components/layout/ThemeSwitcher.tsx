import React from 'react';
import themes from '../../../../../themes.json';
import useTheme from '../../helpers/useTheme';
import { Dropdown } from '@cmsgov/design-system';
import { setQueryParam } from '../../helpers/urlUtils';

const themeOptions = Object.keys(themes).map((key) => ({
  label: themes[key].displayName,
  value: key,
}));

/**
 * Theme Switcher
 * The dropdown component to switch the theme of the documentation site
 */
const ThemeSwitcher = () => {
  const currentTheme = useTheme();

  const onThemeChange = (e) => {
    // set the query param and reload the page for re-render
    setQueryParam('theme', e.target.value, true);
  };

  return (
    <Dropdown
      label="Selected theme"
      name="theme-switcher"
      className="c-theme-switcher"
      labelClassName="ds-u-margin-top--0"
      options={themeOptions}
      value={currentTheme}
      onChange={onThemeChange}
      inversed={true}
    />
  );
};

export default ThemeSwitcher;
