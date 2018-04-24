import { color, fill } from '../../utilities/colors';
import React from 'react';
import { baseButtonStyle } from '../Button/Button';
import { css } from 'emotion';
import { padding } from '../../utilities/padding';
import styled from 'react-emotion';

const Container = styled.div`
  ${padding(2, 4)};
  ${fill.grayLightest};
  ${color.base};
`;

const activeStyle = css`
  ${fill.primary};
  ${color.white};

  &:focus {
    ${color.white};
  }
`;

const ToggleButton = styled.button`
  ${baseButtonStyle};
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
