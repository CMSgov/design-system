import { Header } from '@cmsgov/ds-healthcare-gov';
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
import LabelExample from './Examples/LabelExample';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="ds-base">
      <Header loggedIn isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

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
        <LabelExample />
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
