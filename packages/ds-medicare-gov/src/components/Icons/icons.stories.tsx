import {
  AboutIcon,
  AbuseIcon,
  BirthingFriendlyIcon,
  CheckShieldIcon,
  CostsCircleIcon,
  CostsIcon,
  DialysisServicesIcon,
  DoctorsCliniciansIcon,
  DrugsIcon,
  FilterIcon,
  GetStartedIcon,
  HeartIcon,
  HomeHealthServicesIcon,
  HospiceIcon,
  InfoCircleOutlineIcon,
  LeafIcon,
  LongtermCareIcon,
  NursingHomeIcon,
  PharmacyIcon,
  PiggyBankIcon,
  RoundedStarIcon,
  SuppliersIcon,
  SwipeIcon,
  TeletypewriterIcon,
  WheelchairIcon,
} from './index';

export default {
  title: 'Medicare/Icons',
  component: RoundedStarIcon,
  parameters: { theme: 'medicare' },
};

const iconData = [
  {
    defaultTitle: 'About',
    component: <AboutIcon />,
    name: 'AboutIcon',
  },
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
    defaultTitle: 'Costs',
    component: <CostsIcon />,
    name: 'CostsIcon',
  },
  {
    defaultTitle: 'Costs Circle Icon',
    component: <CostsCircleIcon />,
    name: 'CostsCircleIcon',
  },
  {
    defaultTitle: 'Dialysis Services',
    component: <DialysisServicesIcon />,
    name: 'DialysisServicesIcon',
  },
  {
    defaultTitle: 'Doctors and Clinicians',
    component: <DoctorsCliniciansIcon />,
    name: 'DoctorsCliniciansIcon',
  },
  {
    defaultTitle: 'Drugs',
    component: <DrugsIcon />,
    name: 'DrugsIcon',
  },
  {
    defaultTitle: 'Filters',
    component: <FilterIcon />,
    name: 'FilterIcon',
  },
  {
    defaultTitle: 'Get Started',
    component: <GetStartedIcon />,
    name: 'GetStartedIcon',
  },
  {
    defaultTitle: '[variation] Heart',
    component: (
      <>
        <HeartIcon variation="empty" />
        <HeartIcon variation="filled" />
      </>
    ),
    name: 'HeartIcon',
    notes:
      'Takes a <code>variation</code> prop to determine if the heart is filled or just an outline.',
  },
  {
    defaultTitle: 'Home Health Services',
    component: <HomeHealthServicesIcon />,
    name: 'HomeHealthServicesIcon',
  },
  {
    defaultTitle: 'Hospice',
    component: <HospiceIcon />,
    name: 'HospiceIcon',
  },
  {
    defaultTitle: 'Information',
    component: <InfoCircleOutlineIcon />,
    name: 'InfoCircleOutlineIcon',
  },
  {
    defaultTitle: 'Leaf',
    component: <LeafIcon />,
    name: 'LeafIcon',
  },
  {
    defaultTitle: 'Long-term Care',
    component: <LongtermCareIcon />,
    name: 'LongtermCareIcon',
  },
  {
    defaultTitle: 'Nursing Home',
    component: <NursingHomeIcon />,
    name: 'NursingHomeIcon',
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
      'Takes a <code>variation</code> prop to determine if the star is fully filled, half filled, or just an outline.',
  },
  {
    defaultTitle: 'Suppliers',
    component: <SuppliersIcon />,
    name: 'SuppliersIcon',
  },
  {
    defaultTitle: 'Swipe',
    component: <SwipeIcon />,
    name: 'SwipeIcon',
  },
  {
    defaultTitle: 'Teletypewriter',
    component: <TeletypewriterIcon />,
    name: 'TeletypewriterIcon',
  },
  {
    defaultTitle: 'Wheelchair',
    component: <WheelchairIcon />,
    name: 'WheelchairIcon',
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
