import React, { Component } from 'react'
// import { Route } from 'react-router'
import { Container } from 'reactstrap';
import EmptyLayout from './EmptyLayout.js'
import Sidebar from './Sidebar'
import Header from './Header'
import BreadcrumbHeader from './BreadcrumbHeader'
import SidebarFooter from './SidebarFooter'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import VersatileActions from '../Redux/VersatileRedux'
import { Helmet } from 'react-helmet'
import Advertising from '../Components/Advertising'
import './css/scrollbarRight.css'
// import './css/style.css'
// import './css/header.css'
import Script from 'react-load-script'
import loadjs from 'loadjs'
class NonMainLayout extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bodyStyle: this.props.bodyStyle,
      scriptLoaded: false,
    }
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
  componentDidMount() {
    // Jquery จะทำงานตอน Refresh หน้าเสร็จ
    // แต่ React / React Router ไม่ Refresh หน้า

    // แปลง Script JQuery => React Js Only!!
  }

  render() {

    // console.log(this.props.bodyStyle)
    let styleBody = this.props.bodyStyle
    const { component: Component, ...rest } = this.props
    return (
      // <EmptyLayout {...rest} component={matchProps => (
      //     <div className="app">
      //         <div className="pace-done">
      //             <div id="wrapper">

      //                 <Sidebar {...this.props} />

      //                 <div id="page-wrapper" className="gray-bg" style={{ marginRight: 0 }}>

      //                     <Header {...rest} />
      //                     <BreadcrumbHeader />
      //                     {rest && rest.location && rest.location.pathname != '/realtime' && <Advertising />}
      //                     <div className="wrapper wrapper-content animated fadeInRight">
      //                         <Container fluid>
      //                             <Component {...matchProps} />
      //                         </Container>
      //                         <SidebarFooter />
      //                     </div>
      //                 </div>

      //             </div>
      //         </div>
      //     </ div>
      // )} />

      // <EmptyLayout {...rest} component={matchProps => (
      //     <div className="app">
      //         <div className="pace-done">
      //             <Header {...rest} />
      //             <div id="wrapper">

      //                 <Sidebar {...this.props} />

      //                 <div id="page-wrapper" className="gray-bg" style={{ marginRight: 0 }}>


      //                     <BreadcrumbHeader />
      //                     {rest && rest.location && rest.location.pathname != '/realtime' && <Advertising />}
      //                     <div className="wrapper wrapper-content animated fadeInRight">
      //                         <Container fluid>
      //                             <Component {...matchProps} />
      //                         </Container>
      //                         <SidebarFooter />
      //                     </div>
      //                 </div>

      //             </div>
      //         </div>
      //     </ div>
      // )} />


      <EmptyLayout {...rest} component={matchProps => (
        <div className="app">
          <div className="pace-done">
            <Header {...rest} />
            {/* <div id="wrapper"> */}

            {/* <Sidebar {...this.props} /> */}

            {/* <div id="page-wrapper" className="gray-bg" style={{ marginRight: 0 }}> */}
            <div className="gray-bg" style={{ marginRight: 0 }}>
              {/* <Advertising /> */}
              {/* {rest && rest.location && rest.location.pathname != '/realtime' && <Advertising />} */}
              {/* <BreadcrumbHeader /> */}
              <div className="wrapper wrapper-content animated fadeInRight" style={{ padding: '20px 0px 0px 0px' }}>
                <Container fluid>
                  <Component {...matchProps} />
                </Container>
                {/* <SidebarFooter /> */}
              </div>
            </div>

            {/* </div> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NonMainLayout))



