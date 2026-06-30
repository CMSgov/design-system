# Review Accessibility for Design System Components

Each CMS Design System component includes documentation on accessibility and how to test the component for accessibility.

## Locate the component guidance

`node_modules/@cmsgov/design-system/dist/docs/components/{component-name}/llms.txt`

Use kebab-case component doc slugs (for example: `alert`, `modal-dialog`, `filter-chip`).

If `dist/docs` is not present (CMS Design System versions earlier than `v18.0.0`), use remote documentation:

`https://design.cms.gov/components/{component-name}/llms.txt`

Before deriving the documentation path from the component name, check whether the component appears in one of the exception lists below. If it does, use the mapped path instead.

If local `dist/docs` is unavailable (CMS Design System versions earlier than `v18.0.0`), replace the local base path below with:

`https://design.cms.gov/`

### Healthcare-specific documentation paths

Append the following relative documentation paths to the local base path: `node_modules/@cmsgov/ds-healthcare-gov/dist/docs/`

- `Footer` → `components/footer/healthcare-footer/llms.txt`
- `HealthcaregovAccordionItem` → `components/accordion/llms.txt`
- `Header` → `components/header/healthcare-header/llms.txt`
- `HealthcaregovHelpDrawer` → `components/drawer/llms.txt`
- `HealthcaregovThirdPartyExternalLink` → `components/third-party-external-link/llms.txt`
- `Logo` → `components/logos/healthcare-logo/llms.txt`
- `Textfield` → `components/textfield/textfield/llms.txt`

### Medicare-specific documentation paths

Append the following relative documentation paths to the local base path: `node_modules/@cmsgov/ds-medicare-gov/dist/docs/`

- `MedicaregovHelpDrawer` → `components/drawer/llms.txt`
- `MedicaregovLogo` → `components/logos/medicare-logo/llms.txt`
- `MedicaregovThirdPartyExternalLink` → `components/third-party-external-link/llms.txt`
- `SimpleFooter` → `components/footer/medicare/llms.txt`
- `Textfield` → `components/textfield/textfield/llms.txt`

## Review the Accessibility guidance

Within the component's `llms.txt`, locate the **Accessibility** section.

Within that section, review:

- General accessibility guidance.
- Accessibility testing guidance.
- Keyboard testing.
- Screen reader testing.

Use this guidance as the primary source of truth when evaluating or troubleshooting the component's accessibility.
