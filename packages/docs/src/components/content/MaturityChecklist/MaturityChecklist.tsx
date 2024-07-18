import MaturityChecklistItem, { CheckStatus } from './MaturityChecklistItem';
import { Accordion, SvgIcon } from '@cmsgov/design-system';
import AccordionItem from '../AccordionItem';

interface MaturityChecklistProps {
  children: string;

  items: {
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
  };
}

/**
 *
 */
const MaturityChecklist = (props: MaturityChecklistProps) => {
  const criteria = [
    {
      title: 'Accessibility',
      items: [
        {
          title: 'Color',
          description: 'Meets AA color contrast standards for accessibility and color blindness.',
          status: props.items['color'],
        },
        {
          title: 'Forced Colors Mode (FCM)',
          description: 'While using FCM the components text is legible and improves readability.',
          status: props.items['forcedColors'],
        },
        {
          title: 'WCAG 2.1 Level AA Conformance',
          description: 'All Axe checks for WCAG AA compliance have passed.',
          status: props.items['a11yStandards'],
        },
        {
          title: 'Screen readers',
          description:
            'VoiceOver, NVDA, and JAWS screen readers provide concise communication and interaction.',
          status: props.items['screenReaders'],
        },
        {
          title: 'Keyboard navigation',
          description: 'Component is fully navigable with a keyboard.',
          status: props.items['keyboardNavigable'],
        },
      ],
    },
    {
      title: 'Code',
      items: [
        {
          title: 'Storybook',
          description: 'Component has stories to cover all defined props.',
          status: props.items['storybook'],
        },
        {
          title: 'Responsive',
          description: 'Component designed to work in all responsive breakpoints.',
          status: props.items['responsive'],
        },
        {
          title: 'Spanish translations',
          description: 'Includes Spanish translations for default text content.',
          status: props.items['spanish'],
        },
      ],
    },
    // {
    //   title: 'Design',
    //   items: [
    //     {
    //       title: 'Sketch UI-kit',
    //       description: 'Includes all Sketch symbols for defined options.',
    //       status: props.items['completeUiKit'],
    //     },
    //     {
    //       title: 'Responsive',
    //       description: 'All Sketch symbols designed for small and large breakpoints.',
    //       status: props.items['responsiveUiKit'],
    //     },
    //   ],
    // },
    {
      title: 'Tokens',
      items: [
        {
          title: 'Code',
          description: 'Tokens implemented in code.',
          status: props.items['tokensInCode'],
        },
        {
          title: 'Design',
          description: 'Tokens implemented in the Sketch.',
          status: props.items['tokensInSketch'],
        },
      ],
    },
  ];

  // Calculates percentage of completed criteria
  const progress = () => {
    let totalAvailableCriteria = 0;
    let completedCriteria = 0;

    criteria.forEach((criterion) => {
      criterion.items.forEach((item) => {
        if (item.status !== null) {
          totalAvailableCriteria++;
          if (item.status === true) {
            completedCriteria++;
          }
        }
      });
    });

    return Math.round((completedCriteria / totalAvailableCriteria) * 100);
  };

  // Creates list of incomplete criteria
  const incompleteCriteria = criteria.map((criterion) => {
    return criterion.items.map((item) => {
      if (item.status === false) {
        return (
          <MaturityChecklistItem key={item.title} title={item.title} status={item.status}>
            {item.description}
          </MaturityChecklistItem>
        );
      }
    });
  });

  return (
    <section className="c-maturity-checklist">
      <div className="ds-u-measure--wide">
        {props.children}

        <div className="c-maturity-checklist__progress">
          {progress() === 100 ? (
            <SvgIcon ariaHidden title="" viewBox="0 0 24 24" className="ds-u-color--success">
              <path
                fillRule="nonzero"
                d="m11.428 15.928c-0.51094 0.51094-1.3453 0.51094-1.8562 0l-3-3c-0.51094-0.51094-0.51094-1.3453 0-1.8562s1.3453-0.51094 1.8562 0l2.0719 2.0719 5.0719-5.0719c0.51094-0.51094 1.3453-0.51094 1.8562 0s0.51094 1.3453 0 1.8562l-6 6zm12.572-3.9281c0 6.6281-5.3719 12-12 12s-12-5.3719-12-12 5.3719-12 12-12 12 5.3719 12 12zm-12-9.75c-5.3859 0-9.75 4.3641-9.75 9.75s4.3641 9.75 9.75 9.75 9.75-4.3641 9.75-9.75-4.3641-9.75-9.75-9.75z"
              />
            </SvgIcon>
          ) : (
            <SvgIcon ariaHidden title="" viewBox="0 0 24 24" className="ds-u-color--error">
              <path
                fillRule="nonzero"
                d="m24 12c0 6.6281-5.3719 12-12 12s-12-5.3719-12-12 5.3719-12 12-12 12 5.3719 12 12zm-12-9.75c-5.3859 0-9.75 4.3641-9.75 9.75s4.3641 9.75 9.75 9.75 9.75-4.3641 9.75-9.75-4.3641-9.75-9.75-9.75z"
              />
            </SvgIcon>
          )}
          <p>This component meets {progress()}% of our maturity criteria.</p>
        </div>

        {progress() !== 100 && (
          <div className="c-maturity-checklist__incomplete-items">
            <>
              <h3>Incomplete criteria</h3>
              <ul role="list" className="c-maturity-checklist__list">
                {incompleteCriteria}
              </ul>
            </>
          </div>
        )}

        <div className="c-maturity-checklist__what-is-it">
          <h3>What does this mean?</h3>

          <p>
            Each component is tested against the following items to gauge the component&apos;s
            maturity. When using incomplete components, consider the unmet criteria as applied to
            your product.
          </p>

          <p>
            For more information about how we tested and validated our work for each checklist item,{' '}
            <a href="https://github.com/CMSgov/design-system/blob/main/COMPONENT_MATURITY.md">
              read our component maturity documentation
            </a>
            .
          </p>
        </div>

        <Accordion className="ds-u-margin-top--4">
          <AccordionItem heading="View complete criteria" contentClassName="ds-u-padding--0">
            {criteria.map((criterion) => {
              return (
                <ul role="list" key={criterion.title} className="c-maturity-checklist__list">
                  <h3>{criterion.title}</h3>
                  {criterion.items.map((item) => {
                    return (
                      <MaturityChecklistItem
                        key={item.title}
                        title={item.title}
                        status={item.status}
                      >
                        {item.description}
                      </MaturityChecklistItem>
                    );
                  })}
                </ul>
              );
            })}
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default MaturityChecklist;
