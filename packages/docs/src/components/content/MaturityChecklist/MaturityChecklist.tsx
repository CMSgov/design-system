import MaturityChecklistItem, { CheckStatus } from './MaturityChecklistItem';
import { Button, Dialog, useDialog } from '@cmsgov/design-system';

interface MaturityChecklistProps {
  // Accessibility
  a11yStandards: CheckStatus;
  color: CheckStatus;
  forcedColors: CheckStatus;
  screenReaders: CheckStatus;
  keyboardNavigable: CheckStatus;

  // Code
  storybook: CheckStatus;
  responsive: CheckStatus;
  spanish: CheckStatus;

  // Design
  completeUiKit: CheckStatus;
  responsiveUiKit: CheckStatus;

  // Tokens
  tokensInCode: CheckStatus;
  tokensInSketch: CheckStatus;
}

/**
 *
 */
const MaturityChecklist = (props: MaturityChecklistProps) => {
  const { dialog, openDialog } = useDialog(({ resolveClose, isOpen }) => (
    <Dialog
      heading="Hello World"
      onExit={resolveClose}
      actions={
        <>
          <Button variation="ghost" onClick={resolveClose}>
            Cancel
          </Button>
        </>
      }
      isOpen={isOpen}
    >
      Are you sure you want to delete your account? All in-progress applications will be deleted and
      your information cleared from the system.
    </Dialog>
  ));

  return (
    <section>
      <p>
        For more information about how we tested and validated our work for each checklist item,{' '}
        <a href="https://github.com/CMSgov/design-system/blob/main/COMPONENT_MATURITY.md">
          read our component maturity documentation
        </a>
        .
      </p>

      <h3>Accessibility</h3>
      <ul className="ds-c-list--bare">
        <MaturityChecklistItem title="Color" status={props.color}>
          Meets AA color contrast standards for accessibility and color blindness.
        </MaturityChecklistItem>
        <MaturityChecklistItem title="Forced Colors Mode (FCM)" status={props.forcedColors}>
          While using FCM the components text is legible and improves readability.
        </MaturityChecklistItem>
        <MaturityChecklistItem title="WCAG 2.1 Level AA Conformance" status={props.a11yStandards}>
          All Axe checks for WCAG AA compliance have passed.
        </MaturityChecklistItem>
        <MaturityChecklistItem title="Screen readers" status={props.screenReaders}>
          VoiceOver, NVDA, and JAWS screen readers provide concise communication and interaction.
        </MaturityChecklistItem>
        <MaturityChecklistItem title="Keyboard navigation" status={props.keyboardNavigable}>
          Component is fully navigable with a keyboard.
        </MaturityChecklistItem>
      </ul>

      <Button onClick={openDialog}>Open dialog</Button>
      {dialog}

      <h3>Code</h3>
      <ul className="ds-c-list--bare">
        <MaturityChecklistItem title="Storybook" status={props.storybook}>
          Component has stories to cover all defined props.
        </MaturityChecklistItem>
        <MaturityChecklistItem title="Responsive" status={props.responsive}>
          Component designed to work in all responsive breakpoints.
        </MaturityChecklistItem>
        <MaturityChecklistItem title="Spanish translations" status={props.spanish}>
          Includes Spanish translations for default text content.
        </MaturityChecklistItem>
      </ul>

      {/* <h3>Design</h3>
    <ul className="ds-c-list--bare">
      <MaturityChecklistItem title="Sketch UI-kit" status={props.completeUiKit}>
        Includes all Sketch symbols for defined options.
      </MaturityChecklistItem>
      <MaturityChecklistItem title="Responsive" status={props.responsiveUiKit}>
        All Sketch symbols designed for small and large breakpoints.
      </MaturityChecklistItem>
    </ul> */}

      <h3>Tokens</h3>
      <ul className="ds-c-list--bare">
        <MaturityChecklistItem title="Code" status={props.tokensInCode}>
          Tokens implemented in code.
        </MaturityChecklistItem>
        <MaturityChecklistItem title="Design" status={props.tokensInSketch}>
          Tokens implemented in the Sketch.
        </MaturityChecklistItem>
      </ul>
    </section>
  );
};

export default MaturityChecklist;
