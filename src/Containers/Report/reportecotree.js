import React, { Component, Suspense } from 'react';
import Table from '../../Components/DataGridView/Table.js'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import AnalysisReportActions from '../../Redux/AnalysisReportRedux'
import moment from 'moment'
import FormDatePicker_dev from '../../Components/FormControls/FormDatepickerNew';
import { t } from '../../Components/Translation'
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../Config/app-config';
class Reportecotree extends Component {
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
      start_date: moment().startOf('month'),
      end_date: "",
      // start_date: moment().day(-2).format('DD/MM/YYYY'),
      // end_date: moment().day(-1).format('DD/MM/YYYY'),
      start_date_timestamp: moment().startOf('month').unix(),
      end_date_timestamp: moment().subtract(1, 'days').unix(),
      // start_date_timestamp: 0,
      // end_date_timestamp: 0
    }
    this.startDate = ""
    this.stopDate = ""
    this.selectedRow = []
    this.selectedCallback = this.selectedCallback.bind(this)
    this.selectedDealer = React.createRef();
    this.selectedCustomer = React.createRef();
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    this.exportsEcotreefleet = this.exportsEcotreefleet.bind(this)
    this.onApplyEvent = this.onApplyEvent.bind(this);
    //this.tableInitial = this.tableInitial.bind(this)
    this.exportsEcotree = this.exportsEcotree.bind(this)
    this.datagridInstance = React.createRef();
    this.onDealerChanged = this.onDealerChanged.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
    this.loadfleet = this.loadfleet.bind(this);
    //this.getday = this.getday.bind(this);

  }

  componentWillMount() {
    let { lstDealer, lstCustomer, selectedDealer, selectedCustomer, lstFleet,
      selectedFleet, startDate, endDate, lstDriverTable } = this.props

    console.log('lstDriverTable', lstDriverTable)
    console.log('lstCustomer', lstCustomer, selectedCustomer)
    console.log('lstFleet', lstFleet, selectedFleet)

    if (lstDriverTable !== null) {
      let obj = {}
      if (this.props.dataLogin.userLevelId > 40) this.customer_mode = true
      else {
        this.dealer_mode = true
        obj.dealer = lstDealer
        obj.selected_dealer = selectedDealer
      }
      obj.customer = lstCustomer
      obj.selected_customer = selectedCustomer
      obj.fleet = lstFleet
      obj.selected_fleet = selectedFleet
      obj.driver = lstDriverTable

      this.startDate = startDate
      this.stopDate = endDate

      this.setState(obj)

    } else {
      if (this.props.dataLogin.userLevelId > 40) {
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
      selectedFleet, startDate, endDate, lstDriverTable } = this.props

    if (nextProps.lstDealer !== lstDealer) return false
    if (nextProps.lstCustomer !== lstCustomer) return false
    if (nextProps.selectedDealer !== selectedDealer) return false
    if (nextProps.selectedCustomer !== selectedCustomer) return false
    if (nextProps.lstFleet !== lstFleet) return false
    if (nextProps.selectedFleet !== selectedFleet) return false
    if (nextProps.startDate !== startDate) return false
    if (nextProps.endDate !== endDate) return false
    if (nextProps.lstDriverTable !== lstDriverTable) return false

    return true

  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  // getday() {
  //   alert('getday')
  //   var startdate = new Date();
  //   var enddate = new Date();
  //   var day_startdate = startdate.getDate() - 2;
  //   var month_startdate = startdate.getMonth();
  //   var year_startdate = startdate.getFullYear();
  //   var day_enddate = enddate.getDate() - 1;
  //   var month_enddate = enddate.getMonth();
  //   var year_enddate = enddate.getFullYear();

  //   if (String(day_startdate).length < 2 || String(day_enddate).length < 2) {
  //     day_startdate = '0' + day_startdate
  //     day_enddate = '0' + day_enddate
  //   }
  //   if (String(month_startdate).length < 2 || String(month_enddate).length < 2) {
  //     month_startdate = '0' + month_startdate
  //     month_enddate = '0' + month_enddate
  //   }
  //   var startDate = day_startdate + '/' + month_startdate + '/' + year_startdate
  //   var endDate = day_enddate + '/' + month_enddate + '/' + year_enddate
  //   this.setState({
  //     start_date: startDate,
  //     end_date: endDate,
  //     loading: false
  //   }, () => {
  //     //console.log(this.state.start_date)
  //     //console.log(this.state.end_date)
  //     alert('getdayfinish')
  //   })
  // }

  onApplyEvent(dataObject) {
    // var start_date_d = dataObject.startDate.format('YYYY-MM-DD').split('-')[2]
    // var start_date_m = dataObject.startDate.format('YYYY-MM-DD').split('-')[1]
    // var start_date_y = dataObject.startDate.format('YYYY-MM-DD').split('-')[0]
    // var startDate = start_date_y + '-' + start_date_m + '-' + start_date_d
    // var end_date_d = dataObject.endDate.format('YYYY-MM-DD').split('-')[2]
    // var end_date_m = dataObject.endDate.format('YYYY-MM-DD').split('-')[1]
    // var end_date_y = dataObject.endDate.format('YYYY-MM-DD').split('-')[0]
    // var stopDate = end_date_y + '-' + end_date_m + '-' + end_date_d
    this.startDate = dataObject.startDate.format('YYYY-MM-DD')
    this.stopDate = dataObject.endDate.format('YYYY-MM-DD')

    this.setState({
      start_date: dataObject.startDate.format('DD/MM/YYYY'),
      end_date: dataObject.endDate.format('DD/MM/YYYY'),
      start_date_timestamp: dataObject.startDate.unix(),
      end_date_timestamp: dataObject.endDate.unix(),
    }, () => {
      this.loaddriver()
      this.props.setStateReduxAnalysisReport({
        startDate: dataObject.startDate.format('DD/MM/YYYY'),
        endDate: dataObject.endDate.format('DD/MM/YYYY'),
      })
    })
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


  //#region Load Driver Old API
  // async loaddriver() {
  //   var dealer_id = this.state.selected_dealer;
  //   var customer_id = this.state.selected_customer;
  //   var start_date = this.state.start_date;
  //   var end_date = this.state.end_date;
  //   var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getdriver"

  //   var object = {
  //     dealer_id: (isNaN(dealer_id)) ? null : dealer_id,
  //     customer_id: (isNaN(customer_id)) ? null : customer_id,
  //     start_date: this.state.start_date_timestamp,
  //     end_date: this.state.end_date_timestamp
  //   }
  //   var response = await fetch(api, {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(object)

  //   });
  //   var responseJson = await response.json();
  //   this.setState({
  //     driver: responseJson
  //   })
  // }
  //#endregion

  async loaddriver() {
    var dealer_id = this.state.selected_dealer;
    var customer_id = this.state.selected_customer;

    var object = {
      user_id: this.props.dataLogin.userId,
      start_date: this.startDate,
      stop_date: this.stopDate,
      cust_id: (isNaN(customer_id)) ? 0 : customer_id,
      dealer_id: (isNaN(dealer_id)) ? 0 : dealer_id
    }

    var response = await fetch(ENDPOINT_BASE_URL + "fleet/mydriver", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)

    });
    var responseJson = await response.json();

    if (responseJson.code == 200)
      this.setState({
        driver: responseJson.result
      }, () => { this.props.setStateReduxAnalysisReport({ lstDriverTable: responseJson.result }) })
    else
      this.setState({
        driver: []
      }, () => { this.props.setStateReduxAnalysisReport({ lstDriverTable: [] }) })

  }


  async loadcustomer() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
      dealer_id: this.state.selected_dealer
    }

    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/get_customer"
    var api = ENDPOINT_BASE_URL + "fleet/get_customer"
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
      selected_customer: 0
    }, () => {
      this.props.setStateReduxAnalysisReport({
        selectedDealer: e,
        lstCustomer: [],
        selectedCustomer: 0
      })
      this.loadcustomer()
      this.loaddriver()
    });
  }

  onCustomerChanged(e) {
    this.setState({
      selected_customer: e,
    }, () => {
      this.props.setStateReduxAnalysisReport({
        selectedCustomer: e
      })
      this.loaddriver()
      this.loadfleet()
    });
  }

  onFleetChanged(e) {
    this.setState({
      selected_fleet: e,
    }, () => {
      this.props.setStateReduxAnalysisReport({
        selectedFleet: e
      })
      this.loaddriver()
    });
  }

  async loadfleet() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
      customer_id: this.state.selected_customer
    }
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getfleet"
    var api = ENDPOINT_BASE_URL + "fleet/getfleet"
    var response = await fetch(api, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object)
    });
    var responseJson = await response.json();
    this.setState({
      fleet: responseJson
    }, () => {
      this.props.setStateReduxAnalysisReport({ lstFleet: responseJson })
    })
  }

  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData
  }

  exportsEcotree() {
    if (this.selectedRow.length == 0) {
      Swal.fire('ล้มเหลว', 'กรุณาเลือกผู้ขับขี่สำหรับออกรายงาน Eco Tree', 'error')
      return
    }
    var id = []
    this.selectedRow.forEach((element) => {
      id.push(element.id)
    })
    window.open('/#/reportTable/Reportecotree?customer=' + this.state.selected_customer + '&driver=' + JSON.stringify(id) + "&startdate=" + this.state.start_date_timestamp + "&enddate=" + this.state.end_date_timestamp, '_blank')
  }
  exportsEcotreefleet() {
    if (isNaN(this.state.selected_fleet)) {
      Swal.fire('ล้มเหลว', 'กรุณาเลือก Fleet ที่ต้้องการดู Report', 'error')
      return
    }
    window.open('/#/reportTable/Reportecotreefleet?fleet=' + this.state.selected_fleet + "&startdate=" + this.state.start_date_timestamp + "&enddate=" + this.state.end_date_timestamp, '_blank')
  }
  handleDateStartChange(event, picker) {
    let dateStart = moment(picker.startDate)

    let sta = {
      dateStart
    }

    if (!(dateStart.isBefore(this.state.dateEnd))) sta.dateEnd = dateStart
    this.setState(sta);
  }

  handleTimeStartChange(timeStart) {
    this.setState({ timeStart });
  }

  handleDateEndChange(event, picker) {
    let dateEnd = moment(picker.startDate)
    this.setState({ dateEnd });
  }

  handleTimeEndChange(timeEnd) {
    this.setState({ timeEnd });
  }


  render() {

    return (
      <Suspense fallback={null}>
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
                {this.dealer_mode == true && (
                  <div className="form-group row" style={{ marginBottom: 4 }}>

                    <div className="col-lg-6">
                      {/* <select ref={this.selectedDealer} className="form-control" onChange={this.onDealerChanged} value={this.state.selected_dealer} >
                      <option value={0}>Select Dealer</option>
                      {this.state.dealer.map((element, i) => {
                        return (<option key={i} value={element.int_dealer_id}>{element.dealer_name}</option>)
                      })}
                    </select> */}
                      <FormSelect mode={"single"}   //mode : (single/multiple)
                        value={this.state.selected_dealer}  //single = "key" , multiple = [key]
                        label={"Dealer name"}
                        list={this.state.dealer.map((element, i) => {
                          return { key: i, value: element.partner_id, text: ((element.prefix == null) ? '' : element.prefix) + ' ' + ((element.firstname == null) ? '' : element.firstname) + ' ' + ((element.lastname == null) ? '' : element.lastname) + ' ' + ((element.suffix == null) ? '' : element.suffix) }
                        })}
                        placeholder={"Dealer name"}
                        flex={1}
                        onChange={(selected) => {
                          this.setState({
                            selected_dealer: selected
                          })
                          this.onDealerChanged(selected)
                        }}>
                      </FormSelect>
                    </div>

                    <div className="col-lg-6">
                      {/* <select ref={this.selectedCustomer} className="form-control" value={this.state.selected_customer} onChange={this.onCustomerChanged}>
                      <option value={0}>Select Customer</option>
                      {this.state.customer.map((element, i) => {
                        return (<option key={i} value={element.int_cust_id}>{element.customer_name}</option>)
                      })}
                    </select> */}
                      <FormSelect mode={"single"}   //mode : (single/multiple)
                        value={this.state.selected_customer}  //single = "key" , multiple = [key]
                        label={"analysis_reports_14"}
                        list={this.state.customer.map((element, i) => {
                          return { key: i, value: element.partner_id, text: element.prefix + " " + ((element.firstname == null) ? '' : element.firstname) + " " + ((element.lastname == null) ? '' : element.lastname) + "  " + ((element.suffix == null ? '' : element.suffix)) }
                        })}
                        placeholder={"Company Name"}
                        flex={1}
                        onChange={(selected) => {
                          this.setState({
                            selected_customer: selected
                          })
                          this.onCustomerChanged(selected)
                        }}>
                      </FormSelect>
                    </div>
                  </div>
                )}

                {this.customer_mode == true && (
                  <div className="form-group row" style={{ marginBottom: 4 }}>
                    <div className="col-lg-6">
                      {/* <select ref={this.selectedCustomer} className="form-control" value={this.state.selected_customer} onChange={this.onCustomerChanged}>
                      <option value={0}>Select Customer</option>
                      {this.state.customer.map((element, i) => {
                        return (<option key={i} value={element.int_cust_id}>{element.customer_name}</option>)
                      })}
                    </select> */}
                      <FormSelect mode={"single"}   //mode : (single/multiple)
                        value={this.state.selected_customer}  //single = "key" , multiple = [key]
                        label={"analysis_reports_14"}
                        list={this.state.customer.map((element, i) => {
                          return { key: i, value: element.int_cust_id, text: element.customer_name }
                        })}
                        placeholder={"Company Name"}
                        flex={1}
                        onChange={(selected) => {
                          this.setState({
                            selected_customer: selected
                          })
                          this.onCustomerChanged(selected)
                        }}>
                      </FormSelect>
                    </div>
                    {/* <div className="col-lg-6">
                      <div className="col-lg-12" >
                        <label className="col-lg-6 col-form-label">{t("date_Range")}</label>
                        <FormDatePicker_dev
                          select_change={this.onApplyEvent.bind(this)}
                        >
                        </FormDatePicker_dev>
                      </div>
                    </div> */}
                    <div className="col-lg-6">
                      <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                        <label className="control-label" style={{ fontWeight: 500 }}>
                          {t('date_Range')} :
                        </label>
                        <FormDatePicker_dev
                          startDate={this.startDate}
                          endDate={this.stopDate}
                          select_change={this.onApplyEvent.bind(this)}
                        >
                        </FormDatePicker_dev>
                      </div>
                    </div>
                  </div>



                )}
                {/* <div className="row">
                <div className="col-md-4">
                  <div className="form-group form-inline"> */}
                {/* <label style={{ fontSize: 16, marginLeft: 12 }}>Date Range : </label> */}
                {/* <ButtonGroup style={{ marginLeft: 10 }} >
                      <Button onClick={() => this.set_date_range('daily')} className={'button-radio-checkbox btn-sm ' + (this.state.date_range == 'daily' ? 'btn-success' : '')}>Yesterday</Button>
                      <Button onClick={() => this.set_date_range('monthy')} className={'button-radio-checkbox btn-sm ' + (this.state.date_range == 'monthy' ? 'btn-success' : '')} >Last Week</Button>
                      <Button onClick={() => this.set_date_range('yearly')} className={'button-radio-checkbox btn-sm ' + (this.state.date_range == 'yearly' ? 'btn-success' : '')} >Last Month</Button>
                    </ButtonGroup>
                  </div>
                </div>
              </div> */}
                <div className="form-group row">
                  <div className="col-lg-6">
                    {/* <select ref={this.selectedCustomer} className="form-control" value={this.state.selected_customer} onChange={this.onCustomerChanged}>
                      <option value={0}>Select Customer</option>
                      {this.state.customer.map((element, i) => {
                        return (<option key={i} value={element.int_cust_id}>{element.customer_name}</option>)
                      })}
                    </select> */
                    }
                    <FormSelect mode={"single"}   //mode : (single/multiple)
                      value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                      label={"my_drivers_5"}
                      list={this.state.fleet.map((element, i) => {
                        return { key: i, value: element.id, text: element.fleet_name }
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
                </div>
              </div>

              <div style={{ marginTop: 5 }} className="panel">
                <div className="panel-body">

                  <Table
                    dataSource={this.state.driver}
                    mode={"offline"}
                    //serversideSource={'https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders'}
                    table_id={4}
                    user_id={this.props.dataLogin.userId} //9999 20
                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    column={[
                      {
                        column_name: 'prefix',
                        column_caption: "my_drivers_11"
                      }, {
                        column_name: 'firstname',
                        column_caption: "my_drivers_12"
                      }, {
                        column_name: 'lastname',
                        column_caption: "my_drivers_13"
                      },
                      // {
                      //   column_name: 'driver_license_No',
                      //   column_caption: "my_drivers_14"
                      // },
                      {
                        column_name: 'driver_license_type',
                        column_caption: "my_drivers_15"
                      }, {
                        column_name: 'expire_date',
                        column_caption: "my_drivers_16",
                        column_render: (e) => moment(e.value).format('DD/MM/YYYY')
                      },
                      {
                        column_name: 'E_Mail',
                        column_caption: "my_drivers_17",
                        visible: false
                      },
                      {
                        column_name: 'Contact_No',
                        column_caption: "my_drivers_18",
                        visible: false
                      },
                      {
                        column_name: 'Line ID',
                        column_caption: "my_drivers_19",
                        visible: false
                      },
                      {
                        column_name: 'working_day',
                        column_caption: "my_drivers_20",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        }
                      },
                      {
                        column_name: 'working_hours_per_day',
                        column_caption: "my_drivers_21",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          var num = data.value;
                          var hours = (num / 60);
                          var rhours = Math.floor(hours);
                          var minutes = (hours - rhours) * 60;
                          var rminutes = Math.round(minutes);
                          if (rminutes / 10 < 1) {
                            rminutes = '0' + rminutes
                          }
                          return (<div>{rhours + ":" + rminutes + ""}</div>)
                        }
                      },
                      {
                        column_name: 'trip_count',
                        column_caption: "my_drivers_22"
                      },
                      {
                        column_name: 'driven',
                        column_caption: "my_drivers_23",
                        visible: true,
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          return (<div>{data.value.toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        }
                      },
                      {
                        column_name: 'fuel_usage',
                        column_caption: "my_drivers_24",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          return (<div>{data.value.toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        }
                      }, {
                        column_name: 'fuel_consumption',
                        column_caption: "my_drivers_25",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          return (<div>{data.value.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        }
                      },
                      {
                        column_name: 'Sharp_Fuel_Drop',
                        column_caption: "my_drivers_26",
                        visible: false
                      },
                      {
                        column_name: 'max_speed',
                        column_caption: "my_drivers_27"
                      }, {
                        column_name: 'idling',
                        column_caption: "my_drivers_28",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          return (<div>{(data.value / 60).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        }
                      }, {
                        column_name: 'dlt_over4',
                        column_caption: "my_drivers_29"
                      }, {
                        column_name: 'dlt_over8',
                        column_caption: "my_drivers_30"
                      },
                      {
                        column_name: 'dlt_overspeed',
                        column_caption: "my_drivers_31"
                      },
                      {
                        column_name: 'speed_over_60',
                        column_caption: "my_vehicles_43"
                      },
                      {
                        column_name: 'speed_over_80',
                        column_caption: "my_vehicles_44"
                      },
                      {
                        column_name: 'speed_over_100',
                        column_caption: "my_vehicles_45"
                      },
                      {
                        column_name: 'speed_over_120',
                        column_caption: "my_vehicles_46"
                      },
                      {
                        column_name: 'over_rpm_count',
                        column_caption: "my_drivers_45",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }

                          return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        }
                      },
                      {
                        column_name: 'over_rpm',
                        column_caption: "my_drivers_36",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          var num = data.value;
                          var hours = (num / 60);
                          var rhours = Math.floor(hours);
                          var minutes = (hours - rhours) * 60;
                          var rminutes = Math.round(minutes);
                          return (<div>{(rhours).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "." + rminutes}</div>)
                        }

                      },
                      {
                        column_name: 'harsh_start',
                        column_caption: "my_drivers_37",

                      }, {
                        column_name: 'harsh_acceleration',
                        column_caption: "my_drivers_38"
                      }, {
                        column_name: 'harsh_break',
                        column_caption: "my_drivers_39",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          return (<div>{(data.value).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        }
                      },
                      {
                        column_name: 'sharp_turn',
                        column_caption: "my_drivers_40"
                      },
                      {
                        column_name: 'fleet_ranking',
                        column_caption: "my_drivers_41"
                      },
                      {

                        column_name: 'safety_score',
                        column_caption: "my_drivers_43",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          return (<div>{parseInt(data.value)}</div>)
                          //return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        },
                      },

                      {
                        column_name: 'eco_score',
                        column_caption: "my_drivers_42",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          return (<div>{parseInt(data.value)}</div>)
                          // return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        }
                      },

                      {
                        column_name: 'total_score',
                        column_caption: "my_drivers_44",
                        column_render: (data) => {
                          if (data.value == "N/A") {
                            return (<div>{data.value}</div>)
                          }
                          if (data.value == 0) {
                            return (<div>{"N/A"}</div>)
                          }
                          return (<div>{parseInt(data.value)}</div>)
                          //  return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                        }
                      },



                    ]}
                  >

                  </Table>

                </div>
              </div>

            </div>

          </div>
        </div>
      </Suspense>
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
    lstDriverTable: state.analysisReport.lstDriverTable
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStateReduxAnalysisReport: (objState) => dispatch(AnalysisReportActions.setStateReduxAnalysisReport(objState)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Reportecotree))
