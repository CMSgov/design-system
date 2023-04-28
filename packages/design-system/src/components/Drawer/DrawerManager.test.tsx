import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../Button';
import { Drawer } from './Drawer';
import { DrawerManager, useDrawerManager } from './DrawerManager';

const SingleDrawer = ({ heading }) => {
  const { toggleClick, closeClick, isOpen } = useDrawerManager();

  return (
    <>
      {isOpen && (
        <Drawer onCloseClick={closeClick} heading={heading}>
          A drawer for {heading}
        </Drawer>
      )}
      <Button className="ds-c-drawer__toggle" variation="ghost" onClick={toggleClick}>
        toggle {heading}
      </Button>
    </>
  );
};

const renderDrawerManager = () => {
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
};

describe('DrawerManager', () => {
  it('toggles active state of single dialog', async () => {
    renderDrawerManager();
    userEvent.click(screen.getAllByRole('button')[0]);
    await new Promise((r) => setTimeout(r, 500));
    userEvent.click(screen.getByText('Close'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the first dialog when the second dialog is openend', async () => {
    renderDrawerManager();
    userEvent.click(screen.getAllByRole('button')[0]);
    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getByRole('heading')).toHaveTextContent('drawer one');
    userEvent.click(screen.getByText('Close'));
    await new Promise((r) => setTimeout(r, 500));
    userEvent.click(screen.getAllByRole('button')[1]);
    await new Promise((r) => setTimeout(r, 500));
    expect(screen.getByRole('heading')).toHaveTextContent('drawer two');
  });
});
