import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
// import EmptyLayout from './EmptyLayout'
import { Container } from 'reactstrap';
import { withRouter } from 'react-router-dom';
// import './Styles/PannelBoxStyles.css'
import $ from 'jquery'
// import loadjs from 'loadjs'
class BasicWizzard extends Component {
    state = {};

    componentDidMount = () => {
        // loadjs([
        //     // './js/plugins/metisMenu/jquery.js',
        //     './js/inspinia.js'
        // ], () => {
        //     console.log('------- Load Js From Basiz Wizzard ---------')
        // })

    }

    _manageOnoff = () => {
        let trigger1 = $("#manage-ibox1")
        let trigger2 = $("#manage-ibox2")
        if (trigger1.hasClass('ibox border-bottom')) {                    // ปิดอยู่ จะสั่งเปิด
            trigger1.removeClass('ibox border-bottom').addClass('ibox')
            trigger2.css({ "display": "" })

        } else {                                                        // เปิดอยู่จะสั่งปิด
            trigger1.addClass('border-bottom')
            trigger2.css({ "display": "none" })
        }
    }

    _onCollapseComponent = (e) => {
        let mybutton = $('#my-chevron-button-' + `${this.props.boxid}`)
        // let myibox1 = $("#manage-ibox1")
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
        // const { name } = this.props
        return (
            <div id={"manage-ibox1"} className="ibox ">
                <div className="ibox-title">
                    <h5>{this.props.title}</h5>
                    <div className="ibox-tools">
                        <a className="collapse-link"
                            onClick={(e) => this._onCollapseComponent(e)}
                        // onClick={() => this._manageOnoff()}
                        >
                            <i id={"my-chevron-button-" + this.props.boxid} className="fa fa-chevron-up"></i>
                        </a>
                        <a className="dropdown-toggle" data-toggle="dropdown">
                            <i className="fa fa-wrench"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><a className="dropdown-item">Config option 1</a>
                            </li>
                            <li><a className="dropdown-item">Config option 2</a>
                            </li>
                        </ul>
                        <a className="close-link">
                            <i className="fa fa-times"></i>
                        </a>
                    </div>
                </div>

                {/* <div className="ibox-content" id={"manage-ibox2"}> */}
                <div className="ibox-content" id={this.props.boxid}>
                    <Route {...rest} render={matchProps => {
                        return <div className="">
                            {this.props.children}
                        </div>

                    }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicWizzard)
