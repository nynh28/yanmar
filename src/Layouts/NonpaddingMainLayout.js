import React, { Component } from 'react'
// import { Route } from 'react-router'
import { Container } from 'reactstrap';
import EmptyLayout from './EmptyLayout.js'
import Sidebar from './Sidebar'
import Header from './Header'
import BreadcrumbHeader from './BreadcrumbHeader'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import VersatileActions from '../Redux/VersatileRedux'
import Advertising from '../Components/Advertising'
import SidebarFooter from './SidebarFooter'
import './css/scrollbarRight.css'
import { Helmet } from 'react-helmet'
// import './css/scrollbarRight.css'
// import './css/style.css'
// import './css/header.css'
import Script from 'react-load-script'
import loadjs from 'loadjs'
class NonpaddingMainLayout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bodyStyle: this.props.bodyStyle,
      scriptLoaded: false,
    }
  }

  componentDidMount() {
    // Jquery จะทำงานตอน Refresh หน้าเสร็จ
    // แต่ React / React Router ไม่ Refresh หน้า

    // แปลง Script JQuery => React Js Only!!
  }

  render() {

    // console.log(this.props.bodyStyle)
    let styleBody = this.props.bodyStyle
    const { component: Component, ...rest } = this.props
    // console.log(rest)
    // console.log(Component)
    // console.log('------------------ MainLayout Screen -------------------')
    return (

      <EmptyLayout {...rest} component={matchProps => (
        <div className="app">
          <div className="pace-done">
            <Header {...rest} />
            <div id="wrapper">

              <Sidebar {...this.props} />

              <div id="page-wrapper" className="gray-bg" style={{ marginRight: 0, minHeight: "calc(100vh - 61px)" }}>
                {/* {<Advertising />} */}
                {/* {rest && rest.location && rest.location.pathname != '/realtime' && <Advertising />} */}
                {/* <BreadcrumbHeader nonpadding={true} /> */}

                <div className="animated fadeInRight" style={{ marginLeft: -27, marginRight: -27, marginTop: 10 }}>
                  <Container fluid>
                    <Component {...matchProps} />
                  </Container>
                  {/* <SidebarFooter /> */}
                </div>
              </div>

            </div>
          </div>
        </ div>
      )} />

    )
  }
}


const mapStateToProps = (state) => {
  return {
    bodyStyle: state.versatile.sidebarStyle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBodyStyle: () => dispatch(VersatileActions.setStyleSidebar()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NonpaddingMainLayout))



