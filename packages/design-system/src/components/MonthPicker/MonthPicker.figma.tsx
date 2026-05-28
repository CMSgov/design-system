import MonthPicker from './MonthPicker';
import figma from '@figma/code-connect';

figma.connect(
  MonthPicker,
  'https://www.figma.com/design/OYkYP4pC9jwS7j2qafwmiv/Design-System-Library?m=dev&node-id=227-59865',
  {
    props: {
      //`Inversed` (VARIANT on nested label/hint/error): needs to be added to top level component. Ticket: CMSDS-4091
      // buttonVariation needs to be added to design. Ticket: CMSDS-4091
      labelProps: figma.nestedProps('.LabelHeading', { label: figma.string('Heading text') }),
      hintProps: figma.nestedProps('.HintText', { hint: figma.string('Hint text') }),
      errorProps: figma.nestedProps('.ErrorText', {
        errorMessage: figma.string('Error text'),
      }),
    },
    example: ({ labelProps, hintProps, errorProps }) => (
      <MonthPicker
        name="month_picker"
        label={labelProps.label}
        hint={hintProps.hint}
        errorMessage={errorProps.errorMessage}
      />
    ),
  }
);
