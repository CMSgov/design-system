import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';
import { useEffect } from 'react';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-modal-dialog';
import '../ds-button';

const meta: Meta = {
  title: 'Web Components/ds-modal-dialog',
  args: {
    alert: 'false',
    'is-open': 'false',
    children: (
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
          lacinia, eget tempor purus placerat.
        </p>
        <div slot="heading">
          <h2>This is the modal heading.</h2>
        </div>
        <div slot="actions">
          <form method="dialog">
            <ds-button value="rstBtn" class-name="ds-u-margin-right--1">
              Reset
            </ds-button>
            <ds-button type="submit" value="sbmBtn">
              Confirm
            </ds-button>
          </form>
        </div>
      </div>
    ),
  },
  argTypes: {
    'actions-class-name': {
      description: 'Additional classes to be added to the actions container.',
      control: 'text',
    },
    alert: {
      description:
        'If `true`, the modal will receive a role of `alertdialog`, instead of its default `dialog`. The `alertdialog` role should only be used when an alert, error, or warning occurs.',
      control: 'boolean',
    },
    'backdrop-click-exits': {
      description:
        'Pass `true` to have the dialog close when its backdrop pseudo-element is clicked',
      control: 'boolean',
    },
    children: {
      table: {
        disable: true,
      },
    },
    'class-name': {
      description: 'Additional classes to be added to the root dialog element.',
      control: 'text',
    },
    'dialog-close-label': {
      description: 'Aria label for the close button',
      control: 'text',
      table: {
        defaultValue: { summary: 'Close modal dialog' },
      },
    },
    'header-class-name': {
      description:
        'Additional classes to be added to the header, which wraps the heading and close button.',
      control: 'text',
    },
    heading: {
      description: "The dialog's heading, to be rendered in the header alongside the close button.",
      control: 'text',
    },
    'root-id': {
      description: 'A custom `id` attribute for the dialog element',
      control: 'text',
    },
    'is-open': {
      description: 'Controls whether the dialog is in an open state',
      control: 'boolean',
    },
    size: {
      description: 'Can be one of three values: narrow, wide and full',
      options: ['narrow', 'wide', 'full'],
      control: 'radio',
    },
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/dialog/).',
      },
      componentEvents: {
        'ds-exit': {
          description: 'A callback function triggered when the user clicks the close button.',
        },
      },
      sharedAttrLists: ['analytics'],
      slots: {
        actions: {
          description:
            'Buttons or other HTML to be rendered in the "actions" bar at the bottom of the dialog. The preferred method for supplying this content is to add a `div` element with a `slot` attribute of `actions` as a child element to this custom element. Note that in our example we use a `form` with a `method` of `dialog` to wrap two buttons. Using a `submit` button within this form will automatically close the dialog on click and emit a `ds-exit` event. If you want to include other buttons that do not close the dialog but trigger other actions, those buttons need to have a type other than submit. The benefit of this approach is that you can close the dialog on submit without needing to attach any event handlers. For more information please [refer to the MDN form element documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form#method)',
        },
        heading: {
          description:
            "The dialog's heading, to be rendered in the header alongside the close button.",
        },
      },
    },
  },
  decorators: [webComponentDecorator],
};
export default meta;

const Template = (args) => {
  useEffect(() => {
    const modal = document.querySelector('ds-modal-dialog');
    const toggleButton = document.getElementById('modal-toggle');

    const openModal = () => {
      modal?.setAttribute('is-open', 'true');
    };

    modal?.addEventListener('ds-exit', (event) => {
      action('ds-exit')(event);
      modal?.setAttribute('is-open', 'false');
    });
    toggleButton?.addEventListener('click', openModal);

    return () => {
      modal?.removeEventListener('ds-exit', (event) => {
        action('ds-exit')(event);
        modal?.setAttribute('is-open', 'false');
      });
      toggleButton?.removeEventListener('click', openModal);
    };
  });

  return (
    <>
      <ds-button id="modal-toggle">Open Modal</ds-button>
      <ds-modal-dialog {...args}></ds-modal-dialog>
    </>
  );
};

export const Default = {
  render: Template,
  args: {
    alert: 'false',
  },
};

export const BackdropClickExits = {
  render: Template,
  args: {
    alert: 'false',
    'backdrop-click-exits': 'true',
    heading: 'Dialog Heading',
  },
};

export const PreventScrollExample = {
  render: function Component(args) {
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

        <Template {...args} />

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
  args: {
    alert: 'false',
    'backdrop-click-exits': 'false',
    children: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
        lacinia, eget tempor purus placerat.
      </div>
    ),
    heading: 'Dialog Heading',
  },
};
