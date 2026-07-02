import type { ReactNode } from 'react';
import { CheckIcon, ChoiceList, CloseIcon, InfoCircleIcon, StarIcon } from '@cmsgov/design-system';
import { Button } from './Button';
import { Tooltip } from './Tooltip';
import '../styles/components/PlanCard.css';

/**
 * Medicare.gov redesign — Plan Card pattern (Figma node 1991:7723).
 *
 * Composed from existing pieces: the mgov `Button`, DS icons, DS `ChoiceList`
 * (the "Add to compare" checkbox), and the `ds-c-mgov-type--*` typography
 * classes. Layout lives in styles/components/PlanCard.css, whose spacing uses
 * the DS --spacer scale (8px cadence).
 *
 * Typography mapping:
 *   plan name + dollar amounts (H5, 24/28) → ds-c-mgov-type--pair-title
 *   "Medium" links/notes (CTA link, 16/22)  → ds-c-mgov-type--text-link
 *   descriptive text (Body, 16/24)          → ds-c-mgov-type--body
 *   section headings (Label, 16/24)         → .ds-c-mgov-plan-card__heading
 */

const B = 'ds-c-mgov-plan-card';

function Section({
  heading,
  children,
  last,
}: {
  heading: string;
  children: ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`ds-c-mgov-plan-card__section${last ? ` ds-c-mgov-plan-card__section--last` : ''}`}
    >
      <p className={`ds-c-mgov-plan-card__heading`}>{heading}</p>
      {children}
    </div>
  );
}

function BenefitRow({ yes, children }: { yes: boolean; children: ReactNode }) {
  return (
    <div className={`ds-c-mgov-plan-card__row`}>
      <span
        className={`ds-c-mgov-plan-card__icon ds-c-mgov-plan-card__icon--lg ds-c-mgov-plan-card__icon--${
          yes ? 'yes' : 'no'
        }`}
        aria-hidden="true"
      >
        {yes ? <CheckIcon /> : <CloseIcon />}
      </span>
      <span className="ds-c-mgov-type--body">{children}</span>
    </div>
  );
}

function StarRating({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span className={`ds-c-mgov-plan-card__stars`} aria-label={`${filled} out of ${total} stars`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`ds-c-mgov-plan-card__icon ds-c-mgov-plan-card__icon--lg ds-c-mgov-plan-card__icon--${
            i < filled ? 'on' : 'off'
          }`}
          aria-hidden="true"
        >
          <StarIcon isFilled={i < filled} />
        </span>
      ))}
    </span>
  );
}

