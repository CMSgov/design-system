export default {
  title: 'Foundations/Typography/Links',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

export const Links = () => (
  <>
    <a href="#" className="ds-c-link ds-u-font-size--lg">
      Link Text
    </a>
    <div className="ds-u-padding--1 ds-base--inverse">
      <a href="#" className="ds-u-font-size--lg ds-c-link ds-c-link--inverse">
        Link Text
      </a>
    </div>
  </>
);
