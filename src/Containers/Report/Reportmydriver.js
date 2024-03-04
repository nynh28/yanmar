import React, { Suspense } from 'react'
// import $ from "jquery";
import { SelectBox } from 'devextreme-react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './table.css';
import { connect } from 'react-redux'
import Table from '../../Components/DataGridView/TableMyDriver.js';
import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import TimePicker from 'react-bootstrap-time-picker';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'
import FormDatePicker_dev from '../../Components/FormControls/FormDatepickerNew';
import { t } from '../../Components/Translation';
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../Config/app-config';
import Alert from '../../Components/Alert'
function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

class ReportMydriver extends React.Component {
  constructor(props) {
    super(props)
    this.selectedDealer = React.createRef();
    this.selectedCustomer = React.createRef();
    this.selectedFleet = React.createRef();
    this.handleDateStartChange = this.handleDateStartChange.bind(this);
    this.handleTimeStartChange = this.handleTimeStartChange.bind(this);
    this.handleDateEndChange = this.handleDateEndChange.bind(this);
    this.handleTimeEndChange = this.handleTimeEndChange.bind(this);
    const nowDate = new Date((new Date()).setHours(0, 0, 0, 0))

    this.select_report_filter = this.select_report_filter.bind(this)
    this.tableInitial = this.tableInitial.bind(this)
    this.selectedCallback = this.selectedCallback.bind(this)
    this.loadcustomer = this.loadcustomer.bind(this)
    this.state = {
      isLoading: true,
      dealer: [],
      customer: [],
      driver: [],
      selected_dealer: "Please select dealer name",
      selected_customer: t("my_drivers_4"),
      start_date: moment().startOf('month'),
      end_date: moment().subtract(1, 'days'),
      start_date_timestamp: moment().startOf('month').unix(),
      end_date_timestamp: moment().subtract(1, 'days').unix(),
      alertSetting: {
        show: true,
        type: 5
      }

    };
    this.onDealerChanged = this.onDealerChanged.bind(this);
    this.onCustomerChanged = this.onCustomerChanged.bind(this);
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
    responseJson.length > 0 && this.onDealerChanged(responseJson[0].partner_id)
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
    if (responseJson.length > 0) {
      this.onCustomerChanged(responseJson[0].int_cust_id)
      this.setState({
        customer: responseJson
      }, () => {

      })
    }
    else {
      this.setState({ isLoading: false })
    }

  }

