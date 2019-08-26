import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import typography from './mixins/typography';
import elevation from './mixins/elevation';

// placeholder for implementing NavIconPlaceholder img
const NavIconPlaceholder = styled.div`
  height: 24px;
  width: 24px;
  margin: 12px;
`;

const TitleComponent = ({ className, children }) => (
  <h1 className={`${className} smc-appbar-title`}>
    {children}
  </h1>
);

TitleComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Title = styled(TitleComponent)`
  margin: 0 12px;
   ${typography('title')}
`;

const AppbarComponent = ({ className, navIcon, title }) => (
  <div
    className={`${className} smc-appbar-container`}>
    {navIcon ? <navIcon /> : <NavIconPlaceholder />}
    <Title>{`${title}`}</Title>
  </div>
);

AppbarComponent.propTypes = {
  className: PropTypes.string.isRequired,
  navIcon: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

AppbarComponent.defaultProps = {
  navIcon: null,
};

const Appbar = styled(AppbarComponent)`
  top: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  padding: 0 24px;
  background-color: ${props => props.theme.primary};
  ${elevation(2)}
  height: 64px;
  position: sticky;
  color: #fff;
`;

export default Appbar;
