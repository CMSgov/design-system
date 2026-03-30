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