import { FC, PropsWithChildren } from 'react';
import { ThirdPartyExternalLink } from '@cmsgov/design-system';
import { LocationInterface } from 'src/helpers/graphQLTypes';

const SVGLinkIcon = () => (
  <span>
    <svg
      aria-hidden="true"
      focusable="false"
      height="16"
      version="1.1"
      viewBox="0 0 16 16"
      width="16"
    >
      <path
        fillRule="evenodd"
        d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
      ></path>
    </svg>
  </span>
);

interface RelativeLinkProps extends PropsWithChildren {
  /**
   *  Heading type to override default `<h2>`.
   */
  headingLevel?: '1' | '2' | '3' | '4' | '5' | '6';
  /**
   *   A string containing the path of the URL for the location
   */
  pathname: string;
}

const RelativeLink: FC<RelativeLinkProps> = ({ children, headingLevel = '2', pathname }) => {
  const HeadingTag = `h${headingLevel}` as const;
  const text = children.toString().toLowerCase();

  const ariaLabel = `${text} permalink`;
  const relativeLink = text.replace(' ', '-');
  const href = `${pathname}#${relativeLink}`;

  return (
    <HeadingTag id={relativeLink} style={{ position: 'relative' }}>
      <a aria-label={ariaLabel} className="anchor before" href={href} data-listener-attached={true}>
        <SVGLinkIcon />
      </a>
      {children}
    </HeadingTag>
  );
};

const ColorContrastGuidelines = ({ location }: { location: LocationInterface }) => {
  const { origin, pathname } = location;

  return (
    <>
      <RelativeLink pathname={pathname}>Accessibility considerations</RelativeLink>
      <RelativeLink headingLevel="3" pathname={pathname}>
        Text contrast
      </RelativeLink>
      <p>
        WCAG 2.0+ AA requires a contrast ratio of a minimum of 4.5:1 for normal, or body, text.
        Large text is easier to read, so the contrast requirement is reduced to 3:1. WCAG defines
        large text as text that is 24px and larger or 18.5px and larger if it is bold.
      </p>
      <p>Text over gradients and background images still need to meet contrast requirements.</p>
      <RelativeLink headingLevel="3" pathname={pathname}>
        Non-text contrast
      </RelativeLink>
      <p>
        Elements that are not text, but still important, including buttons, icons that convey
        information, data visualizations (charts and graphs), and form inputs need a contrast ratio
        of at least 3:1. Also included in this are states of elements such as the selected state of
        an element, expanded vs. collapsed, active vs. inactive, elements with keyboard focus, etc.
      </p>
      <RelativeLink headingLevel="3" pathname={pathname}>
        Easily test your color combinations
      </RelativeLink>
      <p>
        Note that the colors listed only display colors that are available but when you are pairing
        colors together, make sure the color contrast ratio is sufficient. Here are three tools we
        suggest for testing color contrast:
      </p>
      <p>
        <ThirdPartyExternalLink
          origin={origin}
          href="https://webaim.org/resources/contrastchecker/"
        >
          WebAIM Color Contrast Checker
        </ThirdPartyExternalLink>
      </p>
      <p>
        <ThirdPartyExternalLink origin={origin} href="https://dequeuniversity.com/color-contrast">
          Deque Color Contrast Analyzer
        </ThirdPartyExternalLink>
      </p>
      <p>
        <ThirdPartyExternalLink origin={origin} href="https://www.tpgi.com/color-contrast-checker/">
          Color Contrast Analyzer by TPGi
        </ThirdPartyExternalLink>
      </p>
    </>
  );
};

export default ColorContrastGuidelines;
