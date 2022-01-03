/* eslint-disable react/prefer-stateless-function */
/* eslint-disable filenames/match-exported */

import React from 'react';
import { Language } from '../index';

interface Link {
  href: string;
  label: React.ReactNode;
  onClick?: (...args: any[]) => any;
}

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
