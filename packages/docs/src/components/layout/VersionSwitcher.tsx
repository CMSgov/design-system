import React, { ChangeEvent } from 'react';
import corePackage from '../../../../design-system/package.json';
import healthcarePackage from '../../../../ds-healthcare-gov/package.json';
import medicarePackage from '../../../../ds-medicare-gov/package.json';
import themes from '../../../../../themes.json';
import versions from '../../../../../versions.json';
import useTheme from '../../helpers/useTheme';
import { Dropdown } from '@cmsgov/design-system';

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
  }
  return { version: '' };
}

/**
 * Theme Switcher
 * The dropdown component to switch the theme of the documentation site
 */
const VersionSwitcher = () => {
  const currentTheme = useTheme();
  const currentVersion = getPackageData(currentTheme).version;
  const themeVersions = versions[themes[currentTheme].packageName];

  function onVersionChange(event: ChangeEvent<HTMLSelectElement>) {
    const version = event.currentTarget.value;
    const versionIndex = themeVersions.indexOf(version);
    const coreVersion = versions['design-system'][versionIndex];

    let path = window.location.pathname;
    if (path.startsWith('/v/')) {
      // Get rid of the old version in the path
      path = path.replace(/^\/v\/.*?\//, '/');
    }

    window.location.pathname = `/v/${coreVersion}${path}`;
  }

  return (
    <Dropdown
      label="Documentation version"
      name="version-switcher"
      className="c-version-switcher"
      options={getVersionOptions(themeVersions)}
      value={currentVersion}
      onChange={onVersionChange}
    />
  );
};

export default VersionSwitcher;
