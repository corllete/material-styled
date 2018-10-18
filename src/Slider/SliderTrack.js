import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import SliderThumb from './SliderThumb';
import Trackline from './Trackline';
import TrackValue from './TrackValue';
import ValueTrack from './ValueTrack';

const getValuePerPixel = (min, max, width) => {
  if (width === 0) return 1;
  const range = max - min;
  return range / width;
};

const getPixelPerValue = (min, max, width) => {
  const range = max - min;
  return width / range;
};


class SliderTrackComponent extends PureComponent {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
    continuous: PropTypes.bool,
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
    increment: PropTypes.func,
    decrement: PropTypes.func,
    className: PropTypes.string.isRequired,
    floatingText: PropTypes.node,
  }

  static defaultProps = {
    continuous: false,
    disabled: false,
    increment: null,
    decrement: null,
    floatingText: null,
  }

  state = {
    pixelsPerValue: null,
    valuePerPixel: null,
    cursorXAtMin: null,
    // useTransitions: false,
    focused: false,
    width: null,
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.getTrackWidth);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.getTrackWidth);
  }

  setTrack = (el) => {
    this.track = el;
    this.getTrackWidth();
  }

  getTrackWidth = () => {
    if (!this.track) return;
    const { max, min } = this.props;
    /* eslint-disable react/no-find-dom-node */
    const { width, left } = ReactDOM.findDOMNode(this.track).getBoundingClientRect();
    /* eslint-enable */
    const pixelsPerValue = getPixelPerValue(min, max, width);
    const valuePerPixel = getValuePerPixel(min, max, width);
    this.setState({
      width,
      pixelsPerValue,
      valuePerPixel,
      cursorXAtMin: left,
    });
  }

  handleDrag = (pixelsFromMin) => {
    const { continuous } = this.props;
    const { valuePerPixel } = this.state;
    const { value, step, min } = this.props;
    const valueFromMin = pixelsFromMin * valuePerPixel;
    const continuousNextValue = valueFromMin + min;

    if (continuous) {
      this.props.setValue(continuousNextValue);
      return;
    }

    const actualNumberSteps = (continuousNextValue - value) / step;
    const minimumSteps = Math.floor(actualNumberSteps);
    const maximumSteps = Math.ceil(actualNumberSteps);
    const useMax = Math.abs(Math.abs(maximumSteps) - Math.abs(actualNumberSteps))
      < Math.abs(Math.abs(minimumSteps) - Math.abs(actualNumberSteps));
    const stepsTaken = useMax ? maximumSteps : minimumSteps;
    if (stepsTaken === 0) return;
    const nextValue = (stepsTaken * step) + value;
    this.props.setValue(nextValue);
  }

  goToMouseLocation = ({ clientX }) => {
    const { value, min } = this.props;
    const { pixelsPerValue } = this.state;
    const pixelsFromMin = (value - min) * (pixelsPerValue || 0);
    const { cursorXAtMin } = this.state;
    if (cursorXAtMin === null) {
      this.setState({ cursorXAtMin: clientX - pixelsFromMin });
    }
    const cursorPastMin = clientX - cursorXAtMin;
    this.handleDrag(cursorPastMin);
  }

  handleClick = ({ clientX }) => {
    if (this.props.disabled) return;
    const { cursorXAtMin } = this.state;
    const cursorPastMin = clientX - cursorXAtMin;
    this.handleDrag(cursorPastMin);
  }

  enableFocus = () => this.setState({ focused: true });
  disableFocus = () => this.setState({ focused: false });

  render() {
    const { value, min, disabled, floatingText } = this.props;
    const { pixelsPerValue, valuePerPixel, focused, width } = this.state;
    const haveMeasuredWidth = typeof pixelsPerValue === 'number'
      && typeof valuePerPixel === 'number';
    const pixelsFromMin = (value - min) * (pixelsPerValue || 0);
    const atMin = min === value;
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        onClick={this.handleClick}
        ref={this.setTrack}
        className={`${this.props.className} smc-slider-track-wrapper`}>
        <Trackline
          disabled={disabled}
          focused={focused}
          atMin={atMin}>
          {haveMeasuredWidth && (
            [
              <ValueTrack width={pixelsFromMin} key="slider-track-value-track">
                <TrackValue disabled={disabled} width={width} />
              </ValueTrack>,
              <SliderThumb
                floatingText={floatingText}
                increment={this.props.increment}
                decrement={this.props.decrement}
                handleMouseMove={this.handleClick}
                disabled={this.props.disabled}
                atMin={atMin}
                key="slider-track-slider-thumb" />,
            ]
          )}
        </Trackline>
      </div>
    );
  }
}

const SliderTrack = styled(SliderTrackComponent)`
  height: ${props => props.theme.slider.sizes.clickableHeight}px;
  cursor: ${props => (props.disabled ? 'auto' : 'pointer')};
  width: 100%;
`;

export default SliderTrack;
