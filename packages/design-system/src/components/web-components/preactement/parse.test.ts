import { h } from 'preact';
import { render } from '@testing-library/preact';
import { templateToPreactVNode } from './parse';

const testHeading = 'testHeading';
const testWhitespace = '<span><strong>Hello</strong>   world</span>';
const testHtml = `<h1>${testHeading}</h1><br /><section><h2 title="Main Title">Hello</h2></section>`;
const testScript = `<script>alert('danger')</script>`;

function makeTemplate(html: string) {
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;
}

describe('parse', () => {
  describe('parseHtml()', () => {
    it('should correctly handle misformed html', () => {
      const testText = 'testText';
      const { vnode } = templateToPreactVNode(makeTemplate(`<h1>${testText}`));
      const { container } = render(vnode);
      expect(container.innerHTML).toEqual(`<h1>${testText}</h1>`);
    });

    it('retains whitespace within custom element', () => {
      const { vnode } = templateToPreactVNode(makeTemplate(testWhitespace));
      const { container } = render(vnode);
      expect(container.innerHTML).toEqual(testWhitespace);
    });

    it('removes script blocks for security', () => {
      const { vnode } = templateToPreactVNode(makeTemplate(testScript));
      const { container } = render(vnode);
      expect(container.textContent).toEqual('');
    });

    it('correctly converts an HTML string into a VDom tree', () => {
      const { vnode } = templateToPreactVNode(makeTemplate(testHtml));
      const { container } = render(vnode);
      expect(container.querySelector('h1').textContent).toEqual(testHeading);
    });

    describe('slots', () => {
      it('should remove <* slot="{key}"> and apply to props', () => {
        const testKey = 'testSlot';
        const slotValue = 'slotValue';
        const slotHtml = `<em slot="${testKey}">${slotValue}</em>`;
        const headingHtml = `<h1>${testHeading}</h1>`;
        const testHtml = `<section>${headingHtml}${slotHtml}</section>`;

        const template = makeTemplate(testHtml);
        const { vnode, slots } = templateToPreactVNode(template);
        const { container } = render(vnode);

        expect(container.innerHTML).toEqual(`<section>${headingHtml}</section>`);
        expect(slots).toEqual({ [testKey]: slotValue });
      });

      it('should ignore slots of nested custom elements', () => {
        const testHtml = `
          <section>
            <div slot="parent-slot">Hello</div>
            <ds-choice>
              <div slot="checked-children">
                Hello world
              </div>
            </ds-choice>
          </section>
        `;

        const template = makeTemplate(testHtml);
        const { vnode, slots } = templateToPreactVNode(template);
        const { container } = render(vnode);

        expect(container.querySelector('[slot="parent-slot"]')).not.toBeInTheDocument();
        expect(container.querySelector('[slot="checked-children"]')).toBeInTheDocument();
        expect(slots).toEqual({ parentSlot: 'Hello' });
      });
    });
  });
});
