/* eslint-disable react/prefer-stateless-function */
/* eslint-disable filenames/match-exported */

import { Language } from '../index';

export interface FooterProps {
  className?: string;
  initialLanguage?: Language;
  primaryDomain?: string;
  footerTop?: React.ReactNode;
}

export class Footer extends React.Component<FooterProps, any> {
  render(): JSX.Element;
}

export default Footer;
