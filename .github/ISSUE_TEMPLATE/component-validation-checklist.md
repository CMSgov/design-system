---
name: Component validation checklist
about: To be completed before a component or pattern can be marked as "Ready" in the
  CMS Design System
title: ''
labels: ''
assignees: ''

---

# Component validation checklist

To be completed before a component or pattern can be marked as **Ready** in the CMS Design System.

## Documentation is complete

**What to check:**
- [ ] Description of component or pattern
- [ ] HTML code snippet example(s)
- [ ] React code snippet example(s)
- [ ] All React `props` are explained
- [ ] General guidance or best practices
- [ ] Usability - when to use
- [ ] Usability - when to consider something else
- [ ] Accessibility considerations

## Validate markup

**Check HTML:**
Use one of the following options to validate the HTML of the component. 

- [ ] Go to [validator.w3.org](https://validator.w3.org/#validate_by_input) paste your code in and make sure it validates without error.
- [ ] Test locally with [HTML Validator for Firefox](https://addons.mozilla.org/en-US/firefox/addon/html-validator/
- [ ] Test locally with [HTML Validator for Chrome](https://chrome.google.com/webstore/detail/html-validator/mpbelhhnfhfjnaehkcnnaknldmnocglk/related)

**Check accessibility:** 
- [ ] Test with the [axe plugin](https://www.deque.com/axe) for Google Chrome or Firefox.
  - Run the axe plugin on the component or pattern. You should not receive any violations. Best practices warnings like `Means to skip repeated blocks of content` or `No main section` are page-level warnings and can generally be ignored when developing new components.

## Screen reader testing

**What to check:**
- [ ] Windows: [IE11 + JAWS](https://webaim.org/articles/jaws/)
- [ ] Windows: [NVDA + Firefox](https://webaim.org/articles/nvda/)
  - **Note:** Recommended NVDA addon: https://addons.nvda-project.org/addons/focusHighlight.en.html 
- [ ] MacOS: Safari + VoiceOver - [How to](https://webaim.org/articles/voiceover/)

## Keyboard testing
Navigate the item using your keyboard
More details: https://webaim.org/techniques/keyboard

**What to check:**
- [ ] Navigate using **tab (navigate forward)** and **shift + tab (navigate backward)**
  - Keyboard focus indicators are present
  - Navigation order is logical and intuitive
- [ ] Links - Follow links by using **enter**
- [ ] Buttons - use **enter** or **spacebar** to click a button
- [ ] Checkbox - **spacebar** to check/uncheck
- [ ] Radio buttons - **up/down** arrows or **left/right** arrows to select an option
- [ ] Dropdowns - **up/down** arrows to navigate between options. **Spacebar** to open close select
- [ ] Autocomplete - **Type** to begin filtering. **up/down** arrows to navigate between options. **Enter** to select an option.
- [ ] Dialog/modal - **Esc** should close the window
  - Modal dialogs should maintain keyboard focus.
  - When a dialog closes, focus should usually return to the element that opened the dialog.
- [ ] Scroll - **up/down** arrows to scroll vertically. **Left/right** arrows to scroll horizontally. **Spacebar** scroll down or **shift + spacebar** to scroll up by page.

## Color blindness checks
View the component to check for visual issues. If you are using Google Chrome, [Colorblinding](https://chrome.google.com/webstore/detail/colorblinding/dgbgleaofjainknadoffbjkclicbbgaa?hl=en) or [ChromeLens](https://chrome.google.com/webstore/detail/chromelens/idikgljglpfilbhaboonnpnnincjhjkd/related?hl=en) are great plugins.

**What to check:**
- [ ] Red-Blind / Protanopia
- [ ] Green-Blind / Deuteranopia
- [ ] Blue-Blind / Tritanopia
- [ ] Red-Weak / Protanomaly
- [ ] Green-Weak / Deuteranomaly
- [ ] Blue-Weak / Tritanomaly
- [ ] Monochromacy / Achromatopsia
- [ ] Blue Cone Monochromacy / Achromatomaly

## 400% Zoom
Set your browser to 1280px width, and scale up to 400%
More details - https://www.w3.org/WAI/WCAG21/Understanding/reflow.html

**What to check:**
- [ ] Still usable at 400% increase in size
- [ ] Content does not overlap or force users to scroll horizontally
  - **Note:** Some content is OK to scroll horizontally - images, maps, diagrams, video, games, presentations, data tables, and interfaces where it is necessary to keep toolbars in view while manipulating content
- [ ] All content is available
