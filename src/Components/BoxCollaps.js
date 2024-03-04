import React, { Component } from 'react'
import { Row, Col } from "reactstrap";
import $ from 'jquery'

export default class BoxCollaps extends Component {

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

  render() {
    const { component: Component, ...rest } = this.props
    const { iboxFooter, headerElement, headerElementStyle, iboxTitleStyle, titleStyle, iconCollapBox, headerColLeft, headerColRight, isHeaderElementLeft } = this.props
    return (
      <div id={"manage-ibox-" + this.props.boxidas} className="ibox ">
        <div className="ibox-title" style={iboxTitleStyle}>
          <Row>
            <Col lg={headerColLeft || 4}>
              {isHeaderElementLeft ?
                this.props.headerElementLeft :
                <h3 style={titleStyle}>{this.props.title}</h3>
              }
            </Col>
            <Col lg={headerColRight || 8}>
              <div className="ibox-tools">
                {
                  iconCollapBox ?
                    <div className="form-group field field-string" style={{ padding: '0px 3px' }}>
                      <a className="btn btn-white btn-md" onClick={(e) => this._onCollapseComponent(e)}>
                        <i id={"my-chevron-button-" + this.props.boxid} className="fa fa-chevron-up"></i>
                      </a>
                    </div>
                    :
                    <a className="collapse-link"
                      onClick={(e) => this._onCollapseComponent(e)}
                    >
                      <i style={titleStyle} id={"my-chevron-button-" + this.props.boxid} className="fa fa-chevron-up"></i>
                    </a>
                }
              </div>
              {
                headerElement && <div style={headerElementStyle}>
                  {/* headerElement && <div className="pull-right" style={headerElementStyle}> */}
                  {/* <div className="btn-group"> */}
                  {headerElement}
                  {/* </div> */}
                </div>
              }
            </Col>
          </Row>
        </div>
        <div className="ibox-content" id={this.props.boxid}>
          {this.props.children}
        </div>
        {
          iboxFooter && <div className="ibox-footer">
            {iboxFooter}
          </div>
        }
      </div>
    )
  }
}
