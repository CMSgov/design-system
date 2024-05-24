import * as fs from 'fs';
import * as path from 'path';

import { VariableCodeSyntax, VariableScope } from '../figma/FigmaApi.js';
import { NumberType } from './unitConversion.js';

/**
 * This file defines what design tokens and design token files look like in the codebase.
 *
 * Tokens are distinct from variables, in that a [token](https://tr.designtokens.org/format/#design-token)
 * is a name/value pair (with other properties), while a variable in Figma stores multiple values,
 * one for each mode.
 */

export interface Token {
  /**
   * The [type](https://tr.designtokens.org/format/#type-0) of the token.
   *
   * We allow `string` and `boolean` types in addition to the draft W3C spec's `color` and `number` types
   * to align with the resolved types for Figma variables. Note that it doesn't need a $type if it's an
   * alias, because the type will come from the aliased variable.
   */
  $type?: 'color' | 'number' | 'string' | 'boolean' | 'dimension' | 'duration';
  $value: string | number | boolean;
  $description?: string;
  $extensions?: {
    /**
     * The `com.figma` namespace stores Figma-specific variable properties
     */
    'com.figma'?: {
      hiddenFromPublishing?: boolean;
      scopes?: VariableScope[];
      codeSyntax?: VariableCodeSyntax;
    };
  };
}

export type TokenOrTokenGroup =
  | Token
  | ({
      [tokenName: string]: Token;
    } & { $type?: never; $value?: never });

/**
 * Defines what we expect a Design Tokens file to look like in the codebase.
 *
 * This format mostly adheres to the [draft W3C spec for Design Tokens](https://tr.designtokens.org/format/)
 * as of its most recent 24 July 2023 revision except for the $type property, for which
 * we allow `string` and `boolean` values in addition to the spec's `color` and `number` values.
 * We need to support `string` and `boolean` types to align with the resolved types for Figma variables.
 *
 * Additionally, we expect each tokens file to define tokens for a single variable collection and mode.
 * There currently isn't a way to represent modes or themes in the W3C community group design token specification.
 * Once the spec resolves how it wants to treat/handle modes, this code will be updated to reflect the new standard.
 *
 * Follow this discussion for updates: https://github.com/design-tokens/community-group/issues/210
 */
export type TokensFile = {
  [key: string]: TokenOrTokenGroup;
};

export type FlattenedTokens = {
  [tokenName: string]: Token;
};

export type FlattenedTokensByFile = {
  [fileName: string]: FlattenedTokens;
};

function flattenTokensFile(tokensFile: TokensFile) {
  const flattenedTokens: { [tokenName: string]: Token } = {};

  Object.entries(tokensFile).forEach(([tokenGroup, groupValues]) => {
    traverseCollection({ key: tokenGroup, object: groupValues, tokens: flattenedTokens });
  });

  return flattenedTokens;
}

function isToken(obj: TokenOrTokenGroup): obj is Token {
  return obj.$value !== undefined;
}

function traverseCollection({
  key,
  object,
  tokens,
}: {
  key: string;
  object: TokenOrTokenGroup;
  tokens: { [tokenName: string]: Token };
}) {
  // if key is a meta field, move on
  if (key.charAt(0) === '$') {
    return;
  }

  if (isToken(object)) {
    tokens[key] = object;
  } else {
    Object.entries<TokenOrTokenGroup>(object).forEach(([key2, object2]) => {
      if (key2.charAt(0) !== '$' && typeof object2 === 'object') {
        traverseCollection({
          key: `${key}.${key2}`,
          object: object2,
          tokens,
        });
      }
    });
  }
}

function isValidTokenFileName(fileName: string) {
  const fileNameParts = fileName.split('.');
  if (fileNameParts.length < 3 || fileNameParts[2]?.toLowerCase() !== 'json') {
    return false;
  }
  return true;
}

export function collectionAndModeFromFileName(fileName: string) {
  if (!isValidTokenFileName(fileName)) {
    throw new Error(
      `Invalid tokens file name: ${fileName}. File names must be in the format: {collectionName}.{modeName}.json`
    );
  }
  const [collectionName, modeName] = fileName.split('.');
  return { collectionName, modeName };
}

/**
 * Reads all the tokens in a given tokens directory into an object keyed by the filename.
 * Each file object contains a flattened dictionary of all tokens in that file, keyed by
 * a flattened string representing the key of that token within the hierarchy of its
 * parent token groups. See the doc comment for the `TokensFile` type for more details.
 */
export function readTokenFiles(tokensDir: string): FlattenedTokensByFile {
  const files = fs
    .readdirSync(tokensDir)
    .filter(isValidTokenFileName)
    .map((fileName: string) => `${tokensDir}/${fileName}`);

  const tokensJsonByFile: FlattenedTokensByFile = {};

  const seenCollectionsAndModes = new Set<string>();

  files.forEach((file) => {
    const baseFileName = path.basename(file);
    const { collectionName, modeName } = collectionAndModeFromFileName(baseFileName);

    if (seenCollectionsAndModes.has(`${collectionName}.${modeName}`)) {
      throw new Error(`Duplicate collection and mode in file: ${file}`);
    }

    seenCollectionsAndModes.add(`${collectionName}.${modeName}`);

    const fileContent = fs.readFileSync(file, { encoding: 'utf-8' });

    if (!fileContent) {
      throw new Error(`Invalid tokens file: ${file}. File is empty.`);
    }
    const tokensFile: TokensFile = JSON.parse(fileContent);

    tokensJsonByFile[baseFileName] = flattenTokensFile(tokensFile);
  });

  return tokensJsonByFile;
}
