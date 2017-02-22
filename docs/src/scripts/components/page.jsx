import React from 'react';

class Page extends React.Component {
  render() {
    return (
      <section>
        <h2>{this.props.header}</h2>
      </section>
    );
  }
}

Page.propTypes = {
  header: React.PropTypes.string.isRequired
};

export default Page;
