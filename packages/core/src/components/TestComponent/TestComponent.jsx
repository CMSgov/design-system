import { color, fill } from '../../utilities/colors';
import React from 'react';
import { css } from 'emotion';
import { padding } from '../../utilities/padding';
import styled from 'react-emotion';
import variables from '../../utilities/variables';

const { colors } = variables;

const Container = styled.div`
  ${padding(2, 4)};
  ${fill.grayLightest};
  ${color.base};
  ${props =>
    props.unselected &&
    css`
      opacity: 0.5;
    `};
`;

const buttonStyle = css`
  appearance: none;
  background-color: transparent;
  border: 1px solid ${colors.primary};
  ${''} ${color.primary};
  cursor: pointer;
  display: inline-block;
  ${'' /* font-family: $font-sans;
  font-size: $base-font-size;
  font-weight: $font-bold;
  line-height: $input-line-height; */} ${padding(
    1,
    3
  )};
  text-align: center;
  text-decoration: none;
`;

const activeStyle = css`
  ${fill.primary};
  ${color.white};
`;

const ToggleButton = styled.button`
  ${buttonStyle};
  ${props => (props.active ? activeStyle : fill.white)};
`;

/*
`<TestComponent>`

@react-component TestComponent

Style guide: components.test-component.react
*/
export class TestComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle() {
    this.setState({ active: !this.state.active });
  }

  render() {
    return (
      <Container>
        <p>Hello, this is some text before a button.</p>
        <ToggleButton active={this.state.active} onClick={() => this.toggle()}>
          Toggle Me
        </ToggleButton>
      </Container>
    );
  }
}

TestComponent.propTypes = {};

export default TestComponent;
