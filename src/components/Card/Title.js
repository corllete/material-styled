import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import typography from '../../mixins/typography';

const TitleComponent = props => (
  <h1 className={`${props.className} card-title`}>{props.children}</h1>
);

TitleComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Title = styled(TitleComponent)`
  ${typography('body2')}
  margin: -.063rem 0;
  color: ${props => props.theme.textColors.primary};

  ${props => props.large && css`
    ${typography('headline')}
    margin: 0;
  `}

  .primary & {
    ${props => props.large && css`
      padding-top: 8px;
    `}
  }
`;

Title.propTypes = {
  large: PropTypes.bool,
};

Title.defaultProps = {
  large: false,
};


export default Title;
