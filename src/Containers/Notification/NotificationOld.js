import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import DropdownActions from '../../Redux/DropdownRedux'
import NotificationRedux from '../../Redux/NotificationRedux'
import { Row, Col, Input } from 'reactstrap'
import Table from '../../Components/DataGridView/Table.js'
import PannelBox from '../../Components/PannelBox'
import { t } from '../../Components/Translation'
import Alert from '../../Components/Alert'
import FormSelectSearch from '../../Components/FormControls/FormSelectSearch';
import FormDatepickerNew from '../../Components/FormControls/FormDatepickerNew';
// import DateRangePicker from 'react-bootstrap-daterangepicker-maxspan';
import moment from 'moment'
import 'moment/locale/th'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { isEmpty } from 'lodash'
import { momentDate } from '../../Functions/DateMoment'


const DateRangePicker = (arg) => {
  return (<div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
    <label className="control-label" style={{ fontWeight: 500 }}>
      {t('date_Range')} :
  </label>
    <FormDatepickerNew
      timePicker={false}
      select_change={arg.select_change}
      language={arg.language}
      startDate={arg.startDate}
      endDate={arg.endDate}
      maxDate={arg.eDate}>
    </FormDatepickerNew>
  </div>
  )
}

const TODAYSTART = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const TODAYEND = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
const WORDEVETNAME = {
  en: {
    "Notification_1001": "Over Speed",
    "Notification_1004": "Enter hazard zone",
    "Notification_1007": "Exit hazard zone",
    "Notification_10000": "Maintenance Remind",
    "Notification_10001": "Engine Lamp"
  },
  th: {
    "Notification_1001": "ความเร็วเกิน",
    "Notification_1004": "เข้าพื้นที่เสี่ยง",
    "Notification_1007": "ออกจากพื้นที่เสี่ยง",
    "Notification_10000": "แจ้งเตือนเข้าศูนย์บริการ",
    "Notification_10001": "ไฟเครื่องยนต์เตือน"
  },
  ja: {
    "Notification_1001": "Over Speed",
    "Notification_1004": "Enter hazard zone",
    "Notification_1007": "Exit hazard zone",
    "Notification_10000": "Maintenance Remind",
    "Notification_10001": "Engine Lamp"
  }
}

