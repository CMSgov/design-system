jest.mock('../savePage', () => {
  return jest.fn(page => Promise.resolve(page));
});
const generateHtmlExample = require('../generateHtmlExample');

describe('generateHtmlExample', () => {
  let pageData;

  beforeEach(() => {
    pageData = {
      header: 'Button',
      reference: 'components.button',
      markup: '<button>Foo</button>'
    };
  });

  describe('with no modifier', () => {
    it('generates correctly', async function() {
      const output = await generateHtmlExample(pageData, null, 'docs', '');
      expect(output).toMatchSnapshot();
    });
  });

  describe('with modifier', () => {
    it('generates correctly', async function() {
      const output = await generateHtmlExample(pageData, { name: 'primary' }, 'docs', '');
      expect(output).toMatchSnapshot();
    });
  });
});
