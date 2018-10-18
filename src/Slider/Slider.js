import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SliderTrack from './SliderTrack';

const getAverage = (min, max) => Math.round((min + max) / 2);

const valueIsValid = (value, min, max) => typeof value === 'number' && value >= min && value <= max;

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_STEP = 1;

class SliderComponent extends PureComponent {
  static propTypes = {
    initialValue: PropTypes.number,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.node,
    disabled: PropTypes.bool,
    continuous: PropTypes.bool,
    value: PropTypes.number,
    className: PropTypes.string.isRequired,
    handleValueChange: PropTypes.func,
    formatFloatingValue: PropTypes.func,
  }

  static defaultProps = {
    min: DEFAULT_MIN,
    max: DEFAULT_MAX,
    step: DEFAULT_STEP,
    continuous: false,
    disabled: false,
    initialValue: null,
    handleValueChange: null,
    formatFloatingValue: null,
    value: null,
  }

  constructor(props) {
    super(props);
    const { min, max, initialValue, step } = props;
    if (max <= min) throw new Error(`Slider minimum ${min} exceeds maximum ${max}`);
    const value = typeof initialValue === 'number'
      ? initialValue
      : getAverage(min, max);
    if (value < min) throw new Error(`Slider value ${value} is less than minimum ${min}`);
    if (value > max) throw new Error(`Slider value ${value} exceeds maximum ${max}`);
    if (step === 0) throw new Error('Slider step cannot be 0');
    this.state = {
      min,
      max,
      step: Math.abs(step),
      value,
    };
  }

  setValue = (value) => {
    const { min, max } = this.state;
    let actualValue = value;
    if (value < min) actualValue = min;
    if (value > max) actualValue = max;
    if (this.props.handleValueChange) {
      this.props.handleValueChange(actualValue);
    }
    this.setState({ value: actualValue });
  }

  increment = () => {
    const value = typeof this.props.value === 'number' ? this.props.value : this.state.value;
    const { step } = this.state;
    this.setValue(value + step);
  }

  decrement = () => {
    const value = typeof this.props.value === 'number' ? this.props.value : this.state.value;
    const { step } = this.state;
    this.setValue(value - step);
  }


  render() {
    const { min, max, step, value } = this.state;
    const { continuous, formatFloatingValue } = this.props;
    const propsValue = this.props.value;
    const stateValue = this.state.value;
    const valueFromCorrectSource = valueIsValid(propsValue) ? propsValue : stateValue;
    const FloatingText = formatFloatingValue ? formatFloatingValue(value) : null;
    return (
      <div className={`${this.props.className} smc-slider`}>
        <SliderTrack
          value={valueFromCorrectSource}
          min={min}
          max={max}
          step={step}
          continuous={Boolean(continuous)}
          increment={this.increment}
          decrement={this.decrement}
          setValue={this.setValue}
          floatingText={FloatingText}
          disabled={this.props.disabled} />
      </div>
    );
  }
}

const Slider = styled(SliderComponent)`
`;

export default Slider;
