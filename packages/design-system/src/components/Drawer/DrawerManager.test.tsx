import { act, getByRole, getByText, render, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';

import { Button } from '../Button';
import { Drawer } from './Drawer';
import { DrawerManager, useDrawerManager } from './DrawerManager';

const SingleDrawer = ({ heading }) => {
  const { openDrawer, toggleDrawer, closeDrawer, isDrawerOpen } = useDrawerManager();

  return (
    <>
      <Drawer isOpen={isDrawerOpen} onCloseClick={closeDrawer} heading={heading}>
        A drawer for {heading}
      </Drawer>

      <Button onClick={toggleDrawer}>toggle {heading}</Button>

      <Button onClick={openDrawer}>open {heading}</Button>
    </>
  );
};

function renderDrawerManager() {
  return {
    user: userEvent.setup(),
    ...render(
      <DrawerManager>
        <p>Dummy content</p>
        <div>
          <SingleDrawer heading="drawer one" />
          <SingleDrawer heading="drawer two" />
          <SingleDrawer heading="drawer three" />
        </div>
      </DrawerManager>
    ),
  };
}

function getActiveDrawer() {
  const dialog = screen.getByRole('dialog') as HTMLDialogElement;
  expect(dialog.open).toBe(true);
  return dialog;
}

async function closeActiveDrawer({ user }: { user: UserEvent }) {
  const drawer = getActiveDrawer();
  const closeButton = getByText(drawer, 'Close');
  await user.click(closeButton);
}

describe('DrawerManager', () => {
  it('opens a single dialog', async () => {
    const { user } = renderDrawerManager();

    // Open the first one
    await act(async () => {
      await user.click(screen.getByText('open drawer one'));
    });

    // And close it
    await act(async () => {
      await closeActiveDrawer({ user });
    });

    // Make sure it's closed
    expect(screen.queryByRole('dialog')).toBe(null);
  });

  it('toggles active state of single dialog', async () => {
    const { user } = renderDrawerManager();
    // Open the first one
    await act(async () => {
      await user.click(screen.getByText('toggle drawer one'));
    });

    // And close it
    await act(async () => {
      await closeActiveDrawer({ user });
    });

    // Make sure it's closed
    expect(screen.queryByRole('dialog')).toBe(null);
  });

  it('closes the first dialog when the second dialog is opened', async () => {
    const { user } = renderDrawerManager();
    const toggle1 = screen.getByText('toggle drawer one');
    const toggle2 = screen.getByText('toggle drawer two');
    const getActiveHeading = () => getByRole(getActiveDrawer(), 'heading');

    await act(async () => {
      await user.click(toggle1);
    });

    expect(getActiveHeading()).toHaveTextContent('drawer one');

    await act(async () => {
      await user.click(toggle2);
    });

    expect(getActiveHeading()).toHaveTextContent('drawer two');
  });
});
