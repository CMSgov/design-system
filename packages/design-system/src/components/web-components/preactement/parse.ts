import { h, Fragment, VNode } from 'preact';
import { getAttributeObject, selfClosingTags, getPropKey } from './shared';

type Slots = { [k: string]: VNode<any> | string };
type VNodeInfo = { vnode: VNode<any> | string | null; slots: Slots };

export function templateToPreactVNode(template: HTMLTemplateElement): VNodeInfo {
  const slots = {};
  const childVNodes = [];
  for (const childElement of template.content.children) {
    const { vnode, slots: childSlots } = nodeToPreactVNode(childElement, slots);
    Object.assign(slots, childSlots);
    childVNodes.push(vnode);
  }
  const vnode = h(Fragment, {}, childVNodes);
  return { vnode, slots };
}

function nodeToPreactVNode(node: Node, slots: Slots = {}): VNodeInfo {
  if (node.nodeType === 3) {
    return { vnode: node.textContent || '', slots };
  }

  if (node.nodeType !== 1) {
    return { vnode: null, slots };
  }

  const nodeName = String(node.nodeName).toLowerCase();
  // if (nodeName === 'template') {
  //   const templateVNode = templateToPreactVNode(node as HTMLTemplateElement).vnode
  //   return {
  //     vnode: h(nodeName, getAttributeObject((node as Element).attributes), templateVNode),
  //     slots
  //   }
  // }
  const childNodes = Array.from(node.childNodes);
  const children = [];
  for (const childNode of childNodes) {
    const { vnode, slots: childSlots } = nodeToPreactVNode(childNode, slots);
    Object.assign(slots, childSlots);
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

function getSlotChildren(children: Array<VNode | string | null>) {
  const isString = (item) => typeof item === 'string';

  if (children.every(isString)) {
    return children.join(' ');
  }

  return h(Fragment, {}, children);
}
