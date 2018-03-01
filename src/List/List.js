import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListComponent = ({ className, children }) => (
  <ul className={`${className} smc-list`}>
    {children}
  </ul>
);

ListComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
};

ListComponent.defaultProps = {
  children: null,
};

const List = styled(ListComponent)`
  position: relative;
  margin: 8px 0;
  padding: 0;
  list-style: none;
`;

export default List;
