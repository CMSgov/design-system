import { VariableCodeSyntax, VariableScope } from './FigmaApi.js';

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
   * to align with the resolved types for Figma variables.
   */
  $type: 'color' | 'number' | 'string' | 'boolean';
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
