import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MediaItemComponent = props => (
  <img className={`${props.className} card-media-item`} src={props.src} alt={props.alt} />
);

MediaItemComponent.propTypes = {
  className: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const MediaItem = styled(MediaItemComponent)`
  display: inline-block;
  width: auto;
  height: 80px;
  margin: 16px 0 0;
  padding: 0;
  ${props => props.scale && `
    height: ${props.scale * 80}px;
    width: auto;
    ${props.scale === 3 && `
      margin-bottom: 16px;
    `}
  `}
`;

export default MediaItem;
