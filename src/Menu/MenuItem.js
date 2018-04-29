import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withRipple from '../enhancers/withRipple';

const StyledListItem = styled.li`
`;
const RippleListItem = withRipple(StyledListItem);

const MenuItemComponent = ({ className, children, onClick, onKeyDown }) => (
  <RippleListItem
    className={`${className} smc-menu-list-item`}
    onClick={onClick}
    tabIndex="0"
    onKeyPress={onKeyDown}>
    {children}
  </RippleListItem>
);

MenuItemComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

MenuItemComponent.defaultProps = {
  onClick: null,
  onKeyDown: null,
};


const MenuItem = styled(MenuItemComponent)`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 48px;
  padding: 0px 40px 0px 16px;
  z-index: 15;
  transition-duration: 0.3s;
  &:hover {
    background-color: rgba(232, 232, 232, 1);
    cursor: pointer;
  }

  &:focus {
    background-color: rgba(232, 232, 232, 1);
    outline: none;
  }
`;

export default MenuItem;
