import corePackage from '../../../../../design-system/package.json';
import healthcarePackage from '../../../../../ds-healthcare-gov/package.json';
import medicarePackage from '../../../../../ds-medicare-gov/package.json';
import cmsgovPackage from '../../../../../ds-cms-gov/package.json';
import themes from '../../../../../../themes.json';
import versions from '../../../../../../versions.json';

const themeOptions = Object.keys(themes).map((key) => ({
  label: themes[key].displayName,
  value: key,
}));

export function getThemeOptions() {
  return themeOptions;
}

export function getThemeVersions(theme: string) {
  return versions[themes[theme].packageName];
}

export function getVersionOptions(theme: string) {
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
export function getVersionEquivalent(
  toTheme: string,
  fromTheme: string,
  fromVersion: string
): string {
  const versionIndex = getThemeVersions(fromTheme).indexOf(fromVersion);
  const toThemeVersions = getThemeVersions(toTheme);
  const equivalentVersion = toThemeVersions[versionIndex] ?? toThemeVersions[0];
  return equivalentVersion;
}

export function getPackageData(theme: string) {
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
