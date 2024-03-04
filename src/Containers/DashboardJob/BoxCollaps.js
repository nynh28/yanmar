import React, { Component } from 'react'
import { Row, Col, Progress } from "reactstrap";
import Modal from 'react-awesome-modal';
import DirectoryOrderMap from './DirectoryOrderMap'
import $ from 'jquery'

export default class BoxCollaps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }

    }

    _onCollapseComponent = (e) => {
        let mybutton = $('#my-chevron-button-' + `${this.props.boxid}`)
        let myibox2 = $(`#${this.props.boxid}`)
        if (mybutton.hasClass("fa fa-chevron-up")) {              // ตอนเปิดอยู่ จะสั่งปิด
            myibox2.slideToggle(200);
            mybutton.removeClass('fa fa-chevron-up').addClass('fa fa-chevron-down')
        } else if (mybutton.hasClass("fa fa-chevron-down")) {     // ตอนปิดอยู่ จะสั่งเปิด
            myibox2.slideToggle(200);
            mybutton.removeClass('fa fa-chevron-down').addClass('fa fa-chevron-up')
        }
    }

    openModal() {
        this.setState({
            visible: true
        });
    }

    closeModal() {
        this.setState({
            visible: false
        });
    }


    render() {
        const { component: Component, ...rest } = this.props
        return (
            <div id={"manage-ibox-" + this.props.boxid} className="ibox" style={{ boxShadow: 'rgb(222, 222, 222) 0px 2px 3px' }}>
                <div className="ibox-title" style={{ borderColor: '#f3f3f4', borderWidth: '2px 0px 0' }}>

                    <Modal
                        visible={this.state.visible}
                        width="900"
                        height="600"
                        effect="fadeInUp"
                        onClickAway={() => this.closeModal()}
                    >
                        <div className="ibox-title">
                            <h5 style={{ fontWeight: 'bold' }}>Plan</h5>
                            <div className="ibox-tools">
                                <a onClick={() => this.closeModal()}>
                                    <i className="fa fa-times"></i>
                                </a>
                            </div>
                        </div>
                        <div className="ibox-content">
                            <Row style={{ backgroundColor: 'yellow' }}>
                                <DirectoryOrderMap />
                            </Row>
                        </div>
                    </Modal>

                    <Row>
                        <Col lg={4} md={4} sm={4}> </Col>
                        <Col lg={4} md={4} sm={4}>
                            <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'center', marginTop: 8 }}>
                                <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <h4 className="no-margins" style={{ fontWeight: 'bold' }}>200222/00/ZPL2</h4>
                                        <h4 style={{ color: '#757575', marginBottom: 0 }}>22/02/2020 (14 : 55) - 23/02/2020 (01:55)</h4>
                                        <h4 style={{ color: '#757575', marginBottom: 0 }}>ประเภทงาน : ไป <i className="fa fa-arrow-right"></i></h4>
                                    </div>

                                </div>
                            </div>
                        </Col>

                        <Col lg={4} md={4} sm={4}>
                            <div className="pull-right">
                                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-end', marginTop: 8 }}>
                                    <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                        <a className="btn btn-white btn-md" title="Edit"><i className="fa fa-edit" style={{ fontSize: 18, color: "#000" }}></i> </a>
                                    </div>
                                    <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                        <a className="btn btn-white btn-md" title="Map" onClick={() => this.openModal()}><i className="fa fa-globe" style={{ fontSize: 18, color: "#000" }}></i> </a>
                                    </div>
                                    <div className="form-group field field-string" style={{ padding: '0 3px' }}>
                                        <a className="btn btn-white btn-md" onClick={(e) => this._onCollapseComponent(e)}><i id={"my-chevron-button-" + + this.props.boxid} className="fa fa-chevron-up" style={{ color: "#000" }}></i> </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div >
                <div className="ibox-content" id={this.props.boxid}>
                    {this.props.children}
                </div>
            </div >
        )
    }
}