import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import typography from './mixins/typography';

const ChipContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px;
  background-color: #e0e0e0;
  height: 32px;
  border-radius: 16px;
  font-size: 13px;
  color: ${props => props.theme.textColors.primary};
  ${props =>
    props.clickable &&
    `
    :hover {
      background-color: #CECECE;
    }`} ${props =>
  props.removed &&
      `
    display: none;
  `};
`;

ChipContainer.propTypes = {
  clickable: PropTypes.func,
  removed: PropTypes.bool,
};

ChipContainer.defaultProps = {
  clickable: null,
  removed: false,
};

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  color: #616161;
  background-color: #bdbdbd;
  margin-right: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  ${typography('body')}
  font-size: 16px;
`;

const Label = styled.span`
  margin: 0 12px;
`;

const DeleteIconSvg = styled.svg`
  width: 24px;
  height: 24px;
  margin: 0 4px 0 -8px;
  color: rgba(0, 0, 0, 0.26);
  fill: rgba(0, 0, 0, 0.26);
  :hover {
    fill: rgba(0, 0, 0, 0.4);
  }
`;

const DeleteIcon = styled(({ onDelete, className }) => (
  <DeleteIconSvg className={className} onClick={onDelete}>
    <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
  </DeleteIconSvg>
))``;

class Chip extends PureComponent {
  state = {
    removed: false,
  };

  handleDeleteIconClick = (e) => {
    const { onDelete, removable } = this.props;
    if (onDelete) {
      onDelete(e);
    }
    if (removable) {
      this.setState({ removed: true });
    }
  };

  handleKeyDown = (e) => {
    const { onClick, onDelete, removable } = this.props;
    // fire onClick when Enter or Spacebar pressed
    if (onClick && (e.keyCode === 13 || e.keyCode === 32)) {
      e.preventDefault();
      onClick(e);
      // fire onDelete when Backspace or Delete pressed
    } else if ((onDelete || removable) && (e.keyCode === 8 || e.Keycode === 46)) {
      e.preventDefault();
      this.handleDeleteIconClick(e);
    }
  };

  render() {
    const {
      className,
      avatar,
      label,
      onClick,
      removable,
      onDelete,
      removed: removedProp,
    } = this.props;
    // determine if chip is managing its own removal (uncontrolled)
    // or if it's being managed by the parent (controlled)
    const removed = removedProp !== undefined ? removedProp : this.state.removed;

    return (
      <ChipContainer
        className={className}
        onKeyDown={this.handleKeyDown}
        tabIndex={0}
        clickable={onClick}
        removed={removed}>
        {avatar && <Avatar>{avatar}</Avatar>}
        <Label onClick={onClick}>
          {label}
        </Label>
        {(removable || onDelete) && (
          <DeleteIcon onDelete={this.handleDeleteIconClick} />
        )}
      </ChipContainer>
    );
  }
}

Chip.propTypes = {
  className: PropTypes.string,
  avatar: PropTypes.node,
  label: PropTypes.string.isRequired,
  removable: PropTypes.bool,
  removed: PropTypes.bool,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
};

Chip.defaultProps = {
  className: '',
  avatar: null,
  removable: false,
  removed: false,
  onClick: null,
  onDelete: null,
};

export default Chip;
export { ChipContainer, Label, Avatar, DeleteIcon };
