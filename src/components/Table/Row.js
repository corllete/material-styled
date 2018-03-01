import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RowComponent = ({ className, children }) => (
  <tr className={`smc-table-row ${className}`}>
    {children}
  </tr>
);

RowComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
};

RowComponent.defaultProps = {
  children: null,
};

const Row = styled(RowComponent)`
  height: ${({ header }) => (header ? 54 : 48)}px;
`;

export default Row;
