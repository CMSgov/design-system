import { render, screen, waitFor } from '@testing-library/preact';
import userEvent from '@testing-library/user-event';
import './ds-simple-footer';

function renderFooter(props = {}) {
  return render(<ds-simple-footer {...props} />);
}

describe('SimpleFooter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renders without crashing', async () => {
    const { asFragment } = renderFooter({ 'about-medicare-label': 'About Medicare' });
    expect(asFragment()).toMatchSnapshot();
    expect(screen.getByText(/About Medicare/i)).toBeInTheDocument();
  });

  it('calls ds-click-link-analytics when a link is clicked', async () => {
    const mockAnalyticsCallback = jest.fn();

    renderFooter({ 'about-medicare-label': 'About Medicare' });

    const footer = document.querySelector('ds-simple-footer');
    expect(footer).toBeInTheDocument();

    footer?.addEventListener('ds-click-link-analytics', mockAnalyticsCallback);

    const link = screen.getByText(/About Medicare/i);
    await userEvent.click(link);

    expect(mockAnalyticsCallback).toHaveBeenCalledTimes(1);

    const event = mockAnalyticsCallback.mock.calls[0][0];
    expect(event.detail.url).toBe('https://www.medicare.gov/about-us');

    footer?.removeEventListener('ds-click-link-analytics', mockAnalyticsCallback);
  });
});
