import debounce from '../../utilities/debounce';

function isScrollable(tableWrapper) {
  return tableWrapper.clientWidth < tableWrapper.scrollWidth;
}

function handleResize() {
  const tableWrappers = document.querySelectorAll('div[class="ds-c-table__wrapper"]');
  if (tableWrappers.length <= 0 || !tableWrappers.length) {
    return;
  }
  tableWrappers.forEach((tableWrapper) => {
    const caption = tableWrapper.getElementsByTagName('caption')[0];
    if (!caption) return;

    const lastChild = caption?.lastElementChild?.tagName;
    if (isScrollable(tableWrapper)) {
      tableWrapper.setAttribute('tabIndex', '0');
      if (!lastChild) {
        caption.insertAdjacentHTML(
          'beforeend',
          '<ds-alert role="status">Scroll using arrow keys to see more.</ds-alert>'
        );
      }
    } else {
      tableWrapper.removeAttribute('tabIndex');
      if (lastChild === 'DS-ALERT') {
        caption.removeChild(caption.lastChild);
      }
    }
  });
}

window.addEventListener('resize', debounce(handleResize, 500));
