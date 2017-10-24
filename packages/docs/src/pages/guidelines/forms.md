---
title: Forms
---

The design system includes components for the standard HTML form elements: [checkboxes and radio buttons]({{root}}/components/choice), [text fields]({{root}}/components/text-field), [select menus]({{root}}/components/select), fieldsets, labels, and so on.

Below are some best practices your project should aim to follow in order to provide the most accessible and usable experience for your users. Additional guidance, specific to each form field, is provided in each component's guidance tab.

## Best practices

- Keep forms as simple as possible – only ask for what's absolutely needed.
- Display form fields in the same order in HTML as they appear on screen. Do not use CSS to rearrange the form fields. Screen readers and keyboards navigate forms in the order they appear in the HTML.
- Ensure there's sufficient spacing between form fields. Your fields shouldn't feel cramped and users shouldn't confuse which labels and hint text belong to which fields. Use the [margin]({{root}}/utilities/margin) or [padding]({{root}}/utilities/padding) utility classes, if necessary, to add extra spacing.
- Each field should have a [`<label>`]({{root}}/components/form-label).

### Validation

- Place inline validation messages within the field's `<label>` element.
- See [validation guidance for the `<label>` component]({{root}}/components/form-label/#guidance).

### Required and Optional fields

If most of the fields in a form are required, indicate the few that are optional. If most of the fields in a form are optional, indicate the few that are required. When indicating what form fields are either required or optional, always use text. Use the [`requirementLabel` prop on the `FormLabel` component]({{root}}/components/form-label/#usage).

Whichever choice you choose, ensure the pattern is consistent when the form is split across multiple pages.

## Learn more

- [Design Better Forms](https://uxdesign.cc/design-better-forms-96fadca0f49c)
- [Website Forms Usability: Top 10 Recommendations](https://www.nngroup.com/articles/web-form-design/)
- [Form Design Quick Fix: Group Form Elements Effectively Using White Space](https://www.nngroup.com/articles/form-design-white-space/)
