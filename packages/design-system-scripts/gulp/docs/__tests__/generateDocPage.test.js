jest.mock('../generatePages/savePage', () => {
  return jest.fn((page) => Promise.resolve(page));
});
const generateDocPage = require('../generatePages/generateDocPage');

describe('generateDocPage', () => {
  let output;
  let pageData;
  const routes = [
    {
      defaultCollapsed: true,
      id: '',
      items: [],
      label: 'Introduction',
      url: '/',
    },
    {
      defaultCollapsed: true,
      id: 'getting-started',
      items: [],
      label: 'Getting started',
      url: '/getting-started',
    },
  ];

  beforeEach(async function () {
    pageData = {
      header: 'Button',
      description: '<p>Use buttons to signal actions.</p>',
      reference: 'components.button',
      referenceNumber: '1.3',
      referenceURI: 'components/button',
      weight: 0,
      markup: '<button>Foo</button>',
      source: {
        filename: 'components/Button/Button.scss',
        path: 'packages/core/src/components/Button/Button.scss',
      },
      depth: 2,
      modifiers: [],
      sections: [],
      uswds: 'https://designsystem.digital.gov/components/buttons',
      parentReference: 'components',
    };

    output = await generateDocPage(routes, pageData, 'docs', '');
  });

  it('renders React content', () => {
    expect(output.body).toMatch(pageData.description);
  });

  it('includes page data', () => {
    expect(output.body).toMatch(JSON.stringify(pageData));
  });

  it('includes routes data', () => {
    expect(output.body).toMatch(JSON.stringify(routes));
  });

  it('generates correct head and uri', () => {
    // Remove body, since it is likely to change often as the
    // <Docs> component evolves
    delete output.body;

    expect(output).toMatchSnapshot();
  });
});
