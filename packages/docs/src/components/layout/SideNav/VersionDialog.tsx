import { useState } from 'react';
import { Button, Dropdown } from '@cmsgov/design-system';
import { FilterDialog } from '../FilterDialog';
import { getVersionOptions, getVersionEquivalent } from './themeVersionData';
import { sendFilterAppliedEvent } from '../../../helpers/analytics';

export interface ThemeVersionDialogProps {
  theme: string;
  version: string;
  isOpen?: boolean;
  onExit(...args: any[]): void;
}

export const ThemeVersionDialog = (props: ThemeVersionDialogProps) => {
  const [version, setVersion] = useState(props.version);

  function handleUpdate() {
    if (version !== props.version) {

      sendFilterAppliedEvent({
        filterCategoriesUsed: ['version'],
        resultsCountAfterFiltering: null,
        resultsCountPriorToFiltering: null,
      });
      // Since the version changed, we need to navigate to that version of the
      // doc site, which is archived under design.cms.gov/v/

      // Start with our current path
      let path = window.location.pathname;
      if (path.startsWith('/v/')) {
        // Our path indicates that we're already in an archived version, so we
        // need to remove this part of the path before we append our new path.
        path = path.replace(/^\/v\/.*?\//, '/');
      }

      // We need to figure out the corresponding core version for this theme-
      // specific version, because that's what's used in the archive url.
      const coreVersion = getVersionEquivalent('core', props.theme, version);

      const origin = window.location.origin;
      const hash = window.location.hash;
      const newUrl = `${origin}/v/${coreVersion}${path}${hash}`;
      window.location.href = newUrl;
    }

    props.onExit();
  }

  return (
    <FilterDialog
      heading="Design system switcher"
      actions={
        <>
          <Button onClick={handleUpdate} variation="solid">
            Switch versions
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
        label="Select a version"
        name="version"
        options={getVersionOptions(props.theme)}
        value={version}
        onChange={(event) => setVersion(event.currentTarget.value)}
      />
    </FilterDialog>
  );
};

export default ThemeVersionDialog;
