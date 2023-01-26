import { ButtonProps } from './Button';
import { buttonSendsAnalytics } from '../flags';
import {
  defaultAnalyticsFunction,
  EventCategory,
  EventType,
  getAnalyticsContentFromRefs,
} from '../analytics';
import { useRef } from 'react';

export default function useButtonAnalytics({
  analytics,
  analyticsLabelOverride,
  analyticsParentHeading,
  analyticsParentType,
  href,
  onAnalyticsEvent = defaultAnalyticsFunction,
  type,
  variation,
}: ButtonProps) {
  const contentRef = useRef();

  function sendButtonEvent() {
    if (analytics !== true && (!buttonSendsAnalytics() || analytics === false)) {
      return;
    }

    const buttonText = analyticsLabelOverride ?? getAnalyticsContentFromRefs([contentRef]);
    const buttonStyle = variation ?? 'default';
    const buttonType = type ?? 'button';
    const buttonParentHeading = analyticsParentHeading ?? ' ';
    const buttonParentType = analyticsParentType ?? ' ';

    return onAnalyticsEvent({
      event_name: 'button_engagement',
      event_type: EventType.UI_INTERACTION,
      event_category: EventCategory.UI_INTERACTION,
      event_action: `engaged ${buttonStyle} button`,
      event_label: href ? `${buttonText}: ${href}` : buttonText,
      text: buttonText,
      button_style: buttonStyle,
      button_type: href ? 'link' : buttonType,
      parent_component_heading: buttonParentHeading,
      parent_component_type: buttonParentType,
      ...(href ? { link_url: href } : {}),
    });
  }

  return { contentRef, sendButtonEvent };
}
