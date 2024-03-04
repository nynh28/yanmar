import React, { Component, Suspense } from "react";
import VersatileActions from "../Redux/VersatileRedux";
import SigninActions from "../Redux/SigninRedux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./assets/css/style5.css";
import "./assets/css/newSidebar.css";
import $ from "jquery";
import loadjs from "loadjs";
import SVGIcon from "./SVGIcon";
import { setMenuTractor } from "./Menu";
import { get, isEmpty, isEqual } from "lodash";
import { t } from "../Components/Translation";
import i18n from "../i18n";

const STYLEDIVMENU = {
  width: 18,
  marginRight: 10,
  display: "flex",
  justifyContent: "center",
};
const STYLEICON = { fontSize: 16, color: "rgb(53 60 66)", marginRight: 0 };

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.myRef = React.createRef();
  }

  componentWillMount() {
    if (
      !this.props.isAgreement &&
      this.props.history.location.pathname.toLowerCase() !==
        "/privacyandpolicy" &&
      this.props.stateSignin
    ) {
      this.props.history.push("/privacyandpolicy");
    }
    // i18n.changeLanguage(this.props.language)

    let { menuUser, dataLogin } = this.props;
    let path = get(this, "props.history.location.pathname");
    let _path = path.substring(1, path.length);
    this.defaultMenu = setMenuTractor(
      [...get(dataLogin, "user_menu", []),
      // {
      //   "menu_id": 999,
      //   "parent_menu_id": 0,
      // },
      // {
      //   "menu_id": 998,
      //   "parent_menu_id": 0,
      // },
      // {
      //   "menu_id": 997,
      //   "parent_menu_id": 0,
      // },
      // {
      //   "menu_id": 996,
      //   "parent_menu_id": 0,
      // },
    ],
      dataLogin.user_id,
      dataLogin.user_level_id
    );
    let [newListMenu, pathAll] = this.setActiveMenu(this.defaultMenu, _path);

    // this.pathAll = pathAll
    // this.checkLinkHavePermission(_path)

    // console.log('-------------------- New List Menu From Sidebar --------------------------')
    this.newListMenu = JSON.parse(JSON.stringify(newListMenu));
    this.setState({ listMenu: newListMenu });
  }

  componentDidMount() {
    // window.addEventListener('popstate', () => {
    //   if (this.clickFromSidebar) {
    //     this.clickFromSidebar = false
    //   } else {
    //     let path = get(document, 'location.hash')
    //     console.log('path', path)
    //     let _path = path.substring(2, path.length)
    //     this.checkLinkHavePermission(_path)
    //   }
    // })
    // i18n.changeLanguage(this.props.language)
  }

  // checkLinkHavePermission(_path) {
  //   if (_path) {
  //     let check = this.pathAll.includes(_path)
  //     let lstOtherPage = ['changePassword', 'privacyAndPolicy', 'updateProfile']
  //     let checkOtherPath = lstOtherPage.includes(_path)
  //     if (check || checkOtherPath) {
  //       console.log('OKKKKKKKKKKKKK!!!!!!!!!!!!')
  //     }
  //     // let [newListMenu] = this.setActiveMenu(this.defaultMenu, _path)
  //     // console.log('newListMenu', newListMenu)
  //     // this.setState({ listMenu: newListMenu })
  //   }

  //   //     // ---------------- Restricting permission ----------------

  //   //     let url = this.props.history.location.pathname.toLowerCase()
  //   //     let lstPageOther = ['/changepassword', '/privacyandpolicy', '/updateprofile']
  //   //     for (let i in newListMenu) {
  //   //       if (lstPageOther.includes(url)) break
  //   //       else if (newListMenu[i].subMenu !== null) {
  //   //         let { subMenu } = newListMenu[i]
  //   //         let checkSubMenu = subMenu.find(obj => url.includes(obj.linkTo.toLowerCase()))
  //   //         if (checkSubMenu !== undefined) break
  //   //       } else if (url.includes(newListMenu[i].linkTo.toLowerCase())) break
  //   //       // console.log(newListMenu.length , this.props.stateSignin );
  //   //       if (newListMenu.length - 1 == i && this.props.stateSignin === true) {
  //   //         // console.log('SWITCH TO HOMEPAGE', newListMenu)
  //   //         // this.props.history.push("/homePage")
  //   //       }

  //   //     }
  //   //     // ---------------------------------------------------------
  // }

  setActiveMenu(defaultMenu, pathnameOrId) {
    let newListMenu = [],
      pathAll = "",
      active;
    for (let i in defaultMenu) {
      let newM = JSON.parse(JSON.stringify(defaultMenu[i]));
      if (newM.subMenu) {
        let [subMenu, _pathAll, _active] = this.setActiveMenu(
          newM.subMenu,
          pathnameOrId
        );
        newM.subMenu = subMenu;
        if (_active) newM.active = _active;
        if (_active) active = _active;
        if (_pathAll) pathAll += _pathAll;
      } else {
        pathAll += newM.url;
      }
      if (pathnameOrId === newM.url || pathnameOrId === newM.id) {
        newM.active = true;
        active = true;
      }

      newListMenu.push(newM);
    }
    return [newListMenu, pathAll, active];
  }

  handleClickMenu(e, id, disable) {
    if (!disable) {
      this.clickFromSidebar = true;
      let [newListMenu] = this.setActiveMenu(this.defaultMenu, id);
      this.newListMenu = JSON.parse(JSON.stringify(newListMenu));
      let arr = this.findParentMenuId(id);
      let active = ".active";
      let collapseIn = ".collapse.in";
      if (!isEmpty(arr)) {
        let _str = ":not(#li-" + arr.join("):not(#li-") + ")";
        active += _str;
        collapseIn += _str.replace("li", "ul");
      }
      let un_target_li = $(active);
      let un_target_ul = $(collapseIn);
      if (un_target_li) un_target_li.removeClass("active");
      if (un_target_ul)
        un_target_ul.removeClass("collapse in").addClass("collapse");
      let target_li = $("#li-" + id);
      target_li.addClass("active");
    }
    e.stopPropagation();
  }

  openSubMenu(e, id, level) {
    let _newListMenu,
      subMenu,
      menu,
      arr = this.findParentMenuId(id);
    _newListMenu = JSON.parse(JSON.stringify(this.newListMenu));
    subMenu = _newListMenu;
    for (let i in arr) {
      menu = subMenu.find((item) => item.id === arr[i]);
      if (menu.subMenu && i != arr.length - 1) subMenu = menu.subMenu;
    }
    let _active = menu.active;
    menu.active = !_active;
    subMenu.map((item) => {
      if (item.id !== id) delete item.active;
    });
    this.newListMenu = JSON.parse(JSON.stringify(_newListMenu));

    let un_target_ul = $(".collapse.in[name=sub-lv-" + level + "]");
    let un_target_li = $(".active[name=sub-lv-" + level + "]");
    let target_li = $("#li-" + id);
    let target_ul = $("#ul-" + id);

    if (_active) {
      // _active === true ให้ปิด
      target_li.removeClass("active");
      target_ul.removeClass("collapse in").addClass("collapsing").height(0);
      setTimeout(() => {
        target_ul.removeClass("collapsing").addClass("collapse");
      }, 350);
    } else {
      // _active === false ให้เปิด
      if (un_target_ul)
        un_target_ul
          .removeClass("collapse in")
          .addClass("collapsing")
          .height(0);
      if (un_target_li) un_target_li.removeClass("active");
      target_li.addClass("active");
      target_ul
        .removeClass("collapse")
        .addClass("collapsing")
        .height(menu.subMenu.length * 39 + 10);
      setTimeout(() => {
        if (un_target_ul)
          un_target_ul.removeClass("collapsing").addClass("collapse");
        target_ul.removeClass("collapsing").addClass("collapse in");
      }, 350);
    }
    e.stopPropagation();
  }

  findParentMenuId(id) {
    let userMenus = get(this, "props.dataLogin.user_menu", []),
      arr,
      key,
      item,
      pId;
    arr = [id];
    key = id;

    while (key !== 0) {
      item = userMenus.find((userMenu) => userMenu.menu_id === key);
      if (item) {
        pId = item.parent_menu_id;
        if (pId !== 0) arr.unshift(pId);
        key = pId;
      } else key = 0;
    }
    return arr;
  }

  render() {
    i18n.changeLanguage(this.props.language);
    let { dataLogin, profileUser, menuUser } = this.props;
    let { openProfile, listMenu } = this.state;
    let vehicleCount, driverCount;
    let checkCachedToken = get(
      this.props.dataLogin,
      "user_token_info.refresh_token",
      ""
    );
    if (checkCachedToken === "") {
      this.props.history.push("/signin");
    } else {
    }

    return (
      <Suspense fallback={null}>
        <nav
          id="nav-sidebar-collapse"
          className="navbar-default navbar-static-side myscroll-sidebar1"
          role="navigation"
          style={{
            zIndex: 100000,
            backgroundColor: "rgb(213 216 214 / 0.8)",
            boxShadow: "-2px 0px 8px 0 rgb(0 0 0 / 24%)",
            left: 0,
          }}
        >
          <div
            id={"divMyScroll"}
            className="slimScrollDiv myscroll-sidebar2"
            ref={this.myRef}
            onScroll={this.myScrollFunc}
          >
            <div
              id="div-sidebar-collapse"
              className="sidebar-collapse"
              style={{ paddingTop: 45 }}
            >
              <a
                className="close-canvas-menu"
                onClick={() => {
                  $("body").removeClass("mini-navbar");
                }}
              >
                <i className="fa fa-times" style={{ fontSize: 30 }} />
              </a>
              <ul
                className="nav metismenu"
                id="side-menu"
                style={{ display: "block" }}
              >
                {/* ------- line on menu home ------- */}
                <div
                  style={{
                    height: 10,
                    display: "flex",
                    alignItems: "flex-end",
                  }}
                >
                  {this.separatorLine()}
                </div>
                {/* --------------------------------- */}

                {/* ------- set Menu ------- */}
                {listMenu &&
                  listMenu.map((ele, index) => {
                    // ------- fix -------
                    // if (ele.name == "side_menu_79" && dataLogin.userId != 956 && dataLogin.userId != 957) return
                    // if (ele.name == "side_menu_71" && (dataLogin.userLevelId != 21 && dataLogin.userLevelId != 22)) return
                    // -------------------
                    return this.setLayoutMenu(ele, 0, dataLogin.userLevelId);
                  })}
                {/* // ****** DON'T DELETE ******* // */}
                {/* <li id={"last-li-menu"} style={{ height: 60 }}> */}
                {/* // ****** DON'T DELETE ******* // */}
                {/* </li> */}
                {/* // ****** DON'T DELETE ******* // */}
              </ul>
            </div>
          </div>
        </nav>
      </Suspense>
    );
  }

  setLayoutMenu(ele, level, userLevelId) {
    let { menuUser } = this.props;
    // let { vehicleCount, driverCount } = menuUser;
    let { id, name, url, icon, active, subMenu, disable } = ele;

    return subMenu ? (
      <li
        key={id}
        id={"li-" + id}
        className={active ? "active" : ""}
        name={"sub-lv-" + level}
        onClick={(e) => this.openSubMenu(e, id, level)}
      >
        <a>
          <div style={STYLEDIVMENU}>
            {Array.isArray(icon) ? (
              <i className={icon[0]} aria-hidden="true" style={STYLEICON}></i>
            ) : (
              <SVGIcon name={icon} width={18} height={23} />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <span className="nav-label">{t(name)}</span>
          </div>
          <span className="fa arrow" style={{ paddingRight: 10 }}></span>
        </a>
        {this.setLayoutSubMenu(ele, level, userLevelId)}
        {this.separatorLine()}
      </li>
    ) : (
      <li
        key={id}
        id={"li-" + id}
        name={"main-lv-" + level}
        className={(active ? "active" : "") + (disable ? " disable" : "")}
        onClick={(e) => this.handleClickMenu(e, id, disable)}
      >
        <a href={"#/" + url}>
          <div style={STYLEDIVMENU}>
            {Array.isArray(icon) ? (
              <i className={icon[0]} aria-hidden="true" style={STYLEICON}></i>
            ) : (
              <SVGIcon name={icon} width={18} height={23} />
            )}
          </div>
          <span className="nav-label">
            {/* {lstUserLevel.includes(userLevelId) && id === 105 ? t('side_menu_74') :
              lstUserLevel.includes(userLevelId) && id === 106 ? t('side_menu_75') :
                t(name)} */}
            {t(name)}
            {/* {id === 105 && vehicleCount !== undefined && ' (' + vehicleCount + ')'}
            {id === 106 && driverCount !== undefined && ' (' + driverCount + ')'} */}
          </span>
        </a>
        {this.separatorLine()}
      </li>
    );
  }

  // ------------------ without sub menu ------------------
  setLayoutWithoutSubMenu(ele, level, userLevelId) {
    let { id, name, url, active, subMenu, disable } = ele;

    return subMenu ? (
      <li
        key={id}
        id={"li-" + id}
        name={"sub-lv-" + level}
        className={active ? "active" : ""}
        onClick={(e) => this.openSubMenu(e, id, level)}
      >
        <a>
          <div className="nav-label" style={{ flex: 1 }}>
            {t(name)}
          </div>
          <span className="fa arrow"></span>
        </a>
        {this.setLayoutSubMenu(ele, level, userLevelId)}
      </li>
    ) : (
      <li
        key={id}
        id={"li-" + id}
        name={"main-lv-" + level}
        className={(active ? "active" : "") + (disable ? " disable" : "")}
        onClick={(e) => this.handleClickMenu(e, id, disable)}
      >
        <a href={"#/" + url}>
          <div style={{ flex: 1 }} className="nav-label">
            {t(name)}
          </div>
        </a>
      </li>
    );
  }

  // ------------------ sub menu ------------------
  setLayoutSubMenu(ele, level) {
    let { id, name, url, icon, active, subMenu } = ele;

    return (
      <ul
        key={id}
        id={"ul-" + id}
        name={"sub-lv-" + level}
        className={"nav nav-second-level collapse" + (active ? " in visible" : "")}
      >
        {subMenu.map((el, ind) => {
          return this.setLayoutWithoutSubMenu(el, level + 1);
        })}
      </ul>
    );
  }

  separatorLine() {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "row" }}>
        <div
          style={{ flex: 1, height: 1, backgroundColor: "transparent" }}
        ></div>
        <div style={{ flex: 8, height: 1, backgroundColor: "white" }}></div>
        <div
          style={{ flex: 1, height: 1, backgroundColor: "transparent" }}
        ></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    stateSignin: state.signin.stateSignin,
    // groupType: state.signin.groupType,
    // userGroup: state.signin.userGroup,
    // currentUser: state.signin.currentUser,
    // sidebarArray: state.versatile.sidebarArray,
    // checkSetSidebar: state.versatile.checkSetSidebar,
    breadcrumb: state.versatile.breadcrumb, // อาจไม่ได้ใช้
    language: state.versatile.language,
    // sidebar_width: state.versatile.sidebar_width,
    // status_sidebar: state.versatile.status_sidebar,
    dataLogin: state.signin.dataLogin,
    profileUser: state.signin.profileUser,
    isAgreement: state.signin.isAgreement,
    menuUser: state.signin.menuUser,
    platformId: state.signin.platformId,
  };
};
const mapDispatchToProps = (dispatch) => ({
  // signin: (users) => dispatch(SigninActions.signin(users))
  setSidebar: (data) => dispatch(VersatileActions.setSidebar(data)),
  // checkSetSidebar: (data) => dispatch(VersatileActions.checkSetSidebar(data)),
  resetBreadcrumb: () => dispatch(VersatileActions.resetBreadcrumb()),
  setSidebarWidth: (width) => dispatch(VersatileActions.setSidebarWidth(width)),
  getProfileAndMenu: () => dispatch(SigninActions.getProfileAndMenu()),
  signout: () => dispatch(SigninActions.signout()),
  clearCacheSidebar: () => dispatch(VersatileActions.clearSidebarCache()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Sidebar)
);

// file : style5.css
// non active font color line (#a7b1c2 ) now #353C42  :
// 40, 3513, 3928

// active font color line (#293846) now #545A60 :
// 52, 247, 344

// delete background line : 240

// minimize sidebar button (#1ab394) now #8F9BA6:
// 677, 678

// hover minimize sidebar button (#18a689) now rgb(128, 130, 133):
// 686, 687

// ตอนหุบเมนู แล้วดูเมนูย่อย สีเดิม คือ #2f4050 สีใหม่ คือ #4A5055 :
// 151, 339, 524, 1260, 1263, 1266, 1269, 1272, 3150,
// 3219, 3239, 4926, 5192
