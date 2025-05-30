import { TooltipProps } from './Tooltip';
import { config } from '../config';
import { getAnalyticsContentFromRefs, eventExtensionText } from '../analytics';
import { useRef } from 'react';

export default function useTooltipAnalytics({
  analytics,
  analyticsLabelOverride,
  onAnalyticsEvent = config().defaultAnalyticsFunction,
}: TooltipProps) {
  const contentRef = useRef();

  function sendTooltipEvent() {
    if (analytics !== true && (!config().tooltipSendsAnalytics || analytics === false)) {
      return;
    }

    const tooltipText = analyticsLabelOverride ?? getAnalyticsContentFromRefs([contentRef]);

    return onAnalyticsEvent({
      event_name: 'tooltip_viewed',
      event_extension: eventExtensionText,
      text: tooltipText,
    });
  }

  return { contentRef, sendTooltipEvent };
}
