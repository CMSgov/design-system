import { h, ComponentFactory, Fragment, VNode } from 'preact';
import {
  CustomElement,
  getDocument,
  getAttributeObject,
  selfClosingTags,
  getPropKey,
} from './shared';

/* -----------------------------------
 *
 * parseHtml
 *
 * -------------------------------- */

function parseHtml(this: CustomElement): VNode | string {
  const dom = getDocument(this.innerHTML);

  if (!dom) {
    return void 0;
  }

  const { vnode, slots } = convertToVDom(dom, this.__slots);
  this.__slots = slots;

  return vnode;
}

/* -----------------------------------
 *
 * convertToVDom
 *
 * -------------------------------- */

type Slots = { [k: string]: VNode<any> | string };

function convertToVDom(
  node: Node,
  slots: Slots = {}
): { vnode: VNode<any> | string | null; slots: Slots } {
  if (node.nodeType === 3) {
    return { vnode: node.textContent || '', slots };
  }

  if (node.nodeType !== 1) {
    return { vnode: null, slots };
  }

  const nodeName = String(node.nodeName).toLowerCase();
  const childNodes = Array.from(node.childNodes);
  const children = [];
  for (const childNode of childNodes) {
    const { vnode, slots: childSlots } = convertToVDom(childNode, slots);
    slots = { ...slots, ...childSlots };
    children.push(vnode);
  }

  const { slot, ...props } = getAttributeObject((node as Element).attributes);

  if (nodeName === 'script') {
    return { vnode: null, slots };
  }

  if (nodeName === 'body') {
    return { vnode: h(Fragment, {}, children), slots };
  }

  if (selfClosingTags.includes(nodeName)) {
    return { vnode: h(nodeName, props), slots };
  }

  if (slot) {
    return {
      vnode: null,
      slots: {
        ...slots,
        [getPropKey(slot)]: getSlotChildren(children),
      },
    };
  }

  return { vnode: h(nodeName, props, children), slots };
}

/* -----------------------------------
 *
 * getSlotChildren
 *
 * -------------------------------- */

function getSlotChildren(children: Array<VNode | string | null>) {
  const isString = (item) => typeof item === 'string';

  if (children.every(isString)) {
    return children.join(' ');
  }

  return h(Fragment, {}, children);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { parseHtml };