class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertSetting: {
        show: false,
        type: 5
      },
      prm_start_date: TODAYSTART.format('YYYY-MM-DD HH:mm:ss'),
      prm_stop_date: TODAYEND.format('YYYY-MM-DD HH:mm:ss'),
      startDate: TODAYSTART,
      endDate: TODAYEND,
      strStartEndDate: TODAYSTART.format('DD/MM/YYYY HH:mm') + ' - ' + TODAYEND.format('DD/MM/YYYY HH:mm'),
      event: ["1001", "1004", "1007", "10000", "10001"],
      data: []
    }
    // this.handleEvent = this.handleEvent.bind(this)
    this.startDate = ""
    this.stopDate = ""
  }

  componentWillMount() {
    let { searchData } = this.props
    // let obj = {}
    if (!isEmpty(searchData)) {
      this.startDate = searchData.start_date
      this.stopDate = searchData.stop_date
      this.setState({ event: searchData.event })
    } else {
      this.setInitailDate()
    }
  }

  setInitailDate() {
    let selected_date = "", startDate = "", endDate = ""

    if (moment().format("DD/MM/YYYY") == moment().startOf('month').format("DD/MM/YYYY")) {
      startDate = moment().subtract(1, 'month').format("DD/MM/YYYY")
      endDate = moment().subtract(1, 'day').format('DD/MM/YYYY')
    }
    else {
      startDate = moment().startOf('month').format("DD/MM/YYYY")
      endDate = moment().subtract(1, 'days').format("DD/MM/YYYY")
    }
    selected_date = startDate + " - " + endDate
    this.startDate = moment(startDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    this.stopDate = moment(endDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { searchData } = this.props

    if (nextProps.searchData !== searchData) return false
    return true
  }


  //#region  GET NOITFICATION MASSAGE
  async getMessageData() {
    //#region Validate
    if (this.state.event.length == 0) {
      this.setAlertSetting(true, 4, "Maintenace_4")
      return
    }
    //#endregion

    this.setAlertSetting(true, 5)
    let _event = []
    for (let index in this.state.event) {
      _event.push(parseInt(this.state.event[index]))
    }

    let data = [], response = "", isLastKey = false
    do {
      response = await this.getMessage(_event, isLastKey, response.LastEvaluatedKey)
      response.result.length > 0 && data.push(...response.result)

      if (response.LastEvaluatedKey.unix) isLastKey = true
      else isLastKey = false

    } while (isLastKey);


    let searchData = {
      event: this.state.event,
      start_date: this.state.prm_start_date,
      stop_date: this.state.prm_stop_date,
    }

    let newData = this.addEventName(data)
    this.props.setMessageData(newData, searchData, this.props.language)
    this.setAlertSetting(false, 5)
  }

  async getMessage(_event, isLastKey, LastEvaluatedKey) {
    let body = {
      user_id: this.props.dataLogin.userId,
      start_date: this.state.prm_start_date,
      stop_date: this.state.prm_stop_date,
      event_list: _event
    }

    if (isLastKey) body.LastEvaluatedKey = LastEvaluatedKey

    var response = await fetch(ENDPOINT_BASE_URL + "fleet/history/notify", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': this.props.language
      },
      body: JSON.stringify(body)
    });

    var data = await response.json();

    if (data?.code == 200)
      return data
    else
      return {}
  }

  addEventName(arr) {
    let { language } = this.props
    // console.log('arr', arr)
    let newArr = arr.map((item) => {
      item.event_name = WORDEVETNAME[language]['Notification_' + item.event_id]
      return item
    })
    // console.log('newArr', newArr)
    return newArr
  }

  //#endregion


  setAlertSetting(isShow, type, content = "") {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    this.setState({ alertSetting })
  }

  onApplyEvent(dataObject) {
    this.startDate = dataObject.startDate.format('YYYY-MM-DD')
    this.stopDate = dataObject.endDate.format('YYYY-MM-DD')

    let prm_start_date = this.startDate + ' 00:00:00'
    let prm_stop_date = this.stopDate + ' 23:59:59'

    if (prm_start_date !== this.state.prm_start_date || prm_stop_date !== this.state.prm_stop_date) {
      this.setState({
        prm_start_date,
        prm_stop_date,
        fileNameDate: dataObject.startDate.format('DD-MM-YYYY') + ' 00:00 to ' + dataObject.endDate.format('DD-MM-YYYY') + ' 23:59'
      }, () => {
        let searchData = {
          event: this.state.event,
          start_date: prm_start_date,
          stop_date: prm_stop_date,
        }
        this.props.setStateMapControlNoti('searchData', searchData)
      })

    }
  }

  addEventName(arr) {
    let { language } = this.props
    // console.log('arr', arr)
    let newArr = arr.map((item) => {
      item.event_name = WORDEVETNAME[language]['Notification_' + item.event_id]
      return item
    })
    // console.log('newArr', newArr)
    return newArr
  }

  render() {
    let { alertSetting, event, fileNameDate } = this.state
    let { header, messageData, language } = this.props

    return <Suspense fallback={null}>
      <Alert
        setting={alertSetting}
        onConfirm={() => {
          if (alertSetting.type === 4)
            alertSetting.show = false
          else
            alertSetting.show = false

          this.setState({ alertSetting })
        }}
        onCancel={() => {
          alertSetting.show = false
          this.setState({ alertSetting })
        }}
      />

      <PannelBox
        title={t("search")}
        showFooter={true}
        footerchildren={
          <div style={{ textAlign: 'Right' }}>
            <button onClick={() => this.getMessageData()}
              className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}><i className="fa fa-search" aria-hidden="true"  ></i> {t("search")}
            </button>
          </div>
        }
      >
        <Row>
          <Col lg={6}>
            <FormSelectSearch
              mode={"multiple"}
              schema={{ "required": [""] }}
              value={event}
              label={"event"}
              list={[
                {
                  key: 1001,
                  value: "Notification_1001"
                },
                {
                  key: 1004,
                  value: "Notification_1004"
                },
                {
                  key: 1007,
                  value: "Notification_1007"
                },
                {
                  key: 10000,
                  value: "Notification_10000"
                },
                {
                  key: 10001,
                  value: "Notification_10001"
                }
              ]}
              fieldForm={"event"}
              placeholder={""}
              flex={1}
              onChange={(selected) => {
                console.log('event', selected)
                this.setState({ event: selected }, () => {
                  let searchData = {
                    event: selected,
                    start_date: this.state.prm_start_date,
                    stop_date: this.state.prm_stop_date,
                  }
                  this.props.setStateMapControlNoti('searchData', searchData)
                })
              }}
            />
          </Col>
          <Col lg={6}>
            {/* <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
              <label className="control-label" style={{ fontWeight: 500 }}>{t('date_Range')} :</label> */}

            <DateRangePicker
              select_change={this.onApplyEvent.bind(this)}
              language={this.props.language}
              maxDate={this.state.eDate}
              startDate={moment(this.startDate).format('DD/MM/YYYY')}
              endDate={moment(this.stopDate).format('DD/MM/YYYY')}
            />


            {/* <DateRangePickersTrans
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onEvent={this.handleEvent}
                loading={this.props.loading}
                strStartEndDate={this.state.strStartEndDate}
              /> */}
            {/* </div> */}
          </Col>
        </Row>
      </PannelBox>
      <PannelBox
        style={{ marginTop: -20 }}
        contentStyle={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>

        <Table
          mode={"offline"}
          // dataSource={[...messageData]}
          dataSource={[...messageData]}
          author={header.idToken}
          xAPIKey={header.redisKey}
          table_id={6}
          user_id={this.props.dataLogin.userId}
          editing={{
            enabled: true,
            allowUpdating: false,
            allowDeleting: false
          }}
          showSetting={false}
          searchPanel={true}
          exportName={fileNameDate}
          autoExpandAll={false}
          remoteOperations={true}
          selectAll={true}
          cookiesOptions={{
            enable: true,
            name: "Notification"
          }}
          columnCount="event_name"
          customButton={[
            {
              hint: language == "en" ? "Map" : language == "th" ? "แผนที่" : "Map",
              text: language == "en" ? "Map" : language == "th" ? "แผนที่" : "Map",
              // icon: "map",
              visible: true,
              onClick: (e) => {
                let dt = e.row.data
                // console.log("CLICK : ", dt)

                let data = {
                  "messageType": "grid",
                  "gpsdate": dt.gpsdate,
                  "event_id": dt.event_id,
                  "lat": dt.lat,
                  "lng": dt.lng,
                  "acc": dt.acc,
                  "speed": dt.speed,
                  "course": dt.course,
                  "location": dt.location,
                  "vehicle_info": {
                    "vid": dt.vid,
                    "vin_no": dt.vin_no,
                    "licenseplate": dt.licenseplate,
                    "vehicle_name": dt.vehicle_name
                  },
                  "class_type": dt.class_type,
                  "speed_limit": dt.condition_val,
                }
                this.props.setMessageInfo(data)
                this.props.history.push('/notification/information')
                // this.props.onClickButton(e)
              }
            }
          ]}
          column={[
            {
              column_name: 'event_name',
              column_caption: "event",
              // column_render: (e) => t("Notification_" + e.value)
            },
            // {
            //   column_name: 'event_id',
            //   column_caption: "event",
            //   column_render: (e) => t("Notification_" + e.value)
            // },
            {
              column_name: 'licenseplate',
              column_caption: "realtime_58"
            },
            {
              column_name: 'vehicle_name',
              column_caption: "other_reports_19"
            },
            {
              column_name: 'vin_no',
              column_caption: "history_3"
            },
            {
              column_name: 'driver_name',
              column_caption: "history_29"
            },
            {
              column_name: 'gpsdate',
              column_caption: "history_19",
              column_render: (e) => momentDate(e.value, "DD/MM/YYYY HH:mm:ss")
            },
            {
              column_name: 'location',
              column_caption: "realtime_22"
            },
            // {
            //   column_name: 'mileage',
            //   column_caption: "Mileage",
            //   column_render: (e) => numberWithComma((e.value * 0.001).toFixed(1))
            // },
            {
              column_name: 'speed',
              column_caption: "realtime_11"
            },
            // {
            //   column_name: 'Fuel_percent',
            //   column_caption: "fuel_percent"
            // }
          ]}
        />
      </PannelBox>
    </Suspense>
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  messageData: state.notification.messageData,
  searchData: state.notification.searchData,
  languageLocation: state.notification.languageLocation,
  language: state.versatile.language

});

const mapDispatchToProps = (dispatch) => ({
  setMessageInfo: (data) => dispatch(NotificationRedux.setMessageInfo(data)),
  setMessageData: (data, searchData, languageLocation) => dispatch(NotificationRedux.setMessageData(data, searchData, languageLocation)),
  setStateMapControlNoti: (name, value) => dispatch(NotificationRedux.setStateMapControlNoti(name, value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
