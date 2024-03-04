import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Input } from 'reactstrap';
class PannelBox extends Component {
  render() {
    const { component: Component, ...rest } = this.props
    return (
      <div className="contrainner" style={this.props.style}>
        <div className="ibox float-e-margins" style={this.props.iboxStyle}>
          {
            this.props.title && <div className="ibox-title">
              <div className="form-horizontal">
                {this.props.toolBox}
              </div>
              <h3>{this.props.title}</h3>
            </div>
          }
          {!this.props.hideContent && <div className="ibox-content" style={this.props.contentStyle}>
            <div className="DefaultLayout">
              {/* //  use "children" for Component Props // */}
              {this.props.children}
              {/* //  use "children" for Component Props // */}
            </div>
          </div>}
          {
            this.props.showFooter && <div className="ibox-footer" style={this.props.footerStyle}>
              {this.props.footerchildren}
            </div>
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  // messageError: state.login.messageError,
  // data: state.login.data
});

const mapDispatchToProps = (dispatch) => ({
  // setTest: test => dispatch(PopupActions.setTest(test))
});

export default connect(mapStateToProps, mapDispatchToProps)(PannelBox)


                // 1. ทำ pannel box                                                                        // เสร็๗
                // 2. side bar อิสระต่อ component                                                            // เสร็จ
                // 3. ทุกหน้าต้องมีการ show path ว่าอยู่หน้าไหน (path ในเมนูย่อย เป็น home / basic)                  // เสร็จ
                // 4. แบ่งครึ่งคอนเท้นในกล่อง panenl box ให้ ตีเส้นแบ่งกลางเลย (แกะ html)
                // 5 . ถ้าต้องแบ่งเป็นส่วนๆ ในเส้นประแบ่งครึ่ง  (แกะ html, อิงตาม Inspinia)
                // 6. ปุ่ม save (green) / cancel (grey) ทำสีเขียวไปก่อน (อิงตาม Inspinia, ไซส์ เท่ทากับของเขาเลย)  // เสร็จ
                // 7. ทำ component ปุ่ม พร้อมโหลด slide from left จาก inspinia                               // เสร็จ
                // 8. refresh แล้วอยู่หน้าเดิม                                                                  // เสร็จ
                // 9. แจ้ง alert form กล่องแดง ตัวหนังสือแดงเข้ม อยู่ข้างบน ใตเส้น pannel box (react-strapt)
