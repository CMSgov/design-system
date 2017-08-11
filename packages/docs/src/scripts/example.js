// This only gets loaded on the example pages
'use strict';
import getHexBackgroundColor from './helpers/getHexBackgroundColor';

function setSwatchHexValues() {
  const hexElements = document.querySelectorAll('.js-swatch-hex');

  for (let i = hexElements.length - 1; i >= 0; i--) {
    const el = hexElements[i];
    const swatch = el.parentElement.querySelector('.c-swatch__preview');
    const color = getHexBackgroundColor(swatch);

    if (color) {
      el.textContent = color;
    } else {
      el.classList.add('ds-u-display--none');
    }
  }
}

setSwatchHexValues();
