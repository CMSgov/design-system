import Tabs from './Tabs';
import TabPanel from './TabPanel';
import figma from '@figma/code-connect';

figma.connect(Tabs, 'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/?node-id=25282%3A1585', {
  example: () => (
    <Tabs selectedId={'selected'}>
      <TabPanel key="selected" id="selected" tab="Tab heading">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>
      <TabPanel key="default" id="default" tab="Tab heading">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>
      <TabPanel key="hover" id="hover" tab="Tab heading">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>
      <TabPanel key="disabled" id="disabled" tab="Tab heading" disabled>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>
      <TabPanel key="no-icon" id="no-icon" tab="No icon heading">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo.
      </TabPanel>
    </Tabs>
  ),
});
