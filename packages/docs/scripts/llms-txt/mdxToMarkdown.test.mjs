import test from 'node:test';
import assert from 'node:assert';

import {
  removeImportStatements,
  stripMarkdownSections,
  normalizeThemeContent,
  normalizeMarkdownOutput,
  unwrapSimpleComponents
} from './mdxToMarkdown.mjs';

import {
  IMPORT_STATEMENTS_INPUT,
  THEME_CONTENT_SINGLE,
  THEME_CONTENT_SINGLE_OUTPUT,
  THEME_CONTENT_MULTIPLE,
  THEME_CONTENT_MULTIPLE_OUTPUT,
} from './mdxFixtures.mjs'

import { processMdxForHostedMarkdown } from './index.mjs'

test('removeImportStatements removes imports', () => {
  const output = removeImportStatements(IMPORT_STATEMENTS_INPUT);

  assert.ok(!output.includes("import React from 'react';"));
  assert.ok(!output.includes("import Something from './Something';"));
  assert.ok(output.includes('# Heading'));
  assert.ok(output.includes('Some content here.'));
});

test('stripMarkdownSections removes level two headings of Code, Examples, and Component maturity', () => {
  const input = `## Overview

Keep this section.

## Code

Remove this code section.

### React

Remove this too.

## Examples

Remove these examples.

## Component maturity

Remove this maturity section.

## Accessibility

Keep this section too.`;

  const expected = `## Overview

Keep this section.

## Accessibility

Keep this section too.`;

  const output = stripMarkdownSections(input);

  assert.strictEqual(output.trim(), expected.trim());
});

test('stripMarkdownSections removes target sections regardless of heading capitalization', () => {
  const input = `## Overview

Keep this section.

## code

Remove this code section.

## Component Maturity

Remove this maturity section.

## Accessibility

Keep this section too.`;

  const expected = `## Overview

Keep this section.

## Accessibility

Keep this section too.`;

  const output = stripMarkdownSections(input);

  assert.strictEqual(output.trim(), expected.trim());
});


test('normalizeThemeContent: handle single theme', () => {
  const output = normalizeThemeContent(THEME_CONTENT_SINGLE);

  assert.strictEqual(output, THEME_CONTENT_SINGLE_OUTPUT);
});

test('normalizeThemeContent: handle multiple themes', () => {
  const output = normalizeThemeContent(THEME_CONTENT_MULTIPLE);

  assert.strictEqual(output, THEME_CONTENT_MULTIPLE_OUTPUT);
});

test('normalizeMarkdownOutput removes JSX comments, converts br tags, removes JSX space expressions, strips self-closing JSX tags, and normalizes blank lines', () => {
  const input = `Before
{/* this is a JSX comment */}
Line one<br />Line two
Hello{' '}world
<CloseIconThin />
After



Done`;

  const expected = `Before

Line one

Line two
Hello world

After

Done`;

  const output = normalizeMarkdownOutput(input);

  assert.strictEqual(output.trim(), expected.trim());
});

test('unwrapSimpleComponents removes Alert tags but preserves their content', () => {
  const input = `Before
<Alert heading="Warning">
This is important content.
</Alert>
After`;

  const expected = `Before

This is important content.

After`;

  const output = unwrapSimpleComponents(input);

  assert.strictEqual(output.trim(), expected.trim());
});

test('unwrapSimpleComponents removes Badge tags but preserves their content', () => {
  const input = `Before
<Badge variation="success">Ready</Badge>
After`;

  const expected = `Before
Ready
After`;

  const output = unwrapSimpleComponents(input);

  assert.strictEqual(output.trim(), expected.trim());
});

test('processMdxForHostedMarkdown preserves fenced code blocks inside ThemeContent while normalizing the theme label', () => {
  const input = `<ThemeContent onlyThemes={['healthcare']}>

\`\`\`css
@import '@cmsgov/ds-healthcare-gov/css/index';
@import '@cmsgov/ds-healthcare-gov/css/healthcare-theme';
\`\`\`

Or you might import it from your JavaScript like this:

\`\`\`js
import '@cmsgov/ds-healthcare-gov/css/index.css';
import '@cmsgov/ds-healthcare-gov/css/healthcare-theme.css';
\`\`\`

</ThemeContent>`;

  const expected = `**Theme: healthcare only**

\`\`\`css
@import '@cmsgov/ds-healthcare-gov/css/index';
@import '@cmsgov/ds-healthcare-gov/css/healthcare-theme';
\`\`\`

Or you might import it from your JavaScript like this:

\`\`\`js
import '@cmsgov/ds-healthcare-gov/css/index.css';
import '@cmsgov/ds-healthcare-gov/css/healthcare-theme.css';
\`\`\``;

  const output = processMdxForHostedMarkdown(input);

  assert.strictEqual(output.trim(), expected.trim());
});