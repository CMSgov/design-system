import React, { useState } from 'react';
import { Button, Dropdown, DropdownOption } from '@cmsgov/design-system';
import { FilterDialog } from './FilterDialog';

export interface ThemeVersionDialogProps {
  theme: string;
  themes: DropdownOption[];
  version: string;
  versions: DropdownOption[];
  onCancel(event: React.MouseEvent | React.KeyboardEvent): void;
  onUpdate(theme: string, version: string);
}

export const ThemeVersionDialog = (props: ThemeVersionDialogProps) => {
  const [theme, setTheme] = useState(props.theme);
  const [version, setVersion] = useState(props.version);

  return (
    <FilterDialog
      heading="Design system switcher"
      actions={
        <>
          <Button onClick={() => props.onUpdate(theme, version)} variation="solid">
            Update content
          </Button>
          <Button onClick={props.onCancel} variation="ghost">
            Cancel
          </Button>
        </>
      }
      onExit={props.onCancel}
    >
      <Dropdown
        label="Select a theme"
        name="theme"
        labelClassName="ds-u-margin-top--0"
        options={props.themes}
        value={theme}
        onChange={(event) => setTheme(event.currentTarget.value)}
      />
      <Dropdown
        label="Select a version"
        name="version"
        options={props.versions}
        value={version}
        onChange={(event) => setVersion(event.currentTarget.value)}
      />
    </FilterDialog>
  );
};

export default ThemeVersionDialog;
