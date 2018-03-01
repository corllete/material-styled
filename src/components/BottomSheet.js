import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import elevation from '../mixins/elevation';
import Portal from '../components/Portal';

const bottomSheetSizing = css`
  height: 0;
  bottom: 5;
`;

const BaseBottomSheet = (props) => {
  const bottomSheetClass = classNames({
    [props.className]: true,
    open: props.open,
    bottom: props.attachment === 'bottom',
    'smc-bottomsheet': true,
  });
  return (
    <aside className={bottomSheetClass}>
      {props.children}
    </aside>
  );
};

BaseBottomSheet.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
  attachment: PropTypes.string,
};

BaseBottomSheet.defaultProps = {
  children: null,
  open: false,
  attachment: 'bottom',
};

const StyledBottomSheet = styled(BaseBottomSheet)`
  background-color: white;
  ${props => props.modal && elevation(16)}
  left: 0;
  right: 0;
  overflow: hidden;
  position: absolute;
  transition: transform .195s;
  ${bottomSheetSizing}
  will-change: transform;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  touch-action: none;
  ${props => props.modal && 'z-index: 5'}

  &.bottom {
    transform: translateY(100%);
    ${props => !props.modal && 'border-top: 1px solid rgba(0,0,0,0.35);'}
  }

  &.open {
    bottom: 0;
    height: calc(100% - 56px);
    max-height: 200px;
    width: 100%;
    @media (min-width: 600px) {
      height: calc(100% - 64px);
      max-height: 200px;
    }
    transition: transform .225s;
    transform: none;
  }
`;

export const BottomSheet = ({
  open,
  children,
  handleRequestClose,
  modal,
  attachment,
}) => (
  <Portal
    open={open}
    shift={!modal}
    attachment={attachment}
    onRequestClose={handleRequestClose}
    renderContents={() => (
      <StyledBottomSheet attachment={attachment} open={open}>
        {children}
      </StyledBottomSheet>
    )} />
);


BottomSheet.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.bool,
  open: PropTypes.bool,
  attachment: PropTypes.string,
  handleRequestClose: PropTypes.func,
};

BottomSheet.defaultProps = {
  children: null,
  modal: false,
  open: false,
  attachment: 'bottom',
  handleRequestClose: () => {},
};

export default BottomSheet;
