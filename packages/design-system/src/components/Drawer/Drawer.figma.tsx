import Drawer from './Drawer';
import figma from '@figma/code-connect';

figma.connect(
  Drawer,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=dev&node-id=4221-12896',
  {
    props: {
      heading: figma.string('Help Drawer Title'),
      footerTitle: figma.boolean('Has footer', {
        true: figma.string('Footer Title'),
        false: undefined,
      }),
      footerBody: figma.boolean('Has footer', {
        true: figma.string('Footer content'),
        false: undefined,
      }),
      children: figma.string('Explanation Text'),
      isOpen: true,
      onCloseClick: () => 'REPLACE ME WITH A CALLBACK FUNCTION',
    },
    example: ({ heading, footerTitle, footerBody, children, isOpen, onCloseClick }) => (
      <Drawer
        heading={heading}
        footerTitle={footerTitle}
        footerBody={footerBody}
        isOpen={isOpen}
        onCloseClick={onCloseClick}
      >
        {children}
      </Drawer>
    ),
  }
);
