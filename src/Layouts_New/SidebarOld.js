import React, { Component } from 'react';
import VersatileActions from '../Redux/VersatileRedux'
import SigninActions from '../Redux/SigninRedux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import './assets/css/style5.css'
import $ from 'jquery'
import loadjs from 'loadjs'
import SVGIcon from "./SVGIcon";
import { setMenu } from "./Menu"
import { get } from 'lodash'
import { t } from '../Components/Translation'
let checkHideSubMenu = true
class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showHomeMenu: false,
            listMenu: [],
            mainButton: {
                en: 'Landings Page',
                th: 'หน้าเริ่มต้น'
            },
            carGoLink: {
                en: 'CarGoLink',
                th: 'คาร์โก้ลิ้งค์'
            },
            setRole: 'Hino',
            language: this.props.language,
            openProfile: false
            // listMenu: this.props.sidebarArray,
        }
        this.transitioning = 0
        this.myRef = React.createRef()
        if (window.performance) {
            if (performance.navigation.type == 1) {
                this.props.clearCacheSidebar()
            }
        }
    }

    setActive = (mainMenu, subMenu) => {
        let tmp_menu = this.state.listMenu
        let tmp_index_select
        if (mainMenu) {
            tmp_menu.forEach((e, i) => {
                if (e.linkTo) {  // 1. ไม่มีเมนูย่อย
                    if (e.linkTo == mainMenu) {
                        e.liActive = "active"
                        tmp_index_select = i
                    }
                } else {       // 2. มีเมนูย่อย

                    if (e.subMenu) {
                        e.subMenu.forEach((el, ind) => {
                            if (el.linkTo == mainMenu) {
                                el.liActive = "active"
                                e.liActive = "active"
                                e.ulCollapse = "nav nav-second-level collapse in"
                                tmp_index_select = i
                            }
                        })
                    }
                }
            })

            tmp_menu.forEach((e, i) => {
                if (i != tmp_index_select) {
                    if (e.subMenu) {
                        e.liActive = null
                        e.ulCollapse = "nav nav-second-level collapse"
                        e.subMenu.forEach((el, ind) => {
                            el.liActive = null
                        })
                    } else {
                        e.liActive = null
                    }
                }
            })
        }
        this.setState({ listMenu: tmp_menu })
        this.props.resetBreadcrumb()
    }

    componentWillReceiveProps(newProps) {
        if (newProps.breadcrumb && newProps.breadcrumb != this.props.breadcrumb) {
            this.setActive(newProps.breadcrumb)
        }
    }

    componentWillMount() {
        if (!this.props.isAgreement && this.props.history.location.pathname.toLowerCase() !== '/privacyandpolicy' && this.props.stateSignin) {
            this.props.history.push("/privacyandpolicy")
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        let sidebar_width = $("#width-sidebar1").width()
        if (!this.props.sidebar_width)
            // this.props.setSidebarWidth(sidebar_width)
            // this.props.history.push("dashboard")
            loadjs(['./js/plugins/metisMenu/jquery.js',
                './js/inspinia.js'
                , './js/bootstrap.js'
            ], () => {
            })

        let { menuUser } = this.props

        let newListMenu = setMenu(get(menuUser, 'userMenus', []))

        if (get(newListMenu, '[0].liActive', null)) {
            if (this.props.history && this.props.history.location && this.props.history.location.pathname) {

                // ---------------- Restricting permission ----------------

                let url = this.props.history.location.pathname.toLowerCase()
                let lstPageOther = ['/changepassword', '/privacyandpolicy', '/updateprofile']
                for (let i in newListMenu) {
                    if (lstPageOther.includes(url)) break
                    else if (newListMenu[i].subMenu !== null) {
                        let { subMenu } = newListMenu[i]
                        let checkSubMenu = subMenu.find(obj => url.includes(obj.linkTo.toLowerCase()))
                        if (checkSubMenu !== undefined) break
                    } else if (url.includes(newListMenu[i].linkTo.toLowerCase())) break
                    // console.log(newListMenu.length , this.props.stateSignin );
                    if (newListMenu.length - 1 == i && this.props.stateSignin === true) {
                        // console.log('SWITCH TO HOMEPAGE', newListMenu)
                        // this.props.history.push("/homePage")
                    }

                }
                // ---------------------------------------------------------

                if (this.props.history.location.pathname != "/homePage" && newListMenu[0].liActive == "active") {
                    // let tmp = this.state.listMenu
                    newListMenu[0].liActive = null
                    let path_now = this.props.history.location.pathname.split('/')
                    newListMenu.forEach((e, i) => {
                        if (!e.subMenu) {
                            if (e.linkTo == path_now[1])
                                e.liActive = "active"
                        } else {
                            e.subMenu.forEach((el, ind) => {
                                if (el.linkTo == path_now[1]) {
                                    e.liActive = "active"
                                    e.ulCollapse = "nav nav-second-level collapse in"
                                    el.liActive = "active"
                                }
                            })
                        }
                    })
                    // this.setState({ listMenu: tmp })
                }
            }
        }
        // console.log(newListMenu)
        // this.props.setSidebar(newListMenu)
        // console.log('-------------------- New List Menu From Sidebar --------------------------')
        this.setState({ listMenu: newListMenu })

        let _navHeight = $("#div-sidebar-collapse").height()
        let _navHeight2 = $("#divMyScroll").height()
        let _navHeight3 = $("#nav-sidebar-collapse").height()
        // console.log("_navHeight 1 : ", _navHeight)
        // console.log("_navHeight 2 : ", _navHeight2)
        // console.log("_navHeight 3 : ", _navHeight3)
    }

    _handleClickMainLi = (index) => {
        let tmp = this.state.listMenu
        let trigger = $("#li-main" + index)
        let trigger_ul = $("#ul-main" + index)
        if (tmp[index].liActive == null) {    // 1. ถ้าปุ่มที่เราคลิก ไม่ถูกแอคทีฟ
            if (tmp[index].subMenu) {           // 2. เช็คปุ่มที่เราคลิกว่ามี Submenu
                if (tmp[index].liActive == "active select") {

                } else {
                    //  ถ้าปุ่มที่เราคลิกยัง ไม่active และมีเมนูย่อย
                    trigger.addClass('active')
                    trigger_ul.removeClass("collapse").addClass("collapsing").height(tmp[index].subMenu.length * 35)
                    setTimeout(() => {
                        trigger_ul.removeClass("collapsing").addClass("collapse in").height("")
                    }, 350)

                    tmp[index].liActive = "active active-select"
                    tmp[index].ulCollapse = "nav nav-second-level collapse in"        // สั่งเปิด
                }

                tmp.forEach((e, i) => {
                    if (i != index) {
                        e.ulCollapse = "nav nav-second-level collapse"
                        if (e.subMenu) {
                            e.liActive = null
                        }
                    }

                })

            } else if (!tmp[index].subMenu) {   // 4. เช็คปุ่มที่เราคลิกว่าไม่มี Submenu
                tmp[index].liActive = "active"    // 5. ตั้งค่า ให้ปุ่มที่เราคลิก มันแอคทีฟ
                tmp.forEach((e, i) => {
                    if (i != index) {
                        e.liActive = null  // 6. ให้ ปุ่มที่เคยแอคทีฟ => ไม่แอคทีฟ
                        if (e.ulCollapse != null) {
                            e.ulCollapse = "nav nav-second-level collapse"
                            if (e.subMenu) {
                                e.subMenu.forEach((el, ind) => {
                                    el.liActive = null
                                })
                            }
                        }
                    }
                })
            }
        }
        else if (tmp[index].liActive != null) {  // ถ้าปุ่มที่คลิก active
            if (tmp[index].subMenu) {   // ถ้า active + มีเมนูย่อย

                let status = false
                let subMenuActive = null
                let indexSubMenuActive = null
                tmp[index].subMenu.forEach((e, i) => {
                    if (e.liActive == "active") {
                        status = true
                        subMenuActive = e
                        indexSubMenuActive = i
                    }
                })
                // 1. กรณีคลิกธรรมดา ไม่คลิกเมนูย่อย เมนูย่อย ยังไม่ถูก active
                if (status == false) {
                    if (tmp[index].liActive == "active") {
                        trigger.removeClass('active')

                        setTimeout(() => {
                            tmp[index].liActive = null
                            tmp[index].ulCollapse = "nav nav-second-level collapse"  // สั่งปิด
                        }, 350)
                    }

                    tmp.forEach((e, i) => {
                        if (i != index) {
                            e.ulCollapse = "nav nav-second-level collapse"
                            if (e.subMenu) {  // ปรับ liActive อันอื่นที่ ไม่มีเมนูย่อย ไปเป็น null ด้วย
                                e.liActive = null
                            } else {
                                // e.liActive = null  // ทำไม่ได้เพราะ ถ้าเปิด เมนูย่อยดูเฉยๆ จะโดนปิดไปด้วย
                            }
                        }
                    })
                }

                // 2. กรณีคลิกเมนูหลักแล้ว คลิกเมนูย่อยอีก เมนูย่อยถูก active อยู่
                else if (status == true) {
                    if (tmp[index].subMenu[indexSubMenuActive].liActive && checkHideSubMenu != true) {
                        checkHideSubMenu = false
                        trigger.removeClass('active')

                        setTimeout(() => {
                            tmp[index].liActive = null
                            tmp[index].ulCollapse = "nav nav-second-level collapse"  // สั่งปิด
                        }, 250)
                    } else {  //เมนูย่อยถูก active อยู่ But Main Menu not active
                        checkHideSubMenu = false
                        trigger.addClass('active')
                        setTimeout(() => {
                            tmp[index].liActive = "active"
                            tmp[index].ulCollapse = "nav nav-second-level collapse in"   // สั่งเปิด
                        }, 350)
                    }
                }

            }
        }


        // this.props.setSidebar(tmp)
        this.setState({ listMenu: tmp })

    }

    _handleClickSubLi = (item, index, topIndex) => {
        let tmp = this.state.listMenu
        tmp[topIndex].subMenu[index].liActive = "active"
        tmp[topIndex].liActive = "active"
        tmp[topIndex].ulCollapse = "nav nav-second-level collapse in"
        tmp[topIndex].subMenu.forEach((e, slot) => {  // สลับ active ของเมนูย่อย ในเมนูหลักอันเดียวกัน
            if (slot != index) {
                e.liActive = null
            }
        })

        tmp.forEach((e, indexMainMenu) => {
            if (e.liActive == "active" && indexMainMenu != topIndex) {  // ปิด active ของเมนูหลักอันอื่น ที่ไม่ใช่เมนูหลัก ที่มีเมนูย่อยที่เราใช้งานอยุ่
                e.liActive = null
            }

            if (e.subMenu) {
                e.subMenu.forEach((el, indexSubMenu) => {
                    if (indexMainMenu != topIndex) { // ถ้าเมนูหลักอันอื่นๆไม่ใช่ เมนูหลักที่เราคลิกเมนูย่อยไป ให้มันปิด active ในเมนูย่อยมันให้หมด
                        el.liActive = null
                    }
                })
            }
        })
        checkHideSubMenu = true
        // this.props.setSidebar(tmp)
        this.setState({ listMenu: tmp })
    }

    myScrollFunc = () => {
        // document.getElementById("divForScroll").innerHTML = x += 1;
    }

    render() {
        let { dataLogin, profileUser, menuUser } = this.props
        let { openProfile } = this.state
        let vehicleCount, driverCount
        let checkCachedToken = get(this.props.dataLogin, 'userTokenInfo.refreshToken', '')
        if (checkCachedToken === "") {
            this.props.history.push('/signin')
        }
        else {
            vehicleCount = menuUser.vehicleCount
            driverCount = menuUser.driverCount
        }
        return (
            // <nav className="navbar-default navbar-static-side myscroll-sidebar1" role="navigation"
            //     style={{ zIndex: 200, left: 0 }}>
            <nav id="nav-sidebar-collapse" className="navbar-default navbar-static-side myscroll-sidebar1" role="navigation"
                style={{
                    zIndex: 100000,
                    backgroundColor: 'rgb(213 216 214 / 0.8)',
                    boxShadow: '-2px 0px 8px 0 rgb(0 0 0 / 24%)',
                    left: 0,
                    // height: 'calc(100vh - 293px)'
                    // height: 685
                }}>
                {/* <div id={"divMyScroll"} className="slimScrollDiv myscroll-sidebar2" ref={this.myRef} onScroll={this.myScrollFunc}> */}
                <div id={"divMyScroll"} className={this.props.status_sidebar && this.props.status_sidebar == "show" ? "slimScrollDiv myscroll-sidebar2" : (this.props.status_sidebar && this.props.status_sidebar == "hide" ? "slimScrollDiv" : "slimScrollDiv myscroll-sidebar2")} ref={this.myRef} onScroll={this.myScrollFunc}>
                    <div id="div-sidebar-collapse" className="sidebar-collapse" style={{ paddingTop: 45 }}>
                        <a className="close-canvas-menu"
                            onClick={() => {
                                $("body").removeClass("canvas-menu pace-done mini-navbar");
                                $("body").addClass("canvas-menu")
                            }}
                        ><i className="fa fa-times" style={{ fontSize: 30 }} /></a>
                        <ul className="nav metismenu" id="side-menu" style={{ display: "block" }}>
                            <div style={{ height: 10, display: 'flex', alignItems: 'flex-end' }} >
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'row', bottom: 0 }}>
                                    <div style={{ flex: 1, height: 1, backgroundColor: 'transparent' }}></div>
                                    <div style={{ flex: 8, height: 1, backgroundColor: 'white' }}></div>
                                    <div style={{ flex: 1, height: 1, backgroundColor: 'transparent' }}></div>
                                </div>
                            </div>
                            {this.state.listMenu && this.state.listMenu.map((e, i) => {

                                if (e.en == "Logistics Dashboard" && dataLogin.userId != 956 && dataLogin.userId != 957) return
                                if (e.en == "Control Room" && (dataLogin.userLevelId != 21 && dataLogin.userLevelId != 22)) return

                                return (<li key={"main-li" + i} id={'li-main' + i} className={e.liActive}
                                    onClick={() => this._handleClickMainLi(i)}>
                                    {/* {e.subMenu && <a><i className={e.icon}></i><span className="nav-label">{e[this.props.language]}</span> */}

                                    {/* {e.subMenu && <a><SVGIcon name={e.name} width={e.name == "Dashboard" ? 27.5 : e.name == "Home Page" ? 27.5 : 25} style={{ paddingRight: 10 }} /><span className="nav-label">{e[this.props.language]}</span> */}
                                    {e.subMenu && <a>
                                        <div style={{ width: 18, marginRight: 10, display: 'flex', justifyContent: 'center' }}>
                                            <SVGIcon name={e.name} width={18} height={23} style={{ width: 18 }} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <span className="nav-label">{e[this.props.language]}</span>
                                        </div>
                                        {/* {e.subMenu && <a><i className={e.icon}></i><span className="nav-label">{e.name}</span> */}
                                        {/* <div style={{ width: 30, paddingRight: 10 }}> */}
                                        <span className="fa arrow" style={{ paddingRight: 10 }}></span>
                                        {/* </div> */}
                                    </a>}

                                    {/* {!e.subMenu && <a href= {"#/" + e.linkTo}><i className={e.icon}></i><span className="nav-label">{e[this.props.language]}</span></a>} */}
                                    {!e.subMenu && <a href={"#/" + e.linkTo}>
                                        <div style={{ width: 18, marginRight: 10, display: 'flex', justifyContent: 'center' }}>
                                            {
                                                e.faIcon ?
                                                    <i className={e.faIcon} aria-hidden="true" style={{ fontSize: 16, color: 'rgb(53 60 66)', marginRight: 0 }}></i>
                                                    : <SVGIcon name={e.name} width={18} height={23} style={{ width: 18 }} />
                                            }
                                        </div>
                                        <span className="nav-label">{(dataLogin.userLevelId === 21 || dataLogin.userLevelId === 32 || dataLogin.userLevelId === 31) && e.id === 105 ? t('side_menu_74') :
                                            (dataLogin.userLevelId === 21 || dataLogin.userLevelId === 32 || dataLogin.userLevelId === 31) && e.id === 106 ? t('side_menu_75') :
                                                e[this.props.language]}{' '}

                                            {e.id === 105 && vehicleCount ? '(' + vehicleCount + ')' :
                                                e.id === 106 && driverCount ? '(' + driverCount + ')' : ''}</span>
                                    </a>}
                                    {/* {e.display != "none" && !e.subMenu && <a href={"#" + e.linkTo}><i className={e.icon}></i><span className="nav-label">{e.name}</span></a>} */}

                                    {e.subMenu && <ul id={"ul-main" + i}
                                        className={e.ulCollapse}
                                    // className="nav nav-second-level collapse"
                                    >
                                        {e.subMenu.map((el, ind) => {
                                            // console.log(el)

                                            return (
                                                // <li key={"sub-li" + ind} id={"sub-li" + i} className={el.liActive} onClick={() => this._handleClickSubLi(el, ind, i)}><a href={'#/' + el.linkTo}><i className={el.icon}></i>{el.name}</a></li>
                                                <li key={"sub-li" + ind}
                                                    id={"sub-li" + i}
                                                    className={el.liActive}
                                                    onClick={() => this._handleClickSubLi(el, ind, i)}>
                                                    {
                                                        el.parentId === 120 ?
                                                            <a>
                                                                <div style={{ flex: 1, color: '#9a9a9a' }}>
                                                                    {el[this.props.language]}
                                                                </div>
                                                                {el.subMenu && el.subMenu.length > 0
                                                                    &&
                                                                    <span className="fa arrow"></span>}
                                                            </a>
                                                            :
                                                            dataLogin.userLevelId === 21 && el.parentId === 136 ?
                                                                <a href={'#/' + el.linkTo} style={{ display: 'flex' }}>
                                                                    <div style={{ flex: 1 }}>
                                                                        {"Customer Vehicles"}
                                                                    </div>
                                                                    {el.subMenu && el.subMenu.length > 0
                                                                        &&
                                                                        <span className="fa arrow"></span>}
                                                                </a> :
                                                                dataLogin.userLevelId === 21 && el.parentId === 134 ?
                                                                    <a href={'#/' + el.linkTo} style={{ display: 'flex' }}>
                                                                        <div style={{ flex: 1 }}>
                                                                            {"Customer Drivers"}
                                                                        </div>
                                                                        {el.subMenu && el.subMenu.length > 0
                                                                            &&
                                                                            <span className="fa arrow"></span>}
                                                                    </a> :
                                                                    el.parentId === 115 && el.en == "HMST Dashboard" ?

                                                                        (dataLogin.userLevelId === 21 || dataLogin.userLevelId === 22) ?
                                                                            <a href={'#/' + el.linkTo} style={{ display: 'flex' }}>
                                                                                <div style={{ flex: 1 }}>
                                                                                    {el[this.props.language]}
                                                                                </div>
                                                                                {el.subMenu && el.subMenu.length > 0
                                                                                    &&
                                                                                    <span className="fa arrow"></span>}
                                                                            </a> : ""
                                                                        :
                                                                        <a href={'#/' + el.linkTo} style={{ display: 'flex' }}>
                                                                            <div style={{ flex: 1 }}>
                                                                                {el[this.props.language]}
                                                                            </div>
                                                                            {el.subMenu && el.subMenu.length > 0
                                                                                &&
                                                                                <span className="fa arrow"></span>}
                                                                        </a>
                                                    }

                                                    {el.subMenu && el.subMenu.length > 0 && <ul
                                                        className="nav nav-third-level collapse ">
                                                        {
                                                            // el.subMenu.map(ell => <li ><a href={'#/' + ell.linkTo}>
                                                            //   {ell[this.props.language]}</a></li>)
                                                            el.subMenu.map((ell, index) => <li key={index}><a href={'#/' + ell.linkTo}>
                                                                {ell[this.props.language]}</a></li>)
                                                        }
                                                    </ul>
                                                    }
                                                </li>
                                            )
                                        })}
                                    </ul>}
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ flex: 1, height: 1, backgroundColor: 'transparent' }}></div>
                                        <div style={{ flex: 8, height: 1, backgroundColor: 'white' }}></div>
                                        <div style={{ flex: 1, height: 1, backgroundColor: 'transparent' }}></div>
                                    </div>
                                </li>
                                )

                            })}
                            {/* // ****** DON'T DELETE ******* // */}
                            {/* <li id={"last-li-menu"} style={{ height: 60 }}> */}
                            {/* // ****** DON'T DELETE ******* // */}
                            {/* </li> */}
                            {/* // ****** DON'T DELETE ******* // */}

                        </ul>

                    </div>

                </div>
            </nav >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        stateSignin: state.signin.stateSignin,
        groupType: state.signin.groupType,
        userGroup: state.signin.userGroup,
        currentUser: state.signin.currentUser,
        sidebarArray: state.versatile.sidebarArray,
        checkSetSidebar: state.versatile.checkSetSidebar,
        breadcrumb: state.versatile.breadcrumb,
        language: state.versatile.language,
        sidebar_width: state.versatile.sidebar_width,
        status_sidebar: state.versatile.status_sidebar,
        dataLogin: state.signin.dataLogin,
        profileUser: state.signin.profileUser,
        isAgreement: state.signin.isAgreement,
        menuUser: state.signin.menuUser,
    }
}
const mapDispatchToProps = (dispatch) => ({
    // signin: (users) => dispatch(SigninActions.signin(users))
    setSidebar: (data) => dispatch(VersatileActions.setSidebar(data)),
    checkSetSidebar: (data) => dispatch(VersatileActions.checkSetSidebar(data)),
    resetBreadcrumb: () => dispatch(VersatileActions.resetBreadcrumb()),
    setSidebarWidth: (width) => dispatch(VersatileActions.setSidebarWidth(width)),
    getProfileAndMenu: () => dispatch(SigninActions.getProfileAndMenu()),
    signout: () => dispatch(SigninActions.signout()),
    clearCacheSidebar: () => dispatch(VersatileActions.clearSidebarCache()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sidebar))

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