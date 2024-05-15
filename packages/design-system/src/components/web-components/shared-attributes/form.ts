const labelAttrs = ['label', 'label-class-name', 'label-id'];
const hintAttrs = ['hint', 'hint-id', 'requirement-label'];
const inlineErrorAttrs = [
  'error-id',
  'error-placement',
  'error-message',
  'error-message-class-name',
];
export const formAttrs = [...labelAttrs, ...hintAttrs, ...inlineErrorAttrs];
