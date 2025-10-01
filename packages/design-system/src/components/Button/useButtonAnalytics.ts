import { ButtonProps } from './Button';
import { config } from '../config';
import { getAnalyticsContentFromRefs, eventExtensionText } from '../analytics';
import { useRef } from 'react';

export default function useButtonAnalytics({
  analytics,
  analyticsLabelOverride,
  analyticsParentHeading,
  analyticsParentType,
  href,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
  type,
  variation,
}: ButtonProps) {
  const contentRef = useRef(null);

  function sendButtonEvent() {
    if (analytics !== true && (!config().buttonSendsAnalytics || analytics === false)) {
      return;
    }

    const buttonText = analyticsLabelOverride ?? getAnalyticsContentFromRefs([contentRef]);
    const buttonStyle = variation ?? 'default';
    const buttonType = type ?? 'button';
    const buttonParentHeading = analyticsParentHeading ?? ' ';
    const buttonParentType = analyticsParentType ?? ' ';

    return onAnalyticsEvent({
      event_name: 'button_engagement',
      event_extension: eventExtensionText,
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
