import { Card } from '@cmsgov/design-system';
import { Button } from './Button';
import '../styles/components/FeatureCard.css';

export type FeatureCardVariant = 'small' | 'large';

interface FeatureCardProps {
  variant: FeatureCardVariant;
  title: string;
  body: string;
  /** CTA text. Rendered as an underlined link on `small`, a shared Button on `medium`/`large`. */
  ctaLabel: string;
  /** Image source. Falls back to a placeholder when omitted. */
  imageSrc?: string;
  /** Alt text for the image. */
  imageAlt?: string;
}

export function FeatureCard({
  variant,
  title,
  body,
  ctaLabel,
  imageSrc,
  imageAlt = '',
}: FeatureCardProps) {
  return (
    <Card className={`ds-c-feature-card ds-c-feature-card--${variant}`}>
      <div
        className="ds-c-feature-card__image"
        style={imageSrc ? undefined : { backgroundColor: '#c8d4d0' }}
      >
        {/* Remove fallback when sharing out. */}
        {imageSrc && <img src={imageSrc} alt={imageAlt} />}
      </div>
      <div className="ds-c-feature-card__content">
        <p className="ds-c-feature-card__title">{title}</p>
        <p className="ds-c-feature-card__body">{body}</p>
        {variant === 'small' ? (
          <a href="#" className="ds-c-feature-card__link">
            <span className="ds-c-feature-card__link-text">{ctaLabel}</span>
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          // Large CTA uses the shared Button (filled green) — no FeatureCard-specific
          // button styling, so the Button stays independent of the FeatureCard.
          <Button variation="solid" size="big">
            {ctaLabel}
          </Button>
        )}
      </div>
    </Card>
  );
}
