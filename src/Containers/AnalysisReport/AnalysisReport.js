import React, { Component, Suspense } from 'react';
import DataTable from './DataTable.js'
import { connect } from 'react-redux'
import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import AnalysisReportActions from '../../Redux/AnalysisReportRedux'
import moment from 'moment'
import FormDatePicker_dev from '../../Components/FormControls/FormDatepickerNew';
import { t } from '../../Components/Translation'
import Alert from '../../Components/Alert'
import { get, isEmpty } from 'lodash'
import { ENDPOINT_BASE_URL, ENDPOINT_HINO_API_URL } from '../../Config/app-config';

class AnalysisReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dealer: [],
      customer: [],
      fleet: [],
      driver: [],
      selected_dealer: 'Please select dealer',
      selected_customer: t("my_drivers_4"),
      selected_fleet: t("my_drivers_6"),
      alertSetting: {
        show: false,
        type: 2,
        content: "",
        validateCode: false
      }
    }
    this.startDate = ""
    this.stopDate = ""
    this.selectedRow = []
    this.selectedCallback = this.selectedCallback.bind(this)
    this.selectedDealer = React.createRef();
    this.selectedCustomer = React.createRef();
    this.exportsEcotreefleet = this.exportsEcotreefleet.bind(this)
    this.onApplyEvent = this.onApplyEvent.bind(this);
    //this.tableInitial = this.tableInitial.bind(this)
    this.exportsEcotree = this.exportsEcotree.bind(this)
    this.datagridInstance = React.createRef();
    this.onDealerChanged = this.onDealerChanged.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
    this.loadfleet = this.loadfleet.bind(this);
    //this.getday = this.getday.bind(this);
    this.fleet_mode = false
    this.firstLoadCookie = false
  }

  componentWillMount() {
    let { lstDealer, lstCustomer, selectedDealer, selectedCustomer, lstFleet,
      selectedFleet, startDate, endDate } = this.props

    if (startDate !== null) {
      this.firstLoadCookie = true
      let obj = {}
      if (this.props.dataLogin.userLevelId === 43) { // 13-11-2020 Hidden for fleet level
        this.fleet_mode = true
        // this.loadfleet()
      }
      else if (this.props.dataLogin.userLevelId === 32) {
        this.dealer_mode = true
        obj.dealer = lstDealer || []
        obj.selected_dealer = selectedDealer || 'Please select dealer'
      } else {
        this.customer_mode = true
      }
      obj.customer = lstCustomer || []
      obj.selected_customer = selectedCustomer || t("my_drivers_4")
      obj.fleet = lstFleet || []
      obj.selected_fleet = selectedFleet || t("my_drivers_6")

      this.startDate = startDate
      this.stopDate = endDate

      this.setState(obj)

    } else {
      if (this.props.dataLogin.userLevelId === 43) {// 13-11-2020 Hidden for fleet level
        this.fleet_mode = true
        this.loadfleet()
      }
      else if (this.props.dataLogin.userLevelId > 40) {
        this.customer_mode = true
        this.load_manage_customer()

      } else {
        this.dealer_mode = true
        this.load_manage_dealer()
      }
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    let { lstDealer, lstCustomer, selectedDealer, selectedCustomer, lstFleet,
      selectedFleet, startDate, endDate } = this.props

    if (nextProps.lstDealer !== lstDealer) return false
    if (nextProps.lstCustomer !== lstCustomer) return false
    if (nextProps.selectedDealer !== selectedDealer) return false
    if (nextProps.selectedCustomer !== selectedCustomer) return false
    // if (nextProps.lstFleet !== lstFleet) return false
    // if (nextProps.selectedFleet !== selectedFleet) return false
    if (nextProps.startDate !== startDate) return false
    if (nextProps.endDate !== endDate) return false
    // if (nextProps.lstDriverTable !== lstDriverTable) return false

    return true

  }

  onApplyEvent(dataObject) {
    this.startDate = dataObject.startDate.format('DD/MM/YYYY')
    this.stopDate = dataObject.endDate.format('DD/MM/YYYY')
    if (this.firstLoadCookie) {
      this.firstLoadCookie = false
    } else {
      if (this.customer_mode) this.loaddriver()
      if (this.fleet_mode) this.loaddriver() // 13-11-2020 Hidden for fleet level
      this.props.setStateReduxAnalysisReport({
        startDate: this.startDate,
        endDate: this.stopDate,
      })
    }
  }

  async load_manage_dealer() {
    var userId = this.props.dataLogin.userId
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_dealer_by_manage"
    var api = ENDPOINT_BASE_URL + "fleet/get_dealer_by_manage"
    var object = {
      userId: userId
    }
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    responseJson.length > 0 && this.onDealerChanged(responseJson[0].partner_id)
    this.setState({
      dealer: responseJson
    }, () => {
      //console.log(this.state.dealer)
      this.props.setStateReduxAnalysisReport({ lstDealer: responseJson })
    })
  }

  async loaddriver() {
    this.setAlertSetting(true, 5)
    var dealer_id = this.state.selected_dealer;
    var customer_id = this.state.selected_customer;
    var fleet_id = this.state.selected_fleet;

    var object = {
      user_id: this.props.dataLogin.userId,
      start_date: moment(this.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      stop_date: moment(this.stopDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      cust_id: (isNaN(customer_id)) ? 0 : customer_id,
      dealer_id: (isNaN(dealer_id)) ? 0 : dealer_id
    }

    // var response = await fetch("http://10.8.0.5:5000/prod/fleet/mydriver", {
    var response = await fetch(ENDPOINT_HINO_API_URL + "fleet/V2/mydriverTest", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)

    });
    var responseJson = await response.json();

    if (responseJson.code == 200) {
      object.fleet_id = (isNaN(fleet_id)) ? 0 : fleet_id
      let headerData = this.setHeaderData(object)
      this.props.setStateReduxAnalysisReport({ lstDriverTable: responseJson.result, headerData })
    }
    else this.props.setStateReduxAnalysisReport({ lstDriverTable: [] })

    this.setAlertSetting(false)
  }

  setHeaderData(obj) {
    let { lstDealer, lstCustomer, lstFleet } = this.props
    let headerData = { start_date: obj.start_date, stop_date: obj.stop_date }, name = ''
    // console.log('obj', obj)
    if (this.dealer_mode) {
      let deal = lstDealer.find((item) => item.partner_id == get(obj, 'dealer_id'))
      if (deal) {
        let lstName = []
        if (deal.prefix) lstName.push(deal.prefix)
        if (deal.firstname) lstName.push(deal.firstname)
        if (deal.lastname) lstName.push(deal.lastname)
        if (deal.suffix) lstName.push(deal.suffix)
        name = lstName.join(' ')
      } else name = '-'
      headerData.dealer_name = name
      let cust = lstCustomer.find((item) => item.partner_id == get(obj, 'cust_id'))
      if (cust) {
        let lstName = []
        if (cust.prefix) lstName.push(cust.prefix)
        if (cust.firstname) lstName.push(cust.firstname)
        if (cust.lastname) lstName.push(cust.lastname)
        if (cust.suffix) lstName.push(cust.suffix)
        name = lstName.join(' ')
      } else name = '-'
      headerData.customer_name = name
      headerData.fleet_name = get(lstFleet.find((item) => item.fleet_id == get(obj, 'fleet_id')), 'fleet_name', '-')
    } else if (this.customer_mode) {
      let cust = lstCustomer.find((item) => item.int_cust_id == get(obj, 'cust_id'))
      if (cust) name = cust.customer_name
      else name = '-'
      headerData.customer_name = name
      headerData.fleet_name = get(lstFleet.find((item) => item.fleet_id == get(obj, 'fleet_id')), 'fleet_name', '-')
    } else {
      headerData.fleet_name = get(lstFleet.find((item) => item.fleet_id == get(obj, 'fleet_id')), 'fleet_name', '-')
    }
    return headerData
  }

  async loadcustomer() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
      dealer_id: this.state.selected_dealer
    }

    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer"
    var api = ENDPOINT_BASE_URL + "fleet/get_customer"
    // var api = "http://10.8.0.7:5100/prod/" + "fleet/get_customer"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();

    if (this.dealer_mode) {
      responseJson.unshift(
        {
          firstname: "my_vehicles_92",
          lastname: "",
          partner_id: 0,
          prefix: "",
          suffix: ""
        }
      )
    }

    responseJson.length > 0 && this.onCustomerChanged(responseJson[0].partner_id)

    this.setState({
      customer: responseJson
    }, () => {
      this.props.setStateReduxAnalysisReport({ lstCustomer: responseJson })
    })
  }

  async load_manage_customer() {
    var userId = this.props.dataLogin.userId
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer_by_manage"
    var api = ENDPOINT_BASE_URL + "fleet/get_customer_by_manage"
    var object = {
      userId: userId
    }
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    responseJson.length > 0 && this.onCustomerChanged(responseJson[0].int_cust_id)
    this.setState({
      customer: responseJson
    }, () => {
      this.props.setStateReduxAnalysisReport({ lstCustomer: responseJson })
    })
  }

  onDealerChanged(e) {
    this.setState({
      selected_dealer: e,
      customer: [],
      // selected_customer: 0
    }, () => {
      this.props.setStateReduxAnalysisReport({
        selectedDealer: e,
        lstCustomer: [],
        selectedCustomer: 0
      })
      this.loadcustomer()
      if (this.customer_mode) this.loaddriver()
    });
  }

  onCustomerChanged(e) {
    this.setState({
      selected_customer: e,
    }, () => {
      this.props.setStateReduxAnalysisReport({ selectedCustomer: e })
      this.loadfleet()
      if (this.customer_mode) this.loaddriver()
    });
  }

  onFleetChanged(e) {
    this.setState({
      selected_fleet: e,
    }, () => {
      this.props.setStateReduxAnalysisReport({
        selectedFleet: e
      })
      if (this.customer_mode) this.loaddriver()
      if (this.fleet_mode) this.loaddriver()  // 13-11-2020 Hidden for fleet level
    });
  }

  async loadfleet() {
    var userId = this.props.dataLogin.userId

    let _selected_customer = this.state.selected_customer
    if (this.fleet_mode) _selected_customer = 0  // 13-11-2020 Hidden for fleet level

    let data = []
    if (_selected_customer === 0 || _selected_customer.length > 1) {
      data.push({
        fleet_id: 0,
        fleet_name: "my_vehicles_4"
      })
    }
    else {
      var object = {
        userId: userId,
        // customer_id: this.state.selected_customer
        customer_id: _selected_customer
      }
      // var api = "http://10.8.0.5:5000/prod/fleet/getfleet"
      var api = ENDPOINT_BASE_URL + "fleet/getfleet"
      var response = await fetch(api, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object)
      });
      data = await response.json();
    }
    data.length > 0 && this.onFleetChanged(data[0].fleet_id)

    this.setState({
      fleet: data
    }, () => {
      this.props.setStateReduxAnalysisReport({ lstFleet: data })
    })
  }

  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData
  }

  exportsEcotree() {
    if (this.selectedRow.length == 0) {
      // Swal.fire('ล้มเหลว', 'กรุณาเลือกผู้ขับขี่สำหรับออกรายงาน Eco Tree', 'error')
      this.setAlertSetting(true, 2, "กรุณาเลือกผู้ขับขี่สำหรับออกรายงาน Eco Tree")
    } else {
      let id = []
      this.selectedRow.forEach((element) => {
        id.push(element.id)
      })
      let start_date_timestamp = moment(this.startDate, 'DD/MM/YYYY').unix()
      let end_date_timestamp = moment(this.stopDate, 'DD/MM/YYYY').unix()
      window.open('/#/reportTable/Reportecotree?customer=' + this.state.selected_customer + '&driver=' + JSON.stringify(id) + "&startdate=" + start_date_timestamp + "&enddate=" + end_date_timestamp, '_blank')
    }
  }
  exportsEcotreefleet() {
    if (isNaN(this.state.selected_fleet)) {
      // Swal.fire('ล้มเหลว', 'กรุณาเลือก Fleet ที่ต้้องการดู Report', 'error')
      this.setAlertSetting(true, 2, "กรุณาเลือก Fleet ที่ต้้องการดู Report")
    } else {
      let start_date_timestamp = moment(this.startDate, 'DD/MM/YYYY').unix()
      let end_date_timestamp = moment(this.stopDate, 'DD/MM/YYYY').unix()
      window.open('/#/reportTable/Reportecotreefleet?fleet=' + this.state.selected_fleet + "&startdate=" + start_date_timestamp + "&enddate=" + end_date_timestamp, '_blank')
    }
  }

  setAlertSetting(isShow, type, content) {
    let { alertSetting } = this.state
    alertSetting.show = isShow
    alertSetting.type = type
    alertSetting.content = content
    this.setState({ alertSetting })
  }

  render() {
    let { lstDriverTable, dataLogin } = this.props
    let { alertSetting } = this.state

    return (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => this.setAlertSetting(false)}
        />
        <div className="row">
          <div className="col-md-12">
            <div className="ibox">
              <div className="ibox-title" style={{ padding: '15px 10px 10px 15px' }}>
                <div className="row">
                  <div className="col-lg-4">
                    <h3 style={{ marginTop: 5, fontSize: 18 }}>Eco Tree</h3>
                  </div>
                  <div className="col-lg-8" style={{ textAlign: 'right' }}>
                    <div style={{ display: this.state.tableLoaded == false ? 'none' : '' }} className="col-md-12 text-right">
                      <button onClick={this.exportsEcotree} className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}><i className="far fa-file-alt" aria-hidden="true"></i> {t("analysis_reports_12")} </button>
                      <button onClick={this.exportsEcotreefleet} className="btn" style={{ backgroundColor: '#1AB394', color: 'white' }}><i className="far fa-file-alt" aria-hidden="true"></i>  {t("analysis_reports_13")}</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ibox-content">
                <div className="form-group row" style={{ marginBottom: 4 }}>

                  {
                    this.fleet_mode && <>
                      <div className="col-lg-6">
                        <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                          label={"my_drivers_5"}
                          list={this.state.fleet.map((element, i) => {
                            return { key: i, value: element.fleet_id, text: element.fleet_name }
                          })}
                          placeholder={"Fleet ame"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              selected_fleet: selected
                            }, () => {
                              this.props.setStateReduxAnalysisReport({ selectedFleet: selected })
                              this.onFleetChanged(selected)
                            })

                          }}>
                        </FormSelect>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                          <label className="control-label" style={{ fontWeight: 500 }}>
                            {t('date_Range')} :
                             </label>
                          <FormDatePicker_dev
                            startDate={this.startDate}
                            endDate={this.stopDate}
                            maxDate={moment().subtract(1, 'day')}
                            select_change={this.onApplyEvent.bind(this)}
                          >
                          </FormDatePicker_dev>
                        </div>
                      </div>
                    </>
                  }

                  {
                    this.customer_mode && <>
                      <div className="col-lg-6">
                        <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={this.state.selected_customer}  //single = "key" , multiple = [key]
                          label={"analysis_reports_14"}
                          list={this.state.customer.map((element, i) => {
                            if (this.customer_mode == true) return { key: i, value: element.int_cust_id, text: element.customer_name }
                            else if ([0].includes(element.partner_id)) return { key: i, value: element.partner_id, text: element.firstname }
                            else return { key: i, value: element.partner_id, text: element.prefix + " " + ((element.firstname == null) ? '' : element.firstname) + " " + ((element.lastname == null) ? '' : element.lastname) + "  " + ((element.suffix == null ? '' : element.suffix)) }
                          })}
                          placeholder={"Company Name"}
                          flex={1}
                          onChange={(selected) => {
                            this.onCustomerChanged(selected)
                          }}>
                        </FormSelect>
                      </div>

                      <div className="col-lg-6">
                        <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                          label={"my_drivers_5"}
                          list={this.state.fleet.map((element, i) => {
                            return { key: i, value: element.fleet_id, text: element.fleet_name }
                          })}
                          placeholder={"Fleet ame"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              selected_fleet: selected
                            }, () => {
                              this.props.setStateReduxAnalysisReport({ selectedFleet: selected })
                              this.onFleetChanged(selected)
                            })
                          }}>
                        </FormSelect>
                      </div>

                    </>
                  }

                  {
                    this.dealer_mode && <>
                      <div className="col-lg-6">
                        <FormSelect mode={"multiple"}   //mode : (single/multiple)
                          value={this.state.selected_dealer}  //single = "key" , multiple = [key]
                          label={"my_vehicles_71"}
                          list={this.state.dealer.map((element, i) => {
                            return { key: i, value: element.partner_id, text: ((element.prefix == null) ? '' : element.prefix) + ' ' + ((element.firstname == null) ? '' : element.firstname) + ' ' + ((element.lastname == null) ? '' : element.lastname) + ' ' + ((element.suffix == null) ? '' : element.suffix) }
                          })}
                          placeholder={"my_vehicles_71"}
                          flex={1}
                          onChange={(selected) => {
                            if (!isEmpty(selected)) this.onDealerChanged(selected)
                          }}>
                        </FormSelect>
                      </div>

                      <div className="col-lg-6">
                        <FormSelect mode={"multiple"}   //mode : (single/multiple)
                          value={this.state.selected_customer}  //single = "key" , multiple = [key]
                          label={"analysis_reports_14"}
                          list={this.state.customer.map((element, i) => {
                            if (this.customer_mode == true) return { key: i, value: element.int_cust_id, text: element.customer_name }
                            else if ([0].includes(element.partner_id)) return { key: i, value: element.partner_id, text: element.firstname }
                            else return { key: i, value: element.partner_id, text: element.prefix + " " + ((element.firstname == null) ? '' : element.firstname) + " " + ((element.lastname == null) ? '' : element.lastname) + "  " + ((element.suffix == null ? '' : element.suffix)) }
                          })}
                          // placeholder={"Company Name"}
                          flex={1}
                          onChange={(selected) => {
                            // this.onCustomerChanged(selected)
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

                            if (!isEmpty(selected)) this.onCustomerChanged(select)
                          }}>
                        </FormSelect>
                      </div>
                    </>
                  }

                </div>

                <div className="form-group row" style={{ marginBottom: 4 }}>
                  {
                    this.dealer_mode && <>
                      <div className="col-lg-6">
                        <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                          label={"my_drivers_5"}
                          list={this.state.fleet.map((element, i) => {
                            return { key: i, value: element.fleet_id, text: element.fleet_name }
                          })}
                          placeholder={"Fleet ame"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              selected_fleet: selected
                            }, () => {
                              this.props.setStateReduxAnalysisReport({ selectedFleet: selected })
                              this.onFleetChanged(selected)
                            })
                          }}>
                        </FormSelect>
                      </div>
                    </>
                  }

                  <div className="col-lg-6">
                    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                      <label className="control-label" style={{ fontWeight: 500 }}>
                        {t('date_Range')} :
                             </label>
                      <FormDatePicker_dev
                        startDate={this.startDate}
                        endDate={this.stopDate}
                        maxDate={moment().subtract(1, 'day')}
                        select_change={this.onApplyEvent.bind(this)}
                      >
                      </FormDatePicker_dev>
                    </div>
                  </div>

                </div>

              </div>


              {this.dealer_mode == true && <div className="ibox-footer" >
                <div style={{ textAlign: 'Right' }}>
                  <button onClick={() => this.loaddriver()} className="btn" style={{ marginRight: 10, backgroundColor: '#1AB394', color: 'white' }}>{t("search")} </button>
                </div>
              </div>}


              <div style={{ marginTop: 5 }} className="panel">
                <div className="panel-body">
                  <DataTable isDealer={this.dealer_mode} selectedCallback={this.selectedCallback} />
                </div>
              </div>

            </div>

          </div>
        </div >
      </Suspense >
    );
  }
}



const mapStateToProps = (state) => {
  return {
    dataLogin: state.signin.dataLogin,
    // request_signin: state.analysisReport.request_signin,
    lstDealer: state.analysisReport.lstDealer,
    lstCustomer: state.analysisReport.lstCustomer,
    selectedDealer: state.analysisReport.selectedDealer,
    selectedCustomer: state.analysisReport.selectedCustomer,
    lstFleet: state.analysisReport.lstFleet,
    selectedFleet: state.analysisReport.selectedFleet,
    startDate: state.analysisReport.startDate,
    endDate: state.analysisReport.endDate,
    // lstDriverTable: state.analysisReport.lstDriverTable
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStateReduxAnalysisReport: (objState) => dispatch(AnalysisReportActions.setStateReduxAnalysisReport(objState)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(AnalysisReport))
