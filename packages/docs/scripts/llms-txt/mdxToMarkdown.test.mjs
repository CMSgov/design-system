import test from 'node:test';
import assert from 'node:assert';

import {
  removeImportStatements,
  stripMarkdownSections,
  normalizeThemeContent,
  normalizeMarkdownOutput,
  unwrapSimpleComponents,
  fixMojibake
} from './mdxToMarkdown.mjs';

import {
  REMOVE_IMPORT_STATEMENTS_INPUT,

  NORMALIZE_THEME_CONTENT_SINGLE_THEME_INPUT,
  NORMALIZE_THEME_CONTENT_SINGLE_THEME_OUTPUT,
  NORMALIZE_THEME_CONTENT_MULTIPLE_THEMES_INPUT,
  NORMALIZE_THEME_CONTENT_MULTIPLE_THEMES_OUTPUT,

  STRIP_MARKDOWN_SECTIONS_REMOVABLE_SECTIONS_INPUT,
  STRIP_MARKDOWN_SECTIONS_REMOVABLE_SECTIONS_OUTPUT,
  STRIP_MARKDOWN_SECTIONS_MIXED_HEADING_INPUT,
  STRIP_MARKDOWN_SECTIONS_MIXED_HEADING_OUTPUT,

  UNWRAP_SIMPLE_COMPONENTS_ALERT_INPUT,
  UNWRAP_SIMPLE_COMPONENTS_ALERT_OUTPUT,
  UNWRAP_SIMPLE_COMPONENTS_BADGE_INPUT,
  UNWRAP_SIMPLE_COMPONENTS_BADGE_OUTPUT,

  NORMALIZE_MARKDOWN_OUTPUT_MIXED_JSX_INPUT,
  NORMALIZE_MARKDOWN_OUTPUT_MIXED_JSX_OUTPUT,

  PROCESS_MDX_FOR_HOSTED_MARKDOWN_THEME_CONTENT_CODEBLOCKS_INPUT,
  PROCESS_MDX_FOR_HOSTED_MARKDOWN_THEME_CONTENT_CODEBLOCKS_OUTPUT,
  PROCESS_MDX_FOR_HOSTED_MARKDOWN_JS_CODEBLOCK,
  PROCESS_MDX_FOR_HOSTED_MARKDOWN_CSS_CODEBLOCK,
  PROCESS_MDX_FOR_HOSTED_MARKDOWN_HTML_CODEBLOCK,

  FIX_MOJIBAKE_INPUT,
  FIX_MOJIBAKE_OUTPUT
} from './mdxFixtures.mjs';

import { processMdxForHostedMarkdown } from './index.mjs';

test('removeImportStatements removes imports', () => {
  const output = removeImportStatements(REMOVE_IMPORT_STATEMENTS_INPUT);

  assert.ok(!output.includes("import React from 'react';"));
  assert.ok(!output.includes("import Something from './Something';"));
  assert.ok(output.includes('# Heading'));
  assert.ok(output.includes('Some content here.'));
});

test('stripMarkdownSections removes level two headings of Code, Examples, and Component maturity', () => {
  const output = stripMarkdownSections(STRIP_MARKDOWN_SECTIONS_REMOVABLE_SECTIONS_INPUT);

  assert.strictEqual(output.trim(), STRIP_MARKDOWN_SECTIONS_REMOVABLE_SECTIONS_OUTPUT.trim());
});

test('stripMarkdownSections removes target sections regardless of heading capitalization', () => {
  const output = stripMarkdownSections(STRIP_MARKDOWN_SECTIONS_MIXED_HEADING_INPUT);

  assert.strictEqual(output.trim(), STRIP_MARKDOWN_SECTIONS_MIXED_HEADING_OUTPUT.trim());
});


test('normalizeThemeContent: handle single theme', () => {
  const output = normalizeThemeContent(NORMALIZE_THEME_CONTENT_SINGLE_THEME_INPUT);

  assert.strictEqual(output, NORMALIZE_THEME_CONTENT_SINGLE_THEME_OUTPUT);
});

test('normalizeThemeContent: handle multiple themes', () => {
  const output = normalizeThemeContent(NORMALIZE_THEME_CONTENT_MULTIPLE_THEMES_INPUT);

  assert.strictEqual(output, NORMALIZE_THEME_CONTENT_MULTIPLE_THEMES_OUTPUT);
});

test('normalizeMarkdownOutput removes JSX comments, converts br tags, removes JSX space expressions, strips self-closing JSX tags, and normalizes blank lines', () => {

  const output = normalizeMarkdownOutput(NORMALIZE_MARKDOWN_OUTPUT_MIXED_JSX_INPUT);

  assert.strictEqual(output.trim(), NORMALIZE_MARKDOWN_OUTPUT_MIXED_JSX_OUTPUT.trim());
});

test('unwrapSimpleComponents removes Alert tags but preserves their content', () => {
  const output = unwrapSimpleComponents(UNWRAP_SIMPLE_COMPONENTS_ALERT_INPUT);

  assert.strictEqual(output.trim(), UNWRAP_SIMPLE_COMPONENTS_ALERT_OUTPUT.trim());
});

test('unwrapSimpleComponents removes Badge tags but preserves their content', () => {
  const output = unwrapSimpleComponents(UNWRAP_SIMPLE_COMPONENTS_BADGE_INPUT);

  assert.strictEqual(output.trim(), UNWRAP_SIMPLE_COMPONENTS_BADGE_OUTPUT.trim());
});

test('processMdxForHostedMarkdown preserves fenced code blocks inside ThemeContent while normalizing the theme label', () => {
  const output = processMdxForHostedMarkdown(PROCESS_MDX_FOR_HOSTED_MARKDOWN_THEME_CONTENT_CODEBLOCKS_INPUT);

  assert.strictEqual(output.trim(), PROCESS_MDX_FOR_HOSTED_MARKDOWN_THEME_CONTENT_CODEBLOCKS_OUTPUT.trim());
});

test('processMdxForHostedMarkdown preserves fenced js code blocks', () => {
  const output = processMdxForHostedMarkdown(
    PROCESS_MDX_FOR_HOSTED_MARKDOWN_JS_CODEBLOCK
  );

  assert.strictEqual(
    output.trim(),
    PROCESS_MDX_FOR_HOSTED_MARKDOWN_JS_CODEBLOCK.trim()
  );
});

test('processMdxForHostedMarkdown preserves fenced css code blocks', () => {
  const output = processMdxForHostedMarkdown(
    PROCESS_MDX_FOR_HOSTED_MARKDOWN_CSS_CODEBLOCK
  );

  assert.strictEqual(
    output.trim(),
    PROCESS_MDX_FOR_HOSTED_MARKDOWN_CSS_CODEBLOCK.trim()
  );
});

test('processMdxForHostedMarkdown preserves fenced html code blocks', () => {
  const output = processMdxForHostedMarkdown(
    PROCESS_MDX_FOR_HOSTED_MARKDOWN_HTML_CODEBLOCK
  );

  assert.strictEqual(
    output.trim(),
    PROCESS_MDX_FOR_HOSTED_MARKDOWN_HTML_CODEBLOCK.trim()
  );
});

test('fixMojibake fixes common mojibake sequences', () => {
  const output = fixMojibake(FIX_MOJIBAKE_INPUT);

  assert.strictEqual(output, FIX_MOJIBAKE_OUTPUT);
});
