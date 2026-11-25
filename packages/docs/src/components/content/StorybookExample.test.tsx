jest.mock('gatsby', () => ({ withPrefix: (path: string) => path }));
import { fireEvent, render, screen } from '@testing-library/react';
import StorybookExample from './StorybookExample';

describe('StorybookExample', () => {
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('does not throw when it is removed before the content has a height', () => {
    jest.useFakeTimers();
    // The height retry gives up with a logged timeout; the assertion is that nothing throws.
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { unmount } = render(
      <StorybookExample componentName="Button" storyId="components-button--default" theme="core" />
    );

    // jsdom never loads the story, so give the frame the empty body a browser has at `load`
    const iframe = screen.getByTitle<HTMLIFrameElement>('Button example');
    const frameDocument = iframe.contentDocument!;
    frameDocument
      .appendChild(frameDocument.createElement('html'))
      .appendChild(frameDocument.createElement('body'));

    fireEvent.load(iframe);
    unmount();

    expect(() => jest.advanceTimersByTime(2200)).not.toThrow();

    consoleError.mockRestore();
  });
});
