import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
// import { isEmpty } from 'react-redux-firebase'

class EmptyLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scriptLoaded: false,

    }
    this.transitioning = 0
  }

  componentDidMount() {
      
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
