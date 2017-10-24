// convert 0..255 R,G,B values to a hexidecimal color string
// https://gist.github.com/lrvick/2080648
function rgbToHex(r, g, b) {
  const bin = (r << 16) | (g << 8) | b;

  return (function(h) {
    return new Array(7 - h.length).join('0') + h;
  })(bin.toString(16).toUpperCase());
}

/**
 * Get the HEX value of an elements background-color
 * @param {Node} el - A Node element
 * @return {String} HEX value
 */
function getHexBackgroundColor(el) {
  const color = window.getComputedStyle(el)['background-color'];
  if (!color) return;

  const rgb = color.match(/([0-9]+)/g);

  if (rgb.length > 3 && parseInt(rgb[3]) === 0) {
    // Color is transparent
    return;
  }

  const hex = rgbToHex.apply(null, rgb);
  return `#${hex}`;
}

export default getHexBackgroundColor;
