import React from 'react';
import corePackage from '../../../../design-system/package.json';
import healthcarePackage from '../../../../ds-healthcare-gov/package.json';
import medicarePackage from '../../../../ds-medicare-gov/package.json';
import cmsgovPackage from '../../../../ds-cms-gov/package.json';
import themes from '../../../../../themes.json';
import versions from '../../../../../versions.json';
import useTheme from '../../helpers/useTheme';
import { setQueryParam } from '../../helpers/urlUtils';

const themeOptions = Object.keys(themes).map((key) => ({
  label: themes[key].displayName,
  value: key,
}));

function getVersionOptions(versions: string[]) {
  return versions.map((version) => ({
    label: version,
    value: version,
  }));
}

function getPackageData(theme: string) {
  switch (theme) {
    case 'core':
      return corePackage;
    case 'healthcare':
      return healthcarePackage;
    case 'medicare':
      return medicarePackage;
    case 'cmsgov':
      return cmsgovPackage;
  }
  return { version: '' };
}

export const ThemeVersionSwitcher = () => {
  const currentTheme = useTheme();
  const currentVersion = getPackageData(currentTheme).version;
  const themeVersions = versions[themes[currentTheme].packageName];

  const onUpdate = (theme: string, version: string) => {
    if (theme !== currentTheme) {
      // set the query param and reload the page for re-render
      setQueryParam('theme', theme, true);
    }
  };
};
