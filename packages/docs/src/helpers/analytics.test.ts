import { linkAnalytics, sendButtonAnalytics } from './analytics';
import { UtagContainer } from '@cmsgov/design-system';

describe('analytics', () => {
  let tealiumMock: jest.Mock;

  beforeEach(() => {
    tealiumMock = jest.fn();
    (window as any as UtagContainer).utag = { link: tealiumMock };
  });

  describe('sendButtonAnalytics', () => {
    it('sends the event when the button has no parent element', () => {
      const button = document.createElement('button');
      sendButtonAnalytics({ target: button } as unknown as React.MouseEvent<
        HTMLButtonElement,
        MouseEvent
      >);
      expect(tealiumMock).toHaveBeenCalledWith(
        expect.objectContaining({
          parent_component_heading: 'no value available',
          parent_component_type: 'no value available',
        })
      );
    });
  });

  describe('linkAnalytics', () => {
    it('sends the event when the link has no parent element', () => {
      const link = document.createElement('a');
      linkAnalytics({ target: link } as unknown as React.MouseEvent<HTMLAnchorElement, MouseEvent>);
      expect(tealiumMock).toHaveBeenCalledWith(
        expect.objectContaining({
          parent_component_heading: 'no value available',
          parent_component_type: 'no value available',
        })
      );
    });
  });
});
