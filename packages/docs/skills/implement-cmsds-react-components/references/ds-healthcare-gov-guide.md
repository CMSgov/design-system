# Implement Healthcare Design System Components

Use `@cmsgov/ds-healthcare-gov` for Healthcare-specific components and Healthcare-themed component documentation.

## Implementation guidance

When implementing or troubleshooting a component:

### 1. Read component documentation

Read component guidance at:

`node_modules/@cmsgov/ds-healthcare-gov/dist/docs/components/{component-name}/llms.txt`

Use kebab-case component doc slugs (for example: `alert`, `modal-dialog`, `filter-chip`).

If `dist/docs` is not present (CMS Design System versions earlier than `v18.0.0`), use remote documentation:

`https://design.cms.gov/components/{component-name}/llms.txt`

Before deriving a documentation path from the component name, check whether the component appears in the exception list below. If it does, use the mapped path instead:

- `Footer` → `components/footer/healthcare-footer/llms.txt`
- `HealthcaregovAccordionItem` → `components/accordion/llms.txt`
- `Header` → `components/header/healthcare-header/llms.txt`
- `HealthcaregovHelpDrawer` → `components/drawer/llms.txt`
- `HealthcaregovThirdPartyExternalLink` → `components/third-party-external-link/llms.txt`
- `Logo` → `components/logos/healthcare-logo/llms.txt`
- `Textfield` → `components/textfield/textfield/llms.txt`

### 2. Verify the component API

Validate component props and supported APIs using the installed TypeScript definition file.

Most Healthcare components use TypeScript definitions from the core design system package:

`node_modules/@cmsgov/design-system/dist/react-components/types/{ComponentName}/{ComponentName}.d.ts`

Use PascalCase matching the component export (for example: `Alert/Alert.d.ts`, `ModalDialog/ModalDialog.d.ts`).

Some Healthcare components use Healthcare-specific TypeScript entry points:

- `Footer` → `node_modules/@cmsgov/ds-healthcare-gov/dist/react-components/types/Footer/Footer.d.ts`
- `Header` → `node_modules/@cmsgov/ds-healthcare-gov/dist/react-components/types/Header/Header.d.ts`
- `HealthcaregovAccordionItem` → `node_modules/@cmsgov/ds-healthcare-gov/dist/react-components/types/HealthcaregovAccordionItem/HealthcaregovAccordionItem.d.ts`
- `HealthcaregovThirdPartyExternalLink` → `node_modules/@cmsgov/ds-healthcare-gov/dist/react-components/types/HealthcaregovThirdPartyExternalLink/HealthcaregovThirdPartyExternalLink.d.ts`
- `Logo` → `node_modules/@cmsgov/ds-healthcare-gov/dist/react-components/types/Logo/Logo.d.ts`

Some Healthcare-specific components are lightweight wrappers around core CMS Design System components and import their prop types from `@cmsgov/design-system`.

If a Healthcare component `.d.ts` imports prop types from another component, follow the import and inspect the referenced TypeScript definition file as well.

Example:

`HealthcaregovThirdPartyExternalLink.d.ts` imports `ThirdPartyExternalLinkProps` from `@cmsgov/design-system`.

Validate supported props against both files:

- `node_modules/@cmsgov/ds-healthcare-gov/dist/react-components/types/HealthcaregovThirdPartyExternalLink/HealthcaregovThirdPartyExternalLink.d.ts`
- `node_modules/@cmsgov/design-system/dist/react-components/types/ThirdPartyExternalLink/ThirdPartyExternalLink.d.ts`

### 3. Do not invent unsupported APIs

Do not invent props, attributes, CSS classes, component variants, or unsupported behavior.
