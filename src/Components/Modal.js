import React, { Component } from 'react'
import Modal from 'react-awesome-modal';

export default class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = { isShow: false }
  }

  componentWillMount() {
    this.setState({ isShow: this.props.isShow })
  }

  modalOpening = (e) => this.setState(state => ({ isShow: !state.isShow }))
  render() {
    const { component: Component, ...rest, title } = this.props
    return <Modal
      visible={this.state.isShow}
      width="900"
      height="600"
      effect="fadeInUp"
      onClickAway={() => this.modalOpening()}
    >
      <div className="ibox-title">
        <h5 style={{ fontWeight: 'bold' }}>{title}</h5>
        <div className="ibox-tools">
          <a onClick={() => this.modalOpening()}>
            <i className="fa fa-times"></i>
          </a>
        </div>
      </div>
      <div className="ibox-content">
        {this.props.children}
      </div>
    </Modal>
  }
} 