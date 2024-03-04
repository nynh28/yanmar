import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import DropdownActions from '../../Redux/DropdownRedux'
import MaintenanceRedux from '../../Redux/MaintenanceRedux'
import { Row, Col } from 'reactstrap'
import Table from '../../Components/DataGridView/Table.js'
import PannelBox from '../../Components/PannelBox'
import { t } from '../../Components/Translation'
import Alert from '../../Components/Alert'
import FormSelectSearch from '../../Components/FormControls/FormSelectSearch';
import FormDatepickerNew from '../../Components/FormControls/FormDatepickerNew';
// import DateRangePicker from 'react-bootstrap-daterangepicker-maxspan';
import { CalendarOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import 'moment/locale/th'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { numberWithComma } from '../../Functions/Calculation'
import { isEmpty, parseInt } from 'lodash'
import { Button, Select } from 'antd';
import FormSelect from '../../Components/FormControls/Basic/FormSelect'

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


const { Option } = Select;
const FormSelect2 = (arg) => {
  const { t } = useTranslation()

  let listData = []
  if (arg.selectAll) listData = []
  else listData = [...arg.list]

  return (
    <div className="form-group field field-string" style={{ padding: '0 10px', flex: arg.flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(arg.label)}
        {
          arg.schema.required && arg.schema.required.includes(arg.fieldForm) && [
            <span className="text-danger">*</span>
          ]
        } :

      </label>

      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
        <Select
          mode="multiple"
          placeholder={t(arg.placeholder)}
          showSearch
          value={(arg.selectAll || arg.value.length == arg.list.length) ? t('Maintenace_1') : arg.value}
          onChange={arg.onChange}
          style={{ width: "100%" }}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {
            !isEmpty(listData) &&
            listData !== null && listData.map((item) => {
              return <Option key={item.key}>{t(item.value)}</Option>
            })
          }
        </Select>

        <Button type="info" onClick={() => arg.onClickSelectAll()}>
          {t('Maintenace_1')}
        </Button>
        <Button type="info" onClick={() => arg.onClickDeselectAll()}>
          {t('Maintenace_2')}
        </Button>
      </div>

    </div >
  )
}


const DropdownCustomer = (arg) => {
  return (<FormSelect
    mode={arg.isDealer ? "multiple" : "single"}
    // mode={"single"}
    value={arg.selected.length == 0 ? [] : arg.selected}
    label={"my_drivers_2"}
    list={arg.data.map((element, i) => {
      if (arg.isCustomer)
        return { key: i, value: element.int_cust_id, text: element.customer_name }
      else if ([0].includes(element.partner_id))
        return { key: i, value: element.partner_id, text: element.firstname }
      else
        return { key: i, value: element.partner_id, text: element.prefix + " " + ((element.firstname == null) ? '' : element.firstname) + " " + ((element.lastname == null) ? '' : element.lastname) + "  " + ((element.suffix == null ? '' : element.suffix)) }
    })}
    placeholder={"my_drivers_4"}
    flex={1}
    onChange={(selected) => {
      if (arg.isDealer) {
        var lastItem = selected[selected.length - 1];
        let select = selected

        if ([0].includes(lastItem)) {
          select = lastItem
        }
        else {
          let idx = select.findIndex((id) => id === 0)

          if (idx > -1) {
            const index = select.indexOf(select[idx]);
            if (index > -1) {
              select.splice(index, 1);
            }
          }
        }

        if (!isEmpty(selected)) arg.onChange(select)
      }
      else {
        if (selected !== undefined) arg.onChange(selected)
      }
    }}
  />)
}

const TODAYSTART = moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
const TODAYEND = moment().set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
const WORDEVETNAME = {
  en: {
    "Notification_1001": "Over Speed",
    "Notification_10000": "Maintenance Remind",
    "Notification_10001": "Engine Lamp",
  },
  th: {
    "Notification_1001": "ความเร็วเกิน",
    "Notification_10000": "แจ้งเตือนเข้าศูนย์บริการ",
    "Notification_10001": "ไฟเครื่องยนต์เตือน",
  },
  ja: {
    "Notification_1001": "Over Speed",
    "Notification_10000": "Maintenance Remind",
    "Notification_10001": "Engine Lamp",
  }
}

class Maintenance extends Component {
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
      event: ["10000", "10001"],
      data: [],
      company: [],
      companyData: []
    }
    // this.handleEvent = this.handleEvent.bind(this)
    this.startDate = ""
    this.stopDate = ""
  }

  // componentWillMount() {
  //   let { languageLocation, language } = this.props
  //   let { searchData } = this.props

  //   let obj = {}
  //   if (!isEmpty(searchData)) {
  //     obj.event = searchData.event
  //     obj.prm_start_date = searchData.start_date
  //     obj.prm_stop_date = searchData.stop_date
  //     obj.startDate = moment(searchData.start_date, 'YYYY-MM-DD HH:mm:ss')
  //     obj.endDate = moment(searchData.stop_date, 'YYYY-MM-DD HH:mm:ss')
  //     obj.strStartEndDate = moment(searchData.start_date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm') +
  //       ' - ' + moment(searchData.stop_date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm')
  //   }

  //   this.setState(obj, () => {
  //     if (this.props.messageData.length === 0 || languageLocation !== language) this.getMessageData()
  //   })
  //   this.load_manage_customer()
  // }

  componentWillMount() {
    let { languageLocation, language } = this.props
    let { searchData, companyData } = this.props
    // console.log('searchData', searchData, this.props.customerSelected)
    if (!isEmpty(searchData)) {
      this.startDate = searchData.start_date
      this.stopDate = searchData.stop_date
      // this.startDate = moment(searchData.start_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
      // this.stopDate = moment(searchData.stop_date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD')
      this.setState({ event: searchData.event, company: searchData.company })
    } else {
      this.setInitailDate()
      this.load_manage_customer()
    }

    // this.setState({ company: this.props.customerSelected })
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

  //#region  GET NOITFICATION MASSAGE
  async getMessageData() {
    //#region Validate
    if (this.state.company.length == 0) {
      this.setAlertSetting(true, 4, "Maintenace_3")
      return
    }
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
      response = await this.getMessage(_event, isLastKey, response.LastEvaluatedKey, response.lent_array_custid)
      response.result.length > 0 && data.push(...response.result)

      if (response.LastEvaluatedKey.unix || response.lent_array_custid >= 0) {
        isLastKey = true
      }
      else {
        isLastKey = false
      }
    } while (isLastKey);


    let searchData = {
      event: this.state.event,
      company: this.state.company,
      start_date: this.state.prm_start_date,
      stop_date: this.state.prm_stop_date,
    }

    let newData = this.addEventName(data)
    this.props.setMessageData(newData, searchData, this.props.language)
    this.setAlertSetting(false, 5)
  }

  async getMessage(_event, isLastKey, LastEvaluatedKey, lent_array_custid) {
    let cust_id_list = []
    for (let index in this.state.company) cust_id_list.push(parseInt(this.state.company[index]))

    let body = {
      cust_id_list,
      user_id: this.props.dataLogin.userId,
      start_date: this.state.prm_start_date,
      stop_date: this.state.prm_stop_date.replace("00:00:00", "23:59:59"),
      event_list: _event
      // event_list: [1001]
    }

    // let body = {
    //   cust_id_list: cust_id_list,
    //   user_id: this.props.dataLogin.userId,
    //   start_date: this.state.prm_start_date,
    //   stop_date: this.state.prm_stop_date.replace("00:00:00", "23:59:59"),
    //   event_list: [10000, 10001, 1001]
    // }

    if (isLastKey) body.LastEvaluatedKey = LastEvaluatedKey
    if (isLastKey) body.lent_array_custid = lent_array_custid

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
    let newArr = arr.map((item) => {
      item.event_name = WORDEVETNAME[language]['Notification_' + item.event_id]
      return item
    })
    return newArr
  }

  //#endregion


  async load_manage_customer() {
    var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_customer_by_manage", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: this.props.dataLogin.userId })
    });

    var data = await response.json();

    if (data.length > 0) {
      let companyData = [], company = []
      for (let index in data) {
        companyData.push({ key: data[index].int_cust_id, value: data[index].customer_name })
        company.push(data[index].int_cust_id)
      }
      // this.setState({ companyData, company: "" + data[0].int_cust_id })
      // this.setState({ companyData }, () => {
      //   this.props.setStateMapControlNoti('companyData', companyData)
      // })
      // console.log("company : ", company)
      this.props.setStateMapControlNoti('companyData', companyData)
      // this.props.setStateMapControlNoti('customerSelected', company)
      this.setState({ company: company })
    }
    else {
      this.setState({ companyData: [], company: [] })
    }
  }

  setDefault() {
    let { searchData } = this.props
    let obj = {}
    obj.event = searchData.event
    obj.prm_start_date = searchData.start_date
    obj.prm_stop_date = searchData.stop_date
    obj.startDate = moment(searchData.start_date, 'YYYY-MM-DD HH:mm:ss')
    obj.endDate = moment(searchData.stop_date, 'YYYY-MM-DD HH:mm:ss')
    obj.strStartEndDate = moment(searchData.start_date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm') +
      ' - ' + moment(searchData.stop_date, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm')

    this.setState(obj, () => {
      this.props.messageData.length === 0 && this.getMessageData()
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { searchData, selectAll, company } = this.props

    if (nextProps.selectAll !== selectAll) return true
    if (nextProps.searchData !== searchData) return false
    return true
  }

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

    let prm_start_date = dataObject.startDate.format('YYYY-MM-DD HH:mm:ss')
    let prm_stop_date = dataObject.endDate.format('YYYY-MM-DD HH:mm:ss')

    if (prm_start_date !== this.state.prm_start_date || prm_stop_date !== this.state.prm_stop_date) {
      this.setState({
        prm_start_date,
        prm_stop_date,
        // startDate,
        // endDate,
        // strStartEndDate: startDate.format('DD/MM/YYYY HH:mm:') + ' - ' + endDate.format('DD/MM/YYYY HH:mm'),
        fileNameDate: dataObject.startDate.format('DD-MM-YYYY HH_mm') + ' to ' + dataObject.endDate.format('DD-MM-YYYY HH_mm')
      }, () => {
        let searchData = {
          event: this.state.event,
          company: this.state.company,
          start_date: prm_start_date,
          stop_date: prm_stop_date,
        }
        this.props.setStateMapControlNoti('searchData', searchData)
      })
    }
  }

  render() {
    let { alertSetting, event, company } = this.state
    let { header, messageData, language, companyData } = this.props

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
            {/* <FormSelect
              mode={"multiple"}
              schema={{ "required": [""] }}
              value={company}
              label={"summary_84"}
              list={companyData}
              fieldForm={"summary_84"}
              flex={1}
              selectAll={this.props.selectAll}
              onChange={(selected) => {
                this.setState({ company: selected }, () => {
                  let searchData = {
                    event: this.state.event,
                    company: selected,
                    start_date: this.state.prm_start_date,
                    stop_date: this.state.prm_stop_date,
                  }

                  this.props.setStateMapControlNoti('searchData', searchData)
                })
              }}
              onClickSelectAll={() => {
                let selectedAll = []
                for (let index in companyData) {
                  selectedAll.push("" + companyData[index].key)
                }
                this.setState({ company: selectedAll }, () => {
                  let searchData = {
                    event: this.state.event,
                    company: selectedAll,
                    start_date: this.state.prm_start_date,
                    stop_date: this.state.prm_stop_date,
                  }
                  this.props.setSelectAll(true)
                  this.props.setStateMapControlNoti('searchData', searchData)
                })
              }}
              onClickDeselectAll={() => {
                this.setState({ company: [] }, () => {
                  let searchData = {
                    event: this.state.event,
                    company: [],
                    start_date: this.state.prm_start_date,
                    stop_date: this.state.prm_stop_date,
                  }
                  this.props.setSelectAll(false)
                  this.props.setStateMapControlNoti('searchData', searchData)
                })
              }}
            /> */}
            <DropdownCustomer
              data={companyData}
              selected={this.selectCustomer}
              isCustomer={false}
              isDealer={true}
              onChange={(selected) => {
                this.selectCustomer = selected
                // this.setState({ selectCustomer: selected })
                // if (this.dealer_mode) this.props.updateSearchDataMyDrivers([{ name: 'cust_id', value: this.selectCustomer }])
              }}
            />
          </Col>
          <Col lg={6}>
            <FormSelectSearch
              mode={"multiple"}
              schema={{ "required": [""] }}
              value={event}
              label={"event"}
              list={[
                {
                  key: 10000,
                  value: "Notification_10000"
                },
                {
                  key: 10001,
                  value: "Notification_10001"
                },
                {
                  key: 1,
                  value: "เตือนเข้าศูนย์บริการก่อน 1,000 กม"
                },
                {
                  key: 2,
                  value: "เตือนเข้าศูนย์บริการก่อน 2,000 กม"
                },
                {
                  key: 3,
                  value: "เตือนเข้าศูนย์บริการก่อน 3,000 กม"
                },
                {
                  key: 4,
                  value: "เตือนชั่วโมงการทำงาน"
                },
                {
                  key: 5,
                  value: "เตือนเดือน every 6 month"
                }
              ]}
              fieldForm={"event"}
              placeholder={""}
              flex={1}
              onChange={(selected) => {
                this.setState({ event: selected }, () => {
                  let searchData = {
                    event: selected,
                    company: this.state.company,
                    start_date: this.state.prm_start_date,
                    stop_date: this.state.prm_stop_date,
                  }
                  this.props.setStateMapControlNoti('searchData', searchData)
                })
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={6}>
            {/* <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
              <label className="control-label" style={{ fontWeight: 500 }}>{t('date_Range')} :</label>
              <DateRangePickersTrans
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onEvent={this.handleEvent}
                loading={this.props.loading}
                strStartEndDate={this.state.strStartEndDate}
              />
            </div> */}

            <DateRangePicker
              select_change={this.onApplyEvent.bind(this)}
              language={this.props.language}
              maxDate={this.state.eDate}
              startDate={moment(this.startDate).format('DD/MM/YYYY')}
              endDate={moment(this.stopDate).format('DD/MM/YYYY')}
            />
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
          autoExpandAll={false}
          remoteOperations={true}
          selectAll={true}
          cookiesOptions={{
            enable: true,
            name: "Maintenance"
          }}
          columnCount="event_name"
          customButton={[
            {
              hint: language == "en" ? "Map" : language == "th" ? "แผนที่" : "Map",
              text: language == "en" ? "Map" : language == "th" ? "แผนที่" : "Map",
              // icon: "map",
              visible: true,
              onClick: (e) => {
                // if (this.props.history.location.pathname.toLowerCase() !== "/realtime") this.props.history.push("/realtime")

                let dt = e.row.data
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
                this.props.history.push('/maintenance/information')
              }
            }
          ]}
          column={[
            {
              column_name: 'event_name',
              column_caption: "event",
              // column_render: (e) => t("Notification_" + e.value)
            },
            {
              column_name: 'mileage',
              column_caption: "realtime_12",
              column_render: (e) => numberWithComma((e.value * 0.001).toFixed(1))
            },
            // {
            //   column_name: 'event_id',
            //   column_caption: "event",
            //   // column_render: (e) => t("Notification_" + e.value)
            //   column_render: (e) => t("Notification_10000")
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
              column_name: 'cust_name',
              column_caption: "customer_80"
            },
            {
              column_name: 'gpsdate',
              column_caption: "history_19",
              column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
            },
            {
              column_name: 'location',
              column_caption: "realtime_22"
            },
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
  messageData: state.maintenance.messageData,
  searchData: state.maintenance.searchData,
  languageLocation: state.maintenance.languageLocation,
  language: state.versatile.language,
  companyData: state.maintenance.companyData,
  selectAll: state.maintenance.selectAll,
  customerSelected: state.maintenance.customerSelected,

});

const mapDispatchToProps = (dispatch) => ({
  setMessageInfo: (data) => dispatch(MaintenanceRedux.setMessageInfo(data)),
  setMessageData: (data, searchData, languageLocation) => dispatch(MaintenanceRedux.setMessageData(data, searchData, languageLocation)),
  setStateMapControlNoti: (name, value) => dispatch(MaintenanceRedux.setStateMapControlNoti(name, value)),
  setSelectAll: (isSelectAll) => dispatch(MaintenanceRedux.setSelectAll(isSelectAll)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance)
