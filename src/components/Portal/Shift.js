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

  componentWillReceiveProps(nextProps) {
    if (nextProps.open && !this.props.open) {
      document.body.classList.add(this.props.direction);
    } else if (!nextProps.open && this.props.open) {
      document.body.classList.remove(this.props.direction);
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
