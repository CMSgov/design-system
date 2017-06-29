---
title: Forms
---

The design system includes components for the standard HTML form elements: [checkboxes and radio buttons]({{root}}/components/choice), [text fields]({{root}}/components/text-field), [select menus]({{root}}/components/select), fieldsets, labels, and so on.

Below are some best practices your project should aim to follow in order to provide the most accessible and usable experience for your users. Additional guidance, specific to each form field, is provided in each component's guidance tab.

## Best practices

- Keep forms as simple as possible – only ask for what's absolutely needed.
- Display form fields in the same order in HTML as they appear on screen. Do not use CSS to rearrange the form fields. Screen readers narrate, and keyboard navigate, forms in the order they appear in the HTML.
- Ensure there's sufficient spacing between form fields. Your fields shouldn't feel cramped and users shouldn't confuse which labels and hint text belong to which fields. Use the [margin]({{root}}/utilities/margin) or [padding]({{root}}/utilities/padding) utility classes, if necessary, to add extra spacing.

### Labels

- Apply the `ds-c-label` class to `<label>` elements.
- Each field should have a `<label>`. Never use a field's `placeholder` attribute as the primary way to label the field.
- Labels should have a `for` attribute, referencing the corresponding input's unique `id` attribute. Only one label can be associated to each unique form element.
- Labels should be placed above their fields.
- Label text should be short and in sentence case.
- Avoid colons at the end of labels.

#### Hint text

- Place hint text within the field's `<label>` element.
- Apply the `ds-c-field__hint` class to hint text.
- Use hint text for supporting contextual help, this will always be shown.
- Hint text should sit above a form field, and below the label text.

#### Validation

- Place inline validation messages within the field's `<label>` element.
- Visually align inline validation messages with the input fields, so people using screen magnifiers can read them quickly.

##### Example

```html
<label class="ds-c-label" for="lastname">
  ID Number
  <span class="ds-c-field__hint ds-u-color--error" role="alert">
    Please enter your ID Number
  </span>
  <span class="ds-c-field__hint">
    It's on your benefit card and benefit letter. For example, ‘12 34 56B’.
  </span>
</label>
```

### Required and Optional fields

If most of the fields in a form are required, indicate the few that are optional. If most of the fields in a form are optional, indicate the few that are required. When indicating what form fields are either required or optional, always use text.

Whichever choice you choose, ensure the pattern is consistent when the form is split across multiple pages.

## Learn more

- [Website Forms Usability: Top 10 Recommendations](https://www.nngroup.com/articles/web-form-design/)
- [Form Design Quick Fix: Group Form Elements Effectively Using White Space](https://www.nngroup.com/articles/form-design-white-space/)
