import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row } from 'reactstrap';
// import './Styles/PannelBoxWithButtonStyles.css'
class PannelBoxWithButton extends Component {
    render() {
        const { component: Component, ...rest } = this.props

        // console.log(this.props.title)
        // console.log(this.props)
        return (
            <div className="ibox float-e-margins">
                <div className="ibox-title">
                    <h3 style={{ fontWeight: 'bold', fontSize: 22 }}>{this.props.title}</h3>
                    {this.props.enableFirstButton && <div style={{ textAlign: 'right', marginTop: -20 }}>
                        {this.props.enableFirstButton &&
                            <div className="ibox-tools" style={{ float: 'none' }}>
                                <button className="btn btn-primary btn-xs" onClick={this.props.firstFunction}>
                                    {/* <span style={{ marginRight: 5 }, [this.props.firstTextStyle]}>{this.props.firstText}</span> */}
                                    <span style={{ marginRight: 5 }}>{this.props.firstText}</span>
                                    <i className={this.props.firstIcon}></i></button>
                            </div>}

                        {this.props.enableSecondButton &&
                            <div className="ibox-tools" style={{ float: 'none' }}>
                                <button className="btn btn-primary btn-xs" onClick={this.props.secondFunction}>
                                    {/* <span style={{ marginRight: 5 }, [this.props.secondTextStyle]}>{this.props.secondText}</span> */}
                                    <span style={{ marginRight: 5 }}>{this.props.secondText}</span>
                                    <i className={this.props.secondIcon}></i></button>
                            </div>}
                    </div>}

                    <div className="ibox-content">
                        <div className="DefaultLayout">
                            {this.props.children}
                        </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PannelBoxWithButton)