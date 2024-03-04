import React, { Component } from 'react'
import { Switch, withRouter } from 'react-router'
import {
    Row, Col,
    Card, CardHeader, CardBlock,
    Button,

} from "reactstrap";
import Images from '../../Themes/Images'
import RoundedButton from '../../Components/RoundedButton';
import { connect } from 'react-redux'

import VersatileActions from '../../Redux/VersatileRedux'
class TestScreen2 extends Component {

    handleClick = () => {
        console.log('click')
    }

    render() {
        // console.log('---------------------- TestScreen Screen ------------------------------')
        return (
            <Row>
                <Col lg="4">
                    <RoundedButton color="darkgreen" title="click" onClick={this.handleClick} />
                    <div>
                        <div className="feed-activity-list">

                            <div className="feed-element">
                                <a href="profile.html" className="pull-left">
                                    <img alt="image" className="img-circle" src={Images.profile} />
                                </a>
                                <div className="media-body ">
                                    <small className="pull-right">5m ago</small>
                                    <strong>Monica Smith</strong> posted a new blog. <br />
                                    <small className="text-muted">Today 5:60 pm - 12.06.2014</small>

                                </div>
                            </div>

                            <div className="feed-element">
                                <a href="profile.html" className="pull-left">
                                    <img alt="image" className="img-circle" src={Images.a2} />
                                </a>
                                <div className="media-body ">
                                    <small className="pull-right">2h ago</small>
                                    <strong>Mark Johnson</strong> posted message on <strong>Monica Smith</strong> site. <br />
                                    <small className="text-muted">Today 2:10 pm - 12.06.2014</small>
                                </div>
                            </div>
                            <div className="feed-element">
                                <a href="profile.html" className="pull-left">
                                    <img alt="image" className="img-circle" src={Images.a3} />
                                </a>
                                <div className="media-body ">
                                    <small className="pull-right">2h ago</small>
                                    <strong>Janet Rosowski</strong> add 1 photo on <strong>Monica Smith</strong>. <br />
                                    <small className="text-muted">2 days ago at 8:30am</small>
                                </div>
                            </div>
                            <div className="feed-element">
                                <a href="profile.html" className="pull-left">
                                    <img alt="image" className="img-circle" src={Images.a4} />
                                </a>
                                <div className="media-body ">
                                    <small className="pull-right text-navy">5h ago</small>
                                    <strong>Chris Johnatan Overtunk</strong> started following <strong>Monica Smith</strong>. <br />
                                    <small className="text-muted">Yesterday 1:21 pm - 11.06.2014</small>
                                    <div className="actions">
                                        <a className="btn btn-xs btn-white"><i className="fa fa-thumbs-up"></i> Like </a>
                                        <a className="btn btn-xs btn-white"><i className="fa fa-heart"></i> Love</a>
                                    </div>
                                </div>
                            </div>


                        </div>


                    </div>
                </Col>
                <Col lg="4">
                    <li className="list-group-item">
                        <p><a className="text-info">@Fimola 987</a> I belive that. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <small className="block text-muted"><i className="fa fa-clock-o"></i> 1 minuts ago</small>
                    </li>
                </Col>
            </Row >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        //   users: state.signin.users
        back: state.versatile.color,
    }
}
const mapDispatchToProps = (dispatch) => ({
    // signin: (users) => dispatch(SigninActions.signin(users))
    setColor: (color) => dispatch(VersatileActions.setBackground(color)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestScreen2)) 