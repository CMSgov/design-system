import classnames from 'classnames';

interface LogoProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  width?: string;
}

/**
 * We use a Babel loader to turn SVG imports into strings.
 * This component renders those strings.
 *
 * Do not add a title to the `<a>` tag as a substitute for alt
 * text on the linked images. It is a best practice to include
 * a `<title>` tag inside the SVG to provide the text that will
 * be read out to assistive devices. This text is a functional
 * equivalent to `alt` text in a standard `<img />` tag.
 *
 * See https://css-tricks.com/accessible-svgs/ for guidance on
 * creating accessible SVG files. At a minimum you will need to
 * have the following elements in your SVG files:
 *
 * 1. `aria-labelledby="TITLE_ID"` attribute in the `<svg>` tag
 * 2. role="img" attribute in the `<svg>` tag
 * 3. focusable="false" attribute in the `<svg>` tag
 * 4. `<title id="TITLE_ID"> Description of the image link here </title>`
 *
 */

const Logo = (props: LogoProps) => {
  const style: any = {};

  if (props.width) {
    style.width = props.width;
  }

  return (
    <a
      className={classnames('hc-c-footer__logo ds-u-display--inline-block', props.className)}
      href={props.href}
      style={style}
    >
      {props.children}
    </a>
  );
};

export default Logo;
