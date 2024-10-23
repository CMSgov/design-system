const labelAttrs = ['label', 'label-class-name', 'label-id'] as const;
const hintAttrs = ['hint', 'hint-id', 'requirement-label', 'hint-class-name'] as const;
const inlineErrorAttrs = [
  'error-id',
  'error-placement',
  'error-message',
  'error-message-class-name',
] as const;
export const formAttrs = [...labelAttrs, ...hintAttrs, ...inlineErrorAttrs] as const;
