# Review Accessibility for Design System Components

Most CMS Design System components and documentation live in:

`node_modules/@cmsgov/design-system`

Use this package as the default source for component accessibility guidance.

## Locate the component guidance

Each component has guidance on accessibility for that particular component as well as how to test it for accesibility with screen readers and keyboard navigation.

### 1. Locate the llms.txt for the component

`node_modules/@cmsgov/design-system/dist/docs/components/{component-name}/llms.txt`

Use kebab-case component doc slugs (for example: `alert`, `modal-dialog`, `filter-chip`).

If `dist/docs` is not present (CMS Design System versions earlier than `v18.0.0`), use remote documentation:

`https://design.cms.gov/components/{component-name}/llms.txt`

Before deriving the documentation path from the component name, check whether the component appears in one of the exception lists below.

#### Healthcare-specific documentation paths

Use the following relative documentation paths under:

Local: `node_modules/@cmsgov/ds-healthcare-gov/dist/docs/`

Remote: https://design.cms.gov/

- `Footer` → `components/footer/healthcare-footer/llms.txt`
- `HealthcaregovAccordionItem` → `components/accordion/llms.txt`
- `Header` → `components/header/healthcare-header/llms.txt`
- `HealthcaregovHelpDrawer` → `components/drawer/llms.txt`
- `HealthcaregovThirdPartyExternalLink` → `components/third-party-external-link/llms.txt`
- `Logo` → `components/logos/healthcare-logo/llms.txt`
- `Textfield` → `components/textfield/textfield/llms.txt`

### Medicare-specific documentation paths

Use the following relative documentation paths under:

Local: `node_modules/@cmsgov/ds-healthcare-gov/dist/docs/`

Remote: https://design.cms.gov/

- `MedicaregovHelpDrawer` → `components/drawer/llms.txt`
- `MedicaregovLogo` → `components/logos/medicare-logo/llms.txt`
- `MedicaregovThirdPartyExternalLink` → `components/third-party-external-link/llms.txt`
- `SimpleFooter` → `components/footer/medicare/llms.txt`
- `Textfield` → `components/textfield/textfield/llms.txt`

### 2. Review the Accessibility guidance

Within the component's `llms.txt`, locate the **Accessibility** section.

Review:

- General accessibility guidance and oberservations for the component.
- Accessibility testing guidance.
- Keyboard testing guidance.
- Screen reader testing guidance.

Use these sections as the primary source of truth when evaluating or troubleshooting the component's accessibility.
