import React, { Component, Suspense } from 'react'
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
import Images from '../Themes/Images'
class MainLayout extends Component {

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

    let _showFooter = ""
    if (this.props.showFooter == undefined) _showFooter = true
    else _showFooter = false

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

      // <Suspense fallback={null}>
      <EmptyLayout {...rest} component={matchProps => (
        <div className="app">
          <div className="pace-done">
            <Header {...rest} />
            <div id="wrapper">

              <Sidebar {...this.props} />
              <div id="page-wrapper" className="gray-bg" style={{ marginRight: 0, minHeight: "calc(100vh - 61px)" }}>
                {/* <Advertising style={{ marginLeft: -12, marginRight: -15, position: 'fixed', top: 61, zIndex: 3 }} /> */}
                {/* {rest && rest.location && rest.location.pathname != '/realtime' && <Advertising />} */}
                {/* <BreadcrumbHeader /> */}
                {/* <div>
                  <img src={Images.ads} style={{ width: "100%", height: 'auto', visibility: 'hidden' }} />
                </div > */}
                <div className="wrapper wrapper-content animated fadeInRight" style={{ padding: '5px 0px 20px 0px' }}>
                  <Container fluid>
                    <Component {...matchProps} />
                  </Container>
                  {_showFooter && <SidebarFooter />}
                </div>
              </div>

            </div>
          </div>
        </ div>
      )} />
      // </Suspense>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout))



