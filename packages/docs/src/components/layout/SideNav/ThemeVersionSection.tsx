import React, { useState } from 'react';
import useTheme from '../../../helpers/useTheme';
import ThemeDialog from './ThemeDialog';
import VersionDialog from './VersionDialog';
import { getPackageData, getThemeDisplayName } from './themeVersionData';
import { ArrowIcon } from '@cmsgov/design-system';

export const ThemeVersionSection = () => {
  const theme = useTheme();
  const version = getPackageData(theme).version;
  const themeDisplayName = getThemeDisplayName(theme);
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false);
  const [isVersionDialogOpen, setIsVersionDialogOpen] = useState(false);

  return (
    <>
      <div>
        Theme:{' '}
        <button
          className="c-navigation__settings-button"
          onClick={() => setIsThemeDialogOpen(!isThemeDialogOpen)}
        >
          <span className="ds-u-visibility--screen-reader">Change</span> {themeDisplayName}{' '}
          <ArrowIcon direction="down" />
        </button>
        {isThemeDialogOpen && (
          <ThemeDialog theme={theme} onExit={() => setIsThemeDialogOpen(false)} />
        )}
      </div>
      <div>
        Version:{' '}
        <button
          className="c-navigation__settings-button"
          onClick={() => setIsVersionDialogOpen(!isVersionDialogOpen)}
        >
          <span className="ds-u-visibility--screen-reader">Change</span> {version}{' '}
          <ArrowIcon direction="down" />
        </button>
        {isVersionDialogOpen && (
          <VersionDialog
            theme={theme}
            version={version}
            onExit={() => setIsVersionDialogOpen(false)}
          />
        )}
      </div>
    </>
  );
};

export default ThemeVersionSection;
