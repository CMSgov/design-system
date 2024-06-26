import {
  LocalVariableCollection as VariableCollection,
  LocalVariable as Variable,
  PostVariablesRequestBody,
  VariableValue,
  GetLocalVariablesResponse,
  VariableCreate,
  VariableUpdate,
  VariableCodeSyntax,
} from '@figma/rest-api-spec';
import { RgbaObject, hexToRgba, isHex, rgbToHex } from '../lib/colorUtils';
import {
  FlattenedTokensByFile,
  Token,
  collectionAndModeFromFileName,
  isAlias,
  resolveTokenAlias,
} from '../lib/tokens';
import { dimensionToPixelNumber, durationToNumber } from '../lib/conversions';

function areSetsEqual<T>(a: Set<T>, b: Set<T>) {
  return a.size === b.size && [...a].every((item) => b.has(item));
}

function variableResolvedTypeFromToken(token: Token) {
  switch (token.$type) {
    case 'color':
      return 'COLOR';
    case 'number':
    case 'dimension':
    case 'duration':
    case 'fontWeight':
      return 'FLOAT';
    case 'string':
    case 'fontFamily':
    case 'textTransform':
      return 'STRING';
    case 'boolean':
      return 'BOOLEAN';
    default:
      throw new Error(`Invalid token $type: ${(token as any)?.$type}`);
  }
}

function parseColor(color: string): RgbaObject {
  if (isHex(color)) {
    return hexToRgba(color);
  }

  throw new Error('Unsupported color format!');
}

function variableValueFromToken(
  token: Token,
  localVariablesByCollectionAndName: {
    [variableCollectionId: string]: { [variableName: string]: Variable };
  }
): VariableValue {
  if (typeof token.$value === 'string' && isAlias(token.$value)) {
    // Assume aliases are in the format {group.subgroup.token} with any number of optional groups/subgroups
    // The Figma syntax for variable names is: group/subgroup/token
    const value = token.$value.trim().replace(/\./g, '/').replace(/[{}]/g, '');

    // When mapping aliases to existing local variables, we assume that variable names
    // are unique *across all collections* in the Figma file
    for (const localVariablesByName of Object.values(localVariablesByCollectionAndName)) {
      if (localVariablesByName[value]) {
        return {
          type: 'VARIABLE_ALIAS',
          id: localVariablesByName[value].id,
        };
      }
    }

    // If we don't find a local variable matching the alias, we assume it's a variable
    // that we're going to create elsewhere in the payload.
    // If the file has an invalid alias, we rely on the Figma API to return a 400 error
    return {
      type: 'VARIABLE_ALIAS',
      id: value,
    };
  } else if (typeof token.$value === 'string' && token.$type === 'color') {
    return parseColor(token.$value);
  } else if (token.$type === 'dimension') {
    return dimensionToPixelNumber(token.$value + '');
  } else if (token.$type === 'duration') {
    return durationToNumber(token.$value + '');
  } else if (token.$type === 'fontFamily') {
    return Array.isArray(token.$value) ? token.$value[0] : token.$value;
  } else {
    return token.$value;
  }
}

/**
 * Compares two colors for approximate equality since converting between Figma RGBA objects
 * (from 0 -> 1) and hex colors can result in slight differences.
 */
export function colorApproximatelyEqual(colorA: RgbaObject, colorB: RgbaObject) {
  return rgbToHex(colorA) === rgbToHex(colorB);
}

function compareVariableValues(a: VariableValue, b: VariableValue) {
  if (typeof a === 'object' && typeof b === 'object') {
    if ('type' in a && 'type' in b && a.type === 'VARIABLE_ALIAS' && b.type === 'VARIABLE_ALIAS') {
      return a.id === b.id;
    } else if ('r' in a && 'r' in b) {
      return colorApproximatelyEqual(a, b);
    }
  } else {
    return a === b;
  }

  return false;
}

function isCodeSyntaxEqual(a: VariableCodeSyntax, b: VariableCodeSyntax) {
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every(
      (key) => a[key as keyof VariableCodeSyntax] === b[key as keyof VariableCodeSyntax]
    )
  );
}

/**
 * Get writable token properties that are different from the variable.
 * If the variable does not exist, all writable properties are returned.
 *
 * This function is being used to decide what properties to include in the
 * POST variables call to update variables in Figma. If a token does not have
 * a particular property, we do not include it in the differences object to avoid
 * touching that property in Figma.
 */
function tokenAndVariableDifferences(token: Token, variable: Variable | null) {
  const differences: Partial<
    Omit<
      VariableCreate | VariableUpdate,
      'id' | 'name' | 'variableCollectionId' | 'resolvedType' | 'action'
    >
  > = {};

  if (
    token.$description !== undefined &&
    (!variable || token.$description !== variable.description)
  ) {
    differences.description = token.$description;
  }

  if (token.$extensions && token.$extensions['com.figma']) {
    const figmaExtensions = token.$extensions['com.figma'];

    if (
      figmaExtensions.hiddenFromPublishing !== undefined &&
      (!variable || figmaExtensions.hiddenFromPublishing !== variable.hiddenFromPublishing)
    ) {
      differences.hiddenFromPublishing = figmaExtensions.hiddenFromPublishing;
    }

    if (
      figmaExtensions.scopes &&
      (!variable || !areSetsEqual(new Set(figmaExtensions.scopes), new Set(variable.scopes)))
    ) {
      differences.scopes = figmaExtensions.scopes;
    }

    if (
      figmaExtensions.codeSyntax &&
      (!variable || !isCodeSyntaxEqual(figmaExtensions.codeSyntax, variable.codeSyntax))
    ) {
      differences.codeSyntax = figmaExtensions.codeSyntax;
    }
  }

  return differences;
}

