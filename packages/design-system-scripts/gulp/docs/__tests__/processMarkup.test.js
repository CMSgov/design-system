// Mock mz/fs module before requiring it
jest.mock('mz/fs', () => {
  return {
    readFile: jest.fn((filename) => Promise.resolve(`${filename} contents`)),
  };
});

const fs = require('mz/fs');
const processMarkup = require('../generatePages/processMarkup');

function createPage(markup = '') {
  return {
    markup: markup,
    source: {
      path: 'foo.scss',
    },
  };
}

describe('processMarkup', () => {
  it('handles null markup', () => {
    const page = createPage(null);

    return processMarkup(page).then((data) => {
      expect(data.markup).toBeNull();
    });
  });

  it('processes template tags', () => {
    const page = createPage('{{root}}/bar');

    return processMarkup(page, { rootPath: 'foo' }).then((data) => {
      expect(data.markup).toBe('/foo/bar');
    });
  });

  it('renders EJS tags', () => {
    const page = createPage('<% var foo="bar" %><%= foo %>');

    return processMarkup(page, {}).then((data) => {
      expect(data.markup).toBe('bar');
    });
  });

  it('loads markup from .html file', () => {
    const page = createPage('foo.html');

    return processMarkup(page, {}).then((data) => {
      expect(data.markup).toMatch(/foo\.html contents/);
      expect(fs.readFile.mock.calls.length).toBe(1);
    });
  });
});
