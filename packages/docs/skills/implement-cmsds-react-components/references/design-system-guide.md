# Implement Core Design System Components

Most CMS Design System components and documentation live in:

`node_modules/@cmsgov/design-system`

Use this package as the default source for component implementation guidance.

## Implementation guidance

When implementing or troubleshooting a component:

### 1. Read component guidance at:

`node_modules/@cmsgov/design-system/dist/docs/components/{component-name}/llms.txt`

Use kebab-case component doc slugs (for example: `alert`, `modal-dialog`, `filter-chip`).

If `dist/docs` is not present (CMS Design System versions earlier than `v18.0.0`), use remote documentation:

`https://design.cms.gov/components/{component-name}/llms.txt`

Before deriving a documentation path from the component name, check whether the component appears in the exception list below. If it does, use the mapped path instead:

- `Textfield` → `components/textfield/textfield/llms.txt`

### 2. Verify the component API using the installed TypeScript declaration file:

`node_modules/@cmsgov/design-system/dist/react-components/types/{ComponentName}/{ComponentName}.d.ts`

Use PascalCase matching the component export (for example: `Alert/Alert.d.ts`, `ModalDialog/ModalDialog.d.ts`).

### 3. Do not invent unsupported APIs

Do not invent props, attributes, CSS classes, component variants, or unsupported behavior.
