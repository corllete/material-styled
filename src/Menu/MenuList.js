import React from 'react';
import PropTypes from 'prop-types';
// import { findDOMNode } from 'react-dom';
import styled from 'styled-components';

class MenuListComponent extends React.Component {
  componentDidMount() {
    this.menuList.focus();
  }

  onFocus = (event) => {
    event.preventDefault();
    this.menuList.focus();
  }

  setMenuList = (ref) => {
    this.menuList = ref;
  }

  handleKeyDown = (event) => {
    const currItem = document.activeElement;
    event.preventDefault();
    if (!event.shiftKey && event.keyCode === 9) { // tab
      currItem.nextElementSibling.focus();
    }
    if (event.shiftKey && event.keyCode === 9) { // shift + tab
      currItem.previousSibling.focus();
    }
    if (event.keyCode === 38) { // up arrow
      if (currItem.previousSibling) {
        currItem.previousSibling.focus();
      } else {
        currItem.focus();
      }
    }
    if (event.keyCode === 40) { // down arrow
      if (currItem.nextSibling) {
        currItem.nextElementSibling.focus();
      } else {
        currItem.focus();
      }
    }
    if (event.keyCode === 27) { // esc
      if (this.props.onClose) this.props.onClose();
      document.activeElement.blur();
    }
  };

  render() {
    return (
      <ul
        role="menu"
        className={`${this.props.className} smc-menu-list`}
        ref={this.setMenuList}
        onClick={this.onFocus}
        onKeyDown={this.handleKeyDown}>
        {this.props.children}
      </ul>
    );
  }
}

MenuListComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func,
};

MenuListComponent.defaultProps = {
  onClose: null,
};

const MenuList = styled(MenuListComponent)`
  position: relative;
  margin: 8px 0;
  padding: 0;
  list-style: none;
  width: auto;
`;

export default MenuList;
