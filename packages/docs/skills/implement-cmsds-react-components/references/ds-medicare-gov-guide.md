# Implement Medicare Design System Components

Use `@cmsgov/ds-medicare-gov` for Medicare-specific components and Medicare-themed component documentation.

## Implementation guidance

When implementing or troubleshooting a component:

### 1. Read component documentation

Read component guidance at:

`node_modules/@cmsgov/ds-medicare-gov/dist/docs/components/{component-name}/llms.txt`

Use kebab-case component doc slugs (for example: `alert`, `modal-dialog`, `filter-chip`).

If `dist/docs` is not present (CMS Design System versions earlier than `v18.0.0`), use remote documentation:

`https://design.cms.gov/components/{component-name}/llms.txt`

Before deriving a documentation path from the component name, check whether the component appears in the exception list below. If it does, use the mapped path instead:

- `MedicaregovHelpDrawer` → `components/drawer/llms.txt`
- `MedicaregovLogo` → `components/logos/medicare-logo/llms.txt`
- `MedicaregovThirdPartyExternalLink` → `components/third-party-external-link/llms.txt`
- `SimpleFooter` → `components/footer/medicare/llms.txt`
- `Textfield` → `components/textfield/textfield/llms.txt`

### 2. Verify the component API

Validate component props and supported APIs using the installed TypeScript definition file.

Most Medicare components use TypeScript definitions from the core design system package:

`node_modules/@cmsgov/design-system/dist/react-components/types/{ComponentName}/{ComponentName}.d.ts`

Use PascalCase matching the component export (for example: `Alert/Alert.d.ts`, `ModalDialog/ModalDialog.d.ts`).

Some Medicare components use Medicare-specific TypeScript entry points:

- `MedicaregovLogo` → `node_modules/@cmsgov/ds-medicare-gov/dist/react-components/types/MedicaregovLogo/MedicaregovLogo.d.ts`
- `MedicaregovThirdPartyExternalLink` → `node_modules/@cmsgov/ds-medicare-gov/dist/react-components/types/MedicaregovThirdPartyExternalLink/MedicaregovThirdPartyExternalLink.d.ts`
- `SimpleFooter` → `node_modules/@cmsgov/ds-medicare-gov/dist/react-components/types/SimpleFooter/SimpleFooter.d.ts`
- `Stars` → `node_modules/@cmsgov/ds-medicare-gov/dist/react-components/types/Stars/Stars.d.ts`

Some Medicare-specific components are lightweight wrappers around core CMS Design System components and import their prop types from `@cmsgov/design-system`.

If a Medicare component `.d.ts` imports prop types from another component, follow the import and inspect the referenced TypeScript definition file as well.

Example:

`MedicaregovThirdPartyExternalLink.d.ts` imports `ThirdPartyExternalLinkProps` from `@cmsgov/design-system`.

Validate supported props against both files:

- `node_modules/@cmsgov/ds-medicare-gov/dist/react-components/types/MedicaregovThirdPartyExternalLink/MedicaregovThirdPartyExternalLink.d.ts`
- `node_modules/@cmsgov/design-system/dist/react-components/types/ThirdPartyExternalLink/ThirdPartyExternalLink.d.ts`

### 3. Do not invent unsupported APIs

Do not invent props, attributes, CSS classes, component variants, or unsupported behavior.
