import { AnalyticsEvent, sendLinkEvent } from './SendAnalytics';
import { useEffect } from 'react';

export interface AnalyticsProps {
  event: AnalyticsEvent;
  unmountEvent?: AnalyticsEvent;
}

export default function Analytics({ event, unmountEvent }: AnalyticsProps) {
  useEffect(() => {
    sendLinkEvent(event);

    if (unmountEvent) {
      return () => {
        sendLinkEvent(unmountEvent);
      };
    }
  }, [event, unmountEvent]);
}
