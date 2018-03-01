import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ActionsComponent = props => (
  <section className={`${props.className} card-actions`}>{props.children}</section>
);

ActionsComponent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
};

ActionsComponent.defaultProps = {
  children: null,
};

const Actions = styled(ActionsComponent)`
  display: flex;
  box-sizing: border-box;
  padding: 8px;
  color: ${props => props.theme.textColors.primary};
  & button {
    margin: 0 8px 0 0;
  }
  ${props => props.vertical && `
    flex-flow: column;
    align-items: flex-start;
    & button {
      margin: 0 0 4px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  `}
`;

export default Actions;
