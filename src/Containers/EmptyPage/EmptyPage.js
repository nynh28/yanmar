import React, { Component } from 'react'
import { connect } from 'react-redux'

class EmptyPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (<></>)
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(EmptyPage)
