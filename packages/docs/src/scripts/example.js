// This only gets loaded on the example pages
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import getHexBackgroundColor from './helpers/getHexBackgroundColor';

// Provide React modules as a global, so these aren't bundled in each
// React example's inline script
window.React = React;
window.ReactDOM = ReactDOM;

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

// Only used in the modal dialog size variant example
function setModalExamples() {
  const dialog = document.getElementById('dialog');
  const dialogTitle = document.getElementById('dialog-title');
  const dialogWrap = document.getElementById('dialog-wrap');

  document.querySelectorAll('.dialog-open-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dialog.classList.add(btn.dataset.type);
      dialogTitle.textContent = btn.dataset.title;
      dialogWrap.classList.remove('ds-u-display--none');
    });
  });
  document.querySelectorAll('.dialog-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      dialog.className = 'ds-c-dialog';
      dialogWrap.classList.add('ds-u-display--none');
    });
  });
}

setSwatchHexValues();
setModalExamples();
