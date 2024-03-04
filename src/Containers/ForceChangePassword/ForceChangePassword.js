import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Particles from 'react-particles-js';
import { connect } from 'react-redux'
import { IconButton, Button } from '@material-ui/core';
import Images from '../../Themes/Images'
import PasswordActions from '../../Redux/PasswordRedux'
import { Redirect } from 'react-router-dom'
import VersatileActions from '../../Redux/VersatileRedux'
import $ from 'jquery'
import {
    Container, Row, Card, Col, Form,
} from 'reactstrap'

import LaddaButton, { S, SLIDE_LEFT } from 'react-ladda';
import SaveButton from '../../Components/SaveButton'
import { get } from 'lodash'


class ForgetPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isActive: true,
            language: this.props.language ? this.props.language : 'en',
            loginText: {
                en: 'SUBMIT',
                th: 'ยืนยัน',
                ja: 'SUBMIT',
            },
            userLogin: {
                en: 'Forgot Password',
                th: 'กรุณาเข้าสู่ระบบ',
                ja: 'ลืมรหัสผ่าน'
            },
            reSendText: {
                en: 'Resend Password',
                th: 'ส่งอีกครั้ง',
                ja: 'Resend Password',
            },
            emailOrMobile: '',
            confirmCode: '',
            newPassword: '',
            conNewPassword: '',
            passNotEqual: '',
        }

    }

    componentDidMount = () => {

    }
    componentWillUnmount = () => {
        clearInterval(this.interval)
    }

    componentDidUpdate(prevProps, prevState) {
        let { infoForgotPassword, errorSubcodeForget, stateForget, countCoolDown } = this.props
        if (prevProps.infoForgotPassword !== infoForgotPassword && infoForgotPassword) {
            this.setState({
                isActive: false
            })
        }
        if (prevProps.errorSubcodeForget !== errorSubcodeForget
            && errorSubcodeForget && !this.state.isActive) {
            this.setState({
                isActive: true
            })
        }
        if (prevProps.stateForget !== stateForget && stateForget) {
            this.props.history.push("/")
        }
        if (prevProps.countCoolDown !== countCoolDown) {
            // console.log(countCoolDown)
            if (prevProps.countCoolDown <= 0 && countCoolDown > 0) {
                this.cooldownButton()
                this.props.setStateRedux('timeStart', (new Date()).getTime() / 1000 | 0)
            } else if (countCoolDown === 0) {
                clearInterval(this.interval)
                this.props.setStateRedux('timeStart', null)
            }
        }

    }

    cooldownButton() {
        this.interval = setInterval(() => {
            // console.log(((new Date()).getTime() / 1000 | 0), this.props.countCoolDown)
            this.props.setCoolDown()
        }, 1000);
    }

    componentWillMount() {
        this.props.setStateRedux('loadingForget', false)
        this.props.setStateRedux('loadingConfirm', false)
        this.props.setStateRedux('errorSubcodeForget', null)
        this.props.setStateRedux('errorSubcodeConfirm', null)
        this.props.setStateRedux('infoForgotPassword', null)
        // console.log((new Date()).getTime())
        let { timeStart } = this.props
        if (timeStart && ((new Date()).getTime() / 1000 | 0) - timeStart < 30) {
            let timeNow = ((new Date()).getTime() / 1000 | 0) - timeStart
            this.props.setStateRedux('countCoolDown', 30 - timeNow)
            // console.log(30 - timeNow)
            this.cooldownButton()

        }
        // if (this.props.countCoolDown > 0) {
        //   this.cooldownButton()
        // }

    }

    sendEmailOrMobile = (e) => {
        e.preventDefault()
        this.props.forgotPassword(this.state.emailOrMobile)
        // this.setState({
        //   isActive: false
        // })
        // this.props.forgotPassword(email&mobile)
    }

    _pressLogin = (e) => {
        e.preventDefault()
        let { infoForgotPassword } = this.props
        let { confirmCode, newPassword, conNewPassword } = this.state

        if (newPassword !== conNewPassword) {
            this.setState({ passNotEqual: 'The passwords do not match' })
            this.props.setStateRedux('errorSubcodeConfirm', null)
        }
        else {
            this.setState({ passNotEqual: '' })
            this.props.confirmForgot(get(infoForgotPassword, 'userName'), confirmCode, newPassword)
        }

    }

    handleHide = () => {
        this.setState({
            isActive: false
        })
    }

    checkPassword = (e) => {
        let pass = e.target.value

        let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (pass.match(paswd)) console.log('Yes')
        else console.log('No')
        this.setState({ newPassword: pass })


    }

    ConcheckPassword = (e) => {
        let pass = e.target.value

        let paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
        if (pass.match(paswd)) console.log('Yes')
        else console.log('No')
        this.setState({ conNewPassword: pass })


    }


    render() {
        let { emailOrMobile, newPassword, conNewPassword, confirmCode, passNotEqual } = this.state
        let { infoForgotPassword, errorSubcodeConfirm, errorSubcodeForget,
            loadingConfirm, loadingForget, countCoolDown } = this.props

        return (
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
                            <img alt="image" src={Images.HinoConnectClear} style={{ position: 'relative', width: '300px', marginBottom: '30px' }} />
                            {/* #### FORM LOGIN #### */}
                            <form onSubmit={(e) => this.sendEmailOrMobile(e)}>
                                <div style={{ display: 'flex', flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                    <span style={{ fontSize: 28 }}>{this.state.userLogin[this.props.language]}</span>
                                    {/* --- สร้าง Form ในนี้ --- */}
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 10, alignItems: 'center' }}>

                                        <input type='text' placeholder="Email or Mobile"
                                            onChange={(e) => this.setState({ emailOrMobile: e.target.value })} value={emailOrMobile}
                                            style={{
                                                marginLeft: 10, backgroundColor: '#a4a8a9', borderRadius: 5, height: 30, width: 220,
                                                borderColor: 'transparent', padding: '10px'
                                            }} required />
                                    </div>
                                    {/* --------------------- */}
                                    <span style={{ color: 'red', marginTop: 10 }}>{errorSubcodeForget}</span>
                                    <div style={{ display: 'flex', marginTop: 10 }}>
                                        <SaveButton
                                            name={countCoolDown > 0 ? countCoolDown : this.state.loginText[this.props.language]}
                                            // onClick={this.handleHide}
                                            loading={loadingForget}
                                            disabled={countCoolDown > 0 && true}
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
                        </div>
                    </Col>
                </Row>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.versatile.language,
    infoForgotPassword: state.password.infoForgotPassword,
    loadingForget: state.password.loadingForget,
    loadingConfirm: state.password.loadingConfirm,
    errorSubcodeForget: state.password.errorSubcodeForget,
    errorSubcodeConfirm: state.password.errorSubcodeConfirm,
    stateForget: state.password.stateForget,
    countCoolDown: state.password.countCoolDown,
    timeStart: state.password.timeStart,

});

const mapDispatchToProps = (dispatch) => ({
    forgotPassword: (targetDelivery) => dispatch(PasswordActions.forgotPassword(targetDelivery)),
    confirmForgot: (userName, confirmationCode, password) => dispatch(PasswordActions.confirmForgot(userName, confirmationCode, password)),
    setStateRedux: (name, value) => dispatch(PasswordActions.setStateRedux(name, value)),
    setCoolDown: () => dispatch(PasswordActions.setCoolDown()),

})

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)