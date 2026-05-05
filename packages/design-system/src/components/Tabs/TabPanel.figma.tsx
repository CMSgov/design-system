import TabPanel from './TabPanel';
import figma from '@figma/code-connect';

figma.connect(
  TabPanel,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=25282%3A1405',
  {
    props: {
      children: figma.string('Tab Panel Text'),
      id: 'unique-id',
    },
    example: ({ children, id }) => <TabPanel id={id}>{children}</TabPanel>,
  }
);
