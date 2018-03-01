import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SwitchTrack from './SwitchTrack';
import SwitchThumb from './SwitchThumb';

class SwitchComponent extends PureComponent {
  static propTypes = {
    disabled: PropTypes.bool,
    light: PropTypes.bool,
    dark: PropTypes.bool,
    raised: PropTypes.bool,
    on: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    disabled: false,
    onChange: null,
    light: true,
    dark: false,
    raised: false,
    on: false,
  }

  state = {
    on: this.props.on,
  };

  handleOnClick = () => {
    if (!this.props.disabled) {
      this.setState((prevState) => {
        const on = !prevState.on;
        if (this.props.onChange) this.props.onChange(on);
        return { on };
      });
    }
  }

  acceptableProps = {
    light: this.props.light,
    dark: this.props.dark,
    raised: this.props.raised,
    disabled: this.props.disabled,
  };

  render() {
    return (
      <SwitchTrack {...this.acceptableProps} {...this.state}>
        <SwitchThumb {...this.acceptableProps} {...this.state} onClick={this.handleOnClick} />
      </SwitchTrack>
    );
  }
}

const Switch = styled(SwitchComponent)`
  width: 21px;
  height: 21px;
  border-radius: 50%;
  position: absolute;
`;

export default Switch;
