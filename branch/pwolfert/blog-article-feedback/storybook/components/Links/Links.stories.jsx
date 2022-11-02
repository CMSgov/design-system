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
  </>
);
export const LinksOnDark = () => (
  <>
    <a href="#" className="ds-c-link ds-u-font-size--lg">
      Link Text
    </a>
  </>
);
LinksOnDark.parameters = {
  baseInverse: true,
};
