import React, { Component } from 'react';

class RoundedButton extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <button
      onClick={this.props.onClick}
      style={{ height: 40, width: 150, backgroundColor: this.props.color }}>
      {this.props.title}
    </button>
  }

}

export default RoundedButton;
