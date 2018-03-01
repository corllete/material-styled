import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TracklineComponent = props => (
  <div className={`${props.className} smc-slider-track-line`}>
    {props.children}
  </div>
);

TracklineComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
};

TracklineComponent.defaultProps = {
  children: null,
};

// TODO use focus color
const getTracklineBackground = (props) => {
  if (props.disabled || props.atMin) return props.theme.slider.colors.disabled;
  // if (props.focused) return props.theme.slider.colors.focusTrack;
  return props.theme.slider.colors.track;
};

const Trackline = styled(TracklineComponent)`
  width: 100%;
  height: ${props => props.theme.slider.sizes.trackHeight}px;
  background: ${getTracklineBackground};
  transition: ${props => `background ${props.theme.slider.transitions.slider}`};
  display: flex;
  justify-content: flex-start;
`;

export default Trackline;
