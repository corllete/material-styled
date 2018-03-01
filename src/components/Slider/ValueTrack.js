import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ValueTrackComponent = props => (
  <div className={`${props.className} smc-slider-value-size`}>
    {props.children}
  </div>
);

ValueTrackComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ValueTrackComponent.defaultProps = {
  children: null,
};

const ValueTrack = styled(ValueTrackComponent)`
  height: 100%;
  overflow: hidden;
  max-width: ${props => props.width}px;
`;

export default ValueTrack;
