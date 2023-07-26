import React from 'react';
import {
  AddIcon,
  AlertCircleIcon,
  ArrowsStackedIcon,
  ArrowIcon,
  BuildingCircleIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  CloseIcon,
  CloseIconThin,
  DownloadIcon,
  ExternalLinkIcon,
  HHSLogo,
  ImageIcon,
  InfoCircleIcon,
  InfoCircleIconThin,
  LockCircleIcon,
  LockIcon,
  MenuIcon,
  MenuIconThin,
  MinusCircleIcon,
  NextIcon,
  PdfIcon,
  PlusCircleIcon,
  RemoveIcon,
  StarIcon,
  SvgIcon,
  UsaFlagIcon,
  WarningIcon,
  AddIconFoo,
  AddIconBar,
  AddIconBaz,
  AlertCircleIconFoo,
  AlertCircleIconBar,
  AlertCircleIconBaz,
  CalendarIconFoo,
  CalendarIconBar,
  CalendarIconBaz,
  CheckIconFoo,
  CheckIconBar,
  CloseIconFoo,
  CloseIconBar,
  CloseIconBaz,
  InfoCircleIconFoo,
  InfoCircleIconBar,
  InfoCircleIconBaz,
  LockIconFoo,
  LockIconBar,
  LockIconBaz,
} from './index';

export default {
  title: 'Components/Icons',
  component: SvgIcon,
};

