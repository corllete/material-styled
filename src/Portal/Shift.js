import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Shift extends Component {
  static propTypes = {
    direction: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    className: PropTypes.string,
    children: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    children: null,
  }

  componentDidMount() {
    document.body.classList.add('shift');
  }

  componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      document.body.classList.add(prevProps.direction);
    } else if (!this.props.open && prevProps.open) {
      document.body.classList.remove(prevProps.direction);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('shift');
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export default Shift;
