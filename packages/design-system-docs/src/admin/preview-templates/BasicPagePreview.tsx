import React from 'react';
import Page from '../../scripts/components/Page';
import { PreviewTemplateComponentProps } from 'netlify-cms-core';

function replaceTemplateTags(content: string) {
  const { rootPath, npmPackage, githubUrl, name } = process.env;
  return content
    .replace('{{root}}', rootPath ? `/${rootPath}` : '')
    .replace('{{npm}}', npmPackage ? `${npmPackage}` : '')
    .replace('{{github}}', githubUrl ? `${githubUrl}` : '')
    .replace('{{name}}', name ? `${name}` : '');
}

const BasicPagePreview = (props: PreviewTemplateComponentProps) => {
  const title = props.entry.getIn(['data', 'title']);
  const body = props.widgetFor('body');

  // This would work if our page-rendering components were refactored to handle raw markdown
  // const body = replaceTemplateTags(props.entry.getIn(['data', 'body']));

  return (
    <div className="ds-base">
      <Page header={title} description={body} />
    </div>
  );
};

export default BasicPagePreview;