export function PlanCard() {
  return (
    <article className={`${B} ds-u-margin-y--2`}>
      {/* Title */}
      <div className={`ds-c-mgov-plan-card__title`}>
        <p className="ds-c-mgov-type--pair-title">
          CareFirst BlueCross BlueShield Advantage Essential (PPO)
        </p>
        <div className={`ds-c-mgov-plan-card__title-meta`}>
          <p className="ds-c-mgov-type--body">
            CareFirst BlueCross BlueShield Medicare Advantage | Plan ID: H0628-013-0
          </p>
          <div className={`ds-c-mgov-plan-card__rating`}>
            <span className={`ds-c-mgov-type--body`} style={{ whiteSpace: 'nowrap' }}>
              <Tooltip component={'a'} title="How much users like this thing.">
                Star rating
              </Tooltip>
            </span>
            <StarRating filled={4} />
          </div>
        </div>
      </div>

      {/* Main content — two columns */}
      <div className={`ds-c-mgov-plan-card__cols`}>
        {/* Left */}
        <div className={`ds-c-mgov-plan-card__col`}>
          <Section heading="Monthly premium">
            <div className={`ds-c-mgov-plan-card__amount-row`}>
              <p className={`ds-c-mgov-type--pair-title ds-c-mgov-plan-card__amount`}>$0.00</p>
              <div className={`ds-c-mgov-plan-card__stack`}>
                <span className="ds-c-mgov-type--text-link">
                  Includes: Health &amp; drug coverage
                </span>
                <span className="ds-c-mgov-type--text-link">
                  Doesn&rsquo;t include: The standard B premium
                </span>
                <span className={`ds-c-mgov-plan-card__inline`}>
                  <span className={`ds-c-mgov-type--text-link ds-c-mgov-plan-card__u`}>
                    What&rsquo;s the standard Part B Premium?
                  </span>
                  <span
                    className={`ds-c-mgov-plan-card__icon ds-c-mgov-plan-card__icon--sm`}
                    aria-hidden="true"
                  >
                    <InfoCircleIcon />
                  </span>
                </span>
              </div>
            </div>
          </Section>

          <Section heading="Total drug & premium cost (for the rest of 2026)">
            <div className={`ds-c-mgov-plan-card__amount-row`}>
              <p className={`ds-c-mgov-type--pair-title ds-c-mgov-plan-card__amount`}>$0.00</p>
              <div className={`ds-c-mgov-plan-card__stack`}>
                <span className="ds-c-mgov-type--text-link">
                  <Tooltip component={'a'} title={'Where you get your drugs'}>
                    Retail pharmacy:
                  </Tooltip>{' '}
                  Estimated total drug &amp; premium cost
                </span>
                <span className="ds-c-mgov-type--text-link">
                  Doesn&rsquo;t include: Health costs
                </span>
              </div>
            </div>
          </Section>

          <Section heading="Other costs" last>
            <div className={`ds-c-mgov-plan-card__cost-line`}>
              <p className={`ds-c-mgov-type--pair-title ds-c-mgov-plan-card__amount`}>$0.00</p>
              <span className={`ds-c-mgov-type--text-link `}>
                <Tooltip component={'a'} title={'Something about health deductibles.'}>
                  Health deductible
                </Tooltip>
              </span>
            </div>
            <div className={`ds-c-mgov-plan-card__cost-line`}>
              <p className={`ds-c-mgov-type--pair-title ds-c-mgov-plan-card__amount`}>$0.00</p>
              <span className={`ds-c-mgov-type--text-link `}>
                <Tooltip component={'a'} title={'Something about drug deductibles.'}>
                  Drug deductible
                </Tooltip>
              </span>
            </div>
            <span className={`ds-c-mgov-type--text-link `}>
              <Tooltip component={'a'} title={'Something about the maximum you will pay.'}>
                Maximum you pay for health services
              </Tooltip>
            </span>
            <p className="ds-c-mgov-type--pair-title">$13,300 in and out-of-network</p>
            <p className="ds-c-mgov-type--pair-title">$8,300 in-network</p>
            <p className="ds-c-mgov-type--pair-title">$13,300 out-of-network</p>
          </Section>
        </div>

        {/* Right */}
        <div className={`ds-c-mgov-plan-card__col`}>
          <Section heading="Plan benefits">
            <div className={`ds-c-mgov-plan-card__list`}>
              <BenefitRow yes>Vision</BenefitRow>
              <BenefitRow yes>Dental</BenefitRow>
              <BenefitRow yes>Hearing</BenefitRow>
              <BenefitRow yes={false}>Transportation</BenefitRow>
              <BenefitRow yes>Fitness benefits</BenefitRow>
            </div>
            <Button variation="ghost" size="small">
              See more benefits
            </Button>
          </Section>

          <Section heading="Copays / Coinsurance">
            <div className={`ds-c-mgov-plan-card__list`}>
              <span className="ds-c-mgov-type--body">Primary doctor: $0 copay</span>
              <span className="ds-c-mgov-type--body">Specialist: $45 copay</span>
            </div>
          </Section>

          <Section heading="Drugs">
            <div className={`ds-c-mgov-plan-card__list`}>
              <BenefitRow yes>Includes drug coverage</BenefitRow>
            </div>
            <Button variation="ghost" size="small">
              View drugs &amp; their costs
            </Button>
          </Section>

          <Section heading="Providers" last>
            <div className={`ds-c-mgov-plan-card__list`}>
              <BenefitRow yes>Charles MacCallum</BenefitRow>
              <BenefitRow yes>Diane Tucker</BenefitRow>
            </div>
            <Button variation="ghost" size="small">
              Get provider details
            </Button>
          </Section>
        </div>
      </div>

      {/* Footer actions */}
      <div className={`ds-c-mgov-plan-card__footer`}>
        <div className={`ds-c-mgov-plan-card__actions`}>
          <Button variation="solid" size="small">
            See plan details
          </Button>
          <Button size="small">Enroll</Button>
        </div>
        <ChoiceList
          name="add-to-compare"
          type="checkbox"
          label={<span className="ds-u-visibility--screen-reader">Compare this plan</span>}
          choices={[{ label: 'Add to compare', value: 'compare' }]}
        />
      </div>
    </article>
  );
}
