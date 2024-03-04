import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import OtherReportActions from '../../Redux/OtherReportRedux'
import DropdownActions from '../../Redux/DropdownRedux'
import { Row, Col } from 'reactstrap'
import PannelBox from '../../Components/PannelBox'
import FormSelect from '../../Components/FormControls/FormSelectSearch'
import FormSelectGroup from '../../Components/FormControls/Basic/FormSelectGroup'
import FormSelectSearch from '../../Components/FormControls/FormSelectSearch'
import InputNumber from './FormControls/InputNumber'
import DateRangePicker from './FormControls/DateRangePicker'
import { t } from '../../Components/Translation'
import Alert from '../../Components/Alert'
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import { get, isEmpty } from 'lodash'
import Loading from './Loading'
import TableVehicles from './TableVehicles'

let vehicleSelected = []
class OtherReports extends Component {
  constructor(props) {
    super(props)
    this.state = {
      reportId: [],
      fleetId: [],
      fleetIdMulti: [],
      alertSetting: {
        show: false,
        type: 2,
        content: "",
        validateCode: false
      },
      listCustomerMulti: [],
      listFleetMulti: [],
      customer: ''
    }
    this.customer_mode = false
    this.dealer_mode = false
    this.admin_mode = false
    this.selectedCallback = this.selectedCallback.bind(this)
  }

  componentWillMount() {
    let { detailSelected, masterDataTemp, history,
      dataLogin, vehicles, fleets, customers, reportMenu,
      reportSelected, customerSelected, fleetSelected, fleetMulti } = this.props

    if (detailSelected !== "") history.push("/OtherReportNew/Detail")
    else if (masterDataTemp !== null) history.push("/OtherReportNew/Summary")
    // summaryData, masterData, masterDataTemp
    // if(this.props.masterDataTemp)
    vehicleSelected = []
    // this.props.setMasterDataTemp([])
    // vehicles.length == 0 && this.props.getVehicles(dataLogin.userId)
    // this.customer_mode = true
    const userLevelAdmin = [1, 2, 11, 12, 21, 22]

    if (dataLogin.userLevelId === 32) this.dealer_mode = true
    else if (userLevelAdmin.includes(dataLogin.userLevelId)) this.admin_mode = true
    else this.customer_mode = true
    vehicleSelected = []
    // this.props.setMasterDataTemp([])
    if (this.customer_mode) {
      let obj = {
        "user_id": this.props.dataLogin.userId,
      }


      this.props.vehiclesData.length == 0 && this.props.getVehiclesMulti(obj)
      this.props.fleets.length == 0 && this.props.getFleet(this.props.dataLogin.userId)
    } else {
      customers.length == 0 && this.props.getCustomer(dataLogin.userId)
    }
    reportMenu.length == 0 ? this.props.getReportMenu(dataLogin.userId) : this.props.setReportMenu(reportMenu)
    // if(reportSelected)this.setState({ customerId: "" + defaultCustomerId })
    let obj = {}
    if (reportSelected != "") obj.reportId = reportSelected
    if (customerSelected != "") obj.customerId = Array.isArray(customerSelected) ? customerSelected.map(e => '' + e) : '' + customerSelected
    if (fleetSelected != "") obj.fleetId = fleetSelected
    if (fleetMulti.length > 0) obj.fleetIdMulti = fleetMulti
    if (!isEmpty(obj)) this.setState(obj)

    // console.log(this.props.FleetListMulti)
    this.admin_mode && this.props.FleetListMulti.length == 0 ? this.getFleetMulti(customerSelected) : this.getFleetBackup(customerSelected)

    this.loadCustomer()
  }

  componentDidUpdate(prevProps) {
    let { reportMenu, fleets, customers } = this.props
    if (prevProps.reportMenu !== reportMenu) this.setDefaultReportMenu()
    if (prevProps.fleets !== fleets) this.setDefaultFleets()
    if (prevProps.customers !== customers) this.setDefaultCustomers()
  }

