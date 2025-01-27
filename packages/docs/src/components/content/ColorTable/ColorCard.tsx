type Attribute = {
  key: string;
  label: string;
  value: string;
};

type ColorCardProps = {
  attributes: Attribute[];
};

export const ColorCard = ({ attributes }: ColorCardProps) => {
  const hexCode = attributes.find(({ key }) => key === 'hex').value;
  const hasCssVariable = attributes.find(({ key }) => key === 'css').value.startsWith('--');

  return (
    <div className="c-color-card ds-l-row">
      <div className="ds-l-col--3" style={{ backgroundColor: hexCode }}></div>
      <dl className="ds-l-col--9">
        {attributes.map(({ key, label, value }) => (
          <div key={key} className="c-color-card__attribute">
            <dt>{label}</dt>
            <dd data-category={key}>
              {key === 'css' && hasCssVariable ? (
                <code className="ds-u-fill--background">{value}</code>
              ) : (
                value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
