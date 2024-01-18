import React from 'react';
import { render, screen, getByRole, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../Button';
import { Drawer } from './Drawer';
import { DrawerManager, useDrawerManager } from './DrawerManager';

const SingleDrawer = ({ heading }) => {
  const { toggleClick, closeClick, isOpen } = useDrawerManager();

  return (
    <>
      <Drawer isOpen={isOpen} onCloseClick={closeClick} heading={heading}>
        A drawer for {heading}
      </Drawer>

      <Button className="ds-c-drawer__toggle" variation="ghost" onClick={toggleClick}>
        toggle {heading}
      </Button>
    </>
  );
};

function renderDrawerManager() {
  return render(
    <DrawerManager>
      <p>Dummy content</p>
      <div>
        <SingleDrawer heading="drawer one" />
        <SingleDrawer heading="drawer two" />
        <SingleDrawer heading="drawer three" />
      </div>
    </DrawerManager>
  );
}

function getActiveDrawer() {
  const dialog = screen.getByRole('dialog') as HTMLDialogElement;
  expect(dialog.open).toBe(true);
  return dialog;
}

function closeActiveDrawer() {
  const drawer = getActiveDrawer();
  const closeButton = getByText(drawer, 'Close');
  userEvent.click(closeButton);
}

describe('DrawerManager', () => {
  it('toggles active state of single dialog', async () => {
    renderDrawerManager();

    // Open the first one
    userEvent.click(screen.getAllByRole('button')[0]);

    // And close it
    closeActiveDrawer();

    // Make sure it's closed
    expect(screen.queryByRole('dialog')).toBe(null);
  });

  it('closes the first dialog when the second dialog is openend', async () => {
    renderDrawerManager();
    const toggle1 = screen.getByText('toggle drawer one');
    const toggle2 = screen.getByText('toggle drawer two');
    const getActiveHeading = () => getByRole(getActiveDrawer(), 'heading');

    userEvent.click(toggle1);
    expect(getActiveHeading()).toHaveTextContent('drawer one');
    userEvent.click(toggle2);
    expect(getActiveHeading()).toHaveTextContent('drawer two');
  });

  it('returns focus to toggle button after closing', async () => {
    renderDrawerManager();
    const toggle1 = screen.getByText('toggle drawer one');
    const toggle2 = screen.getByText('toggle drawer two');
    const toggle3 = screen.getByText('toggle drawer three');

    // Open and close the first one and check focus
    userEvent.click(toggle1);
    closeActiveDrawer();
    expect(toggle1).toEqual(document.activeElement);

    // If two are opened, make sure the last one's toggle gets focus
    userEvent.click(toggle2);
    userEvent.click(toggle3);
    closeActiveDrawer();
    expect(toggle3).toEqual(document.activeElement);
  });
});
