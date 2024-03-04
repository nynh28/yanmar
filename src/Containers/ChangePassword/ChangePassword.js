import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import PasswordActions from '../../Redux/PasswordRedux'
import SigninActions from '../../Redux/SigninRedux'
import PannelBox from '../../Components/PannelBox'
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import {
  Container, Row, Card, Col, Form, Table
} from 'reactstrap'
import { t } from '../../Components/Translation'
import { getErrorMessage } from '../../Functions/getErrorMessage'
import { useTranslation } from 'react-i18next'
import { get } from 'lodash'

const FormInput = (arg) => {
  const { t } = useTranslation()

  return (
    <input
      className="form-control"
      type={arg.type}
      value={arg.value}
      placeholder={t(arg.placeholder)}
      onChange={(e) => arg.onChange(e)}
      style={arg.style}
    />

  )
}

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      oldPassword: '',
      newPassword: '',
      ConNewPassword: '',
      passNotEqual: '',
      respone: false,
    }
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentWillMount() {
    this.props.getPasswordPolicyAuth()
    this.props.setStateRedux('loadingChange', false)
    this.props.setStateRedux('errorSubcodeChange', null)
  }

  checkPassword = (e) => {
    let pass = e.target.value


    this.setState({ newPassword: pass.trim() });
  }
  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  checkPassword1 = (e) => {
    let pass = e.target.value
    this.setState({ ConNewPassword: pass.trim() })

  }

  checkPasswordPolicy(pass) {
    if (this.props.passwordPolicyAuth) {
      let { minLength, requiredLowerCharacter, requiredNumberCharacter,
        requiredSpecialCharacter, requiredUpperCharacter, specialPossibleCharacter
      } = this.props.passwordPolicyAuth

      if (pass.length < minLength) return true
      if (requiredLowerCharacter && !pass.match(/[a-z]/)) return true
      if (requiredNumberCharacter && !pass.match(/[0-9]/)) return true
      if (requiredUpperCharacter && !pass.match(/[A-Z]/)) return true
      if (requiredSpecialCharacter) {
        for (let i in specialPossibleCharacter) {
          if (pass.includes(specialPossibleCharacter[i])) return false
        }
        return true
      }
    }

  }

  _pressLogin = (e) => {
    e.preventDefault()
    let { oldPassword, newPassword, ConNewPassword, respone } = this.state

    if (this.checkPasswordPolicy(newPassword)) {
      this.setState({ passNotEqual: 'password_not_condition' })
      this.props.setStateRedux('errorSubcodeConfirm', null)
    }
    else if (newPassword !== ConNewPassword) {
      this.setState({ passNotEqual: 'password_not_match' })
      this.props.setStateRedux('errorSubcodeConfirm', null)
    }
    else {
      this.setState({ passNotEqual: '' })
      this.props.changePassword(oldPassword, newPassword)
    }

  }

  render() {
    let { newPassword, ConNewPassword, passNotEqual, oldPassword } = this.state
    let { errorSubcodeChange, passwordPolicyAuth } = this.props

    return <Suspense fallback={null}>
      <PannelBox title={t("change_password")}>
        <Row style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Col lg='6'>
            <form onSubmit={(e) => this._pressLogin(e)} id="form-submit">

              <div style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* --- สร้าง Form ในนี้ --- */}
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 10, alignItems: 'center' }}>
                  <div class="form-group">
                    <label class="control-label" style={{ fontWeight: 500 }}>{t('old_password')} <span class="required">*</span>:</label>
                    {/* <input type={this.state.hidden ? "password" : "text"}
                class="form-control" placeholder={t('old_password')} required style={{ width: 400, height: 40 }}
                onChange={(e) => this.setState({ oldPassword: e.target.value })}
                value={oldPassword}
              /> */}
                    <FormInput
                      type={this.state.hidden ? "password" : "text"}
                      placeholder="old_password"
                      onChange={(e) => this.setState({ oldPassword: e.target.value.trim() })}
                      style={{ width: 400 }}
                      value={oldPassword}
                    />

                  </div>
                  {/* <button type="button" onClick={this.toggleShow}  > <i class="fas fa-eye"></i></button> */}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 10, alignItems: 'center' }}>
                  <div class="form-group">
                    <label class="control-label" style={{ fontWeight: 500 }}>{t('new_password')} <span class="required">*</span>:</label>
                    {/* <input type={this.state.hidden ? "password" : "text"} class="form-control" placeholder={t('new_password')} required style={{ width: 400, height: 40 }}
                onChange={(e) => this.checkPassword(e)}
                value={newPassword} /> */}
                    <FormInput
                      type={this.state.hidden ? "password" : "text"}
                      placeholder="new_password"
                      onChange={(e) => this.checkPassword(e)}
                      style={{ width: 400 }}
                      value={newPassword}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 10, alignItems: 'center' }}>
                  <div class="form-group">
                    <label class="control-label" style={{ fontWeight: 500 }}>{t('confirm_password')} <span class="required">*</span>:</label>
                    {/* <input type={this.state.hidden ? "password" : "text"}
                class="form-control" placeholder={t('confirm_new_password')} required style={{ width: 400, height: 40 }}
                onChange={(e) => this.checkPassword1(e)}
                value={ConNewPassword} /> */}

                    <FormInput
                      type={this.state.hidden ? "password" : "text"}
                      placeholder="confirm_new_password"
                      onChange={(e) => this.checkPassword1(e)}
                      style={{ width: 400 }}
                      value={ConNewPassword}
                    />
                  </div>
                </div>
                {/* --------------------- */}

                <span style={{ color: 'red' }}>
                  {t(passNotEqual)}
                  {/* {errorSubcodeChange} */}
                  {errorSubcodeChange && getErrorMessage(parseInt(errorSubcodeChange))}
                </span>
              </div>
            </form>
          </Col>
          <Col lg='6' style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 15 }}>
            <div>
              <b>{t('validation_password_1')}:</b>
              <ul>
                <li>{t('validation_password_2')}{' '}{get(passwordPolicyAuth, 'minLength')}{' '}{t('validation_password_3')}</li>
                {get(passwordPolicyAuth, 'requiredNumberCharacter') && <li>{t('validation_password_4')}</li>}
                {get(passwordPolicyAuth, 'requiredUpperCharacter') && <li>{t('validation_password_5')}</li>}
                {get(passwordPolicyAuth, 'requiredLowerCharacter') && <li>{t('validation_password_6')}</li>}
                {get(passwordPolicyAuth, 'requiredSpecialCharacter') && <li>{t('validation_password_7')}{get(passwordPolicyAuth, 'specialPossibleCharacter')}{t('validation_password_8')}</li>}
              </ul>
            </div>
          </Col>
        </Row>
        <div className="hr-line-dashed" />
        <div className="row" style={{ textAlign: "right" }}>
          <CancelButton
            name={this.state.hidden ? t('show') : t('hide')}
            onClick={() => this.toggleShow()}
          // style={{
          //   lineHeight: 0,
          //   backgroundColor: '#a4a8a9',
          //   width: 120,
          //   height: 30,
          //   color: 'white',
          //   fontSize: 15,
          //   borderRadius: '8px',
          //   margin: '0px 5px'
          // }}
          />

          <SaveButton
            type="submit"
            form="form-submit"
            name={t('submit')}
            loading={this.props.loadingChange}
          // style={{
          //   lineHeight: 0,
          //   backgroundColor: '#a4a8a9',
          //   width: 120,
          //   height: 30,
          //   color: 'white',
          //   fontSize: 15,
          //   borderRadius: '8px',
          //   margin: '0px 5px'
          // }}
          />
        </div>
      </PannelBox>
    </Suspense>
  }
}

const mapStateToProps = (state) => ({
  errorSubcodeChange: state.password.errorSubcodeChange,
  loadingChange: state.password.loadingChange,
  passwordPolicyAuth: state.signin.passwordPolicyAuth,
});

const mapDispatchToProps = (dispatch) => ({
  getPasswordPolicyAuth: () => dispatch(SigninActions.getPasswordPolicyAuth()),
  changePassword: (previousPassword, proposedPassword) => dispatch(PasswordActions.changePassword(previousPassword, proposedPassword)),
  setStateRedux: (name, value) => dispatch(PasswordActions.setStateRedux(name, value)),
})

export default (connect(mapStateToProps, mapDispatchToProps)(ChangePassword))
