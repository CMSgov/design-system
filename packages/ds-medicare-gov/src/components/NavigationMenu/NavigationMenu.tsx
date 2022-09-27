import { Button } from '@cmsgov/design-system';
import { Close } from '../Icons';
import React from 'react';
import uniqueId from 'lodash/uniqueId';
import { MenuIconThin } from '@cmsgov/design-system';

export interface NavigationMenuProps {
  alwaysShowMenuButton?: boolean;
  children?: React.ReactNode;
}

export interface NavigationMenuState {
  menuOpen: boolean;
}

export default class NavigationMenu extends React.PureComponent<
  NavigationMenuProps,
  NavigationMenuState
> {
  id: string;
  constructor(props: NavigationMenuProps) {
    super(props);

    this.state = { menuOpen: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.id = uniqueId('navigationMenuButton_');
  }

  toggleMenu(): void {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

  render(): React.ReactElement<NavigationMenu> {
    const containerClasses = `m-c-navigationMenu__container ${
      this.props.alwaysShowMenuButton ? 'm-c-navigationMenu__container--alwaysShowMenuButton' : ''
    }`;

    const navClasses = `m-c-navigationMenu ${
      this.state.menuOpen ? 'm-c-navigationMenu--open' : ''
    }`;

    return (
      <div className={containerClasses}>
        <div className="m-c-navigationMenu__toggleContainer">
          <Button
            id={this.id}
            aria-expanded={this.state.menuOpen ? true : false}
            aria-haspopup="true"
            aria-owns="menu-container"
            className="m-c-navigationMenu__mobileToggle"
            onClick={this.toggleMenu}
            variation="ghost"
          >
            {this.state.menuOpen ? (
              <Close />
            ) : (
              <MenuIconThin className="ds-c-icon-color--primary" />
            )}
          </Button>
        </div>
        <nav role="navigation" id="menu-container" aria-labelledby={this.id} className={navClasses}>
          <ul className="m-c-navigationMenu__list">{this.props.children}</ul>
        </nav>
      </div>
    );
  }
}
