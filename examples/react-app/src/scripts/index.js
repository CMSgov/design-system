// Named import from main entry file. This example has been configured to use Webpack's tree shaking
// to only bundle imported components. Without this optimization, all components will be imported
// your build process.
import {
  Alert,
  HelpDrawer,
  HelpDrawerToggle,
  TextField,
  ThirdPartyExternalLink,
  UsaBanner,
} from '@cmsgov/ds-medicare-gov';
import { useState } from 'react';
import ReactDOM from 'react-dom';

const Example = function () {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <UsaBanner />
      <header className="ds-base--inverse ds-u-padding-y--3">
        <div className="ds-l-container">
          <span className="ds-text-heading--xl">ExampleWebsite.gov</span>
        </div>
      </header>

      <div className="ds-l-container ds-u-padding-top--2">
        <div className="ds-u-measure--base">
          <h1 className="ds-text-heading--3xl">React-app example</h1>
          <Alert heading="Hello world">
            <p className="ds-c-alert__text">You did it! You&rsquo;ve ran the example.</p>
            {open && (
              <HelpDrawer
                footerTitle="Footer Title"
                footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
                heading="Drawer Heading"
                onCloseClick={() => setOpen(false)}
                hasFocusTrap={true}
              >
                Test
              </HelpDrawer>
            )}
            <HelpDrawerToggle
              showDrawer={() => setOpen(true)}
              helpDrawerOpen={open}
              className="ds-u-margin-top--2"
            >
              Learn more
            </HelpDrawerToggle>
          </Alert>
          <TextField
            name="hello"
            label="Hello world"
            errorMessage="I should be below the text field on healthcare.gov"
          />
          <p className="ds-u-margin-y--2">
            <ThirdPartyExternalLink href="https://www.zombo.com/">Zombo COM</ThirdPartyExternalLink>
          </p>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Example />, document.querySelector('#jsx-root'));
