import { FilterTag } from '@design-system';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <>
    <FilterTag label="Example filter tag" value="example" removeText="Remove Example Filter Tag" />
    <FilterTag label="Readonly example" readOnly value="example" removeText="Remove" />
    <FilterTag
      label="Example filter tag with long text that will wrap Example filter tag with long text that will wrap Example filter tag with long text that will wrap Example filter tag with long text that will wrap Example filter tag with long text that will wrap"
      value="example"
      removeText="Remove"
    />
  </>,
  document.getElementById('js-example')
);
