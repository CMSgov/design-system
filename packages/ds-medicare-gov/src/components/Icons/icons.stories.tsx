import React from 'react';
import {
  RoundedStarIcon,
  PharmacyIcon,
  PiggyBankIcon,
  CheckShieldIcon,
  DrugsIcon,
  InfoCircleOutlineIcon,
} from './index';

export default {
  title: 'Medicare/Icons',
  component: RoundedStarIcon,
  parameters: { theme: 'medicare' },
};

const iconData = [
  {
    defaultTitle: 'Check with shield',
    component: <CheckShieldIcon />,
    name: 'CheckShieldIcon',
  },
  {
    defaultTitle: 'Drugs',
    component: <DrugsIcon />,
    name: 'DrugsIcon',
  },
  {
    defaultTitle: 'Information',
    component: <InfoCircleOutlineIcon />,
    name: 'InfoCircleOutlineIcon',
  },
  {
    defaultTitle: 'Pharmacy',
    component: <PharmacyIcon />,
    name: 'PharmacyIcon',
  },
  {
    defaultTitle: 'Piggy Bank',
    component: <PiggyBankIcon />,
    name: 'PiggyBankIcon',
  },
  {
    defaultTitle: '[variation] Star',
    component: (
      <>
        <RoundedStarIcon />
        <RoundedStarIcon variation="half" />
        <RoundedStarIcon variation="filled" />
      </>
    ),
    name: 'RoundedStarIcon',
    notes:
      'Takes a `variation` prop to determine if the star is fully filled, half filled, or just an outline.',
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
