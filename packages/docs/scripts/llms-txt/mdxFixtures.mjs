export const REMOVE_IMPORT_STATEMENTS_INPUT = `import React from 'react';
import Something from './Something';

# Heading

Some content here.`;

export const NORMALIZE_THEME_CONTENT_SINGLE_THEME_INPUT = `<ThemeContent onlyThemes={['core']}>
Core uses Open Sans for all headings.
</ThemeContent>`;

export const NORMALIZE_THEME_CONTENT_SINGLE_THEME_OUTPUT = `**Theme: core only**

Core uses Open Sans for all headings.`;

export const NORMALIZE_THEME_CONTENT_MULTIPLE_THEMES_INPUT = `<ThemeContent onlyThemes={['core', 'medicare']}>
Shared theme content.
</ThemeContent>`;

export const NORMALIZE_THEME_CONTENT_MULTIPLE_THEMES_OUTPUT = `**Themes: core, medicare only**

Shared theme content.`;


export const STRIP_MARKDOWN_SECTIONS_REMOVABLE_SECTIONS_INPUT = `## Overview

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

export const STRIP_MARKDOWN_SECTIONS_REMOVABLE_SECTIONS_OUTPUT = `## Overview

Keep this section.

## Accessibility

Keep this section too.`;

export const STRIP_MARKDOWN_SECTIONS_MIXED_HEADING_INPUT = `## Overview

Keep this section.

## code

Remove this code section.

## Component Maturity

Remove this maturity section.

## Accessibility

Keep this section too.`;

export const STRIP_MARKDOWN_SECTIONS_MIXED_HEADING_OUTPUT = `## Overview

Keep this section.

## Accessibility

Keep this section too.`;

export const UNWRAP_SIMPLE_COMPONENTS_ALERT_INPUT = `Before
<Alert heading="Warning">
This is important content.
</Alert>
After`;

export const UNWRAP_SIMPLE_COMPONENTS_ALERT_OUTPUT = `Before

This is important content.

After`;

export const UNWRAP_SIMPLE_COMPONENTS_BADGE_INPUT = `Before
<Badge variation="success">Ready</Badge>
After`;

export const UNWRAP_SIMPLE_COMPONENTS_BADGE_OUTPUT = `Before
Ready
After`;

export const NORMALIZE_MARKDOWN_OUTPUT_MIXED_JSX_INPUT = `Before
{/* this is a JSX comment */}
Line one<br />Line two
Hello{' '}world
<CloseIconThin />
After



Done`;

export const NORMALIZE_MARKDOWN_OUTPUT_MIXED_JSX_OUTPUT = `Before

Line one

Line two
Hello world

After

Done`;

export const PROCESS_MDX_FOR_HOSTED_MARKDOWN_THEME_CONTENT_CODEBLOCKS_INPUT = `<ThemeContent onlyThemes={['healthcare']}>

\`\`\`css
@import '@cmsgov/ds-healthcare-gov/css/index';
@import '@cmsgov/ds-healthcare-gov/css/healthcare-theme';
\`\`\`

Or you might import it from your JavaScript like this:

\`\`\`js
import '@cmsgov/ds-healthcare-gov/css/index.css';
import '@cmsgov/ds-healthcare-gov/css/healthcare-theme.css';
\`\`\`

</ThemeContent>`

export const PROCESS_MDX_FOR_HOSTED_MARKDOWN_THEME_CONTENT_CODEBLOCKS_OUTPUT = `**Theme: healthcare only**

\`\`\`css
@import '@cmsgov/ds-healthcare-gov/css/index';
@import '@cmsgov/ds-healthcare-gov/css/healthcare-theme';
\`\`\`

Or you might import it from your JavaScript like this:

\`\`\`js
import '@cmsgov/ds-healthcare-gov/css/index.css';
import '@cmsgov/ds-healthcare-gov/css/healthcare-theme.css';
\`\`\``;

export const PROCESS_MDX_FOR_HOSTED_MARKDOWN_JS_CODEBLOCK = `Before text

\`\`\`js
import { Button } from 'foo';
const example = <Alert />;
\`\`\`

After text`;

export const PROCESS_MDX_FOR_HOSTED_MARKDOWN_CSS_CODEBLOCK = `Before text

\`\`\`css
@import '@cmsgov/ds-healthcare-gov/css/index';
.alert {
  color: red;
}
\`\`\`

After text`;

export const PROCESS_MDX_FOR_HOSTED_MARKDOWN_HTML_CODEBLOCK = `Before text

\`\`\`html
<ds-alert heading="Heads up">
  Example content
</ds-alert>
\`\`\`

After text`;

export const FIX_MOJIBAKE_INPUT =
  "â€œHelloâ€\u009d â€˜worldâ€™ â€“ dash â€” long â€¦ bullets â€¢ item with spaces";

export const FIX_MOJIBAKE_OUTPUT =
  "“Hello” ‘world’ - dash — long … bullets • item with spaces";