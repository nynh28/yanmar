import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux'
import $ from 'jquery'

class MapControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return ""
  }
}

const mapStateToProps = (state) => ({
  // language: state.versatile.language
});

const mapDispatchToProps = (dispatch) => ({
  // setInfoWindowIndex: (id) => dispatch(SummaryActions.setInfoWindowIndex(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MapControls)