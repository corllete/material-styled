import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

class Checkbox extends PureComponent {
  state = {
    checked: this.props.checked || this.props.defaultChecked || false,
    indeterminate: this.props.indeterminate || false,
  };

  handleInputChange = (e) => {
    const { checked } = e.target;
    this.setState({ indeterminate: false, checked });

    if (this.props.onChange) {
      this.props.onChange(e);
    }

    if (this.props.onChangeValue) {
      this.props.onChangeValue(checked, this.props.name);
    }
  };

  render() {
    const { primary, disabled, checked: checkedProp, value, name } = this.props;
    const { indeterminate } = this.state;
    // determine if checkbox is controlled or uncontrolled
    const checked = checkedProp !== null ? checkedProp : this.state.checked;

    return (
      <CheckboxContainer
        className="smc-checkbox-container"
        primary={primary}
        disabled={disabled}
        checked={checked}>
        <CheckboxBackground
          className="smc-checkbox-background"
          primary={primary}
          checked={checked}
          disabled={disabled}
          indeterminate={indeterminate}>
          {indeterminate && <IndeterminateMark className="smc-checkbox-indeterminate-mark" />}
          {checked && !indeterminate && <CheckMark className="smc-checkbox-check-mark" />}
        </CheckboxBackground>
        <Input
          onChange={this.handleInputChange}
          disabled={disabled}
          checked={checked}
          value={value}
          name={name} />
      </CheckboxContainer>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  value: PropTypes.oneOfType(PropTypes.bool, PropTypes.string),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onChangeValue: PropTypes.func,
};

Checkbox.defaultProps = {
  checked: null,
  defaultChecked: false,
  indeterminate: false,
  primary: false,
  disabled: false,
  value: '',
  name: 'checkbox',
  onChange: null,
  onChangeValue: null,
};

const CheckboxContainer = styled.div`
  display: inline-block;
  position: relative;
  padding: 11px;
  width: 18px;
  height: 18px;
  vertical-align: middle;
  cursor: ${props => !props.disabled && 'pointer'};
  :hover::before {
    opacity: 0.04;
  }
  ::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${(props) => {
    if (props.disabled) return 'transparent';
    else if (!props.checked) return props.theme.textColors.secondary;
    else if (props.primary) return props.theme.primary;
    return props.theme.accent;
  }};
    opacity: 0;
    content: '';
  }
`;

const CheckboxBackground = styled.div`
  display: inline-flex;
  position: absolute;
  left: 11px;
  top: 11px;
  bottom: 11px;
  right: 11px;
  border: solid 2px
    ${(props) => {
    if (props.checked || props.indeterminate) return 'transparent';
    else if (props.disabled) return props.theme.disabledCheckbox;
    return props.theme.textColors.secondary;
  }};
  border-radius: 2px;
  background-color: ${(props) => {
    if (props.checked || props.indeterminate) {
      if (props.disabled) return props.theme.disabledCheckbox;
      else if (props.primary) return props.theme.primary;
      return props.theme.accent;
    }
    return 'initial';
  }};
  align-items: center;
  justify-content: center;
`;

const Input = styled.input.attrs({
  type: 'checkbox',
  disabled: props => props.disabled,
})`
  position: absolute;
  opacity: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  cursor: inherit;
  margin: 0;
`;

const CheckMarkSvg = styled.svg`
  fill: none;
  stroke: ${props => props.theme.white};
  width: 100%;
  height: 100%;
  stroke-width: 3.12px;
`;

const CheckMark = () => (
  <CheckMarkSvg viewBox="0 0 24 24">
    <path d="M1.73,12.91 8.1,19.28 22.79,4.59" />,
  </CheckMarkSvg>
);

const IndeterminateMark = styled.div`
  height: 2px;
  width: 14px;
  background-color: ${props => props.theme.white};
`;

export default Checkbox;