type CollectionsByName = {
  [name: string]: VariableCollection;
};
export function getCollectionsByName(localVariables: GetLocalVariablesResponse): CollectionsByName {
  const localVariableCollectionsByName: CollectionsByName = {};
  Object.values(localVariables.meta.variableCollections).forEach((collection) => {
    // Skip over remote collections because we can't modify them
    if (collection.remote) {
      return;
    }

    if (localVariableCollectionsByName[collection.name]) {
      throw new Error(`Duplicate variable collection in file: ${collection.name}`);
    }

    localVariableCollectionsByName[collection.name] = collection;
  });
  return localVariableCollectionsByName;
}

type VariablesByCollection = {
  [variableCollectionId: string]: { [variableName: string]: Variable };
};
export function getVariablesByCollection(
  localVariables: GetLocalVariablesResponse
): VariablesByCollection {
  const localVariablesByCollectionAndName: VariablesByCollection = {};
  Object.values(localVariables.meta.variables).forEach((variable) => {
    // Skip over remote variables because we can't modify them
    if (variable.remote) {
      return;
    }

    if (!localVariablesByCollectionAndName[variable.variableCollectionId]) {
      localVariablesByCollectionAndName[variable.variableCollectionId] = {};
    }

    localVariablesByCollectionAndName[variable.variableCollectionId][variable.name] = variable;
  });
  return localVariablesByCollectionAndName;
}

export function generatePostVariablesPayload(
  tokensByFile: FlattenedTokensByFile,
  localVariables: GetLocalVariablesResponse
) {
  const localVariableCollectionsByName = getCollectionsByName(localVariables);
  const localVariablesByCollectionAndName = getVariablesByCollection(localVariables);

  const postVariablesPayload: PostVariablesRequestBody = {
    variableCollections: [],
    variableModes: [],
    variables: [],
    variableModeValues: [],
  };

  Object.entries(tokensByFile).forEach(([fileName, tokens]) => {
    const { collectionName, modeName } = collectionAndModeFromFileName(fileName);

    const variableCollection = localVariableCollectionsByName[collectionName];
    // Use the actual variable collection id or use the name as the temporary id
    const variableCollectionId = variableCollection ? variableCollection.id : collectionName;
    const variableMode = variableCollection?.modes.find((mode) => mode.name === modeName);
    // Use the actual mode id or use the name as the temporary id
    const modeId = variableMode ? variableMode.modeId : modeName;

    if (
      !variableCollection &&
      !postVariablesPayload.variableCollections!.find((c) => c.id === variableCollectionId)
    ) {
      postVariablesPayload.variableCollections!.push({
        action: 'CREATE',
        id: variableCollectionId,
        name: variableCollectionId,
        initialModeId: modeId, // Use the initial mode as the first mode
      });

      // Rename the initial mode, since we're using it as our first mode in the collection
      postVariablesPayload.variableModes!.push({
        action: 'UPDATE',
        id: modeId,
        name: modeId,
        variableCollectionId,
      });
    }

    // Add a new mode if it doesn't exist in the Figma file
    // and it's not the initial mode in the collection
    if (
      !variableMode &&
      !postVariablesPayload.variableCollections!.find(
        (c) => c.id === variableCollectionId && 'initialModeId' in c && c.initialModeId === modeId
      )
    ) {
      postVariablesPayload.variableModes!.push({
        action: 'CREATE',
        id: modeId,
        name: modeId,
        variableCollectionId,
      });
    }

    const localVariablesByName = localVariablesByCollectionAndName[variableCollection?.id] || {};

    Object.entries(tokens).forEach(([tokenName, token]) => {
      // In the W3C Tokens spec, nesting is represented by `.`, but Figma uses `/`
      const variableName = tokenName.replace(/\./g, '/');
      const variable = localVariablesByName[variableName];
      const variableId = variable ? variable.id : variableName;
      const variableInPayload = postVariablesPayload.variables!.find(
        (v) =>
          v.id === variableId &&
          'variableCollectionId' in v &&
          v.variableCollectionId === variableCollectionId
      );
      const differences = tokenAndVariableDifferences(token, variable);

      // Add a new variable if it doesn't exist in the Figma file,
      // and we haven't added it already in another mode
      if (!variable && !variableInPayload) {
        postVariablesPayload.variables!.push({
          action: 'CREATE',
          id: variableId,
          name: variableName,
          variableCollectionId,
          resolvedType: variableResolvedTypeFromToken(
            isAlias(token.$value.toString())
              ? resolveTokenAlias(token, tokensByFile, fileName)
              : token
          ),
          ...differences,
        });
      } else if (variable && Object.keys(differences).length > 0) {
        postVariablesPayload.variables!.push({
          action: 'UPDATE',
          id: variableId,
          ...differences,
        });
      }

      const existingVariableValue = variable && variableMode ? variable.valuesByMode[modeId] : null;
      const newVariableValue = variableValueFromToken(token, localVariablesByCollectionAndName);

      // Only include the variable mode value in the payload if it's different from the existing value
      if (
        existingVariableValue === null ||
        !compareVariableValues(existingVariableValue, newVariableValue)
      ) {
        postVariablesPayload.variableModeValues!.push({
          variableId,
          modeId,
          value: newVariableValue,
        });
      }
    });
  });

  return postVariablesPayload;
}
