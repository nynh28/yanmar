import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
// import { isEmpty } from 'react-redux-firebase'

class EmptyLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showHomeMenu: false,
      // listMenu: listMenu,
      scriptLoaded: false,

    }
    this.transitioning = 0
  }

  // const EmptyLayout = ({ component: Component, ...rest }) => {
  // console.log(this)
  componentDidMount() {
    // loadjs(['./js/plugins/metisMenu/jquery.js', './js/inspinia.js'], () => {

    //   console.log('------- Load Js From EmptyLayout ---------')
    //   // $(document).ready(function(){
    //   //   $('li').click(function(){
    //   //     alert('------ Test Alert SideBar 00000000000------------')
    //   //   })
    //   // })
    // })
    // if (isEmpty(this.props.auth)) {
    // console.log('aa')
    // const { path } = this.props
    // this.props.history.push({ pathname: '/', redirect: path })
    // this.props.history.push('/dashboard')
    // } else {
    // this.props.history.push('/signin')
    // }
  }

  componentWillReceiveProps(newProps) {
    // console.log(newProps)
    // if (!isEmpty(this.props.auth) && isEmpty(newProps.auth)) {
    // console.log('bb')
    // this.props.history.push('/signin')
    // }
  }
  handleScriptCreate = () => {
    this.setState({ scriptLoaded: false })
  }

  handleScriptError = () => {
    this.setState({ scriptError: true })
  }

  handleScriptLoad = () => {
    this.setState({ scriptLoaded: true })
  }

  render() {
    const { component: Component, ...rest } = this.props
    // console.log(rest)
    // console.log(this.props)
    return (
      <Route {...rest} render={matchProps => {
        return <div className="DefaultLayout">
          <Component {...matchProps} />
        </div>
      }
      } />
    )
  }
}
export default withRouter(EmptyLayout)