  setDefault() {
    this.setDefaultReportMenu()
    this.setDefaultFleets()
    this.setDefaultCustomers()
  }

  loadCustomer = async () => {

    const { customers } = this.props
    let obj = { "userId": this.props.dataLogin.userId }

    if (isEmpty(customers)) {
      var response = await fetch(ENDPOINT_BASE_URL + "fleet/get_manage_customer", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
      });

      var data = await response.json();
      let list = data.map(e => ({ key: e.id, value: e.customer_name }))

      this.props.setCustomerOtherReport(list)
      this.setState({ listCustomerMulti: list })

    } else {
      this.setState({ listCustomerMulti: customers })
    }
  }

  getFleetMulti = async (value) => {
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

      const { fleetIdMulti } = this.state
      // ลบ fleet เมื่อ customer หาย
      let newAry = fleetIdMulti.filter((key) => (list.map((item) => get(item, "items[0].key")).includes(key)))
      this.props.setFleetListMulti(list)
      this.setState({
        listFleetMulti: list,
        fleetIdMulti: newAry
      })

    } catch (error) {

    }
  }

  getFleetBackup = value => {
    // ลบ fleet เมื่อ customer หาย
    let newAry = []

    if (this.props.fleetMulti != undefined) newAry = this.props.fleetMulti.filter((key) => (this.props.FleetListMulti.map((item) => get(item, "items[0].key")).includes(key)))

    this.setState({
      listFleetMulti: this.props.FleetListMulti,
      fleetIdMulti: newAry
    })
  }

  async loadFleet(cust_id) {
    var object = {
      userId: this.props.dataLogin.userId,
      customer_id: parseInt(cust_id)
    }

    var response = await fetch(ENDPOINT_BASE_URL + "fleet/getfleet", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });

    var data = await response.json();
    if (data.length > 0) {
      let fleetList = []
      for (let index in data) {
        fleetList.push({ key: data[index].fleet_id, value: data[index].fleet_name })
      }

      let arrFleet = []
      Array.isArray(fleetList[0].key) ? arrFleet = fleetList[0].key : arrFleet.push(fleetList[0].key)

      let obj = {
        "user_id": this.props.dataLogin.userId,
        "fleet_id": arrFleet
      }

      this.props.setFleet(fleetList)
      this.setState({ fleetId: "" + fleetList[0].key })
      this.props.setFleetSelected("" + fleetList[0].key)
      if (this.customer_mode) this.props.getVehiclesMulti(obj)
    }
    else {
      this.props.setFleet([])
      this.setState({ fleetId: [] })
      this.props.setFleetSelected("")
    }
  }

  setDefaultReportMenu() {
    let { reportMenu } = this.props
    if (reportMenu.length > 0) {
      let defaultReportId = ""
      if (this.props.reportSelected != "") defaultReportId = this.props.reportSelected
      else defaultReportId = reportMenu[0].items[0].key

      this.setState({ reportId: defaultReportId })
      this.props.setReportSelected(defaultReportId)
    }
  }

  setDefaultCustomers() {
    let { customers } = this.props
    if (customers.length > 0) {
      let defaultCustomerId = ""
      // console.log('this.props.customerSelected', this.props.customerSelected)
      if (this.props.customerSelected != "") defaultCustomerId = this.props.customerSelected
      else defaultCustomerId = customers[0].key
      this.setState({ customerId: '' + defaultCustomerId })
      this.props.setCustomerSelected(defaultCustomerId)


      if (this.dealer_mode) this.loadFleet(customers[0].key)
      else this.getFleetMulti('' + defaultCustomerId)
    }
  }

  setDefaultFleets() {
    let { fleets } = this.props
    if (fleets.length > 0) {
      let defaultFleetId = ""
      if (this.props.fleetSelected != "") defaultFleetId = "" + this.props.fleetSelected
      else defaultFleetId = "" + fleets[0].key
      this.setState({ fleetId: defaultFleetId })
      this.props.setFleetSelected(defaultFleetId)
      // this.props.getVehicles(this.props.dataLogin.userId, fleets[0].key)
    }
  }

  selectedCallback(e) {
    this.props.setVehicleSelected(e.selectedRowsData)
  }

  createReport() {
    if (vehicleSelected.length == 0) {
      this.setAlertSetting(true, "other_reports_60")
      return
    }
    this.props.setVehicleSelected(vehicleSelected)
    this.props.history.push("/OtherReportNew/Summary")
  }

  onApplyEvent(dataObject) {
    this.props.setDateRang(dataObject.startDate.format('YYYY/MM/DD'), dataObject.endDate.format('YYYY/MM/DD'))
  }

  convertDate(date) {
    var start_date = date
    var start_date_y = start_date.split('/')[0]
    var start_date_m = start_date.split('/')[1]
    var start_date_d = start_date.split('/')[2]

    return start_date_d + '/' + start_date_m + "/" + start_date_y
  }

  setAlertSetting(isShow, content) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.content = content
    this.setState({ alertSetting })
  }

  getListVehicle = (fleetSelected = "") => {
    const { customerId, fleetIdMulti } = this.state

    let arrCus = []
    let arrFleet = []
    let cust = isEmpty(customerId) ? [] : customerId

    Array.isArray(cust) ? arrCus = cust : arrCus.push(cust)
    Array.isArray(fleetIdMulti) ? arrFleet = fleetIdMulti : arrFleet.push(fleetIdMulti)

    if (this.customer_mode) arrFleet = [fleetSelected]
    if (this.dealer_mode) arrFleet = [this.props.fleetSelected]

    let obj = {
      "user_id": this.props.dataLogin.userId,
      "cust_id": arrCus,
      "fleet_id": arrFleet
    }

    this.props.getVehiclesMulti(obj)
  }

  render() {
    let { alertSetting, listCustomerMulti, listFleetMulti, customerId } = this.state
    let { vehiclesData, reportMenu, fleets, customers } = this.props



    return <Suspense fallback={null}>
      <Alert
        setting={alertSetting}
        onConfirm={() => this.setAlertSetting(false, "")}
      />
      <Loading />
      <PannelBox
        title={t("other_reports_2")}
        showFooter={true}
        footerchildren={
          <div style={{ textAlign: 'Right' }}>
            {(this.dealer_mode || this.admin_mode) && <button onClick={() => this.getListVehicle()} className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}> {t("search")} </button>}
            <button onClick={() => this.createReport()} className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}><i className="far fa-file-alt" aria-hidden="true"  ></i> {t("other_reports_17")} </button>
          </div>
        }
      >
        <Row>
          <Col lg={6}>
            <FormSelectGroup
              mode={"single"}
              value={this.state.reportId}
              label={"other_reports_3"}
              list={reportMenu}
              placeholder={""}
              flex={1}
              onChange={(selected) => {
                this.setState({ reportId: selected })
                this.props.setReportSelected(selected)
                if (!(selected == "201" || selected == "202" || selected == "203")) this.props.setOverTime(0)
              }}
            />
          </Col>
          {this.dealer_mode && <Col lg={6}>
            <FormSelect
              schema={{ "required": [""] }}
              mode={"single"}
              value={customerId}
              label={"summary_84"}
              list={customers}
              placeholder={""}
              flex={1}
              onChange={(selected) => {
                this.setState({ customerId: selected })
                this.loadFleet(selected)
                this.props.setCustomerSelected(selected + '')
              }}
            />
          </Col>}

          {this.admin_mode && <Col lg={6}>
            <FormSelectSearch
              mode={"multiple"}
              schema={{ "required": [""] }}
              value={customerId}
              label={"summary_84"}
              list={listCustomerMulti}
              placeholder={""}
              flex={1}
              onChange={(selected) => {
                this.setState({ customerId: selected })
                this.getFleetMulti(selected)
                this.props.setCustomerSelected(selected)
              }}
            />
          </Col>}

          <Col lg={6}>
            {
              this.admin_mode ?
                <FormSelectGroup
                  schema={{ "required": [""] }}
                  mode={"multiple"}
                  value={this.state.fleetIdMulti}
                  label={"other_reports_22"}
                  list={listFleetMulti}
                  placeholder={""}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({ fleetIdMulti: selected })
                    this.props.setFleetMulti(selected)
                    // this.props.setFleetSelected(selected)
                  }}
                /> :
                <FormSelect
                  schema={{ "required": [""] }}
                  mode={"single"}
                  value={this.state.fleetId}
                  label={"other_reports_22"}
                  list={fleets}
                  placeholder={""}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({ fleetId: selected })
                    this.props.setFleetSelected(selected)
                    this.getListVehicle(selected)
                  }}
                />
            }
          </Col>

          <Col lg={6}>
            <DateRangePicker />
          </Col>

          <Col lg={6}>
            <InputNumber />
          </Col>
        </Row>
      </PannelBox>
      <PannelBox
        style={{ marginTop: -20 }}
        contentStyle={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>

        <TableVehicles
          selectedCallback={(value) => vehicleSelected = value}
        />
      </PannelBox>
    </Suspense>
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  vehiclesData: state.otherReport.vehiclesData,
  reportMenu: state.otherReport.reportMenu,
  fleets: state.otherReport.fleets,
  customers: state.otherReport.customers,
  reportSelected: state.otherReport.reportSelected,
  fleetSelected: state.otherReport.fleetSelected,
  vehicleSelected: state.otherReport.vehicleSelected,
  detailSelected: state.otherReport.detailSelected,
  masterDataTemp: state.otherReport.masterDataTemp,
  customerSelected: state.otherReport.customerSelected,
  fleetMulti: state.otherReport.fleetMulti,
  FleetListMulti: state.otherReport.FleetListMulti
});

