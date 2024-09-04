import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from '@cmsgov/design-system';
import { action } from '@storybook/addon-actions';
import { useDialog } from './useDialog';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    alert: false,
    children: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
        lacinia, eget tempor purus placerat.
      </div>
    ),
    heading: 'Dialog Heading',
  },
  argTypes: {
    ariaCloseLabel: {
      table: {
        defaultValue: { summary: 'Close modal dialog' },
      },
    },
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
      underlyingHtmlElements: ['dialog'],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: function Component(args) {
    const [dialogOpen, updateOpen] = useState(false);

    const showModal = () => {
      updateOpen(true);
    };

    const hideModal = (...params) => {
      action('onExit')(...params);
      updateOpen(false);
    };

    return (
      <>
        <Button onClick={showModal} size="big" variation="solid">
          Click to show modal
        </Button>

        <Dialog
          {...args}
          onExit={hideModal}
          actions={
            <>
              <Button variation="solid" className="ds-u-margin-right--1">
                Dialog action
              </Button>
              <Button variation="ghost" onClick={hideModal}>
                Cancel
              </Button>
            </>
          }
          isOpen={dialogOpen}
        />
      </>
    );
  },
};

export const PreventScrollExample: Story = {
  render: function Component(args) {
    const [dialogOpen, updateOpen] = useState(false);
    const showModal = () => updateOpen(true);
    const hideModal = (...params) => {
      action('onExit')(...params);
      updateOpen(false);
    };

    return (
      <div className="ds-u-measure--base">
        <h1>The United States Constitution</h1>
        <p>
          We the People of the United States, in Order to form a more perfect Union, establish
          Justice, insure domestic Tranquility, provide for the common defence, promote the general
          Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and
          establish this Constitution for the United States of America.
        </p>
        <h2>Article I</h2>
        <h3>Section 1: Congress</h3>
        <p>
          All legislative Powers herein granted shall be vested in a Congress of the United States,
          which shall consist of a Senate and House of Representatives.
        </p>

        <Dialog {...args} onExit={hideModal} isOpen={dialogOpen} />
        <Button onClick={showModal} size="big" variation="solid">
          Click to show modal
        </Button>

        <h3>Section 2: The House of Representatives</h3>
        <p>
          The House of Representatives shall be composed of Members chosen every second Year by the
          People of the several States, and the Electors in each State shall have the Qualifications
          requisite for Electors of the most numerous Branch of the State Legislature.
        </p>
        <p>
          No Person shall be a Representative who shall not have attained to the Age of twenty five
          Years, and been seven Years a Citizen of the United States, and who shall not, when
          elected, be an Inhabitant of that State in which he shall be chosen.
        </p>
        <p>
          Representatives and direct Taxes shall be apportioned among the several States which may
          be included within this Union, according to their respective Numbers, which shall be
          determined by adding to the whole Number of free Persons, including those bound to Service
          for a Term of Years, and excluding Indians not taxed, three fifths of all other Persons.
          The actual Enumeration shall be made within three Years after the first Meeting of the
          Congress of the United States, and within every subsequent Term of ten Years, in such
          Manner as they shall by Law direct.The number of Representatives shall not exceed one for
          every thirty Thousand, but each State shall have at Least one Representative; and until
          such enumeration shall be made, the State of New Hampshire shall be entitled to chuse
          three, Massachusetts eight, Rhode-Island and Providence Plantations one, Connecticut five,
          New-York six, New Jersey four, Pennsylvania eight, Delaware one, Maryland six, Virginia
          ten, North Carolina five, South Carolina five, and Georgia three.
        </p>
        <p>
          When vacancies happen in the Representation from any State, the Executive Authority
          thereof shall issue Writs of Election to fill such Vacancies.
        </p>
        <p>
          The House of Representatives shall chuse their Speaker and other Officers;and shall have
          the sole Power of Impeachment.
        </p>
      </div>
    );
  },
};

/**
 * The `useDialog` hook provides an alternative imperative interface for managing the
 * open state of a modal dialog and waiting asynchronously for the final result of the
 * user's interaction with the modal. While React leans heavily on declarative
 * programming for building maintainable apps, there are cases where a more imperative
 * style can save a lot of code. In those cases, being able to call a function to open
 * the dialog and then wait on the response before performing the next action can make
 * application logic a lot easier to read, reason about, and manage.
 *
 * To use the `useDialog` hook, you pass it a render function for the dialog, and it
 * returns the rendered dialog and a function for opening the dialog and getting back
 * a resolution when the dialog is closed.
 *
 * Note that you need to render the returned `dialog` element even if it's not open at
 * the moment. It needs to be in the DOM in order for the browser and assistive tech to
 * be able to properly interact with it.
 *
 * Note also that you're in complete control over what value the `openDialog` promise
 * resolves to by what you pass to the `resolveClose` function in your render function.
 */
export const UseDialogExample: Story = {
  name: 'useDialog Example',
  render: function Component() {
    const { dialog, openDialog } = useDialog<boolean>(({ resolveClose, isOpen }) => (
      <Dialog
        heading="Confirm deletion"
        onExit={() => resolveClose(false)}
        actions={
          <>
            <Button
              variation="solid"
              onClick={() => resolveClose(true)}
              className="ds-u-margin-right--1"
            >
              Delete
            </Button>
            <Button variation="ghost" onClick={() => resolveClose(false)}>
              Cancel
            </Button>
          </>
        }
        isOpen={isOpen}
      >
        Are you sure you want to delete your account? All in-progress applications will be deleted
        and your information cleared from the system.
      </Dialog>
    ));

    async function handleDelete() {
      const result = await openDialog();
      if (result) {
        alert(
          'Pretend you have been redirected to a page that confirms that your account was deleted.'
        );
      }
    }

    return (
      <>
        <Button onClick={handleDelete} variation="solid">
          Delete account
        </Button>
        {dialog}
      </>
    );
  },
};
