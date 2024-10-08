import { FlattenedTokens, FlattenedTokensByFile, Token, getAliasKey, isAlias } from '../lib/tokens';
import { OutputFiles } from './writeFiles';

/**
 * Some Sass variables are required to accomplish Sassy things like loops,
 * mixins and media queries. These variables cannot currently be mapped to
 * CSS custom properties without causing Sass or syntax errors.
 *
 * This list includes the variable names to be created for Sass implementation.
 * This list doesn't exclude these variables from being exported as CSS
 * custom properties.
 *
 * These values will have a direct sass variable -> value definition.
 */
const layoutTokenNames: string[] = [
  'grid.columns',
  'media.width-xs',
  'media.width-sm',
  'media.width-md',
  'media.width-lg',
  'media.width-xl',
  'spacer.1',
  'spacer.2',
  'spacer.3',
  'spacer.4',
  'spacer.5',
  'spacer.6',
  'spacer.7',
  'spacer.none',
  'spacer.half',
];

/**
 * Whether or not a given system token is included in the exported theme file. We don't
 * actually want to include every system token as a CSS variable, but some of them we do.
 */
function isIncludedSystemToken(tokenName: string): boolean {
  return !tokenName.startsWith('color') && !tokenName.startsWith('font');
}

/**
 * Resolves the value of the token to one we actually want to print in our output file.
 *
 * By supplying a `renderVariableAlias` function, we're telling the resolver how to
 * render references to other tokens within the theme and that we want to reference them
 * by name (for example, `--alert__background-color: var(--color-primary-lightest)`). We
 * will only reference a system token by name if it's one of the system tokens that is
 * being included in the exported theme files.
 */
