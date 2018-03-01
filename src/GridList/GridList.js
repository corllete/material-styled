import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridListComponent = ({ className, children }) => (
  <div className={`${className} smc-grid-list`}>
    {children}
  </div>
);

GridListComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
};

GridListComponent.defaultProps = {
  children: null,
};

const GridList = styled(GridListComponent)`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};;
  flex-wrap: wrap;
`;

export default GridList;
