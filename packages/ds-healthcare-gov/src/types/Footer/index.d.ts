import { Language } from '../index';

export interface FooterProps {
  className?: string;
  initialLanguage?: Language;
  primaryDomain?: string;
}

export class Footer extends React.Component<FooterProps, any> {
  render(): JSX.Element;
}

export default Footer;
