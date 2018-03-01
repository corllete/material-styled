import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const InkBarContainer = styled.div`
  position: relative;
  bottom: 0;
  left: ${props => props.selectedIndex * props.tabWidth}px;
  width: ${props => props.tabWidth}px;
  height: 2px;
  background-color: ${props => props.inkbarColor || props.theme.accent};
`;

const InkBar = ({ numTabs, selectedIndex, tabWidth, inkbarColor }) => (
  <InkBarContainer
    className="smc-tab-bar-scroller"
    numTabs={numTabs}
    selectedIndex={selectedIndex}
    tabWidth={tabWidth}
    inkbarColor={inkbarColor} />
);

InkBar.propTypes = {
  numTabs: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number,
  tabWidth: PropTypes.number,
  inkbarColor: PropTypes.string,
};

InkBar.defaultProps = {
  selectedIndex: 0,
  inkbarColor: '',
  tabWidth: 0,
};

export default InkBar;
