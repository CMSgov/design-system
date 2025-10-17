import { Meta, StoryObj } from '@storybook/react';
import { webComponentDecorator } from '../storybook';
import WebComponentDocTemplate from '../../../../../../.storybook/docs/WebComponentDocTemplate.mdx';
import './index';

const meta: Meta = {
  title: 'Web Components/ds-icons',
  decorators: [webComponentDecorator],
  argTypes: {
    'aria-hidden': {
      description:
        'Describes the value of the `aria-hidden` attribute on the SVG. Defaulted to true with the assumption that most icons are decorative. If the icon does not have any associated label text, set this to `false` and ensure a `title` is provided for improved accessibility.',
      control: 'boolean',
    },
    'class-name': {
      description: 'Additional CSS classes to be added to the svg element',
      control: 'text',
    },
    children: {
      description: 'The elements that make up the SVG',
      control: false,
      table: { disable: true },
    },
    description: {
      description:
        'Long-text description of any SVG. Use for complex icons, otherwise `title` prop will suffice.',
      control: 'text',
    },
    id: {
      description: 'A custom `id` attribute for the SVG',
      control: 'text',
    },
    inversed: {
      description: 'If `true` sets inverse fill color. Default is `false`.',
      control: 'boolean',
    },
    title: {
      description: 'The descriptive name for the SVG icon',
      control: 'text',
    },
    'view-box': {
      description:
        'A string describing the viewbox of the SVG. It is recommended that the icon is centered and fill up the default viewport size. See [this blog post](https://webdesign.tutsplus.com/tutorials/svg-viewport-and-viewbox-for-beginners--cms-30844) for further explanation on viewBox and how to use it.',
      control: 'text',
    },
  },
  parameters: {
    docs: {
      page: WebComponentDocTemplate,
    },
  },
};

export default meta;
type Story = StoryObj;

