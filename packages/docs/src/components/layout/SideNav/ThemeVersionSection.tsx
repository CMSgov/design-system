import React, { useState } from 'react';
import useTheme from '../../../helpers/useTheme';
import ThemeVersionDialog from './ThemeVersionDialog';
import { getPackageData } from './themeVersionData';
import { Button } from '@cmsgov/design-system';

export const ThemeVersionSection = () => {
  const theme = useTheme();
  const version = getPackageData(theme).version;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <h3>{theme}</h3>
      <h3>{version}</h3>
      <Button variation="ghost" onClick={() => setIsDialogOpen(!isDialogOpen)}>
        Change theme or version
      </Button>
      {isDialogOpen && (
        <ThemeVersionDialog theme={theme} version={version} onExit={() => setIsDialogOpen(false)} />
      )}
    </>
  );
};

export default ThemeVersionSection;
