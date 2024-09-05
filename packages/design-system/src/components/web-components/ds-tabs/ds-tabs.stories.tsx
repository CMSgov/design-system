import React from 'react';
import './ds-tab-panel';
import './ds-tabs';

const TabPanels = () => {
  return React.createElement(
    'ds-tabs',
    { 'default-selected-id': 'summary' },
    React.createElement('ds-tab-panel', { id: 'summary', tab: 'Summary' }, 
      'The Bill of Rights is the first ten amendments to the United States Constitution.'
    ),
    React.createElement('ds-tab-panel', { id: 'preamble', tab: 'Preamble' }, 
      'We the People of the United States, in Order to form a more perfect Union, establish Justice, ' +
      'insure domestic Tranquility, provide for the common defence, promote the general Welfare, and ' +
      'secure the Blessings of Liberty to ourselves and our Posterity, do ordain and establish this Constitution ' +
      'for the United States of America.'
    ),
    React.createElement('ds-tab-panel', { id: 'amendments', tab: 'Amendments' },
      React.createElement('h2', { className: 'ds-text-heading--lg' }, 'Bill of Rights'),
      React.createElement('ol', { className: 'ds-c-list' },
        React.createElement('li', null, 'Freedoms, Petitions, Assembly'),
        React.createElement('li', null, 'Right to bear arms'),
      ),
      React.createElement('h2', { className: 'ds-text-heading--lg' }, 'Later Amendments'),
      React.createElement('ol', { className: 'ds-c-list', start: 11 },
        React.createElement('li', null, 'Lawsuits against states'),
        React.createElement('li', null, 'Presidential elections'),
      )
    )
  );
};

export default TabPanels;
