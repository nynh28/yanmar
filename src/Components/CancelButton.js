import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
// import EmptyLayout from './EmptyLayout'
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import LaddaButton, { S, SLIDE_LEFT } from 'react-ladda';
import { t } from './Translation'


class CancelButton extends Component {
  state = { loading: false };

  toggle = () => {
    this.setState({
      loading: !this.state.loading,
      progress: 0.5,
    });
  }

  render() {
    // const { component: Component, ...rest } = this.props
    const { name, color, style, disabled } = this.props
    return (
      <LaddaButton
        id="cancel"
        loading={this.props.loading}
        onClick={this.props.onClick}
        data-color="#eee"
        data-size={S}
        data-style={SLIDE_LEFT}
        data-spinner-size={30}
        data-spinner-color="#ddd"
        data-spinner-lines={12}
        // style={{ backgroundColor: '#D3D3D3', borderRadius: 2.5, marginRight: 10 }}
        style={style || { backgroundColor: color || '#D3D3D3', borderRadius: 2.5, marginRight: 10 }}
      >
        <div id="cancel" style={{ paddingLeft: 10, paddingRight: 10 }}>{name || t('cancel')}</div>
      </LaddaButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(CancelButton)


                // 1. ทำ pannel box
                // 2. side bar อิสระต่อ component                                                            // olo
                // 3. ทุกหน้าต้องมีการ show path ว่าอยู่หน้าไหน (path ในเมนูย่อย เป็น home / basic)
                // 4. แบ่งครึ่งคอนเท้นในกล่อง panenl box ให้ ตีเส้นแบ่งกลางเลย (แกะ html)
                // 5 . ถ้าต้องแบ่งเป็นส่วนๆ ในเส้นประแบ่งครึ่ง  (แกะ html, อิงตาม Inspinia)
                // 6. ปุ่ม save (green) / cancel (grey) ทำสีเขียวไปก่อน (อิงตาม Inspinia, ไซส์ เท่ทากับของเขาเลย)
                // 7. ทำ component ปุ่ม พร้อมโหลด slid from left จาก inspinia
                // 8. refresh แล้วอยู่หน้าเดิม                                                                  // เสร็จ
                // 9. แจ้ง alert form กล่องแดง ตัวหนังสือแดงเข้ม อยู่ข้างบน ใตเส้น pannel (react-strapt)
                // 10. ทำ generate form ถ้าำทำทัน
