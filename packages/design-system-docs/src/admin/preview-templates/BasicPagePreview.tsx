import React from 'react';
import Page from '../../scripts/components/Page';
import { PreviewTemplateComponentProps } from 'netlify-cms-core';

const BasicPagePreview = ({ entry, widgetFor }: PreviewTemplateComponentProps) => {
  const title = entry.getIn(['data', 'title']);
  const body = widgetFor('body');
  return (
    <div className="ds-base">
      <Page header={title} description={body} />
    </div>
  );
};

export default BasicPagePreview;
