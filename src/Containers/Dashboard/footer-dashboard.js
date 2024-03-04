import React, { Component } from 'react'
// import { Switch, withRouter } from 'react-router'

import { connect } from 'react-redux'
import AuthActions from '../../Redux/AuthRedux'
import {
  Row, Col,
  Card, CardHeader, CardBlock,
  Button,

} from "reactstrap";

// import * as Ladda from 'ladda';

// import './Styles/StylesDashboard.css'
class Dashboard extends Component {

  componentDidMount() {
    // this.props.signin("user001@gmail.com", "123456789")
  }

  // constructor(props) {
  //     super(props)
  //     this.state = {
  //         // l : Ladda.bind('.ladda-button-demo'),
  //         test : 'terer',
  //     }

  //     // this.orderHeaderFilter = this.orderHeaderFilter.bind(this);
  //     this.l = Ladda.bind('.ladda-button-demo')


  // }


  // onClk(e){
  //     console.log(this.state.test)

  //     this.l.ladda( 'start' );

  //     // Do something in backend and then stop ladda
  //     // setTimeout() is only for demo purpose
  //     setTimeout(function(){
  //         this.l.ladda('stop')
  //     },2000)


  // }

  render() {
    return (
      // <div style={{ display: 'flex', flexDirection: 'column', flex: 1, width: "100%", height: "100%", backgroundColor: 'pink' }}>
      // {/* <span>55555555555555GSDDDDDDDDDDDDDDDD</span>
      //     <span>GHGHSFJSKLDFKSDKFJSKLDJFKLDSJKFJSDKLJFLK</span>
      //     <span>GHGHSFJSKLDFKSDKFJSKLDJFKLDSJKFJSDKLJFLK</span>
      //     <span>GHGHSFJSKLDFKSDKFJSKLDJFKLDSJKFJSDKLJFLK</span>
      //     <span>GHGHSFJSKLDFKSDKFJSKLDJFKLDSJKFJSDKLJFLK</span>
      //     <span>GHGHSFJSKLDFKSDKFJSKLDJFKLDSJKFJSDKLJFLK</span>
      //     <span>GHGHSFJSKLDFKSDKFJSKLDJFKLDSJKFJSDKLJFLK</span>
      //     <span>GHGHSFJSKLDFKSDKFJSKLDJFKLDSJKFJSDKLJFLK</span> */}

      // </div>




      <div>

        {/* <button class="ladda-button ladda-button-demo btn btn-primary" data-style="zoom-in" onClick={()=>this.onClk()}>Submit</button> */}

        <Row>
          <Col lg="12">
            {
              process.env.REACT_APP_NODE_ENV
            }
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <li className="list-group-item">
              <p><a className="text-info">@Stock Man</a> Check this stock chart. This price is crazy! </p>
              <div className="text-center m">
                <span id="sparkline8"><canvas width="170px" height="150px" style={{ display: "inline-block", width: "170", height: "150", verticalAlign: "top" }}></canvas></span>
              </div>
              <small className="block text-muted"><i className="fa fa-clock-o"></i> 2 hours ago</small>
            </li>
          </Col>
          <Col lg="4">
            <li className="list-group-item">
              <p><a className="text-info">@Alan Marry</a> I belive that. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              <small className="block text-muted"><i className="fa fa-clock-o"></i> 1 minuts ago</small>
            </li>
          </Col>
        </Row >
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    // data_signin: state.auth.data_signin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard))
