import React, { Suspense } from 'react'
// import $ from "jquery";
import { SelectBox } from 'devextreme-react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../table.css'
import { connect } from 'react-redux'
import Table from '../../../Components/DataGridView/Table';
import FormSelect from '../../../Components/FormControls/Basic/FormSelect'
import TimePicker from 'react-bootstrap-time-picker';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import DataGrid, { Column, Selection, Export, ColumnChooser, SearchPanel, Paging, Pager, Grouping, GroupPanel, Summary, GroupItem, FilterRow, HeaderFilter } from 'devextreme-react/data-grid';
import { ENDPOINT_BASE_URL } from '../../../Config/app-config';
class Fuel extends React.Component {
  constructor(props) {
    super(props)
    this.selectedDealer = React.createRef();
    this.selectedCustomer = React.createRef();
    this.selectedFleet = React.createRef();

    this.select_report_filter = this.select_report_filter.bind(this)
    this.tableInitial = this.tableInitial.bind(this)
    this.selectedCallback = this.selectedCallback.bind(this)
    this.loadcustomer = this.loadcustomer.bind(this)
    this.loadfleet = this.loadfleet.bind(this);

    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    const nowDate = new Date((new Date()).setHours(0, 0, 0, 0))
    this.state = {
      dealer: [],
      customer: [],
      fleet: [],
      data: [],
      selected_dealer: 'please select dealer name',
      selected_customer: 'please select company name',
      selected_fleet: 'please select fleet name',
      selected_vehicle: [],
      timeStart: 0,
      timeEnd: 85500,
      dateStart: nowDate,
      dateEnd: nowDate,
      strDataTime: { start: nowDate, end: (nowDate.getTime() + 85500000) },

    };
    this.loaddata()
    this.onDealerChanged = this.onDealerChanged.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
    this.onFleetChanged = this.onFleetChanged.bind(this);
    if (this.props.dataLogin.userLevelId > 40) {
      this.customer_mode = true
      this.load_manage_customer()

    } else {
      this.dealer_mode = true
      this.load_manage_dealer()
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
    this.setState({
      dealer: responseJson
    }, () => {

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
    this.setState({
      customer: responseJson
    }, () => {

    })
  }

  async loadcustomer() {
    var userId = this.props.dataLogin.userId
    var object = {
      userId: userId,
      dealer_id: this.state.selected_dealer
    }
    //console.log(object);
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
    //console.log(responseJson);
    this.setState({
      customer: responseJson
    }, () => {

    })
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
    //console.log(responseJson);
    this.setState({
      fleet: responseJson
    }, () => {

    })
  }

  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData;

  }
  tableInitial(datagridinstance) {
    this.datagridinstance = datagridinstance
  }
  onDealerChanged(e) {
    //console.log(e)
    this.setState({
      selected_dealer: e,
      customer: [],
      selected_customer: 'please select company name'
    }, () => {
      this.loadcustomer()
      this.loadvehicle()
    });
  }

  onCustomerChanged(e) {
    this.setState({
      selected_customer: e,
      fleet: [],
      selected_fleet: 'please select fleet name'
    }, () => {
      this.loadfleet()
      this.loadvehicle()
    });
  }

  onFleetChanged(e) {
    this.setState({
      selected_fleet: e,
    }, () => {
      this.loadvehicle()
    });
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
    //console.log(timeEnd)
    this.setState({ timeEnd });
  }














  async loaddata() {
    var api = ENDPOINT_BASE_URL + "fleet/report/driving"
    var object = {
      vid_list: [196309],
      dtstart: "2020-04-28 07:00:00",
      dtstop: "2020-05-05 07:59:59",
      fleet_id: 0,
      cust_id: 1
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
    //console.log(responseJson);
    this.setState({
      data: responseJson.result
    }, () => {
      this.setState({
        loading: false
      })
    })
    //console.log(this.state.vehicle);
  }
  select_report_filter(key) {
    this.state.new_report.forEach((element, i) => {
      element.items.forEach((subelement, i) => {
        //console.log(key == subelement.key);
        if (key == subelement.key) {
          //console.log('wow')
          return (<span>{subelement.value}</span>)
        }
      })
    })
  }

  render() {
    // var column = [
    //   {
    //     column_name: 'license_plate_no',
    //     column_caption: 'ป้ายทะเบียน'
    //   },
    //   {
    //     column_name: 'vin_no',
    //     column_caption: 'หมายเลขรถ'
    //   }
    // ]
    return (
      <Suspense fallback={null}>
        <div>

          <div className="row">
            <div className="col-lg-12">
              <div className="ibox ">
                <div className="ibox-content" style={{ padding: '15px 20px 5px 20px' }}>
                  {this.dealer_mode == true && (
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <FormSelect mode={"single"}  //mode : (single/multiple)
                          value={this.state.selected_dealer}  //single = "key" , multiple = [key]
                          label={"Dealer name"}
                          fontSize={16}
                          list={this.state.dealer.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.partner_id, text: ((element.prefix == null) ? '' : element.prefix) + ' ' + ((element.firstname == null) ? '' : element.firstname) + ' ' + ((element.lastname == null) ? '' : element.lastname) + ' ' + ((element.suffix == null) ? '' : element.suffix) }
                          })}
                          placeholder={"Dealer name"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
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
                          label={"Company name"}
                          list={this.state.customer.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.int_cust_id, text: element.customer_name }
                          })}
                          placeholder={"Company name"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
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
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <FormSelect mode={"single"}   //mode : (single/multiple)
                          value={this.state.selected_customer}  //single = "key" , multiple = [key]
                          label={"Company Name"}
                          list={this.state.customer.map((element, i) => {
                            //console.log(element)
                            return { key: i, value: element.int_cust_id, text: element.customer_name }
                          })}
                          placeholder={"Company Name"}
                          flex={1}
                          onChange={(selected) => {
                            //console.log(selected)
                            this.setState({
                              selected_customer: selected
                            })
                            this.onCustomerChanged(selected)
                          }}>
                        </FormSelect>
                      </div>
                      <div className="col-lg-6">
                        <label className="col-lg-6 col-form-label">From</label>
                        <label className="col-lg-6 col-form-label">To</label>
                      </div>
                      <div className="col-lg-6">
                        <div className="col-lg-6" >
                          {/* <input ref={this.DateForm} onChange={this.Formdate} className="form-control" type="date"></input> */}
                          <DateRangePicker
                            autoUpdateInput={false}
                            startDate={this.state.dateStart}
                            locale={{ format: "YYYY-MM-DD" }}
                            singleDatePicker
                            onEvent={this.handleDateStartChange}
                          //
                          >
                            <input className="form-control input-sm"
                              type="text"
                              value={moment(this.state.dateStart).format("YYYY-MM-DD")}
                            />
                          </DateRangePicker>
                        </div>
                        <div className="col-lg-6" >
                          <DateRangePicker
                            // autoUpdateInput={false}
                            startDate={this.state.dateEnd}
                            locale={{ format: "YYYY-MM-DD" }}
                            singleDatePicker
                            onEvent={this.handleDateEndChange}
                            // maxDate={moment(this.state.dateStart).add(1, 'month').calendar()}
                            minDate={this.state.dateStart}
                            // maxDate={moment(this.state.dateStart).add(1, 'day')}
                            containerStyles={{ display: 'none' }}
                          >
                            <input className="form-control input-sm"
                              type="text"
                              value={moment(this.state.dateEnd).format("YYYY-MM-DD")}
                            />
                          </DateRangePicker>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="form-group row">
                    <div className="col-lg-6">
                      {/* <select ref={this.selectedFleet} className="form-control" onChange={this.onFleetChanged} value={this.state.selected_fleet} >
                      <option value={0}>Select Fleet</option>
                      {this.state.fleet.map((element, i) => {
                        return (<option key={i} value={element.id}>{element.fleet_name}</option>)
                      })}
                    </select> */}

                      <FormSelect mode={"single"}   //mode : (single/multiple)
                        value={this.state.selected_fleet}  //single = "key" , multiple = [key]
                        label={" Fleet Name"}
                        list={this.state.fleet.map((element, i) => {
                          //console.log(element)
                          return { key: i, value: element.id, text: element.fleet_name }
                        })}
                        placeholder={"Fleet ame"}
                        flex={1}
                        onChange={(selected) => {
                          //console.log(selected)
                          this.setState({
                            selected_fleet: selected
                          })
                          this.onFleetChanged(selected)
                        }}>
                      </FormSelect>
                    </div>

                  </div>
                </div>
                <div style={{ marginTop: 5 }} className="panel">
                  <div className="panel-body">
                    <Table
                      dataSource={this.state.data}
                      mode={"offline"}
                      table_id={4}
                      user_id={this.props.dataLogin.userId} //9999 20
                      selectedCallback={this.selectedCallback}
                      initialCallback={this.tableInitial}

                    >

                    </Table>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div >
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // request_signin: state.auth.request_signin,
    dataLogin: state.signin.dataLogin,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // signin: (email, password) => dispatch(AuthActions.signin(email, password)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Fuel))
