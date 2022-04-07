import React from 'react';
import ReactDOMServer from 'react-dom/server';

export function getRenderedTextContent(reactNode: string | React.ReactNode): string {
  if (typeof reactNode === 'string') {
    return reactNode;
  } else if (typeof reactNode === 'number' || typeof reactNode === 'boolean') {
    return reactNode.toString();
  }

  const staticHtml = ReactDOMServer.renderToStaticMarkup(<>{reactNode}</>);
  // TODO: Parse this to only get the textContent
  return staticHtml;
}
