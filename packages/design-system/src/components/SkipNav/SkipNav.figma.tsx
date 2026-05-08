import SkipNav from './SkipNav';
import figma from '@figma/code-connect';

figma.connect(SkipNav, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=773%3A56543', {
  props: {
    children: figma.string('Navigation link'),
    href: 'https://cms.gov',
  },
  example: ({ children, href }) => <SkipNav href={href}>{children}</SkipNav>,
});
