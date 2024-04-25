import { IProps, CustomElement, ErrorTypes } from './model';

/* -----------------------------------
 *
 * parseJson
 *
 * -------------------------------- */

function parseJson(this: CustomElement, value: string) {
  const { tagName } = this;
  const { formatProps } = this.__options;

  let result = {};

  try {
    result = JSON.parse(value);
  } catch {
    console.error(ErrorTypes.Json, `: <${tagName.toLowerCase()}>`);
  }

  if (formatProps) {
    result = formatProps(result);
  }

  return result;
}

/* -----------------------------------
 *
 * getAttributeObject
 *
 * -------------------------------- */

function getAttributeObject(attributes: NamedNodeMap): IProps {
  const result = {};

  if (!attributes?.length) {
    return result;
  }

  for (let i = attributes.length - 1; i >= 0; i--) {
    const item = attributes[i];

    result[item.name] = item.value;
  }

  return result;
}

/* -----------------------------------
 *
 * getAttributeProps
 *
 * -------------------------------- */

function getAttributeProps(attributes: NamedNodeMap, allowed?: string[]): IProps {
  const values = getAttributeObject(attributes);

  let result = {};

  for (const key of Object.keys(values)) {
    if (allowed?.indexOf(key) === -1) {
      continue;
    }

    result[getPropKey(key)] = values[key];
  }

  return result;
}

/* -----------------------------------
 *
 * Attribute
 *
 * -------------------------------- */

function getPropKey(value: string) {
  const sanitised = value.trim().replace(/[\s_]/g, '-');

  return (
    sanitised.charAt(0).toLowerCase() +
    sanitised.slice(1).replace(/-([a-z])/g, ({ 1: value }) => value.toUpperCase())
  );
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { parseJson, getPropKey, getAttributeObject, getAttributeProps };
