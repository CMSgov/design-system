import React from 'react';
import ReactDOMServer from 'react-dom/server';

export function getRenderedTextContent(reactNode: string | React.ReactNode): string {
  if (typeof reactNode === 'string') {
    // Short circuit if we already have a string
    return reactNode;
  }

  const staticHtml = ReactDOMServer.renderToStaticMarkup(<>{reactNode}</>);
  const el = document.createElement('span');
  el.innerHTML = staticHtml;
  return el.textContent;
}
