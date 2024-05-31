import * as fs from 'fs';
import c from 'chalk';
import { rgbToHex } from '../lib/colorUtils';
import { pixelNumberToEx, pixelNumberToRem } from '../lib/conversions';
import { GetLocalVariablesResponse, LocalVariable as Variable } from '@figma/rest-api-spec';
import { FlattenedTokens, FlattenedTokensByFile, Token } from '../lib/tokens';
import { select } from '@inquirer/prompts';

/**
 * An internal representation of the kind of dimensional unit we're dealing with when
 * we're processing a number-type token (which all gets shoved into the same FLOAT type
 * on the Figma side)
 */
export type NumberType =
  | 'dimension_px'
  | 'dimension_ex'
  | 'dimension_rem'
  | 'dimension_%'
  | 'duration_ms'
  | 'font_weight'
  | 'number';

/**
 * A function that can figure out what kind of number type a specific variable is
 * supposed to be
 */
export type ResolveNumberTypeFunction = (
  variableName: string,
  variableValue: string
) => Promise<NumberType>;

/**
 * Uses an existing token's `$type` and `$value` to determine the specific `NumberType`,
 * which represents a specific unit of measurement. Unitless `dimension` types default to
 * pixels. Falls back to `number` if it can't figure it out.
 */
function disambiguateTokenNumberType(token: Token): NumberType {
  const $value = token.$value.toString();
  if (token.$type === 'dimension') {
    if ($value.includes('px')) {
      return 'dimension_px';
    } else if ($value.includes('ex')) {
      return 'dimension_ex';
    } else if ($value.includes('rem')) {
      return 'dimension_rem';
    } else if ($value.includes('%')) {
      return 'dimension_%';
    } else {
      return 'dimension_px';
    }
  } else if (token.$type === 'duration') {
    return 'duration_ms';
  } else {
    return 'number';
  }
}

/**
 * Number types from Figma are too ambiguous for our tokens, so we need to determine the
 * specific units. This function makes guesses about the true NumberType based on the
 * variable name.
 */
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
  } else if (variableName.startsWith('font/size') || remVars.includes(variableName)) {
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
      { value: 'font_weight', name: 'font weight' },
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
      return 'fontFamily';
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

  const valueInfo = tokenValueFromVariable(variable, modeId, localVariables);
  let $value = valueInfo.value;
  let $type = tokenTypeFromVariable(variable);

  if (valueInfo.aliasedVariable) {
    // Tokens aliases don't need `$type` properties, because the type info exists in the
    // tokens that they're aliasing.
    $type = undefined;
  } else if ($type === 'number') {
    // Number types are too ambiguous for our tokens, so we need to break this case down
    // further and determine what this value really represents. Someday Figma might have
    // types that more closely align with the W3C draft standard, but the draft standard
    // could just as easily flop and go nowhere. We need this information, though, to
    // understand how to convert into units that we can use in CSS.

    let numberType: NumberType;
    if (existingToken?.$type) {
      $type = existingToken.$type;
      numberType = disambiguateTokenNumberType(existingToken);
    } else {
      numberType = await resolveNumberType(variable.name, $value);
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
      case 'font_weight':
        $type = 'fontWeight';
        break;
      case 'number':
        break;
    }
  } else if ($type === 'fontFamily') {
    const fontList = Array.isArray(existingToken?.$value) ? existingToken.$value : [];
    fontList[0] = $value;
    $value = fontList;
  }

  const $description = variable.description;

  return {
    $value,
    ...($type ? { $type } : {}),
    ...($description ? { $description } : {}),
    $extensions: {
      ...(existingToken?.$extensions ?? {}),
      'com.figma': {
        hiddenFromPublishing: variable.hiddenFromPublishing,
        scopes: variable.scopes,
        codeSyntax: variable.codeSyntax,
      },
    },
  };
}

type TokensByFile = { [fileName: string]: any };

/**
 * Takes Figma's "local variables" retrieved via their REST API and translates them into
 * our JSON token format, merging with existing JSON tokens where necessary.
 */
export async function tokenFilesFromLocalVariables(
  localVariablesResponse: GetLocalVariablesResponse,
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
        existingTokens[fileName] ?? {},
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
