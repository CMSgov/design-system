import React from 'react';
import UsaBanner from './UsaBanner';
import { fireEvent, render, screen, prettyDOM } from '@testing-library/react';

function renderBanner(customProps = {}) {
  const props = Object.assign({}, customProps);
  return render(<UsaBanner {...props} />);
}

/**
 * https://github.com/testing-library/dom-testing-library/blob/460115a471bcbd7e963f2751f7544bfe6f10f828/src/pretty-dom.js#L14-L25
 */
function filterOutElements(tagNames, container) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
  const ELEMENT_NODE = 1;

  const matchString = tagNames.join(', ');
  const filteredHtml = prettyDOM(container, undefined, {
    filterNode: (node) => node.nodeType !== ELEMENT_NODE || !node.matches(matchString),
  });
  return filteredHtml;
}

function expectMatchesSnapshot(container) {
  expect(filterOutElements(['path', 'circle'], container)).toMatchSnapshot();
}

describe('UsaBanner', function () {
  it('renders correctly', () => {
    const { container } = renderBanner();
    // expect(asFragment()).toMatchSnapshot();
    expectMatchesSnapshot(container);
  });

  it('applies Spanish translation', () => {
    const { asFragment } = renderBanner({ locale: 'es' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('applies additional class names to expanded banner', () => {
    const { asFragment } = renderBanner();
    const openButton = screen.getByRole('button');
    fireEvent.click(openButton);
    const header = screen.getByLabelText('bannerLabel').querySelector('header');
    expect(header.className).toContain('ds-c-usa-banner__header--expanded');
    expect(asFragment()).toMatchSnapshot();
  });

  // it('adds className to root element', () => {
  //   const data = renderBanner({ className: 'bar' });

  //   expect(data.wrapper.hasClass('bar')).toBe(true);
  // });

  // it('has a unique id', () => {
  //   const banner1 = renderBanner({ id: 'banner_unique' });
  //   const banner2 = renderBanner();
  //   const button1 = banner1.wrapper.find('.ds-c-usa-banner__button').first();
  //   const content1 = banner1.wrapper.find('.ds-c-usa-banner__content').first();
  //   const content2 = banner2.wrapper.find('.ds-c-usa-banner__content').first();

  //   expect(button1.prop('aria-controls')).toBe(content1.prop('id'));
  //   expect(content1.prop('id')).not.toBe(content2.prop('id'));
  // });
});
