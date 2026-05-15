import UsaBanner from './UsaBanner';
import figma from '@figma/code-connect';

figma.connect(
  UsaBanner,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=233%3A82003',
  {
    props: {},
    example: (props) => <UsaBanner {...props} />,
  }
);
