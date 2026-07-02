import { ChoiceList } from '@cmsgov/design-system';
import { Button } from './Button';
import { TextField } from './TextField';
import '../styles/components/Newsletter.css';

/**
 * Medicare.gov redesign — Newsletter signup pattern (Figma node 2080:16688).
 *
 * A dark-green band with a title + supporting copy on the left and an email
 * form on the right. Composed entirely from existing pieces: the mgov
 * `TextField` (label + input) and `Button` (solid / small — the Figma 44px
 * spec), the DS `ChoiceList` (consent checkbox, per the PlanCard-footer
 * pattern), and `.ds-c-mgov-type--featured-title` for the heading. Layout and
 * on-dark recoloring live in styles/components/Newsletter.css, with spacing on
 * the DS --spacer 8px cadence.
 */

const B = 'ds-c-mgov-newsletter';

export function Newsletter() {
  return (
    <section className={B}>
      <div className={`${B}__title`}>
        <h2 className={`ds-c-mgov-type--featured-title ${B}__heading`}>
          Important updates, straight to your inbox
        </h2>
        <p className={`${B}__subtitle`}>
          Get reminders about Open Enrollment, ways to save costs, and more.
        </p>
      </div>

      <form className={`${B}__form`} onSubmit={(event) => event.preventDefault()}>
        <TextField
          name="newsletter-email"
          type="email"
          label="Email address"
          placeholder="name@example.com"
        />
        <div className={`${B}__consent`}>
          <ChoiceList
            name="newsletter-consent"
            type="checkbox"
            label={<span className="ds-u-visibility--screen-reader">Consent</span>}
            choices={[
              {
                label: (
                  <>
                    By checking this box, you consent to our{' '}
                    <a
                      href="https://www.medicare.gov/privacy-policy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      data privacy policy
                    </a>
                    .
                  </>
                ),
                value: 'consent',
              },
            ]}
          />
        </div>
        <Button variation="solid" size="small" type="submit">
          Next step
        </Button>
      </form>
    </section>
  );
}
