---
title: Analytics
---

The design system's React components have build-in analytics tracking patterns. Default analytics events at the component level are tracked and applications have the option to override the data value or disable the tracking.

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
