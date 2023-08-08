import React, { useRef, useState } from 'react';
import useTheme from '../../../helpers/useTheme';
import ThemeDialog from './ThemeDialog';
import VersionDialog from './VersionDialog';
import { getPackageData, getThemeData } from './themeVersionData';
import { ArrowIcon } from '@cmsgov/design-system';
import { useFilterDialogManager } from '../FilterDialog/FilterDialogManager';

export const ThemeVersionSection = () => {
  const theme = useTheme();
  const version = getPackageData(theme).version;
  const themeDisplayName = getThemeData(theme).displayName;
  const themeDialogProps = useFilterDialogManager();
  const versionDialogProps = useFilterDialogManager();
  const themeButtonRef = useRef<HTMLButtonElement>();
  const versionButtonRef = useRef<HTMLButtonElement>();

  return (
    <>
      <div>
        Theme:{' '}
        <button
          className="c-navigation__settings-button"
          onClick={themeDialogProps.toggleClick}
          type="button"
          ref={themeButtonRef}
        >
          {themeDisplayName} <span className="ds-u-visibility--screen-reader">(Change theme)</span>{' '}
          <ArrowIcon direction="down" />
        </button>
        {themeDialogProps.isOpen && (
          <ThemeDialog
            theme={theme}
            onExit={() => {
              themeDialogProps.closeClick();
              themeButtonRef.current?.focus();
            }}
          />
        )}
      </div>
      <div>
        Version:{' '}
        <button
          className="c-navigation__settings-button"
          onClick={versionDialogProps.toggleClick}
          type="button"
          ref={versionButtonRef}
        >
          {version} <span className="ds-u-visibility--screen-reader">(Change version)</span>{' '}
          <ArrowIcon direction="down" />
        </button>
        {versionDialogProps.isOpen && (
          <VersionDialog
            theme={theme}
            version={version}
            onExit={() => {
              versionDialogProps.closeClick();
              versionButtonRef.current?.focus();
            }}
          />
        )}
      </div>
    </>
  );
};

export default ThemeVersionSection;
