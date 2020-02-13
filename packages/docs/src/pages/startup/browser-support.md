---
title: Browser support
weight: 5
---

The CMS design system follows the [2% rule](https://gds.blog.gov.uk/2012/01/25/support-for-browsers/): we officially support any browser above 2% usage as observed by [analytics.usa.gov](https://analytics.usa.gov/). **Currently, this means that the newest versions of Chrome, Firefox, Safari, Internet Explorer 11, Edge, and Samsung Internet are supported.**

The CMSDS is designed to be compatible with different operating systems and browser versions in order to provide a broad range of support. Progressive enhancement and graceful degredation methodologies are used to accomplish this.

## Progressive enhancement

Progressive enhancement provides an accessible alternative to HTML content served by the UI. It should be seen as an alternative to graceful degradation, where older browsers with less features simply omit content that they are unable to render. With progressive enhancement, a basic presentable view of the content is always available, then any additions that may not be fully supported for all end users are added to it.

In developing scripts and style sheets, the first implementation should be one that works across all browsers and with as few technical dependencies as possible. Once features are added, it ensures each of them is a progressive enhancement to the basic version available to all users.

## Graceful degradation

Graceful degradation is the process of deciding how a site should fit smaller screens or less feature-rich browsers. The CMSDS uses CSS and JavaScript to enable older browsers to best render the website and UI components. The CMSDS provides styling and assistive code for disabled visitors viewing the site or UI components with specific solutions for screen readers and other assistive technology.
