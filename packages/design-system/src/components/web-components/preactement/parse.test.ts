import { h } from 'preact';
import { render } from '@testing-library/preact';
import { parseHtml } from './parse';

const testHeading = 'testHeading';
const testWhitespace = '    ';
const testHtml = `<h1>${testHeading}</h1><br /><section><h2 title="Main Title">Hello</h2></section>`;
const testScript = `<script>alert('danger')</script>`;

describe('parse', () => {
  describe('parseHtml()', () => {
    it('should correctly handle misformed html', () => {
      const testText = 'testText';
      const result = parseHtml.call({ innerHTML: `<h1>${testText}` });
      const { container } = render(result);

      expect(container.innerHTML).toEqual(`<h1>${testText}</h1>`);
    });

    it('handles text values witin custom element', () => {
      const result = parseHtml.call({ innerHTML: testHeading });
      const { container } = render(result);

      expect(container.textContent).toEqual(testHeading);
    });

    it('retains whitespace within custom element', () => {
      const result = parseHtml.call({ innerHTML: testWhitespace });
      const { container } = render(result);

      expect(container.textContent).toEqual(testWhitespace);
      expect(container.innerHTML).toEqual(testWhitespace);
    });

    it('removes script blocks for security', () => {
      const result = parseHtml.call({ innerHTML: testScript });
      const { container } = render(result);

      expect(container.textContent).toEqual('');
    });

    it('correctly converts an HTML string into a VDom tree', () => {
      const result = parseHtml.call({ innerHTML: testHtml });
      const { container } = render(result);

      expect(container.querySelector('h1').textContent).toEqual(testHeading);
    });

    describe('slots', () => {
      const testKey = 'testSlot';

      it('should remove <* slot="{key}"> and apply to props', () => {
        const slots = {};
        const slotValue = 'slotValue';

        const slotHtml = `<em slot="${testKey}">${slotValue}</em>`;
        const headingHtml = `<h1>${testHeading}</h1>`;
        const testHtml = `<section>${headingHtml}${slotHtml}</section>`;

        const result = parseHtml.call({ innerHTML: testHtml, __slots: slots });
        const { container } = render(result);

        expect(container.innerHTML).toEqual(`<section>${headingHtml}</section>`);
        expect(slots).toEqual({ [testKey]: slotValue });
      });
    });
  });
});
