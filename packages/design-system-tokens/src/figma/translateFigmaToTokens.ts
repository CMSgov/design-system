import * as fs from 'fs';
import c from 'chalk';
import { rgbToHex } from '../lib/colorUtils';
import { pixelNumberToEx, pixelNumberToRem } from '../lib/conversions';
import { GetLocalVariablesResponse, LocalVariable as Variable } from '@figma/rest-api-spec';
import { FlattenedTokens, FlattenedTokensByFile, Token } from '../lib/tokens';
import { select } from '@inquirer/prompts';
import { execSync } from 'child_process';
import path from 'path';

const missingAliasesLogPath = path.join(__dirname, 'missing_aliases.txt');

function logMissingAlias(variableName: string, missingId: string) {
  const logEntry = `❌ Missing Alias: ${missingId} for variable ${variableName}\n`;
  fs.appendFileSync(missingAliasesLogPath, logEntry, 'utf8');
}

/**
 * An internal representation of the kind of dimensional unit we're dealing with when
 * we're processing a number-type token (which all gets shoved into the same FLOAT type
 * on the Figma side)
 */
export type NumberType =
  | 'dimension--px'
  | 'dimension--ex'
  | 'dimension--rem'
  | 'dimension--%'
  | 'duration--ms'
  | 'fontWeight'
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
 * An internal representation of the Figma STRING type we're converting
 */
export type StringType = 'fontFamily' | 'textTransform' | 'string';

/**
 * A function that can figure out what kind of number type a specific variable is
 * supposed to be
 */
export type ResolveStringTypeFunction = (
  variableName: string,
  variableValue: string
) => Promise<StringType>;

export type TypeResolvers = {
  number: ResolveNumberTypeFunction;
  string: ResolveStringTypeFunction;
};

/**
 * Uses an existing token's `$type` and `$value` to determine the specific `NumberType`,
 * which represents a specific unit of measurement. Unitless `dimension` types default to
 * pixels. Falls back to `number` if it can't figure it out.
 */
function disambiguateTokenNumberType(token: Token): NumberType {
  const $value = token.$value.toString();
  if (token.$type === 'dimension') {
    if ($value.includes('px')) {
      return 'dimension--px';
    } else if ($value.includes('ex')) {
      return 'dimension--ex';
    } else if ($value.includes('rem')) {
      return 'dimension--rem';
    } else if ($value.includes('%')) {
      return 'dimension--%';
    } else {
      return 'dimension--px';
    }
  } else if (token.$type === 'duration') {
    return 'duration--ms';
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
    return 'dimension--%';
  } else if (
    variableName.startsWith('media') ||
    variableName.startsWith('radius') ||
    variableName.startsWith('spacer') ||
    pxVars.includes(variableName)
  ) {
    return 'dimension--px';
  } else if (variableName.startsWith('font/size') || remVars.includes(variableName)) {
    return 'dimension--rem';
  } else if (variableName.startsWith('measure')) {
    return 'dimension--ex';
  } else if (variableName.startsWith('animation/speed')) {
    return 'duration--ms';
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
      { value: 'dimension--px', name: 'px (dimension)' },
      { value: 'dimension--ex', name: 'ex (dimension)' },
      { value: 'dimension--rem', name: 'rem (dimension)' },
      { value: 'dimension--%', name: '% (dimension)' },
      { value: 'duration--ms', name: 'ms (duration)' },
      { value: 'fontWeight', name: 'font weight' },
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

export async function promptStringType(
  variableName: string,
  variableValue: string
): Promise<StringType> {
  const problem = `String type for Figma variable "${c.cyan(
    variableName
  )}" is too ambiguous, and no existing token type could be found.`;
  const instruction = `Its Figma value is "${c.cyan(
    variableValue
  )}". What should its token type be?`;
  const message = c.reset(`${c.yellow(problem)}\n${instruction}`);

  return (await select({
    message,
    choices: [
      { value: 'fontFamily', name: 'font family' },
      { value: 'textTransform', name: 'text transform' },
      { value: 'string', name: 'string' },
    ],
  })) as StringType;
}

export async function determineStringType(
  variableName: string,
  variableValue: string
): Promise<StringType> {
  let stringType: StringType | undefined = variableName.endsWith('text-transform')
    ? 'textTransform'
    : undefined;
  if (stringType) {
    // eslint-disable-next-line no-console
    console.log(
      c.green(
        `String type for Figma variable "${c.cyan(
          variableName
        )}" is too ambiguous, but we made an educated guess: ${c.cyan(stringType)}`
      )
    );
  } else {
    stringType = await promptStringType(variableName, variableValue);
  }
  return stringType;
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

      if (!aliasedVariable) {
        console.warn(
          `⚠️ WARNING: Alias ID ${value.id} not found in localVariables for ${variable.name}`
        );
        logMissingAlias(variable.name, value.id);
        return { value: `MISSING_ALIAS(${value.id})` };
      }

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
  resolvers: TypeResolvers
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
      numberType = await resolvers.number(variable.name, $value);
    }

    switch (numberType) {
      case 'dimension--px':
        $type = 'dimension';
        $value = `${$value}px`;
        break;
      case 'dimension--ex':
        $type = 'dimension';
        $value = pixelNumberToEx($value as number);
        break;
      case 'dimension--rem':
        $type = 'dimension';
        $value = pixelNumberToRem($value as number);
        break;
      case 'dimension--%':
        $type = 'dimension';
        $value = `${$value}%`;
        break;
      case 'duration--ms':
        $type = 'duration';
        $value = `${$value}ms`;
        break;
      case 'fontWeight':
        $type = 'fontWeight';
        break;
      case 'number':
        break;
    }
  } else if ($type === 'string') {
    // String types are too ambiguous for our tokens, so we need to break this case down
    // further and determine what this value really represents.

    const STRING_TYPES = ['string', 'fontFamily', 'textTransform'] as const;
    if (existingToken?.$type && STRING_TYPES.includes(existingToken.$type as StringType)) {
      $type = existingToken.$type as StringType;
    } else {
      $type = await resolvers.string(variable.name, $value);
    }

    if ($type === 'fontFamily') {
      const fontList = Array.isArray(existingToken?.$value) ? existingToken.$value : [];
      fontList[0] = $value;
      $value = fontList;
    }
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
        scopes: variable.scopes.sort(),
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
  resolvers: TypeResolvers
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
        resolvers
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
    fs.writeFileSync(path.join(tokensDir, fileName), JSON.stringify(fileContent, null, 2));
  });

  // Format the files using prettier and its project config so we can properly preview
  // the actual changes before committing
  execSync(`npx prettier --write '${tokensDir}/*.json'`);
}