  async loaddealer() {
    // var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getDealer"
    var api = ENDPOINT_BASE_URL + "fleet/getDealer"
    var response = await fetch(api, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }

    });
    var responseJson = await response.json();
    responseJson.length > 0 && this.onCustomerChanged(responseJson[0].partner_id)
    this.setState({
      dealer: responseJson
    }, () => {

    })
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

    })
  }

  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData;

  }
  tableInitial(datagridinstance) {
    this.datagridinstance = datagridinstance
  }
  onDealerChanged(e) {
    this.setState({
      selected_dealer: e,
      customer: [],
      selected_customer: "Please select customer name"
    }, () => {
      this.loadcustomer()
      this.loaddriver()
    });
  }

  onCustomerChanged(e) {
    this.setState({
      selected_customer: e,
    }, () => {
      this.loaddriver()
    });
  }

  async loaddriver() {
    var userId = this.props.dataLogin.userId;
    var dealer_id = this.state.selected_dealer;
    var customer_id = this.state.selected_customer;
    var start_date = this.state.start_date_timestamp;
    var end_date = this.state.end_date_timestamp;
    var api = ENDPOINT_SETTING_REPORT_BASE_URL + "dodeepapi/getdriver"
    var object = {
      dealer_id: (dealer_id == "Please select dealer name") ? null : dealer_id,
      customer_id: (customer_id == "Please select customer name") ? null : customer_id,
      start_date: start_date,
      end_date: end_date,
      // userId: userId
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
      driver: responseJson,
      isLoading: false
    })
  }
  select_report_filter(key) {
    this.state.new_report.forEach((element, i) => {
      element.items.forEach((subelement, i) => {

        if (key == subelement.key) {

          return (<span>{subelement.value}</span>)
        }
      })
    })
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

  onApplyEvent(dataObject) {
    // console.log("## ", dataObject)

    // console.log("startDate : ", dataObject.startDate.format('YYYY/MM/DD'))
    // console.log("endDate : ", dataObject.endDate.format('YYYY/MM/DD'))
    // console.log("dataObject.startDate.unix() : ", dataObject.startDate.unix())
    // console.log("dataObject.endDate.unix() : ", dataObject.endDate.unix())
    this.setState({
      start_date: dataObject.startDate.format('YYYY/MM/DD'),
      end_date: dataObject.endDate.format('YYYY/MM/DD'),
      start_date_timestamp: dataObject.startDate.unix(),
      end_date_timestamp: dataObject.endDate.unix()
    }, () => {
      this.loaddriver()
    })
  }

  render() {

    let { alertSetting } = this.state
    if (this.state.isLoading == true) {
      return (
        <Alert
          setting={alertSetting}
          onConfirm={() => { }}
          onCancel={() => {
            alertSetting.show = false
            this.setState({ alertSetting })
          }}
        />
      )
    }
    else
      return (
        <Suspense fallback={null}>
          <div>

            <div className="row">
              <div className="col-lg-12">
                <div className="ibox ">
                  <div className="ibox-title" style={{ padding: '15px 20px 10px 15px' }}>
                    <div className="row">
                      <div className="col-lg-4">
                        <h3 style={{ fontSize: 18 }}>{t("my_drivers")}</h3>
                      </div>

                    </div>
                  </div>
                  <div className="ibox-content" style={{ padding: '15px 20px 5px 20px' }}>
                    {this.dealer_mode == true && (
                      <div className="form-group row">
                        <div className="col-lg-6">
                          {/* <select ref={this.selectedDealer} className="form-control" onChange={this.onDealerChanged} value={this.state.selected_dealer} >
                        <option value={0}>Select Dealer</option>
                        {this.state.dealer.map((element, i) => {
                          return (<option key={i} value={element.int_dealer_id}>{element.dealer_name}</option>)
                        })}
                      </select> */}
                          <FormSelect mode={"single"}   //mode : (single/multiple)
                            value={this.state.selected_dealer}  //single = "key" , multiple = [key]
                            label={"Dealer Name"}
                            list={this.state.dealer.map((element, i) => {

                              return { key: i, value: element.partner_id, text: ((element.prefix == null) ? '' : element.prefix) + ' ' + ((element.firstname == null) ? '' : element.firstname) + ' ' + ((element.lastname == null) ? '' : element.lastname) + ' ' + ((element.suffix == null) ? '' : element.suffix) }
                            })}
                            placeholder={"Dealer Name"}
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
                          <FormSelect mode={"single"}   //mode : (single/multiple)
                            value={this.state.selected_customer}  //single = "key" , multiple = [key]
                            label={"my_drivers_2"}
                            list={this.state.customer.map((element, i) => {

                              return { key: i, value: element.partner_id, text: element.prefix + " " + ((element.firstname == null) ? '' : element.firstname) + " " + ((element.lastname == null) ? '' : element.lastname) + "  " + ((element.suffix == null ? '' : element.suffix)) }
                            })}
                            placeholder={"Customer Name"}
                            flex={1}
                            onChange={(selected) => {

                              this.setState({
                                selected_customer: selected
                              })
                              this.onCustomerChanged(selected)
                            }}>
                          </FormSelect>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                            <label className="control-label" style={{ fontWeight: 500 }}>
                              {t('date_Range')} :
                             </label>
                            <FormDatePicker_dev select_change={this.onApplyEvent.bind(this)}>
                            </FormDatePicker_dev>
                          </div>
                        </div>
                      </div>
                    )}

                    {this.customer_mode == true && (
                      <div className="form-group row">
                        <div className="col-lg-6">
                          <FormSelect mode={"single"}   //mode : (single/multiple)
                            value={this.state.selected_customer}  //single = "key" , multiple = [key]
                            label={"my_drivers_2"}
                            list={this.state.customer.map((element, i) => {

                              return { key: i, value: element.int_cust_id, text: element.customer_name }
                            })}
                            placeholder={"Customer Name"}
                            flex={1}
                            onChange={(selected) => {

                              this.setState({
                                selected_customer: selected
                              })
                              this.onCustomerChanged(selected)
                            }}>
                          </FormSelect>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                            <label className="control-label" style={{ fontWeight: 500 }}>
                              {t('date_Range')} :
                             </label>
                            <FormDatePicker_dev select_change={this.onApplyEvent.bind(this)}>
                            </FormDatePicker_dev>
                          </div>
                        </div>
                      </div>
                    )}
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
                            column_caption: "my_drivers_16"
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
                              if (data.value == "N/A" || data.value == null) {
                                return (<div>{data.value}</div>)
                              }
                              return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                            }
                          },
                          {
                            column_name: 'working_hours_per_day',
                            column_caption: "my_drivers_21",
                            column_render: (data) => {
                              if (data.value == "N/A" || data.value == null) {
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
                              if (data.value == "N/A" || data.value == null) {
                                return (<div>{data.value}</div>)
                              }
                              return (<div>{data.value.toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                            }
                          },
                          {
                            column_name: 'fuel_usage',
                            column_caption: "my_drivers_24",
                            column_render: (data) => {
                              if (data.value == "N/A" || data.value == null) {
                                return (<div>{data.value}</div>)
                              }
                              return (<div>{data.value.toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                            }
                          }, {
                            column_name: 'fuel_consumption',
                            column_caption: "my_drivers_25",
                            column_render: (data) => {
                              if (data.value == "N/A" || data.value == null) {
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
                              if (data.value == "N/A" || data.value == null) {
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
                              // console.log(data)
                              if (data.value == "N/A" || data.value == null) {
                                return (<div>{data.value}</div>)
                              }

                              return (<div>{data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>)
                            }
                          },
                          {
                            column_name: 'over_rpm',
                            column_caption: "my_drivers_36",
                            column_render: (data) => {
                              if (data.value == "N/A" || data.value == null) {
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
                              if (data.value == "N/A" || data.value == null) {
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
                              if (data.value == "N/A" || data.value == null) {
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
                              if (data.value == "N/A" || data.value == null) {
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
                              if (data.value == "N/A" || data.value == null) {
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

          </div >
        </Suspense >
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

export default (connect(mapStateToProps, mapDispatchToProps)(ReportMydriver))
