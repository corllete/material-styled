import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DialogFooterComponent = ({ className, children }) => (
  <div className={`smc-dialog-dialog-footer ${className}`}>
    {children}
  </div>
);

DialogFooterComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const DialogFooter = styled(DialogFooterComponent)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  padding: 8px;
`;

export default DialogFooter;
