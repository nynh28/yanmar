import React, { Component } from 'react'
// import { Switch, withRouter } from 'react-router'
import Images from '../Themes/Images'
import { connect } from 'react-redux'

import {
  Row, Col,
  Card, CardHeader, CardBlock,
  Button,

} from "reactstrap";

class Advertising extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    const { style } = this.props

    return (
      // <Row style={{
      //   // lineHeight: '70px',
      //    height: '70px'
      //   //  , backgroundColor: '#c2e4ff', textAlign: 'center'
      //   // , marginTop: 10
      // }}>
      //   {/* {'Advertising Area'} */}
      //   <img src={Images.ads} style={{ width: "100%", minHeight: 70 }} />
      // </Row>


      <div style={style || { marginLeft: -15, marginRight: -15 }}>
        <img src={Images.ads} style={{ width: "100%", height: 'auto' }} />
      </div >
    )
  }
}



export default Advertising
