import React, { Component, Suspense } from 'react'
// import { Link } from 'react-router-dom'
import Particles from 'react-particles-js';
import { connect } from 'react-redux'
import { IconButton, Button } from '@material-ui/core';
import Images from '../../Themes/Images'
import PasswordActions from '../../Redux/PasswordRedux'
import UserActions from '../../Redux/UserRedux'
import { Redirect } from 'react-router-dom'
import VersatileActions from '../../Redux/VersatileRedux'
import SigninActions from '../../Redux/SigninRedux'
import $ from 'jquery'
import {
  Container, Row, Card, Col, Form, Table
} from 'reactstrap'

import LaddaButton, { S, SLIDE_LEFT } from 'react-ladda';
import SaveButton from '../../Components/SaveButton'
import { get } from 'lodash'
import { t, v, v_em } from '../../Components/Translation'
import { getErrorMessage } from '../../Functions/getErrorMessage'
import { useTranslation } from 'react-i18next'

const FormInput = (arg) => {
  const { t } = useTranslation()

  return (
    <input
      type={arg.type}
      value={arg.value}
      placeholder={t(arg.placeholder)}
      onChange={(e) => arg.onChange(e)}
      style={arg.style}
    />

  )
}

class ForceChange extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      isActive: true,
      language: this.props.language ? this.props.language : 'en',
      respone: false,
      newPassword: '',
      conNewPassword: '',
      passNotEqual: '',
      regex: null,
    }
    this.toggleShow = this.toggleShow.bind(this);
  }

  componentWillMount() {
    if (!this.props.dataForce) {
      this.props.history.push("/")
    }


  }

  componentDidMount = () => {
    if (this.props.newPassword) {
      this.setState({ newPassword: this.props.newPassword });
    }
    if (this.props.conNewPassword) {
      this.setState({ conNewPassword: this.props.conNewPassword });
    }
  }
  componentWillUnmount = () => {
    this.props.setStateReduxSignin('dataForce', null)
    this.props.setStateReduxSignin('loadingRespond', false)
  }

  componentDidUpdate(prevProps, prevState) {
    let { isAgreement, stateSignin, menuUser, passwordPolicyAuth } = this.props
    if (prevProps.isAgreement !== isAgreement && stateSignin) {
      if (this.props.isAgreement) {
        this.props.getProfileAndMenu()
        // this.props.history.push("dashboard")
      } else {
        this.props.history.push("/privacyandpolicy")
      }
    }
    if (prevProps.menuUser !== menuUser && stateSignin && isAgreement) {
      console.log('SWITCH TO HOMEPAGE')
      this.props.history.push("homePage")
    }
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
    let { newPassword, conNewPassword } = this.state


    if (this.checkPasswordPolicy(newPassword)) {
      this.setState({ passNotEqual: 'password_not_condition' })
      this.props.setStateReduxPassword('errorSubcodeConfirm', null)
    }
    else if (newPassword !== conNewPassword) {
      this.setState({ passNotEqual: 'password_not_match' })
      this.props.setStateReduxPassword('errorSubcodeConfirm', null)
    }
    else {
      this.setState({ passNotEqual: '' })
      this.props.respondChallenge(newPassword)
    }
  }

  handleHide = () => {
    this.setState({
      isActive: false
    })
  }

  checkPassword = (e) => {
    let pass = e.target.value
    this.setState({ newPassword: pass.trim() });
  }

  ConcheckPassword = (e) => {
    let pass = e.target.value
    this.setState({ conNewPassword: pass.trim() });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  render() {
    let { emailOrMobile, newPassword, conNewPassword, confirmCode, passNotEqual } = this.state
    let { errorSubcodeRespond, loadingRespond, passwordPolicyAuth } = this.props

    return (
      <Suspense fallback={null}>
        <div
          style={{
            flex: 1, display: 'flex', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, height: '100%', width: '100%', flexDirection: 'row',// justifyContent: 'left', alignItems: 'center',
            backgroundColor: '#DCDCDC', backgroundImage: `url(${Images.backgroundSignin2})`, backgroundSize: 'cover'
          }}>

          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}>
            <Particles
              style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}
              params={{
                "particles": {
                  "number": {
                    "value": 80,
                    "density": {
                      "enable": true,
                      "value_area": 800
                    }
                  },
                  "size": {
                    "value": 5
                  },
                  "color": {
                    "value": "#aaa"
                  },
                  line_linked: {
                    color: "#aaa"
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": false,
                      "mode": "repulse"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 400,
                      "line_linked": {
                        "opacity": 1
                      }
                    },
                    "bubble": {
                      "distance": 400,
                      "size": 40,
                      "duration": 2,
                      "opacity": 8,
                      "speed": 3
                    },
                    "repulse": {
                      "distance": 200,
                      "duration": 0.4
                    },
                    "push": {
                      "particles_nb": 4
                    },
                    "remove": {
                      "particles_nb": 2
                    }
                  }
                }
              }}
            />
          </div>

          <Row style={{ position: 'absolute', height: '100%', width: '100%' }}>
            <Col lg='6' style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ flexDirection: 'column', zIndex: 40000 }}>
                <img alt="image" src={Images.logoTopLeft3} style={{
                  position: 'relative', width: '300px', display: 'block',
                  margin: 'auto'
                }} />

                {/* #### FORM LOGIN #### */}
                {/* // ------------------ Email or Mobile ------------------ */}
                <Row style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Col lg='8'>
                    <form onSubmit={(e) => this._pressLogin(e)} style={{ marginTop: '30px' }}>
                      <div style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <span style={{ fontSize: 28 }}>{t('force_change_password')}</span>
                        {/* --- สร้าง Form ในนี้ --- */}
                        <div className='table-tan' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 10, alignItems: 'center' }}>
                          <Table borderless>
                            <tbody>
                              <tr>
                                <th style={{ textAlign: 'right' }}><lable>{t('password')}</lable></th>
                                <td>
                                  <FormInput
                                    type={this.state.hidden ? "password" : "text"}
                                    placeholder="new_password"
                                    onChange={(e) => this.checkPassword(e)} value={newPassword}
                                    style={{
                                      marginLeft: 10, height: 30, width: 220,
                                      borderColor: 'transparent', padding: '10px'
                                    }}
                                  />
                                  {/* <input type={this.state.hidden ? "password" : "text"}
                                placeholder="New Password"
                                onChange={(e) => this.checkPassword(e)} value={newPassword}
                                style={{
                                  marginLeft: 10, height: 30, width: 220,
                                  borderColor: 'transparent', padding: '10px'
                                }} required
                              /> */}
                                </td>
                              </tr>
                              <tr>
                                <th style={{ textAlign: 'right' }}> <lable>{t('confirm_password')}</lable></th>
                                <td>
                                  <FormInput
                                    type={this.state.hidden ? "password" : "text"}
                                    placeholder="confirm_password"
                                    onChange={(e) => this.ConcheckPassword(e)} value={conNewPassword}
                                    style={{
                                      marginLeft: 10, height: 30, width: 220,
                                      borderColor: 'transparent', padding: '10px'
                                    }}
                                  />
                                  {/* <input type={this.state.hidden ? "password" : "text"}
                                placeholder="Confirm Password"
                                onChange={(e) => this.ConcheckPassword(e)} value={conNewPassword}
                                style={{
                                  marginLeft: 10, height: 30, width: 220,
                                  borderColor: 'transparent', padding: '10px'
                                }} required /> */}
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                        {/* --------------------- */}
                        <span style={{ color: 'red' }}>
                          {errorSubcodeRespond && getErrorMessage(parseInt(errorSubcodeRespond))}
                          {t(passNotEqual)}</span>
                        <div style={{ display: 'flex', marginTop: 10 }}>
                          <button
                            type='button'
                            // name={t(this.state.hidden ? "show" : "hide")}
                            onClick={() => this.toggleShow()}
                            style={{
                              // lineHeight: 0,
                              backgroundColor: '#a4a8a9',
                              minWidth: 120,
                              height: 30,
                              color: 'white',
                              fontSize: 15,
                              borderRadius: '15px',
                              borderWidth: 0,
                              marginRight: 10
                            }}
                          >{t(this.state.hidden ? "show" : "hide")}</button>
                          <SaveButton
                            name={t('submit')}
                            // onClick={this.handleHide}
                            loading={loadingRespond}

                            style={{
                              lineHeight: 0,
                              backgroundColor: '#a4a8a9',
                              width: 120,
                              height: 30,
                              color: 'white',
                              fontSize: 15,
                              borderRadius: '15px'
                            }}
                          />
                        </div>
                      </div>
                    </form>

                  </Col>
                  <Col lg='4' style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 15 }}>
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
                {/* //else */}
              </div>
            </Col>
          </Row>
        </div >
      </Suspense>

    );
  }
}

const mapStateToProps = (state) => ({
  stateSignin: state.signin.stateSignin,
  language: state.versatile.language,
  isAgreement: state.signin.isAgreement,
  menuUser: state.signin.menuUser,
  dataForce: state.signin.dataForce,
  loadingRespond: state.password.loadingRespond,
  errorSubcodeRespond: state.password.errorSubcodeRespond,
  passwordPolicyAuth: state.signin.passwordPolicyAuth,
});

const mapDispatchToProps = (dispatch) => ({
  respondChallenge: (newPassword) => dispatch(PasswordActions.respondChallenge(newPassword)),
  setStateReduxPassword: (name, value) => dispatch(PasswordActions.setStateRedux(name, value)),
  setStateReduxSignin: (name, value) => dispatch(SigninActions.setStateRedux(name, value)),
  getProfileAndMenu: () => dispatch(SigninActions.getProfileAndMenu()),

})

export default connect(mapStateToProps, mapDispatchToProps)(ForceChange)
