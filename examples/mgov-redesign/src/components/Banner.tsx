import type { ReactNode } from 'react';
import { Button } from './Button';
import '../styles/components/Banner.css';

export type BannerVariant = 'feature' | 'simple';

interface BannerProps {
  variant: BannerVariant;
  /** Accepts a node so callers can include line breaks, e.g. via `<br />`. */
  heading: ReactNode;
  body: ReactNode;
  buttonLabel: string;
  /** Image source for the `feature` variant. Falls back to a placeholder when omitted. */
  imageSrc?: string;
  /** Alt text for the `feature` variant image. */
  imageAlt?: string;
}

export function Banner({
  variant,
  heading,
  body,
  buttonLabel,
  imageSrc,
  imageAlt = '',
}: BannerProps) {
  if (variant === 'feature') {
    return (
      <div className="ds-c-banner ds-c-banner--feature">
        <div
          className="ds-c-banner__image"
          style={imageSrc ? undefined : { backgroundColor: '#c8d4d0' }}
        >
          {imageSrc && <img src={imageSrc} alt={imageAlt} />}
        </div>
        <div className="ds-c-banner__content">
          <div className="ds-c-banner__copy">
            <p className="ds-c-banner__heading ds-c-mgov-type--section-title">{heading}</p>
            <p className="ds-c-banner__body">{body}</p>
          </div>
          <Button variation="solid" size="big">
            {buttonLabel}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="ds-c-banner ds-c-banner--simple">
      <div className="ds-c-banner__copy">
        <p className="ds-c-banner__heading ds-c-mgov-type--section-title">{heading}</p>
        <p className="ds-c-banner__body">{body}</p>
      </div>
      <Button variation="solid" size="big">
        {buttonLabel}
      </Button>
    </div>
  );
}
