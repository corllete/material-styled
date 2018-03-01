import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TitleComponent = ({ children, className, column }) => (
  <th className={`smc-table-title ${className} smc-table-title-${column}`}>
    {children}
  </th>
);

TitleComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  className: PropTypes.string.isRequired,
  column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const Title = styled(TitleComponent)`
  font-size: 13px;
  color: rgba(0, 0, 0, .54);
  border-bottom: 1px solid rgba(0, 0, 0, .54);
  text-align: ${({ numerical }) => (numerical ? 'right' : 'left')};
  padding-left: ${({ first }) => (first ? 24 : 56)}px;
  padding-right: ${({ last }) => (last ? 24 : 0)}px;
`;

Title.propTypes = {
  first: PropTypes.bool,
  last: PropTypes.bool,
  numerical: PropTypes.bool,
  children: PropTypes.node.isRequired,
  column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default Title;
