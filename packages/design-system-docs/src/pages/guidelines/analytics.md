---
title: Analytics
---

The design system analytics is available at the React component level. React component with build-in <span class="ds-c-badge ds-c-badge--info ds-u-color--white">Analytics</span> will have event tracking enabled by default and applications may override the data value or disable the tracking via the analytics property.

For example, to disable Alert analytics event tracking:

```jsx
import { Alert } from '{{npm}}';

export default function () {
  return;
  <Alert heading="Status heading" variation="error" analytics={{ onComponentDidMount: false }}>
    <p className="ds-c-alert__text">This is a React Alert component.</p>
  </Alert>;
}
```

Applications that adopt the design system can setup standardized set of metrics and reporting by having easy-to-reference definitions that are inline with the system.
