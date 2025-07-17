import { act, render } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import { ComponentFactory, h } from 'preact';
import { define } from './define';

/* -----------------------------------
 *
 * Promises
 *
 * -------------------------------- */

function flushPromises() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/* -----------------------------------
 *
 * Component
 *
 * -------------------------------- */

interface MessageProps {
  customTitle?: string;
  value: string;
  children?: any;
}
function Message({ customTitle, value, children }: MessageProps) {
  return (
    <>
      {customTitle && <h2>{customTitle}</h2>}
      <em>{value}</em>
      {children}
    </>
  );
}
define('basic-message', () => Message, { attributes: ['custom-title', 'value'] });
define('shadow-message', () => Message, { shadow: true, attributes: ['custom-title', 'value'] });

interface DescriptionPairProps {
  term: string;
  children: any;
}
function DescriptionPair({ term, children }: DescriptionPairProps) {
  return (
    <>
      <dt>{term}</dt>
      <dd>{children}</dd>
    </>
  );
}
define('description-pair', () => DescriptionPair, { attributes: ['term'] });

/* -----------------------------------
 *
 * Define
 *
 * -------------------------------- */

describe('define()', () => {
  const { document } = globalThis;
  const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  describe('when run in the browser', () => {
    let root: HTMLDivElement;

    beforeEach(() => {
      root = document.createElement('div');
      document.body.appendChild(root);
    });

    afterEach(() => {
      document.body.removeChild(root);
    });

    it('validates tag name value with prefix if needed', () => {
      const props = { value: 'propsValue' };

      const element = document.createElement('basic-message');
      element.setAttribute('props', JSON.stringify(props));
      root.appendChild(element);

      expect(root.innerHTML).toContain(`<em>${props.value}</em>`);
    });

    it('renders component correctly when from props attribute', async () => {
      const props = { value: 'propsValue' };

      const element = document.createElement('basic-message');
      element.setAttribute('props', JSON.stringify(props));
      root.appendChild(element);

      expect(root.innerHTML).toContain(`<em>${props.value}</em>`);
    });

    it('renders component correctly when from json script block', async () => {
      const props = { value: 'jsonValue' };
      const json = `<script type="application/json">${JSON.stringify(props)}</script>`;

      const element = document.createElement('basic-message');
      element.innerHTML = json;
      root.appendChild(element);

      expect(root.innerHTML).toContain(`<em>${props.value}</em>`);
    });

    it('sets contained HTML as children prop when not server rendered', async () => {
      const props = { value: 'childMarkup' };
      const json = `<script type="application/json">${JSON.stringify(props)}</script>`;
      const html = '<p data-title="test">Testing</p><br><button title="test">Click here</button>';

      const element = document.createElement('basic-message');
      element.innerHTML = json + html;
      root.appendChild(element);

      expect(root.innerHTML).toContain(`<em>${props.value}</em>${html}`);
    });

    it('does not use contained HTML if server rendered', async () => {
      const props = { value: 'serverRender' };
      const json = `<script type="application/json">${JSON.stringify(props)}</script>`;
      const html = '<p>Server rendered!</p><button>Click here</button>';

      const element = document.createElement('basic-message');
      element.setAttribute('server', '');
      element.innerHTML = json + html;
      root.appendChild(element);

      expect(root.innerHTML).toContain(`<em>${props.value}</em>`);
    });

    it('renders component asynchronously when provided', async () => {
      const props = { value: 'asyncValue' };
      const json = `<script type="application/json">${JSON.stringify(props)}</script>`;

      define('message-five', () => Promise.resolve(Message));

      const element = document.createElement('message-five');
      element.innerHTML = json;
      root.appendChild(element);

      await flushPromises();

      expect(root.innerHTML).toContain(`<em>${props.value}</em>`);
    });

    it('tries to infer the component if not explicitly returned', async () => {
      const props = { value: 'inferValue' };
      const json = `<script type="application/json">${JSON.stringify(props)}</script>`;

      define('message-six', () => Promise.resolve({ MessageSix: Message }));

      const element = document.createElement('message-six');
      element.innerHTML = json;
      root.appendChild(element);

      await flushPromises();

      expect(root.innerHTML).toContain(`<em>${props.value}</em>`);
    });

    it('merges defined attributes in array with component props', () => {
      const customTitle = 'customTitle';
      const props = { value: 'attrProps' };
      const json = `<script type="application/json">${JSON.stringify(props)}</script>`;

      define('message-seven', () => Message, { attributes: ['custom-title'] });

      const element = document.createElement('message-seven');
      element.setAttribute('custom-title', customTitle);
      element.innerHTML = json;

      root.appendChild(element);

      expect(root.innerHTML).toContain(`<h2>${customTitle}</h2><em>${props.value}</em>`);
    });

    it('errors if component cannot be found in function', async () => {
      define('message-eight', () => Promise.resolve({ Message }));

      const element = document.createElement('message-eight');
      root.appendChild(element);

      await flushPromises();

      expect(errorSpy).toBeCalled();
      expect(element.innerHTML).toEqual('');
    });

    it('updates component props when attributes are changed', async () => {
      const originalTitle = 'original';
      const updatedTitle = 'updated!';
      const html = '<button>Click here</button>';

      define('message-nine', () => Message, { attributes: ['custom-title'] });

      const element = document.createElement('message-nine');
      element.setAttribute('custom-title', originalTitle);
      element.innerHTML = html;
      root.appendChild(element);
      expect(root.innerHTML).toContain(`<h2>${originalTitle}</h2><em></em>${html}`);

      await act(async () => {
        element.setAttribute('custom-title', updatedTitle);
      });
      expect(root.innerHTML).toContain(`<h2>${updatedTitle}</h2><em></em>${html}`);
    });

    it('updates component props when `props` attribute is changed', async () => {
      const originalTitle = 'original';
      const updatedTitle = 'updated!';
      const html = '<button>Click here</button>';

      define('message-nine-and-a-half', () => Message, { attributes: ['custom-title'] });

      const element = document.createElement('message-nine-and-a-half');
      element.setAttribute('props', JSON.stringify({ customTitle: originalTitle }));
      element.innerHTML = html;
      root.appendChild(element);
      expect(root.innerHTML).toContain(`<h2>${originalTitle}</h2><em></em>${html}`);

      await act(async () => {
        element.setAttribute('props', JSON.stringify({ customTitle: updatedTitle }));
      });
      expect(root.innerHTML).toContain(`<h2>${updatedTitle}</h2><em></em>${html}`);
    });

    it('wraps component in an HOC if provided', () => {
      const props = { value: 'wrapComponent' };
      const json = `<script type="application/json">${JSON.stringify(props)}</script>`;

      const wrapComponent = (child: ComponentFactory<any>) => (props: any) =>
        h('section', {}, h(child, props));

      define('message-ten', () => Message, { wrapComponent });

      const element = document.createElement('message-ten');
      element.innerHTML = json;
      root.appendChild(element);

      expect(root.innerHTML).toContain(`<section><em>${props.value}</em></section>`);
    });

    it('correctly passes props through formatProps if provided', () => {
      const props = { Value: 'formatProps' };
      const json = `<script type="application/json">${JSON.stringify(props)}</script>`;

      const formatProps = (props: any) => {
        const keys = Object.keys(props);

        return keys.reduce<any>((result, key) => {
          result[key.toLowerCase()] = props[key];

          return result;
        }, {});
      };

      define('message-eleven', () => Message, { formatProps });

      const element = document.createElement('message-eleven');
      element.innerHTML = json;
      root.appendChild(element);

      expect(root.innerHTML).toContain(`<em>${props.Value}</em>`);
    });

    it('correctly segments <* slot="{key}" /> elements into props', () => {
      const customTitle = '<em>customTitle</em>';
      const html = `<div slot="customTitle">${customTitle}</div>`;

      const element = document.createElement('basic-message');
      element.innerHTML = html;
      root.appendChild(element);

      expect(root.innerHTML).toContain(`<h2>${customTitle}</h2><em></em>`);
    });

    it('correctly caches children when moved in the DOM', () => {
      const customTitle = '<em>customTitle</em>';
      const customText = 'Lorem ipsum dolor';
      const html = `<div slot="customTitle">${customTitle}</div><p>${customText}</p>`;

      const element = document.createElement('basic-message');
      const wrapper = document.createElement('main');
      element.innerHTML = html;
      root.appendChild(element);

      element.remove();

      expect(root.innerHTML).toContain('');

      root.appendChild(wrapper);
      wrapper.appendChild(element);

      expect(root.innerHTML).toContain(`<h2>${customTitle}</h2><em></em><p>${customText}</p>`);
    });

    it('renders child HTML', () => {
      const term = 'supercalifragilisticexpialidocious';
      const html = 'Something to say when the <a href="#cat">cat\'s got your tongue</a>';

      const element = document.createElement('description-pair');
      // @ts-ignore
      element.term = term;
      element.innerHTML = html;
      root.appendChild(element);

      expect(root.querySelector('a')).toBeInTheDocument();
      expect(root.querySelector('description-pair')).toMatchSnapshot();
    });

    it('responds to replacement of child HTML', async () => {
      const term = 'supercalifragilisticexpialidocious';
      const html1 = 'Something to say when the <a href="#cat">cat\'s got your tongue</a>';
      const html2 = 'The biggest word you ever heard';

      const element = document.createElement('description-pair');
      // @ts-ignore
      element.term = term;
      element.innerHTML = html1;
      root.appendChild(element);

      expect(root.querySelector('a')).toBeInTheDocument();

      await act(async () => {
        element.innerHTML = html2;
      });
      expect(root.querySelector('dd').textContent).toEqual(html2);
      expect(root.querySelector('a')).not.toBeInTheDocument();
    });

    it('responds to late additions of direct children', async () => {
      const term = 'supercalifragilisticexpialidocious';
      const html = 'Something to say when the <a href="#cat">cat\'s got your tongue</a>';

      const element = document.createElement('description-pair');
      // @ts-ignore
      element.term = term;
      root.appendChild(element);

      expect(root.querySelector('a')).not.toBeInTheDocument();

      await act(async () => {
        element.innerHTML = html;
      });

      const dd = root.querySelector('dd');
      expect(dd).toBeInTheDocument();
      expect(dd.querySelector('a')).toBeInTheDocument();
    });

    it('supports shadow dom option', () => {
      const html = `
        <span slot="custom-title">Really <em>special</em> title</span>
        Hello world
      `;

      const element = document.createElement('shadow-message');
      // @ts-ignore
      element.value = 'July 4th';
      element.innerHTML = html;

      root.appendChild(element);
      expect(element.innerHTML).toMatchSnapshot();
      expect(element.shadowRoot.innerHTML).toMatchSnapshot();
    });

    it('shadow version responds to late additions of direct children', async () => {
      const element = document.createElement('shadow-message');
      root.appendChild(element);

      expect(element.shadowRoot.querySelector('h2')).toBeNull();

      await act(async () => {
        element.innerHTML = `
        <span slot="custom-title">Really <em>special</em> title</span>
        Hello world
      `;
      });

      expect(element.shadowRoot.querySelector('h2')).toContainHTML(
        '<slot name="custom-title"></slot>'
      );
    });

    it('creates custom events', async () => {
      const user = userEvent.setup();
      const fieldId = 'custom-events-field';
      const CustomEventsComponent = (props) => (
        <div>
          <input type="text" onChange={props.onChange} onBlur={props.onBlur} id={fieldId} />
        </div>
      );
      define('message-custom-events', () => CustomEventsComponent, {
        events: [
          'onBlur',
          [
            'onChange',
            (event: React.MouseEvent) => ({
              ...event,
              detail: { target: event.target, anExtraProperty: true },
            }),
          ],
        ],
      });

      const element = document.createElement('message-custom-events');
      const onBlur = jest.fn();
      const onChange = jest.fn();
      element.addEventListener('ds-blur', onBlur);
      element.addEventListener('ds-change', onChange);

      root.appendChild(element);

      const field = root.querySelector(`#${fieldId}`);

      expect(onBlur).not.toHaveBeenCalled();
      expect(onChange).not.toHaveBeenCalled();

      await user.click(field);
      await user.keyboard('hello');
      await user.tab();
      expect(onChange).toHaveBeenCalled();
      expect(onChange.mock.lastCall[0].target).toEqual(element);
      expect(onChange.mock.lastCall[0].detail.target).toEqual(field);
      expect(onChange.mock.lastCall[0].detail.target.value).toEqual('hello');
      expect(onChange.mock.lastCall[0].detail.anExtraProperty).toEqual(true);
      expect(onBlur).toHaveBeenCalled();
      expect(onBlur.mock.lastCall[0].target).toEqual(element);
      expect(onBlur.mock.lastCall[0].detail.target).toEqual(field);
      expect(onBlur.mock.lastCall[0].detail.anExtraProperty).not.toBeDefined();
    });
  });

  describe('when run on the server', () => {
    let originalWindow;

    beforeAll(() => {
      originalWindow = globalThis.window;
      delete (globalThis as any).window;
    });

    afterAll(() => {
      globalThis.window = originalWindow;
    });

    // TODO: Reintroduce this test once https://github.com/testing-library/user-event/pull/1176/ is released
    it.skip('returns the correct markup', () => {
      const props = { value: 'serverValue' };
      const component = define('message-fourteen', () => Message);

      const { container } = render(h(component, props) as any);
      expect(container.querySelectorAll('message-fourteen').length).toEqual(1);
      expect(container.querySelector('message-fourteen').getAttribute('server')).toEqual('true');
      expect(container.querySelector('em').textContent).toEqual(props.value);
    });

    // TODO: Reintroduce this test once https://github.com/testing-library/user-event/pull/1176/ is released
    it.skip('throws an error when used with a promise', () => {
      expect(() => define('message-fifteen', () => Promise.resolve(Message))).toThrow();
    });

    // TODO: Reintroduce this test once https://github.com/testing-library/user-event/pull/1176/ is released
    it.skip('includes a json script block with props', () => {
      const props = { value: 'serverValue' };
      const component = define('message-sixteen', () => Message);

      const { container } = render(h(component, props));

      expect(container.querySelector('script').textContent).toEqual(JSON.stringify(props));
    });
  });
});