const iconData = [
  {
    defaultTitle: 'Add',
    component: <ds-add-icon />,
    name: 'ds-add-icon',
  },
  {
    defaultTitle: 'Alert Circle Icon',
    component: <ds-alert-circle-icon />,
    name: 'ds-alert-circle-icon',
  },
  {
    defaultTitle: 'Alert',
    component: <ds-alert-icon />,
    name: 'ds-alert-icon',
  },
  {
    defaultTitle: 'Sort',
    component: <ds-arrows-stacked-icon />,
    name: 'ds-arrows-stacked-icon',
  },
  {
    defaultTitle: '[direction of arrow]',
    component: (
      <>
        <ds-arrow-icon direction="up" />
        <ds-arrow-icon direction="down" />
        <ds-arrow-icon direction="left" />
        <ds-arrow-icon direction="right" />
      </>
    ),
    name: 'ds-arrow-icon',
    notes:
      'Component takes <code>direction</code> prop to determine if it is up, down, left or right.',
  },
  {
    defaultTitle: 'Building in circle',
    component: <ds-building-circle-icon />,
    name: 'ds-building-circle-icon',
  },
  {
    defaultTitle: 'Calendar',
    component: <ds-calendar-icon />,
    name: 'ds-calendar-icon',
  },
  {
    defaultTitle: 'Check mark in circle',
    component: <ds-check-circle-icon />,
    name: 'ds-check-circle-icon',
  },
  {
    defaultTitle: 'Check mark',
    component: <ds-check-icon />,
    name: 'ds-check-icon',
  },
  {
    defaultTitle: 'Close',
    component: <ds-close-icon />,
    name: 'ds-close-icon',
  },
  {
    defaultTitle: 'Close',
    component: <ds-close-icon-thin />,
    name: 'ds-close-icon-thin',
  },
  {
    defaultTitle: 'Download',
    component: <ds-download-icon />,
    name: 'ds-download-icon',
  },
  {
    defaultTitle: 'Email',
    component: <ds-email-icon />,
    name: 'ds-email-icon',
  },
  {
    defaultTitle: 'External Link',
    component: <ds-external-link-icon />,
    name: 'ds-external-link-icon',
  },
  {
    defaultTitle: 'HHS Logo',
    component: <ds-h-h-s-logo />,
    name: 'ds-h-h-s-logo',
  },
  {
    defaultTitle: 'Image',
    component: <ds-image-icon />,
    name: 'ds-image-icon',
  },
  {
    defaultTitle: 'Information',
    component: <ds-info-circle-icon />,
    name: 'ds-info-circle-icon',
  },
  {
    defaultTitle: 'Information',
    component: <ds-info-circle-icon-thin />,
    name: 'ds-info-circle-icon-thin',
  },
  {
    defaultTitle: 'Link',
    component: <ds-link-icon />,
    name: 'ds-link-icon',
  },
  {
    defaultTitle: 'Lock in circle',
    component: <ds-lock-circle-icon />,
    name: 'ds-lock-circle-icon',
  },
  {
    defaultTitle: 'Lock',
    component: <ds-lock-icon />,
    name: 'ds-lock-icon',
  },
  {
    defaultTitle: 'Menu Icon',
    component: <ds-menu-icon />,
    name: 'ds-menu-icon',
  },
  {
    defaultTitle: 'Menu',
    component: <ds-menu-icon-thin />,
    name: 'ds-menu-icon-thin',
  },
  {
    defaultTitle: 'Minus in circle',
    component: <ds-minus-circle-icon />,
    name: 'ds-minus-circle-icon',
  },
  {
    defaultTitle: 'Next',
    component: <ds-next-icon />,
    name: 'ds-next-icon',
  },
  {
    defaultTitle: 'Pdf',
    component: <ds-pdf-icon />,
    name: 'ds-pdf-icon',
  },
  {
    defaultTitle: 'Plus in circle',
    component: <ds-plus-circle-icon />,
    name: 'ds-plus-circle-icon',
  },
  {
    defaultTitle: 'Print',
    component: <ds-print-icon />,
    name: 'ds-print-icon',
  },
  {
    defaultTitle: 'Quotation Mark',
    component: <ds-quotation-mark-icon />,
    name: 'ds-quotation-mark-icon',
  },
  {
    defaultTitle: 'Remove',
    component: <ds-remove-icon />,
    name: 'ds-remove-icon',
  },
  {
    defaultTitle: 'RSS',
    component: <ds-rss-icon />,
    name: 'ds-rss-icon',
  },
  {
    defaultTitle: 'Search',
    component: <ds-search-icon />,
    name: 'ds-search-icon',
  },
  {
    defaultTitle: 'Star / Star Filled',
    component: (
      <>
        <ds-star-icon />
        <ds-star-icon is-filled="true" />
      </>
    ),
    name: 'ds-star-icon',
    notes: 'Component takes <code>isFilled</code> prop to determine star is filled or an outline.',
  },
  {
    defaultTitle: 'U.S. flag',
    component: <ds-usa-flag-icon />,
    name: 'ds-usa-flag-icon',
  },
  {
    defaultTitle: 'Warning',
    component: <ds-warning-icon />,
    name: 'ds-warning-icon',
  },
  {
    defaultTitle: 'What’s New',
    component: <ds-whats-new-icon />,
    name: 'ds-whats-new-icon',
  },
];

const iconsTable = () => (
  <table className="ds-c-table">
    <thead>
      <tr>
        <th>Icon Component</th>
        <th>Example</th>
        <th>
          Default <code>title</code> attribute
        </th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      {iconData.map(({ defaultTitle, component, name, notes }) => (
        <tr key={name}>
          <td>
            <code>{name}</code>
          </td>
          <td className="ds-u-text-align--center">{component}</td>
          <td>{defaultTitle}</td>
          {/* eslint-disable-next-line react/no-danger -- Story with known text */}
          <td dangerouslySetInnerHTML={{ __html: notes }} />
        </tr>
      ))}
    </tbody>
  </table>
);

export const AvailableIcons: Story = {
  render: iconsTable,
};