const mapDispatchToProps = (dispatch) => ({
  getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key)),
  getVehicles: (user_id, cust_id, fleet_id) => dispatch(OtherReportActions.getVehicles(user_id, cust_id, fleet_id)),
  getVehiclesMulti: (data) => dispatch(OtherReportActions.getVehiclesMulti(data)),
  getReportMenu: (user_id) => dispatch(OtherReportActions.getReportMenu(user_id)),
  getFleet: (user_id) => dispatch(OtherReportActions.getFleet(user_id)),
  getCustomer: (user_id) => dispatch(OtherReportActions.getCustomerOtherReport(user_id)),
  setReportSelected: (reportId) => dispatch(OtherReportActions.setReportSelected(reportId)),
  setCustomerSelected: (customerId) => dispatch(OtherReportActions.setCustomerSelected(customerId)),
  setVehicleSelected: (vehicles) => dispatch(OtherReportActions.setVehicleSelected(vehicles)),
  setFleetSelected: (fleetId) => dispatch(OtherReportActions.setFleetSelected(fleetId)),
  setDateRang: (dateStart, dateEnd) => dispatch(OtherReportActions.setDateRang(dateStart, dateEnd)),
  setReportMenu: (data) => dispatch(OtherReportActions.setReportMenu(data)),
  setMasterDataTemp: (data) => dispatch(OtherReportActions.setMasterDataTemp(data)),
  setOverTime: (data) => dispatch(OtherReportActions.setOverTime(data)),
  setFleet: (data) => dispatch(OtherReportActions.setFleet(data)),
  setCustomerOtherReport: (data) => dispatch(OtherReportActions.setCustomerOtherReport(data)),
  setFleetMulti: (fleetMulti) => dispatch(OtherReportActions.setFleetMulti(fleetMulti)),
  setFleetListMulti: (FleetListMulti) => dispatch(OtherReportActions.setFleetListMulti(FleetListMulti)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtherReports)