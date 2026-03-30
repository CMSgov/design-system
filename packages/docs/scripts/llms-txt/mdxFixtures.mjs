export const IMPORT_STATEMENTS_INPUT = `import React from 'react';
import Something from './Something';

# Heading

Some content here.`;

export const THEME_CONTENT_SINGLE = `<ThemeContent onlyThemes={['core']}>
Core uses Open Sans for all headings.
</ThemeContent>`;

export const THEME_CONTENT_SINGLE_OUTPUT = `**Theme: core only**

Core uses Open Sans for all headings.`;

export const THEME_CONTENT_MULTIPLE = `<ThemeContent onlyThemes={['core', 'medicare']}>
Shared theme content.
</ThemeContent>`;

export const THEME_CONTENT_MULTIPLE_OUTPUT = `**Themes: core, medicare only**

Shared theme content.`;

export const FULL_PIPELINE_INPUT = `import React from 'react';

# Typography

{/* comment */}

<ThemeContent onlyThemes={['core']}>
Core uses Open Sans.
</ThemeContent>

<Alert>
Pay attention.
</Alert>

## Code

This should be removed.

Before<br />After

<CloseIconThin />
`;

export const FULL_PIPELINE_OUTPUT = `# Typography

**Theme: core only**

Core uses Open Sans.

Pay attention.

Before

After`;

export const SECTIONS_TO_REMOVE_INPUT = `## Overview

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

export const REMOVED_SECTIONS_OUTPUT = `## Overview

Keep this section.

## Accessibility

Keep this section too.`;

export const MIXED_HEADING_INPUT = `## Overview

Keep this section.

## code

Remove this code section.

## Component Maturity

Remove this maturity section.

## Accessibility

Keep this section too.`;

export const MIXED_HEADING_OUTPUT = `## Overview

Keep this section.

## Accessibility

Keep this section too.`;

export const MDX_WITH_ALERT = `Before
<Alert heading="Warning">
This is important content.
</Alert>
After`;

export const MDX_WITH_UNWRAPPED_ALERT = `Before

This is important content.

After`;

export const MDX_WITH_BADGE = `Before
<Badge variation="success">Ready</Badge>
After`;

export const MDX_WITH_UNWRAPPED_BADGE = `Before
Ready
After`;

export const MIXED_JSX_INPUT = `Before
{/* this is a JSX comment */}
Line one<br />Line two
Hello{' '}world
<CloseIconThin />
After



Done`;

export const NORMALIZED_MARKDOWN_OUTPUT = `Before

Line one

Line two
Hello world

After

Done`;

export const THEME_CONTENT_CODEBLOCKS_INPUT = `<ThemeContent onlyThemes={['healthcare']}>

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

export const THEME_CONTENT_CODEBLOCKS_OUTPUT = `**Theme: healthcare only**

\`\`\`css
@import '@cmsgov/ds-healthcare-gov/css/index';
@import '@cmsgov/ds-healthcare-gov/css/healthcare-theme';
\`\`\`

Or you might import it from your JavaScript like this:

\`\`\`js
import '@cmsgov/ds-healthcare-gov/css/index.css';
import '@cmsgov/ds-healthcare-gov/css/healthcare-theme.css';
\`\`\``;
