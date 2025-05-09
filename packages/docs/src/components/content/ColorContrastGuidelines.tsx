const ColorContrastGuidelines = () => {
  return (
    <>
      <h2>Accessibility considerations</h2>
      <h3>Text contrast</h3>
      <p>
        WCAG 2.0+ AA requires a contrast ratio of a minimum of 4.5:1 for normal, or body, text.
        Large text is easier to read, so the contrast requirement is reduced to 3:1. WCAG defines
        large text as text that is 24px and larger or 18.5px and larger if it is bold.
      </p>
      <p>Text over gradients and background images still need to meet contrast requirements.</p>
      <h3>Non-text contrast</h3>
      <p>
        Elements that are not text, but still important, including buttons, icons that convey
        information, data visualizations (charts and graphs), and form inputs need a contrast ratio
        of at least 3:1. Also included in this are states of elements such as the selected state of
        an element, expanded vs. collapsed, active vs. inactive, elements with keyboard focus, etc.
      </p>
      <h3>Easily test your color combinations</h3>
      <p>
        Note that the colors listed only display colors that are available but when you are pairing
        colors together, make sure the color contrast ratio is sufficient. Here are three tools we
        suggest for testing color contrast:
      </p>
      <p>
        <a href="https://webaim.org/resources/contrastchecker/">WebAIM Color Contrast Checker</a>
      </p>
      <p>
        <a href="https://dequeuniversity.com/color-contrast">Deque Color Contrast Analyzer</a>
      </p>
      <p>
        <a href="https://www.tpgi.com/color-contrast-checker/">Color Contrast Analyzer by TPGi</a>
      </p>
    </>
  );
};

export default ColorContrastGuidelines;
