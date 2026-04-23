import { Tabs, TabPanel } from './index';
import figma from '@figma/code-connect';

figma.connect(Tabs, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=233%3A69182', {
  props: {
    children: [
      <TabPanel key="tabpanel_1" tab="Selected" id="tabpanel_1">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>,
      <TabPanel key="tabpanel_2" tab="Default with icon" id="tabpanel_2">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>,
      <TabPanel key="tabpanel_3" tab="Hover" id="tabpanel_3">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>,
      <TabPanel key="tabpanel_4" tab="Hover with icon" id="tabpanel_4">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>,
      <TabPanel key="tabpanel_5" tab="Disabled" id="tabpanel_5" disabled>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>,
    ],
    selectedId: 'tabpanel_1',
  },
  example: ({ children, selectedId }) => <Tabs selectedId={selectedId}>{children}</Tabs>,
});
