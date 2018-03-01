import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListItemTextComponent = ({ className, primary, secondary }) => (
  <div className={`${className} smc-list-text-container`}>
    {primary && (
      <h3 className="smc-list-text-primary">
        {primary}
      </h3>
    )}
    {secondary && (
      <div className="smc-list-text-secondary">
        {secondary}
      </div>
    )}
  </div>
);

ListItemTextComponent.propTypes = {
  className: PropTypes.string.isRequired,
  primary: PropTypes.node,
  secondary: PropTypes.node,
};

ListItemTextComponent.defaultProps = {
  primary: null,
  secondary: null,
};

const ListItemText = styled(ListItemTextComponent)`

  > .smc-list-text-primary {
    margin: 0px;
  }

  > .smc-list-text-secondary {
    margin-top: 2px;
    margin-bottom: 0px;
    p {
      margin: 0
    }
  }
`;

export default ListItemText;
