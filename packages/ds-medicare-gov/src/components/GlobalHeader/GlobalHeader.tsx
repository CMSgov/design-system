import React, { PureComponent, RefObject, createRef } from 'react';
import MedicaregovLogo from './../MedicaregovLogo/MedicaregovLogo';
import { Button } from '@cmsgov/design-system';
import { Caret, Close, Hamburger } from '../Icons';

interface GlobalHeaderProps {
  menuButtonAriaLabel?: string;
  productName?: string;
  productLink?: string;
  logoCallback?: () => void;
  variation?: string;
  noBorder?: boolean;
  actions: {
    text: string | JSX.Element;
    callback?: (...args: any[]) => any;
    menuPanel?: JSX.Element;
    hide?: boolean;
    props?: { [index: string]: any };
  }[];
}

interface GlobalHeaderState {
  menuOpen: boolean;
  currentPanel?: JSX.Element;
}

interface GlobalHeaderMenuProps {
  text: string | JSX.Element;
  panel: JSX.Element;
  mobile?: boolean;
  srOnly?: string;
  onClick?: () => void;
}

interface GlobalHeaderMenuState {
  open: boolean;
}

class GlobalHeaderMenu extends PureComponent<GlobalHeaderMenuProps, GlobalHeaderMenuState> {
  private menuRef: RefObject<HTMLDivElement>;

  constructor(props: GlobalHeaderMenuProps) {
    super(props);

    this.state = { open: false };
    this.menuRef = createRef();
  }

  render() {
    const { mobile, onClick, srOnly } = this.props;

    return (
      <div className="m-c-globalHeader__dropdownContainer">
        <Button
          className={`m-c-globalHeader__dropdownButton ${
            this.state.open ? 'm-c-globalHeader__dropdownButton--opened' : ''
          }`}
          onClick={
            onClick ||
            (() => {
              this.setState(
                {
                  ...this.state,
                  open: !this.state.open,
                },
                () => {
                  if (!mobile && this.menuRef.current) {
                    const { x: menuX } = this.menuRef.current.getBoundingClientRect();

                    const { clientWidth: menuWidth } = this.menuRef.current;

                    const { clientWidth: bodyWidth } = document.body;

                    if (menuX + menuWidth >= bodyWidth) {
                      const total = menuX + menuWidth;
                      const excess = bodyWidth - total;

                      this.menuRef.current.style.left = `${excess - 24}px`;
                    }
                  }
                }
              );
            })
          }
        >
          {this.props.text}
          {mobile ? (
            <Caret right={true} />
          ) : (
            <>
              <Caret up={this.state.open} /> {srOnly && <span className="sr-only">{srOnly}</span>}
            </>
          )}
        </Button>
        {this.state.open && !mobile && (
          <div className="m-c-globalHeader__dropdownMenu" tabIndex={0} ref={this.menuRef}>
            {this.props.panel}
          </div>
        )}
      </div>
    );
  }
}

export default class GlobalHeader extends PureComponent<GlobalHeaderProps, GlobalHeaderState> {
  constructor(props: GlobalHeaderProps) {
    super(props);
    this.state = { menuOpen: false, currentPanel: null };
  }

  render() {
    const {
      menuButtonAriaLabel,
      productName,
      productLink,
      actions,
      variation,
      noBorder,
      logoCallback,
    } = this.props;

    const { menuOpen, currentPanel } = this.state;

    return (
      <header
        className={`m-c-globalHeader ${variation ? `m-c-globalHeader--${variation}` : ''} ${
          noBorder ? `m-c-globalHeader--no-border` : ''
        }`}
      >
        <div className="m-c-globalHeader__top">
          <div className="m-c-globalHeader__logo">
            <a href="https://medicare.gov" onClick={logoCallback}>
              <MedicaregovLogo width="199" height="35" />
            </a>
            {productName && (
              <div className="m-c-globalHeader__productNameDesktop">
                {productLink ? (
                  <a className="m-c-globalHeader__productName" href={productLink}>
                    {productName}
                  </a>
                ) : (
                  <h4 className="m-c-globalHeader__productName">{productName}</h4>
                )}
              </div>
            )}
          </div>
          <div className="m-c-globalHeader__actions">
            <nav className="m-c-globalHeader__actionsNav ds-u-display--none ds-u-md-display--block">
              <ul className="m-c-globalHeader__actionsList ds-c-list--bare ds-u-display--flex ds-u-align-items--center">
                {actions.map((action, index) => {
                  let el = null;

                  if (action.menuPanel) {
                    el = (
                      <GlobalHeaderMenu key={index} text={action.text} panel={action.menuPanel} />
                    );
                  } else {
                    el = (
                      <Button
                        className="m-c-globalHeader__actionButton ds-c-button--transparent"
                        onClick={action.callback}
                        {...action.props}
                      >
                        {action.text}
                      </Button>
                    );
                  }

                  return action.hide ? <></> : <li key={index}>{el}</li>;
                })}
              </ul>
            </nav>
            <Button
              aria-label={menuButtonAriaLabel || 'Navigation Menu'}
              aria-expanded={menuOpen}
              className="m-c-globalHeader__openMenu"
              variation="ghost"
              onClick={(): void => this.setState({ menuOpen: !menuOpen })}
            >
              {menuOpen ? <Close /> : <Hamburger />}
            </Button>
          </div>
        </div>

        {menuOpen && (
          <div className="m-c-globalHeader__mobileMenu">
            {productName && (
              <>
                {productLink ? (
                  <a className="m-c-globalHeader__productName" href={productLink}>
                    {productName}
                  </a>
                ) : (
                  <h4 className="m-c-globalHeader__productName">{productName}</h4>
                )}
              </>
            )}
            {currentPanel ? (
              <div className="m-c-globalHeader__mobilePanel">
                <Button
                  className="m-c-globalHeader__mobilePanelBackButton"
                  onClick={() => this.setState({ ...this.state, currentPanel: null })}
                >
                  <Caret left={true} /> Back
                </Button>
                {currentPanel}
              </div>
            ) : (
              <nav>
                <ul className="ds-c-list--bare">
                  {actions.map((action, index) => {
                    let el = null;

                    if (action.menuPanel) {
                      el = (
                        <GlobalHeaderMenu
                          key={index}
                          text={action.text}
                          panel={action.menuPanel}
                          mobile={true}
                          onClick={() =>
                            this.setState({
                              ...this.state,
                              currentPanel: action.menuPanel,
                            })
                          }
                        />
                      );
                    } else {
                      el = (
                        <Button
                          className="m-c-globalHeader__mobileMenuButton"
                          onClick={action.callback}
                          {...action.props}
                        >
                          {action.text}
                        </Button>
                      );
                    }

                    return action.hide ? (
                      <></>
                    ) : (
                      <li key={index} className="ds-u-margin-top--2">
                        {el}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
          </div>
        )}
      </header>
    );
  }
}
