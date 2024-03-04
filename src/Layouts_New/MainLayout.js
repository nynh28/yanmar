import React, { Component, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import HeaderTractor from "./HeaderTractor";
import Header from "./Header";
import SidebarTractor from "./SidebarTractor";
import Sidebar from "./Sidebar";
import Content from "../Themes/content";
import Footer from "./Footer";
import $ from "jquery";
import { get } from "lodash";
import { checkAuthen } from "./CheckAuthen";
import { connect } from "react-redux";
import FooterTractor from "./FooterTractor";

class MainLayout extends Component {
  render() {
    const { component: Component, ...rest } = this.props;
    const { showFooter, contentStyles, isFullScreen, menuUser, dataLogin } = this.props;
    let _showFooter = showFooter == undefined ? true : showFooter;
    let _isFullScreen = isFullScreen === undefined ? false : isFullScreen;
    let path = get(this, "props.history.location.pathname");
    let pathName = path.substring(1, path.length);
    if (get(this, "props.history.location.state") === "fristTest") {
      $("body").addClass("mini-navbar");
    } else {
      $("body").removeClass("mini-navbar");
      // $("body").addClass("canvas-menu")
    }

    return (
      <>
        {checkAuthen(get(menuUser, "userMenus", []), pathName) ? (
          <>
            {this.props.dataLogin.platform_id === 3 ? (
              <SidebarTractor />
            ) : (
              <Sidebar />
            )}
            {/* <Sidebar /> */}
            <div
              id="page-wrapper"
              className="gray-bg1"
              style={{ minHeight: "100vh" }}
            >
              {/* <div id="page-wrapper" className="gray-bg" style={{ minHeight: 1086 }}> */}
              {this.props.dataLogin.platform_id === 3 ? (
                <HeaderTractor />
              ) : (
                <Header />
              )}
              {/* <div className="wrapper wrapper-content" style={{ paddingTop: 50 }}> */}
              <div className="wrapper wrapper-content" style={{ padding: 0 }}>
                <Route
                  {...rest}
                  render={(props) => (
                    <Content
                      contentStyles={{ ...contentStyles }}
                      isFullScreen={_isFullScreen}
                    >
                      <Component {...props} />
                    </Content>
                  )}
                />
              </div>
              {_showFooter && this.props.dataLogin.platform_id === 3 ? (
                <FooterTractor />
              ) : (
                <Footer />
              )}
            </div>
          </>
        ) : (
          this.props.history.push("/AccessDenied")
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  menuUser: state.signin.menuUser,
  dataLogin: state.signin.dataLogin,
});

export default withRouter(connect(mapStateToProps)(MainLayout));
