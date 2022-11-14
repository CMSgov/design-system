import uniqueId from 'lodash/uniqueId';

export default {
  title: 'Foundations/Layout Grid',
  parameters: {
    docs: {
      source: {
        type: 'dynamic',
      },
    },
  },
};

// an example for responsive layout grid -- referenced in doc site
export const EqualWidths = () => (
  <section className="ds-l-container">
    <div className="ds-l-row">
      {['Equal', 'Equal', 'Equal', 'Equal'].map((content) => (
        <div className="ds-l-col utility-example" key={uniqueId('equal_')}>
          {content}
        </div>
      ))}
    </div>
  </section>
);

export const ColumnSpanning = () => (
  <section className="ds-l-container">
    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].map((numbers) => (
      <div className="ds-l-row" key={numbers}>
        <div className={`ds-l-col--${numbers} utility-example`} key={numbers}>
          ds-l-col--{numbers}
        </div>
      </div>
    ))}
  </section>
);

export const FitToContent = () => (
  <section className="ds-l-container">
    <div className="ds-l-row">
      <div className="ds-l-col--auto utility-example">Short content</div>
      <div className="ds-l-col--auto utility-example">This is medium content</div>
      <div className="ds-l-col--auto utility-example">
        This is very long content that fits the container
      </div>
    </div>
  </section>
);

export const ResponsiveColumns = () => (
  <section className="ds-l-container">
    <div className="ds-l-row">
      <div className="ds-l-col--12 ds-l-sm-col--6 ds-l-md-col--4 ds-l-lg-col--3 ds-l-xl-col--2 utility-example">
        A
      </div>
      <div className="ds-l-col--12 ds-l-sm-col--6 ds-l-md-col--4 ds-l-lg-col--3 ds-l-xl-col--2 utility-example">
        B
      </div>
      <div className="ds-l-col--12 ds-l-sm-col--6 ds-l-md-col--4 ds-l-lg-col--3 ds-l-xl-col--2 utility-example">
        C
      </div>
      <div className="ds-l-col--12 ds-l-sm-col--6 ds-l-md-col--4 ds-l-lg-col--3 ds-l-xl-col--2 utility-example">
        D
      </div>
      <div className="ds-l-col--12 ds-l-sm-col--6 ds-l-md-col--4 ds-l-lg-col--3 ds-l-xl-col--2 utility-example">
        E
      </div>
      <div className="ds-l-col--12 ds-l-sm-col--6 ds-l-md-col--4 ds-l-lg-col--3 ds-l-xl-col--2 utility-example">
        F
      </div>
    </div>
  </section>
);