const iconData = [
  {
    defaultTitle: 'Add',
    component: <AddIcon />,
    name: 'AddIcon',
  },
  {
    defaultTitle: 'Alert',
    component: <AlertCircleIcon />,
    name: 'AlertCircleIcon',
  },
  {
    defaultTitle: 'Sort',
    component: <ArrowsStackedIcon />,
    name: 'ArrowsStackedIcon',
  },
  {
    defaultTitle: '[direction of arrow]',
    component: (
      <>
        <ArrowIcon direction="up" />
        <ArrowIcon direction="down" />
        <ArrowIcon direction="left" />
        <ArrowIcon direction="right" />
      </>
    ),
    name: 'ArrowIcon',
    notes:
      'Component takes <code>direction</code> prop to determine if it is up, down, left or right.',
  },
  {
    defaultTitle: 'Building in circle',
    component: <BuildingCircleIcon />,
    name: 'BuildingCircleIcon',
  },
  {
    defaultTitle: 'Calendar',
    component: <CalendarIcon />,
    name: 'CalendarIcon',
  },
  {
    defaultTitle: 'Check mark in circle',
    component: <CheckCircleIcon />,
    name: 'CheckCircleIcon',
  },
  {
    defaultTitle: 'Check mark',
    component: <CheckIcon />,
    name: 'CheckIcon',
  },
  {
    defaultTitle: 'Close',
    component: <CloseIcon />,
    name: 'CloseIcon',
  },
  {
    defaultTitle: 'Close',
    component: <CloseIconThin />,
    name: 'CloseIconThin',
  },
  {
    defaultTitle: 'Download',
    component: <DownloadIcon />,
    name: 'DownloadIcon',
  },
  {
    defaultTitle: 'External Link',
    component: <ExternalLinkIcon />,
    name: 'ExternalLinkIcon',
  },
  {
    defaultTitle: 'Image',
    component: <ImageIcon />,
    name: 'ImageIcon',
  },
  {
    defaultTitle: 'Information',
    component: <InfoCircleIcon />,
    name: 'InfoCircleIcon',
  },
  {
    defaultTitle: 'Information',
    component: <InfoCircleIconThin />,
    name: 'InfoCircleIconThin',
  },
  {
    defaultTitle: 'Lock in circle',
    component: <LockCircleIcon />,
    name: 'LockCircleIcon',
  },
  {
    defaultTitle: 'Lock',
    component: <LockIcon />,
    name: 'LockIcon',
  },
  {
    defaultTitle: 'Menu Icon',
    component: <MenuIcon />,
    name: 'MenuIcon',
  },
  {
    defaultTitle: 'Menu',
    component: <MenuIconThin />,
    name: 'MenuIconThin',
  },
  {
    defaultTitle: 'Minus in circle',
    component: <MinusCircleIcon />,
    name: 'MinusCircleIcon',
  },
  {
    defaultTitle: 'Next',
    component: <NextIcon />,
    name: 'NextIcon',
  },
  {
    defaultTitle: 'Pdf',
    component: <PdfIcon />,
    name: 'PdfIcon',
  },
  {
    defaultTitle: 'Plus in circle',
    component: <PlusCircleIcon />,
    name: 'PlusCircleIcon',
  },
  {
    defaultTitle: 'Remove',
    component: <RemoveIcon />,
    name: 'RemoveIcon',
  },
  {
    defaultTitle: 'Star / Star Filled',
    component: (
      <>
        <StarIcon />
        <StarIcon isFilled />
      </>
    ),
    name: 'StarIcon',
    notes: 'Component takes <code>isFilled</code> prop to determine star is filled or an outline.',
  },
  {
    defaultTitle: 'U.S. flag',
    component: <UsaFlagIcon />,
    name: 'UsaFlagIcon',
  },
  {
    defaultTitle: 'Warning',
    component: <WarningIcon />,
    name: 'WarningIcon',
  },
  {
    defaultTitle: 'Add Icon Foo',
    component: <AddIconFoo />,
    name: 'AddIconFoo',
  },
  {
    defaultTitle: 'Add Icon Bar',
    component: <AddIconBar />,
    name: 'AddIconBar',
  },
  {
    defaultTitle: 'Add Icon Baz',
    component: <AddIconBaz />,
    name: 'AddIconBaz',
  },
  {
    defaultTitle: 'Alert Circle Icon Foo',
    component: <AlertCircleIconFoo />,
    name: 'AlertCircleIconFoo',
  },
  {
    defaultTitle: 'Alert Circle Icon Bar',
    component: <AlertCircleIconBar />,
    name: 'AlertCircleIconBar',
  },
  {
    defaultTitle: 'Alert Circle Icon Baz',
    component: <AlertCircleIconBaz />,
    name: 'AlertCircleIconBaz',
  },
  {
    defaultTitle: 'Calendar Icon Foo',
    component: <CalendarIconFoo />,
    name: 'CalendarIconFoo',
  },
  {
    defaultTitle: 'Calendar Icon Bar',
    component: <CalendarIconBar />,
    name: 'CalendarIconBar',
  },
  {
    defaultTitle: 'Calendar Icon Baz',
    component: <CalendarIconBaz />,
    name: 'CalendarIconBaz',
  },
  {
    defaultTitle: 'Check Icon Foo',
    component: <CheckIconFoo />,
    name: 'CheckIconFoo',
  },
  {
    defaultTitle: 'Check Icon Bar',
    component: <CheckIconBar />,
    name: 'CheckIconBar',
  },
  {
    defaultTitle: 'Close Icon Foo',
    component: <CloseIconFoo />,
    name: 'CloseIconFoo',
  },
  {
    defaultTitle: 'Close Icon Bar',
    component: <CloseIconBar />,
    name: 'CloseIconBar',
  },
  {
    defaultTitle: 'Close Icon Baz',
    component: <CloseIconBaz />,
    name: 'CloseIconBaz',
  },
  {
    defaultTitle: 'Info Circle Icon Foo',
    component: <InfoCircleIconFoo />,
    name: 'InfoCircleIconFoo',
  },
  {
    defaultTitle: 'Info Circle Icon Bar',
    component: <InfoCircleIconBar />,
    name: 'InfoCircleIconBar',
  },
  {
    defaultTitle: 'Info Circle Icon Baz',
    component: <InfoCircleIconBaz />,
    name: 'InfoCircleIconBaz',
  },
  {
    defaultTitle: 'Lock Icon Foo',
    component: <LockIconFoo />,
    name: 'LockIconFoo',
  },
  {
    defaultTitle: 'Lock Icon Bar',
    component: <LockIconBar />,
    name: 'LockIconBar',
  },
  {
    defaultTitle: 'Lock Icon Baz',
    component: <LockIconBaz />,
    name: 'LockIconBaz',
  },
];

export const AvailableIcons = () => (
  <>
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
            <td dangerouslySetInnerHTML={{ __html: notes }} />
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export const HhsLogo = () => <HHSLogo />;
