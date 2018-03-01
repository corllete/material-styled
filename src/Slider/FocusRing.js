import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FocusRingComponent = props => (
  <div className={`${props.className} smc-slider-focus-ring`}>
    {props.children}
  </div>
);

FocusRingComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
};

FocusRingComponent.defaultProps = {
  children: null,
};

const getFocusSize = props => (props.navigatingWithKeys ? props.theme.slider.sizes.focusHalo : 0);

const getFocusColor = ({
  atMin,
  theme: { slider: { colors } },
}) => (atMin ? colors.track : colors.focusHalo);

const FocusRing = styled(FocusRingComponent)`
  height: ${getFocusSize}px;
  width: ${getFocusSize}px;
  background: ${getFocusColor};
  transition: height width ${props => props.theme.slider.transitions.main};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: inherit;
  border-radius: 50%;
  flex-shrink: 0;
`;

FocusRing.propTypes = {
  navigatingWithKeys: PropTypes.bool,
  atMin: PropTypes.bool.isRequired,
};

FocusRing.defaultProps = {
  navigatingWithKeys: true,
};

export default FocusRing;
