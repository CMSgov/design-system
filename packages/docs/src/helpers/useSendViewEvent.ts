import { useEffect } from 'react';
import { UtagContainer } from '@cmsgov/design-system';
import { sendViewEvent } from '@cmsgov/design-system';

function useSendViewEvent() {
  useEffect(() => {
    if (window && (window as UtagContainer)?.utag) {
      let env = 'prod';

      // We can define environment names as we wish
      // github-demo is a demo deployment off of a specific branch.
      switch (location.hostname) {
        case 'localhost':
          env = 'dev';
          break;
        case 'cmsgov.github.io':
          env = 'github-demo';
          break;
        case 'design.cms.gov':
          env = 'prod';
          break;
        default:
          env = 'prod';
      }

      const analyticsPayload = {
        content_language: 'en',
        content_type: 'html',
        logged_in: 'false',
        page_name: 'Page not found - CMS Design System',
        page_type: 'true', //If page is a 404 (error page) this is set to true, otherwise it is false
        site_environment: env, //Used to include or exclude traffic from different testing environments. Ex: test, test0, imp, production
        site_section: 'Page not found - CMS Design System',
      } as any;

      sendViewEvent(analyticsPayload);
    }
  }, []);
}

export default useSendViewEvent;
