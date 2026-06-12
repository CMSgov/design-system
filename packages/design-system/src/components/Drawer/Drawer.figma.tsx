import Drawer from './Drawer';
import figma from '@figma/code-connect';

// Skipped Figma properties:
// - `Has footer` (BOOLEAN): omitting `footerTitle`/`footerBody` props achieves the same effect.
// - `Has explanation title` (BOOLEAN) + `Explanation title` (TEXT): no direct Drawer prop;
//   would have to be rendered inside `children` as structural content.
// - `Explanation Text` (TEXT): used below as the drawer body (children) since `Drawer.children`
//   accepts arbitrary content.
// - `Focused close button` (BOOLEAN): internal interaction state, no code prop.
// - `Medicare` (VARIANT: No/Yes/Medicare3): branding variant with no Drawer prop counterpart.

figma.connect(
  Drawer,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=dev&node-id=4221-12896',
  {
    props: {
      heading: figma.string('Help Drawer Title'),
      footerTitle: figma.string('Footer Title'),
      footerBody: figma.string('Footer content'),
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
