import Alert, { AlertProps } from './Alert';
import { UtagContainer } from '../analytics';
import { config } from '../config';
import { render, screen } from '@testing-library/react';

const defaultText = 'Ruhroh';

function renderAlert(props: AlertProps = {}) {
  // eslint-disable-next-line react/no-children-prop
  return render(<Alert children={defaultText} {...props} />);
}

function expectHasClass(className: string, role = 'region') {
  expect(screen.getByRole(role).className).toContain(className);
}

describe('Alert', function () {
  it('renders alert', () => {
    renderAlert({ id: 'static-id' });
    const alert = screen.getByRole('region');
    expect(alert).toMatchSnapshot();
  });

  it('renders a heading', () => {
    const heading = 'Error';
    renderAlert({ heading });
    expect(screen.getByText(heading).textContent).toEqual(heading);
  });

  it('appears as an error', () => {
    renderAlert({ variation: 'error' });
    expectHasClass('ds-c-alert--error', 'alert');
  });

  it('appears as a lightweight alert', () => {
    renderAlert({ weight: 'lightweight' });
    expectHasClass('ds-c-alert--lightweight');
  });

  it('assigns role="status" for success variation', () => {
    renderAlert({ variation: 'success' });
    const alert = screen.getByRole('status');
    expect(alert).toBeInTheDocument();
  });

  it('assigns role="alert" for warn variation', () => {
    renderAlert({ variation: 'warn' });
    const alert = screen.getByRole('alert');
    expect(alert).toBeInTheDocument();
  });

  it('uses explicitly provided role prop over variation-based role', () => {
    renderAlert({ variation: 'success', role: 'alertdialog' });
    const alert = screen.getByRole('alertdialog');
    expect(alert).toBeInTheDocument();
  });

  it('renders additional className and role prop', () => {
    const className = 'ds-u-test';
    const role = 'alert';
    renderAlert({ className, role });
    expect(screen.getByRole(role).className).toContain(className);
  });

  it('renders HTML children', () => {
    renderAlert({ children: <p className="ds-text-body--md">{defaultText}</p> });
    const alert = screen.getByRole('region');
    expect(alert.textContent).toContain(defaultText);
  });

  it('hides icon', () => {
    renderAlert({ hideIcon: true });
    expectHasClass('ds-c-alert--hide-icon');
  });

  it('sets tabIndex when autoFocus is passed', () => {
    renderAlert({ autoFocus: true });
    const alert = screen.getByRole('region');
    expect(alert.tabIndex).toBe(-1);
  });

  it('sets tabIndex when alertRef is passed', () => {
    const alertRef = jest.fn();
    renderAlert({ alertRef });
    const alert = screen.getByRole('region');
    expect(alert.tabIndex).toBe(-1);
    expect(alertRef).toHaveBeenCalled();
  });

  it('renders additional attributes', () => {
    const ariaLabel = 'additional aria alert';
    renderAlert({ 'aria-label': ariaLabel });
    const alert = screen.getByLabelText(ariaLabel);
    expect(alert).toBeInTheDocument();
  });

  describe('a11y labels', () => {
    it('renders default a11y label', () => {
      renderAlert();
      expect(screen.getByText('Notice:')).toBeInTheDocument();
    });

    it('renders error a11y label', () => {
      renderAlert({ variation: 'error' });
      expect(screen.getByText('Alert:')).toBeInTheDocument();
    });

    it('renders success a11y label', () => {
      renderAlert({ variation: 'success' });
      expect(screen.getByText('Success:')).toBeInTheDocument();
    });

    it('renders warn a11y label', () => {
      renderAlert({ variation: 'warn' });
      expect(screen.getByText('Warning:')).toBeInTheDocument();
    });

    it('points aria-labelledby to heading', () => {
      const heading = 'Elvis has left the building';
      renderAlert({ heading, variation: 'error' });
      const alert = screen.getByRole('alert');
      const id = alert.getAttribute('aria-labelledby');
      expect(alert.querySelector(`#${id}`).textContent).toContain(`Alert: ${heading}`);
    });

    it('falls back aria-labelledby to a11y label when no heading is provided', () => {
      renderAlert();
      const alert = screen.getByRole('region');
      const id = alert.getAttribute('aria-labelledby');
      expect(alert.querySelector(`#${id}`).textContent).toContain('Notice');
    });
  });

  describe('Analytics event tracking', () => {
    let tealiumMock;

    beforeEach(() => {
      config({ alertSendsAnalytics: true });
      tealiumMock = jest.fn();
      (window as any as UtagContainer).utag = {
        link: tealiumMock,
      };
    });

    afterEach(() => {
      config({ alertSendsAnalytics: false });
      jest.resetAllMocks();
    });

    it('sends analytics event with heading', () => {
      const heading = 'Ahhh!';
      renderAlert({ heading, variation: 'error' });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });

    it('sends analytics event with body-content fallback', () => {
      renderAlert({ variation: 'warn' });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });

    it('sends analytics event for default/informational variation', () => {
      renderAlert();
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toBeCalled();
    });

    it('disables analytics tracking', () => {
      renderAlert({ heading: 'dialog heading', variation: 'error', analytics: false });
      expect(tealiumMock).not.toBeCalled();
    });

    it('setting analytics to true overrides flag value', () => {
      config({ alertSendsAnalytics: false });
      renderAlert({ heading: 'dialog heading', variation: 'error', analytics: true });
      expect(tealiumMock).toHaveBeenCalled();
    });

    it('overrides analytics event content', () => {
      renderAlert({ variation: 'success', analyticsLabelOverride: 'other heading' });
      expect(tealiumMock.mock.lastCall).toMatchSnapshot();
      expect(tealiumMock).toHaveBeenCalledTimes(1);
    });
  });
});
