import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DialogBodyComponent = ({ className, children }) => (
  <div className={`smc-dialog-dialog-body ${className}`}>
    {children}
  </div>
);

DialogBodyComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const DialogBody = styled(DialogBodyComponent)`
  text-align: left;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.56px;
  line-height: 20px;
  display: block;
  color: rgba(0, 0, 0, .54);
  margin-top: 20px;
  padding: 0 24px 24px;
`;

export default DialogBody;
