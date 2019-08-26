import React from 'react';
import styled from 'styled-components';
import Circular from './Circular';
import Image from './Image';

// eslint-disable-next-line react/prop-types
const toProps = props => (props.src ? <Image src={props.src} /> : props.children);

const Avatar = styled(Circular).attrs({
  children: toProps,
})`
  // This is just here because we have to have some sort of styles applied at this level.
  text-align: left;
`;

export default Avatar;
