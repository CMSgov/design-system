import getHexBackgroundColor from '../getHexBackgroundColor';

function createNode(color) {
  const el = document.createElement('div');

  if (color) {
    el.style.backgroundColor = color;
  }

  return el;
}

describe('getHexBackgroundColor', () => {
  it('returns HEX value', () => {
    const hex = getHexBackgroundColor(createNode('rgb(255, 0, 0)'));
    expect(hex).toBe('#FF0000');
  });

  it('returns null when color is transparent', () => {
    const hex = getHexBackgroundColor(createNode('rgba(0, 0, 0, 0)'));
    expect(hex).toBeUndefined();
  });

  it('returns null when color is not set', () => {
    const hex = getHexBackgroundColor(createNode());
    expect(hex).toBeUndefined();
  });
});
