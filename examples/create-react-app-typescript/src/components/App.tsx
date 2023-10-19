import { Badge } from '@cmsgov/design-system';
import React from 'react';
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
import PaginationExample from './Examples/PaginationExample';
import SpinnerExample from './Examples/SpinnerExample';
import TableExample from './Examples/TableExample';
import TabsExample from './Examples/TabsExample';
import TextFieldExample from './Examples/TextFieldExample';
import TooltipExample from './Examples/TooltipExample';
import UsaBannerExample from './Examples/UsaBannerExample';
import VerticalNavigationExample from './Examples/VerticalNavigationExample';
import usflag from '../images/us_flag_small.png';

function App() {
  return (
    <div className="ds-base">
      <header className="ds-u-padding--3 ds-u-sm-padding--6 ds-u-display--block ds-u-fill--primary-darkest">
        <h1 className="ds-u-margin--0 ds-u-color--white ds-u-font-size--display ds-u-text-align--center">
          Hello, world!
        </h1>
        <div className="ds-u-text-align--center">
          <Badge variation="info" size="big">
            <img className="c-usa-banner__header-flag" src={usflag} alt="U.S. flag" />
            &nbsp;CMS Design system
          </Badge>
        </div>
      </header>

      <div className="ds-l-container">
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
        <PaginationExample />
        <SpinnerExample />
        <TextFieldExample />
        <TableExample />
        <TabsExample />
        <TooltipExample />
        <UsaBannerExample />
        <VerticalNavigationExample />
      </div>
    </div>
  );
}

export default App;
