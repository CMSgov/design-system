let sharedStylesRefsById;
let sharedStylesByName;

/**
 * Recursive function that looks through a layer and its children to find
 * references to shared styles and add them to the map
 */
function findSharedStyleReferences(layer, refsById) {
  const { layers, sharedStyleId } = layer;

  if (sharedStyleId) {
    if (!refsById[sharedStyleId]) {
      refsById[sharedStyleId] = [];
    }

    refsById[sharedStyleId].push(layer);
  }

  if (layers) {
    for (const childLayer of layers) {
      findSharedStyleReferences(childLayer, refsById);
    }
  }
}

function getSharedStyleReferencesById(doc) {
  if (!sharedStylesRefsById) {
    sharedStylesRefsById = {};

    for (const page of doc.pages) {
      findSharedStyleReferences(page, sharedStylesRefsById);
    }
  }

  return sharedStylesRefsById;
}

function getSharedStylesByName(doc) {
  if (!sharedStylesByName) {
    sharedStylesByName = doc.sharedTextStyles.reduce((obj, style) => {
      obj[style.name] = style;
      return obj;
    }, {});
  }

  return sharedStylesByName;
}

/**
 * Updates a shared style by name. Shared styles are named styles that exist in
 * a special place in the Sketch UI, similar to color swatches. Shared styles
 * wrap a `style` object, so they can't be used directly in the document. We
 * have to go find the places where the layers reference the shared style by id
 * and then update their `style` property.
 */
export function updateSharedStyleReferences(doc, name, newStyle) {
  const refsById = getSharedStyleReferencesById(doc);
  const sharedStylesByName = getSharedStylesByName(doc);

  const existingSharedStyle = sharedStylesByName[name];
  if (existingSharedStyle) {
    // Update the existing style with our new style info
    existingSharedStyle.style = newStyle;

    const refs = refsById[existingSharedStyle.id];
    if (refs) {
      for (const layer of refs) {
        layer.sharedStyle = existingSharedStyle;
        layer.style = existingSharedStyle.style;
      }
    }
  } else {
    doc.sharedTextStyles.push({
      name,
      style: newStyle,
    });
  }
}
