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
  SECTIONS_TO_REMOVE_INPUT,
  REMOVED_SECTIONS_OUTPUT,
  MIXED_HEADING_INPUT,
  MIXED_HEADING_OUTPUT,
  MDX_WITH_ALERT,
  MDX_WITH_UNWRAPPED_ALERT,
  MDX_WITH_BADGE,
  MDX_WITH_UNWRAPPED_BADGE,
  MIXED_JSX_INPUT,
  NORMALIZED_MARKDOWN_OUTPUT,
  THEME_CONTENT_CODEBLOCKS_INPUT,
  THEME_CONTENT_CODEBLOCKS_OUTPUT,
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
  const output = stripMarkdownSections(SECTIONS_TO_REMOVE_INPUT);

  assert.strictEqual(output.trim(), REMOVED_SECTIONS_OUTPUT.trim());
});

test('stripMarkdownSections removes target sections regardless of heading capitalization', () => {
  const output = stripMarkdownSections(MIXED_HEADING_INPUT);

  assert.strictEqual(output.trim(), MIXED_HEADING_OUTPUT.trim());
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

  const output = normalizeMarkdownOutput(MIXED_JSX_INPUT);

  assert.strictEqual(output.trim(), NORMALIZED_MARKDOWN_OUTPUT.trim());
});

test('unwrapSimpleComponents removes Alert tags but preserves their content', () => {
  const output = unwrapSimpleComponents(MDX_WITH_ALERT);

  assert.strictEqual(output.trim(), MDX_WITH_UNWRAPPED_ALERT.trim());
});

test('unwrapSimpleComponents removes Badge tags but preserves their content', () => {
  const output = unwrapSimpleComponents(MDX_WITH_BADGE);

  assert.strictEqual(output.trim(), MDX_WITH_UNWRAPPED_BADGE.trim());
});

test('processMdxForHostedMarkdown preserves fenced code blocks inside ThemeContent while normalizing the theme label', () => {
  const output = processMdxForHostedMarkdown(THEME_CONTENT_CODEBLOCKS_INPUT);

  assert.strictEqual(output.trim(), THEME_CONTENT_CODEBLOCKS_OUTPUT.trim());
});