import React from 'react';
import Page from '../../scripts/components/Page';
import { PreviewTemplateComponentProps } from 'netlify-cms-core';

const GuidancePagePreview = ({ entry, widgetFor }: PreviewTemplateComponentProps) => {
  const title = entry.getIn(['data', 'title']);
  const body = widgetFor('body');
  return <Page view="guidance" header={title} description={body} />;
};

export default GuidancePagePreview;
