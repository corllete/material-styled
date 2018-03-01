import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay } from './Overlay';
import Shift from './Shift';

let smcPortal;

class Portal extends Component {
  static propTypes = {
    attachment: PropTypes.string,
    open: PropTypes.bool.isRequired,
    shift: PropTypes.bool,
    onRequestClose: PropTypes.func,
    renderContents: PropTypes.func.isRequired,
  }

  static defaultProps = {
    shift: false,
    attachment: 'left',
    onRequestClose: null,
  };

  state = {
    portalMounted: false,
  };

  componentDidMount() {
    if (!smcPortal) {
      smcPortal = document.createElement('div');
      smcPortal.id = 'smc-portal';
      smcPortal.className = 'smc-portal';
      document.body.appendChild(smcPortal);
    }
    this.el = document.createElement('div');
    this.el.className = 'smc-portal-instance';
    smcPortal.appendChild(this.el);
    // Triggering a re-render is purposeful because of the nature
    // of portals. The first render and componentDidMount will happen
    // at the same time. this.el can be undefined at render. So
    // we call this.setState in componentDidMount after this.el has
    // been defined and the dom node has been inserted.
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      portalMounted: true,
    });
  }

  componentWillUnmount() {
    if (smcPortal) smcPortal.removeChild(this.el);
  }

  render() {
    if (!this.state.portalMounted) return null;
    const PortalContainer = this.props.shift ? Shift : Overlay;

    return createPortal(
      <PortalContainer
        direction={this.props.attachment}
        open={this.props.open}
        onClick={this.props.onRequestClose}>
        {this.props.renderContents()}
      </PortalContainer>,
      this.el
    );
  }
}

export default Portal;
