import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { t } from '../../Components/Translation'
import { Row, Col } from 'reactstrap'
import GeofenceReportActions from '../../Redux/GeofenceReportRedux'
import PannelBox from '../../Components/PannelBox'
import FormSelectGroup from '../../Components/FormControls/Basic/FormSelectGroup'
import FormInputNumber from '../../Components/FormControls/FormInputNumber'
import FormSelectSearch from '../../Components/FormControls/FormSelectSearch'
import DateRangePicker from './DateRangePicker'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { mappingData, getColumnReport, getUrlReport, getDefaultDuration, getEventName } from './Config'
import DataTable from './DataTable'
import { get } from 'lodash'
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
export const dataStore = new ArrayStore({ data: [] });
var dataSource

const InputNumber = (arg) => {
  return (<FormInputNumber
    schema={{ "required": [""] }}
    value={arg.value}
    label={arg.label}
    fieldForm={"XXX"}
    placeholder={""}
    minLengt={0}
    flex={5}
    onChange={(value) => arg.onChange(value)}
  />
  )
}

class GeofenceReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columnConfig: []
    }
    dataSource = new DataSource({
      store: dataStore,
      reshapeOnPush: true
    });
  }

  componentWillMount() {
    let { geofenceReportTemp, customerLists, reportSelect } = this.props
    customerLists.length === 0 && this.getCustomer()
    if (geofenceReportTemp.length > 0) this.setDataStore(geofenceReportTemp)

    this.setState({ columnConfig: getColumnReport(reportSelect) })
  }

  componentWillUnmount() {
    dataStore.clear()
    dataSource.reload()
    this.props.setValue("isLoading", false)
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { reportSelect, geofenceReportTemp } = this.props

    if (nextProps.reportSelect !== reportSelect) {
      this.setState({ columnConfig: getColumnReport(nextProps.reportSelect) })

      let dafaultDuration = getDefaultDuration(nextProps.reportSelect)
      this.props.setValue("duration", dafaultDuration)
      return true
    }

    if (nextProps.geofenceReportTemp !== geofenceReportTemp) return false

    return true
  }

  getCustomer = async () => {
    this.props.setValue("isLoading", true)
    try {
      var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_manage_customer", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "userId": this.props.dataLogin.userId })
      });

      var data = await response.json();
      let list = data.map(e => ({ key: "" + e.id, value: e.customer_name }))

      if (list.length > 0) {
        list.unshift(
          {
            key: "0",
            value: "my_vehicles_92",
          })
        this.props.setValue("customerLists", list)
        this.props.setValue("customerSelect", list[0].key)
        this.getFleetMulti(list[0].key)
      }
    } catch {
      this.props.setValue("customerLists", [])
      this.props.setValue("customerSelect", [])
    }
  }

  getFleetMulti = async (value) => {
    let { fleetSelect } = this.props

    if (value === "0") {
      this.props.setValue("fleetLists", [{
        key: "0",
        value: "my_vehicles_92"
      }])
      this.props.setValue("fleetSelect", "0")
    }
    else {
      let arrCus = []
      let obj = {}

      Array.isArray(value) ? arrCus = value : arrCus.push(value)
      obj = {
        userId: this.props.dataLogin.userId,
        customer_id: arrCus
      }
      var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_fleet_by_manage", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      });

      var data = await response.json();

      try {
        let list = data.result.map(ele => ({
          groupName: get(ele, 'customer_name', ''),
          items: ele.fleet_list.map(item => ({ key: '' + item.fleet_id, value: item.fleet_name }))
        }))

        if (list.length > 0) {
          this.props.setValue("fleetLists", list)

          if (fleetSelect.length > 0 && fleetSelect === "0") {
            this.props.setValue("fleetSelect", [])
          }
          else {
            let newAry = fleetSelect.filter((key) => (list.map((item) => get(item, "items[0].key")).includes(key)))
            this.props.setValue("fleetSelect", newAry)
          }
        }
      } catch (error) {
        this.props.setValue("fleetLists", [])
        this.props.setValue("fleetLists", [])
      }
    }
    this.props.setValue("isLoading", false)
  }


  //#region LAST EVALUATE KEY

  async getDataReport() {
    let { dateStart, dateEnd, duration, customerSelect, fleetSelect, dataLogin, reportSelect, mileage } = this.props
    dataStore.clear()
    dataSource.reload()
    // console.log("GET DATA REPORT : ", this.props)

    this.props.setValue("isLoading", true)

    let data = [], response = "", isLastKey = false, dict = {}, isFirstLoad = true
    let body = {
      "report_type": parseInt(reportSelect),
      "dtstart": dateStart,
      "dtstop": dateEnd,
      "user_id": dataLogin.userId,
      "mileage": mileage === "" ? 0 : parseInt(mileage),
      "overtime": duration === "" ? 0 : parseInt(duration),
    }

    this.props.setValue("gridInfo", {
      columnConfig: this.state.columnConfig,
      reportName: getEventName(body.report_type, body.overtime),
      dateStart,
      dateEnd,
    })


    if (customerSelect !== "0") {
      let cust_id = []
      customerSelect.forEach((value) => cust_id.push(parseInt(value)))
      body.cust_id = cust_id
    }

    if (fleetSelect !== "0") {
      let fleet_id = []
      fleetSelect.forEach((value) => fleet_id.push(parseInt(value)))
      body.fleet_id = fleet_id
    }

    // console.log("body : ", body)

    let url = getUrlReport(reportSelect)
    do {
      response = await this.loadReportLastEvaluate(isLastKey, get(response, 'LastEvaluatedKey', []), body, url)
      try {
        if (isFirstLoad) {
          dataStore.clear()
          dataSource.reload()
        }
        isFirstLoad = false

        get(response, 'dict') && (dict = response.dict)
        if (response.list.length > 0) {
          data.push(...response.list)
          let result = mappingData(reportSelect, response.list, dict, duration)

          this.setDataStore(result)
        }

        if (get(response, 'LastEvaluatedKey'))
          isLastKey = true
        else
          isLastKey = false

      } catch {
        isLastKey = false
      }

    } while (isLastKey);

    this.props.setValue("geofenceReportTemp", dataStore._array)
    this.props.setValue("isLoading", false)
  }

  async loadReportLastEvaluate(isLastKey = false, LastEvaluatedKey = [], body, url) {
    if (isLastKey) {
      body.LastEvaluatedKey = LastEvaluatedKey
    }

    try {
      var response = await fetch(ENDPOINT_BASE_URL + url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': this.props.language
        },
        body: JSON.stringify(body)
      });

      var resp = await response.json();

      // console.log("resp : ", resp)

      if (resp.code === 200) {
        if (get(resp.result, 'list')) {
          return resp.result
        }
      }
      else
        return []

    } catch { return [] }
  }


  setDataStore(data) {
    data.forEach(item => {
      dataStore.push([{
        type: 'insert',
        data: item
      }]);
    });
  }

  //#endregion

  render() {
    let { reportSelect, customerLists, customerSelect, fleetLists, fleetSelect, duration, mileage } = this.props

    // console.log(">> RENDER <<")

    return <Suspense fallback={null}>
      <PannelBox
        title={t("geofence_reports_27")}
        showFooter={true}
        footerchildren={
          <div style={{ textAlign: 'Right' }}>
            <button onClick={() => this.getDataReport()} className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}> {t("search")} </button>
          </div>
        }
      >
        <Row>
          <Col lg={6} md={6}>
            <FormSelectSearch
              mode={"single"}
              schema={{ "required": [""] }}
              value={reportSelect}
              label={"other_reports_3"}
              list={[
                {
                  key: 0,
                  value: "geofence_reports_28"
                },
                {
                  key: 1,
                  value: "geofence_reports_29"
                }
              ]}
              placeholder={""}
              flex={1}
              onChange={(selected) => {
                this.props.setValue("reportSelect", selected)
              }}
            />
          </Col>

          <Col lg={6} md={6}>
            <FormSelectSearch
              mode={"multiple"}
              schema={{ "required": [""] }}
              value={customerSelect}
              label={"summary_84"}
              list={customerLists}
              placeholder={""}
              flex={1}
              onChange={(selected) => {
                var lastItem = selected[selected.length - 1];
                let select = selected

                if (lastItem === "0" || select.length === 0) {
                  select = "0"
                }
                else {
                  let idx = select.findIndex((id) => id === "0")

                  if (idx > -1) {
                    const index = select.indexOf(select[idx]);
                    if (index > -1) {
                      select.splice(index, 1);
                    }
                  }
                }

                this.props.setValue("customerSelect", select)
                this.getFleetMulti(select)
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={6}>
            {
              fleetLists.length > 0 && fleetLists[0].key !== "0" ?
                <FormSelectGroup
                  schema={{ "required": [""] }}
                  mode={"multiple"}
                  value={fleetSelect}
                  label={"other_reports_22"}
                  list={fleetLists}
                  placeholder={""}
                  flex={1}
                  onChange={(selected) => {
                    this.props.setValue("fleetSelect", selected)
                  }}
                />
                :
                <FormSelectSearch
                  mode={"single"}
                  schema={{ "required": [""] }}
                  value={fleetSelect}
                  label={"other_reports_22"}
                  list={fleetLists}
                  placeholder={""}
                  flex={1}
                />
            }

          </Col>

          <Col lg={6} md={6}>
            <InputNumber
              label="ระยะเวลา (ชั่วโมง)"
              value={duration}
              onChange={(value) => this.props.setValue("duration", value)} />
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={6}>
            <DateRangePicker />
          </Col>


          <Col lg={6} md={6}>
            <InputNumber
              label="เริ่มนับตั้งแต่กิโลเมตรที่"
              value={mileage}
              onChange={(value) => this.props.setValue("mileage", value)} />          </Col>
        </Row>
      </PannelBox>
      <PannelBox
        style={{ marginTop: -20 }}
        contentStyle={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
        <DataTable dataSource={dataSource} columnConfig={this.state.columnConfig} />
      </PannelBox>
    </Suspense>
  }

}

const mapStateToProps = (state) => ({
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  reportSelect: state.geofenceReport.reportSelect,
  customerLists: state.geofenceReport.customerLists,
  customerSelect: state.geofenceReport.customerSelect,
  fleetLists: state.geofenceReport.fleetLists,
  fleetSelect: state.geofenceReport.fleetSelect,
  duration: state.geofenceReport.duration,
  dateStart: state.geofenceReport.dateStart,
  dateEnd: state.geofenceReport.dateEnd,
  geofenceReportTemp: state.geofenceReport.geofenceReportTemp,
  mileage: state.geofenceReport.mileage,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (name, value) => dispatch(GeofenceReportActions.setValue(name, value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeofenceReport)