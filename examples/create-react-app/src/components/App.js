import { Badge, Button, Dialog, TabPanel, Tabs } from '@cmsgov/design-system';
import React, { useState } from 'react';
import AccordionExample from './Examples/AccordionExample';
import AlertExample from './Examples/AlertExample';
import AutocompleteExample from './Examples/AutocompleteExample';
import BadgeExample from './Examples/BadgeExample';
import ButtonExample from './Examples/ButtonExample';
import ChoiceListExample from './Examples/ChoiceListExample';
import DateFieldExample from './Examples/DateFieldExample';
import DropdownExample from './Examples/DropdownExample';
import FilterChipExample from './Examples/FilterChipExample';
import FormLabelExample from './Examples/FormLabelExample';
import HelpDrawerExample from './Examples/HelpDrawerExample';
import MaskedFieldExample from './Examples/MaskedFieldExample';
import ModalDialogExample from './Examples/ModalDialogExample';
import MonthPickerExample from './Examples/MonthPickerExample';
import SpinnerExample from './Examples/SpinnerExample';
import TableExample from './Examples/TableExample';
import TabsExample from './Examples/TabsExample';
import TextFieldExample from './Examples/TextFieldExample';
import TooltipExample from './Examples/TooltipExample';
import UsaBannerExample from './Examples/UsaBannerExample';
import VerticalNavigationExample from './Examples/VerticalNavigationExample';
import usflag from '../images/us_flag_small.png';

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="ds-base">
      <header className="ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block ds-u-fill--primary-darkest">
        <h1 className="ds-u-margin--0 ds-u-color--white ds-u-font-size--display ds-u-text-align--center">
          Hello, world!
        </h1>
        <center>
          <Badge variation="info" size="big">
            <img className="c-usa-banner__header-flag" src={usflag} alt="U.S. flag" />
            &nbsp;CMS Design system
          </Badge>
        </center>
      </header>

      <Tabs>
        <TabPanel id="summary" tab="Summary">
          The CMS design system is a set of open source design and front-end development resources
          for creating Section 508 compliant, responsive, and consistent websites. It builds on the
          U.S. Web Design System and extends it to support additional CSS and React components,
          utility classes, and a grid framework to allow teams to quickly prototype and build
          accessible, responsive, production-ready websites.
          <p>
            <a href="https://design.cms.gov/">Learn more about CMS Design System</a>
          </p>
        </TabPanel>

        <TabPanel id="uswds" tab="U.S. Web Design System">
          USWDS is a library of code, tools, and guidance to help government teams design and build
          fast, accessible, mobile-friendly government websites backed by user research and modern
          best practices.
          <div id="App" style={{ minHeight: 300 }}>
            <Button
              href="#"
              className="ds-c-button--transparent ds-u-font-weight--normal"
              onClick={() => setShowModal(true)}
            >
              Link to U.S. Web Design System (USWDS)
            </Button>

            {showModal && (
              <Dialog
                onExit={() => setShowModal(false)}
                getApplicationNode={() => document.getElementById('App')}
                heading="You are leaving URL"
                actions={[
                  <Button
                    className="ds-c-button ds-c-button--primary"
                    key="primary"
                    href="https://designsystem.digital.gov/"
                  >
                    OK
                  </Button>,
                  <Button
                    className="ds-c-button ds-c-button--transparent"
                    key="cancel"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>,
                ]}
              >
                You are leaving URL and connecting to a 3rd party site. Please click OK to continue
                or CANCEL to stay on this site.
              </Dialog>
            )}
          </div>
        </TabPanel>
        <TabPanel id="examples" tab="Examples">
          Example of every design system component, for testing
          <div id="Examples" style={{ minHeight: 300 }}>
            <AccordionExample />
            <AlertExample />
            <AutocompleteExample />
            <BadgeExample />
            <ButtonExample />
            <ChoiceListExample />
            <DateFieldExample />
            <DropdownExample />
            <FilterChipExample />
            <FormLabelExample />
            <HelpDrawerExample />
            <MaskedFieldExample />
            <ModalDialogExample />
            <MonthPickerExample />
            <SpinnerExample />
            <TextFieldExample />
            <TableExample />
            <TabsExample />
            <TooltipExample />
            <UsaBannerExample />
            <VerticalNavigationExample />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default App;