export function tokenToCssValue(
  token: Token,
  config: {
    themeTokens: FlattenedTokens;
    systemTokens: FlattenedTokens;
    renderVariableAlias?: (name: string) => string;
  }
): string {
  if (typeof token.$value === 'string' && isAlias(token.$value)) {
    // Assume aliases are in the format {group.subgroup.token} with any number of optional groups/subgroups
    const aliasedTokenName = getAliasKey(token.$value);
    const { themeTokens, systemTokens, renderVariableAlias } = config;

    // Token aliases are assumed to be unique
    const aliasedToken = themeTokens[aliasedTokenName] ?? systemTokens[aliasedTokenName];
    if (!aliasedToken) {
      throw new Error(`No token found for alias {${aliasedTokenName}}`);
    }

    if (
      renderVariableAlias &&
      (aliasedTokenName in themeTokens || isIncludedSystemToken(aliasedTokenName))
    ) {
      return renderVariableAlias(aliasedTokenName);
    }

    return tokenToCssValue(aliasedToken, config);
  } else if (token.$type === 'number' || token.$type === 'fontWeight') {
    return token.$value + '';
  } else if (token.$type === 'string') {
    return `'${token.$value}'`;
  } else if (token.$type === 'textTransform') {
    return token.$value + '';
  } else if (token.$type === 'fontFamily') {
    const fontList = Array.isArray(token.$value) ? token.$value : [token.$value];
    return fontList.map((fontFamily) => `'${fontFamily}'`).join(', ');
  } else if (token.$type === 'boolean') {
    if (!token.$value) {
      throw new Error('False boolean tokens should not be rendered to CSS');
    }
    return '1';
  } else if (typeof token.$value === 'string') {
    if (token.$value.match(/#[a-z0-9]{6}00/i)) {
      return 'transparent';
    }
    // TODO: Actually try to convert the value into an appropriate string base on the $type
    return token.$value;
  } else {
    console.error(token);
    throw new Error('Missing support for this token type. Implement it!');
  }
}

/**
 * The JSON-based token names are different from CSS variable names, so we need to
 * translate from one to the other.
 */
export function tokenNameToVarName(tokenName: string) {
  const parts = tokenName.split('.');
  if (parts.includes('component')) {
    const property = parts.pop();
    const groups = parts.filter((part) => part !== 'component');
    return `${groups.join('-')}__${property}`;
  } else {
    const groupNamesToTrim = ['theme'];
    return parts.filter((part) => !groupNamesToTrim.includes(part)).join('-');
  }
}

/**
 * Generates all the CSS property definitions for a specific theme based on that theme's
 * tokens and the system tokens. This can later be dropped into a CSS file and saved.
 */
export function tokensToCssProperties(
  themeTokens: FlattenedTokens,
  systemTokens: FlattenedTokens
): string {
  // When we're resolving token values, we need some additional information that doesn't
  // change from token to token.
  const valueRenderConfig = {
    themeTokens,
    systemTokens,
    renderVariableAlias: (name: string) => `var(--${tokenNameToVarName(name)})`,
  };

  // We actually do include some of the system tokens but only a subset
  const tokenEntries = [
    ...Object.entries(systemTokens).filter(([name]) => isIncludedSystemToken(name)),
    ...Object.entries(themeTokens),
  ];

  const vars = tokenEntries
    .filter(([_key, token]) => !(token.$type === 'boolean' && !token.$value))
    .map(([key, token]) => {
      const varName = tokenNameToVarName(key);
      const varValue = tokenToCssValue(token, valueRenderConfig);
      return `--${varName}: ${varValue};`;
    });

  return vars.join('\n');
}

/**
 * Unlike CSS Custom Properties, Sass variables can't be used before they're defined. In
 * order to avoid compilation errors in Sass, we need to enforce an order of declaration
 * and then use, which may not be the natural order we get from the tokens.
 */
export function enforceSassVariableOrder(originalDeclarations: string[]): string[] {
  // Matches the variable being declared (first group) and any variables being referenced (second group)
  const declarationRegex = /(\$[\w\-_]+):\s*(\$[\w\-_]+)?.*;/;
  const getVarNames = (line: string) => line.match(declarationRegex)?.slice(1) || [];

  const declaredVars = new Set<string>();
  const declarations = originalDeclarations.slice();

  let i = 0;
  while (i < declarations.length) {
    const line = declarations[i];
    const [declaredVar, referencedVar] = getVarNames(line);

    // If this line doesn't declare anything, move on
    if (!declaredVar) {
      i++;
      continue;
    }

    // See if we the variable being referenced hasn't been declared yet
    if (referencedVar && !declaredVars.has(referencedVar)) {
      // Extract this declaration and move it to be after it gets defined. Note
      // that we don't want to increment the index, because we've extracted the
      // current line from the array, so the next line that we want to look at
      // will be at the same index.

      // Delete it from the current position
      declarations.splice(i, 1);

      // Look for a place to insert it
      let declarationPosition;
      for (let j = i; j < declarations.length; j++) {
        const [laterDeclaration] = getVarNames(declarations[j]);
        if (laterDeclaration === referencedVar) {
          declarationPosition = j;
          break;
        }
      }

      // Insert it if we can
      if (declarationPosition) {
        declarations.splice(declarationPosition + 1, 0, line);
      } else {
        throw new Error(`Declaration for ${referencedVar} not found`);
      }
    } else {
      // This declaration is solid, so leave it in place and move on
      declaredVars.add(declaredVar);
      i++;
    }
  }

  return declarations;
}

/**
 * Generates all the Sass variable definitions for a specific theme based on that theme's
 * tokens and the system tokens. This can later be dropped into a SCSS file and saved.
 */
export function tokensToSassVars(
  themeTokens: FlattenedTokens,
  systemTokens: FlattenedTokens,
  useDefaultFlag: boolean
): string {
  // When we're resolving token values, we need some additional information that doesn't
  // change from token to token.
  const valueRenderConfig = {
    themeTokens,
    systemTokens,
    renderVariableAlias: (name: string) => `$${tokenNameToVarName(name)}`,
  };

  // We actually do include some of the system tokens but only a subset
  const tokenEntries = [
    ...Object.entries(systemTokens).filter(([name]) => isIncludedSystemToken(name)),
    ...Object.entries(themeTokens),
  ];

  const defaultFlag = useDefaultFlag ? ' !default' : '';

  const vars = tokenEntries
    .filter(([_key, token]) => !(token.$type === 'boolean' && !token.$value))
    .map(([key, token]) => {
      const varName = tokenNameToVarName(key);
      const varValue = tokenToCssValue(token, valueRenderConfig);
      return `$${varName}: ${varValue}${defaultFlag};`;
    });

  return enforceSassVariableOrder(vars).join('\n');
}

/**
 * Generates all the CSS files from the pre-processed token files and returns them as
 * strings keyed by the intended file name. These can later be written into real files as
 * needed by the calling script.
 */
export function tokenFilesToCssFiles(tokensByFile: FlattenedTokensByFile): OutputFiles {
  const systemTokens = tokensByFile['System.Value.json'];
  if (!systemTokens) {
    throw new Error('Could not find entry for system tokens');
  }

  return Object.keys(tokensByFile)
    .filter((fileName) => fileName.startsWith('Theme.'))
    .reduce((obj, fileName) => {
      const themeName = fileName.split('.')[1];
      const themeTokens = tokensByFile[fileName];
      const cssVars = tokensToCssProperties(themeTokens, systemTokens);
      const cssFileContents = `:root, ::before, ::after, ::backdrop {\n${cssVars}\n}`;
      const cssFileName = `${themeName}-theme.css`;
      obj[cssFileName] = cssFileContents;
      return obj;
    }, {} as Record<string, string>);
}

/**
 * Same as `tokenFilesToCssFiles` but for Sass files
 */
export function tokenFilesToScssFiles(tokensByFile: FlattenedTokensByFile): OutputFiles {
  const systemTokens = tokensByFile['System.Value.json'];
  if (!systemTokens) {
    throw new Error('Could not find entry for system tokens');
  }

  return Object.keys(tokensByFile)
    .filter((fileName) => fileName.startsWith('Theme.'))
    .reduce((obj, fileName) => {
      const themeName = fileName.split('.')[1];
      const themeTokens = tokensByFile[fileName];
      const scssVars = tokensToSassVars(themeTokens, systemTokens, themeName === 'core');
      const scssFileName = `${themeName}-theme.scss`;
      obj[scssFileName] = scssVars;

      // TODO: We're duplicating these files for backwards compatibility so teams currently
      // using the Sass variables don't have to change anything, but at some point we'll
      // want to force a change. This may coincide with the removal of Sass entirely.
      const deprecatedVars = `// Use of this file is deprecated. Please use "${scssFileName}" instead.\n${scssVars}`;
      obj[`${themeName}-tokens.scss`] = deprecatedVars;
      obj[`${themeName}-component-tokens.scss`] = deprecatedVars;

      return obj;
    }, {} as Record<string, string>);
}

/**
 * Only outputs a layout Sass file. See doc comments for `layoutTokenNames`.
 */
export function tokenFilesToScssLayoutFiles(tokensByFile: FlattenedTokensByFile): OutputFiles {
  const systemTokens = tokensByFile['System.Value.json'];
  const filteredTokens = Object.fromEntries(
    Object.entries(systemTokens).filter(([name]) => layoutTokenNames.includes(name))
  );
  return {
    'layout.scss': tokensToSassVars({}, filteredTokens, false),
    'layout-default.scss': tokensToSassVars({}, filteredTokens, true),
  };
}
