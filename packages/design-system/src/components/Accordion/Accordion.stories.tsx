import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { AccordionItem } from './AccordionItem';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem },
  args: {
    bordered: true,
  },
};
export default meta;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    children: [
      <AccordionItem
        key="1"
        heading="First Amendment"
        contentClassName="first-amendment"
        defaultOpen
      >
        <p>
          We the People of the United States, in Order to form a more perfect Union, establish
          Justice, insure domestic Tranquility, provide for the common defence, promote the general
          Welfare, and secure the Blessings of Liberty to ourselves and our Posterity, do ordain and
          establish this Constitution for the United States of America.
        </p>
      </AccordionItem>,
      <AccordionItem key="2" heading="Second Amendment" defaultOpen>
        <p>
          A well regulated Militia, being necessary to the security of a free State, the right of
          the people to keep and bear Arms, shall not be infringed.
        </p>
      </AccordionItem>,
    ],
  },
};

export const Controlled: Story = {
  args: {
    bordered: true,
    openItems: [0],
  } as any,
  render: function Component(args) {
    const [{ openItems }, setOpenItems] = useArgs();

    const handleChange = function (index: number) {
      if (openItems?.includes(index)) {
        setOpenItems({ openItems: openItems?.filter((item: number) => item !== index) });
      } else {
        setOpenItems({ openItems: openItems && [...openItems, index].sort() });
      }
    };

    return (
      <Accordion {...args}>
        <AccordionItem
          heading="Controlled accordion"
          defaultOpen
          isControlledOpen={openItems?.includes(0)}
          onChange={() => handleChange(0)}
        >
          <p>
            In a controlled accordion, the accordion panel&apos;s open state is controlled by the
            application, by passing <code>isControlledOpen</code> and <code>onChange</code>
            props. The <code>isControlledOpen</code> boolean flag sets the panel to an open or close
            state.
          </p>
        </AccordionItem>
        <AccordionItem
          heading="Controlled accordion second header"
          defaultOpen={false}
          isControlledOpen={openItems?.includes(1)}
          onChange={() => handleChange(1)}
        >
          <p>
            In the args below you will notice the openItems array being updated with the changes set
            using <code>isControlledOpen</code> and <code>onChange</code>
          </p>
        </AccordionItem>
      </Accordion>
    );
  },
};
