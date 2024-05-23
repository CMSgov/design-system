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
): { value: any; aliasedVariable?: Variable } {
  const value = variable.valuesByMode[modeId];
  if (typeof value === 'object') {
    if ('type' in value && value.type === 'VARIABLE_ALIAS') {
      const aliasedVariable = localVariables[value.id];
      return { value: `{${aliasedVariable.name.replace(/\//g, '.')}}`, aliasedVariable };
    } else if ('r' in value) {
      return { value: rgbToHex(value) };
    }

    throw new Error(`Format of variable value is invalid: ${value}`);
  } else {
    return { value };
  }
}

function tokenFromVariable(
  variable: Variable,
  modeId: string,
  localVariables: { [id: string]: Variable }
) {
  const valueInfo = tokenValueFromVariable(variable, modeId, localVariables);
  let $value = valueInfo.value;
  let $type = tokenTypeFromVariable(variable);

  // Number types are too ambiguous for our tokens, so we need to break this case down
  // further and use some context clues to determine what this value really represents.
  // Someday Figma might have types that more closely align with the W3C draft standard,
  // but the draft standard could just as easily flop and go nowhere.
  //
  // Once we do our first down-sync from Figma, we could possibly start storing this
  // translation information as meta-data inside the JSON tokens. It wouldn't get
  // uploaded to Figma, but it could be manually maintained in our repository. Being able
  // to store information that doesn't go to Figma, however, would require that we merge
  // incoming data with our local JSON files instead of the current overwriting method.
  //
  // Actually, if we're not storing that info in Figma, it's already in our tokens...why
  // would I have to tell a dimension token that it's a dimension? If we don't need to be
  // able to save the JSON based on only the information stored in Figma, then this isn't
  // a problem at all. Maybe after the first down-sync we just need to update the down-
  // sync operation to be a merge, and we look at the local (repository) token's `$type`
  // and `$value` properties before converting from our Figma `NUMBER` variable. That is,
  // if `$type` is `dimension` then look at the unit of `$value` to determine how to
  // translate from Figma.
  if ($type === 'number') {
    const remVars = ['lead-max-width', 'site-margins', 'site-margins-mobile', 'text-max-width'];
    const pxVars = [
      'grid/gutter-width',
      'grid/form-gutter-width',
      'nav-width',
      'site-max-width',
      'article-max-width',
    ];
    const name = valueInfo.aliasedVariable?.name ?? variable.name;
    let valueWithUnit;

    if (name === 'radius/circle') {
      // The number is a percentage
      $type = 'dimension';
      valueWithUnit = `${$value}%`;
    } else if (
      name.startsWith('media') ||
      name.startsWith('radius') ||
      name.startsWith('spacer') ||
      pxVars.includes(name)
    ) {
      // The number is a pixel value
      $type = 'dimension';
      valueWithUnit = `${$value}px`;
    } else if (name.startsWith('font') || remVars.includes(name)) {
      // The number is a pixel value in Figma but `rem` in CSS
      $type = 'dimension';
      valueWithUnit = pixelNumberToRem($value as number);
    } else if (name.startsWith('measure')) {
      // The number is a pixel value in Figma but `ex` in CSS
      $type = 'dimension';
      valueWithUnit = pixelNumberToEx($value as number);
    } else if (name.startsWith('animation/speed')) {
      // The number is a duration in milliseconds
      $type = 'duration';
      valueWithUnit = `${$value}ms`;
    }

    // We don't want to include the unit if this is an alias, otherwise we'd get values
    // like `"{radius.small}px", which is invalid.
    if (!valueInfo.aliasedVariable && valueWithUnit !== undefined) {
      $value = valueWithUnit;
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
