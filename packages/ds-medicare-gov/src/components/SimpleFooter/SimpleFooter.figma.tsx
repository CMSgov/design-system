import SimpleFooter from './SimpleFooter';
import figma from '@figma/code-connect';

figma.connect(
  SimpleFooter,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=392%3A13684',
  {
    props: {},
    example: (props) => <SimpleFooter {...props} />,
  }
);
