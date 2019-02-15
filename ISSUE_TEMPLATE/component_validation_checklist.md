# Component validation checklist

- [ ] Documentation is complete. [Documentation writing info](#)
  -  What to do:
    - Read through documentation and make sure the following is done
      - [ ] Description of component or pattern
      - [ ] HTML code snippet example(s)
      - [ ] React code snippet example(s)
      - [ ] All react properties are explained
      - [ ] Guidance on when to use this item
      - [ ] Guidance on when not to use this item
      - [ ] Accessibility considerations

- [ ] Validate HTML
  - What to do:
    - Go to [validator.w3.org](https://validator.w3.org/#validate_by_input) paste your code in and make sure it validates without error.

- [ ] Keyboard testing
  - What to do:
    - Navigate the item using your Keyboard
  - What to check:
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
    - [ ] Tabs - **Tab** once to navigate into the group of tabs and once to navigate out of the group of tabs. **up/down** arrows or **left/right** arrows to move through tabs.
    - [ ] Scroll - **up/down** arrows to scroll vertically. **Left/right** arrows to scroll horizontally. **Spacebar** scroll down or **shift + spacebar** to scroll up by page.


- [ ] Color blindness checks
  - What to do:
      - View the component to check for visual issues. If using Google Chrome [Colorblinding](https://chrome.google.com/webstore/detail/colorblinding/dgbgleaofjainknadoffbjkclicbbgaa?hl=en) or [ChromeLens](https://chrome.google.com/webstore/detail/chromelens/idikgljglpfilbhaboonnpnnincjhjkd/related?hl=en) are great plugins.
  - What to check:
      - [ ] Red-Blind / Protanopia
      - [ ] Green-Blind / Deuteranopia
      - [ ] Blue-Blind / Tritanopia
      - [ ] Red-Weak / Protanomaly
      - [ ] Green-Weak / Deuteranomaly
      - [ ] Blue-Weak / Tritanomaly
      - [ ] Monochromacy / Achromatopsia
      - [ ] Blue Cone Monochromacy / Achromatomaly


- [ ] 400% Zoom
  - What to do:
      - Set your browser to 1280px width, and scale up to 400%
  - What to check for:
      - [ ] Still usable at 400% increase in size
      - [ ] Content does not overlap or force users to scroll horizontally
      - [ ] All content is available
