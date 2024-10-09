import type { Meta } from '@storybook/react';
import { useEffect } from 'react';
import { action } from '@storybook/addon-actions';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import { webComponentDecorator } from '../storybook';
import './ds-filter-chip';

const meta: Meta = {
  title: 'Web Components/ds-filter-chip',
  decorators: [webComponentDecorator],
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
      description: {
        component:
          'For information about how and when to use this component, [refer to its full documentation page](https://design.cms.gov/components/filter-chip/).',
      },
      componentEvents: {
        'ds-delete': {
          description: 'A callback function triggered when the user clicks the filter chip button.',
        },
      },
    },
  },
  args: {
    label: 'Example Filter Chip',
    'clear-label': 'Remove',
  },
  argTypes: {
    'clear-label': {
      description: 'Labels filter action, i.e., "Remove." For screenreader support.',
      control: 'text',
    },
    'class-name': {
      description: 'CSS class to apply custom styles to the Drawer.',
      control: 'text',
    },
    label: {
      description: 'Text for the filter chip.',
      control: 'text',
    },
    'root-id': {
      description:
        'Id for filter chip button. If not provided, a unique id will be automatically generated and used.',
      control: 'text',
    },
    size: {
      description:
        'Sets the size of the chip to larger version. The only acceptable value is "big".',
      control: 'text',
    },
    'use-alternate-icon': {
      description: 'Use alternate thinner close icon in place of standard.',
      control: 'boolean',
    },
  },
};
export default meta;

const listOfChips = [
  { label: 'Example FilterChip' },
  { label: 'Example with alternate icon', 'use-alternate-icon': 'true' },
  { label: 'Example big filter chip', size: 'big' },
  { label: 'Example big with alternate icon', 'use-alternate-icon': 'true', size: 'big' },
];

const Template = (args: any) => {
  useEffect(() => {
    const chipEl = document.querySelector('ds-filter-chip');
    const handleDelete = (event: Event) => {
      action('ds-delete')(event);
    };

    if (chipEl) {
      chipEl.addEventListener('ds-delete', handleDelete);
    }

    return () => {
      chipEl.removeEventListener('ds-delete', handleDelete);
    };
  }, []);

  return <ds-filter-chip {...args} />;
};

const MultiChipTemplate = () => {
  useEffect(() => {
    const chipEls = document.querySelectorAll('ds-filter-chip');
    const handleDelete = (event: Event) => {
      action('ds-delete')(event);
    };

    if (chipEls.length > 0) {
      chipEls.forEach((el) => {
        el.addEventListener('ds-delete', handleDelete);
      });
    }

    return () => {
      chipEls.forEach((el) => {
        el.removeEventListener('ds-delete', handleDelete);
      });
    };
  }, []);

  return (
    <>
      {listOfChips.map((chip) => (
        <ds-filter-chip key={chip.label} {...(chip as any)} />
      ))}
    </>
  );
};

export const Default = {
  render: Template,
};

export const MultipleChips = {
  render: MultiChipTemplate,
  argTypes: {
    'clear-label': {
      table: {
        disable: true,
      },
    },
    'class-name': {
      table: {
        disable: true,
      },
    },
    label: {
      table: {
        disable: true,
      },
    },
    'root-id': {
      table: {
        disable: true,
      },
    },
    size: {
      table: {
        disable: true,
      },
    },
    'use-alternate-icon': {
      table: {
        disable: true,
      },
    },
  },
};
