/* eslint-disable react/prefer-stateless-function */
/* eslint-disable filenames/match-exported */

import React from 'react';
import { Language } from '../index';

interface Link {
  href: string;
  label: React.ReactNode;
  onClick?: (...args: any[]) => any;
}

export interface HeaderProps {
  className?: string;
  initialLanguage?: Language;
  switchLocaleLink?: string;
  loggedIn?: boolean;
  hideLoginLink?: boolean;
  hideLogoutLink?: boolean;
  hideLanguageSwitch?: boolean;
  firstName?: React.ReactNode;
  subpath?: string;
  primaryDomain?: string;
  skipNavHref?: string;
  onSkipNavClick?: (...args: any[]) => any;
  deConsumer?: boolean;
  deBrokerName?: string;
  links?: Link[];
  submenuTop?: React.ReactNode;
  submenuBottom?: React.ReactNode;
  headerBottom?: React.ReactNode;
}

export class Header extends React.Component<HeaderProps, any> {
  render(): JSX.Element;
}

export default Header;

interface DefaultLinks {
  'logged-in': Link[];
  'logged-out': Link[];
}

export function defaultMenuLinks(
  locale: Language,
  deConsumer: boolean,
  subpath: string,
  primaryDomain: string,
  switchLocaleLink?: string,
  hideLoginLink?: boolean,
  hideLogoutLink?: boolean,
  hideLanguageSwitch?: boolean,
  customLinksPassedIn?: boolean
): DefaultLinks;
