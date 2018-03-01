import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import typography from '../../mixins/typography';

const SubtitleComponent = props => (
  <h2 className={`${props.className} card-subtitle`}>{props.children}</h2>
);

SubtitleComponent.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Subtitle = styled(SubtitleComponent)`
  ${typography('body1')}
  margin: -.063rem 0;
  color: ${props => props.theme.textColors.primary};
`;

export default Subtitle;
