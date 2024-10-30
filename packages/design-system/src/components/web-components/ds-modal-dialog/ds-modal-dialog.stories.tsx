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
    children: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
        lacinia, eget tempor purus placerat.
      </div>
    ),
    heading: 'Dialog Heading',
    'is-open': 'false',
  },
  argTypes: {
    'actions-class-name': {
      description: 'Additional classes to be added to the actions container.',
      control: 'text',
    },
    analytics: {
      description: 'Enables analytics tracking on the component.',
      control: 'boolean',
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
          description: 'A callback function triggered when the user clicks the filter chip button.',
        },
      },
      sharedAttrLists: ['analytics'],
      slots: {
        actions: {
          description:
            'Buttons or other HTML to be rendered in the "actions" bar at the bottom of the dialog.',
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
    const button = document.querySelector('ds-button');
    const modal = document.querySelector('ds-modal-dialog');
    const toggleModal = (event): void => {
      const targetType = event.target.nodeName ?? '';
      if (targetType === 'DS-BUTTON') {
        action('ds-click')(event);
      } else {
        action('ds-exit')(event);
      }
      const isOpen = modal.getAttribute('is-open');
      if (isOpen === 'true') {
        modal.setAttribute('is-open', 'false');
      } else {
        modal.setAttribute('is-open', 'true');
      }
    };
    button.addEventListener('ds-click', toggleModal);
    modal.addEventListener('ds-exit', toggleModal);
    return () => {
      button.removeEventListener('ds-click', toggleModal);
      modal.removeEventListener('ds-exit', toggleModal);
    };
  });

  return (
    <>
      <ds-button>Open Modal</ds-button>
      <ds-modal-dialog {...args}></ds-modal-dialog>
    </>
  );
};

export const Default = {
  render: Template,
  args: {
    alert: 'false',
    children: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
        lacinia, eget tempor purus placerat.
      </div>
    ),
    heading: 'Dialog Heading',
    'is-open': 'false',
  },
};

export const BackdropClickExits = {
  render: Template,
  args: {
    alert: 'false',
    'backdrop-click-exits': 'true',
    children: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
        lacinia, eget tempor purus placerat.
      </div>
    ),
    heading: 'Dialog Heading',
    'is-open': 'false',
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
    'backdrop-click-exits': 'true',
    children: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
        lacinia, eget tempor purus placerat.
      </div>
    ),
    heading: 'Dialog Heading',
    'is-open': 'false',
  },
};
