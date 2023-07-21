import React, { useState } from 'react';
import corePackage from '../../../../design-system/package.json';
import healthcarePackage from '../../../../ds-healthcare-gov/package.json';
import medicarePackage from '../../../../ds-medicare-gov/package.json';
import cmsgovPackage from '../../../../ds-cms-gov/package.json';
import themes from '../../../../../themes.json';
import versions from '../../../../../versions.json';
import useTheme from '../../helpers/useTheme';
import { Button, Dropdown } from '@cmsgov/design-system';
import { FilterDialog } from './FilterDialog';
import { setQueryParam } from '../../helpers/urlUtils';

const themeOptions = Object.keys(themes).map((key) => ({
  label: themes[key].displayName,
  value: key,
}));

function getThemeVersions(theme: string) {
  return versions[themes[theme].packageName];
}

function getVersionOptions(theme: string) {
  return getThemeVersions(theme).map((version) => ({
    label: version,
    value: version,
  }));
}

/**
 * Converts between equivalent versions of different themes that correspond to
 * the same release. If a match can't be found, defaults to the latest version
 * of the target theme.
 */
function getVersionEquivalent(toTheme: string, fromTheme: string, fromVersion: string): string {
  const versionIndex = getThemeVersions(fromTheme).indexOf(fromVersion);
  const toThemeVersions = getThemeVersions(toTheme);
  const equivalentVersion = toThemeVersions[versionIndex] ?? toThemeVersions[0];
  return equivalentVersion;
}

function getPackageData(theme: string) {
  switch (theme) {
    case 'healthcare':
      return healthcarePackage;
    case 'medicare':
      return medicarePackage;
    case 'cmsgov':
      return cmsgovPackage;
    case 'core':
    default:
      return corePackage;
  }
}

export interface ThemeVersionDialogProps {
  onExit(...args: any[]): void;
}

export const ThemeVersionDialog = (props: ThemeVersionDialogProps) => {
  const currentTheme = useTheme();
  console.log(currentTheme);
  const currentVersion = getPackageData(currentTheme).version;
  const [theme, setTheme] = useState(currentTheme);
  const [version, setVersion] = useState(currentVersion);

  function handleUpdate() {
    // We need to figure out the corresponding core version for this theme-
    // specific version, because that's what's used in the archive url.
    const coreVersion = getVersionEquivalent('core', theme, version);
    // Compare against the core version equivalent of what our version used to
    // be, because it was specific to the theme. For instance, if our theme was
    // healthcare and version 10, switching to core would mean our version is
    // now 6, and we don't want to incorrectly conclude that the version
    // changed.
    const versionChanged =
      coreVersion !== getVersionEquivalent('core', currentTheme, currentVersion);
    const themeChanged = theme !== currentTheme;

    if (versionChanged) {
      // Since the version changed, we need to navigate to that version of the
      // doc site, which is archived under design.cms.gov/v/

      // Start with our current path
      let path = window.location.pathname;
      if (path.startsWith('/v/')) {
        // Our path indicates that we're already in an archived version, so we
        // need to remove this part of the path before we append our new path.
        path = path.replace(/^\/v\/.*?\//, '/');
      }

      // Assumption that theme is the only query parameter we have and we can
      // just clobber the whole string with a new value
      let query = '';
      if (themeChanged) {
        query = `theme=${theme}`;
      }

      const origin = window.location.origin;
      const hash = window.location.hash;
      const newUrl = `${origin}/v/${coreVersion}${path}${query}${hash}`;
      window.location.href = newUrl;
    } else if (themeChanged) {
      // Only the theme changed, so we stay inside this current version of the
      // design system and just change our theme query parameter and reload.
      setQueryParam('theme', theme, true);
    }

    props.onExit();
  }
  console.log(theme, version);
  return (
    <FilterDialog
      heading="Design system switcher"
      actions={
        <>
          <Button onClick={handleUpdate} variation="solid">
            Update content
          </Button>
          <Button onClick={props.onExit} variation="ghost">
            Cancel
          </Button>
        </>
      }
      onExit={props.onExit}
    >
      <Dropdown
        label="Select a theme"
        name="theme"
        labelClassName="ds-u-margin-top--0"
        options={themeOptions}
        value={theme}
        onChange={(event) => {
          const newTheme = event.currentTarget.value;
          setTheme(newTheme);
          setVersion(getVersionEquivalent(newTheme, theme, version));
        }}
      />
      <Dropdown
        label="Select a version"
        name="version"
        options={getVersionOptions(theme)}
        value={version}
        onChange={(event) => setVersion(event.currentTarget.value)}
      />
    </FilterDialog>
  );
};

export default ThemeVersionDialog;
