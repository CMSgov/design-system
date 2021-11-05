import { Language } from '../index';

export interface LogoProps {
  locale?: Language;
}

export class Logo extends React.Component<LogoProps, any> {
  render(): JSX.Element;
}

export default Logo;
