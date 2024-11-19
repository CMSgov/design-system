import { h, Fragment, VNode } from 'preact';
import { getAttributeObject, selfClosingTags, getPropKey } from './shared';

export type Slots = { [k: string]: VNode<any> | string };

/**
 * Takes a template element and converts its content into a Preact VNode and also
 * extracts slot-element information.
 */
export function templateToPreactVNode(template: HTMLTemplateElement): {
  vnode: VNode;
  slots: Slots;
} {
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

/**
 * Recursively converts DOM nodes into Preact VNodes (virtual nodes) and also extracts
 * slot-element information.
 */
export function nodeToPreactVNode(
  node: Node,
  slots: Slots = {},
  insideNestedComponent: boolean = false
): { vnode: VNode<any> | string | null; slots: Slots } {
  if (node.nodeType === 3) {
    return { vnode: node.textContent || '', slots };
  }

  if (node.nodeType !== 1) {
    return { vnode: null, slots };
  }

  const nodeName = String(node.nodeName).toLowerCase();

  if (nodeName === 'template') {
    // If we don't do this, Preact will clobber the information inside this template.
    // I've tried parsing the template.content here, but it didn't work, and that
    // would have been unnecessary processing anyway.
    const templateProps = {
      dangerouslySetInnerHTML: { __html: (node as HTMLTemplateElement).innerHTML },
    };
    return {
      vnode: h(nodeName, templateProps),
      slots,
    };
  }

  if (nodeName.includes('-')) {
    // It's a custom element, we don't want to steal any of its slots.
    insideNestedComponent = true;
  }

  const childNodes = Array.from(node.childNodes);
  const children = [];
  for (const childNode of childNodes) {
    const { vnode, slots: childSlots } = nodeToPreactVNode(childNode, slots, insideNestedComponent);
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
    if (insideNestedComponent) {
      // Leave the element alone and put its slot back!
      return { vnode: h(nodeName, { slot, ...props }, children), slots };
    } else {
      return {
        vnode: null,
        slots: {
          ...slots,
          [getPropKey(slot)]: getSlotChildren(children),
        },
      };
    }
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

export function createSlotVNode(name?: string): VNode {
  return h('slot', { name });
}

export function getSlotNames(element: Element): string[] {
  return Array.from(element.childNodes).flatMap(getSlotNamesFromNode);
}

function getSlotNamesFromNode(node: Node): string[] {
  if (node.nodeType === 3 || node.nodeType !== 1) {
    return [];
  }

  const nodeName = String(node.nodeName).toLowerCase();
  if (nodeName === 'template') {
    return [];
  }

  const slot = (node as Element).getAttribute('slot');

  // Only recurse into child nodes if this is not a custom element, because we don't care
  // what's inside that nested custom element and don't want to steal its slots.
  const isCustomElement = nodeName.includes('-');
  const slotsFromChildren = isCustomElement
    ? []
    : Array.from(node.childNodes).flatMap(getSlotNamesFromNode);

  if (slot) {
    return [slot, ...slotsFromChildren];
  } else {
    return slotsFromChildren;
  }
}
