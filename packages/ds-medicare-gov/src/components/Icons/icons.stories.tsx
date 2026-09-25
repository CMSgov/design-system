import {
  AboutIcon,
  AbuseIcon,
  AlarmIcon,
  BellIcon,
  BinocularsIcon,
  BirthingFriendlyIcon,
  BrowserIcon,
  ChatIcon,
  ChecklistIcon,
  CheckShieldIcon,
  ClaimsIcon,
  CogIcon,
  ConnectedAppsIcon,
  CostsCircleIcon,
  CostsIcon,
  CreateAccountIcon,
  DialysisServicesIcon,
  DoctorsCliniciansIcon,
  DrugsIcon,
  EHRIcon,
  EllipsisIcon,
  EMedicareSummaryIcon,
  FilterIcon,
  FindCareIcon,
  FindPlansIcon,
  FiveStarPlanIcon,
  GetStartedIcon,
  HealthcareProviderIcon,
  HeartIcon,
  HomeHealthServicesIcon,
  HospiceIcon,
  HospitalIcon,
  IncludedNoIcon,
  IncludedYesIcon,
  InfoCircleOutlineIcon,
  InpatientRehabIcon,
  LearnIcon,
  LocationIcon,
  LoginIcon,
  LogoutIcon,
  LongtermCareIcon,
  LowPerformingPlanIcon,
  ManageRepsIcon,
  MapPinIcon,
  MedicareCardIcon,
  MobileIcon,
  MyAccountIcon,
  NursingHomeIcon,
  PaperlessIcon,
  PasswordHideIcon,
  PasswordShowIcon,
  PaymentHistoryIcon,
  PharmacyIcon,
  PhoneNumberIcon,
  PhoneNumberPlusIcon,
  PieChartIcon,
  PiggyBankIcon,
  PreventativeServicesIcon,
  ProcedureIcon,
  ResourcesIcon,
  RoundedStarIcon,
  ScalesIcon,
  ShareIcon,
  SortIcon,
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
    defaultTitle: 'Alarm',
    component: <AlarmIcon />,
    name: 'AlarmIcon',
  },
  {
    defaultTitle: 'Bell',
    component: <BellIcon />,
    name: 'BellIcon',
  },
  {
    defaultTitle: 'Binoculars',
    component: <BinocularsIcon />,
    name: 'BinocularsIcon',
  },
  {
    defaultTitle: 'Birthing Friendly',
    component: <BirthingFriendlyIcon />,
    name: 'BirthingFriendlyIcon',
  },
  {
    defaultTitle: 'Browser',
    component: <BrowserIcon />,
    name: 'BrowserIcon',
  },
  {
    defaultTitle: 'Chat',
    component: <ChatIcon />,
    name: 'ChatIcon',
  },
  {
    defaultTitle: 'Checklist',
    component: <ChecklistIcon />,
    name: 'ChecklistIcon',
  },
  {
    defaultTitle: 'Check with shield',
    component: <CheckShieldIcon />,
    name: 'CheckShieldIcon',
  },
  {
    defaultTitle: 'Claims',
    component: <ClaimsIcon />,
    name: 'ClaimsIcon',
  },
  {
    defaultTitle: 'Cog',
    component: <CogIcon />,
    name: 'CogIcon',
  },
  {
    defaultTitle: 'Connected apps',
    component: <ConnectedAppsIcon />,
    name: 'ConnectedAppsIcon',
  },
  {
    defaultTitle: 'Costs Circle Icon',
    component: <CostsCircleIcon />,
    name: 'CostsCircleIcon',
  },
  {
    defaultTitle: 'Costs',
    component: <CostsIcon />,
    name: 'CostsIcon',
  },
  {
    defaultTitle: 'Create Account Icon',
    component: <CreateAccountIcon />,
    name: 'CreateAccountIcon',
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
    defaultTitle: 'EHR',
    component: <EHRIcon />,
    name: 'EHRIcon',
  },
  {
    defaultTitle: 'Ellipsis',
    component: <EllipsisIcon />,
    name: 'EllipsisIcon',
  },
  {
    defaultTitle: 'eMedicare Summary',
    component: <EMedicareSummaryIcon />,
    name: 'EMedicareSummaryIcon',
  },
  {
    defaultTitle: 'Filters',
    component: <FilterIcon />,
    name: 'FilterIcon',
  },
  {
    defaultTitle: 'Find Care',
    component: <FindCareIcon />,
    name: 'FindCareIcon',
  },
  {
    defaultTitle: 'Find Plans',
    component: <FindPlansIcon />,
    name: 'FindPlansIcon',
  },
  {
    defaultTitle: 'Five-star plan',
    component: <FiveStarPlanIcon />,
    name: 'FiveStarPlanIcon',
  },
  {
    defaultTitle: 'Get Started',
    component: <GetStartedIcon />,
    name: 'GetStartedIcon',
  },
  {
    defaultTitle: 'Healthcare Provider',
    component: <HealthcareProviderIcon />,
    name: 'HealthcareProviderIcon',
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
    defaultTitle: 'Hospital',
    component: <HospitalIcon />,
    name: 'HospitalIcon',
  },
  {
    defaultTitle: 'Not included',
    component: <IncludedNoIcon />,
    name: 'IncludedNoIcon',
  },
  {
    defaultTitle: 'Included',
    component: <IncludedYesIcon />,
    name: 'IncludedYesIcon',
  },
  {
    defaultTitle: 'Information',
    component: <InfoCircleOutlineIcon />,
    name: 'InfoCircleOutlineIcon',
  },
  {
    defaultTitle: 'Inpatient Rehabilitation',
    component: <InpatientRehabIcon />,
    name: 'InpatientRehabilitationIcon',
  },
  {
    defaultTitle: 'Learn',
    component: <LearnIcon />,
    name: 'LearnIcon',
  },
  {
    defaultTitle: 'Location',
    component: <LocationIcon />,
    name: 'LocationIcon',
  },
  {
    defaultTitle: 'Login',
    component: <LoginIcon />,
    name: 'LoginIcon',
  },
  {
    defaultTitle: 'Logout',
    component: <LogoutIcon />,
    name: 'LogoutIcon',
  },
  {
    defaultTitle: 'Long-term Care',
    component: <LongtermCareIcon />,
    name: 'LongtermCareIcon',
  },
  {
    defaultTitle: 'Low-performing plan',
    component: <LowPerformingPlanIcon />,
    name: 'LowPerformingPlanIcon',
  },
  {
    defaultTitle: 'Manage my reps',
    component: <ManageRepsIcon />,
    name: 'ManageRepsIcon',
  },
  {
    defaultTitle: 'Map pin',
    component: <MapPinIcon />,
    name: 'MapPinIcon',
  },
  {
    defaultTitle: 'Medicare Card',
    component: <MedicareCardIcon />,
    name: 'MedicareCardIcon',
  },
  {
    defaultTitle: 'Medicare mobile app',
    component: <MobileIcon />,
    name: 'MobileIcon',
  },
  {
    defaultTitle: 'My Account',
    component: <MyAccountIcon />,
    name: 'MyAccountIcon',
  },
  {
    defaultTitle: 'Nursing Home',
    component: <NursingHomeIcon />,
    name: 'NursingHomeIcon',
  },
  {
    defaultTitle: 'Paperless',
    component: <PaperlessIcon />,
    name: 'PaperlessIcon',
  },
  {
    defaultTitle: 'Hide password',
    component: <PasswordHideIcon />,
    name: 'PasswordHideIcon',
  },
  {
    defaultTitle: 'Show password',
    component: <PasswordShowIcon />,
    name: 'PasswordShowIcon',
  },
  {
    defaultTitle: 'Payment history',
    component: <PaymentHistoryIcon />,
    name: 'PaymentHistoryIcon',
  },
  {
    defaultTitle: 'Pharmacy',
    component: <PharmacyIcon />,
    name: 'PharmacyIcon',
  },
  {
    defaultTitle: 'Phone Number',
    component: <PhoneNumberIcon />,
    name: 'PhoneNumberIcon',
  },
  {
    defaultTitle: 'Phone number plus',
    component: <PhoneNumberPlusIcon />,
    name: 'PhoneNumberPlusIcon',
  },
  {
    defaultTitle: 'Pie chart',
    component: <PieChartIcon />,
    name: 'PieChartIcon',
  },
  {
    defaultTitle: 'Piggy Bank',
    component: <PiggyBankIcon />,
    name: 'PiggyBankIcon',
  },
  {
    defaultTitle: 'Preventative Services',
    component: <PreventativeServicesIcon />,
    name: 'PreventativeServicesIcon',
  },
  {
    defaultTitle: 'Procedure',
    component: <ProcedureIcon />,
    name: 'ProcedureIcon',
  },
  {
    defaultTitle: 'Resources',
    component: <ResourcesIcon />,
    name: 'ResourcesIcon',
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
    defaultTitle: 'Scales',
    component: <ScalesIcon />,
    name: 'ScalesIcon',
  },
  {
    defaultTitle: 'Share',
    component: <ShareIcon />,
    name: 'ShareIcon',
  },
  {
    defaultTitle: 'Sort',
    component: <SortIcon />,
    name: 'SortIcon',
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
