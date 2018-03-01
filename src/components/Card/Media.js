import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const MediaComponent = props => (
  <section className={`${props.className} card-media`}>{props.children}</section>
);

MediaComponent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string.isRequired,
};

MediaComponent.defaultProps = {
  children: null,
};

const Media = styled(MediaComponent)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 16px;

  ${props => props.wide && css`
    background-image: url("${props.src}");
    background-size: cover;
    background-repeat: no-repeat;
    height: 12.313rem;
  `}
`;

Media.propTypes = {
  wide: PropTypes.bool,
  src: PropTypes.string,
};

Media.defaultProps = {
  wide: false,
  src: '',
};

export default Media;
