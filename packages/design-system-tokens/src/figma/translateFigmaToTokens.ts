import * as fs from 'fs';
import { rgbToHex } from '../lib/colorUtils';
import { pixelNumberToEx, pixelNumberToRem } from '../lib/dimensionUtils';
import { ApiGetLocalVariablesResponse, Variable } from './FigmaApi';

function tokenTypeFromVariable(variable: Variable) {
  switch (variable.resolvedType) {
    case 'BOOLEAN':
      return 'boolean';
    case 'COLOR':
      return 'color';
    case 'FLOAT':
      return 'number';
    case 'STRING':
      return 'string';
  }
}

function tokenValueFromVariable(
  variable: Variable,
  modeId: string,
  localVariables: { [id: string]: Variable }
) {
  const value = variable.valuesByMode[modeId];
  if (typeof value === 'object') {
    if ('type' in value && value.type === 'VARIABLE_ALIAS') {
      const aliasedVariable = localVariables[value.id];
      return `{${aliasedVariable.name.replace(/\//g, '.')}}`;
    } else if ('r' in value) {
      return rgbToHex(value);
    }

    throw new Error(`Format of variable value is invalid: ${value}`);
  } else {
    return value;
  }
}

function tokenFromVariable(
  variable: Variable,
  modeId: string,
  localVariables: { [id: string]: Variable }
) {
  let $type = tokenTypeFromVariable(variable);
  let $value = tokenValueFromVariable(variable, modeId, localVariables);

  // Number types are too ambiguous for our tokens, so we need to break this case down
  // further and use some context clues to determine what this value really represents.
  // Someday Figma might have types that more closely align with the W3C draft standard,
  // but the draft standard could just as easily flop and go nowhere.
  if ($type === 'number') {
    const remVars = ['lead-max-width', 'site-margins', 'site-margins-mobile', 'text-max-width'];
    const pxVars = ['grid/gutter-width', 'grid/form-gutter-width', 'nav-width', 'site-max-width'];
    if (
      variable.name.startsWith('spacer') ||
      variable.name.startsWith('media') ||
      pxVars.includes(variable.name)
    ) {
      // The number is a pixel value
      $type = 'dimension';
      $value = `${$value}px`;
    } else if (variable.name.startsWith('font') || remVars.includes(variable.name)) {
      // The number is a pixel value in Figma but `rem` in CSS
      $type = 'dimension';
      $value = pixelNumberToRem($value as number);
    } else if (variable.name.startsWith('measure')) {
      // The number is a pixel value in Figma but `ex` in CSS
      $type = 'dimension';
      $value = pixelNumberToEx($value as number);
    }
  }

  return {
    $type,
    $value,
    $description: variable.description,
    $extensions: {
      'com.figma': {
        hiddenFromPublishing: variable.hiddenFromPublishing,
        scopes: variable.scopes,
        codeSyntax: variable.codeSyntax,
      },
    },
  };
}

type TokensByFile = { [fileName: string]: any };

export function tokenFilesFromLocalVariables(
  localVariablesResponse: ApiGetLocalVariablesResponse
): TokensByFile {
  const tokenFiles: TokensByFile = {};
  const localVariableCollections = localVariablesResponse.meta.variableCollections;
  const localVariables = localVariablesResponse.meta.variables;

  Object.values(localVariables).forEach((variable) => {
    // Skip remote variables because we only want to generate tokens for local variables
    if (variable.remote) {
      return;
    }

    const collection = localVariableCollections[variable.variableCollectionId];

    collection.modes.forEach((mode) => {
      const fileName = `${collection.name}.${mode.name}.json`;

      if (!tokenFiles[fileName]) {
        tokenFiles[fileName] = {};
      }

      let obj: any = tokenFiles[fileName];

      variable.name.split('/').forEach((groupName) => {
        obj[groupName] = obj[groupName] || {};
        obj = obj[groupName];
      });

      const token: any = tokenFromVariable(variable, mode.modeId, localVariables);

      Object.assign(obj, token);
    });
  });

  return tokenFiles;
}

export function writeTokenFiles(tokensDir: string, tokensByFile: TokensByFile) {
  if (!fs.existsSync(tokensDir)) {
    fs.mkdirSync(tokensDir);
  }

  Object.entries(tokensByFile).forEach(([fileName, fileContent]) => {
    fs.writeFileSync(`${tokensDir}/${fileName}`, JSON.stringify(fileContent, null, 2));
  });
}
