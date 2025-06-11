import { TooltipProps } from './Tooltip';
import { config } from '../config';
import { getAnalyticsContentFromRefs, eventExtensionText } from '../analytics';
import { useRef } from 'react';

export default function useTooltipAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
  ariaLabel,
  triggerAriaLabel,
}: TooltipProps) {
  const contentRef = useRef<HTMLElement>();

  function sendTooltipEvent() {
    if (analytics !== true && (!config().tooltipSendsAnalytics || analytics === false)) {
      return;
    }

    // In the case where an icon is supplied there won't be any internal text of the tooltip trigger.
    // So, getAnalyticsContentFromRefs will return undefined. In that case, grab the aria label for the trigger.
    // In the case of webcomponents, we need to grab the triggerAriaLabel.
    const tooltipText =
      analyticsLabelOverride ??
      getAnalyticsContentFromRefs([contentRef]) ??
      ariaLabel ??
      triggerAriaLabel;

    return onAnalyticsEvent({
      event_name: 'tooltip_viewed',
      event_extension: eventExtensionText,
      text: tooltipText,
    });
  }

  return { contentRef, sendTooltipEvent };
}
