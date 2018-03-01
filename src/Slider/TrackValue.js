import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TrackValueComponent = props => (
  <div className={`${props.className} smc-slider-track-value`}>
    {props.children}
  </div>
);

TrackValueComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
};

TrackValueComponent.defaultProps = {
  children: null,
};

const TrackValue = styled(TrackValueComponent)`
  width: ${props => props.width}px;
  height: 100%;
  opacity: ${({ disabled }) => (disabled ? 0 : 1)};
  transition: all ${props => props.theme.slider.transitions.main};
  background: ${props => (props.disabled ? props.theme.slider.colors.disabled : props.theme.slider.colors.main)};
`;

export default TrackValue;
