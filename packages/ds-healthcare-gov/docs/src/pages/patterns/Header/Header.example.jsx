import { Button, ChoiceList, Header, TextField } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

const localeChoices = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
];

const customLinks = [
  { label: 'Custom Link 1', href: '#customLink1' },
  { label: 'Custom Link 2', href: '#customLink2' },
  { label: 'Custom Link 3', href: '#customLink3' },
];

class HeaderExample extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      locale: 'en',
    };
  }

  renderHeaderToggles() {
    const { locale } = this.state;
    const locales = localeChoices.map((choice) => ({
      ...choice,
      checked: choice.value === locale,
    }));

    return (
      <div className="ds-u-margin-top--4">
        <ChoiceList
          label="Change language"
          name="locale"
          choices={locales}
          onChange={(event) => this.setState({ locale: event.target.value })}
          type="radio"
        />
      </div>
    );
  }

  render() {
    const { locale } = this.state;
    const wrapperClassNames = 'ds-u-padding--1';
    const HeaderBottomMessage = (
      <div className="color-secondary-light ds-u-padding-y--2">
        <div className="ds-l-container">Add content here for Header Bottom section</div>
      </div>
    );

    const SampleLearnSubmenu = () => (
      <div className="ds-u-display--flex">
        <div className="ds-u-margin-right--1" style={{ flex: 1 }}>
          <TextField
            fieldClassName="ds-u-margin-y--0"
            labelClassName="ds-u-display--none"
            label="Search"
            name="SubmenuSearch"
          />
        </div>
        <Button>Search</Button>
      </div>
    );

    return (
      // Add min-height so the options don't get cut off when switching to product-de
      <div style={{ minHeight: 679 }}>
        <h6 className="preview__label">Minimal</h6>
        <Header initialLanguage={locale} hideLoginLink hideLanguageSwitch />
        <h6 className="preview__label">Logged-Out</h6>
        <Header initialLanguage={locale} submenuTop={<SampleLearnSubmenu />} />
        <h6 className="preview__label">Logged-In</h6>
        <Header loggedIn firstName="Maximiliano-Longname" initialLanguage={locale} />
        <h6 className="preview__label">Direct Enrollment - Logged-In with Custom Links</h6>
        <Header
          loggedIn
          deConsumer
          deBrokerName="Acme Co."
          initialLanguage={locale}
          links={customLinks}
        />
        <h6 className="preview__label">Header - Bottom</h6>
        <Header
          loggedIn
          headerBottom={HeaderBottomMessage}
          initialLanguage={locale}
          links={customLinks}
        />
        <div className={wrapperClassNames}>{this.renderHeaderToggles()}</div>
      </div>
    );
  }
}

ReactDOM.render(<HeaderExample />, document.getElementById('js-example'));
