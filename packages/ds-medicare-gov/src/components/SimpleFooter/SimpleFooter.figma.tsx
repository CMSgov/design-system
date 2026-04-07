import SimpleFooter from './SimpleFooter';
import figma from '@figma/code-connect';

// Test branch: https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/branch/m5vQUe1j796fuQ64nLwEei/Design-System-Library?m=auto&node-id=392-13684&t=ogIvYBNIgMomfwIp-1
// https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=392%3A13684
figma.connect(
  SimpleFooter,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/branch/m5vQUe1j796fuQ64nLwEei/Design-System-Library?m=auto&node-id=392-13684&t=ogIvYBNIgMomfwIp-1',
  {
    props: {},
    example: (props) => <SimpleFooter {...props} />,
  }
);
