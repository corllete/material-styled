import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderComponent = ({ children, className }) => (
  <div className={`smc-table-header ${className}`}>
    {children}
  </div>
);

HeaderComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

const Header = styled(HeaderComponent)`
  font-size: 20px;
  color: rgba(0, 0, 0, .87);
  text-align: left;
  line-height: 64px;
`;

export default Header;
