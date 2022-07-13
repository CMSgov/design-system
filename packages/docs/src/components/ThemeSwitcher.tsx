import React from 'react';
import { Dropdown } from '@cmsgov/design-system';
import { getTheme } from '../helpers/themeUtils';
import { setQueryParam } from '../helpers/urlUtils';

const themeOptions = [
  { label: 'Core', value: 'core' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Medicare', value: 'medicare' },
];
/**
 * Theme Switcher
 * The dropdown component to switch the theme of the documentation site
 */
const ThemeSwitcher = () => {
  const onThemeChange = (e) => {
    // set the query param and reload the page for re-render
    setQueryParam('theme', e.target.value, true);
  };

  return (
    <Dropdown
      label="Selected theme"
      name="theme-switcher"
      options={themeOptions}
      className="c-theme-switcher"
      value={getTheme()}
      onChange={onThemeChange}
    />
  );
};

export default ThemeSwitcher;
