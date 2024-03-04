import React, { Component } from 'react'
import { connect } from 'react-redux'


const image = require('./Hino_connect_Menu Page.png')

class RoutePlaning extends Component {

  constructor(props) {
    super(props);
    this.state = {}

  }

  render() {

    return <div>
      <a href="https://tsquare.rtic-thai.info/services/e-logistics/" target="_blank">
        <img src={image} style={{ width: '100%' }}></img>
      </a>
    </div>
  }

}

const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {

}

export default (connect(mapStateToProps, mapDispatchToProps)(RoutePlaning))
