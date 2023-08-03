import React, { useRef, useState } from 'react';
import useTheme from '../../../helpers/useTheme';
import ThemeDialog from './ThemeDialog';
import VersionDialog from './VersionDialog';
import { getPackageData, getThemeData } from './themeVersionData';
import { ArrowIcon } from '@cmsgov/design-system';

export const ThemeVersionSection = () => {
  const theme = useTheme();
  const version = getPackageData(theme).version;
  const themeDisplayName = getThemeData(theme).displayName;
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false);
  const themeButtonRef = useRef<HTMLButtonElement>();
  const versionButtonRef = useRef<HTMLButtonElement>();

  return (
    <>
      <div>
        Theme:{' '}
        <button
          className="c-navigation__settings-button"
          onClick={() => setIsThemeDialogOpen(!isThemeDialogOpen)}
          ref={themeButtonRef}
        >
          {themeDisplayName} <span className="ds-u-visibility--screen-reader">(Change theme)</span>{' '}
          <ArrowIcon direction="down" />
        </button>
        {isThemeDialogOpen && (
          <ThemeDialog
            theme={theme}
            onExit={() => {
              setIsThemeDialogOpen(false);
              themeButtonRef.current?.focus();
            }}
          />
        )}
      </div>
      <div>
        Version:{' '}
        <button
          className="c-navigation__settings-button"
          onClick={() => setIsVersionDialogOpen(!isVersionDialogOpen)}
          ref={versionButtonRef}
        >
          {version} <span className="ds-u-visibility--screen-reader">(Change version)</span>{' '}
          <ArrowIcon direction="down" />
        </button>
        {isVersionDialogOpen && (
          <VersionDialog
            theme={theme}
            version={version}
            onExit={() => {
              setIsVersionDialogOpen(false);
              versionButtonRef.current?.focus();
            }}
          />
        )}
      </div>
    </>
  );
};

export default ThemeVersionSection;
