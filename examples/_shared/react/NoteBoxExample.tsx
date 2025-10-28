import { NoteBox, NoteBoxQuotation } from '@cmsgov/design-system';
import { QuotationMarkIcon } from '@cmsgov/design-system';

const NoteBoxExample = () => {
  return (
    <>
      <h2>Note Box Example</h2>
      <NoteBox heading="Learn this">
        The Inflation Reduction Act keeps these savings and lower costs through 2025. If you qualify
        for savings, you&apos;ll find out the lower costs when you shop for plans.
      </NoteBox>
      <h2>Note Box Quotation Example</h2>
      <NoteBox heading={<QuotationMarkIcon />}>
        <NoteBoxQuotation>A Quotation!</NoteBoxQuotation>
      </NoteBox>
    </>
  );
};

export default NoteBoxExample;
