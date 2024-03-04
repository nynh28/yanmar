import React, { Component, Suspense } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import VersatileActions from '../Redux/VersatileRedux'
import SigninActions from '../Redux/SigninRedux'
import './css/style5.css'
import $ from 'jquery'
import Images from '../Themes/Images'
import { Button } from 'antd';
import 'react-notifications-component/dist/theme.css'
import './css/customTypes.css'
import Amplify, { PubSub } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub/lib/Providers';
import RealtimeActions from '../Redux/RealtimeRedux'
import NotificationRedux from '../Redux/NotificationRedux'
import ToastNotification from '../Containers/Notification/ToastNotification';
import { get } from 'lodash'
import { useTranslation } from 'react-i18next'
import { t } from '../Components/Translation'
import Message from '../Components/Message';
import HeaderNotification from '../Containers/Notification/HeaderNotification';
import { ENDPOINT_BASE_URL, ENDPOINT_BASE_TOPIC_EVENT_2 } from '../Config/app-config';

const LiLanguage = (arg) => {
  const { i18n } = useTranslation()
  const changeLanguage = (Language) => {
    i18n.changeLanguage(Language)
  }
  return (
    <li>
      <a onClick={() => {
        changeLanguage(arg.language)
        arg.onClick()
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <img src={arg.src} style={{ width: 22, height: 15, marginRight: 10 }} />{arg.name} </div>
      </a>
    </li >
  )
}


let TOPIC_EVERT
const INITIAL_VALUE = {
  value: 'User',
  label: 'User'
}

class Header extends Component {
  state = {
    profileValue: INITIAL_VALUE,
    checkMinimalButton: false,
    scriptLoaded: false,

    mailbox: "dropdown",
    notifybox: "dropdown",
    languagebox: "dropdown",
    dropdownLogout: "dropdown",
    language: this.props.language,
  }

  updateDimensions = () => {
    if (window.innerWidth < 768) {
      this.props.statusSidebar('hide')
    } else {
      this.props.statusSidebar('show')
    }
  };

  componentDidUpdate(prevProps, prevState) {
    let { toastEvent, messageList } = this.props
    if (prevProps.stateSignin !== this.props.stateSignin) {
      if (this.props.stateSignin === false) {
        this.props.history.push("/")
      }
    }

    if (prevProps.toastEvent !== toastEvent) {
      let dt = toastEvent
      let _messageList = JSON.parse(JSON.stringify(messageList));

      _messageList.unshift({
        "unix": dt.unix,
        "gpsdate": dt.gps.gpsdate,
        "event_id": dt.event_id,
        "lat": dt.gps.lat,
        "lng": dt.gps.lng,
        "acc": dt.gps.acc,
        "speed": dt.gps.speed,
        "course": dt.gps.course,
        "location": "-",
        "vehicle_info": {
          "vid": dt.vid,
          "vin_no": dt.vin_no,
          "licenseplate": dt.licenseplate,
          "vehicle_name": dt.vehicle_id
        },
        "class_type": dt.class_type,
        "speed_limit": dt.condition_val,
      })

      // console.log("_messageList : ", _messageList)
      this.props.setMessageList(_messageList)
      let unreadTotal = (this.props.unreadTotal + 1)
      this.props.setUnreadTotal(unreadTotal)
    }
  }

  async componentWillMount() {
    let { stateSignin, isAgreement, topicEvent, dataLogin, custIdByUser } = this.props
    if (stateSignin === false) this.props.history.push("/")


    //#region Subscribe topic NOTIFY
    if (dataLogin.userLevelId == 41 || dataLogin.userLevelId == 42) {
      let custList = []
      if (custIdByUser.length > 0) custList = custIdByUser
      else custList = await this.getCustomerByUserId(dataLogin.userId)


      console.log("custList : ", custList)

      let topics = []
      for (let index in custList) {
        // let subEventTopic = PubSub._pluggables[0]._topicObservers.get(this.props.topicEvent)
        if (!TOPIC_EVERT && isAgreement) {  // if (!TOPIC_EVERT && isAgreement && topicEvent) {
          // Subscribe
          let topic = ENDPOINT_BASE_TOPIC_EVENT_2 + custList[index].int_cust_id
          let topicConnect = PubSub._pluggables[0]._topicObservers.get(topic)
          if (topicConnect === undefined || topicConnect.size === 0) {
            topics.push(ENDPOINT_BASE_TOPIC_EVENT_2 + custList[index].int_cust_id)
          }
        }
      }
      if (topics.length > 0) this.subscribe(topics)
    }
    //#endregion
  }

  subscribe(topics) {
    console.log("subscribe  : ", topics)
    // TOPIC_EVERT = PubSub.subscribe("NotiForTest").subscribe({
    TOPIC_EVERT = PubSub.subscribe(topics).subscribe({
      // TOPIC_EVERT = PubSub.subscribe("/HINO/NOTIFY/#").subscribe({
      // next : we successfully received a message and inside data is that message
      next: (data) => {
        // console.log("TOPIC EVENT : ", data.value)
        // console.log("TOPIC EVENT : ", JSON.stringify(data.value))
        this.props.setToastEvent(data.value)
      },
      // error : something went wrong when trying to subscribe to the topic
      error: error => console.error(error),
      // close : stop subscribing to this topic
      close: () => console.log('Done'),
    });
  }

  unsubscribe() {
    if (TOPIC_EVERT !== undefined) {
      TOPIC_EVERT.unsubscribe();
      TOPIC_EVERT = undefined
    }
  }

  async getCustomerByUserId(userId) {
    var object = { userId }
    var api = ENDPOINT_BASE_URL + "fleet/get_manage_customer"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();

    if (responseJson.length > 0) {
      this.props.setCustomerByUserId(responseJson)
      return responseJson
    }
    else {
      this.props.setCustomerByUserId([])
      return []
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
    // console.log('TOPIC_EVERT:unsubscribe out if', TOPIC_EVERT)
    if (!this.props.stateSignin) this.unsubscribe()
  }

  onFullscreen = (e) => {
    const isFullScreen = document.fullscreenElement
    if (isFullScreen) {
      $(".daterangepicker").appendTo("#overlay-panel");
      $(".ant-select-dropdown").appendTo("#overlay-panel");

      $("#chart-history").css("height", "830px");
      $(".test-footer").css("height", "450px");
      $(".combinations-chart").css("overflow", "scroll").css("height", "425px");

    } else {
      $(".daterangepicker").appendTo("body");
      $(".ant-select-dropdown").appendTo("#overlay-panel");

      $("#chart-history").css("height", "900px");
      $(".test-footer").removeAttr("style");
      $(".combinations-chart").removeAttr("style");
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    window.addEventListener('fullscreenchange', this.onFullscreen)
  }

  testClick = () => {
    if (this.props.status_sidebar && this.props.status_sidebar == "show") {
      this.setState({ checkMinimalButton: true })
      this.props.statusSidebar('hide')
      $('#divMyScroll').removeClass("myscroll-sidebar2")
      $("body").addClass("pace-done mini-navbar");          // สั่งปิด ย่อ หด
      // $("body").addClass("pace-done body-small");          // สั่งปิด ย่อ หด
      $("#background-full1").css("display", "none")
      // $('#side-menu').hide();
    }
    else if (this.props.status_sidebar && this.props.status_sidebar == "hide") {
      this.setState({ checkMinimalButton: false })
      this.props.statusSidebar('show')
      $('#divMyScroll').addClass("myscroll-sidebar2")
      $("body").removeClass("mini-navbar")                  // สั่งเปิด
      $("#background-full1").css("display", "block")
      if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
          function () {
            $('#side-menu').fadeIn(500);
          }, 100);
      } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
          function () {
            $('#side-menu').fadeIn(500);
          }, 300);
      } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
      }
    }
  }

  testClick2 = () => {
    $("body").removeClass("mini-navbar")
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

  onClickDropdown(id) {
    let trigger = $("#" + id)
    trigger.addClass("open")
  }

  _onClickTopMenu1 = () => {
    if (this.state.mailbox == "dropdown open")
      this.setState({ mailbox: "dropdown", notifybox: "dropdown", languagebox: "dropdown" })
    else
      this.setState({ mailbox: "dropdown open", notifybox: "dropdown", languagebox: "dropdown" })
  }

  _onClickTopMenu2 = () => {
    this.props.setUnreadTotal(0)

    if (this.state.notifybox == "dropdown open")
      this.setState({ mailbox: "dropdown", notifybox: "dropdown", languagebox: "dropdown", dropdownLogout: "dropdown" })
    else
      this.setState({ mailbox: "dropdown", notifybox: "dropdown open", languagebox: "dropdown", dropdownLogout: "dropdown" })
  }

  _onClickTopMenu3 = () => {
    if (this.state.languagebox == "dropdown open")
      this.setState({ mailbox: "dropdown", notifybox: "dropdown", languagebox: "dropdown", dropdownLogout: "dropdown" })
    else
      this.setState({ mailbox: "dropdown", notifybox: "dropdown", languagebox: "dropdown open", dropdownLogout: "dropdown" })
  }

  _onClickTopMenu4 = () => {
    if (this.state.dropdownLogout == "dropdown open")
      this.setState({ mailbox: "dropdown", notifybox: "dropdown", languagebox: "dropdown", dropdownLogout: "dropdown" })
    else
      this.setState({ mailbox: "dropdown", notifybox: "dropdown", languagebox: "dropdown", dropdownLogout: "dropdown open" })
  }

  render() {
    let { dataLogin, unreadTotal } = this.props

    let companies = []

    this.props.companies &&
      this.props.companies.forEach(element => {
        companies.push({
          value: element.id,
          label: element.name
        })
      });
    companies.push({
      value: -1,
      label: '+ เพิ่มร้าน',
      className: 'addCompanyMenu'
    })

    return (
      <div id='header-fixed' className="row" >
        <ToastNotification />
        <nav className="navbar" role="navigation" style={{ marginBottom: 0, height: 55 }}>
        </nav>
        <nav className="navbar-static-top navbar-fixed-top" role="navigation" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}> {/* delete className navbar */}
          <div className="navbar-header" style={{ display: 'flex', alignItems: 'center' }}>
            {this.props.isAgreement &&
              <a className="navbar-minimalize minimalize-styl-2 btn btn-primary-collapse" id="pace-remix"
                onClick={this.testClick}>
                <i className="fa fa-bars"></i>
              </a>
            }
            <form role="search" className="navbar-form-custom" action="search_results.html" style={{ display: 'block', height: 'auto' }}>
              <div className="form-group" style={{ width: this.props.sidebar_width ? this.props.sidebar_width + 50 : "100%" }}>
                <img onClick={() => this.props.history.push('/homepage')} src={Images.logoTopLeft2} style={{ width: "auto", height: 42, cursor: 'pointer' }} />              </div>
            </form>
          </div>
          <ul className="nav navbar-top-links navbar-right" style={{ display: 'flex' }}>
            {/* <li>
              <span className="m-r-sm text-muted welcome-message">Welcome to Hino+ Admin Theme.</span>
            </li> */}


            {/* {this.props.isAgreement &&
              <li className={this.state.mailbox} id='message-li'>
                <a className="dropdown-toggle count-info" data-toggle="dropdown" onClick={this._onClickTopMenu1}>
                  <i className="fa fa-envelope"></i>  <span className="label label-warning">16</span>
                </a>
                <Message onClickDropdown={(id) => this.onClickDropdown(id)} />
              </li>
            } */}

            {this.props.isAgreement && (dataLogin.userLevelId == 41 || dataLogin.userLevelId == 42) &&
              <li className={this.state.notifybox} id='notification-li'>
                <a className="dropdown-toggle count-info" data-toggle="dropdown" onClick={this._onClickTopMenu2}>
                  <i className="fa fa-bell" style={{ fontSize: 20, marginTop: 7 }} />
                  {/* <span className="label label-primary">{messageCount === 0 ? '' : messageCount}</span> */}
                  <span className="label label-primary" style={{ margin: '4px 5px 0px 0px' }}>{unreadTotal === 0 ? '' : unreadTotal}</span>
                </a>
                {this.state.notifybox === 'dropdown open' &&
                  <HeaderNotification onClickDropdown={(id) => this.onClickDropdown(id)} />
                }
              </li>
            }
            <Suspense fallback={null}>
              {/* ***************************LANGUAGE ZONE************************* */}
              <li className={this.state.languagebox} id='language-li'>
                <a className="dropdown-toggle count-info" data-toggle="dropdown"
                  style={{ paddingBottom: 0, paddingTop: 13, paddingLeft: 0 }}
                  onClick={this._onClickTopMenu3}>
                  <i className="fa fa-language" style={{ marginTop: 5, fontSize: 23 }}></i>
                  <span className="label label-primary" style={{ marginTop: 6 }}>{(this.props.language === 'ja' ? 'jp' : this.props.language).toUpperCase()}</span>
                </a>
                <ul className="dropdown-menu dropdown-alerts">
                  <LiLanguage src={Images.en} language="en" name="English" onClick={() => this.props.setLanguage('en')} />
                  <li className="divider"></li>
                  <LiLanguage src={Images.th} language="th" name="Thai" onClick={() => this.props.setLanguage('th')} />
                  {/* {
                    dataLogin.userId && (dataLogin.userId == 21 || dataLogin.userId == 22) && [
                      <li className="divider"></li>,
                      <LiLanguage src={Images.jp} language="ja" name="Japanese" onClick={() => this.props.setLanguage('ja')} />
                    ]
                  } */}
                  <li className="divider"></li>
                  <LiLanguage src={Images.jp} language="ja" name="Japanese" onClick={() => this.props.setLanguage('ja')} />

                </ul>
              </li>
            </Suspense>
            {/* ***************************LANGUAGE ZONE************************* */}
            <li className={this.state.dropdownLogout}>
              <a onClick={this._onClickTopMenu4} data-toggle="dropdown"
                className="dropdown-toggle" style={{ padding: '10px 10px' }}>
                <img src={get(dataLogin, 'avatarUrl', "") ? get(dataLogin, 'avatarUrl', "") : Images.avatar} alt="image" className="img-circle" style={{ width: 35, height: 35 }} />
                <i className="fa fa-cog" aria-hidden="true" style={{ position: "absolute", color: "#5d5d5d", padding: "2px 5px", top: 30, left: 30, fontSize: 16 }}></i>
              </a>

              <ul className="dropdown-menu animated fadeInRight m-t-xs" onClick={this._onClickTopMenu4}>
                <li>
                  <div style={{
                    width: 300, height: 130, justifyContent: 'center',
                    alignItems: 'center', display: 'flex', flexDirection: 'column'
                  }}>
                    <p><img src={get(dataLogin, 'avatarUrl', "") ? get(dataLogin, 'avatarUrl', "") : Images.avatar} alt="image" className="img-circle" style={{ width: 70, height: 70 }} /></p>
                    <b>{get(dataLogin, 'displayName', '-')}</b>
                  </div>
                </li>
                <li className="divider" />
                <li><a href="#/updateProfile"><i className="fas fa-address-card"></i>{' '}{t("update_profile")}</a></li>
                <li className="divider" />
                <li><a href="#/changePassword"><i className="fas fa-key"></i>{' '}{t("change_password")}</a></li>
                <li className="divider"></li>
                <li>
                  <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: 50 }}>
                    <Button onClick={() => {
                      this.props.signout()
                    }}
                    >{t("log_out")}</Button>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    bodyStyle: state.versatile.sidebarStyle,
    stateSignin: state.signin.stateSignin,
    expiration: state.signin.expiration,
    refreshToken: state.signin.refreshToken,
    language: state.versatile.language,
    events: state.realtime.events,
    sidebar_width: state.versatile.sidebar_width,
    DataDictionary: state.versatile.DataDictionary,
    status_sidebar: state.versatile.status_sidebar,
    isAgreement: state.signin.isAgreement,
    topicEvent: state.signin.topicEvent,
    subEvent: state.signin.subEvent,
    dataLogin: state.signin.dataLogin,
    profileUser: state.signin.profileUser,
    custIdByUser: state.signin.custIdByUser,
    messageList: state.notification.messageList,
    toastEvent: state.notification.toastEvent,
    unreadTotal: state.notification.unreadTotal,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setBodyStyle: () => dispatch(VersatileActions.setStyleSidebar()),
    signout: (redisKey) => dispatch(SigninActions.signout(redisKey)),
    refresh: (refreshToken) => dispatch(SigninActions.refresh(refreshToken)),
    setLanguage: (data) => dispatch(VersatileActions.setLanguage(data)),
    getLanguage: (data) => dispatch(VersatileActions.getLanguage(data)),
    getInitialEventData: (update) => dispatch(RealtimeActions.getInitialEventData(update)),
    statusSidebar: (status) => dispatch(VersatileActions.statusSidebar(status)),
    getDataDictionary: (language) => dispatch(VersatileActions.getDataDictionary(language)),
    getMessageCount: () => dispatch(NotificationRedux.getMessageCount()),
    setToastEvent: (toastEvent) => dispatch(NotificationRedux.setToastEvent(toastEvent)),
    setCustomerByUserId: (data) => dispatch(SigninActions.setCustomerByUserId(data)),
    setMessageList: (messageList) => dispatch(NotificationRedux.setMessageList(messageList)),
    setUnreadTotal: (total) => dispatch(NotificationRedux.setUnreadTotal(total)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
