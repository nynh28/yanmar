import React, { Component } from 'react'
import { connect } from 'react-redux'
import TestActions from '../Redux/TestRedux'

class TestPage2 extends Component {

  constructor(props) {
    super(props)

  }

  render() {
    return <div>
      page2 {this.props.a}

    </div>
  }

}

const mapStateToProps = (state) => ({
  a: state.test.a
});

const mapDispatchToProps = (dispatch) => ({

});


export default connect(mapStateToProps, mapDispatchToProps)(TestPage2)
