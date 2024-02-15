import React, { useEffect, useRef, useState } from 'react';
import '@cmsgov/design-system/web-components';
import { Button } from '@cmsgov/design-system';
import { FilterDialog } from '../FilterDialog/index';
import { getThemeOptions } from './themeVersionData';
import { setQueryParam } from '../../../helpers/urlUtils';

export interface ThemeVersionDialogProps {
  theme: string;
  isOpen?: boolean;
  onExit(...args: any[]): void;
}

export const ThemeVersionDialog = (props: ThemeVersionDialogProps) => {
  const [theme, setTheme] = useState(props.theme);
  const dropdownRef = useRef<HTMLElement>();

  function handleUpdate() {
    if (theme !== props.theme) {
      setQueryParam('theme', theme, true);
    }

    props.onExit();
  }

  useEffect(() => {
    function handleChange(event) {
      setTheme(event.detail.target.value);
    }
    dropdownRef.current?.addEventListener('ds-change', handleChange);
    return () => {
      dropdownRef.current?.removeEventListener('ds-change', handleChange);
    };
  }, [dropdownRef]);

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
      <ds-dropdown
        label="Select a theme"
        name="theme"
        options={JSON.stringify(getThemeOptions())}
        value={theme}
        ref={dropdownRef}
      />
    </FilterDialog>
  );
};

export default ThemeVersionDialog;
