import { Footer } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';
import URL from 'url-parse';

class FooterExample extends React.PureComponent {
  constructor() {
    super();
    this.url = new URL(window.location.href, true);
    this.locale = this.url.query.locale || 'en';
  }

  changeExample(params) {
    const query = Object.assign({}, this.url.query);

    // Reload the example to force it to reset its variation
    Object.getOwnPropertyNames(params).forEach((name) => {
      query[name] = params[name];
    });

    this.url.set('query', query);
    window.location = this.url.toString();
  }

  renderFooterToggles() {
    const locales = {
      en: 'English',
      es: 'Español',
    };

    return (
      <div className="ds-u-margin-top--4">
        <h2 className="ds-h6">Change language</h2>
        {Object.getOwnPropertyNames(locales).map((name) => (
          <button
            disabled={this.locale === name}
            key={name}
            onClick={() => this.changeExample({ locale: name })}
          >
            {locales[name]}
          </button>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Footer initialLanguage={this.locale} />
        {this.renderFooterToggles()}
      </div>
    );
  }
}

ReactDOM.render(<FooterExample />, document.getElementById('js-example'));
