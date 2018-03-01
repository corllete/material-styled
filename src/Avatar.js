import React from 'react';
import Circular from './Circular';
import Image from './Image';

// eslint-disable-next-line react/prop-types
const toProps = props => (props.src ? <Image src={props.src} /> : props.children);

const Avatar = Circular.extend.attrs({
  children: toProps,
})`
  // This is just here because we have to have some sort of styles applied at this level.
  text-align: left;
`;

export default Avatar;
