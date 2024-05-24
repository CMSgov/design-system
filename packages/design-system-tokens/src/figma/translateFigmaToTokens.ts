import * as fs from 'fs';
import c from 'chalk';
import { rgbToHex } from '../lib/colorUtils';
import { NumberType, pixelNumberToEx, pixelNumberToRem } from '../lib/unitConversion';
import { ApiGetLocalVariablesResponse, Variable } from './FigmaApi';
import { FlattenedTokens, FlattenedTokensByFile, Token } from '../lib/tokens';
import { select } from '@inquirer/prompts';

export type ResolveNumberTypeFunction = (
  variableName: string,
  variableValue: string
) => Promise<NumberType>;

export function guessNumberType(variableName: string): NumberType | undefined {
  const remVars = ['lead-max-width', 'site-margins', 'site-margins-mobile', 'text-max-width'];
  const pxVars = [
    'grid/gutter-width',
    'grid/form-gutter-width',
    'nav-width',
    'site-max-width',
    'article-max-width',
  ];
  const numberVars = ['grid/columns'];

  if (variableName === 'radius/circle') {
    return 'dimension_%';
  } else if (
    variableName.startsWith('media') ||
    variableName.startsWith('radius') ||
    variableName.startsWith('spacer') ||
    pxVars.includes(variableName)
  ) {
    return 'dimension_px';
  } else if (variableName.startsWith('font') || remVars.includes(variableName)) {
    return 'dimension_rem';
  } else if (variableName.startsWith('measure')) {
    return 'dimension_ex';
  } else if (variableName.startsWith('animation/speed')) {
    return 'duration_ms';
  } else if (numberVars.includes(variableName)) {
    return 'number';
  }
}

export async function promptNumberType(
  variableName: string,
  variableValue: string
): Promise<NumberType> {
  const problem = `Number type for Figma variable "${c.cyan(
    variableName
  )}" is too ambiguous, and no existing token type could be found.`;
  const instruction = `Its Figma value is "${c.cyan(
    variableValue
  )}". What should its token type be?`;
  const message = c.reset(`${c.yellow(problem)}\n${instruction}`);

  return (await select({
    message,
    choices: [
      { value: 'dimension_px', name: 'px (dimension)' },
      { value: 'dimension_ex', name: 'ex (dimension)' },
      { value: 'dimension_rem', name: 'rem (dimension)' },
      { value: 'dimension_%', name: '% (dimension)' },
      { value: 'duration_ms', name: 'ms (duration)' },
      { value: 'number', name: 'number' },
    ],
  })) as NumberType;
}

export async function determineNumberType(
  variableName: string,
  variableValue: string
): Promise<NumberType> {
  let numberType = guessNumberType(variableName);
  if (numberType) {
    // eslint-disable-next-line no-console
    console.log(
      c.green(
        `Number type for Figma variable "${c.cyan(
          variableName
        )}" is too ambiguous, but we made an educated guess: ${c.cyan(numberType)}`
      )
    );
  } else {
    numberType = await promptNumberType(variableName, variableValue);
  }
  return numberType;
}

function tokenTypeFromVariable(variable: Variable): Token['$type'] {
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

async function tokenFromVariable(
  variable: Variable,
  modeId: string,
  localVariables: { [id: string]: Variable },
  existingTokens: FlattenedTokens,
  resolveNumberType: ResolveNumberTypeFunction
): Promise<Token> {
  const existingToken: Token | undefined = existingTokens[variable.name.replace(/\//g, '.')];

  const $description = variable.description;
  const $extensions = {
    ...(existingToken?.$extensions ?? {}),
    'com.figma': {
      hiddenFromPublishing: variable.hiddenFromPublishing,
      scopes: variable.scopes,
      codeSyntax: variable.codeSyntax,
    },
  };

  const valueInfo = tokenValueFromVariable(variable, modeId, localVariables);
  let $value = valueInfo.value;
  let $type = tokenTypeFromVariable(variable);

  if (valueInfo.aliasedVariable) {
    $type = undefined;
  }
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
  else if ($type === 'number') {
    let numberType = existingToken?.$extensions?.['gov.cms.design']?.numberType;
    if (numberType) {
      $type = existingToken.$type;
    } else {
      numberType = await resolveNumberType(variable.name, $value);

      $extensions['gov.cms.design'] = {
        numberType,
      };
    }

    switch (numberType) {
      case 'dimension_px':
        $type = 'dimension';
        $value = `${$value}px`;
        break;
      case 'dimension_ex':
        $type = 'dimension';
        $value = pixelNumberToEx($value as number);
        break;
      case 'dimension_rem':
        $type = 'dimension';
        $value = pixelNumberToRem($value as number);
        break;
      case 'dimension_%':
        $type = 'dimension';
        $value = `${$value}%`;
        break;
      case 'duration_ms':
        $type = 'duration';
        $value = `${$value}ms`;
        break;
      case 'number':
        break;
    }
  }

  return {
    $value,
    ...($type ? { $type } : {}),
    ...($description ? { $description } : {}),
    $extensions,
  };
}

type TokensByFile = { [fileName: string]: any };

export async function tokenFilesFromLocalVariables(
  localVariablesResponse: ApiGetLocalVariablesResponse,
  existingTokens: FlattenedTokensByFile,
  resolveNumberType: ResolveNumberTypeFunction
): Promise<TokensByFile> {
  const tokenFiles: TokensByFile = {};
  const localVariableCollections = localVariablesResponse.meta.variableCollections;
  const localVariables = localVariablesResponse.meta.variables;

  for (const variable of Object.values(localVariables)) {
    // Skip remote variables because we only want to generate tokens for local variables
    if (variable.remote) {
      continue;
    }

    const collection = localVariableCollections[variable.variableCollectionId];
    for (const mode of collection.modes) {
      const fileName = `${collection.name}.${mode.name}.json`;

      if (!tokenFiles[fileName]) {
        tokenFiles[fileName] = {};
      }

      let obj: any = tokenFiles[fileName];

      variable.name.split('/').forEach((groupName) => {
        obj[groupName] = obj[groupName] || {};
        obj = obj[groupName];
      });

      const token = await tokenFromVariable(
        variable,
        mode.modeId,
        localVariables,
        existingTokens[fileName],
        resolveNumberType
      );

      Object.assign(obj, token);
    }
  }

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
