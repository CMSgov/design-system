import { VariableCodeSyntax, VariableScope } from '@figma/rest-api-spec';

/**
 * Using this draft Design Token JSON format standard: https://tr.designtokens.org/
 */
export interface Token {
  /**
   * In addition to the standard, we're also supporting an additional `boolean` type
   * because Figma has a boolean type.
   */
  $type?:
    | 'color'
    | 'number'
    | 'string'
    | 'boolean'
    | 'dimension'
    | 'duration'
    | 'fontWeight'
    | 'fontFamily'
    | 'textTransform';
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

/**
 * Tokens are nested into groups, but this flattens all of them into a JSON file's root
 * object, producing a key that contains each group and property in dot notation (e.g.,
 * `color.crimson.500`). This makes each token easier to reference and transform.
 */
export function flattenTokens(tokensFile: TokensFile) {
  const flattenedTokens: { [tokenName: string]: Token } = {};

  Object.entries(tokensFile).forEach(([tokenGroup, groupValues]) => {
    flattenTokenGroup({ key: tokenGroup, object: groupValues, tokens: flattenedTokens });
  });

  return flattenedTokens;
}

/**
 * Decides whether an object is an actual token or just a group
 */
function isToken(obj: TokenOrTokenGroup): obj is Token {
  return obj.$value !== undefined;
}

/**
 * Helper function that flattens token groups in an object recursively
 */
function flattenTokenGroup({
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
        flattenTokenGroup({
          key: `${key}.${key2}`,
          object: object2,
          tokens,
        });
      }
    });
  }
}

export function isValidTokenFileName(fileName: string) {
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

const ALIAS_REGEX = /{(.*)}/;

/**
 * Whether or not this token value is an alias of another token (like `{radius.small}`)
 */
export function isAlias(value: string): boolean {
  return !!value.match(ALIAS_REGEX);
}

/**
 * Returns the dot-notation key in an alias string. For an input of `{radius.small}`,
 * this function would return `radius.small`.
 */
export function getAliasKey(aliasString: string) {
  const matches = aliasString.match(ALIAS_REGEX);
  if (!matches) {
    throw new Error(`"${aliasString}" is not a valid token alias.`);
  }
  return matches[1];
}

/**
 * Resolves a token alias all the way to a token that no longer references another token.
 * Many aliases will start in a theme-tokens file and end up in the system-tokens file by
 * resolving multiple aliases. It will not resolve circular dependencies and will instead
 * quit when it reaches a max depth of 10.
 */
export function resolveTokenAlias(
  aliasToken: Token,
  tokensByFile: FlattenedTokensByFile,
  currentFilename: string
): Token {
  const MAX_DEPTH = 10;
  let depth = 0;

  let token = aliasToken;
  do {
    const $value = token.$value.toString();
    if (!isAlias($value)) {
      break;
    }
    const tokenKey = getAliasKey($value);
    token =
      tokensByFile[currentFilename][tokenKey] ?? tokensByFile['System.Value.json']?.[tokenKey];
    depth++;
  } while (token && depth <= MAX_DEPTH);

  if (depth > MAX_DEPTH) {
    throw new Error(
      `Could not resolve token alias "${aliasToken.$value}" after following a max depth of ${MAX_DEPTH} aliases.`
    );
  }

  if (!token) {
    throw new Error(`Token alias "${aliasToken.$value}" could not be resolved.`);
  }

  return token;
}
