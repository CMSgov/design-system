import React, { useState } from 'react';
import useTheme from '../../../helpers/useTheme';
import ThemeVersionDialog from './ThemeVersionDialog';
import { getPackageData } from './themeVersionData';
import { Button, SvgIcon } from '@cmsgov/design-system';

export const ThemeVersionSection = () => {
  const theme = useTheme();
  const version = getPackageData(theme).version;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div>
        Theme: <strong>{theme}</strong>
      </div>
      <div>
        Version: <strong>{version}</strong>
      </div>
      <button
        className="c-navigation__settings-button"
        onClick={() => setIsDialogOpen(!isDialogOpen)}
      >
        Change settings
      </button>

      {isDialogOpen && (
        <ThemeVersionDialog theme={theme} version={version} onExit={() => setIsDialogOpen(false)} />
      )}
    </>
  );
};

export default ThemeVersionSection;
