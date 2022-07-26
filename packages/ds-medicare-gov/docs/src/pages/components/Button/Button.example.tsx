import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@design-system';

const ButtonExample: FunctionComponent = () => {
  return (
    <div className="button-example">
      <h3 className="preview__label">Default</h3>
      <div className="ds-u-padding--1">
        <span className="ds-u-margin-right--1">
          <Button className="ds-c-button--primary">Primary</Button>
        </span>
        <span className="ds-u-margin-right--1">
          <Button className="ds-c-button--secondary">Secondary</Button>
        </span>
        <span className="ds-u-margin-right--1">
          <Button>Tertiary</Button>
        </span>
        <span className="ds-u-margin-right--1">
          <Button className="ds-c-button--transparent">Transparent</Button>
        </span>
        <span className="ds-u-margin-right--1">
          <Button size="big">Landing Page</Button>
        </span>
      </div>
      <h3 className="preview__label">Inverse</h3>
      <div className="ds-u-fill--primary ds-u-padding--1 ds-u-margin-top--2">
        <span className="ds-u-margin-right--1">
          <Button className="ds-c-button--primary ds-c-button--inverse">Primary</Button>
        </span>
        <span className="ds-u-margin-right--1">
          <Button className="ds-c-button--inverse">Tertiary</Button>
        </span>
        <span className="ds-u-margin-right--1">
          <Button className="ds-c-button--transparent ds-c-button--inverse">Transparent</Button>
        </span>
        <span className="ds-u-margin-right--1">
          <Button size="big" className="ds-c-button--primary ds-c-button--inverse">
            Landing Page
          </Button>
        </span>
      </div>
    </div>
  );
};

ReactDOM.render(<ButtonExample />, document.getElementById('js-example'));
