import { useState } from 'react';
import { Button, Dropdown } from '@cmsgov/design-system';
import { FilterDialog } from '../FilterDialog/index';
import { getThemeOptions } from './themeVersionData';
import { setQueryParam } from '../../../helpers/urlUtils';
import { sendFilterAppliedEvent } from '../../../helpers/analytics';
import { getVersionEquivalent } from './themeVersionData';

export interface ThemeVersionDialogProps {
  theme: string;
  isOpen?: boolean;
  version: string;
  onExit(...args: any[]): void;
}

export const ThemeVersionDialog = (props: ThemeVersionDialogProps) => {
  const [theme, setTheme] = useState(props.theme);

  function handleUpdate() {
    const currentVersion = getVersionEquivalent(theme, props.theme, props.version);
    const filterCategoriesUsed = { theme: theme, version: currentVersion };
    const filterCategoriesUsedString = JSON.stringify(filterCategoriesUsed);

    sendFilterAppliedEvent({ filterCategoriesUsedString });

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
      isOpen={props.isOpen}
      onExit={props.onExit}
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
