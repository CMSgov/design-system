import React, { useState } from 'react';
import { Button, Dropdown } from '@cmsgov/design-system';
import { FilterDialog } from '../FilterDialog/index';
import { getThemeOptions } from './themeVersionData';
import { setQueryParam } from '../../../helpers/urlUtils';

export interface ThemeVersionDialogProps {
  theme: string;
  onExit(...args: any[]): void;
}

export const ThemeVersionDialog = (props: ThemeVersionDialogProps) => {
  const [theme, setTheme] = useState(props.theme);

  function handleUpdate() {
    if (theme !== props.theme) {
      setQueryParam('theme', theme, true);
    }

    props.onExit();
  }

  return (
    <FilterDialog
      heading="Design system switcher"
      actions={
        <>
          <Button onClick={handleUpdate} variation="solid">
            Switch themes
          </Button>
          <Button onClick={props.onExit} variation="ghost">
            Cancel
          </Button>
        </>
      }
    >
      <Dropdown
        label="Select a theme"
        name="theme"
        options={getThemeOptions()}
        value={theme}
        onChange={(event) => setTheme(event.currentTarget.value)}
      />
    </FilterDialog>
  );
};

export default ThemeVersionDialog;
