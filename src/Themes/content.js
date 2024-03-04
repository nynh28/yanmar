import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Content extends Component {
  render() {
    let { contentStyles, isFullScreen } = this.props
    let _contentStyles = contentStyles === undefined ? { padding: '0px 10px 45px' } : contentStyles

    return (
      <div className="wrapper wrapper-content animated fadeIn" style={{ padding: isFullScreen && 0, ..._contentStyles }}>
        {this.props.children}
      </ div >
    );
  }
}

Content.propTypes = {
  children: PropTypes.array.isRequired
};

export default Content