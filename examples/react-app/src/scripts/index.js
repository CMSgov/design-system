// Named import from main entry file. This example has been configured to use Webpack's tree shaking
// to only bundle imported components. Without this optimization, all components will be imported
// your build process.
import {
  Alert,
  Accordion,
  AccordionItem,
  Button,
  Drawer,
  TextField,
  ThirdPartyExternalLink,
  UsaBanner,
} from '@cmsgov/ds-healthcare-gov';
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
              <Drawer
                footerTitle="Footer Title"
                footerBody={<p className="ds-text ds-u-margin--0">Footer content</p>}
                heading="Drawer Heading"
                onCloseClick={() => setOpen(false)}
                hasFocusTrap={true}
              >
                Test
              </Drawer>
            )}
            <Button onClick={() => setOpen(true)} className="ds-u-margin-top--2">
              Learn more
            </Button>
          </Alert>
          <TextField
            name="hello"
            label="Hello world"
            errorMessage="I should be below the text field on healthcare.gov"
          />
          <p className="ds-u-margin-y--2">
            <ThirdPartyExternalLink href="https://www.zombo.com/">Zombo COM</ThirdPartyExternalLink>
          </p>
          <Accordion>
            <AccordionItem
              key="1"
              contentClassName="first-amendment"
              defaultOpen
              heading="First Amendment"
            >
              <p>
                We the People of the United States, in Order to form a more perfect Union, establish
                Justice, insure domestic Tranquility, provide for the common defence, promote the
                general Welfare, and secure the Blessings of Liberty to ourselves and our Posterity,
                do ordain and establish this Constitution for the United States of America.
              </p>
            </AccordionItem>
            <AccordionItem key="2" defaultOpen heading="Second Amendment">
              <p>
                A well regulated Militia, being necessary to the security of a free State, the right
                of the people to keep and bear Arms, shall not be infringed.
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<Example />, document.querySelector('#jsx-root'));
