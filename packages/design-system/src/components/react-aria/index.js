import $73SJx$react, { useState, useRef, useEffect, useCallback, useMemo, useContext } from 'react';
import $12uGp$clsx from 'clsx';
import { _ as _$1 } from '@swc/helpers/_/_class_private_field_get';
import { _ as _$2 } from '@swc/helpers/_/_class_private_field_init';
import { _ } from '@swc/helpers/_/_class_private_field_set';
import { LocalizedStringFormatter, LocalizedStringDictionary } from '@internationalized/string';
import '@internationalized/date';
import '@internationalized/number';
import 'react-dom';

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $458b0a5536c1a7cf$export$40bfa8c7b0832715(value, defaultValue, onChange) {
  let [stateValue, setStateValue] = useState(value || defaultValue);
  let isControlledRef = useRef(value !== undefined);
  let isControlled = value !== undefined;
  useEffect(() => {
    let wasControlled = isControlledRef.current;
    if (wasControlled !== isControlled)
      console.warn(
        `WARN: A component changed from ${wasControlled ? 'controlled' : 'uncontrolled'} to ${
          isControlled ? 'controlled' : 'uncontrolled'
        }.`
      );
    isControlledRef.current = isControlled;
  }, [isControlled]);
  let currentValue = isControlled ? value : stateValue;
  let setValue = useCallback(
    (value, ...args) => {
      let onChangeCaller = (value, ...onChangeArgs) => {
        if (onChange) {
          if (!Object.is(currentValue, value)) onChange(value, ...onChangeArgs);
        }
        if (!isControlled)
          // If uncontrolled, mutate the currentValue local variable so that
          // calling setState multiple times with the same value only emits onChange once.
          // We do not use a ref for this because we specifically _do_ want the value to
          // reset every render, and assigning to a ref in render breaks aborted suspended renders.
          // eslint-disable-next-line react-hooks/exhaustive-deps
          currentValue = value;
      };
      if (typeof value === 'function') {
        console.warn(
          'We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320'
        );
        // this supports functional updates https://reactjs.org/docs/hooks-reference.html#functional-updates
        // when someone using useControlledState calls setControlledState(myFunc)
        // this will call our useState setState with a function as well which invokes myFunc and calls onChange with the value from myFunc
        // if we're in an uncontrolled state, then we also return the value of myFunc which to setState looks as though it was just called with myFunc from the beginning
        // otherwise we just return the controlled value, which won't cause a rerender because React knows to bail out when the value is the same
        let updateFunction = (oldValue, ...functionArgs) => {
          let interceptedValue = value(isControlled ? currentValue : oldValue, ...functionArgs);
          onChangeCaller(interceptedValue, ...args);
          if (!isControlled) return interceptedValue;
          return oldValue;
        };
        setStateValue(updateFunction);
      } else {
        if (!isControlled) setStateValue(value);
        onChangeCaller(value, ...args);
      }
    },
    [isControlled, currentValue, onChange]
  );
  return [currentValue, setValue];
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $c1d7fb2ec91bae71$var$Item(props) {
  return null;
}
$c1d7fb2ec91bae71$var$Item.getCollectionNode = function* getCollectionNode(props, context) {
  let { childItems: childItems, title: title, children: children } = props;
  let rendered = props.title || props.children;
  let textValue =
    props.textValue || (typeof rendered === 'string' ? rendered : '') || props['aria-label'] || '';
  // suppressTextValueWarning is used in components like Tabs, which don't have type to select support.
  if (
    !textValue &&
    !(context === null || context === void 0 ? void 0 : context.suppressTextValueWarning)
  )
    console.warn(
      '<Item> with non-plain text contents is unsupported by type to select for accessibility. Please add a `textValue` prop.'
    );
  yield {
    type: 'item',
    props: props,
    rendered: rendered,
    textValue: textValue,
    'aria-label': props['aria-label'],
    hasChildNodes: $c1d7fb2ec91bae71$var$hasChildItems(props),
    *childNodes() {
      if (childItems)
        for (let child of childItems)
          yield {
            type: 'item',
            value: child,
          };
      else if (title) {
        let items = [];
        $73SJx$react.Children.forEach(children, (child) => {
          items.push({
            type: 'item',
            element: child,
          });
        });
        yield* items;
      }
    },
  };
};
function $c1d7fb2ec91bae71$var$hasChildItems(props) {
  if (props.hasChildItems != null) return props.hasChildItems;
  if (props.childItems) return true;
  if (props.title && $73SJx$react.Children.count(props.children) > 0) return true;
  return false;
}
// We don't want getCollectionNode to show up in the type definition
let $c1d7fb2ec91bae71$export$6d08773d2e66f8f2 = $c1d7fb2ec91bae71$var$Item;

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $9fc4852771d079eb$var$Section(props) {
  return null;
}
$9fc4852771d079eb$var$Section.getCollectionNode = function* getCollectionNode(props) {
  let { children: children, title: title, items: items } = props;
  yield {
    type: 'section',
    props: props,
    hasChildNodes: true,
    rendered: title,
    'aria-label': props['aria-label'],
    *childNodes() {
      if (typeof children === 'function') {
        if (!items) throw new Error('props.children was a function but props.items is missing');
        for (let item of items)
          yield {
            type: 'item',
            value: item,
            renderer: children,
          };
      } else {
        let items = [];
        $73SJx$react.Children.forEach(children, (child) => {
          items.push({
            type: 'item',
            element: child,
          });
        });
        yield* items;
      }
    },
  };
};
// We don't want getCollectionNode to show up in the type definition
let $9fc4852771d079eb$export$6e2c8f0811a474ce = $9fc4852771d079eb$var$Section;

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
class $eb2240fc39a57fa5$export$bf788dd355e3a401 {
  build(props, context) {
    this.context = context;
    return $eb2240fc39a57fa5$var$iterable(() => this.iterateCollection(props));
  }
  *iterateCollection(props) {
    let { children: children, items: items } = props;
    if (typeof children === 'function') {
      if (!items) throw new Error('props.children was a function but props.items is missing');
      for (let item of props.items)
        yield* this.getFullNode(
          {
            value: item,
          },
          {
            renderer: children,
          }
        );
    } else {
      let items = [];
      $73SJx$react.Children.forEach(children, (child) => {
        items.push(child);
      });
      let index = 0;
      for (let item of items) {
        let nodes = this.getFullNode(
          {
            element: item,
            index: index,
          },
          {}
        );
        for (let node of nodes) {
          index++;
          yield node;
        }
      }
    }
  }
  getKey(item, partialNode, state, parentKey) {
    if (item.key != null) return item.key;
    if (partialNode.type === 'cell' && partialNode.key != null)
      return `${parentKey}${partialNode.key}`;
    let v = partialNode.value;
    if (v != null) {
      var _v_key;
      let key = (_v_key = v.key) !== null && _v_key !== void 0 ? _v_key : v.id;
      if (key == null) throw new Error('No key found for item');
      return key;
    }
    return parentKey ? `${parentKey}.${partialNode.index}` : `$.${partialNode.index}`;
  }
  getChildState(state, partialNode) {
    return {
      renderer: partialNode.renderer || state.renderer,
    };
  }
  *getFullNode(partialNode, state, parentKey, parentNode) {
    // If there's a value instead of an element on the node, and a parent renderer function is available,
    // use it to render an element for the value.
    let element = partialNode.element;
    if (!element && partialNode.value && state && state.renderer) {
      let cached = this.cache.get(partialNode.value);
      if (cached && (!cached.shouldInvalidate || !cached.shouldInvalidate(this.context))) {
        cached.index = partialNode.index;
        cached.parentKey = parentNode ? parentNode.key : null;
        yield cached;
        return;
      }
      element = state.renderer(partialNode.value);
    }
    // If there's an element with a getCollectionNode function on its type, then it's a supported component.
    // Call this function to get a partial node, and recursively build a full node from there.
    if ($73SJx$react.isValidElement(element)) {
      let type = element.type;
      if (typeof type !== 'function' && typeof type.getCollectionNode !== 'function') {
        let name = typeof element.type === 'function' ? element.type.name : element.type;
        throw new Error(`Unknown element <${name}> in collection.`);
      }
      let childNodes = type.getCollectionNode(element.props, this.context);
      let index = partialNode.index;
      let result = childNodes.next();
      while (!result.done && result.value) {
        let childNode = result.value;
        partialNode.index = index;
        let nodeKey = childNode.key;
        if (!nodeKey)
          nodeKey = childNode.element ? null : this.getKey(element, partialNode, state, parentKey);
        let nodes = this.getFullNode(
          {
            ...childNode,
            key: nodeKey,
            index: index,
            wrapper: $eb2240fc39a57fa5$var$compose(partialNode.wrapper, childNode.wrapper),
          },
          this.getChildState(state, childNode),
          parentKey ? `${parentKey}${element.key}` : element.key,
          parentNode
        );
        let children = [...nodes];
        for (let node of children) {
          // Cache the node based on its value
          node.value = childNode.value || partialNode.value;
          if (node.value) this.cache.set(node.value, node);
          // The partial node may have specified a type for the child in order to specify a constraint.
          // Verify that the full node that was built recursively matches this type.
          if (partialNode.type && node.type !== partialNode.type)
            throw new Error(
              `Unsupported type <${$eb2240fc39a57fa5$var$capitalize(
                node.type
              )}> in <${$eb2240fc39a57fa5$var$capitalize(
                parentNode.type
              )}>. Only <${$eb2240fc39a57fa5$var$capitalize(partialNode.type)}> is supported.`
            );
          index++;
          yield node;
        }
        result = childNodes.next(children);
      }
      return;
    }
    // Ignore invalid elements
    if (partialNode.key == null) return;
    // Create full node
    let builder = this;
    let node = {
      type: partialNode.type,
      props: partialNode.props,
      key: partialNode.key,
      parentKey: parentNode ? parentNode.key : null,
      value: partialNode.value,
      level: parentNode ? parentNode.level + 1 : 0,
      index: partialNode.index,
      rendered: partialNode.rendered,
      textValue: partialNode.textValue,
      'aria-label': partialNode['aria-label'],
      wrapper: partialNode.wrapper,
      shouldInvalidate: partialNode.shouldInvalidate,
      hasChildNodes: partialNode.hasChildNodes,
      childNodes: $eb2240fc39a57fa5$var$iterable(function* () {
        if (!partialNode.hasChildNodes) return;
        let index = 0;
        for (let child of partialNode.childNodes()) {
          // Ensure child keys are globally unique by prepending the parent node's key
          if (child.key != null)
            // TODO: Remove this line entirely and enforce that users always provide unique keys.
            // Currently this line will have issues when a parent has a key `a` and a child with key `bc`
            // but another parent has key `ab` and its child has a key `c`. The combined keys would result in both
            // children having a key of `abc`.
            child.key = `${node.key}${child.key}`;
          child.index = index;
          let nodes = builder.getFullNode(
            child,
            builder.getChildState(state, child),
            node.key,
            node
          );
          for (let node of nodes) {
            index++;
            yield node;
          }
        }
      }),
    };
    yield node;
  }
  constructor() {
    this.cache = new WeakMap();
  }
}
// Wraps an iterator function as an iterable object, and caches the results.
function $eb2240fc39a57fa5$var$iterable(iterator) {
  let cache = [];
  let iterable = null;
  return {
    *[Symbol.iterator]() {
      for (let item of cache) yield item;
      if (!iterable) iterable = iterator();
      for (let item of iterable) {
        cache.push(item);
        yield item;
      }
    },
  };
}
function $eb2240fc39a57fa5$var$compose(outer, inner) {
  if (outer && inner) return (element) => outer(inner(element));
  if (outer) return outer;
  if (inner) return inner;
}
function $eb2240fc39a57fa5$var$capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function $7613b1592d41b092$export$6cd28814d92fa9c9(props, factory, context) {
  let builder = useMemo(() => new $eb2240fc39a57fa5$export$bf788dd355e3a401(), []);
  let { children: children, items: items, collection: collection } = props;
  let result = useMemo(() => {
    if (collection) return collection;
    let nodes = builder.build(
      {
        children: children,
        items: items,
      },
      context
    );
    return factory(nodes);
  }, [builder, children, items, collection, context, factory]);
  return result;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $c5a24bc478652b5f$export$1005530eda016c13(node, collection) {
  // New API: call collection.getChildren with the node key.
  if (typeof collection.getChildren === 'function') return collection.getChildren(node.key);
  // Old API: access childNodes directly.
  return node.childNodes;
}
function $c5a24bc478652b5f$export$fbdeaa6a76694f71(iterable) {
  return $c5a24bc478652b5f$export$5f3398f8733f90e2(iterable, 0);
}
function $c5a24bc478652b5f$export$5f3398f8733f90e2(iterable, index) {
  if (index < 0) return undefined;
  let i = 0;
  for (let item of iterable) {
    if (i === index) return item;
    i++;
  }
}
function $c5a24bc478652b5f$export$8c434b3a7a4dad6(collection, a, b) {
  // If the two nodes have the same parent, compare their indices.
  if (a.parentKey === b.parentKey) return a.index - b.index;
  // Otherwise, collect all of the ancestors from each node, and find the first one that doesn't match starting from the root.
  // Include the base nodes in case we are comparing nodes of different levels so that we can compare the higher node to the lower level node's
  // ancestor of the same level
  let aAncestors = [...$c5a24bc478652b5f$var$getAncestors(collection, a), a];
  let bAncestors = [...$c5a24bc478652b5f$var$getAncestors(collection, b), b];
  let firstNonMatchingAncestor = aAncestors
    .slice(0, bAncestors.length)
    .findIndex((a, i) => a !== bAncestors[i]);
  if (firstNonMatchingAncestor !== -1) {
    // Compare the indices of two children within the common ancestor.
    a = aAncestors[firstNonMatchingAncestor];
    b = bAncestors[firstNonMatchingAncestor];
    return a.index - b.index;
  }
  // If there isn't a non matching ancestor, we might be in a case where one of the nodes is the ancestor of the other.
  if (aAncestors.findIndex((node) => node === b) >= 0) return 1;
  else if (bAncestors.findIndex((node) => node === a) >= 0) return -1;
  // 🤷
  return -1;
}
function $c5a24bc478652b5f$var$getAncestors(collection, node) {
  let parents = [];
  while ((node === null || node === void 0 ? void 0 : node.parentKey) != null) {
    node = collection.getItem(node.parentKey);
    parents.unshift(node);
  }
  return parents;
}

const $453cc9f0df89c0a5$var$cache = new WeakMap();
function $453cc9f0df89c0a5$export$77d5aafae4e095b2(collection) {
  let count = $453cc9f0df89c0a5$var$cache.get(collection);
  if (count != null) return count;
  count = 0;
  let countItems = (items) => {
    for (let item of items)
      if (item.type === 'section')
        countItems($c5a24bc478652b5f$export$1005530eda016c13(item, collection));
      else count++;
  };
  countItems(collection);
  $453cc9f0df89c0a5$var$cache.set(collection, count);
  return count;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ class $e40ea825a81a3709$export$52baac22726c72bf extends Set {
  constructor(keys, anchorKey, currentKey) {
    super(keys);
    if (keys instanceof $e40ea825a81a3709$export$52baac22726c72bf) {
      this.anchorKey = anchorKey || keys.anchorKey;
      this.currentKey = currentKey || keys.currentKey;
    } else {
      this.anchorKey = anchorKey;
      this.currentKey = currentKey;
    }
  }
}

function $7af3f5b51489e0b5$var$equalSets(setA, setB) {
  if (setA.size !== setB.size) return false;
  for (let item of setA) {
    if (!setB.has(item)) return false;
  }
  return true;
}
function $7af3f5b51489e0b5$export$253fe78d46329472(props) {
  let {
    selectionMode: selectionMode = 'none',
    disallowEmptySelection: disallowEmptySelection,
    allowDuplicateSelectionEvents: allowDuplicateSelectionEvents,
    selectionBehavior: selectionBehaviorProp = 'toggle',
    disabledBehavior: disabledBehavior = 'all',
  } = props;
  // We want synchronous updates to `isFocused` and `focusedKey` after their setters are called.
  // But we also need to trigger a react re-render. So, we have both a ref (sync) and state (async).
  let isFocusedRef = useRef(false);
  let [, setFocused] = useState(false);
  let focusedKeyRef = useRef(null);
  let childFocusStrategyRef = useRef(null);
  let [, setFocusedKey] = useState(null);
  let selectedKeysProp = useMemo(
    () => $7af3f5b51489e0b5$var$convertSelection(props.selectedKeys),
    [props.selectedKeys]
  );
  let defaultSelectedKeys = useMemo(
    () =>
      $7af3f5b51489e0b5$var$convertSelection(
        props.defaultSelectedKeys,
        new $e40ea825a81a3709$export$52baac22726c72bf()
      ),
    [props.defaultSelectedKeys]
  );
  let [selectedKeys, setSelectedKeys] = $458b0a5536c1a7cf$export$40bfa8c7b0832715(
    selectedKeysProp,
    defaultSelectedKeys,
    props.onSelectionChange
  );
  let disabledKeysProp = useMemo(
    () => (props.disabledKeys ? new Set(props.disabledKeys) : new Set()),
    [props.disabledKeys]
  );
  let [selectionBehavior, setSelectionBehavior] = useState(selectionBehaviorProp);
  // If the selectionBehavior prop is set to replace, but the current state is toggle (e.g. due to long press
  // to enter selection mode on touch), and the selection becomes empty, reset the selection behavior.
  if (
    selectionBehaviorProp === 'replace' &&
    selectionBehavior === 'toggle' &&
    typeof selectedKeys === 'object' &&
    selectedKeys.size === 0
  )
    setSelectionBehavior('replace');
  // If the selectionBehavior prop changes, update the state as well.
  let lastSelectionBehavior = useRef(selectionBehaviorProp);
  useEffect(() => {
    if (selectionBehaviorProp !== lastSelectionBehavior.current) {
      setSelectionBehavior(selectionBehaviorProp);
      lastSelectionBehavior.current = selectionBehaviorProp;
    }
  }, [selectionBehaviorProp]);
  return {
    selectionMode: selectionMode,
    disallowEmptySelection: disallowEmptySelection,
    selectionBehavior: selectionBehavior,
    setSelectionBehavior: setSelectionBehavior,
    get isFocused() {
      return isFocusedRef.current;
    },
    setFocused(f) {
      isFocusedRef.current = f;
      setFocused(f);
    },
    get focusedKey() {
      return focusedKeyRef.current;
    },
    get childFocusStrategy() {
      return childFocusStrategyRef.current;
    },
    setFocusedKey(k, childFocusStrategy = 'first') {
      focusedKeyRef.current = k;
      childFocusStrategyRef.current = childFocusStrategy;
      setFocusedKey(k);
    },
    selectedKeys: selectedKeys,
    setSelectedKeys(keys) {
      if (allowDuplicateSelectionEvents || !$7af3f5b51489e0b5$var$equalSets(keys, selectedKeys))
        setSelectedKeys(keys);
    },
    disabledKeys: disabledKeysProp,
    disabledBehavior: disabledBehavior,
  };
}
function $7af3f5b51489e0b5$var$convertSelection(selection, defaultValue) {
  if (!selection) return defaultValue;
  return selection === 'all' ? 'all' : new $e40ea825a81a3709$export$52baac22726c72bf(selection);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

class $d496c0a20b6e58ec$export$6c8a5aaad13c9852 {
  /**
   * The type of selection that is allowed in the collection.
   */ get selectionMode() {
    return this.state.selectionMode;
  }
  /**
   * Whether the collection allows empty selection.
   */ get disallowEmptySelection() {
    return this.state.disallowEmptySelection;
  }
  /**
   * The selection behavior for the collection.
   */ get selectionBehavior() {
    return this.state.selectionBehavior;
  }
  /**
   * Sets the selection behavior for the collection.
   */ setSelectionBehavior(selectionBehavior) {
    this.state.setSelectionBehavior(selectionBehavior);
  }
  /**
   * Whether the collection is currently focused.
   */ get isFocused() {
    return this.state.isFocused;
  }
  /**
   * Sets whether the collection is focused.
   */ setFocused(isFocused) {
    this.state.setFocused(isFocused);
  }
  /**
   * The current focused key in the collection.
   */ get focusedKey() {
    return this.state.focusedKey;
  }
  /** Whether the first or last child of the focused key should receive focus. */ get childFocusStrategy() {
    return this.state.childFocusStrategy;
  }
  /**
   * Sets the focused key.
   */ setFocusedKey(key, childFocusStrategy) {
    if (key == null || this.collection.getItem(key))
      this.state.setFocusedKey(key, childFocusStrategy);
  }
  /**
   * The currently selected keys in the collection.
   */ get selectedKeys() {
    return this.state.selectedKeys === 'all'
      ? new Set(this.getSelectAllKeys())
      : this.state.selectedKeys;
  }
  /**
   * The raw selection value for the collection.
   * Either 'all' for select all, or a set of keys.
   */ get rawSelection() {
    return this.state.selectedKeys;
  }
  /**
   * Returns whether a key is selected.
   */ isSelected(key) {
    if (this.state.selectionMode === 'none') return false;
    key = this.getKey(key);
    return this.state.selectedKeys === 'all'
      ? this.canSelectItem(key)
      : this.state.selectedKeys.has(key);
  }
  /**
   * Whether the selection is empty.
   */ get isEmpty() {
    return this.state.selectedKeys !== 'all' && this.state.selectedKeys.size === 0;
  }
  /**
   * Whether all items in the collection are selected.
   */ get isSelectAll() {
    if (this.isEmpty) return false;
    if (this.state.selectedKeys === 'all') return true;
    if (this._isSelectAll != null) return this._isSelectAll;
    let allKeys = this.getSelectAllKeys();
    let selectedKeys = this.state.selectedKeys;
    this._isSelectAll = allKeys.every((k) => selectedKeys.has(k));
    return this._isSelectAll;
  }
  get firstSelectedKey() {
    let first = null;
    for (let key of this.state.selectedKeys) {
      let item = this.collection.getItem(key);
      if (
        !first ||
        (item && $c5a24bc478652b5f$export$8c434b3a7a4dad6(this.collection, item, first) < 0)
      )
        first = item;
    }
    return first === null || first === void 0 ? void 0 : first.key;
  }
  get lastSelectedKey() {
    let last = null;
    for (let key of this.state.selectedKeys) {
      let item = this.collection.getItem(key);
      if (
        !last ||
        (item && $c5a24bc478652b5f$export$8c434b3a7a4dad6(this.collection, item, last) > 0)
      )
        last = item;
    }
    return last === null || last === void 0 ? void 0 : last.key;
  }
  get disabledKeys() {
    return this.state.disabledKeys;
  }
  get disabledBehavior() {
    return this.state.disabledBehavior;
  }
  /**
   * Extends the selection to the given key.
   */ extendSelection(toKey) {
    if (this.selectionMode === 'none') return;
    if (this.selectionMode === 'single') {
      this.replaceSelection(toKey);
      return;
    }
    toKey = this.getKey(toKey);
    let selection;
    // Only select the one key if coming from a select all.
    if (this.state.selectedKeys === 'all')
      selection = new $e40ea825a81a3709$export$52baac22726c72bf([toKey], toKey, toKey);
    else {
      let selectedKeys = this.state.selectedKeys;
      let anchorKey = selectedKeys.anchorKey || toKey;
      selection = new $e40ea825a81a3709$export$52baac22726c72bf(selectedKeys, anchorKey, toKey);
      for (let key of this.getKeyRange(anchorKey, selectedKeys.currentKey || toKey))
        selection.delete(key);
      for (let key of this.getKeyRange(toKey, anchorKey))
        if (this.canSelectItem(key)) selection.add(key);
    }
    this.state.setSelectedKeys(selection);
  }
  getKeyRange(from, to) {
    let fromItem = this.collection.getItem(from);
    let toItem = this.collection.getItem(to);
    if (fromItem && toItem) {
      if ($c5a24bc478652b5f$export$8c434b3a7a4dad6(this.collection, fromItem, toItem) <= 0)
        return this.getKeyRangeInternal(from, to);
      return this.getKeyRangeInternal(to, from);
    }
    return [];
  }
  getKeyRangeInternal(from, to) {
    let keys = [];
    let key = from;
    while (key) {
      let item = this.collection.getItem(key);
      if ((item && item.type === 'item') || (item.type === 'cell' && this.allowsCellSelection))
        keys.push(key);
      if (key === to) return keys;
      key = this.collection.getKeyAfter(key);
    }
    return [];
  }
  getKey(key) {
    let item = this.collection.getItem(key);
    if (!item)
      // ¯\_(ツ)_/¯
      return key;
    // If cell selection is allowed, just return the key.
    if (item.type === 'cell' && this.allowsCellSelection) return key;
    // Find a parent item to select
    while (item.type !== 'item' && item.parentKey != null)
      item = this.collection.getItem(item.parentKey);
    if (!item || item.type !== 'item') return null;
    return item.key;
  }
  /**
   * Toggles whether the given key is selected.
   */ toggleSelection(key) {
    if (this.selectionMode === 'none') return;
    if (this.selectionMode === 'single' && !this.isSelected(key)) {
      this.replaceSelection(key);
      return;
    }
    key = this.getKey(key);
    if (key == null) return;
    let keys = new $e40ea825a81a3709$export$52baac22726c72bf(
      this.state.selectedKeys === 'all' ? this.getSelectAllKeys() : this.state.selectedKeys
    );
    if (keys.has(key)) keys.delete(key);
    else if (this.canSelectItem(key)) {
      keys.add(key);
      keys.anchorKey = key;
      keys.currentKey = key;
    }
    if (this.disallowEmptySelection && keys.size === 0) return;
    this.state.setSelectedKeys(keys);
  }
  /**
   * Replaces the selection with only the given key.
   */ replaceSelection(key) {
    if (this.selectionMode === 'none') return;
    key = this.getKey(key);
    if (key == null) return;
    let selection = this.canSelectItem(key)
      ? new $e40ea825a81a3709$export$52baac22726c72bf([key], key, key)
      : new $e40ea825a81a3709$export$52baac22726c72bf();
    this.state.setSelectedKeys(selection);
  }
  /**
   * Replaces the selection with the given keys.
   */ setSelectedKeys(keys) {
    if (this.selectionMode === 'none') return;
    let selection = new $e40ea825a81a3709$export$52baac22726c72bf();
    for (let key of keys) {
      key = this.getKey(key);
      if (key != null) {
        selection.add(key);
        if (this.selectionMode === 'single') break;
      }
    }
    this.state.setSelectedKeys(selection);
  }
  getSelectAllKeys() {
    let keys = [];
    let addKeys = (key) => {
      while (key) {
        if (this.canSelectItem(key)) {
          let item = this.collection.getItem(key);
          if (item.type === 'item') keys.push(key);
          // Add child keys. If cell selection is allowed, then include item children too.
          if (item.hasChildNodes && (this.allowsCellSelection || item.type !== 'item'))
            addKeys(
              $c5a24bc478652b5f$export$fbdeaa6a76694f71(
                $c5a24bc478652b5f$export$1005530eda016c13(item, this.collection)
              ).key
            );
        }
        key = this.collection.getKeyAfter(key);
      }
    };
    addKeys(this.collection.getFirstKey());
    return keys;
  }
  /**
   * Selects all items in the collection.
   */ selectAll() {
    if (!this.isSelectAll && this.selectionMode === 'multiple') this.state.setSelectedKeys('all');
  }
  /**
   * Removes all keys from the selection.
   */ clearSelection() {
    if (
      !this.disallowEmptySelection &&
      (this.state.selectedKeys === 'all' || this.state.selectedKeys.size > 0)
    )
      this.state.setSelectedKeys(new $e40ea825a81a3709$export$52baac22726c72bf());
  }
  /**
   * Toggles between select all and an empty selection.
   */ toggleSelectAll() {
    if (this.isSelectAll) this.clearSelection();
    else this.selectAll();
  }
  select(key, e) {
    if (this.selectionMode === 'none') return;
    if (this.selectionMode === 'single') {
      if (this.isSelected(key) && !this.disallowEmptySelection) this.toggleSelection(key);
      else this.replaceSelection(key);
    } else if (
      this.selectionBehavior === 'toggle' ||
      (e && (e.pointerType === 'touch' || e.pointerType === 'virtual'))
    )
      // if touch or virtual (VO) then we just want to toggle, otherwise it's impossible to multi select because they don't have modifier keys
      this.toggleSelection(key);
    else this.replaceSelection(key);
  }
  /**
   * Returns whether the current selection is equal to the given selection.
   */ isSelectionEqual(selection) {
    if (selection === this.state.selectedKeys) return true;
    // Check if the set of keys match.
    let selectedKeys = this.selectedKeys;
    if (selection.size !== selectedKeys.size) return false;
    for (let key of selection) {
      if (!selectedKeys.has(key)) return false;
    }
    for (let key of selectedKeys) {
      if (!selection.has(key)) return false;
    }
    return true;
  }
  canSelectItem(key) {
    if (this.state.selectionMode === 'none' || this.state.disabledKeys.has(key)) return false;
    let item = this.collection.getItem(key);
    if (!item || (item.type === 'cell' && !this.allowsCellSelection)) return false;
    return true;
  }
  isDisabled(key) {
    return this.state.disabledKeys.has(key) && this.state.disabledBehavior === 'all';
  }
  constructor(collection, state, options) {
    this.collection = collection;
    this.state = state;
    var _options_allowsCellSelection;
    this.allowsCellSelection =
      (_options_allowsCellSelection =
        options === null || options === void 0 ? void 0 : options.allowsCellSelection) !== null &&
      _options_allowsCellSelection !== void 0
        ? _options_allowsCellSelection
        : false;
    this._isSelectAll = null;
  }
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ class $a02d57049d202695$export$d085fb9e920b5ca7 {
  *[Symbol.iterator]() {
    yield* this.iterable;
  }
  get size() {
    return this.keyMap.size;
  }
  getKeys() {
    return this.keyMap.keys();
  }
  getKeyBefore(key) {
    let node = this.keyMap.get(key);
    return node ? node.prevKey : null;
  }
  getKeyAfter(key) {
    let node = this.keyMap.get(key);
    return node ? node.nextKey : null;
  }
  getFirstKey() {
    return this.firstKey;
  }
  getLastKey() {
    return this.lastKey;
  }
  getItem(key) {
    return this.keyMap.get(key);
  }
  at(idx) {
    const keys = [...this.getKeys()];
    return this.getItem(keys[idx]);
  }
  getChildren(key) {
    let node = this.keyMap.get(key);
    return (node === null || node === void 0 ? void 0 : node.childNodes) || [];
  }
  constructor(nodes) {
    this.keyMap = new Map();
    this.iterable = nodes;
    let visit = (node) => {
      this.keyMap.set(node.key, node);
      if (node.childNodes && node.type === 'section')
        for (let child of node.childNodes) visit(child);
    };
    for (let node of nodes) visit(node);
    let last;
    let index = 0;
    for (let [key, node] of this.keyMap) {
      if (last) {
        last.nextKey = key;
        node.prevKey = last.key;
      } else {
        this.firstKey = key;
        node.prevKey = undefined;
      }
      if (node.type === 'item') node.index = index++;
      last = node;
      // Set nextKey as undefined since this might be the last node
      // If it isn't the last node, last.nextKey will properly set at start of new loop
      last.nextKey = undefined;
    }
    this.lastKey = last === null || last === void 0 ? void 0 : last.key;
  }
}

function $e72dd72e1c76a225$export$2f645645f7bca764(props) {
  let { filter: filter } = props;
  let selectionState = $7af3f5b51489e0b5$export$253fe78d46329472(props);
  let disabledKeys = useMemo(
    () => (props.disabledKeys ? new Set(props.disabledKeys) : new Set()),
    [props.disabledKeys]
  );
  let factory = useCallback(
    (nodes) =>
      filter
        ? new $a02d57049d202695$export$d085fb9e920b5ca7(filter(nodes))
        : new $a02d57049d202695$export$d085fb9e920b5ca7(nodes),
    [filter]
  );
  let context = useMemo(
    () => ({
      suppressTextValueWarning: props.suppressTextValueWarning,
    }),
    [props.suppressTextValueWarning]
  );
  let collection = $7613b1592d41b092$export$6cd28814d92fa9c9(props, factory, context);
  let selectionManager = useMemo(
    () => new $d496c0a20b6e58ec$export$6c8a5aaad13c9852(collection, selectionState),
    [collection, selectionState]
  );
  // Reset focused key if that item is deleted from the collection.
  const cachedCollection = useRef(null);
  useEffect(() => {
    if (selectionState.focusedKey != null && !collection.getItem(selectionState.focusedKey)) {
      const startItem = cachedCollection.current.getItem(selectionState.focusedKey);
      const cachedItemNodes = [...cachedCollection.current.getKeys()]
        .map((key) => {
          const itemNode = cachedCollection.current.getItem(key);
          return itemNode.type === 'item' ? itemNode : null;
        })
        .filter((node) => node !== null);
      const itemNodes = [...collection.getKeys()]
        .map((key) => {
          const itemNode = collection.getItem(key);
          return itemNode.type === 'item' ? itemNode : null;
        })
        .filter((node) => node !== null);
      const diff = cachedItemNodes.length - itemNodes.length;
      let index = Math.min(
        diff > 1 ? Math.max(startItem.index - diff + 1, 0) : startItem.index,
        itemNodes.length - 1
      );
      let newNode;
      while (index >= 0) {
        if (!selectionManager.isDisabled(itemNodes[index].key)) {
          newNode = itemNodes[index];
          break;
        }
        // Find next, not disabled item.
        if (index < itemNodes.length - 1) index++;
        else {
          if (index > startItem.index) index = startItem.index;
          index--;
        }
      }
      selectionState.setFocusedKey(newNode ? newNode.key : null);
    }
    cachedCollection.current = collection;
  }, [collection, selectionManager, selectionState, selectionState.focusedKey]);
  return {
    collection: collection,
    disabledKeys: disabledKeys,
    selectionManager: selectionManager,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $a0d645289fe9b86b$export$e7f05e985daf4b5f(props) {
  var _props_defaultSelectedKey;
  let [selectedKey, setSelectedKey] = $458b0a5536c1a7cf$export$40bfa8c7b0832715(
    props.selectedKey,
    (_props_defaultSelectedKey = props.defaultSelectedKey) !== null &&
      _props_defaultSelectedKey !== void 0
      ? _props_defaultSelectedKey
      : null,
    props.onSelectionChange
  );
  let selectedKeys = useMemo(() => (selectedKey != null ? [selectedKey] : []), [selectedKey]);
  let {
    collection: collection,
    disabledKeys: disabledKeys,
    selectionManager: selectionManager,
  } = $e72dd72e1c76a225$export$2f645645f7bca764({
    ...props,
    selectionMode: 'single',
    disallowEmptySelection: true,
    allowDuplicateSelectionEvents: true,
    selectedKeys: selectedKeys,
    onSelectionChange: (keys) => {
      let key = keys.values().next().value;
      // Always fire onSelectionChange, even if the key is the same
      // as the current key (useControlledState does not).
      if (key === selectedKey && props.onSelectionChange) props.onSelectionChange(key);
      setSelectedKey(key);
    },
  });
  let selectedItem = selectedKey != null ? collection.getItem(selectedKey) : null;
  return {
    collection: collection,
    disabledKeys: disabledKeys,
    selectionManager: selectionManager,
    selectedKey: selectedKey,
    setSelectedKey: setSelectedKey,
    selectedItem: selectedItem,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $fc909762b330b746$export$61c6a8c84e605fb6(props) {
  let [isOpen, setOpen] = $458b0a5536c1a7cf$export$40bfa8c7b0832715(
    props.isOpen,
    props.defaultOpen || false,
    props.onOpenChange
  );
  const open = useCallback(() => {
    setOpen(true);
  }, [setOpen]);
  const close = useCallback(() => {
    setOpen(false);
  }, [setOpen]);
  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [setOpen, isOpen]);
  return {
    isOpen: isOpen,
    setOpen: setOpen,
    open: open,
    close: close,
    toggle: toggle,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $a28c903ee9ad8dc5$export$79fefeb1c2091ac3(props) {
  let overlayTriggerState = $fc909762b330b746$export$61c6a8c84e605fb6(props);
  let [focusStrategy, setFocusStrategy] = useState(null);
  return {
    focusStrategy: focusStrategy,
    ...overlayTriggerState,
    open(focusStrategy = null) {
      setFocusStrategy(focusStrategy);
      overlayTriggerState.open();
    },
    toggle(focusStrategy = null) {
      setFocusStrategy(focusStrategy);
      overlayTriggerState.toggle();
    },
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $a9e7382a7d111cb5$export$b453a3bfd4a5fa9e(props) {
  var _collection_getItem, _collection_getItem1;
  let {
    defaultFilter: defaultFilter,
    menuTrigger: menuTrigger = 'input',
    allowsEmptyCollection: allowsEmptyCollection = false,
    allowsCustomValue: allowsCustomValue,
    shouldCloseOnBlur: shouldCloseOnBlur = true,
  } = props;
  let [showAllItems, setShowAllItems] = useState(false);
  let [isFocused, setFocusedState] = useState(false);
  let onSelectionChange = (key) => {
    if (props.onSelectionChange) props.onSelectionChange(key);
    // If key is the same, reset the inputValue and close the menu
    // (scenario: user clicks on already selected option)
    if (key === selectedKey) {
      resetInputValue();
      closeMenu();
    }
  };
  var _props_items;
  let {
    collection: collection,
    selectionManager: selectionManager,
    selectedKey: selectedKey,
    setSelectedKey: setSelectedKey,
    selectedItem: selectedItem,
    disabledKeys: disabledKeys,
  } = $a0d645289fe9b86b$export$e7f05e985daf4b5f({
    ...props,
    onSelectionChange: onSelectionChange,
    items:
      (_props_items = props.items) !== null && _props_items !== void 0
        ? _props_items
        : props.defaultItems,
  });
  var _props_defaultInputValue, _ref;
  let [inputValue, setInputValue] = $458b0a5536c1a7cf$export$40bfa8c7b0832715(
    props.inputValue,
    (_ref =
      (_props_defaultInputValue = props.defaultInputValue) !== null &&
      _props_defaultInputValue !== void 0
        ? _props_defaultInputValue
        : (_collection_getItem = collection.getItem(selectedKey)) === null ||
          _collection_getItem === void 0
        ? void 0
        : _collection_getItem.textValue) !== null && _ref !== void 0
      ? _ref
      : '',
    props.onInputChange
  );
  // Preserve original collection so we can show all items on demand
  let originalCollection = collection;
  let filteredCollection = useMemo(
    () =>
      // No default filter if items are controlled.
      props.items != null || !defaultFilter
        ? collection
        : $a9e7382a7d111cb5$var$filterCollection(collection, inputValue, defaultFilter),
    [collection, inputValue, defaultFilter, props.items]
  );
  let [lastCollection, setLastCollection] = useState(filteredCollection);
  // Track what action is attempting to open the menu
  let menuOpenTrigger = useRef('focus');
  let onOpenChange = (open) => {
    if (props.onOpenChange) props.onOpenChange(open, open ? menuOpenTrigger.current : undefined);
    selectionManager.setFocused(open);
    if (!open) selectionManager.setFocusedKey(null);
  };
  let triggerState = $a28c903ee9ad8dc5$export$79fefeb1c2091ac3({
    ...props,
    onOpenChange: onOpenChange,
    isOpen: undefined,
    defaultOpen: undefined,
  });
  let open = (focusStrategy, trigger) => {
    let displayAllItems = trigger === 'manual' || (trigger === 'focus' && menuTrigger === 'focus');
    // Prevent open operations from triggering if there is nothing to display
    // Also prevent open operations from triggering if items are uncontrolled but defaultItems is empty, even if displayAllItems is true.
    // This is to prevent comboboxes with empty defaultItems from opening but allow controlled items comboboxes to open even if the inital list is empty (assumption is user will provide swap the empty list with a base list via onOpenChange returning `menuTrigger` manual)
    if (
      allowsEmptyCollection ||
      filteredCollection.size > 0 ||
      (displayAllItems && originalCollection.size > 0) ||
      props.items
    ) {
      if (displayAllItems && !triggerState.isOpen && props.items === undefined)
        // Show all items if menu is manually opened. Only care about this if items are undefined
        setShowAllItems(true);
      menuOpenTrigger.current = trigger;
      triggerState.open(focusStrategy);
    }
  };
  let toggle = (focusStrategy, trigger) => {
    let displayAllItems = trigger === 'manual' || (trigger === 'focus' && menuTrigger === 'focus');
    // If the menu is closed and there is nothing to display, early return so toggle isn't called to prevent extraneous onOpenChange
    if (
      !(
        allowsEmptyCollection ||
        filteredCollection.size > 0 ||
        (displayAllItems && originalCollection.size > 0) ||
        props.items
      ) &&
      !triggerState.isOpen
    )
      return;
    if (displayAllItems && !triggerState.isOpen && props.items === undefined)
      // Show all items if menu is toggled open. Only care about this if items are undefined
      setShowAllItems(true);
    // Only update the menuOpenTrigger if menu is currently closed
    if (!triggerState.isOpen) menuOpenTrigger.current = trigger;
    toggleMenu(focusStrategy);
  };
  // If menu is going to close, save the current collection so we can freeze the displayed collection when the
  // user clicks outside the popover to close the menu. Prevents the menu contents from updating as the menu closes.
  let toggleMenu = useCallback(
    (focusStrategy) => {
      if (triggerState.isOpen) setLastCollection(filteredCollection);
      triggerState.toggle(focusStrategy);
    },
    [triggerState, filteredCollection]
  );
  let closeMenu = useCallback(() => {
    if (triggerState.isOpen) {
      setLastCollection(filteredCollection);
      triggerState.close();
    }
  }, [triggerState, filteredCollection]);
  let lastValue = useRef(inputValue);
  let resetInputValue = () => {
    var _collection_getItem;
    var _collection_getItem_textValue;
    let itemText =
      (_collection_getItem_textValue =
        (_collection_getItem = collection.getItem(selectedKey)) === null ||
        _collection_getItem === void 0
          ? void 0
          : _collection_getItem.textValue) !== null && _collection_getItem_textValue !== void 0
        ? _collection_getItem_textValue
        : '';
    lastValue.current = itemText;
    setInputValue(itemText);
  };
  var _props_selectedKey, _ref1;
  let lastSelectedKey = useRef(
    (_ref1 =
      (_props_selectedKey = props.selectedKey) !== null && _props_selectedKey !== void 0
        ? _props_selectedKey
        : props.defaultSelectedKey) !== null && _ref1 !== void 0
      ? _ref1
      : null
  );
  var _collection_getItem_textValue;
  let lastSelectedKeyText = useRef(
    (_collection_getItem_textValue =
      (_collection_getItem1 = collection.getItem(selectedKey)) === null ||
      _collection_getItem1 === void 0
        ? void 0
        : _collection_getItem1.textValue) !== null && _collection_getItem_textValue !== void 0
      ? _collection_getItem_textValue
      : ''
  );
  // intentional omit dependency array, want this to happen on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    var _collection_getItem;
    // Open and close menu automatically when the input value changes if the input is focused,
    // and there are items in the collection or allowEmptyCollection is true.
    if (
      isFocused &&
      (filteredCollection.size > 0 || allowsEmptyCollection) &&
      !triggerState.isOpen &&
      inputValue !== lastValue.current &&
      menuTrigger !== 'manual'
    )
      open(null, 'input');
    // Close the menu if the collection is empty. Don't close menu if filtered collection size is 0
    // but we are currently showing all items via button press
    if (
      !showAllItems &&
      !allowsEmptyCollection &&
      triggerState.isOpen &&
      filteredCollection.size === 0
    )
      closeMenu();
    // Close when an item is selected.
    if (selectedKey != null && selectedKey !== lastSelectedKey.current) closeMenu();
    // Clear focused key when input value changes and display filtered collection again.
    if (inputValue !== lastValue.current) {
      selectionManager.setFocusedKey(null);
      setShowAllItems(false);
      // Set selectedKey to null when the user clears the input.
      // If controlled, this is the application developer's responsibility.
      if (inputValue === '' && (props.inputValue === undefined || props.selectedKey === undefined))
        setSelectedKey(null);
    }
    // If the selectedKey changed, update the input value.
    // Do nothing if both inputValue and selectedKey are controlled.
    // In this case, it's the user's responsibility to update inputValue in onSelectionChange.
    if (
      selectedKey !== lastSelectedKey.current &&
      (props.inputValue === undefined || props.selectedKey === undefined)
    )
      resetInputValue();
    else lastValue.current = inputValue;
    var _collection_getItem_textValue;
    // Update the inputValue if the selected item's text changes from its last tracked value.
    // This is to handle cases where a selectedKey is specified but the items aren't available (async loading) or the selected item's text value updates.
    // Only reset if the user isn't currently within the field so we don't erroneously modify user input.
    // If inputValue is controlled, it is the user's responsibility to update the inputValue when items change.
    let selectedItemText =
      (_collection_getItem_textValue =
        (_collection_getItem = collection.getItem(selectedKey)) === null ||
        _collection_getItem === void 0
          ? void 0
          : _collection_getItem.textValue) !== null && _collection_getItem_textValue !== void 0
        ? _collection_getItem_textValue
        : '';
    if (
      !isFocused &&
      selectedKey != null &&
      props.inputValue === undefined &&
      selectedKey === lastSelectedKey.current
    ) {
      if (lastSelectedKeyText.current !== selectedItemText) {
        lastValue.current = selectedItemText;
        setInputValue(selectedItemText);
      }
    }
    lastSelectedKey.current = selectedKey;
    lastSelectedKeyText.current = selectedItemText;
  });
  // Revert input value and close menu
  let revert = () => {
    if (allowsCustomValue && selectedKey == null) commitCustomValue();
    else commitSelection();
  };
  let commitCustomValue = () => {
    lastSelectedKey.current = null;
    setSelectedKey(null);
    closeMenu();
  };
  let commitSelection = () => {
    // If multiple things are controlled, call onSelectionChange
    if (props.selectedKey !== undefined && props.inputValue !== undefined) {
      var _collection_getItem;
      props.onSelectionChange(selectedKey);
      var _collection_getItem_textValue;
      // Stop menu from reopening from useEffect
      let itemText =
        (_collection_getItem_textValue =
          (_collection_getItem = collection.getItem(selectedKey)) === null ||
          _collection_getItem === void 0
            ? void 0
            : _collection_getItem.textValue) !== null && _collection_getItem_textValue !== void 0
          ? _collection_getItem_textValue
          : '';
      lastValue.current = itemText;
      closeMenu();
    } else {
      // If only a single aspect of combobox is controlled, reset input value and close menu for the user
      resetInputValue();
      closeMenu();
    }
  };
  const commitValue = () => {
    if (allowsCustomValue) {
      var _collection_getItem;
      var _collection_getItem_textValue;
      const itemText =
        (_collection_getItem_textValue =
          (_collection_getItem = collection.getItem(selectedKey)) === null ||
          _collection_getItem === void 0
            ? void 0
            : _collection_getItem.textValue) !== null && _collection_getItem_textValue !== void 0
          ? _collection_getItem_textValue
          : '';
      inputValue === itemText ? commitSelection() : commitCustomValue();
    } // Reset inputValue and close menu
    else commitSelection();
  };
  let commit = () => {
    if (triggerState.isOpen && selectionManager.focusedKey != null) {
      // Reset inputValue and close menu here if the selected key is already the focused key. Otherwise
      // fire onSelectionChange to allow the application to control the closing.
      if (selectedKey === selectionManager.focusedKey) commitSelection();
      else setSelectedKey(selectionManager.focusedKey);
    } else commitValue();
  };
  let setFocused = (isFocused) => {
    if (isFocused) {
      if (menuTrigger === 'focus') open(null, 'focus');
    } else if (shouldCloseOnBlur) commitValue();
    setFocusedState(isFocused);
  };
  let displayedCollection = useMemo(() => {
    if (triggerState.isOpen) {
      if (showAllItems) return originalCollection;
      else return filteredCollection;
    } else return lastCollection;
  }, [triggerState.isOpen, originalCollection, filteredCollection, showAllItems, lastCollection]);
  return {
    ...triggerState,
    toggle: toggle,
    open: open,
    close: commitValue,
    selectionManager: selectionManager,
    selectedKey: selectedKey,
    setSelectedKey: setSelectedKey,
    disabledKeys: disabledKeys,
    isFocused: isFocused,
    setFocused: setFocused,
    selectedItem: selectedItem,
    collection: displayedCollection,
    inputValue: inputValue,
    setInputValue: setInputValue,
    commit: commit,
    revert: revert,
  };
}
function $a9e7382a7d111cb5$var$filterCollection(collection, inputValue, filter) {
  return new $a02d57049d202695$export$d085fb9e920b5ca7(
    $a9e7382a7d111cb5$var$filterNodes(collection, collection, inputValue, filter)
  );
}
function $a9e7382a7d111cb5$var$filterNodes(collection, nodes, inputValue, filter) {
  let filteredNode = [];
  for (let node of nodes) {
    if (node.type === 'section' && node.hasChildNodes) {
      let filtered = $a9e7382a7d111cb5$var$filterNodes(
        collection,
        $c5a24bc478652b5f$export$1005530eda016c13(node, collection),
        inputValue,
        filter
      );
      if ([...filtered].some((node) => node.type === 'item'))
        filteredNode.push({
          ...node,
          childNodes: filtered,
        });
    } else if (node.type === 'item' && filter(node.textValue, inputValue))
      filteredNode.push({
        ...node,
      });
    else if (node.type !== 'item')
      filteredNode.push({
        ...node,
      });
  }
  return filteredNode;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $2bc3a590c5373a4e$export$5159ec8b34d4ec12(props) {
  let triggerState = $a28c903ee9ad8dc5$export$79fefeb1c2091ac3(props);
  let listState = $a0d645289fe9b86b$export$e7f05e985daf4b5f({
    ...props,
    onSelectionChange: (key) => {
      if (props.onSelectionChange != null) props.onSelectionChange(key);
      triggerState.close();
    },
  });
  let [isFocused, setFocused] = useState(false);
  return {
    ...listState,
    ...triggerState,
    open() {
      // Don't open if the collection is empty.
      if (listState.collection.size !== 0) triggerState.open();
    },
    toggle(focusStrategy) {
      if (listState.collection.size !== 0) triggerState.toggle(focusStrategy);
    },
    isFocused: isFocused,
    setFocused: setFocused,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // We must avoid a circular dependency with @react-aria/utils, and this useLayoutEffect is
// guarded by a check that it only runs on the client side.
// eslint-disable-next-line rulesdir/useLayoutEffectRule

// Default context value to use in case there is no SSRProvider. This is fine for
// client-only apps. In order to support multiple copies of React Aria potentially
// being on the page at once, the prefix is set to a random number. SSRProvider
// will reset this to zero for consistency between server and client, so in the
// SSR case multiple copies of React Aria is not supported.
const $b5e257d569688ac6$var$defaultContext = {
  prefix: String(Math.round(Math.random() * 10000000000)),
  current: 0,
};
const $b5e257d569688ac6$var$SSRContext = /*#__PURE__*/ $73SJx$react.createContext(
  $b5e257d569688ac6$var$defaultContext
);
const $b5e257d569688ac6$var$IsSSRContext = /*#__PURE__*/ $73SJx$react.createContext(false);
let $b5e257d569688ac6$var$canUseDOM = Boolean(
  typeof window !== 'undefined' && window.document && window.document.createElement
);
let $b5e257d569688ac6$var$componentIds = new WeakMap();
function $b5e257d569688ac6$var$useCounter(isDisabled = false) {
  let ctx = useContext($b5e257d569688ac6$var$SSRContext);
  let ref = useRef(null);
  // eslint-disable-next-line rulesdir/pure-render
  if (ref.current === null && !isDisabled) {
    var _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner;
    // In strict mode, React renders components twice, and the ref will be reset to null on the second render.
    // This means our id counter will be incremented twice instead of once. This is a problem because on the
    // server, components are only rendered once and so ids generated on the server won't match the client.
    // In React 18, useId was introduced to solve this, but it is not available in older versions. So to solve this
    // we need to use some React internals to access the underlying Fiber instance, which is stable between renders.
    // This is exposed as ReactCurrentOwner in development, which is all we need since StrictMode only runs in development.
    // To ensure that we only increment the global counter once, we store the starting id for this component in
    // a weak map associated with the Fiber. On the second render, we reset the global counter to this value.
    // Since React runs the second render immediately after the first, this is safe.
    // @ts-ignore
    let currentOwner =
      (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
        $73SJx$react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) === null ||
      _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED === void 0
        ? void 0
        : (_React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner =
            _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner) === null ||
          _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner === void 0
        ? void 0
        : _React___SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_ReactCurrentOwner.current;
    if (currentOwner) {
      let prevComponentValue = $b5e257d569688ac6$var$componentIds.get(currentOwner);
      if (prevComponentValue == null)
        // On the first render, and first call to useId, store the id and state in our weak map.
        $b5e257d569688ac6$var$componentIds.set(currentOwner, {
          id: ctx.current,
          state: currentOwner.memoizedState,
        });
      else if (currentOwner.memoizedState !== prevComponentValue.state) {
        // On the second render, the memoizedState gets reset by React.
        // Reset the counter, and remove from the weak map so we don't
        // do this for subsequent useId calls.
        ctx.current = prevComponentValue.id;
        $b5e257d569688ac6$var$componentIds.delete(currentOwner);
      }
    }
    // eslint-disable-next-line rulesdir/pure-render
    ref.current = ++ctx.current;
  }
  // eslint-disable-next-line rulesdir/pure-render
  return ref.current;
}
function $b5e257d569688ac6$var$useLegacySSRSafeId(defaultId) {
  let ctx = useContext($b5e257d569688ac6$var$SSRContext);
  // If we are rendering in a non-DOM environment, and there's no SSRProvider,
  // provide a warning to hint to the developer to add one.
  if (ctx === $b5e257d569688ac6$var$defaultContext && !$b5e257d569688ac6$var$canUseDOM)
    console.warn(
      'When server rendering, you must wrap your application in an <SSRProvider> to ensure consistent ids are generated between the client and server.'
    );
  let counter = $b5e257d569688ac6$var$useCounter(!!defaultId);
  let prefix =
    ctx === $b5e257d569688ac6$var$defaultContext && process.env.NODE_ENV === 'test'
      ? 'react-aria'
      : `react-aria${ctx.prefix}`;
  return defaultId || `${prefix}-${counter}`;
}
function $b5e257d569688ac6$var$useModernSSRSafeId(defaultId) {
  // @ts-ignore
  let id = $73SJx$react.useId();
  let [didSSR] = useState($b5e257d569688ac6$export$535bd6ca7f90a273());
  let prefix =
    didSSR || process.env.NODE_ENV === 'test'
      ? 'react-aria'
      : `react-aria${$b5e257d569688ac6$var$defaultContext.prefix}`;
  return defaultId || `${prefix}-${id}`;
}
const $b5e257d569688ac6$export$619500959fc48b26 =
  typeof $73SJx$react['useId'] === 'function'
    ? $b5e257d569688ac6$var$useModernSSRSafeId
    : $b5e257d569688ac6$var$useLegacySSRSafeId;
function $b5e257d569688ac6$var$getSnapshot() {
  return false;
}
function $b5e257d569688ac6$var$getServerSnapshot() {
  return true;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function $b5e257d569688ac6$var$subscribe(onStoreChange) {
  // noop
  return () => {};
}
function $b5e257d569688ac6$export$535bd6ca7f90a273() {
  // In React 18, we can use useSyncExternalStore to detect if we're server rendering or hydrating.
  if (typeof $73SJx$react['useSyncExternalStore'] === 'function')
    return $73SJx$react['useSyncExternalStore'](
      $b5e257d569688ac6$var$subscribe,
      $b5e257d569688ac6$var$getSnapshot,
      $b5e257d569688ac6$var$getServerSnapshot
    );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useContext($b5e257d569688ac6$var$IsSSRContext);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c =
  typeof document !== 'undefined' ? $73SJx$react.useLayoutEffect : () => {};

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $8ae05eaa5c114e9c$export$7f54fc3180508a52(fn) {
  const ref = useRef(null);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    ref.current = fn;
  }, [fn]);
  return useCallback((...args) => {
    const f = ref.current;
    return f(...args);
  }, []);
}

function $1dbecbe27a04f9af$export$14d238f342723f25(defaultValue) {
  let [value, setValue] = useState(defaultValue);
  let effect = useRef(null);
  // Store the function in a ref so we can always access the current version
  // which has the proper `value` in scope.
  let nextRef = $8ae05eaa5c114e9c$export$7f54fc3180508a52(() => {
    // Run the generator to the next yield.
    let newValue = effect.current.next();
    // If the generator is done, reset the effect.
    if (newValue.done) {
      effect.current = null;
      return;
    }
    // If the value is the same as the current value,
    // then continue to the next yield. Otherwise,
    // set the value in state and wait for the next layout effect.
    if (value === newValue.value) nextRef();
    else setValue(newValue.value);
  });
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    // If there is an effect currently running, continue to the next yield.
    if (effect.current) nextRef();
  });
  let queue = $8ae05eaa5c114e9c$export$7f54fc3180508a52((fn) => {
    effect.current = fn(value);
    nextRef();
  });
  return [value, queue];
}

let $bdb11010cef70236$var$idsUpdaterMap = new Map();
function $bdb11010cef70236$export$f680877a34711e37(defaultId) {
  let [value, setValue] = useState(defaultId);
  let nextId = useRef(null);
  let res = $b5e257d569688ac6$export$619500959fc48b26(value);
  let updateValue = useCallback((val) => {
    nextId.current = val;
  }, []);
  $bdb11010cef70236$var$idsUpdaterMap.set(res, updateValue);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    let r = res;
    return () => {
      $bdb11010cef70236$var$idsUpdaterMap.delete(r);
    };
  }, [res]);
  // This cannot cause an infinite loop because the ref is updated first.
  // eslint-disable-next-line
  useEffect(() => {
    let newId = nextId.current;
    if (newId) {
      nextId.current = null;
      setValue(newId);
    }
  });
  return res;
}
function $bdb11010cef70236$export$cd8c9cb68f842629(idA, idB) {
  if (idA === idB) return idA;
  let setIdA = $bdb11010cef70236$var$idsUpdaterMap.get(idA);
  if (setIdA) {
    setIdA(idB);
    return idB;
  }
  let setIdB = $bdb11010cef70236$var$idsUpdaterMap.get(idB);
  if (setIdB) {
    setIdB(idA);
    return idA;
  }
  return idB;
}
function $bdb11010cef70236$export$b4cc09c592e8fdb8(depArray = []) {
  let id = $bdb11010cef70236$export$f680877a34711e37();
  let [resolvedId, setResolvedId] = $1dbecbe27a04f9af$export$14d238f342723f25(id);
  let updateId = useCallback(() => {
    setResolvedId(function* () {
      yield id;
      yield document.getElementById(id) ? id : undefined;
    });
  }, [id, setResolvedId]);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(updateId, [id, updateId, ...depArray]);
  return resolvedId;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /**
 * Calls all functions in the order they were chained with the same arguments.
 */ function $ff5963eb1fccf552$export$e08e3b67e392101e(...callbacks) {
  return (...args) => {
    for (let callback of callbacks) if (typeof callback === 'function') callback(...args);
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $3ef42575df84b30b$export$9d1611c77c2fe928(...args) {
  // Start with a base clone of the first argument. This is a lot faster than starting
  // with an empty object and adding properties as we go.
  let result = {
    ...args[0],
  };
  for (let i = 1; i < args.length; i++) {
    let props = args[i];
    for (let key in props) {
      let a = result[key];
      let b = props[key];
      // Chain events
      if (
        typeof a === 'function' &&
        typeof b === 'function' && // This is a lot faster than a regex.
        key[0] === 'o' &&
        key[1] === 'n' &&
        key.charCodeAt(2) >= /* 'A' */ 65 &&
        key.charCodeAt(2) <= /* 'Z' */ 90
      )
        result[key] = $ff5963eb1fccf552$export$e08e3b67e392101e(a, b);
      else if (
        (key === 'className' || key === 'UNSAFE_className') &&
        typeof a === 'string' &&
        typeof b === 'string'
      )
        result[key] = $12uGp$clsx(a, b);
      else if (key === 'id' && a && b) result.id = $bdb11010cef70236$export$cd8c9cb68f842629(a, b);
      else result[key] = b !== undefined ? b : a;
    }
  }
  return result;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ const $65484d02dcb7eb3e$var$DOMPropNames = new Set(['id']);
const $65484d02dcb7eb3e$var$labelablePropNames = new Set([
  'aria-label',
  'aria-labelledby',
  'aria-describedby',
  'aria-details',
]);
const $65484d02dcb7eb3e$var$propRe = /^(data-.*)$/;
function $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, opts = {}) {
  let { labelable: labelable, propNames: propNames } = opts;
  let filteredProps = {};
  for (const prop in props)
    if (
      Object.prototype.hasOwnProperty.call(props, prop) &&
      ($65484d02dcb7eb3e$var$DOMPropNames.has(prop) ||
        (labelable && $65484d02dcb7eb3e$var$labelablePropNames.has(prop)) ||
        (propNames === null || propNames === void 0 ? void 0 : propNames.has(prop)) ||
        $65484d02dcb7eb3e$var$propRe.test(prop))
    )
      filteredProps[prop] = props[prop];
  return filteredProps;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $7215afc6de606d6b$export$de79e2c695e052f3(element) {
  if ($7215afc6de606d6b$var$supportsPreventScroll())
    element.focus({
      preventScroll: true,
    });
  else {
    let scrollableElements = $7215afc6de606d6b$var$getScrollableElements(element);
    element.focus();
    $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements);
  }
}
let $7215afc6de606d6b$var$supportsPreventScrollCached = null;
function $7215afc6de606d6b$var$supportsPreventScroll() {
  if ($7215afc6de606d6b$var$supportsPreventScrollCached == null) {
    $7215afc6de606d6b$var$supportsPreventScrollCached = false;
    try {
      var focusElem = document.createElement('div');
      focusElem.focus({
        get preventScroll() {
          $7215afc6de606d6b$var$supportsPreventScrollCached = true;
          return true;
        },
      });
    } catch (e) {
      // Ignore
    }
  }
  return $7215afc6de606d6b$var$supportsPreventScrollCached;
}
function $7215afc6de606d6b$var$getScrollableElements(element) {
  var parent = element.parentNode;
  var scrollableElements = [];
  var rootScrollingElement = document.scrollingElement || document.documentElement;
  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth)
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft,
      });
    parent = parent.parentNode;
  }
  if (rootScrollingElement instanceof HTMLElement)
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft,
    });
  return scrollableElements;
}
function $7215afc6de606d6b$var$restoreScrollPosition(scrollableElements) {
  for (let {
    element: element,
    scrollTop: scrollTop,
    scrollLeft: scrollLeft,
  } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // We store a global list of elements that are currently transitioning,
// mapped to a set of CSS properties that are transitioning for that element.
// This is necessary rather than a simple count of transitions because of browser
// bugs, e.g. Chrome sometimes fires both transitionend and transitioncancel rather
// than one or the other. So we need to track what's actually transitioning so that
// we can ignore these duplicate events.
let $bbed8b41f857bcc0$var$transitionsByElement = new Map();
// A list of callbacks to call once there are no transitioning elements.
let $bbed8b41f857bcc0$var$transitionCallbacks = new Set();
function $bbed8b41f857bcc0$var$setupGlobalEvents() {
  if (typeof window === 'undefined') return;
  let onTransitionStart = (e) => {
    // Add the transitioning property to the list for this element.
    let transitions = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
    if (!transitions) {
      transitions = new Set();
      $bbed8b41f857bcc0$var$transitionsByElement.set(e.target, transitions);
      // The transitioncancel event must be registered on the element itself, rather than as a global
      // event. This enables us to handle when the node is deleted from the document while it is transitioning.
      // In that case, the cancel event would have nowhere to bubble to so we need to handle it directly.
      e.target.addEventListener('transitioncancel', onTransitionEnd);
    }
    transitions.add(e.propertyName);
  };
  let onTransitionEnd = (e) => {
    // Remove property from list of transitioning properties.
    let properties = $bbed8b41f857bcc0$var$transitionsByElement.get(e.target);
    if (!properties) return;
    properties.delete(e.propertyName);
    // If empty, remove transitioncancel event, and remove the element from the list of transitioning elements.
    if (properties.size === 0) {
      e.target.removeEventListener('transitioncancel', onTransitionEnd);
      $bbed8b41f857bcc0$var$transitionsByElement.delete(e.target);
    }
    // If no transitioning elements, call all of the queued callbacks.
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) {
      for (let cb of $bbed8b41f857bcc0$var$transitionCallbacks) cb();
      $bbed8b41f857bcc0$var$transitionCallbacks.clear();
    }
  };
  document.body.addEventListener('transitionrun', onTransitionStart);
  document.body.addEventListener('transitionend', onTransitionEnd);
}
if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') $bbed8b41f857bcc0$var$setupGlobalEvents();
  else document.addEventListener('DOMContentLoaded', $bbed8b41f857bcc0$var$setupGlobalEvents);
}
function $bbed8b41f857bcc0$export$24490316f764c430(fn) {
  // Wait one frame to see if an animation starts, e.g. a transition on mount.
  requestAnimationFrame(() => {
    // If no transitions are running, call the function immediately.
    // Otherwise, add it to a list of callbacks to run at the end of the animation.
    if ($bbed8b41f857bcc0$var$transitionsByElement.size === 0) fn();
    else $bbed8b41f857bcc0$var$transitionCallbacks.add(fn);
  });
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $03deb23ff14920c4$export$4eaf04e54aa8eed6() {
  let globalListeners = useRef(new Map());
  let addGlobalListener = useCallback((eventTarget, type, listener, options) => {
    // Make sure we remove the listener after it is called with the `once` option.
    let fn = (options === null || options === void 0 ? void 0 : options.once)
      ? (...args) => {
          globalListeners.current.delete(listener);
          listener(...args);
        }
      : listener;
    globalListeners.current.set(listener, {
      type: type,
      eventTarget: eventTarget,
      fn: fn,
      options: options,
    });
    eventTarget.addEventListener(type, listener, options);
  }, []);
  let removeGlobalListener = useCallback((eventTarget, type, listener, options) => {
    var _globalListeners_current_get;
    let fn =
      ((_globalListeners_current_get = globalListeners.current.get(listener)) === null ||
      _globalListeners_current_get === void 0
        ? void 0
        : _globalListeners_current_get.fn) || listener;
    eventTarget.removeEventListener(type, fn, options);
    globalListeners.current.delete(listener);
  }, []);
  let removeAllGlobalListeners = useCallback(() => {
    globalListeners.current.forEach((value, key) => {
      removeGlobalListener(value.eventTarget, value.type, key, value.options);
    });
  }, [removeGlobalListener]);
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return removeAllGlobalListeners;
  }, [removeAllGlobalListeners]);
  return {
    addGlobalListener: addGlobalListener,
    removeGlobalListener: removeGlobalListener,
    removeAllGlobalListeners: removeAllGlobalListeners,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $313b98861ee5dd6c$export$d6875122194c7b44(props, defaultLabel) {
  let { id: id, 'aria-label': label, 'aria-labelledby': labelledBy } = props;
  // If there is both an aria-label and aria-labelledby,
  // combine them by pointing to the element itself.
  id = $bdb11010cef70236$export$f680877a34711e37(id);
  if (labelledBy && label) {
    let ids = new Set([id, ...labelledBy.trim().split(/\s+/)]);
    labelledBy = [...ids].join(' ');
  } else if (labelledBy) labelledBy = labelledBy.trim().split(/\s+/).join(' ');
  // If no labels are provided, use the default
  if (!label && !labelledBy && defaultLabel) label = defaultLabel;
  return {
    id: id,
    'aria-label': label,
    'aria-labelledby': labelledBy,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref) {
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    if (context && context.ref && ref) {
      context.ref.current = ref.current;
      return () => {
        context.ref.current = null;
      };
    }
  }, [context, ref]);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $62d8ded9296f3872$export$cfa2225e87938781(node) {
  if ($62d8ded9296f3872$export$2bb74740c4e19def(node)) node = node.parentElement;
  while (node && !$62d8ded9296f3872$export$2bb74740c4e19def(node)) node = node.parentElement;
  return node || document.scrollingElement || document.documentElement;
}
function $62d8ded9296f3872$export$2bb74740c4e19def(node) {
  let style = window.getComputedStyle(node);
  return /(auto|scroll)/.test(style.overflow + style.overflowX + style.overflowY);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

let $ef06256079686ba0$var$descriptionId = 0;
const $ef06256079686ba0$var$descriptionNodes = new Map();
function $ef06256079686ba0$export$f8aeda7b10753fa1(description) {
  let [id, setId] = useState(undefined);
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    if (!description) return;
    let desc = $ef06256079686ba0$var$descriptionNodes.get(description);
    if (!desc) {
      let id = `react-aria-description-${$ef06256079686ba0$var$descriptionId++}`;
      setId(id);
      let node = document.createElement('div');
      node.id = id;
      node.style.display = 'none';
      node.textContent = description;
      document.body.appendChild(node);
      desc = {
        refCount: 0,
        element: node,
      };
      $ef06256079686ba0$var$descriptionNodes.set(description, desc);
    } else setId(desc.element.id);
    desc.refCount++;
    return () => {
      if (--desc.refCount === 0) {
        desc.element.remove();
        $ef06256079686ba0$var$descriptionNodes.delete(description);
      }
    };
  }, [description]);
  return {
    'aria-describedby': description ? id : undefined,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $c87311424ea30a05$var$testUserAgent(re) {
  var _window_navigator_userAgentData;
  if (typeof window === 'undefined' || window.navigator == null) return false;
  return (
    ((_window_navigator_userAgentData = window.navigator['userAgentData']) === null ||
    _window_navigator_userAgentData === void 0
      ? void 0
      : _window_navigator_userAgentData.brands.some((brand) => re.test(brand.brand))) ||
    re.test(window.navigator.userAgent)
  );
}
function $c87311424ea30a05$var$testPlatform(re) {
  var _window_navigator_userAgentData;
  return typeof window !== 'undefined' && window.navigator != null
    ? re.test(
        ((_window_navigator_userAgentData = window.navigator['userAgentData']) === null ||
        _window_navigator_userAgentData === void 0
          ? void 0
          : _window_navigator_userAgentData.platform) || window.navigator.platform
      )
    : false;
}
function $c87311424ea30a05$export$9ac100e40613ea10() {
  return $c87311424ea30a05$var$testPlatform(/^Mac/i);
}
function $c87311424ea30a05$export$186c6964ca17d99() {
  return $c87311424ea30a05$var$testPlatform(/^iPhone/i);
}
function $c87311424ea30a05$export$7bef049ce92e4224() {
  return (
    $c87311424ea30a05$var$testPlatform(/^iPad/i) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
    ($c87311424ea30a05$export$9ac100e40613ea10() && navigator.maxTouchPoints > 1)
  );
}
function $c87311424ea30a05$export$fedb369cb70207f1() {
  return $c87311424ea30a05$export$186c6964ca17d99() || $c87311424ea30a05$export$7bef049ce92e4224();
}
function $c87311424ea30a05$export$e1865c3bedcd822b() {
  return $c87311424ea30a05$export$9ac100e40613ea10() || $c87311424ea30a05$export$fedb369cb70207f1();
}
function $c87311424ea30a05$export$78551043582a6a98() {
  return (
    $c87311424ea30a05$var$testUserAgent(/AppleWebKit/i) &&
    !$c87311424ea30a05$export$6446a186d09e379e()
  );
}
function $c87311424ea30a05$export$6446a186d09e379e() {
  return $c87311424ea30a05$var$testUserAgent(/Chrome/i);
}
function $c87311424ea30a05$export$a11b0059900ceec8() {
  return $c87311424ea30a05$var$testUserAgent(/Android/i);
}

/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $e9faafb641e167db$export$90fc3a17d93f704c(ref, event, handler, options) {
  let handleEvent = $8ae05eaa5c114e9c$export$7f54fc3180508a52(handler);
  let isDisabled = handler == null;
  useEffect(() => {
    if (isDisabled) return;
    let element = ref.current;
    element.addEventListener(event, handleEvent, options);
    return () => {
      element.removeEventListener(event, handleEvent, options);
    };
  }, [ref, event, options, isDisabled, handleEvent]);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $2f04cbc44ee30ce0$export$53a0910f038337bd(scrollView, element) {
  let offsetX = $2f04cbc44ee30ce0$var$relativeOffset(scrollView, element, 'left');
  let offsetY = $2f04cbc44ee30ce0$var$relativeOffset(scrollView, element, 'top');
  let width = element.offsetWidth;
  let height = element.offsetHeight;
  let x = scrollView.scrollLeft;
  let y = scrollView.scrollTop;
  // Account for top/left border offsetting the scroll top/Left
  let { borderTopWidth: borderTopWidth, borderLeftWidth: borderLeftWidth } =
    getComputedStyle(scrollView);
  let borderAdjustedX = scrollView.scrollLeft + parseInt(borderLeftWidth, 10);
  let borderAdjustedY = scrollView.scrollTop + parseInt(borderTopWidth, 10);
  // Ignore end/bottom border via clientHeight/Width instead of offsetHeight/Width
  let maxX = borderAdjustedX + scrollView.clientWidth;
  let maxY = borderAdjustedY + scrollView.clientHeight;
  if (offsetX <= x) x = offsetX - parseInt(borderLeftWidth, 10);
  else if (offsetX + width > maxX) x += offsetX + width - maxX;
  if (offsetY <= borderAdjustedY) y = offsetY - parseInt(borderTopWidth, 10);
  else if (offsetY + height > maxY) y += offsetY + height - maxY;
  scrollView.scrollLeft = x;
  scrollView.scrollTop = y;
}
/**
 * Computes the offset left or top from child to ancestor by accumulating
 * offsetLeft or offsetTop through intervening offsetParents.
 */ function $2f04cbc44ee30ce0$var$relativeOffset(ancestor, child, axis) {
  const prop = axis === 'left' ? 'offsetLeft' : 'offsetTop';
  let sum = 0;
  while (child.offsetParent) {
    sum += child[prop];
    if (child.offsetParent === ancestor) break;
    else if (child.offsetParent.contains(ancestor)) {
      // If the ancestor is not `position:relative`, then we stop at
      // _its_ offset parent, and we subtract off _its_ offset, so that
      // we end up with the proper offset from child to ancestor.
      sum -= ancestor[prop];
      break;
    }
    child = child.offsetParent;
  }
  return sum;
}
function $2f04cbc44ee30ce0$export$c826860796309d1b(targetElement, opts) {
  if (document.contains(targetElement)) {
    let root = document.scrollingElement || document.documentElement;
    let isScrollPrevented = window.getComputedStyle(root).overflow === 'hidden';
    // If scrolling is not currently prevented then we aren’t in a overlay nor is a overlay open, just use element.scrollIntoView to bring the element into view
    if (!isScrollPrevented) {
      var // use scrollIntoView({block: 'nearest'}) instead of .focus to check if the element is fully in view or not since .focus()
        // won't cause a scroll if the element is already focused and doesn't behave consistently when an element is partially out of view horizontally vs vertically
        _targetElement_scrollIntoView;
      let { left: originalLeft, top: originalTop } = targetElement.getBoundingClientRect();
      targetElement === null || targetElement === void 0
        ? void 0
        : (_targetElement_scrollIntoView = targetElement.scrollIntoView) === null ||
          _targetElement_scrollIntoView === void 0
        ? void 0
        : _targetElement_scrollIntoView.call(targetElement, {
            block: 'nearest',
          });
      let { left: newLeft, top: newTop } = targetElement.getBoundingClientRect();
      // Account for sub pixel differences from rounding
      if (Math.abs(originalLeft - newLeft) > 1 || Math.abs(originalTop - newTop) > 1) {
        var _opts_containingElement,
          _opts_containingElement_scrollIntoView,
          _targetElement_scrollIntoView1;
        opts === null || opts === void 0
          ? void 0
          : (_opts_containingElement = opts.containingElement) === null ||
            _opts_containingElement === void 0
          ? void 0
          : (_opts_containingElement_scrollIntoView = _opts_containingElement.scrollIntoView) ===
              null || _opts_containingElement_scrollIntoView === void 0
          ? void 0
          : _opts_containingElement_scrollIntoView.call(_opts_containingElement, {
              block: 'center',
              inline: 'center',
            });
        (_targetElement_scrollIntoView1 = targetElement.scrollIntoView) === null ||
        _targetElement_scrollIntoView1 === void 0
          ? void 0
          : _targetElement_scrollIntoView1.call(targetElement, {
              block: 'nearest',
            });
      }
    } else {
      let scrollParent = $62d8ded9296f3872$export$cfa2225e87938781(targetElement);
      // If scrolling is prevented, we don't want to scroll the body since it might move the overlay partially offscreen and the user can't scroll it back into view.
      while (targetElement && scrollParent && targetElement !== root && scrollParent !== root) {
        $2f04cbc44ee30ce0$export$53a0910f038337bd(scrollParent, targetElement);
        targetElement = scrollParent;
        scrollParent = $62d8ded9296f3872$export$cfa2225e87938781(targetElement);
      }
    }
  }
}

/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $6a7db85432448f7f$export$60278871457622de(event) {
  // JAWS/NVDA with Firefox.
  if (event.mozInputSource === 0 && event.isTrusted) return true;
  // Android TalkBack's detail value varies depending on the event listener providing the event so we have specific logic here instead
  // If pointerType is defined, event is from a click listener. For events from mousedown listener, detail === 0 is a sufficient check
  // to detect TalkBack virtual clicks.
  if ($c87311424ea30a05$export$a11b0059900ceec8() && event.pointerType)
    return event.type === 'click' && event.buttons === 1;
  return event.detail === 0 && !event.pointerType;
}
function $6a7db85432448f7f$export$29bf1b5f2c56cf63(event) {
  // If the pointer size is zero, then we assume it's from a screen reader.
  // Android TalkBack double tap will sometimes return a event with width and height of 1
  // and pointerType === 'mouse' so we need to check for a specific combination of event attributes.
  // Cannot use "event.pressure === 0" as the sole check due to Safari pointer events always returning pressure === 0
  // instead of .5, see https://bugs.webkit.org/show_bug.cgi?id=206216. event.pointerType === 'mouse' is to distingush
  // Talkback double tap from Windows Firefox touch screen press
  return (
    (!$c87311424ea30a05$export$a11b0059900ceec8() && event.width === 0 && event.height === 0) ||
    (event.width === 1 &&
      event.height === 1 &&
      event.pressure === 0 &&
      event.detail === 0 &&
      event.pointerType === 'mouse')
  );
}

/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $99facab73266f662$export$5add1d006293d136(ref, initialValue, onReset) {
  let resetValue = useRef(initialValue);
  let handleReset = $8ae05eaa5c114e9c$export$7f54fc3180508a52(() => {
    if (onReset) onReset(resetValue.current);
  });
  useEffect(() => {
    var _ref_current;
    let form =
      ref === null || ref === void 0
        ? void 0
        : (_ref_current = ref.current) === null || _ref_current === void 0
        ? void 0
        : _ref_current.form;
    form === null || form === void 0 ? void 0 : form.addEventListener('reset', handleReset);
    return () => {
      form === null || form === void 0 ? void 0 : form.removeEventListener('reset', handleReset);
    };
  }, [ref, handleReset]);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
// Note that state only matters here for iOS. Non-iOS gets user-select: none applied to the target element
// rather than at the document level so we just need to apply/remove user-select: none for each pressed element individually
let $14c0b72509d70225$var$state = 'default';
let $14c0b72509d70225$var$savedUserSelect = '';
let $14c0b72509d70225$var$modifiedElementMap = new WeakMap();
function $14c0b72509d70225$export$16a4697467175487(target) {
  if ($c87311424ea30a05$export$fedb369cb70207f1()) {
    if ($14c0b72509d70225$var$state === 'default') {
      $14c0b72509d70225$var$savedUserSelect = document.documentElement.style.webkitUserSelect;
      document.documentElement.style.webkitUserSelect = 'none';
    }
    $14c0b72509d70225$var$state = 'disabled';
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    // If not iOS, store the target's original user-select and change to user-select: none
    // Ignore state since it doesn't apply for non iOS
    $14c0b72509d70225$var$modifiedElementMap.set(target, target.style.userSelect);
    target.style.userSelect = 'none';
  }
}
function $14c0b72509d70225$export$b0d6fa1ab32e3295(target) {
  if ($c87311424ea30a05$export$fedb369cb70207f1()) {
    // If the state is already default, there's nothing to do.
    // If it is restoring, then there's no need to queue a second restore.
    if ($14c0b72509d70225$var$state !== 'disabled') return;
    $14c0b72509d70225$var$state = 'restoring';
    // There appears to be a delay on iOS where selection still might occur
    // after pointer up, so wait a bit before removing user-select.
    setTimeout(() => {
      // Wait for any CSS transitions to complete so we don't recompute style
      // for the whole page in the middle of the animation and cause jank.
      $bbed8b41f857bcc0$export$24490316f764c430(() => {
        // Avoid race conditions
        if ($14c0b72509d70225$var$state === 'restoring') {
          if (document.documentElement.style.webkitUserSelect === 'none')
            document.documentElement.style.webkitUserSelect =
              $14c0b72509d70225$var$savedUserSelect || '';
          $14c0b72509d70225$var$savedUserSelect = '';
          $14c0b72509d70225$var$state = 'default';
        }
      });
    }, 300);
  } else if (target instanceof HTMLElement || target instanceof SVGElement) {
    // If not iOS, restore the target's original user-select if any
    // Ignore state since it doesn't apply for non iOS
    if (target && $14c0b72509d70225$var$modifiedElementMap.has(target)) {
      let targetOldUserSelect = $14c0b72509d70225$var$modifiedElementMap.get(target);
      if (target.style.userSelect === 'none') target.style.userSelect = targetOldUserSelect;
      if (target.getAttribute('style') === '') target.removeAttribute('style');
      $14c0b72509d70225$var$modifiedElementMap.delete(target);
    }
  }
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const $ae1eeba8b9eafd08$export$5165eccb35aaadb5 = $73SJx$react.createContext(null);
$ae1eeba8b9eafd08$export$5165eccb35aaadb5.displayName = 'PressResponderContext';

function $f6c31cce2adf654f$var$usePressResponderContext(props) {
  // Consume context from <PressResponder> and merge with props.
  let context = useContext($ae1eeba8b9eafd08$export$5165eccb35aaadb5);
  if (context) {
    let { register: register, ...contextProps } = context;
    props = $3ef42575df84b30b$export$9d1611c77c2fe928(contextProps, props);
    register();
  }
  $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, props.ref);
  return props;
}
var $f6c31cce2adf654f$var$_shouldStopPropagation = /*#__PURE__*/ new WeakMap();
class $f6c31cce2adf654f$var$PressEvent {
  continuePropagation() {
    _(this, $f6c31cce2adf654f$var$_shouldStopPropagation, false);
  }
  get shouldStopPropagation() {
    return _$1(this, $f6c31cce2adf654f$var$_shouldStopPropagation);
  }
  constructor(type, pointerType, originalEvent) {
    _$2(this, $f6c31cce2adf654f$var$_shouldStopPropagation, {
      writable: true,
      value: void 0,
    });
    _(this, $f6c31cce2adf654f$var$_shouldStopPropagation, true);
    this.type = type;
    this.pointerType = pointerType;
    this.target = originalEvent.currentTarget;
    this.shiftKey = originalEvent.shiftKey;
    this.metaKey = originalEvent.metaKey;
    this.ctrlKey = originalEvent.ctrlKey;
    this.altKey = originalEvent.altKey;
  }
}
function $f6c31cce2adf654f$export$45712eceda6fad21(props) {
  let {
    onPress: onPress,
    onPressChange: onPressChange,
    onPressStart: onPressStart,
    onPressEnd: onPressEnd,
    onPressUp: onPressUp,
    isDisabled: isDisabled,
    isPressed: isPressedProp,
    preventFocusOnPress: preventFocusOnPress,
    shouldCancelOnPointerExit: shouldCancelOnPointerExit,
    allowTextSelectionOnPress: allowTextSelectionOnPress, // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref: _,
    ...domProps
  } = $f6c31cce2adf654f$var$usePressResponderContext(props);
  let [isPressed, setPressed] = useState(false);
  let ref = useRef({
    isPressed: false,
    ignoreEmulatedMouseEvents: false,
    ignoreClickAfterPress: false,
    didFirePressStart: false,
    activePointerId: null,
    target: null,
    isOverTarget: false,
    pointerType: null,
  });
  let { addGlobalListener: addGlobalListener, removeAllGlobalListeners: removeAllGlobalListeners } =
    $03deb23ff14920c4$export$4eaf04e54aa8eed6();
  let triggerPressStart = $8ae05eaa5c114e9c$export$7f54fc3180508a52(
    (originalEvent, pointerType) => {
      let state = ref.current;
      if (isDisabled || state.didFirePressStart) return;
      let shouldStopPropagation = true;
      if (onPressStart) {
        let event = new $f6c31cce2adf654f$var$PressEvent('pressstart', pointerType, originalEvent);
        onPressStart(event);
        shouldStopPropagation = event.shouldStopPropagation;
      }
      if (onPressChange) onPressChange(true);
      state.didFirePressStart = true;
      setPressed(true);
      return shouldStopPropagation;
    }
  );
  let triggerPressEnd = $8ae05eaa5c114e9c$export$7f54fc3180508a52(
    (originalEvent, pointerType, wasPressed = true) => {
      let state = ref.current;
      if (!state.didFirePressStart) return;
      state.ignoreClickAfterPress = true;
      state.didFirePressStart = false;
      let shouldStopPropagation = true;
      if (onPressEnd) {
        let event = new $f6c31cce2adf654f$var$PressEvent('pressend', pointerType, originalEvent);
        onPressEnd(event);
        shouldStopPropagation = event.shouldStopPropagation;
      }
      if (onPressChange) onPressChange(false);
      setPressed(false);
      if (onPress && wasPressed && !isDisabled) {
        let event = new $f6c31cce2adf654f$var$PressEvent('press', pointerType, originalEvent);
        onPress(event);
        shouldStopPropagation && (shouldStopPropagation = event.shouldStopPropagation);
      }
      return shouldStopPropagation;
    }
  );
  let triggerPressUp = $8ae05eaa5c114e9c$export$7f54fc3180508a52((originalEvent, pointerType) => {
    if (isDisabled) return;
    if (onPressUp) {
      let event = new $f6c31cce2adf654f$var$PressEvent('pressup', pointerType, originalEvent);
      onPressUp(event);
      return event.shouldStopPropagation;
    }
    return true;
  });
  let cancel = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
    let state = ref.current;
    if (state.isPressed) {
      if (state.isOverTarget)
        triggerPressEnd(
          $f6c31cce2adf654f$var$createEvent(state.target, e),
          state.pointerType,
          false
        );
      state.isPressed = false;
      state.isOverTarget = false;
      state.activePointerId = null;
      state.pointerType = null;
      removeAllGlobalListeners();
      if (!allowTextSelectionOnPress) $14c0b72509d70225$export$b0d6fa1ab32e3295(state.target);
    }
  });
  let cancelOnPointerExit = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
    if (shouldCancelOnPointerExit) cancel(e);
  });
  let pressProps = useMemo(() => {
    let state = ref.current;
    let pressProps = {
      onKeyDown(e) {
        if (
          $f6c31cce2adf654f$var$isValidKeyboardEvent(e.nativeEvent, e.currentTarget) &&
          e.currentTarget.contains(e.target)
        ) {
          if ($f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(e.target, e.key))
            e.preventDefault();
          // If the event is repeating, it may have started on a different element
          // after which focus moved to the current element. Ignore these events and
          // only handle the first key down event.
          let shouldStopPropagation = true;
          if (!state.isPressed && !e.repeat) {
            state.target = e.currentTarget;
            state.isPressed = true;
            shouldStopPropagation = triggerPressStart(e, 'keyboard');
            // Focus may move before the key up event, so register the event on the document
            // instead of the same element where the key down event occurred.
            addGlobalListener(document, 'keyup', onKeyUp, false);
          }
          if (shouldStopPropagation) e.stopPropagation();
        } else if (e.key === 'Enter' && $f6c31cce2adf654f$var$isHTMLAnchorLink(e.currentTarget))
          // If the target is a link, we won't have handled this above because we want the default
          // browser behavior to open the link when pressing Enter. But we still need to prevent
          // default so that elements above do not also handle it (e.g. table row).
          e.stopPropagation();
      },
      onKeyUp(e) {
        if (
          $f6c31cce2adf654f$var$isValidKeyboardEvent(e.nativeEvent, e.currentTarget) &&
          !e.repeat &&
          e.currentTarget.contains(e.target)
        )
          triggerPressUp($f6c31cce2adf654f$var$createEvent(state.target, e), 'keyboard');
      },
      onClick(e) {
        if (e && !e.currentTarget.contains(e.target)) return;
        if (e && e.button === 0) {
          let shouldStopPropagation = true;
          if (isDisabled) e.preventDefault();
          // If triggered from a screen reader or by using element.click(),
          // trigger as if it were a keyboard click.
          if (
            !state.ignoreClickAfterPress &&
            !state.ignoreEmulatedMouseEvents &&
            (state.pointerType === 'virtual' ||
              $6a7db85432448f7f$export$60278871457622de(e.nativeEvent))
          ) {
            // Ensure the element receives focus (VoiceOver on iOS does not do this)
            if (!isDisabled && !preventFocusOnPress)
              $7215afc6de606d6b$export$de79e2c695e052f3(e.currentTarget);
            let stopPressStart = triggerPressStart(e, 'virtual');
            let stopPressUp = triggerPressUp(e, 'virtual');
            let stopPressEnd = triggerPressEnd(e, 'virtual');
            shouldStopPropagation = stopPressStart && stopPressUp && stopPressEnd;
          }
          state.ignoreEmulatedMouseEvents = false;
          state.ignoreClickAfterPress = false;
          if (shouldStopPropagation) e.stopPropagation();
        }
      },
    };
    let onKeyUp = (e) => {
      if (state.isPressed && $f6c31cce2adf654f$var$isValidKeyboardEvent(e, state.target)) {
        if ($f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(e.target, e.key)) e.preventDefault();
        state.isPressed = false;
        let target = e.target;
        let shouldStopPropagation = triggerPressEnd(
          $f6c31cce2adf654f$var$createEvent(state.target, e),
          'keyboard',
          state.target.contains(target)
        );
        removeAllGlobalListeners();
        if (shouldStopPropagation) e.stopPropagation();
        // If the target is a link, trigger the click method to open the URL,
        // but defer triggering pressEnd until onClick event handler.
        if (
          state.target instanceof HTMLElement &&
          state.target.contains(target) &&
          ($f6c31cce2adf654f$var$isHTMLAnchorLink(state.target) ||
            state.target.getAttribute('role') === 'link')
        )
          state.target.click();
      }
    };
    if (typeof PointerEvent !== 'undefined') {
      pressProps.onPointerDown = (e) => {
        // Only handle left clicks, and ignore events that bubbled through portals.
        if (e.button !== 0 || !e.currentTarget.contains(e.target)) return;
        // iOS safari fires pointer events from VoiceOver with incorrect coordinates/target.
        // Ignore and let the onClick handler take care of it instead.
        // https://bugs.webkit.org/show_bug.cgi?id=222627
        // https://bugs.webkit.org/show_bug.cgi?id=223202
        if ($6a7db85432448f7f$export$29bf1b5f2c56cf63(e.nativeEvent)) {
          state.pointerType = 'virtual';
          return;
        }
        // Due to browser inconsistencies, especially on mobile browsers, we prevent
        // default on pointer down and handle focusing the pressable element ourselves.
        if ($f6c31cce2adf654f$var$shouldPreventDefault(e.currentTarget)) e.preventDefault();
        state.pointerType = e.pointerType;
        let shouldStopPropagation = true;
        if (!state.isPressed) {
          state.isPressed = true;
          state.isOverTarget = true;
          state.activePointerId = e.pointerId;
          state.target = e.currentTarget;
          if (!isDisabled && !preventFocusOnPress)
            $7215afc6de606d6b$export$de79e2c695e052f3(e.currentTarget);
          if (!allowTextSelectionOnPress) $14c0b72509d70225$export$16a4697467175487(state.target);
          shouldStopPropagation = triggerPressStart(e, state.pointerType);
          addGlobalListener(document, 'pointermove', onPointerMove, false);
          addGlobalListener(document, 'pointerup', onPointerUp, false);
          addGlobalListener(document, 'pointercancel', onPointerCancel, false);
        }
        if (shouldStopPropagation) e.stopPropagation();
      };
      pressProps.onMouseDown = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        if (e.button === 0) {
          // Chrome and Firefox on touch Windows devices require mouse down events
          // to be canceled in addition to pointer events, or an extra asynchronous
          // focus event will be fired.
          if ($f6c31cce2adf654f$var$shouldPreventDefault(e.currentTarget)) e.preventDefault();
          e.stopPropagation();
        }
      };
      pressProps.onPointerUp = (e) => {
        // iOS fires pointerup with zero width and height, so check the pointerType recorded during pointerdown.
        if (!e.currentTarget.contains(e.target) || state.pointerType === 'virtual') return;
        // Only handle left clicks
        // Safari on iOS sometimes fires pointerup events, even
        // when the touch isn't over the target, so double check.
        if (e.button === 0 && $f6c31cce2adf654f$var$isOverTarget(e, e.currentTarget))
          triggerPressUp(e, state.pointerType || e.pointerType);
      };
      // Safari on iOS < 13.2 does not implement pointerenter/pointerleave events correctly.
      // Use pointer move events instead to implement our own hit testing.
      // See https://bugs.webkit.org/show_bug.cgi?id=199803
      let onPointerMove = (e) => {
        if (e.pointerId !== state.activePointerId) return;
        if ($f6c31cce2adf654f$var$isOverTarget(e, state.target)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            triggerPressStart(
              $f6c31cce2adf654f$var$createEvent(state.target, e),
              state.pointerType
            );
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          triggerPressEnd(
            $f6c31cce2adf654f$var$createEvent(state.target, e),
            state.pointerType,
            false
          );
          cancelOnPointerExit(e);
        }
      };
      let onPointerUp = (e) => {
        if (e.pointerId === state.activePointerId && state.isPressed && e.button === 0) {
          if ($f6c31cce2adf654f$var$isOverTarget(e, state.target))
            triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType);
          else if (state.isOverTarget)
            triggerPressEnd(
              $f6c31cce2adf654f$var$createEvent(state.target, e),
              state.pointerType,
              false
            );
          state.isPressed = false;
          state.isOverTarget = false;
          state.activePointerId = null;
          state.pointerType = null;
          removeAllGlobalListeners();
          if (!allowTextSelectionOnPress) $14c0b72509d70225$export$b0d6fa1ab32e3295(state.target);
        }
      };
      let onPointerCancel = (e) => {
        cancel(e);
      };
      pressProps.onDragStart = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        // Safari does not call onPointerCancel when a drag starts, whereas Chrome and Firefox do.
        cancel(e);
      };
    } else {
      pressProps.onMouseDown = (e) => {
        // Only handle left clicks
        if (e.button !== 0 || !e.currentTarget.contains(e.target)) return;
        // Due to browser inconsistencies, especially on mobile browsers, we prevent
        // default on mouse down and handle focusing the pressable element ourselves.
        if ($f6c31cce2adf654f$var$shouldPreventDefault(e.currentTarget)) e.preventDefault();
        if (state.ignoreEmulatedMouseEvents) {
          e.stopPropagation();
          return;
        }
        state.isPressed = true;
        state.isOverTarget = true;
        state.target = e.currentTarget;
        state.pointerType = $6a7db85432448f7f$export$60278871457622de(e.nativeEvent)
          ? 'virtual'
          : 'mouse';
        if (!isDisabled && !preventFocusOnPress)
          $7215afc6de606d6b$export$de79e2c695e052f3(e.currentTarget);
        let shouldStopPropagation = triggerPressStart(e, state.pointerType);
        if (shouldStopPropagation) e.stopPropagation();
        addGlobalListener(document, 'mouseup', onMouseUp, false);
      };
      pressProps.onMouseEnter = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        let shouldStopPropagation = true;
        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = true;
          shouldStopPropagation = triggerPressStart(e, state.pointerType);
        }
        if (shouldStopPropagation) e.stopPropagation();
      };
      pressProps.onMouseLeave = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        let shouldStopPropagation = true;
        if (state.isPressed && !state.ignoreEmulatedMouseEvents) {
          state.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd(e, state.pointerType, false);
          cancelOnPointerExit(e);
        }
        if (shouldStopPropagation) e.stopPropagation();
      };
      pressProps.onMouseUp = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        if (!state.ignoreEmulatedMouseEvents && e.button === 0)
          triggerPressUp(e, state.pointerType);
      };
      let onMouseUp = (e) => {
        // Only handle left clicks
        if (e.button !== 0) return;
        state.isPressed = false;
        removeAllGlobalListeners();
        if (state.ignoreEmulatedMouseEvents) {
          state.ignoreEmulatedMouseEvents = false;
          return;
        }
        if ($f6c31cce2adf654f$var$isOverTarget(e, state.target))
          triggerPressEnd($f6c31cce2adf654f$var$createEvent(state.target, e), state.pointerType);
        else if (state.isOverTarget)
          triggerPressEnd(
            $f6c31cce2adf654f$var$createEvent(state.target, e),
            state.pointerType,
            false
          );
        state.isOverTarget = false;
      };
      pressProps.onTouchStart = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        let touch = $f6c31cce2adf654f$var$getTouchFromEvent(e.nativeEvent);
        if (!touch) return;
        state.activePointerId = touch.identifier;
        state.ignoreEmulatedMouseEvents = true;
        state.isOverTarget = true;
        state.isPressed = true;
        state.target = e.currentTarget;
        state.pointerType = 'touch';
        // Due to browser inconsistencies, especially on mobile browsers, we prevent default
        // on the emulated mouse event and handle focusing the pressable element ourselves.
        if (!isDisabled && !preventFocusOnPress)
          $7215afc6de606d6b$export$de79e2c695e052f3(e.currentTarget);
        if (!allowTextSelectionOnPress) $14c0b72509d70225$export$16a4697467175487(state.target);
        let shouldStopPropagation = triggerPressStart(e, state.pointerType);
        if (shouldStopPropagation) e.stopPropagation();
        addGlobalListener(window, 'scroll', onScroll, true);
      };
      pressProps.onTouchMove = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        if (!state.isPressed) {
          e.stopPropagation();
          return;
        }
        let touch = $f6c31cce2adf654f$var$getTouchById(e.nativeEvent, state.activePointerId);
        let shouldStopPropagation = true;
        if (touch && $f6c31cce2adf654f$var$isOverTarget(touch, e.currentTarget)) {
          if (!state.isOverTarget) {
            state.isOverTarget = true;
            shouldStopPropagation = triggerPressStart(e, state.pointerType);
          }
        } else if (state.isOverTarget) {
          state.isOverTarget = false;
          shouldStopPropagation = triggerPressEnd(e, state.pointerType, false);
          cancelOnPointerExit(e);
        }
        if (shouldStopPropagation) e.stopPropagation();
      };
      pressProps.onTouchEnd = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        if (!state.isPressed) {
          e.stopPropagation();
          return;
        }
        let touch = $f6c31cce2adf654f$var$getTouchById(e.nativeEvent, state.activePointerId);
        let shouldStopPropagation = true;
        if (touch && $f6c31cce2adf654f$var$isOverTarget(touch, e.currentTarget)) {
          triggerPressUp(e, state.pointerType);
          shouldStopPropagation = triggerPressEnd(e, state.pointerType);
        } else if (state.isOverTarget)
          shouldStopPropagation = triggerPressEnd(e, state.pointerType, false);
        if (shouldStopPropagation) e.stopPropagation();
        state.isPressed = false;
        state.activePointerId = null;
        state.isOverTarget = false;
        state.ignoreEmulatedMouseEvents = true;
        if (!allowTextSelectionOnPress) $14c0b72509d70225$export$b0d6fa1ab32e3295(state.target);
        removeAllGlobalListeners();
      };
      pressProps.onTouchCancel = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        e.stopPropagation();
        if (state.isPressed) cancel(e);
      };
      let onScroll = (e) => {
        if (state.isPressed && e.target.contains(state.target))
          cancel({
            currentTarget: state.target,
            shiftKey: false,
            ctrlKey: false,
            metaKey: false,
            altKey: false,
          });
      };
      pressProps.onDragStart = (e) => {
        if (!e.currentTarget.contains(e.target)) return;
        cancel(e);
      };
    }
    return pressProps;
  }, [
    addGlobalListener,
    isDisabled,
    preventFocusOnPress,
    removeAllGlobalListeners,
    allowTextSelectionOnPress,
    cancel,
    cancelOnPointerExit,
    triggerPressEnd,
    triggerPressStart,
    triggerPressUp,
  ]);
  // Remove user-select: none in case component unmounts immediately after pressStart
  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      if (!allowTextSelectionOnPress)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        $14c0b72509d70225$export$b0d6fa1ab32e3295(ref.current.target);
    };
  }, [allowTextSelectionOnPress]);
  return {
    isPressed: isPressedProp || isPressed,
    pressProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, pressProps),
  };
}
function $f6c31cce2adf654f$var$isHTMLAnchorLink(target) {
  return target.tagName === 'A' && target.hasAttribute('href');
}
function $f6c31cce2adf654f$var$isValidKeyboardEvent(event, currentTarget) {
  const { key: key, code: code } = event;
  const element = currentTarget;
  const role = element.getAttribute('role');
  // Accessibility for keyboards. Space and Enter only.
  // "Spacebar" is for IE 11
  return (
    (key === 'Enter' || key === ' ' || key === 'Spacebar' || code === 'Space') &&
    !(
      (element instanceof HTMLInputElement &&
        !$f6c31cce2adf654f$var$isValidInputKey(element, key)) ||
      element instanceof HTMLTextAreaElement ||
      element.isContentEditable
    ) && // A link with a valid href should be handled natively,
    // unless it also has role='button' and was triggered using Space.
    (!$f6c31cce2adf654f$var$isHTMLAnchorLink(element) || (role === 'button' && key !== 'Enter')) && // An element with role='link' should only trigger with Enter key
    !(role === 'link' && key !== 'Enter')
  );
}
function $f6c31cce2adf654f$var$getTouchFromEvent(event) {
  const { targetTouches: targetTouches } = event;
  if (targetTouches.length > 0) return targetTouches[0];
  return null;
}
function $f6c31cce2adf654f$var$getTouchById(event, pointerId) {
  const changedTouches = event.changedTouches;
  for (let i = 0; i < changedTouches.length; i++) {
    const touch = changedTouches[i];
    if (touch.identifier === pointerId) return touch;
  }
  return null;
}
function $f6c31cce2adf654f$var$createEvent(target, e) {
  return {
    currentTarget: target,
    shiftKey: e.shiftKey,
    ctrlKey: e.ctrlKey,
    metaKey: e.metaKey,
    altKey: e.altKey,
  };
}
function $f6c31cce2adf654f$var$getPointClientRect(point) {
  let offsetX = point.width / 2 || point.radiusX || 0;
  let offsetY = point.height / 2 || point.radiusY || 0;
  return {
    top: point.clientY - offsetY,
    right: point.clientX + offsetX,
    bottom: point.clientY + offsetY,
    left: point.clientX - offsetX,
  };
}
function $f6c31cce2adf654f$var$areRectanglesOverlapping(a, b) {
  // check if they cannot overlap on x axis
  if (a.left > b.right || b.left > a.right) return false;
  // check if they cannot overlap on y axis
  if (a.top > b.bottom || b.top > a.bottom) return false;
  return true;
}
function $f6c31cce2adf654f$var$isOverTarget(point, target) {
  let rect = target.getBoundingClientRect();
  let pointRect = $f6c31cce2adf654f$var$getPointClientRect(point);
  return $f6c31cce2adf654f$var$areRectanglesOverlapping(rect, pointRect);
}
function $f6c31cce2adf654f$var$shouldPreventDefault(target) {
  // We cannot prevent default if the target is a draggable element.
  return !(target instanceof HTMLElement) || !target.draggable;
}
function $f6c31cce2adf654f$var$shouldPreventDefaultKeyboard(target, key) {
  if (target instanceof HTMLInputElement)
    return !$f6c31cce2adf654f$var$isValidInputKey(target, key);
  if (target instanceof HTMLButtonElement)
    return target.type !== 'submit' && target.type !== 'reset';
  return true;
}
const $f6c31cce2adf654f$var$nonTextInputTypes = new Set([
  'checkbox',
  'radio',
  'range',
  'color',
  'file',
  'image',
  'button',
  'submit',
  'reset',
]);
function $f6c31cce2adf654f$var$isValidInputKey(target, key) {
  // Only space should toggle checkboxes and radios, not enter.
  return target.type === 'checkbox' || target.type === 'radio'
    ? key === ' '
    : $f6c31cce2adf654f$var$nonTextInputTypes.has(target.type);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

class $8a9cb279dc87e130$export$905e7fc544a71f36 {
  isDefaultPrevented() {
    return this.nativeEvent.defaultPrevented;
  }
  preventDefault() {
    this.defaultPrevented = true;
    this.nativeEvent.preventDefault();
  }
  stopPropagation() {
    this.nativeEvent.stopPropagation();
    this.isPropagationStopped = () => true;
  }
  isPropagationStopped() {
    return false;
  }
  persist() {}
  constructor(type, nativeEvent) {
    this.nativeEvent = nativeEvent;
    this.target = nativeEvent.target;
    this.currentTarget = nativeEvent.currentTarget;
    this.relatedTarget = nativeEvent.relatedTarget;
    this.bubbles = nativeEvent.bubbles;
    this.cancelable = nativeEvent.cancelable;
    this.defaultPrevented = nativeEvent.defaultPrevented;
    this.eventPhase = nativeEvent.eventPhase;
    this.isTrusted = nativeEvent.isTrusted;
    this.timeStamp = nativeEvent.timeStamp;
    this.type = type;
  }
}
function $8a9cb279dc87e130$export$715c682d09d639cc(onBlur) {
  let stateRef = useRef({
    isFocused: false,
    observer: null,
  });
  // Clean up MutationObserver on unmount. See below.
  // eslint-disable-next-line arrow-body-style
  $f0a04ccd8dbdd83b$export$e5c5a5f917a5871c(() => {
    const state = stateRef.current;
    return () => {
      if (state.observer) {
        state.observer.disconnect();
        state.observer = null;
      }
    };
  }, []);
  let dispatchBlur = $8ae05eaa5c114e9c$export$7f54fc3180508a52((e) => {
    onBlur === null || onBlur === void 0 ? void 0 : onBlur(e);
  });
  // This function is called during a React onFocus event.
  return useCallback(
    (e) => {
      // React does not fire onBlur when an element is disabled. https://github.com/facebook/react/issues/9142
      // Most browsers fire a native focusout event in this case, except for Firefox. In that case, we use a
      // MutationObserver to watch for the disabled attribute, and dispatch these events ourselves.
      // For browsers that do, focusout fires before the MutationObserver, so onBlur should not fire twice.
      if (
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        stateRef.current.isFocused = true;
        let target = e.target;
        let onBlurHandler = (e) => {
          stateRef.current.isFocused = false;
          if (target.disabled)
            // For backward compatibility, dispatch a (fake) React synthetic event.
            dispatchBlur(new $8a9cb279dc87e130$export$905e7fc544a71f36('blur', e));
          // We no longer need the MutationObserver once the target is blurred.
          if (stateRef.current.observer) {
            stateRef.current.observer.disconnect();
            stateRef.current.observer = null;
          }
        };
        target.addEventListener('focusout', onBlurHandler, {
          once: true,
        });
        stateRef.current.observer = new MutationObserver(() => {
          if (stateRef.current.isFocused && target.disabled) {
            stateRef.current.observer.disconnect();
            let relatedTargetEl = target === document.activeElement ? null : document.activeElement;
            target.dispatchEvent(
              new FocusEvent('blur', {
                relatedTarget: relatedTargetEl,
              })
            );
            target.dispatchEvent(
              new FocusEvent('focusout', {
                bubbles: true,
                relatedTarget: relatedTargetEl,
              })
            );
          }
        });
        stateRef.current.observer.observe(target, {
          attributes: true,
          attributeFilter: ['disabled'],
        });
      }
    },
    [dispatchBlur]
  );
}

function $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props) {
  let {
    isDisabled: isDisabled,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    onFocusChange: onFocusChange,
  } = props;
  const onBlur = useCallback(
    (e) => {
      if (e.target === e.currentTarget) {
        if (onBlurProp) onBlurProp(e);
        if (onFocusChange) onFocusChange(false);
        return true;
      }
    },
    [onBlurProp, onFocusChange]
  );
  const onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur);
  const onFocus = useCallback(
    (e) => {
      // Double check that document.activeElement actually matches e.target in case a previously chained
      // focus handler already moved focus somewhere else.
      if (e.target === e.currentTarget && document.activeElement === e.target) {
        if (onFocusProp) onFocusProp(e);
        if (onFocusChange) onFocusChange(true);
        onSyntheticFocus(e);
      }
    },
    [onFocusChange, onFocusProp, onSyntheticFocus]
  );
  return {
    focusProps: {
      onFocus: !isDisabled && (onFocusProp || onFocusChange || onBlurProp) ? onFocus : undefined,
      onBlur: !isDisabled && (onBlurProp || onFocusChange) ? onBlur : undefined,
    },
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

let $507fabe10e71c6fb$var$currentModality = null;
let $507fabe10e71c6fb$var$changeHandlers = new Set();
let $507fabe10e71c6fb$var$hasSetupGlobalListeners = false;
let $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
let $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
function $507fabe10e71c6fb$var$triggerChangeHandlers(modality, e) {
  for (let handler of $507fabe10e71c6fb$var$changeHandlers) handler(modality, e);
}
/**
 * Helper function to determine if a KeyboardEvent is unmodified and could make keyboard focus styles visible.
 */ function $507fabe10e71c6fb$var$isValidKey(e) {
  // Control and Shift keys trigger when navigating back to the tab with keyboard.
  return !(
    e.metaKey ||
    (!$c87311424ea30a05$export$9ac100e40613ea10() && e.altKey) ||
    e.ctrlKey ||
    e.key === 'Control' ||
    e.key === 'Shift' ||
    e.key === 'Meta'
  );
}
function $507fabe10e71c6fb$var$handleKeyboardEvent(e) {
  $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
  if ($507fabe10e71c6fb$var$isValidKey(e)) {
    $507fabe10e71c6fb$var$currentModality = 'keyboard';
    $507fabe10e71c6fb$var$triggerChangeHandlers('keyboard', e);
  }
}
function $507fabe10e71c6fb$var$handlePointerEvent(e) {
  $507fabe10e71c6fb$var$currentModality = 'pointer';
  if (e.type === 'mousedown' || e.type === 'pointerdown') {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$triggerChangeHandlers('pointer', e);
  }
}
function $507fabe10e71c6fb$var$handleClickEvent(e) {
  if ($6a7db85432448f7f$export$60278871457622de(e)) {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    $507fabe10e71c6fb$var$currentModality = 'virtual';
  }
}
function $507fabe10e71c6fb$var$handleFocusEvent(e) {
  // Firefox fires two extra focus events when the user first clicks into an iframe:
  // first on the window, then on the document. We ignore these events so they don't
  // cause keyboard focus rings to appear.
  if (e.target === window || e.target === document) return;
  // If a focus event occurs without a preceding keyboard or pointer event, switch to virtual modality.
  // This occurs, for example, when navigating a form with the next/previous buttons on iOS.
  if (
    !$507fabe10e71c6fb$var$hasEventBeforeFocus &&
    !$507fabe10e71c6fb$var$hasBlurredWindowRecently
  ) {
    $507fabe10e71c6fb$var$currentModality = 'virtual';
    $507fabe10e71c6fb$var$triggerChangeHandlers('virtual', e);
  }
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = false;
}
function $507fabe10e71c6fb$var$handleWindowBlur() {
  // When the window is blurred, reset state. This is necessary when tabbing out of the window,
  // for example, since a subsequent focus event won't be fired.
  $507fabe10e71c6fb$var$hasEventBeforeFocus = false;
  $507fabe10e71c6fb$var$hasBlurredWindowRecently = true;
}
/**
 * Setup global event listeners to control when keyboard focus style should be visible.
 */ function $507fabe10e71c6fb$var$setupGlobalFocusEvents() {
  if (typeof window === 'undefined' || $507fabe10e71c6fb$var$hasSetupGlobalListeners) return;
  // Programmatic focus() calls shouldn't affect the current input modality.
  // However, we need to detect other cases when a focus event occurs without
  // a preceding user event (e.g. screen reader focus). Overriding the focus
  // method on HTMLElement.prototype is a bit hacky, but works.
  let focus = HTMLElement.prototype.focus;
  HTMLElement.prototype.focus = function () {
    $507fabe10e71c6fb$var$hasEventBeforeFocus = true;
    focus.apply(this, arguments);
  };
  document.addEventListener('keydown', $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  document.addEventListener('keyup', $507fabe10e71c6fb$var$handleKeyboardEvent, true);
  document.addEventListener('click', $507fabe10e71c6fb$var$handleClickEvent, true);
  // Register focus events on the window so they are sure to happen
  // before React's event listeners (registered on the document).
  window.addEventListener('focus', $507fabe10e71c6fb$var$handleFocusEvent, true);
  window.addEventListener('blur', $507fabe10e71c6fb$var$handleWindowBlur, false);
  if (typeof PointerEvent !== 'undefined') {
    document.addEventListener('pointerdown', $507fabe10e71c6fb$var$handlePointerEvent, true);
    document.addEventListener('pointermove', $507fabe10e71c6fb$var$handlePointerEvent, true);
    document.addEventListener('pointerup', $507fabe10e71c6fb$var$handlePointerEvent, true);
  } else {
    document.addEventListener('mousedown', $507fabe10e71c6fb$var$handlePointerEvent, true);
    document.addEventListener('mousemove', $507fabe10e71c6fb$var$handlePointerEvent, true);
    document.addEventListener('mouseup', $507fabe10e71c6fb$var$handlePointerEvent, true);
  }
  $507fabe10e71c6fb$var$hasSetupGlobalListeners = true;
}
if (typeof document !== 'undefined') {
  if (document.readyState !== 'loading') $507fabe10e71c6fb$var$setupGlobalFocusEvents();
  else document.addEventListener('DOMContentLoaded', $507fabe10e71c6fb$var$setupGlobalFocusEvents);
}
function $507fabe10e71c6fb$export$b9b3dfddab17db27() {
  return $507fabe10e71c6fb$var$currentModality !== 'pointer';
}
function $507fabe10e71c6fb$export$630ff653c5ada6a9() {
  return $507fabe10e71c6fb$var$currentModality;
}
function $507fabe10e71c6fb$export$8397ddfc504fdb9a(modality) {
  $507fabe10e71c6fb$var$currentModality = modality;
  $507fabe10e71c6fb$var$triggerChangeHandlers(modality, null);
}
function $507fabe10e71c6fb$export$98e20ec92f614cfe() {
  $507fabe10e71c6fb$var$setupGlobalFocusEvents();
  let [modality, setModality] = useState($507fabe10e71c6fb$var$currentModality);
  useEffect(() => {
    let handler = () => {
      setModality($507fabe10e71c6fb$var$currentModality);
    };
    $507fabe10e71c6fb$var$changeHandlers.add(handler);
    return () => {
      $507fabe10e71c6fb$var$changeHandlers.delete(handler);
    };
  }, []);
  return $b5e257d569688ac6$export$535bd6ca7f90a273() ? null : modality;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

function $9ab94262bd0047c7$export$420e68273165f4ec(props) {
  let {
    isDisabled: isDisabled,
    onBlurWithin: onBlurWithin,
    onFocusWithin: onFocusWithin,
    onFocusWithinChange: onFocusWithinChange,
  } = props;
  let state = useRef({
    isFocusWithin: false,
  });
  let onBlur = useCallback(
    (e) => {
      // We don't want to trigger onBlurWithin and then immediately onFocusWithin again
      // when moving focus inside the element. Only trigger if the currentTarget doesn't
      // include the relatedTarget (where focus is moving).
      if (state.current.isFocusWithin && !e.currentTarget.contains(e.relatedTarget)) {
        state.current.isFocusWithin = false;
        if (onBlurWithin) onBlurWithin(e);
        if (onFocusWithinChange) onFocusWithinChange(false);
      }
    },
    [onBlurWithin, onFocusWithinChange, state]
  );
  let onSyntheticFocus = $8a9cb279dc87e130$export$715c682d09d639cc(onBlur);
  let onFocus = useCallback(
    (e) => {
      // Double check that document.activeElement actually matches e.target in case a previously chained
      // focus handler already moved focus somewhere else.
      if (!state.current.isFocusWithin && document.activeElement === e.target) {
        if (onFocusWithin) onFocusWithin(e);
        if (onFocusWithinChange) onFocusWithinChange(true);
        state.current.isFocusWithin = true;
        onSyntheticFocus(e);
      }
    },
    [onFocusWithin, onFocusWithinChange, onSyntheticFocus]
  );
  if (isDisabled)
    return {
      focusWithinProps: {
        onFocus: null,
        onBlur: null,
      },
    };
  return {
    focusWithinProps: {
      onFocus: onFocus,
      onBlur: onBlur,
    },
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Portions of the code in this file are based on code from react.
// Original licensing for the following can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/facebook/react/tree/cc7c1aece46a6b69b41958d731e0fd27c94bfc6c/packages/react-interactions

// iOS fires onPointerEnter twice: once with pointerType="touch" and again with pointerType="mouse".
// We want to ignore these emulated events so they do not trigger hover behavior.
// See https://bugs.webkit.org/show_bug.cgi?id=214609.
let $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
let $6179b936705e76d3$var$hoverCount = 0;
function $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents() {
  $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = true;
  // Clear globalIgnoreEmulatedMouseEvents after a short timeout. iOS fires onPointerEnter
  // with pointerType="mouse" immediately after onPointerUp and before onFocus. On other
  // devices that don't have this quirk, we don't want to ignore a mouse hover sometime in
  // the distant future because a user previously touched the element.
  setTimeout(() => {
    $6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents = false;
  }, 50);
}
function $6179b936705e76d3$var$handleGlobalPointerEvent(e) {
  if (e.pointerType === 'touch') $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents();
}
function $6179b936705e76d3$var$setupGlobalTouchEvents() {
  if (typeof document === 'undefined') return;
  if (typeof PointerEvent !== 'undefined')
    document.addEventListener('pointerup', $6179b936705e76d3$var$handleGlobalPointerEvent);
  else
    document.addEventListener('touchend', $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents);
  $6179b936705e76d3$var$hoverCount++;
  return () => {
    $6179b936705e76d3$var$hoverCount--;
    if ($6179b936705e76d3$var$hoverCount > 0) return;
    if (typeof PointerEvent !== 'undefined')
      document.removeEventListener('pointerup', $6179b936705e76d3$var$handleGlobalPointerEvent);
    else
      document.removeEventListener(
        'touchend',
        $6179b936705e76d3$var$setGlobalIgnoreEmulatedMouseEvents
      );
  };
}
function $6179b936705e76d3$export$ae780daf29e6d456(props) {
  let {
    onHoverStart: onHoverStart,
    onHoverChange: onHoverChange,
    onHoverEnd: onHoverEnd,
    isDisabled: isDisabled,
  } = props;
  let [isHovered, setHovered] = useState(false);
  let state = useRef({
    isHovered: false,
    ignoreEmulatedMouseEvents: false,
    pointerType: '',
    target: null,
  }).current;
  useEffect($6179b936705e76d3$var$setupGlobalTouchEvents, []);
  let { hoverProps: hoverProps, triggerHoverEnd: triggerHoverEnd } = useMemo(() => {
    let triggerHoverStart = (event, pointerType) => {
      state.pointerType = pointerType;
      if (
        isDisabled ||
        pointerType === 'touch' ||
        state.isHovered ||
        !event.currentTarget.contains(event.target)
      )
        return;
      state.isHovered = true;
      let target = event.currentTarget;
      state.target = target;
      if (onHoverStart)
        onHoverStart({
          type: 'hoverstart',
          target: target,
          pointerType: pointerType,
        });
      if (onHoverChange) onHoverChange(true);
      setHovered(true);
    };
    let triggerHoverEnd = (event, pointerType) => {
      state.pointerType = '';
      state.target = null;
      if (pointerType === 'touch' || !state.isHovered) return;
      state.isHovered = false;
      let target = event.currentTarget;
      if (onHoverEnd)
        onHoverEnd({
          type: 'hoverend',
          target: target,
          pointerType: pointerType,
        });
      if (onHoverChange) onHoverChange(false);
      setHovered(false);
    };
    let hoverProps = {};
    if (typeof PointerEvent !== 'undefined') {
      hoverProps.onPointerEnter = (e) => {
        if ($6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents && e.pointerType === 'mouse')
          return;
        triggerHoverStart(e, e.pointerType);
      };
      hoverProps.onPointerLeave = (e) => {
        if (!isDisabled && e.currentTarget.contains(e.target)) triggerHoverEnd(e, e.pointerType);
      };
    } else {
      hoverProps.onTouchStart = () => {
        state.ignoreEmulatedMouseEvents = true;
      };
      hoverProps.onMouseEnter = (e) => {
        if (
          !state.ignoreEmulatedMouseEvents &&
          !$6179b936705e76d3$var$globalIgnoreEmulatedMouseEvents
        )
          triggerHoverStart(e, 'mouse');
        state.ignoreEmulatedMouseEvents = false;
      };
      hoverProps.onMouseLeave = (e) => {
        if (!isDisabled && e.currentTarget.contains(e.target)) triggerHoverEnd(e, 'mouse');
      };
    }
    return {
      hoverProps: hoverProps,
      triggerHoverEnd: triggerHoverEnd,
    };
  }, [onHoverStart, onHoverChange, onHoverEnd, isDisabled, state]);
  useEffect(() => {
    // Call the triggerHoverEnd as soon as isDisabled changes to true
    // Safe to call triggerHoverEnd, it will early return if we aren't currently hovering
    if (isDisabled)
      triggerHoverEnd(
        {
          currentTarget: state.target,
        },
        state.pointerType
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled]);
  return {
    hoverProps: hoverProps,
    isHovered: isHovered,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $93925083ecbb358c$export$48d1ea6320830260(handler) {
  if (!handler) return;
  let shouldStopPropagation = true;
  return (e) => {
    // Mutates the original event object to support Preact because we aren't dealing
    // with synthetic events. The event object that Preact passes to this function
    // does not have very many of its "own" properties; rather, it inherits most of
    // its properties from KeyboardEvents, which means using the spread operator will
    // not transfer the properties to our new `event` object. If we were to either
    // try to copying the properties from the original event's prototype or using
    // that original event as the prototype of this new object, we would actually get
    // an illegal-invokation error as soon as we started using it.
    let event = Object.assign(e, {
      stopPropagation() {
        // console.error(
        //   'stopPropagation is now the default behavior for events in React Spectrum. You can use continuePropagation() to revert this behavior.'
        // );
      },
      continuePropagation() {
        shouldStopPropagation = false;
      },
    });
    handler(event);
    if (shouldStopPropagation) e.stopPropagation();
  };
}

function $46d819fcbaf35654$export$8f71654801c2f7cd(props) {
  return {
    keyboardProps: props.isDisabled
      ? {}
      : {
          onKeyDown: $93925083ecbb358c$export$48d1ea6320830260(props.onKeyDown),
          onKeyUp: $93925083ecbb358c$export$48d1ea6320830260(props.onKeyUp),
        },
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const $8a26561d2877236e$var$DEFAULT_THRESHOLD = 500;
function $8a26561d2877236e$export$c24ed0104d07eab9(props) {
  let {
    isDisabled: isDisabled,
    onLongPressStart: onLongPressStart,
    onLongPressEnd: onLongPressEnd,
    onLongPress: onLongPress,
    threshold: threshold = $8a26561d2877236e$var$DEFAULT_THRESHOLD,
    accessibilityDescription: accessibilityDescription,
  } = props;
  const timeRef = useRef(null);
  let { addGlobalListener: addGlobalListener, removeGlobalListener: removeGlobalListener } =
    $03deb23ff14920c4$export$4eaf04e54aa8eed6();
  let { pressProps: pressProps } = $f6c31cce2adf654f$export$45712eceda6fad21({
    isDisabled: isDisabled,
    onPressStart(e) {
      e.continuePropagation();
      if (e.pointerType === 'mouse' || e.pointerType === 'touch') {
        if (onLongPressStart)
          onLongPressStart({
            ...e,
            type: 'longpressstart',
          });
        timeRef.current = setTimeout(() => {
          // Prevent other usePress handlers from also handling this event.
          e.target.dispatchEvent(
            new PointerEvent('pointercancel', {
              bubbles: true,
            })
          );
          if (onLongPress)
            onLongPress({
              ...e,
              type: 'longpress',
            });
          timeRef.current = null;
        }, threshold);
        // Prevent context menu, which may be opened on long press on touch devices
        if (e.pointerType === 'touch') {
          let onContextMenu = (e) => {
            e.preventDefault();
          };
          addGlobalListener(e.target, 'contextmenu', onContextMenu, {
            once: true,
          });
          addGlobalListener(
            window,
            'pointerup',
            () => {
              // If no contextmenu event is fired quickly after pointerup, remove the handler
              // so future context menu events outside a long press are not prevented.
              setTimeout(() => {
                removeGlobalListener(e.target, 'contextmenu', onContextMenu);
              }, 30);
            },
            {
              once: true,
            }
          );
        }
      }
    },
    onPressEnd(e) {
      if (timeRef.current) clearTimeout(timeRef.current);
      if (onLongPressEnd && (e.pointerType === 'mouse' || e.pointerType === 'touch'))
        onLongPressEnd({
          ...e,
          type: 'longpressend',
        });
    },
  });
  let descriptionProps = $ef06256079686ba0$export$f8aeda7b10753fa1(
    onLongPress && !isDisabled ? accessibilityDescription : null
  );
  return {
    longPressProps: $3ef42575df84b30b$export$9d1611c77c2fe928(pressProps, descriptionProps),
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $6a99195332edec8b$export$80f3e147d781571c(element) {
  // If the user is interacting with a virtual cursor, e.g. screen reader, then
  // wait until after any animated transitions that are currently occurring on
  // the page before shifting focus. This avoids issues with VoiceOver on iOS
  // causing the page to scroll when moving focus if the element is transitioning
  // from off the screen.
  if ($507fabe10e71c6fb$export$630ff653c5ada6a9() === 'virtual') {
    let lastFocusedElement = document.activeElement;
    $bbed8b41f857bcc0$export$24490316f764c430(() => {
      // If focus did not move and the element is still in the document, focus it.
      if (document.activeElement === lastFocusedElement && document.contains(element))
        $7215afc6de606d6b$export$de79e2c695e052f3(element);
    });
  } else $7215afc6de606d6b$export$de79e2c695e052f3(element);
}

/*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ function $645f2e67b85a24c9$var$isStyleVisible(element) {
  if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) return false;
  let { display: display, visibility: visibility } = element.style;
  let isVisible = display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse';
  if (isVisible) {
    const { getComputedStyle: getComputedStyle } = element.ownerDocument.defaultView;
    let { display: computedDisplay, visibility: computedVisibility } = getComputedStyle(element);
    isVisible =
      computedDisplay !== 'none' &&
      computedVisibility !== 'hidden' &&
      computedVisibility !== 'collapse';
  }
  return isVisible;
}
function $645f2e67b85a24c9$var$isAttributeVisible(element, childElement) {
  return (
    !element.hasAttribute('hidden') &&
    (element.nodeName === 'DETAILS' && childElement && childElement.nodeName !== 'SUMMARY'
      ? element.hasAttribute('open')
      : true)
  );
}
function $645f2e67b85a24c9$export$e989c0fffaa6b27a(element, childElement) {
  return (
    element.nodeName !== '#comment' &&
    $645f2e67b85a24c9$var$isStyleVisible(element) &&
    $645f2e67b85a24c9$var$isAttributeVisible(element, childElement) &&
    (!element.parentElement ||
      $645f2e67b85a24c9$export$e989c0fffaa6b27a(element.parentElement, element))
  );
}
const $9bf71ea28793e738$var$focusableElements = [
  'input:not([disabled]):not([type=hidden])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'a[href]',
  'area[href]',
  'summary',
  'iframe',
  'object',
  'embed',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]',
];
const $9bf71ea28793e738$var$FOCUSABLE_ELEMENT_SELECTOR =
  $9bf71ea28793e738$var$focusableElements.join(':not([hidden]),') +
  ',[tabindex]:not([disabled]):not([hidden])';
$9bf71ea28793e738$var$focusableElements.push('[tabindex]:not([tabindex="-1"]):not([disabled])');
const $9bf71ea28793e738$var$TABBABLE_ELEMENT_SELECTOR =
  $9bf71ea28793e738$var$focusableElements.join(':not([hidden]):not([tabindex="-1"]),');
function $9bf71ea28793e738$var$isElementInScope(element, scope) {
  return scope.some((node) => node.contains(element));
}
function $9bf71ea28793e738$export$2d6ec8fc375ceafa(root, opts, scope) {
  let selector = (opts === null || opts === void 0 ? void 0 : opts.tabbable)
    ? $9bf71ea28793e738$var$TABBABLE_ELEMENT_SELECTOR
    : $9bf71ea28793e738$var$FOCUSABLE_ELEMENT_SELECTOR;
  let walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
    acceptNode(node) {
      var _opts_from;
      // Skip nodes inside the starting node.
      if (
        opts === null || opts === void 0
          ? void 0
          : (_opts_from = opts.from) === null || _opts_from === void 0
          ? void 0
          : _opts_from.contains(node)
      )
        return NodeFilter.FILTER_REJECT;
      if (
        node.matches(selector) &&
        $645f2e67b85a24c9$export$e989c0fffaa6b27a(node) &&
        (!scope || $9bf71ea28793e738$var$isElementInScope(node, scope)) &&
        (!(opts === null || opts === void 0 ? void 0 : opts.accept) || opts.accept(node))
      )
        return NodeFilter.FILTER_ACCEPT;
      return NodeFilter.FILTER_SKIP;
    },
  });
  if (opts === null || opts === void 0 ? void 0 : opts.from) walker.currentNode = opts.from;
  return walker;
}
class $9bf71ea28793e738$var$Tree {
  get size() {
    return this.fastMap.size;
  }
  getTreeNode(data) {
    return this.fastMap.get(data);
  }
  addTreeNode(scopeRef, parent, nodeToRestore) {
    let parentNode = this.fastMap.get(parent !== null && parent !== void 0 ? parent : null);
    let node = new $9bf71ea28793e738$var$TreeNode({
      scopeRef: scopeRef,
    });
    parentNode.addChild(node);
    node.parent = parentNode;
    this.fastMap.set(scopeRef, node);
    if (nodeToRestore) node.nodeToRestore = nodeToRestore;
  }
  addNode(node) {
    this.fastMap.set(node.scopeRef, node);
  }
  removeTreeNode(scopeRef) {
    // never remove the root
    if (scopeRef === null) return;
    let node = this.fastMap.get(scopeRef);
    let parentNode = node.parent;
    // when we remove a scope, check if any sibling scopes are trying to restore focus to something inside the scope we're removing
    // if we are, then replace the siblings restore with the restore from the scope we're removing
    for (let current of this.traverse())
      if (
        current !== node &&
        node.nodeToRestore &&
        current.nodeToRestore &&
        node.scopeRef.current &&
        $9bf71ea28793e738$var$isElementInScope(current.nodeToRestore, node.scopeRef.current)
      )
        current.nodeToRestore = node.nodeToRestore;
    let children = node.children;
    parentNode.removeChild(node);
    if (children.size > 0) children.forEach((child) => parentNode.addChild(child));
    this.fastMap.delete(node.scopeRef);
  }
  // Pre Order Depth First
  *traverse(node = this.root) {
    if (node.scopeRef != null) yield node;
    if (node.children.size > 0) for (let child of node.children) yield* this.traverse(child);
  }
  clone() {
    let newTree = new $9bf71ea28793e738$var$Tree();
    for (let node of this.traverse())
      newTree.addTreeNode(node.scopeRef, node.parent.scopeRef, node.nodeToRestore);
    return newTree;
  }
  constructor() {
    this.fastMap = new Map();
    this.root = new $9bf71ea28793e738$var$TreeNode({
      scopeRef: null,
    });
    this.fastMap.set(null, this.root);
  }
}
class $9bf71ea28793e738$var$TreeNode {
  addChild(node) {
    this.children.add(node);
    node.parent = this;
  }
  removeChild(node) {
    this.children.delete(node);
    node.parent = undefined;
  }
  constructor(props) {
    this.children = new Set();
    this.contain = false;
    this.scopeRef = props.scopeRef;
  }
}
new $9bf71ea28793e738$var$Tree();

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

let $e6afbd83fe6ebbd2$var$FocusableContext = /*#__PURE__*/ $73SJx$react.createContext(null);
function $e6afbd83fe6ebbd2$var$useFocusableContext(ref) {
  let context = useContext($e6afbd83fe6ebbd2$var$FocusableContext) || {};
  $e7801be82b4b2a53$export$4debdb1a3f0fa79e(context, ref);
  // eslint-disable-next-line
  let { ref: _, ...otherProps } = context;
  return otherProps;
}
function $e6afbd83fe6ebbd2$export$4c014de7c8940b4c(props, domRef) {
  let { focusProps: focusProps } = $a1ea59d68270f0dd$export$f8168d8dd8fd66e6(props);
  let { keyboardProps: keyboardProps } = $46d819fcbaf35654$export$8f71654801c2f7cd(props);
  let interactions = $3ef42575df84b30b$export$9d1611c77c2fe928(focusProps, keyboardProps);
  let domProps = $e6afbd83fe6ebbd2$var$useFocusableContext(domRef);
  let interactionProps = props.isDisabled ? {} : domProps;
  let autoFocusRef = useRef(props.autoFocus);
  useEffect(() => {
    if (autoFocusRef.current && domRef.current)
      $6a99195332edec8b$export$80f3e147d781571c(domRef.current);
    autoFocusRef.current = false;
  }, [domRef]);
  return {
    focusableProps: $3ef42575df84b30b$export$9d1611c77c2fe928(
      {
        ...interactions,
        tabIndex: props.excludeFromTabOrder && !props.isDisabled ? -1 : undefined,
      },
      interactionProps
    ),
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // https://en.wikipedia.org/wiki/Right-to-left
const $148a7a147e38ea7f$var$RTL_SCRIPTS = new Set([
  'Arab',
  'Syrc',
  'Samr',
  'Mand',
  'Thaa',
  'Mend',
  'Nkoo',
  'Adlm',
  'Rohg',
  'Hebr',
]);
const $148a7a147e38ea7f$var$RTL_LANGS = new Set([
  'ae',
  'ar',
  'arc',
  'bcc',
  'bqi',
  'ckb',
  'dv',
  'fa',
  'glk',
  'he',
  'ku',
  'mzn',
  'nqo',
  'pnb',
  'ps',
  'sd',
  'ug',
  'ur',
  'yi',
]);
function $148a7a147e38ea7f$export$702d680b21cbd764(locale) {
  // If the Intl.Locale API is available, use it to get the script for the locale.
  // This is more accurate than guessing by language, since languages can be written in multiple scripts.
  // @ts-ignore
  if (Intl.Locale) {
    // @ts-ignore
    let script = new Intl.Locale(locale).maximize().script;
    return $148a7a147e38ea7f$var$RTL_SCRIPTS.has(script);
  }
  // If not, just guess by the language (first part of the locale)
  let lang = locale.split('-')[0];
  return $148a7a147e38ea7f$var$RTL_LANGS.has(lang);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $1e5a04cdaf7d1af8$export$f09106e7c6677ec5() {
  // @ts-ignore
  let locale =
    (typeof navigator !== 'undefined' && (navigator.language || navigator.userLanguage)) || 'en-US';
  try {
    // @ts-ignore
    Intl.DateTimeFormat.supportedLocalesOf([locale]);
  } catch (_err) {
    locale = 'en-US';
  }
  return {
    locale: locale,
    direction: $148a7a147e38ea7f$export$702d680b21cbd764(locale) ? 'rtl' : 'ltr',
  };
}
let $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
let $1e5a04cdaf7d1af8$var$listeners = new Set();
function $1e5a04cdaf7d1af8$var$updateLocale() {
  $1e5a04cdaf7d1af8$var$currentLocale = $1e5a04cdaf7d1af8$export$f09106e7c6677ec5();
  for (let listener of $1e5a04cdaf7d1af8$var$listeners)
    listener($1e5a04cdaf7d1af8$var$currentLocale);
}
function $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a() {
  let isSSR = $b5e257d569688ac6$export$535bd6ca7f90a273();
  let [defaultLocale, setDefaultLocale] = useState($1e5a04cdaf7d1af8$var$currentLocale);
  useEffect(() => {
    if ($1e5a04cdaf7d1af8$var$listeners.size === 0)
      window.addEventListener('languagechange', $1e5a04cdaf7d1af8$var$updateLocale);
    $1e5a04cdaf7d1af8$var$listeners.add(setDefaultLocale);
    return () => {
      $1e5a04cdaf7d1af8$var$listeners.delete(setDefaultLocale);
      if ($1e5a04cdaf7d1af8$var$listeners.size === 0)
        window.removeEventListener('languagechange', $1e5a04cdaf7d1af8$var$updateLocale);
    };
  }, []);
  // We cannot determine the browser's language on the server, so default to
  // en-US. This will be updated after hydration on the client to the correct value.
  if (isSSR)
    return {
      locale: 'en-US',
      direction: 'ltr',
    };
  return defaultLocale;
}

const $18f2051aff69b9bf$var$I18nContext = /*#__PURE__*/ $73SJx$react.createContext(null);
function $18f2051aff69b9bf$export$43bb16f9c6d9e3f7() {
  let defaultLocale = $1e5a04cdaf7d1af8$export$188ec29ebc2bdc3a();
  let context = useContext($18f2051aff69b9bf$var$I18nContext);
  return context || defaultLocale;
}

/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const $fca6afa0e843324b$var$cache = new WeakMap();
function $fca6afa0e843324b$var$getCachedDictionary(strings) {
  let dictionary = $fca6afa0e843324b$var$cache.get(strings);
  if (!dictionary) {
    dictionary = new LocalizedStringDictionary(strings);
    $fca6afa0e843324b$var$cache.set(strings, dictionary);
  }
  return dictionary;
}
function $fca6afa0e843324b$export$f12b703ca79dfbb1(strings) {
  let { locale: locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let dictionary = useMemo(() => $fca6afa0e843324b$var$getCachedDictionary(strings), [strings]);
  return useMemo(() => new LocalizedStringFormatter(locale, dictionary), [locale, dictionary]);
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
let $325a3faab7a68acd$var$cache = new Map();
function $325a3faab7a68acd$export$a16aca283550c30d(options) {
  let { locale: locale } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let cacheKey =
    locale +
    (options
      ? Object.entries(options)
          .sort((a, b) => (a[0] < b[0] ? -1 : 1))
          .join()
      : '');
  if ($325a3faab7a68acd$var$cache.has(cacheKey)) return $325a3faab7a68acd$var$cache.get(cacheKey);
  let formatter = new Intl.Collator(locale, options);
  $325a3faab7a68acd$var$cache.set(cacheKey, formatter);
  return formatter;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $701a24aa0da5b062$export$ea18c227d4417cc3(props, ref) {
  let {
    elementType: elementType = 'button',
    isDisabled: isDisabled,
    onPress: onPress,
    onPressStart: onPressStart,
    onPressEnd: onPressEnd,
    onPressChange: onPressChange,
    // @ts-ignore - undocumented
    preventFocusOnPress: preventFocusOnPress,
    // @ts-ignore - undocumented
    allowFocusWhenDisabled: allowFocusWhenDisabled, // @ts-ignore
    onClick: deprecatedOnClick,
    href: href,
    target: target,
    rel: rel,
    type: type = 'button',
  } = props;
  let additionalProps;
  if (elementType === 'button')
    additionalProps = {
      type: type,
      disabled: isDisabled,
    };
  else
    additionalProps = {
      role: 'button',
      tabIndex: isDisabled ? undefined : 0,
      href: elementType === 'a' && isDisabled ? undefined : href,
      target: elementType === 'a' ? target : undefined,
      type: elementType === 'input' ? type : undefined,
      disabled: elementType === 'input' ? isDisabled : undefined,
      'aria-disabled': !isDisabled || elementType === 'input' ? undefined : isDisabled,
      rel: elementType === 'a' ? rel : undefined,
    };
  let { pressProps: pressProps, isPressed: isPressed } = $f6c31cce2adf654f$export$45712eceda6fad21({
    onPressStart: onPressStart,
    onPressEnd: onPressEnd,
    onPressChange: onPressChange,
    onPress: onPress,
    isDisabled: isDisabled,
    preventFocusOnPress: preventFocusOnPress,
    ref: ref,
  });
  let { focusableProps: focusableProps } = $e6afbd83fe6ebbd2$export$4c014de7c8940b4c(props, ref);
  if (allowFocusWhenDisabled) focusableProps.tabIndex = isDisabled ? -1 : focusableProps.tabIndex;
  let buttonProps = $3ef42575df84b30b$export$9d1611c77c2fe928(
    focusableProps,
    pressProps,
    $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, {
      labelable: true,
    })
  );
  return {
    isPressed: isPressed,
    buttonProps: $3ef42575df84b30b$export$9d1611c77c2fe928(additionalProps, buttonProps, {
      'aria-haspopup': props['aria-haspopup'],
      'aria-expanded': props['aria-expanded'],
      'aria-controls': props['aria-controls'],
      'aria-pressed': props['aria-pressed'],
      onClick: (e) => {
        if (deprecatedOnClick) {
          deprecatedOnClick(e);
          console.warn('onClick is deprecated, please use onPress');
        }
      },
    }),
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /* Inspired by https://github.com/AlmeroSteyn/react-aria-live */ const $319e236875307eab$var$LIVEREGION_TIMEOUT_DELAY = 7000;
let $319e236875307eab$var$liveAnnouncer = null;
function $319e236875307eab$export$a9b970dcc4ae71a9(
  message,
  assertiveness = 'assertive',
  timeout = $319e236875307eab$var$LIVEREGION_TIMEOUT_DELAY
) {
  if (!$319e236875307eab$var$liveAnnouncer)
    $319e236875307eab$var$liveAnnouncer = new $319e236875307eab$var$LiveAnnouncer();
  $319e236875307eab$var$liveAnnouncer.announce(message, assertiveness, timeout);
}
// LiveAnnouncer is implemented using vanilla DOM, not React. That's because as of React 18
// ReactDOM.render is deprecated, and the replacement, ReactDOM.createRoot is moved into a
// subpath import `react-dom/client`. That makes it hard for us to support multiple React versions.
// As a global API, we can't use portals without introducing a breaking API change. LiveAnnouncer
// is simple enough to implement without React, so that's what we do here.
// See this discussion for more details: https://github.com/reactwg/react-18/discussions/125#discussioncomment-2382638
class $319e236875307eab$var$LiveAnnouncer {
  createLog(ariaLive) {
    let node = document.createElement('div');
    node.setAttribute('role', 'log');
    node.setAttribute('aria-live', ariaLive);
    node.setAttribute('aria-relevant', 'additions');
    return node;
  }
  destroy() {
    if (!this.node) return;
    document.body.removeChild(this.node);
    this.node = null;
  }
  announce(
    message,
    assertiveness = 'assertive',
    timeout = $319e236875307eab$var$LIVEREGION_TIMEOUT_DELAY
  ) {
    if (!this.node) return;
    let node = document.createElement('div');
    node.textContent = message;
    if (assertiveness === 'assertive') this.assertiveLog.appendChild(node);
    else this.politeLog.appendChild(node);
    if (message !== '')
      setTimeout(() => {
        node.remove();
      }, timeout);
  }
  clear(assertiveness) {
    if (!this.node) return;
    if (!assertiveness || assertiveness === 'assertive') this.assertiveLog.innerHTML = '';
    if (!assertiveness || assertiveness === 'polite') this.politeLog.innerHTML = '';
  }
  constructor() {
    this.node = document.createElement('div');
    this.node.dataset.liveAnnouncer = 'true';
    // copied from VisuallyHidden
    Object.assign(this.node.style, {
      border: 0,
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: '1px',
      margin: '-1px',
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      width: '1px',
      whiteSpace: 'nowrap',
    });
    this.assertiveLog = this.createLog('assertive');
    this.node.appendChild(this.assertiveLog);
    this.politeLog = this.createLog('polite');
    this.node.appendChild(this.politeLog);
    document.body.prepend(this.node);
  }
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2021 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $d191a55c9702f145$export$8467354a121f1b9f(props) {
  let {
    id: id,
    label: label,
    'aria-labelledby': ariaLabelledby,
    'aria-label': ariaLabel,
    labelElementType: labelElementType = 'label',
  } = props;
  id = $bdb11010cef70236$export$f680877a34711e37(id);
  let labelId = $bdb11010cef70236$export$f680877a34711e37();
  let labelProps = {};
  if (label) {
    ariaLabelledby = ariaLabelledby ? `${labelId} ${ariaLabelledby}` : labelId;
    labelProps = {
      id: labelId,
      htmlFor: labelElementType === 'label' ? id : undefined,
    };
  } else if (!ariaLabelledby && !ariaLabel)
    console.warn(
      'If you do not provide a visible label, you must specify an aria-label or aria-labelledby attribute for accessibility'
    );
  let fieldProps = $313b98861ee5dd6c$export$d6875122194c7b44({
    id: id,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
  });
  return {
    labelProps: labelProps,
    fieldProps: fieldProps,
  };
}

function $2baaea4c71418dea$export$294aa081a6c6f55d(props) {
  let {
    description: description,
    errorMessage: errorMessage,
    isInvalid: isInvalid,
    validationState: validationState,
  } = props;
  let { labelProps: labelProps, fieldProps: fieldProps } =
    $d191a55c9702f145$export$8467354a121f1b9f(props);
  let descriptionId = $bdb11010cef70236$export$b4cc09c592e8fdb8([
    Boolean(description),
    Boolean(errorMessage),
    isInvalid,
    validationState,
  ]);
  let errorMessageId = $bdb11010cef70236$export$b4cc09c592e8fdb8([
    Boolean(description),
    Boolean(errorMessage),
    isInvalid,
    validationState,
  ]);
  fieldProps = $3ef42575df84b30b$export$9d1611c77c2fe928(fieldProps, {
    'aria-describedby':
      [
        descriptionId,
        // Use aria-describedby for error message because aria-errormessage is unsupported using VoiceOver or NVDA. See https://github.com/adobe/react-spectrum/issues/1346#issuecomment-740136268
        errorMessageId,
        props['aria-describedby'],
      ]
        .filter(Boolean)
        .join(' ') || undefined,
  });
  return {
    labelProps: labelProps,
    fieldProps: fieldProps,
    descriptionProps: {
      id: descriptionId,
    },
    errorMessageProps: {
      id: errorMessageId,
    },
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

const $5c3e21d68f1c4674$var$styles = {
  border: 0,
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  width: '1px',
  whiteSpace: 'nowrap',
};
function $5c3e21d68f1c4674$export$a966af930f325cab(props = {}) {
  let { style: style, isFocusable: isFocusable } = props;
  let [isFocused, setFocused] = useState(false);
  let { focusWithinProps: focusWithinProps } = $9ab94262bd0047c7$export$420e68273165f4ec({
    isDisabled: !isFocusable,
    onFocusWithinChange: (val) => setFocused(val),
  });
  // If focused, don't hide the element.
  let combinedStyles = useMemo(() => {
    if (isFocused) return style;
    else if (style)
      return {
        ...$5c3e21d68f1c4674$var$styles,
        ...style,
      };
    else return $5c3e21d68f1c4674$var$styles;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  return {
    visuallyHiddenProps: {
      ...focusWithinProps,
      style: combinedStyles,
    },
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
const $dd149f63282afbbf$export$f6211563215e3b37 = new WeakMap();

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $628037886ba31236$export$f9d5c8beee7d008d(props, state, ref) {
  let { type: type } = props;
  let { isOpen: isOpen } = state;
  // Backward compatibility. Share state close function with useOverlayPosition so it can close on scroll
  // without forcing users to pass onClose.
  useEffect(() => {
    if (ref && ref.current) $dd149f63282afbbf$export$f6211563215e3b37.set(ref.current, state.close);
  });
  // Aria 1.1 supports multiple values for aria-haspopup other than just menus.
  // https://www.w3.org/TR/wai-aria-1.1/#aria-haspopup
  // However, we only add it for menus for now because screen readers often
  // announce it as a menu even for other values.
  let ariaHasPopup = undefined;
  if (type === 'menu') ariaHasPopup = true;
  else if (type === 'listbox') ariaHasPopup = 'listbox';
  let overlayId = $bdb11010cef70236$export$f680877a34711e37();
  return {
    triggerProps: {
      'aria-haspopup': ariaHasPopup,
      'aria-expanded': isOpen,
      'aria-controls': isOpen ? overlayId : null,
      onPress: state.toggle,
    },
    overlayProps: {
      id: overlayId,
    },
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ // Keeps a ref count of all hidden elements. Added to when hiding an element, and
// subtracted from when showing it again. When it reaches zero, aria-hidden is removed.
let $5e3802645cc19319$var$refCountMap = new WeakMap();
let $5e3802645cc19319$var$observerStack = [];
function $5e3802645cc19319$export$1c3ebcada18427bf(targets, root = document.body) {
  let visibleNodes = new Set(targets);
  let hiddenNodes = new Set();
  let walk = (root) => {
    // Keep live announcer and top layer elements (e.g. toasts) visible.
    for (let element of root.querySelectorAll('[data-live-announcer], [data-react-aria-top-layer]'))
      visibleNodes.add(element);
    let acceptNode = (node) => {
      // Skip this node and its children if it is one of the target nodes, or a live announcer.
      // Also skip children of already hidden nodes, as aria-hidden is recursive. An exception is
      // made for elements with role="row" since VoiceOver on iOS has issues hiding elements with role="row".
      // For that case we want to hide the cells inside as well (https://bugs.webkit.org/show_bug.cgi?id=222623).
      if (
        visibleNodes.has(node) ||
        (hiddenNodes.has(node.parentElement) && node.parentElement.getAttribute('role') !== 'row')
      )
        return NodeFilter.FILTER_REJECT;
      // Skip this node but continue to children if one of the targets is inside the node.
      for (let target of visibleNodes) {
        if (node.contains(target)) return NodeFilter.FILTER_SKIP;
      }
      return NodeFilter.FILTER_ACCEPT;
    };
    let walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
      acceptNode: acceptNode,
    });
    // TreeWalker does not include the root.
    let acceptRoot = acceptNode(root);
    if (acceptRoot === NodeFilter.FILTER_ACCEPT) hide(root);
    if (acceptRoot !== NodeFilter.FILTER_REJECT) {
      let node = walker.nextNode();
      while (node != null) {
        hide(node);
        node = walker.nextNode();
      }
    }
  };
  let hide = (node) => {
    var _refCountMap_get;
    let refCount =
      (_refCountMap_get = $5e3802645cc19319$var$refCountMap.get(node)) !== null &&
      _refCountMap_get !== void 0
        ? _refCountMap_get
        : 0;
    // If already aria-hidden, and the ref count is zero, then this element
    // was already hidden and there's nothing for us to do.
    if (node.getAttribute('aria-hidden') === 'true' && refCount === 0) return;
    if (refCount === 0) node.setAttribute('aria-hidden', 'true');
    hiddenNodes.add(node);
    $5e3802645cc19319$var$refCountMap.set(node, refCount + 1);
  };
  // If there is already a MutationObserver listening from a previous call,
  // disconnect it so the new on takes over.
  if ($5e3802645cc19319$var$observerStack.length)
    $5e3802645cc19319$var$observerStack[
      $5e3802645cc19319$var$observerStack.length - 1
    ].disconnect();
  walk(root);
  let observer = new MutationObserver((changes) => {
    for (let change of changes) {
      if (change.type !== 'childList' || change.addedNodes.length === 0) continue;
      // If the parent element of the added nodes is not within one of the targets,
      // and not already inside a hidden node, hide all of the new children.
      if (![...visibleNodes, ...hiddenNodes].some((node) => node.contains(change.target))) {
        for (let node of change.removedNodes)
          if (node instanceof Element) {
            visibleNodes.delete(node);
            hiddenNodes.delete(node);
          }
        for (let node of change.addedNodes) {
          if (
            (node instanceof HTMLElement || node instanceof SVGElement) &&
            (node.dataset.liveAnnouncer === 'true' || node.dataset.reactAriaTopLayer === 'true')
          )
            visibleNodes.add(node);
          else if (node instanceof Element) walk(node);
        }
      }
    }
  });
  observer.observe(root, {
    childList: true,
    subtree: true,
  });
  let observerWrapper = {
    observe() {
      observer.observe(root, {
        childList: true,
        subtree: true,
      });
    },
    disconnect() {
      observer.disconnect();
    },
  };
  $5e3802645cc19319$var$observerStack.push(observerWrapper);
  return () => {
    observer.disconnect();
    for (let node of hiddenNodes) {
      let count = $5e3802645cc19319$var$refCountMap.get(node);
      if (count === 1) {
        node.removeAttribute('aria-hidden');
        $5e3802645cc19319$var$refCountMap.delete(node);
      } else $5e3802645cc19319$var$refCountMap.set(node, count - 1);
    }
    // Remove this observer from the stack, and start the previous one.
    if (
      observerWrapper ===
      $5e3802645cc19319$var$observerStack[$5e3802645cc19319$var$observerStack.length - 1]
    ) {
      $5e3802645cc19319$var$observerStack.pop();
      if ($5e3802645cc19319$var$observerStack.length)
        $5e3802645cc19319$var$observerStack[
          $5e3802645cc19319$var$observerStack.length - 1
        ].observe();
    } else
      $5e3802645cc19319$var$observerStack.splice(
        $5e3802645cc19319$var$observerStack.indexOf(observerWrapper),
        1
      );
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $feb5ffebff200149$export$d3e3bd3e26688c04(e) {
  // Ctrl + Arrow Up/Arrow Down has a system wide meaning on macOS, so use Alt instead.
  // On Windows and Ubuntu, Alt + Space has a system wide meaning.
  return $c87311424ea30a05$export$e1865c3bedcd822b() ? e.altKey : e.ctrlKey;
}
function $feb5ffebff200149$export$16792effe837dba3(e) {
  if ($c87311424ea30a05$export$9ac100e40613ea10()) return e.metaKey;
  return e.ctrlKey;
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/**
 * Controls how long to wait before clearing the typeahead buffer.
 */ const $fb3050f43d946246$var$TYPEAHEAD_DEBOUNCE_WAIT_MS = 1000; // 1 second
function $fb3050f43d946246$export$e32c88dfddc6e1d8(options) {
  let {
    keyboardDelegate: keyboardDelegate,
    selectionManager: selectionManager,
    onTypeSelect: onTypeSelect,
  } = options;
  let state = useRef({
    search: '',
    timeout: null,
  }).current;
  let onKeyDown = (e) => {
    let character = $fb3050f43d946246$var$getStringForKey(e.key);
    if (!character || e.ctrlKey || e.metaKey || !e.currentTarget.contains(e.target)) return;
    // Do not propagate the Spacebar event if it's meant to be part of the search.
    // When we time out, the search term becomes empty, hence the check on length.
    // Trimming is to account for the case of pressing the Spacebar more than once,
    // which should cycle through the selection/deselection of the focused item.
    if (character === ' ' && state.search.trim().length > 0) {
      e.preventDefault();
      if (!('continuePropagation' in e)) e.stopPropagation();
    }
    state.search += character;
    // Use the delegate to find a key to focus.
    // Prioritize items after the currently focused item, falling back to searching the whole list.
    let key = keyboardDelegate.getKeyForSearch(state.search, selectionManager.focusedKey);
    // If no key found, search from the top.
    if (key == null) key = keyboardDelegate.getKeyForSearch(state.search);
    if (key != null) {
      selectionManager.setFocusedKey(key);
      if (onTypeSelect) onTypeSelect(key);
    }
    clearTimeout(state.timeout);
    state.timeout = setTimeout(() => {
      state.search = '';
    }, $fb3050f43d946246$var$TYPEAHEAD_DEBOUNCE_WAIT_MS);
  };
  return {
    typeSelectProps: {
      // Using a capturing listener to catch the keydown event before
      // other hooks in order to handle the Spacebar event.
      onKeyDownCapture: keyboardDelegate.getKeyForSearch ? onKeyDown : null,
    },
  };
}
function $fb3050f43d946246$var$getStringForKey(key) {
  // If the key is of length 1, it is an ASCII value.
  // Otherwise, if there are no ASCII characters in the key name,
  // it is a Unicode character.
  // See https://www.w3.org/TR/uievents-key/
  if (key.length === 1 || !/^[A-Z]/i.test(key)) return key;
  return '';
}

function $ae20dd8cbca75726$export$d6daf82dcd84e87c(options) {
  let {
    selectionManager: manager,
    keyboardDelegate: delegate,
    ref: ref,
    autoFocus: autoFocus = false,
    shouldFocusWrap: shouldFocusWrap = false,
    disallowEmptySelection: disallowEmptySelection = false,
    disallowSelectAll: disallowSelectAll = false,
    selectOnFocus: selectOnFocus = manager.selectionBehavior === 'replace',
    disallowTypeAhead: disallowTypeAhead = false,
    shouldUseVirtualFocus: shouldUseVirtualFocus,
    allowsTabNavigation: allowsTabNavigation = false,
    isVirtualized: isVirtualized,
    // If no scrollRef is provided, assume the collection ref is the scrollable region
    scrollRef: scrollRef = ref,
  } = options;
  let { direction: direction } = $18f2051aff69b9bf$export$43bb16f9c6d9e3f7();
  let onKeyDown = (e) => {
    // Prevent option + tab from doing anything since it doesn't move focus to the cells, only buttons/checkboxes
    if (e.altKey && e.key === 'Tab') e.preventDefault();
    // Keyboard events bubble through portals. Don't handle keyboard events
    // for elements outside the collection (e.g. menus).
    if (!ref.current.contains(e.target)) return;
    const navigateToKey = (key, childFocus) => {
      if (key != null) {
        manager.setFocusedKey(key, childFocus);
        if (e.shiftKey && manager.selectionMode === 'multiple') manager.extendSelection(key);
        else if (selectOnFocus && !$feb5ffebff200149$export$d3e3bd3e26688c04(e))
          manager.replaceSelection(key);
      }
    };
    switch (e.key) {
      case 'ArrowDown':
        if (delegate.getKeyBelow) {
          var _delegate_getFirstKey, _delegate_getFirstKey1;
          e.preventDefault();
          let nextKey =
            manager.focusedKey != null
              ? delegate.getKeyBelow(manager.focusedKey)
              : (_delegate_getFirstKey = delegate.getFirstKey) === null ||
                _delegate_getFirstKey === void 0
              ? void 0
              : _delegate_getFirstKey.call(delegate);
          if (nextKey == null && shouldFocusWrap)
            nextKey =
              (_delegate_getFirstKey1 = delegate.getFirstKey) === null ||
              _delegate_getFirstKey1 === void 0
                ? void 0
                : _delegate_getFirstKey1.call(delegate, manager.focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case 'ArrowUp':
        if (delegate.getKeyAbove) {
          var _delegate_getLastKey, _delegate_getLastKey1;
          e.preventDefault();
          let nextKey =
            manager.focusedKey != null
              ? delegate.getKeyAbove(manager.focusedKey)
              : (_delegate_getLastKey = delegate.getLastKey) === null ||
                _delegate_getLastKey === void 0
              ? void 0
              : _delegate_getLastKey.call(delegate);
          if (nextKey == null && shouldFocusWrap)
            nextKey =
              (_delegate_getLastKey1 = delegate.getLastKey) === null ||
              _delegate_getLastKey1 === void 0
                ? void 0
                : _delegate_getLastKey1.call(delegate, manager.focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case 'ArrowLeft':
        if (delegate.getKeyLeftOf) {
          var _delegate_getFirstKey2, _delegate_getLastKey2;
          e.preventDefault();
          let nextKey = delegate.getKeyLeftOf(manager.focusedKey);
          if (nextKey == null && shouldFocusWrap)
            nextKey =
              direction === 'rtl'
                ? (_delegate_getFirstKey2 = delegate.getFirstKey) === null ||
                  _delegate_getFirstKey2 === void 0
                  ? void 0
                  : _delegate_getFirstKey2.call(delegate, manager.focusedKey)
                : (_delegate_getLastKey2 = delegate.getLastKey) === null ||
                  _delegate_getLastKey2 === void 0
                ? void 0
                : _delegate_getLastKey2.call(delegate, manager.focusedKey);
          navigateToKey(nextKey, direction === 'rtl' ? 'first' : 'last');
        }
        break;
      case 'ArrowRight':
        if (delegate.getKeyRightOf) {
          var _delegate_getLastKey3, _delegate_getFirstKey3;
          e.preventDefault();
          let nextKey = delegate.getKeyRightOf(manager.focusedKey);
          if (nextKey == null && shouldFocusWrap)
            nextKey =
              direction === 'rtl'
                ? (_delegate_getLastKey3 = delegate.getLastKey) === null ||
                  _delegate_getLastKey3 === void 0
                  ? void 0
                  : _delegate_getLastKey3.call(delegate, manager.focusedKey)
                : (_delegate_getFirstKey3 = delegate.getFirstKey) === null ||
                  _delegate_getFirstKey3 === void 0
                ? void 0
                : _delegate_getFirstKey3.call(delegate, manager.focusedKey);
          navigateToKey(nextKey, direction === 'rtl' ? 'last' : 'first');
        }
        break;
      case 'Home':
        if (delegate.getFirstKey) {
          e.preventDefault();
          let firstKey = delegate.getFirstKey(
            manager.focusedKey,
            $feb5ffebff200149$export$16792effe837dba3(e)
          );
          manager.setFocusedKey(firstKey);
          if (
            $feb5ffebff200149$export$16792effe837dba3(e) &&
            e.shiftKey &&
            manager.selectionMode === 'multiple'
          )
            manager.extendSelection(firstKey);
          else if (selectOnFocus) manager.replaceSelection(firstKey);
        }
        break;
      case 'End':
        if (delegate.getLastKey) {
          e.preventDefault();
          let lastKey = delegate.getLastKey(
            manager.focusedKey,
            $feb5ffebff200149$export$16792effe837dba3(e)
          );
          manager.setFocusedKey(lastKey);
          if (
            $feb5ffebff200149$export$16792effe837dba3(e) &&
            e.shiftKey &&
            manager.selectionMode === 'multiple'
          )
            manager.extendSelection(lastKey);
          else if (selectOnFocus) manager.replaceSelection(lastKey);
        }
        break;
      case 'PageDown':
        if (delegate.getKeyPageBelow) {
          e.preventDefault();
          let nextKey = delegate.getKeyPageBelow(manager.focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case 'PageUp':
        if (delegate.getKeyPageAbove) {
          e.preventDefault();
          let nextKey = delegate.getKeyPageAbove(manager.focusedKey);
          navigateToKey(nextKey);
        }
        break;
      case 'a':
        if (
          $feb5ffebff200149$export$16792effe837dba3(e) &&
          manager.selectionMode === 'multiple' &&
          disallowSelectAll !== true
        ) {
          e.preventDefault();
          manager.selectAll();
        }
        break;
      case 'Escape':
        e.preventDefault();
        if (!disallowEmptySelection) manager.clearSelection();
        break;
      case 'Tab':
        if (!allowsTabNavigation) {
          // There may be elements that are "tabbable" inside a collection (e.g. in a grid cell).
          // However, collections should be treated as a single tab stop, with arrow key navigation internally.
          // We don't control the rendering of these, so we can't override the tabIndex to prevent tabbing.
          // Instead, we handle the Tab key, and move focus manually to the first/last tabbable element
          // in the collection, so that the browser default behavior will apply starting from that element
          // rather than the currently focused one.
          if (e.shiftKey) ref.current.focus();
          else {
            let walker = $9bf71ea28793e738$export$2d6ec8fc375ceafa(ref.current, {
              tabbable: true,
            });
            let next;
            let last;
            do {
              last = walker.lastChild();
              if (last) next = last;
            } while (last);
            if (next && !next.contains(document.activeElement))
              $7215afc6de606d6b$export$de79e2c695e052f3(next);
          }
          break;
        }
    }
  };
  // Store the scroll position so we can restore it later.
  let scrollPos = useRef({
    top: 0,
    left: 0,
  });
  $e9faafb641e167db$export$90fc3a17d93f704c(
    scrollRef,
    'scroll',
    isVirtualized
      ? null
      : () => {
          scrollPos.current = {
            top: scrollRef.current.scrollTop,
            left: scrollRef.current.scrollLeft,
          };
        }
  );
  let onFocus = (e) => {
    if (manager.isFocused) {
      // If a focus event bubbled through a portal, reset focus state.
      if (!e.currentTarget.contains(e.target)) manager.setFocused(false);
      return;
    }
    // Focus events can bubble through portals. Ignore these events.
    if (!e.currentTarget.contains(e.target)) return;
    manager.setFocused(true);
    if (manager.focusedKey == null) {
      let navigateToFirstKey = (key) => {
        if (key != null) {
          manager.setFocusedKey(key);
          if (selectOnFocus) manager.replaceSelection(key);
        }
      };
      // If the user hasn't yet interacted with the collection, there will be no focusedKey set.
      // Attempt to detect whether the user is tabbing forward or backward into the collection
      // and either focus the first or last item accordingly.
      let relatedTarget = e.relatedTarget;
      var _manager_lastSelectedKey, _manager_firstSelectedKey;
      if (
        relatedTarget &&
        e.currentTarget.compareDocumentPosition(relatedTarget) & Node.DOCUMENT_POSITION_FOLLOWING
      )
        navigateToFirstKey(
          (_manager_lastSelectedKey = manager.lastSelectedKey) !== null &&
            _manager_lastSelectedKey !== void 0
            ? _manager_lastSelectedKey
            : delegate.getLastKey()
        );
      else
        navigateToFirstKey(
          (_manager_firstSelectedKey = manager.firstSelectedKey) !== null &&
            _manager_firstSelectedKey !== void 0
            ? _manager_firstSelectedKey
            : delegate.getFirstKey()
        );
    } else if (!isVirtualized) {
      // Restore the scroll position to what it was before.
      scrollRef.current.scrollTop = scrollPos.current.top;
      scrollRef.current.scrollLeft = scrollPos.current.left;
    }
    if (!isVirtualized && manager.focusedKey != null) {
      // Refocus and scroll the focused item into view if it exists within the scrollable region.
      let element = scrollRef.current.querySelector(`[data-key="${manager.focusedKey}"]`);
      if (element) {
        // This prevents a flash of focus on the first/last element in the collection, or the collection itself.
        if (!element.contains(document.activeElement))
          $7215afc6de606d6b$export$de79e2c695e052f3(element);
        let modality = $507fabe10e71c6fb$export$630ff653c5ada6a9();
        if (modality === 'keyboard')
          $2f04cbc44ee30ce0$export$c826860796309d1b(element, {
            containingElement: ref.current,
          });
      }
    }
  };
  let onBlur = (e) => {
    // Don't set blurred and then focused again if moving focus within the collection.
    if (!e.currentTarget.contains(e.relatedTarget)) manager.setFocused(false);
  };
  const autoFocusRef = useRef(autoFocus);
  useEffect(() => {
    if (autoFocusRef.current) {
      let focusedKey = null;
      // Check focus strategy to determine which item to focus
      if (autoFocus === 'first') focusedKey = delegate.getFirstKey();
      if (autoFocus === 'last') focusedKey = delegate.getLastKey();
      // If there are any selected keys, make the first one the new focus target
      let selectedKeys = manager.selectedKeys;
      if (selectedKeys.size) focusedKey = selectedKeys.values().next().value;
      manager.setFocused(true);
      manager.setFocusedKey(focusedKey);
      // If no default focus key is selected, focus the collection itself.
      if (focusedKey == null && !shouldUseVirtualFocus)
        $6a99195332edec8b$export$80f3e147d781571c(ref.current);
    }
    autoFocusRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // If not virtualized, scroll the focused element into view when the focusedKey changes.
  // When virtualized, Virtualizer handles this internally.
  let lastFocusedKey = useRef(manager.focusedKey);
  useEffect(() => {
    let modality = $507fabe10e71c6fb$export$630ff653c5ada6a9();
    if (
      manager.isFocused &&
      manager.focusedKey != null &&
      (scrollRef === null || scrollRef === void 0 ? void 0 : scrollRef.current)
    ) {
      let element = scrollRef.current.querySelector(`[data-key="${manager.focusedKey}"]`);
      if (element && modality === 'keyboard') {
        if (!isVirtualized) $2f04cbc44ee30ce0$export$53a0910f038337bd(scrollRef.current, element);
        $2f04cbc44ee30ce0$export$c826860796309d1b(element, {
          containingElement: ref.current,
        });
      }
    }
    // If the focused key becomes null (e.g. the last item is deleted), focus the whole collection.
    if (manager.isFocused && manager.focusedKey == null && lastFocusedKey.current != null)
      $6a99195332edec8b$export$80f3e147d781571c(ref.current);
    lastFocusedKey.current = manager.focusedKey;
  }, [isVirtualized, scrollRef, manager.focusedKey, manager.isFocused, ref]);
  let handlers = {
    onKeyDown: onKeyDown,
    onFocus: onFocus,
    onBlur: onBlur,
    onMouseDown(e) {
      // Ignore events that bubbled through portals.
      if (scrollRef.current === e.target)
        // Prevent focus going to the collection when clicking on the scrollbar.
        e.preventDefault();
    },
  };
  let { typeSelectProps: typeSelectProps } = $fb3050f43d946246$export$e32c88dfddc6e1d8({
    keyboardDelegate: delegate,
    selectionManager: manager,
  });
  if (!disallowTypeAhead)
    handlers = $3ef42575df84b30b$export$9d1611c77c2fe928(typeSelectProps, handlers);
  // If nothing is focused within the collection, make the collection itself tabbable.
  // This will be marshalled to either the first or last item depending on where focus came from.
  // If using virtual focus, don't set a tabIndex at all so that VoiceOver on iOS 14 doesn't try
  // to move real DOM focus to the element anyway.
  let tabIndex;
  if (!shouldUseVirtualFocus) tabIndex = manager.focusedKey == null ? 0 : -1;
  return {
    collectionProps: {
      ...handlers,
      tabIndex: tabIndex,
    },
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $880e95eb8b93ba9a$export$ecf600387e221c37(options) {
  let {
    selectionManager: manager,
    key: key,
    ref: ref,
    shouldSelectOnPressUp: shouldSelectOnPressUp,
    shouldUseVirtualFocus: shouldUseVirtualFocus,
    focus: focus,
    isDisabled: isDisabled,
    onAction: onAction,
    allowsDifferentPressOrigin: allowsDifferentPressOrigin,
  } = options;
  let onSelect = (e) => {
    if (e.pointerType === 'keyboard' && $feb5ffebff200149$export$d3e3bd3e26688c04(e))
      manager.toggleSelection(key);
    else {
      if (manager.selectionMode === 'none') return;
      if (manager.selectionMode === 'single') {
        if (manager.isSelected(key) && !manager.disallowEmptySelection)
          manager.toggleSelection(key);
        else manager.replaceSelection(key);
      } else if (e && e.shiftKey) manager.extendSelection(key);
      else if (
        manager.selectionBehavior === 'toggle' ||
        (e &&
          ($feb5ffebff200149$export$16792effe837dba3(e) ||
            e.pointerType === 'touch' ||
            e.pointerType === 'virtual'))
      )
        // if touch or virtual (VO) then we just want to toggle, otherwise it's impossible to multi select because they don't have modifier keys
        manager.toggleSelection(key);
      else manager.replaceSelection(key);
    }
  };
  // Focus the associated DOM node when this item becomes the focusedKey
  useEffect(() => {
    let isFocused = key === manager.focusedKey;
    if (isFocused && manager.isFocused && !shouldUseVirtualFocus) {
      if (focus) focus();
      else if (document.activeElement !== ref.current)
        $6a99195332edec8b$export$80f3e147d781571c(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ref,
    key,
    manager.focusedKey,
    manager.childFocusStrategy,
    manager.isFocused,
    shouldUseVirtualFocus,
  ]);
  isDisabled = isDisabled || manager.isDisabled(key);
  // Set tabIndex to 0 if the element is focused, or -1 otherwise so that only the last focused
  // item is tabbable.  If using virtual focus, don't set a tabIndex at all so that VoiceOver
  // on iOS 14 doesn't try to move real DOM focus to the item anyway.
  let itemProps = {};
  if (!shouldUseVirtualFocus && !isDisabled)
    itemProps = {
      tabIndex: key === manager.focusedKey ? 0 : -1,
      onFocus(e) {
        if (e.target === ref.current) manager.setFocusedKey(key);
      },
    };
  else if (isDisabled)
    itemProps.onMouseDown = (e) => {
      // Prevent focus going to the body when clicking on a disabled item.
      e.preventDefault();
    };
  // With checkbox selection, onAction (i.e. navigation) becomes primary, and occurs on a single click of the row.
  // Clicking the checkbox enters selection mode, after which clicking anywhere on any row toggles selection for that row.
  // With highlight selection, onAction is secondary, and occurs on double click. Single click selects the row.
  // With touch, onAction occurs on single tap, and long press enters selection mode.
  let allowsSelection = !isDisabled && manager.canSelectItem(key);
  let allowsActions = onAction && !isDisabled;
  let hasPrimaryAction =
    allowsActions && (manager.selectionBehavior === 'replace' ? !allowsSelection : manager.isEmpty);
  let hasSecondaryAction =
    allowsActions && allowsSelection && manager.selectionBehavior === 'replace';
  let hasAction = hasPrimaryAction || hasSecondaryAction;
  let modality = useRef(null);
  let longPressEnabled = hasAction && allowsSelection;
  let longPressEnabledOnPressStart = useRef(false);
  let hadPrimaryActionOnPressStart = useRef(false);
  // By default, selection occurs on pointer down. This can be strange if selecting an
  // item causes the UI to disappear immediately (e.g. menus).
  // If shouldSelectOnPressUp is true, we use onPressUp instead of onPressStart.
  // onPress requires a pointer down event on the same element as pointer up. For menus,
  // we want to be able to have the pointer down on the trigger that opens the menu and
  // the pointer up on the menu item rather than requiring a separate press.
  // For keyboard events, selection still occurs on key down.
  let itemPressProps = {};
  if (shouldSelectOnPressUp) {
    itemPressProps.onPressStart = (e) => {
      modality.current = e.pointerType;
      longPressEnabledOnPressStart.current = longPressEnabled;
      if (e.pointerType === 'keyboard' && (!hasAction || $880e95eb8b93ba9a$var$isSelectionKey()))
        onSelect(e);
    };
    // If allowsDifferentPressOrigin, make selection happen on pressUp (e.g. open menu on press down, selection on menu item happens on press up.)
    // Otherwise, have selection happen onPress (prevents listview row selection when clicking on interactable elements in the row)
    if (!allowsDifferentPressOrigin)
      itemPressProps.onPress = (e) => {
        if (hasPrimaryAction || (hasSecondaryAction && e.pointerType !== 'mouse')) {
          if (e.pointerType === 'keyboard' && !$880e95eb8b93ba9a$var$isActionKey()) return;
          onAction();
        } else if (e.pointerType !== 'keyboard') onSelect(e);
      };
    else {
      itemPressProps.onPressUp = (e) => {
        if (e.pointerType !== 'keyboard') onSelect(e);
      };
      itemPressProps.onPress = hasPrimaryAction ? () => onAction() : null;
    }
  } else {
    itemPressProps.onPressStart = (e) => {
      modality.current = e.pointerType;
      longPressEnabledOnPressStart.current = longPressEnabled;
      hadPrimaryActionOnPressStart.current = hasPrimaryAction;
      // Select on mouse down unless there is a primary action which will occur on mouse up.
      // For keyboard, select on key down. If there is an action, the Space key selects on key down,
      // and the Enter key performs onAction on key up.
      if (
        (e.pointerType === 'mouse' && !hasPrimaryAction) ||
        (e.pointerType === 'keyboard' && (!onAction || $880e95eb8b93ba9a$var$isSelectionKey()))
      )
        onSelect(e);
    };
    itemPressProps.onPress = (e) => {
      // Selection occurs on touch up. Primary actions always occur on pointer up.
      // Both primary and secondary actions occur on Enter key up. The only exception
      // is secondary actions, which occur on double click with a mouse.
      if (
        e.pointerType === 'touch' ||
        e.pointerType === 'pen' ||
        e.pointerType === 'virtual' ||
        (e.pointerType === 'keyboard' && hasAction && $880e95eb8b93ba9a$var$isActionKey()) ||
        (e.pointerType === 'mouse' && hadPrimaryActionOnPressStart.current)
      ) {
        if (hasAction) onAction();
        else onSelect(e);
      }
    };
  }
  itemProps['data-key'] = key;
  itemPressProps.preventFocusOnPress = shouldUseVirtualFocus;
  let { pressProps: pressProps, isPressed: isPressed } =
    $f6c31cce2adf654f$export$45712eceda6fad21(itemPressProps);
  // Double clicking with a mouse with selectionBehavior = 'replace' performs an action.
  let onDoubleClick = hasSecondaryAction
    ? (e) => {
        if (modality.current === 'mouse') {
          e.stopPropagation();
          e.preventDefault();
          onAction();
        }
      }
    : undefined;
  // Long pressing an item with touch when selectionBehavior = 'replace' switches the selection behavior
  // to 'toggle'. This changes the single tap behavior from performing an action (i.e. navigating) to
  // selecting, and may toggle the appearance of a UI affordance like checkboxes on each item.
  let { longPressProps: longPressProps } = $8a26561d2877236e$export$c24ed0104d07eab9({
    isDisabled: !longPressEnabled,
    onLongPress(e) {
      if (e.pointerType === 'touch') {
        onSelect(e);
        manager.setSelectionBehavior('toggle');
      }
    },
  });
  // Prevent native drag and drop on long press if we also select on long press.
  // Once the user is in selection mode, they can long press again to drag.
  // Use a capturing listener to ensure this runs before useDrag, regardless of
  // the order the props get merged.
  let onDragStartCapture = (e) => {
    if (modality.current === 'touch' && longPressEnabledOnPressStart.current) e.preventDefault();
  };
  return {
    itemProps: $3ef42575df84b30b$export$9d1611c77c2fe928(
      itemProps,
      allowsSelection || hasPrimaryAction ? pressProps : {},
      longPressEnabled ? longPressProps : {},
      {
        onDoubleClick: onDoubleClick,
        onDragStartCapture: onDragStartCapture,
      }
    ),
    isPressed: isPressed,
    isSelected: manager.isSelected(key),
    isFocused: manager.isFocused && manager.focusedKey === key,
    isDisabled: isDisabled,
    allowsSelection: allowsSelection,
    hasAction: hasAction,
  };
}
function $880e95eb8b93ba9a$var$isActionKey() {
  let event = window.event;
  return (event === null || event === void 0 ? void 0 : event.key) === 'Enter';
}
function $880e95eb8b93ba9a$var$isSelectionKey() {
  let event = window.event;
  return (
    (event === null || event === void 0 ? void 0 : event.key) === ' ' ||
    (event === null || event === void 0 ? void 0 : event.code) === 'Space'
  );
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
class $2a25aae57d74318e$export$a05409b8bb224a5a {
  getNextKey(key) {
    key = this.collection.getKeyAfter(key);
    while (key != null) {
      let item = this.collection.getItem(key);
      if (item.type === 'item' && !this.disabledKeys.has(key)) return key;
      key = this.collection.getKeyAfter(key);
    }
    return null;
  }
  getPreviousKey(key) {
    key = this.collection.getKeyBefore(key);
    while (key != null) {
      let item = this.collection.getItem(key);
      if (item.type === 'item' && !this.disabledKeys.has(key)) return key;
      key = this.collection.getKeyBefore(key);
    }
    return null;
  }
  findKey(key, nextKey, shouldSkip) {
    let item = this.getItem(key);
    if (!item) return null;
    // Find the item above or below in the same column.
    let prevRect = item.getBoundingClientRect();
    do {
      key = nextKey(key);
      item = this.getItem(key);
    } while (item && shouldSkip(prevRect, item.getBoundingClientRect()));
    return key;
  }
  isSameRow(prevRect, itemRect) {
    return prevRect.top === itemRect.top || prevRect.left !== itemRect.left;
  }
  isSameColumn(prevRect, itemRect) {
    return prevRect.left === itemRect.left || prevRect.top !== itemRect.top;
  }
  getKeyBelow(key) {
    if (this.layout === 'grid' && this.orientation === 'vertical')
      return this.findKey(key, (key) => this.getNextKey(key), this.isSameRow);
    else return this.getNextKey(key);
  }
  getKeyAbove(key) {
    if (this.layout === 'grid' && this.orientation === 'vertical')
      return this.findKey(key, (key) => this.getPreviousKey(key), this.isSameRow);
    else return this.getPreviousKey(key);
  }
  getNextColumn(key, right) {
    return right ? this.getPreviousKey(key) : this.getNextKey(key);
  }
  getKeyRightOf(key) {
    if (this.layout === 'grid') {
      if (this.orientation === 'vertical') return this.getNextColumn(key, this.direction === 'rtl');
      else
        return this.findKey(
          key,
          (key) => this.getNextColumn(key, this.direction === 'rtl'),
          this.isSameColumn
        );
    } else if (this.orientation === 'horizontal')
      return this.getNextColumn(key, this.direction === 'rtl');
    return null;
  }
  getKeyLeftOf(key) {
    if (this.layout === 'grid') {
      if (this.orientation === 'vertical') return this.getNextColumn(key, this.direction === 'ltr');
      else
        return this.findKey(
          key,
          (key) => this.getNextColumn(key, this.direction === 'ltr'),
          this.isSameColumn
        );
    } else if (this.orientation === 'horizontal')
      return this.getNextColumn(key, this.direction === 'ltr');
    return null;
  }
  getFirstKey() {
    let key = this.collection.getFirstKey();
    while (key != null) {
      let item = this.collection.getItem(key);
      if (item.type === 'item' && !this.disabledKeys.has(key)) return key;
      key = this.collection.getKeyAfter(key);
    }
    return null;
  }
  getLastKey() {
    let key = this.collection.getLastKey();
    while (key != null) {
      let item = this.collection.getItem(key);
      if (item.type === 'item' && !this.disabledKeys.has(key)) return key;
      key = this.collection.getKeyBefore(key);
    }
    return null;
  }
  getItem(key) {
    return this.ref.current.querySelector(`[data-key="${key}"]`);
  }
  getKeyPageAbove(key) {
    let menu = this.ref.current;
    let item = this.getItem(key);
    if (!item) return null;
    if (!$62d8ded9296f3872$export$2bb74740c4e19def(menu)) return this.getFirstKey();
    let containerRect = menu.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();
    if (this.orientation === 'horizontal') {
      let containerX = containerRect.x - menu.scrollLeft;
      let pageX = Math.max(0, itemRect.x - containerX + itemRect.width - containerRect.width);
      while (item && itemRect.x - containerX > pageX) {
        key = this.getKeyAbove(key);
        item = key == null ? null : this.getItem(key);
        itemRect = item === null || item === void 0 ? void 0 : item.getBoundingClientRect();
      }
    } else {
      let containerY = containerRect.y - menu.scrollTop;
      let pageY = Math.max(0, itemRect.y - containerY + itemRect.height - containerRect.height);
      while (item && itemRect.y - containerY > pageY) {
        key = this.getKeyAbove(key);
        item = key == null ? null : this.getItem(key);
        itemRect = item === null || item === void 0 ? void 0 : item.getBoundingClientRect();
      }
    }
    return key !== null && key !== void 0 ? key : this.getFirstKey();
  }
  getKeyPageBelow(key) {
    let menu = this.ref.current;
    let item = this.getItem(key);
    if (!item) return null;
    if (!$62d8ded9296f3872$export$2bb74740c4e19def(menu)) return this.getLastKey();
    let containerRect = menu.getBoundingClientRect();
    let itemRect = item.getBoundingClientRect();
    if (this.orientation === 'horizontal') {
      let containerX = containerRect.x - menu.scrollLeft;
      let pageX = Math.min(
        menu.scrollWidth,
        itemRect.x - containerX - itemRect.width + containerRect.width
      );
      while (item && itemRect.x - containerX < pageX) {
        key = this.getKeyBelow(key);
        item = key == null ? null : this.getItem(key);
        itemRect = item === null || item === void 0 ? void 0 : item.getBoundingClientRect();
      }
    } else {
      let containerY = containerRect.y - menu.scrollTop;
      let pageY = Math.min(
        menu.scrollHeight,
        itemRect.y - containerY - itemRect.height + containerRect.height
      );
      while (item && itemRect.y - containerY < pageY) {
        key = this.getKeyBelow(key);
        item = key == null ? null : this.getItem(key);
        itemRect = item === null || item === void 0 ? void 0 : item.getBoundingClientRect();
      }
    }
    return key !== null && key !== void 0 ? key : this.getLastKey();
  }
  getKeyForSearch(search, fromKey) {
    if (!this.collator) return null;
    let collection = this.collection;
    let key = fromKey || this.getFirstKey();
    while (key != null) {
      let item = collection.getItem(key);
      let substring = item.textValue.slice(0, search.length);
      if (item.textValue && this.collator.compare(substring, search) === 0) return key;
      key = this.getKeyBelow(key);
    }
    return null;
  }
  constructor(...args) {
    if (args.length === 1) {
      let opts = args[0];
      this.collection = opts.collection;
      this.ref = opts.ref;
      this.disabledKeys = opts.disabledKeys || new Set();
      this.orientation = opts.orientation;
      this.direction = opts.direction;
      this.layout = opts.layout || 'stack';
    } else {
      this.collection = args[0];
      this.disabledKeys = args[1];
      this.ref = args[2];
      this.collator = args[3];
      this.layout = 'stack';
      this.orientation = 'vertical';
    }
    // If this is a vertical stack, remove the left/right methods completely
    // so they aren't called by useDroppableCollection.
    if (this.layout === 'stack' && this.orientation === 'vertical') {
      this.getKeyLeftOf = undefined;
      this.getKeyRightOf = undefined;
    }
  }
}

function $982254629710d113$export$b95089534ab7c1fd(props) {
  let {
    selectionManager: selectionManager,
    collection: collection,
    disabledKeys: disabledKeys,
    ref: ref,
    keyboardDelegate: keyboardDelegate,
    autoFocus: autoFocus,
    shouldFocusWrap: shouldFocusWrap,
    isVirtualized: isVirtualized,
    disallowEmptySelection: disallowEmptySelection,
    selectOnFocus: selectOnFocus = selectionManager.selectionBehavior === 'replace',
    disallowTypeAhead: disallowTypeAhead,
    shouldUseVirtualFocus: shouldUseVirtualFocus,
    allowsTabNavigation: allowsTabNavigation,
  } = props;
  // By default, a KeyboardDelegate is provided which uses the DOM to query layout information (e.g. for page up/page down).
  // When virtualized, the layout object will be passed in as a prop and override this.
  let collator = $325a3faab7a68acd$export$a16aca283550c30d({
    usage: 'search',
    sensitivity: 'base',
  });
  let disabledBehavior = selectionManager.disabledBehavior;
  let delegate = useMemo(
    () =>
      keyboardDelegate ||
      new $2a25aae57d74318e$export$a05409b8bb224a5a(
        collection,
        disabledBehavior === 'selection' ? new Set() : disabledKeys,
        ref,
        collator
      ),
    [keyboardDelegate, collection, disabledKeys, ref, collator, disabledBehavior]
  );
  let { collectionProps: collectionProps } = $ae20dd8cbca75726$export$d6daf82dcd84e87c({
    ref: ref,
    selectionManager: selectionManager,
    keyboardDelegate: delegate,
    autoFocus: autoFocus,
    shouldFocusWrap: shouldFocusWrap,
    disallowEmptySelection: disallowEmptySelection,
    selectOnFocus: selectOnFocus,
    disallowTypeAhead: disallowTypeAhead,
    shouldUseVirtualFocus: shouldUseVirtualFocus,
    allowsTabNavigation: allowsTabNavigation,
    isVirtualized: isVirtualized,
    scrollRef: ref,
  });
  return {
    listProps: collectionProps,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ const $b1f0cad8af73213b$export$3585ede4d035bf14 = new WeakMap();
function $b1f0cad8af73213b$var$normalizeKey(key) {
  if (typeof key === 'string') return key.replace(/\s*/g, '');
  return '' + key;
}
function $b1f0cad8af73213b$export$9145995848b05025(state, itemKey) {
  let data = $b1f0cad8af73213b$export$3585ede4d035bf14.get(state);
  if (!data) throw new Error('Unknown list');
  return `${data.id}-option-${$b1f0cad8af73213b$var$normalizeKey(itemKey)}`;
}

function $c132121280ec012d$export$50eacbbf140a3141(props, state, ref) {
  let domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, {
    labelable: true,
  });
  let { listProps: listProps } = $982254629710d113$export$b95089534ab7c1fd({
    ...props,
    ref: ref,
    selectionManager: state.selectionManager,
    collection: state.collection,
    disabledKeys: state.disabledKeys,
  });
  let { focusWithinProps: focusWithinProps } = $9ab94262bd0047c7$export$420e68273165f4ec({
    onFocusWithin: props.onFocus,
    onBlurWithin: props.onBlur,
    onFocusWithinChange: props.onFocusChange,
  });
  // Share list id and some props with child options.
  let id = $bdb11010cef70236$export$f680877a34711e37(props.id);
  $b1f0cad8af73213b$export$3585ede4d035bf14.set(state, {
    id: id,
    shouldUseVirtualFocus: props.shouldUseVirtualFocus,
    shouldSelectOnPressUp: props.shouldSelectOnPressUp,
    shouldFocusOnHover: props.shouldFocusOnHover,
    isVirtualized: props.isVirtualized,
    onAction: props.onAction,
  });
  let { labelProps: labelProps, fieldProps: fieldProps } =
    $d191a55c9702f145$export$8467354a121f1b9f({
      ...props,
      id: id,
      // listbox is not an HTML input element so it
      // shouldn't be labeled by a <label> element.
      labelElementType: 'span',
    });
  return {
    labelProps: labelProps,
    listBoxProps: $3ef42575df84b30b$export$9d1611c77c2fe928(
      domProps,
      focusWithinProps,
      state.selectionManager.selectionMode === 'multiple'
        ? {
            'aria-multiselectable': 'true',
          }
        : {},
      {
        role: 'listbox',
        ...$3ef42575df84b30b$export$9d1611c77c2fe928(fieldProps, listProps),
      }
    ),
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $293f70390ea03370$export$497855f14858aa34(props, state, ref) {
  let { key: key } = props;
  let data = $b1f0cad8af73213b$export$3585ede4d035bf14.get(state);
  var _props_isDisabled;
  let isDisabled =
    (_props_isDisabled = props.isDisabled) !== null && _props_isDisabled !== void 0
      ? _props_isDisabled
      : state.disabledKeys.has(key);
  var _props_isSelected;
  let isSelected =
    (_props_isSelected = props.isSelected) !== null && _props_isSelected !== void 0
      ? _props_isSelected
      : state.selectionManager.isSelected(key);
  var _props_shouldSelectOnPressUp;
  let shouldSelectOnPressUp =
    (_props_shouldSelectOnPressUp = props.shouldSelectOnPressUp) !== null &&
    _props_shouldSelectOnPressUp !== void 0
      ? _props_shouldSelectOnPressUp
      : data === null || data === void 0
      ? void 0
      : data.shouldSelectOnPressUp;
  var _props_shouldFocusOnHover;
  let shouldFocusOnHover =
    (_props_shouldFocusOnHover = props.shouldFocusOnHover) !== null &&
    _props_shouldFocusOnHover !== void 0
      ? _props_shouldFocusOnHover
      : data === null || data === void 0
      ? void 0
      : data.shouldFocusOnHover;
  var _props_shouldUseVirtualFocus;
  let shouldUseVirtualFocus =
    (_props_shouldUseVirtualFocus = props.shouldUseVirtualFocus) !== null &&
    _props_shouldUseVirtualFocus !== void 0
      ? _props_shouldUseVirtualFocus
      : data === null || data === void 0
      ? void 0
      : data.shouldUseVirtualFocus;
  var _props_isVirtualized;
  let isVirtualized =
    (_props_isVirtualized = props.isVirtualized) !== null && _props_isVirtualized !== void 0
      ? _props_isVirtualized
      : data === null || data === void 0
      ? void 0
      : data.isVirtualized;
  let labelId = $bdb11010cef70236$export$b4cc09c592e8fdb8();
  let descriptionId = $bdb11010cef70236$export$b4cc09c592e8fdb8();
  let optionProps = {
    role: 'option',
    'aria-disabled': isDisabled || undefined,
    'aria-selected': state.selectionManager.selectionMode !== 'none' ? isSelected : undefined,
  };
  // Safari with VoiceOver on macOS misreads options with aria-labelledby or aria-label as simply "text".
  // We should not map slots to the label and description on Safari and instead just have VoiceOver read the textContent.
  // https://bugs.webkit.org/show_bug.cgi?id=209279
  if (
    !($c87311424ea30a05$export$9ac100e40613ea10() && $c87311424ea30a05$export$78551043582a6a98())
  ) {
    optionProps['aria-label'] = props['aria-label'];
    optionProps['aria-labelledby'] = labelId;
    optionProps['aria-describedby'] = descriptionId;
  }
  if (isVirtualized) {
    var _state_collection_getItem;
    let index = Number(
      (_state_collection_getItem = state.collection.getItem(key)) === null ||
        _state_collection_getItem === void 0
        ? void 0
        : _state_collection_getItem.index
    );
    optionProps['aria-posinset'] = Number.isNaN(index) ? undefined : index + 1;
    optionProps['aria-setsize'] = $453cc9f0df89c0a5$export$77d5aafae4e095b2(state.collection);
  }
  let {
    itemProps: itemProps,
    isPressed: isPressed,
    isFocused: isFocused,
    hasAction: hasAction,
    allowsSelection: allowsSelection,
  } = $880e95eb8b93ba9a$export$ecf600387e221c37({
    selectionManager: state.selectionManager,
    key: key,
    ref: ref,
    shouldSelectOnPressUp: shouldSelectOnPressUp,
    allowsDifferentPressOrigin: shouldSelectOnPressUp && shouldFocusOnHover,
    isVirtualized: isVirtualized,
    shouldUseVirtualFocus: shouldUseVirtualFocus,
    isDisabled: isDisabled,
    onAction: (data === null || data === void 0 ? void 0 : data.onAction)
      ? () => {
          var _data_onAction;
          return data === null || data === void 0
            ? void 0
            : (_data_onAction = data.onAction) === null || _data_onAction === void 0
            ? void 0
            : _data_onAction.call(data, key);
        }
      : undefined,
  });
  let { hoverProps: hoverProps } = $6179b936705e76d3$export$ae780daf29e6d456({
    isDisabled: isDisabled || !shouldFocusOnHover,
    onHoverStart() {
      if (!$507fabe10e71c6fb$export$b9b3dfddab17db27()) {
        state.selectionManager.setFocused(true);
        state.selectionManager.setFocusedKey(key);
      }
    },
  });
  return {
    optionProps: {
      ...optionProps,
      ...$3ef42575df84b30b$export$9d1611c77c2fe928(itemProps, hoverProps),
      id: $b1f0cad8af73213b$export$9145995848b05025(state, key),
    },
    labelProps: {
      id: labelId,
    },
    descriptionProps: {
      id: descriptionId,
    },
    isFocused: isFocused,
    isFocusVisible: isFocused && $507fabe10e71c6fb$export$b9b3dfddab17db27(),
    isSelected: isSelected,
    isDisabled: isDisabled,
    isPressed: isPressed,
    allowsSelection: allowsSelection,
    hasAction: hasAction,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
function $af383d3bef1cfdc9$export$c3f9f39876e4bc7(props) {
  let { heading: heading, 'aria-label': ariaLabel } = props;
  let headingId = $bdb11010cef70236$export$f680877a34711e37();
  return {
    itemProps: {
      role: 'presentation',
    },
    headingProps: heading
      ? {
          // Techincally, listbox cannot contain headings according to ARIA.
          // We hide the heading from assistive technology, using role="presentation",
          // and only use it as a visual label for the nested group.
          id: headingId,
          role: 'presentation',
        }
      : {},
    groupProps: {
      role: 'group',
      'aria-label': ariaLabel,
      'aria-labelledby': heading ? headingId : undefined,
    },
  };
}

function $parcel$interopDefault$1(a) {
  return a && a.__esModule ? a.default : a;
}
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ var $2cbb7ca666678a14$exports = {};

var $43b800e97c901737$exports = {};
$43b800e97c901737$exports = {
  longPressMessage: `Long press or press Alt + ArrowDown to open menu`,
};

var $442f5f6ac211e29f$exports = {};
$442f5f6ac211e29f$exports = {
  longPressMessage: `Mantenga pulsado o pulse Alt + flecha abajo para abrir el menú`,
};

$2cbb7ca666678a14$exports = {
  'en-US': $43b800e97c901737$exports,
  'es-ES': $442f5f6ac211e29f$exports,
};

function $168583247155ddda$export$dc9c12ed27dd1b49(props, state, ref) {
  let { type: type = 'menu', isDisabled: isDisabled, trigger: trigger = 'press' } = props;
  let menuTriggerId = $bdb11010cef70236$export$f680877a34711e37();
  let { triggerProps: triggerProps, overlayProps: overlayProps } =
    $628037886ba31236$export$f9d5c8beee7d008d(
      {
        type: type,
      },
      state,
      ref
    );
  let onKeyDown = (e) => {
    if (isDisabled) return;
    if (trigger === 'longPress' && !e.altKey) return;
    if (ref && ref.current)
      switch (e.key) {
        case 'Enter':
        case ' ':
          if (trigger === 'longPress') return;
        // fallthrough
        case 'ArrowDown':
          // Stop propagation, unless it would already be handled by useKeyboard.
          if (!('continuePropagation' in e)) e.stopPropagation();
          e.preventDefault();
          state.toggle('first');
          break;
        case 'ArrowUp':
          if (!('continuePropagation' in e)) e.stopPropagation();
          e.preventDefault();
          state.toggle('last');
          break;
        default:
          // Allow other keys.
          if ('continuePropagation' in e) e.continuePropagation();
      }
  };
  let stringFormatter = $fca6afa0e843324b$export$f12b703ca79dfbb1(
    /*@__PURE__*/ $parcel$interopDefault$1($2cbb7ca666678a14$exports)
  );
  let { longPressProps: longPressProps } = $8a26561d2877236e$export$c24ed0104d07eab9({
    isDisabled: isDisabled || trigger !== 'longPress',
    accessibilityDescription: stringFormatter.format('longPressMessage'),
    onLongPressStart() {
      state.close();
    },
    onLongPress() {
      state.open('first');
    },
  });
  let pressProps = {
    onPressStart(e) {
      // For consistency with native, open the menu on mouse/key down, but touch up.
      if (e.pointerType !== 'touch' && e.pointerType !== 'keyboard' && !isDisabled)
        // If opened with a screen reader, auto focus the first item.
        // Otherwise, the menu itself will be focused.
        state.toggle(e.pointerType === 'virtual' ? 'first' : null);
    },
    onPress(e) {
      if (e.pointerType === 'touch' && !isDisabled) state.toggle();
    },
  };
  // omit onPress from triggerProps since we override it above.
  delete triggerProps.onPress;
  return {
    menuTriggerProps: {
      ...triggerProps,
      ...(trigger === 'press' ? pressProps : longPressProps),
      id: menuTriggerId,
      onKeyDown: onKeyDown,
    },
    menuProps: {
      ...overlayProps,
      'aria-labelledby': menuTriggerId,
      autoFocus: state.focusStrategy || true,
      onClose: state.close,
    },
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $2d73ec29415bd339$export$712718f7aec83d5(props, ref) {
  let {
    inputElementType: inputElementType = 'input',
    isDisabled: isDisabled = false,
    isRequired: isRequired = false,
    isReadOnly: isReadOnly = false,
    validationState: validationState,
    isInvalid: isInvalid = false,
    type: type = 'text',
    value: value,
    defaultValue: defaultValue,
    onChange: onChange = () => {},
  } = props;
  let { focusableProps: focusableProps } = $e6afbd83fe6ebbd2$export$4c014de7c8940b4c(props, ref);
  let {
    labelProps: labelProps,
    fieldProps: fieldProps,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps,
  } = $2baaea4c71418dea$export$294aa081a6c6f55d(props);
  let domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, {
    labelable: true,
  });
  const inputOnlyProps = {
    type: type,
    pattern: props.pattern,
  };
  var _ref;
  $99facab73266f662$export$5add1d006293d136(
    ref,
    (_ref = value !== null && value !== void 0 ? value : defaultValue) !== null && _ref !== void 0
      ? _ref
      : '',
    onChange
  );
  return {
    labelProps: labelProps,
    inputProps: $3ef42575df84b30b$export$9d1611c77c2fe928(
      domProps,
      inputElementType === 'input' && inputOnlyProps,
      {
        disabled: isDisabled,
        readOnly: isReadOnly,
        'aria-required': isRequired || undefined,
        'aria-invalid': isInvalid || validationState === 'invalid' || undefined,
        'aria-errormessage': props['aria-errormessage'],
        'aria-activedescendant': props['aria-activedescendant'],
        'aria-autocomplete': props['aria-autocomplete'],
        'aria-haspopup': props['aria-haspopup'],
        value: props.value,
        defaultValue: props.value ? undefined : props.defaultValue,
        onChange: (e) => onChange(e.target.value),
        autoComplete: props.autoComplete,
        maxLength: props.maxLength,
        minLength: props.minLength,
        name: props.name,
        placeholder: props.placeholder,
        inputMode: props.inputMode,
        // Clipboard events
        onCopy: props.onCopy,
        onCut: props.onCut,
        onPaste: props.onPaste,
        // Composition events
        onCompositionEnd: props.onCompositionEnd,
        onCompositionStart: props.onCompositionStart,
        onCompositionUpdate: props.onCompositionUpdate,
        // Selection events
        onSelect: props.onSelect,
        // Input events
        onBeforeInput: props.onBeforeInput,
        onInput: props.onInput,
        ...focusableProps,
        ...fieldProps,
      }
    ),
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps,
  };
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

var $de5926a92e8ebc5b$exports = {};

var $9b5aa79ef84beb6c$exports = {};
$9b5aa79ef84beb6c$exports = {
  focusAnnouncement: (args, formatter) =>
    `${formatter.select(
      {
        true: () =>
          `Entered group ${args.groupTitle}, with ${formatter.plural(args.groupCount, {
            one: () => `${formatter.number(args.groupCount)} option`,
            other: () => `${formatter.number(args.groupCount)} options`,
          })}. `,
        other: ``,
      },
      args.isGroupChange
    )}${args.optionText}${formatter.select(
      {
        true: `, selected`,
        other: ``,
      },
      args.isSelected
    )}`,
  countAnnouncement: (args, formatter) =>
    `${formatter.plural(args.optionCount, {
      one: () => `${formatter.number(args.optionCount)} option`,
      other: () => `${formatter.number(args.optionCount)} options`,
    })} available.`,
  selectedAnnouncement: (args) => `${args.optionText}, selected`,
  buttonLabel: `Show suggestions`,
  listboxLabel: `Suggestions`,
};

var $57968e8209de2557$exports = {};
$57968e8209de2557$exports = {
  buttonLabel: `Mostrar sugerencias`,
  countAnnouncement: (args, formatter) =>
    `${formatter.plural(args.optionCount, {
      one: () => `${formatter.number(args.optionCount)} opción`,
      other: () => `${formatter.number(args.optionCount)} opciones`,
    })} disponible(s).`,
  focusAnnouncement: (args, formatter) =>
    `${formatter.select(
      {
        true: () =>
          `Se ha unido al grupo ${args.groupTitle}, con ${formatter.plural(args.groupCount, {
            one: () => `${formatter.number(args.groupCount)} opción`,
            other: () => `${formatter.number(args.groupCount)} opciones`,
          })}. `,
        other: ``,
      },
      args.isGroupChange
    )}${args.optionText}${formatter.select(
      {
        true: `, seleccionado`,
        other: ``,
      },
      args.isSelected
    )}`,
  listboxLabel: `Sugerencias`,
  selectedAnnouncement: (args) => `${args.optionText}, seleccionado`,
};

$de5926a92e8ebc5b$exports = {
  'en-US': $9b5aa79ef84beb6c$exports,
  'es-ES': $57968e8209de2557$exports,
};

function $c350ade66beef0af$export$8c18d1b4f7232bbf(props, state) {
  let {
    buttonRef: buttonRef,
    popoverRef: popoverRef,
    inputRef: inputRef,
    listBoxRef: listBoxRef,
    keyboardDelegate: keyboardDelegate,
    // completionMode = 'suggest',
    shouldFocusWrap: shouldFocusWrap,
    isReadOnly: isReadOnly,
    isDisabled: isDisabled,
  } = props;
  let stringFormatter = $fca6afa0e843324b$export$f12b703ca79dfbb1(
    /*@__PURE__*/ $parcel$interopDefault($de5926a92e8ebc5b$exports)
  );
  let { menuTriggerProps: menuTriggerProps, menuProps: menuProps } =
    $168583247155ddda$export$dc9c12ed27dd1b49(
      {
        type: 'listbox',
        isDisabled: isDisabled || isReadOnly,
      },
      state,
      buttonRef
    );
  // Set listbox id so it can be used when calling getItemId later
  $b1f0cad8af73213b$export$3585ede4d035bf14.set(state, {
    id: menuProps.id,
  });
  // By default, a KeyboardDelegate is provided which uses the DOM to query layout information (e.g. for page up/page down).
  // When virtualized, the layout object will be passed in as a prop and override this.
  let delegate = useMemo(
    () =>
      keyboardDelegate ||
      new $2a25aae57d74318e$export$a05409b8bb224a5a(
        state.collection,
        state.disabledKeys,
        listBoxRef
      ),
    [keyboardDelegate, state.collection, state.disabledKeys, listBoxRef]
  );
  // Use useSelectableCollection to get the keyboard handlers to apply to the textfield
  let { collectionProps: collectionProps } = $ae20dd8cbca75726$export$d6daf82dcd84e87c({
    selectionManager: state.selectionManager,
    keyboardDelegate: delegate,
    disallowTypeAhead: true,
    disallowEmptySelection: true,
    shouldFocusWrap: shouldFocusWrap,
    ref: inputRef,
    // Prevent item scroll behavior from being applied here, should be handled in the user's Popover + ListBox component
    isVirtualized: true,
  });
  // For textfield specific keydown operations
  let onKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case 'Tab':
        // Prevent form submission if menu is open since we may be selecting a option
        if (state.isOpen && e.key === 'Enter') e.preventDefault();
        state.commit();
        break;
      case 'Escape':
        if (state.selectedKey !== null || state.inputValue === '' || props.allowsCustomValue)
          e.continuePropagation();
        state.revert();
        break;
      case 'ArrowDown':
        state.open('first', 'manual');
        break;
      case 'ArrowUp':
        state.open('last', 'manual');
        break;
      case 'ArrowLeft':
      case 'ArrowRight':
        state.selectionManager.setFocusedKey(null);
        break;
    }
  };
  let onBlur = (e) => {
    var _popoverRef_current;
    // Ignore blur if focused moved to the button or into the popover.
    if (
      e.relatedTarget ===
        (buttonRef === null || buttonRef === void 0 ? void 0 : buttonRef.current) ||
      ((_popoverRef_current = popoverRef.current) === null || _popoverRef_current === void 0
        ? void 0
        : _popoverRef_current.contains(e.relatedTarget))
    )
      return;
    if (props.onBlur) props.onBlur(e);
    state.setFocused(false);
  };
  let onFocus = (e) => {
    if (state.isFocused) return;
    if (props.onFocus) props.onFocus(e);
    state.setFocused(true);
  };
  let {
    labelProps: labelProps,
    inputProps: inputProps,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps,
  } = $2d73ec29415bd339$export$712718f7aec83d5(
    {
      ...props,
      onChange: state.setInputValue,
      onKeyDown:
        !isReadOnly &&
        $ff5963eb1fccf552$export$e08e3b67e392101e(
          state.isOpen && collectionProps.onKeyDown,
          onKeyDown,
          props.onKeyDown
        ),
      onBlur: onBlur,
      value: state.inputValue,
      onFocus: onFocus,
      autoComplete: 'off',
    },
    inputRef
  );
  // Press handlers for the ComboBox button
  let onPress = (e) => {
    if (e.pointerType === 'touch') {
      // Focus the input field in case it isn't focused yet
      inputRef.current.focus();
      state.toggle(null, 'manual');
    }
  };
  let onPressStart = (e) => {
    if (e.pointerType !== 'touch') {
      inputRef.current.focus();
      state.toggle(
        e.pointerType === 'keyboard' || e.pointerType === 'virtual' ? 'first' : null,
        'manual'
      );
    }
  };
  let triggerLabelProps = $313b98861ee5dd6c$export$d6875122194c7b44({
    id: menuTriggerProps.id,
    'aria-label': stringFormatter.format('buttonLabel'),
    'aria-labelledby': props['aria-labelledby'] || labelProps.id,
  });
  let listBoxProps = $313b98861ee5dd6c$export$d6875122194c7b44({
    id: menuProps.id,
    'aria-label': stringFormatter.format('listboxLabel'),
    'aria-labelledby': props['aria-labelledby'] || labelProps.id,
  });
  // If a touch happens on direct center of ComboBox input, might be virtual click from iPad so open ComboBox menu
  let lastEventTime = useRef(0);
  let onTouchEnd = (e) => {
    if (isDisabled || isReadOnly) return;
    // Sometimes VoiceOver on iOS fires two touchend events in quick succession. Ignore the second one.
    if (e.timeStamp - lastEventTime.current < 500) {
      e.preventDefault();
      inputRef.current.focus();
      return;
    }
    let rect = e.target.getBoundingClientRect();
    let touch = e.changedTouches[0];
    let centerX = Math.ceil(rect.left + 0.5 * rect.width);
    let centerY = Math.ceil(rect.top + 0.5 * rect.height);
    if (touch.clientX === centerX && touch.clientY === centerY) {
      e.preventDefault();
      inputRef.current.focus();
      state.toggle(null, 'manual');
      lastEventTime.current = e.timeStamp;
    }
  };
  // VoiceOver has issues with announcing aria-activedescendant properly on change
  // (especially on iOS). We use a live region announcer to announce focus changes
  // manually. In addition, section titles are announced when navigating into a new section.
  let focusedItem =
    state.selectionManager.focusedKey != null && state.isOpen
      ? state.collection.getItem(state.selectionManager.focusedKey)
      : undefined;
  var _focusedItem_parentKey;
  let sectionKey =
    (_focusedItem_parentKey =
      focusedItem === null || focusedItem === void 0 ? void 0 : focusedItem.parentKey) !== null &&
    _focusedItem_parentKey !== void 0
      ? _focusedItem_parentKey
      : null;
  var _state_selectionManager_focusedKey;
  let itemKey =
    (_state_selectionManager_focusedKey = state.selectionManager.focusedKey) !== null &&
    _state_selectionManager_focusedKey !== void 0
      ? _state_selectionManager_focusedKey
      : null;
  let lastSection = useRef(sectionKey);
  let lastItem = useRef(itemKey);
  useEffect(() => {
    if (
      $c87311424ea30a05$export$e1865c3bedcd822b() &&
      focusedItem != null &&
      itemKey !== lastItem.current
    ) {
      let isSelected = state.selectionManager.isSelected(itemKey);
      let section = sectionKey != null ? state.collection.getItem(sectionKey) : null;
      let sectionTitle =
        (section === null || section === void 0 ? void 0 : section['aria-label']) ||
        (typeof (section === null || section === void 0 ? void 0 : section.rendered) === 'string'
          ? section.rendered
          : '') ||
        '';
      let announcement = stringFormatter.format('focusAnnouncement', {
        isGroupChange: section && sectionKey !== lastSection.current,
        groupTitle: sectionTitle,
        groupCount: section
          ? [...$c5a24bc478652b5f$export$1005530eda016c13(section, state.collection)].length
          : 0,
        optionText: focusedItem['aria-label'] || focusedItem.textValue || '',
        isSelected: isSelected,
      });
      $319e236875307eab$export$a9b970dcc4ae71a9(announcement);
    }
    lastSection.current = sectionKey;
    lastItem.current = itemKey;
  });
  // Announce the number of available suggestions when it changes
  let optionCount = $453cc9f0df89c0a5$export$77d5aafae4e095b2(state.collection);
  let lastSize = useRef(optionCount);
  let lastOpen = useRef(state.isOpen);
  useEffect(() => {
    // Only announce the number of options available when the menu opens if there is no
    // focused item, otherwise screen readers will typically read e.g. "1 of 6".
    // The exception is VoiceOver since this isn't included in the message above.
    let didOpenWithoutFocusedItem =
      state.isOpen !== lastOpen.current &&
      (state.selectionManager.focusedKey == null || $c87311424ea30a05$export$e1865c3bedcd822b());
    if (state.isOpen && (didOpenWithoutFocusedItem || optionCount !== lastSize.current)) {
      let announcement = stringFormatter.format('countAnnouncement', {
        optionCount: optionCount,
      });
      $319e236875307eab$export$a9b970dcc4ae71a9(announcement);
    }
    lastSize.current = optionCount;
    lastOpen.current = state.isOpen;
  });
  // Announce when a selection occurs for VoiceOver. Other screen readers typically do this automatically.
  let lastSelectedKey = useRef(state.selectedKey);
  useEffect(() => {
    if (
      $c87311424ea30a05$export$e1865c3bedcd822b() &&
      state.isFocused &&
      state.selectedItem &&
      state.selectedKey !== lastSelectedKey.current
    ) {
      let optionText = state.selectedItem['aria-label'] || state.selectedItem.textValue || '';
      let announcement = stringFormatter.format('selectedAnnouncement', {
        optionText: optionText,
      });
      $319e236875307eab$export$a9b970dcc4ae71a9(announcement);
    }
    lastSelectedKey.current = state.selectedKey;
  });
  useEffect(() => {
    if (state.isOpen)
      return $5e3802645cc19319$export$1c3ebcada18427bf([inputRef.current, popoverRef.current]);
  }, [state.isOpen, inputRef, popoverRef]);
  return {
    labelProps: labelProps,
    buttonProps: {
      ...menuTriggerProps,
      ...triggerLabelProps,
      excludeFromTabOrder: true,
      onPress: onPress,
      onPressStart: onPressStart,
      isDisabled: isDisabled || isReadOnly,
    },
    inputProps: $3ef42575df84b30b$export$9d1611c77c2fe928(inputProps, {
      role: 'combobox',
      'aria-expanded': menuTriggerProps['aria-expanded'],
      'aria-controls': state.isOpen ? menuProps.id : undefined,
      // TODO: readd proper logic for completionMode = complete (aria-autocomplete: both)
      'aria-autocomplete': 'list',
      'aria-activedescendant': focusedItem
        ? $b1f0cad8af73213b$export$9145995848b05025(state, focusedItem.key)
        : undefined,
      onTouchEnd: onTouchEnd,
      // This disable's iOS's autocorrect suggestions, since the combo box provides its own suggestions.
      autoCorrect: 'off',
      // This disable's the macOS Safari spell check auto corrections.
      spellCheck: 'false',
    }),
    listBoxProps: $3ef42575df84b30b$export$9d1611c77c2fe928(menuProps, listBoxProps, {
      autoFocus: state.focusStrategy,
      shouldUseVirtualFocus: true,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
    }),
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */ /*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $58aed456727eb0f3$export$e64b2f635402ca43(props, state, ref) {
  let { keyboardDelegate: keyboardDelegate, isDisabled: isDisabled } = props;
  // By default, a KeyboardDelegate is provided which uses the DOM to query layout information (e.g. for page up/page down).
  // When virtualized, the layout object will be passed in as a prop and override this.
  let collator = $325a3faab7a68acd$export$a16aca283550c30d({
    usage: 'search',
    sensitivity: 'base',
  });
  let delegate = useMemo(
    () =>
      keyboardDelegate ||
      new $2a25aae57d74318e$export$a05409b8bb224a5a(
        state.collection,
        state.disabledKeys,
        null,
        collator
      ),
    [keyboardDelegate, state.collection, state.disabledKeys, collator]
  );
  let { menuTriggerProps: menuTriggerProps, menuProps: menuProps } =
    $168583247155ddda$export$dc9c12ed27dd1b49(
      {
        isDisabled: isDisabled,
        type: 'listbox',
      },
      state,
      ref
    );
  let onKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowLeft': {
        // prevent scrolling containers
        e.preventDefault();
        let key =
          state.selectedKey != null
            ? delegate.getKeyAbove(state.selectedKey)
            : delegate.getFirstKey();
        if (key) state.setSelectedKey(key);
        break;
      }
      case 'ArrowRight': {
        // prevent scrolling containers
        e.preventDefault();
        let key =
          state.selectedKey != null
            ? delegate.getKeyBelow(state.selectedKey)
            : delegate.getFirstKey();
        if (key) state.setSelectedKey(key);
        break;
      }
    }
  };
  let { typeSelectProps: typeSelectProps } = $fb3050f43d946246$export$e32c88dfddc6e1d8({
    keyboardDelegate: delegate,
    selectionManager: state.selectionManager,
    onTypeSelect(key) {
      state.setSelectedKey(key);
    },
  });
  let {
    labelProps: labelProps,
    fieldProps: fieldProps,
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps,
  } = $2baaea4c71418dea$export$294aa081a6c6f55d({
    ...props,
    labelElementType: 'span',
  });
  typeSelectProps.onKeyDown = typeSelectProps.onKeyDownCapture;
  delete typeSelectProps.onKeyDownCapture;
  let domProps = $65484d02dcb7eb3e$export$457c3d6518dd4c6f(props, {
    labelable: true,
  });
  let triggerProps = $3ef42575df84b30b$export$9d1611c77c2fe928(
    typeSelectProps,
    menuTriggerProps,
    fieldProps
  );
  let valueId = $bdb11010cef70236$export$f680877a34711e37();
  return {
    labelProps: {
      ...labelProps,
      onClick: () => {
        if (!props.isDisabled) {
          ref.current.focus();
          // Show the focus ring so the user knows where focus went
          $507fabe10e71c6fb$export$8397ddfc504fdb9a('keyboard');
        }
      },
    },
    triggerProps: $3ef42575df84b30b$export$9d1611c77c2fe928(domProps, {
      ...triggerProps,
      isDisabled: isDisabled,
      onKeyDown: $ff5963eb1fccf552$export$e08e3b67e392101e(
        triggerProps.onKeyDown,
        onKeyDown,
        props.onKeyDown
      ),
      onKeyUp: props.onKeyUp,
      'aria-labelledby': [
        valueId,
        triggerProps['aria-labelledby'],
        triggerProps['aria-label'] && !triggerProps['aria-labelledby'] ? triggerProps.id : null,
      ]
        .filter(Boolean)
        .join(' '),
      onFocus(e) {
        if (state.isFocused) return;
        if (props.onFocus) props.onFocus(e);
        if (props.onFocusChange) props.onFocusChange(true);
        state.setFocused(true);
      },
      onBlur(e) {
        if (state.isOpen) return;
        if (props.onBlur) props.onBlur(e);
        if (props.onFocusChange) props.onFocusChange(false);
        state.setFocused(false);
      },
    }),
    valueProps: {
      id: valueId,
    },
    menuProps: {
      ...menuProps,
      autoFocus: state.focusStrategy || true,
      shouldSelectOnPressUp: true,
      shouldFocusOnHover: true,
      disallowEmptySelection: true,
      onBlur: (e) => {
        if (e.currentTarget.contains(e.relatedTarget)) return;
        if (props.onBlur) props.onBlur(e);
        if (props.onFocusChange) props.onFocusChange(false);
        state.setFocused(false);
      },
      'aria-labelledby': [
        fieldProps['aria-labelledby'],
        triggerProps['aria-label'] && !fieldProps['aria-labelledby'] ? triggerProps.id : null,
      ]
        .filter(Boolean)
        .join(' '),
    },
    descriptionProps: descriptionProps,
    errorMessageProps: errorMessageProps,
  };
}

/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

function $bdd25dc72710631f$export$f809e80f58e251d1(props, state, triggerRef) {
  let { autoComplete: autoComplete, name: name, isDisabled: isDisabled } = props;
  let modality = $507fabe10e71c6fb$export$98e20ec92f614cfe();
  let { visuallyHiddenProps: visuallyHiddenProps } = $5c3e21d68f1c4674$export$a966af930f325cab();
  $99facab73266f662$export$5add1d006293d136(
    props.selectRef,
    state.selectedKey,
    state.setSelectedKey
  );
  var _state_selectedKey;
  // In Safari, the <select> cannot have `display: none` or `hidden` for autofill to work.
  // In Firefox, there must be a <label> to identify the <select> whereas other browsers
  // seem to identify it just by surrounding text.
  // The solution is to use <VisuallyHidden> to hide the elements, which clips the elements to a
  // 1px rectangle. In addition, we hide from screen readers with aria-hidden, and make the <select>
  // non tabbable with tabIndex={-1}.
  //
  // In mobile browsers, there are next/previous buttons above the software keyboard for navigating
  // between fields in a form. These only support native form inputs that are tabbable. In order to
  // support those, an additional hidden input is used to marshall focus to the button. It is tabbable
  // except when the button is focused, so that shift tab works properly to go to the actual previous
  // input in the form. Using the <select> for this also works, but Safari on iOS briefly flashes
  // the native menu on focus, so this isn't ideal. A font-size of 16px or greater is required to
  // prevent Safari from zooming in on the input when it is focused.
  //
  // If the current interaction modality is null, then the user hasn't interacted with the page yet.
  // In this case, we set the tabIndex to -1 on the input element so that automated accessibility
  // checkers don't throw false-positives about focusable elements inside an aria-hidden parent.
  return {
    containerProps: {
      ...visuallyHiddenProps,
      'aria-hidden': true,
      ['data-a11y-ignore']: 'aria-hidden-focus',
    },
    inputProps: {
      type: 'text',
      tabIndex: modality == null || state.isFocused || state.isOpen ? -1 : 0,
      style: {
        fontSize: 16,
      },
      onFocus: () => triggerRef.current.focus(),
      disabled: isDisabled,
    },
    selectProps: {
      tabIndex: -1,
      autoComplete: autoComplete,
      disabled: isDisabled,
      name: name,
      size: state.collection.size,
      value:
        (_state_selectedKey = state.selectedKey) !== null && _state_selectedKey !== void 0
          ? _state_selectedKey
          : '',
      onChange: (e) => state.setSelectedKey(e.target.value),
    },
  };
}
function $bdd25dc72710631f$export$cbd84cdb2e668835(props) {
  let {
    state: state,
    triggerRef: triggerRef,
    label: label,
    name: name,
    isDisabled: isDisabled,
  } = props;
  let selectRef = useRef(null);
  let {
    containerProps: containerProps,
    inputProps: inputProps,
    selectProps: selectProps,
  } = $bdd25dc72710631f$export$f809e80f58e251d1(
    {
      ...props,
      selectRef: selectRef,
    },
    state,
    triggerRef
  );
  var _state_selectedKey;
  // If used in a <form>, use a hidden input so the value can be submitted to a server.
  // If the collection isn't too big, use a hidden <select> element for this so that browser
  // autofill will work. Otherwise, use an <input type="hidden">.
  if (state.collection.size <= 300)
    return /*#__PURE__*/ $73SJx$react.createElement(
      'div',
      {
        ...containerProps,
        'data-testid': 'hidden-select-container',
      },
      /*#__PURE__*/ $73SJx$react.createElement('input', inputProps),
      /*#__PURE__*/ $73SJx$react.createElement(
        'label',
        null,
        label,
        /*#__PURE__*/ $73SJx$react.createElement(
          'select',
          {
            ...selectProps,
            ref: selectRef,
          },
          /*#__PURE__*/ $73SJx$react.createElement('option', null),
          [...state.collection.getKeys()].map((key) => {
            let item = state.collection.getItem(key);
            if (item.type === 'item')
              return /*#__PURE__*/ $73SJx$react.createElement(
                'option',
                {
                  key: item.key,
                  value: item.key,
                },
                item.textValue
              );
          })
        )
      )
    );
  else if (name)
    return /*#__PURE__*/ $73SJx$react.createElement('input', {
      type: 'hidden',
      autoComplete: selectProps.autoComplete,
      name: name,
      disabled: isDisabled,
      value:
        (_state_selectedKey = state.selectedKey) !== null && _state_selectedKey !== void 0
          ? _state_selectedKey
          : '',
    });
  return null;
}

export {
  $bdd25dc72710631f$export$cbd84cdb2e668835 as HiddenSelect,
  $c1d7fb2ec91bae71$export$6d08773d2e66f8f2 as Item,
  $9fc4852771d079eb$export$6e2c8f0811a474ce as Section,
  $701a24aa0da5b062$export$ea18c227d4417cc3 as useButton,
  $c350ade66beef0af$export$8c18d1b4f7232bbf as useComboBox,
  $a9e7382a7d111cb5$export$b453a3bfd4a5fa9e as useComboBoxState,
  $c132121280ec012d$export$50eacbbf140a3141 as useListBox,
  $af383d3bef1cfdc9$export$c3f9f39876e4bc7 as useListBoxSection,
  $293f70390ea03370$export$497855f14858aa34 as useOption,
  $58aed456727eb0f3$export$e64b2f635402ca43 as useSelect,
  $2bc3a590c5373a4e$export$5159ec8b34d4ec12 as useSelectState,
};
