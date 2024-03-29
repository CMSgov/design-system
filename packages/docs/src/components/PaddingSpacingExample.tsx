const spacerOpts = ['0', '05', '1', '2', '3', '4', '5', '6', '7'];

const PaddingSpacingExample = ({ propName }) => {
  return spacerOpts.map((spacerVal) => {
    const cssClass = `ds-u-${propName}--${spacerVal}`;
    return (
      <div
        key={spacerVal}
        className={`ds-u-fill--secondary ${cssClass} ds-u-margin-bottom--2`}
        style={{ maxWidth: 'fit-content' }}
      >
        <code>.{cssClass}</code>
      </div>
    );
  });
};

export default PaddingSpacingExample;
