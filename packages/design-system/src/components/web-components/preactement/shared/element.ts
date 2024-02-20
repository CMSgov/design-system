import { getAttributeProps } from './parse';
import { IComponent, CustomElement } from './model';

/* -----------------------------------
 *
 * Async
 *
 * -------------------------------- */

function getAsyncComponent(component: Promise<IComponent>, tagName: string): Promise<any> {
  return component.then((response) => getComponentResult(response, tagName));
}

/* -----------------------------------
 *
 * Result
 *
 * -------------------------------- */

function getComponentResult(response: IComponent, tagName: string) {
  let result = void 0;

  if (typeof response === 'function') {
    return response;
  }

  if (typeof response === 'object') {
    result = response[getNameFromTag(tagName)] || void 0;
  }

  return result;
}

/* -----------------------------------
 *
 * Element
 *
 * -------------------------------- */

function getElementTag(tagName: string) {
  let result = tagName.toLowerCase();

  if (result.indexOf('-') < 0) {
    result = 'component-' + result;
  }

  return result;
}

/* -----------------------------------
 *
 * Tag
 *
 * -------------------------------- */

function getNameFromTag(value: string) {
  value = value.toLowerCase();

  return value.replace(/(^\w|-\w)/g, (item) => item.replace(/-/, '').toUpperCase());
}

/* -----------------------------------
 *
 * Attributes
 *
 * -------------------------------- */

function getElementAttributes(this: CustomElement) {
  const { attributes = [] } = this.__options;
  const result = {};

  if (!this.hasAttributes()) {
    return result;
  }

  return getAttributeProps(this.attributes, attributes);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { getElementTag, getElementAttributes, getAsyncComponent };
