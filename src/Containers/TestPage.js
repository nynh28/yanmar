import React, { Component } from 'react'
import { connect } from 'react-redux'
import TestActions from '../Redux/TestRedux'

class TestPage extends Component {

  constructor(props) {
    super(props)


    this.state = {
      a: 10
    }
  }

  handleChange = (e) => {
    // console.log(e.target.value)
    // this.a = e.target.value
    // this.setState(
    //   { a: e.target.value }
    // )

    this.props.changeValue(e.target.value, 'somevalue')
  }

  signin = () => {
    this.props.signin('admin', 'Game@123')
  }

  render() {
    return <div>
      hello {this.props.a}
      <input onChange={this.handleChange}></input>

      <span>{this.props.error}</span>

      <button onClick={this.signin}>signin</button>
    </div>
  }

}

const mapStateToProps = (state) => ({
  // a: state.test.a
  error: state.test.data
});

const mapDispatchToProps = (dispatch) => ({
  changeValue: (param1, param2) => dispatch(TestActions.actionOne(param1, param2)),
  signin: (user, pass) => dispatch(TestActions.signin(user, pass))
});


export default connect(mapStateToProps, mapDispatchToProps)(TestPage)
