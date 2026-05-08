import Tab from './Tab';
import figma from '@figma/code-connect';

figma.connect(Tab, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=233%3A69182', {
  props: {
    children: figma.string('Tab heading'),
    id: 'unique-id',
    panelId: 'id-of-associated-tab-panel',
    selected: figma.enum('State', {
      Selected: true,
    }),
    disabled: figma.enum('State', {
      Disabled: true,
    }),
  },
  example: ({ children, id, panelId, selected, disabled }) => (
    <Tab id={id} panelId={panelId} selected={selected} disabled={disabled}>
      {children}
    </Tab>
  ),
});
