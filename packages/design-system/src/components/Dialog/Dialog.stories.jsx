import React, { useState } from 'react';
import { Dialog } from './Dialog';
import Button from '../Button/Button';

export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    analytics: { control: false },
    children: { control: false },
    actions: { control: false },
    heading: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
    title: {
      control: { type: 'text' },
      type: { name: 'string', required: true },
    },
  },
  args: {
    alert: false,
    closeButtonVariation: 'ghost',
    children: (
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan diam vitae metus
        lacinia, eget tempor purus placerat.
      </div>
    ),
    heading: 'Dialog Heading',
  },
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
};

export const DialogExample = ({ ...args }) => {
  const [shown, setShown] = useState();
  const showModal = () => setShown(true);
  const hideModal = () => setShown(false);

  return (
    <>
      <Button onClick={showModal} size="big" variation="solid">
        Click to show modal
      </Button>

      {shown && (
        <Dialog
          {...args}
          onExit={hideModal}
          actions={
            <>
              <button className="ds-c-button ds-c-button--solid ds-u-margin-right--1" key="solid">
                Dialog action
              </button>
              <button className="ds-c-button ds-c-button--ghost" key="cancel" onClick={hideModal}>
                Cancel
              </button>
            </>
          }
        />
      )}
    </>
  );
};

export const PreventScrollExample = (args) => {
  const [shown, setShown] = useState();
  const showModal = () => setShown(true);
  const hideModal = () => setShown(false);
  console.log(args);

  return (
    <div className="ds-u-measure--base">
      {shown && <Dialog onExit={hideModal} {...args} />}
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
        Years, and been seven Years a Citizen of the United States, and who shall not, when elected,
        be an Inhabitant of that State in which he shall be chosen.
      </p>
      <p>
        Representatives and direct Taxes shall be apportioned among the several States which may be
        included within this Union, according to their respective Numbers, which shall be determined
        by adding to the whole Number of free Persons, including those bound to Service for a Term
        of Years, and excluding Indians not taxed, three fifths of all other Persons. The actual
        Enumeration shall be made within three Years after the first Meeting of the Congress of the
        United States, and within every subsequent Term of ten Years, in such Manner as they shall
        by Law direct.The number of Representatives shall not exceed one for every thirty Thousand,
        but each State shall have at Least one Representative; and until such enumeration shall be
        made, the State of New Hampshire shall be entitled to chuse three, Massachusetts eight,
        Rhode-Island and Providence Plantations one, Connecticut five, New-York six, New Jersey
        four, Pennsylvania eight, Delaware one, Maryland six, Virginia ten, North Carolina five,
        South Carolina five, and Georgia three.
      </p>
      <p>
        When vacancies happen in the Representation from any State, the Executive Authority thereof
        shall issue Writs of Election to fill such Vacancies.
      </p>
      <p>
        The House of Representatives shall chuse their Speaker and other Officers;and shall have the
        sole Power of Impeachment.
      </p>
    </div>
  );
};
