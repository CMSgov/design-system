import {
  AbuseIcon,
  BirthingFriendlyIcon,
  RoundedStarIcon,
  PharmacyIcon,
  PiggyBankIcon,
  CheckShieldIcon,
  DrugsIcon,
  InfoCircleOutlineIcon,
  SwipeIcon,
} from './index';

export default {
  title: 'Medicare/Icons',
  component: RoundedStarIcon,
  parameters: { theme: 'medicare' },
};

const iconData = [
  {
    defaultTitle: 'Abuse',
    component: <AbuseIcon />,
    name: 'AbuseIcon',
  },
  {
    defaultTitle: 'Birthing Friendly',
    component: <BirthingFriendlyIcon />,
    name: 'BirthingFriendlyIcon',
  },
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
  {
    defaultTitle: 'Swipe',
    component: <SwipeIcon />,
    name: 'SwipeIcon',
  },
];

export const AvailableIcons = () => (
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
      {iconData.map(({ defaultTitle, component, name, notes = '' }) => (
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
