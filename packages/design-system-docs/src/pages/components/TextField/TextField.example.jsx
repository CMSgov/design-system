import { Button, TextField } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <div className="ds-l-container focus-styles">
    <h1>Outline - solid</h1>
    <div className="focus-1 ds-l-row">
      <div className="ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
      <div className="example--wrapper example--inverse ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
            inversed
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
    </div>

    <h1>Outline - dashed</h1>
    <div className="focus-5 ds-l-row">
      <div className="ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
      <div className="example--wrapper example--inverse ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
            inversed
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
    </div>

    <h1>Outline - Double solid</h1>
    <div className="focus-6 ds-l-row">
      <div className="ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
      <div className="example--wrapper example--inverse ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
            inversed
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
    </div>

    <h1>Background color</h1>
    <div className="focus-2 ds-l-row">
      <div className="ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
      <div className="example--wrapper example--inverse ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
            inversed
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
    </div>

    <h1>Background color + border</h1>
    <div className="focus-3 ds-l-row">
      <div className="ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>

      <div className="example--wrapper example--inverse ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
            inversed
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
    </div>

    <h1>Background color + dashed outline</h1>
    <div className="focus-4 ds-l-row">
      <div className="ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
      <div className="example--wrapper example--inverse ds-l-col--6">
        <p>
          <TextField
            defaultValue="Example value"
            label="Single line field"
            labelClassName="ds-u-margin-top--0"
            name="single_example"
            inversed
          />
        </p>
        <p>
          <Button variation="primary">Button</Button>
        </p>
        <p>
          <a href="https://design.cms.gov">This is a text link</a> on a light background.
        </p>
      </div>
    </div>
  </div>,
  document.getElementById('js-example')
);
