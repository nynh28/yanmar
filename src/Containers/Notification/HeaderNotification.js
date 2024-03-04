import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import NotificationRedux from '../../Redux/NotificationRedux'
import MaintenanceActions from '../../Redux/MaintenanceRedux'
import SaveButton from '../../Components/SaveButton'
import { t } from '../../Components/Translation'
import moment from 'moment'
import { momentDate } from '../../Functions/DateMoment'
import "antd/dist/antd.css";
import { Switch } from "antd";
import { Row, Col } from "reactstrap";

class EventNotification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arrayDate: []

    }
  }

  componentWillMount() {
    this.props.getEventData()

    this.getMessage()
  }

  componentDidUpdate(prevProps, nextState) {
    // let { toastEvent, messageList } = this.props
    // if (prevProps.detailEvent !== this.props.detailEvent && this.props.detailEvent !== null) {
    //   // this.props.history.push('/notification/information')

    //   // if (!window.location.href.includes('notification/information')) {
    //   //   this.props.history.push('notification/information')
    //   // }
    // }

    // if (prevProps.toastEvent !== toastEvent) {
    //   console.log("toastEvent : ", toastEvent)
    //   let dt = toastEvent
    //   let _messageList = JSON.parse(JSON.stringify(messageList));

    //   _messageList.push({
    //     "gpsdate": dt.gps.gpsdate,
    //     "event_id": dt.event_id,
    //     "lat": dt.gps.lat,
    //     "lng": dt.gps.lng,
    //     "acc": dt.gps.acc,
    //     "speed": dt.gps.speed,
    //     "course": dt.gps.course,
    //     "location": "-",
    //     "vehicle_info": {
    //       "vid": dt.vid,
    //       "vin_no": dt.vin_no,
    //       "licenseplate": dt.licenseplate,
    //       "vehicle_name": dt.vehicle_id
    //     },
    //     "class_type": dt.class_type,
    //     "speed_limit": dt.condition_val,
    //   }
    //   )

    //   console.log("_messageList : ", _messageList)
    //   this.props.setMessageList(_messageList)
    // }
  }

  async getMessage() {
    // var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_customer", {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     userId: this.props.dataLogin.userId,
    //     dealer_id: partner_id
    //   })
    // });
    // var data = await response.json();

    // this.props.setMessageList(initialData)
    // this.props.setMessageList([])
  }


  onClickDropdown = (id) => {
    this.props.onClickDropdown(id)
  }

  checkDate(data, i) {
    let { arrayDate } = this.state
    let date = new Date(data.gpsdate)

    if (arrayDate.includes(moment(date).format('MM-DD-YYYY'))) {
      return this.displayListEvent(data, i, data.gpsdate)
    }
    else {
      let datetime = data.gpsdate

      arrayDate.push(moment(date).format('MM-DD-YYYY'))
      moment.locale(this.props.language);
      let todayText = ''
      if (moment.locale() === 'th') todayText = '[วันนี้]'
      if (moment.locale() === 'en') todayText = '[Today]'
      if (moment.locale() === 'ja') todayText = 'วันนี้'

      let str = moment(date).calendar(null, {
        // sameDay: moment(date).fromNow(),
        sameDay: todayText,
        lastDay: 'll',
        lastWeek: 'll',
        sameElse: 'll'
      })

      return [
        // Add This ul (19-Dec-2019)
        <li key={'sub-first-li-' + i}>
          <div style={{ padding: '5px 10px', backgroundColor: '#EEEEEE' }}>
            <Row>
              <Col lg={5}>
                {str}
              </Col>
              <Col lg={7}>
                <div style={{ textAlign: 'right' }}>
                  <Switch
                    checkedChildren={t('hmst_17')}
                    unCheckedChildren={t('hmst_16')}
                    defaultChecked={this.props.notificationVisibled}
                    onChange={(visible) => this.props.setNotificationVisibled(visible)}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </li>
        ,
        this.displayListEvent(data, i, datetime)
      ]
    }
  }

  getIconEvent(event_id) {
    let ic_class = "", styles = { color: "#000" }
    switch (event_id) {
      case 1001:
        styles.marginLeft = -2
        ic_class = "fas fa-exclamation-triangle"
        styles.color = "red"
        break;
      case 10000:
        ic_class = "icon-edited"
        styles.marginLeft = -4
        styles.color = "#0272b7"
        break;
      case 10001:
        ic_class = "demo-icon icon-engine-01"
        styles.marginLeft = -4
        styles.color = "red"
        break;
      case 20000:
        ic_class = "icon-new-icon-04"
        styles.marginLeft = -12
        styles.color = "red"
        styles.fontSize = 18
        break;
      case 20001:
        ic_class = "fas fa-oil-can"
        styles.marginLeft = -4
        styles.color = "red"
        break;
      default:
        ic_class = "fas fa-exclamation-triangle"
        styles.color = "red"
        break;
    }



    return <i className={ic_class} style={styles}></i>
  }

  displayListEvent(data, i, time) {

    return (
      // Add This ul (19-Dec-2019)
      <li key={'sub-second-li-' + i} style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.075)' }}>
        {/* <a onClick={() => this.props.getDetailMessage(data.id)}> */}
        <a onClick={() => {
          let _data = JSON.parse(JSON.stringify(data));
          _data.messageType = "topic"

          if ([31, 32].includes(this.props.dataLogin.userLevelId)) {
            this.props.setMessageInfoMtn(_data)
            this.props.history.push('/maintenance/information')
          }
          else {
            this.props.setMessageInfo(_data)
            this.props.history.push('/notification/information')
          }
        }}>
          {/* {data.event_name === 'ความเร็วเกินกำหนด' && <i className="fas fa-exclamation-triangle" style={{ color: 'red' }}></i>} */}
          {this.getIconEvent(data.event_id)}
          {' '}
          {data.vehicle_info !== undefined && data.vehicle_info.licenseplate} : {t("Notification_" + data.event_id)}
          <span className="pull-right text-muted small">
            {/* {moment(time).format('LTS')} */}
            {/* {console.log("time: ", time)} */}
            {momentDate(time, "HH:mm:ss")}
          </span>
        </a>
      </li >
    )
  }

  render() {
    let { messageList, dataLogin } = this.props
    this.state.arrayDate.length = 0
    // console.log("HEADER : ", messageList)
    return (
      <ul
        className="dropdown-menu dropdown-alerts scroll"
        onClick={() => this.onClickDropdown('notification-li')}
        style={{ maxHeight: "calc(100vh/2)" }}>

        {messageList === null ?
          <li>
            <SaveButton loading={true}
              name={'Show History'}
              style={{ width: '100%', backgroundColor: '#FFFFFF', borderRadius: 2.5, marginRight: 10 }}
            />
          </li>
          : [messageList.length === 0 ?
            <li style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.075)' }}>
              <div style={{ padding: '5px 10px', margin: '8px' }}>
                <center><span>{t("common_1")}</span></center>
              </div>
            </li>
            : messageList.slice(0, 10).map((data, i) => this.checkDate(data, i)),
          <li>
            <a href={[31, 32].includes(dataLogin.userLevelId) ? "#/maintenance" : "#/notification"}>
              <center><strong>{t('Notification_1')} </strong>
                <i className="fa fa-angle-right"></i></center>
            </a>
          </li>]}
      </ul>
    )
  }
}

const mapStateToProps = (state) => ({
  events: state.notification.events,
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  messageList: state.notification.messageList,
  toastEvent: state.notification.toastEvent,
  notificationVisibled: state.notification.notificationVisibled
});

const mapDispatchToProps = (dispatch) => ({
  getEventData: () => dispatch(NotificationRedux.getEventData()),
  getDetailMessage: (id) => dispatch(NotificationRedux.getDetailMessage(id)),
  setMessageList: (messageList) => dispatch(NotificationRedux.setMessageList(messageList)),
  setMessageInfo: (data) => dispatch(NotificationRedux.setMessageInfo(data)),
  setMessageInfoMtn: (data) => dispatch(MaintenanceActions.setMessageInfoMtn(data)),
  setReadMessage: (isRead) => dispatch(NotificationRedux.setReadMessage(isRead)),
  setUnreadTotal: (total) => dispatch(NotificationRedux.setUnreadTotal(total)),
  setDefaultFilter: () => dispatch(NotificationRedux.setDefaultFilter()),
  setNotificationVisibled: (visible) => dispatch(NotificationRedux.setNotificationVisibled(visible))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventNotification))