import React, { Suspense } from 'react'
// import $ from "jquery";
import { SelectBox } from 'devextreme-react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import '../table.css'
import { connect } from 'react-redux'
import Table from '../../../Components/DataGridView/Table_Report';
import FormSelect from '../../../Components/FormControls/Basic/FormSelect'
import TimePicker from 'react-bootstrap-time-picker';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment'

import Alert from '../../../Components/Alert'

import DataGrid, { Column, Selection, Export, ColumnChooser, SearchPanel, Paging, Pager, Grouping, GroupPanel, Summary, GroupItem, FilterRow, HeaderFilter, Button, Editing } from 'devextreme-react/data-grid';
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../../Config/app-config';
// import DataSource from 'devextreme/data/data_source';
// const dataSource = new DataSource({
//   store: productsStore,
//   reshapeOnPush: true
// });

class DrivingSummaryOL extends React.Component {
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
      isLoading: true,
      alertSetting: {
        show: true,
        type: 5
      },
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
      editing: {
        enabled: true,
        allowUpdating: true,
        allowDeleting: true
      },
      none_edit: { enabled: false }
      ,
      column: [
        {
          column_name: 'fleet_name',
          column_caption: 'Fleet Name'
        },

        {
          column_name: 'licenseplate',
          column_caption: 'License Plate'
        },
        // {
        //   column_name: 'overtime',
        //   column_caption: 'Over Time'
        // },
        {
          column_name: 'vehicle_name',
          column_caption: 'Vehicle Name'
        },
        {
          column_name: 'total_distance',
          column_caption: 'Total Distance(km)'
        },
        {
          column_name: 'total_time',
          column_caption: 'Total Time'
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'Fuel Consumption (km/L)'
        },
        {
          column_name: 'fuel_used',
          column_caption: 'Fuel Usege (L)'
        },
        {
          column_name: 'speed_max',
          column_caption: 'Max Speed (km/h)'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'Avg Speed (km/h)'
        },
        {
          column_name: 'speed_limit',
          column_caption: 'Speed Limit (km/h)'
        },

        {
          column_name: 'overspd_total',
          column_caption: 'OverSpeed Limit Count Policy'
        },
        {
          column_name: 'overspd_time',
          column_caption: 'Overspeed Total Time Policy'
        },
        {
          column_name: 'overspd_distance',
          column_caption: 'Overspeed Total Distance Policy (km)'
        },
        {
          column_name: 'dlt_overspd',
          column_caption: 'DLT Driving Over Speed'
        },
        {
          column_name: 'dlt_driving4h',
          column_caption: 'DLT Driving Over 4 H'
        },
        {
          column_name: 'dlt_driving8h',
          column_caption: 'DLT Driving Over 8 H'
        },
        {
          column_name: 'dlt_notswipe',
          column_caption: 'DLT Not Swipe Driver License Card'
        },
        {
          column_name: 'dlt_unmached',
          column_caption: 'DLT Unmached Driving License Type'
        },
        {
          column_name: 'dlt_unplug',
          column_caption: 'DLT GPS Unplugged'
        },
        {
          column_name: 'overspd_hino_1',
          column_caption: 'Hino Over Speed 60'
        },
        {
          column_name: 'overspd_hino_2',
          column_caption: 'Hino Over Speed 80'
        },
        {
          column_name: 'overspd_hino_3',
          column_caption: 'Hino Over Speed 100'
        }, {
          column_name: 'overspd_hino_4',
          column_caption: 'Hino Over Speed 120'
        },
        // {
        //   column_name: 'count',
        //   column_caption: 'Count'
        // }
      ],
      columndetail: [
        // {
        //   column_name: 'vid',
        //   column_caption: 'Vid'
        // },
        {
          column_name: 'dtstart',
          column_caption: 'Ign. On'
        },
        {
          column_name: 'dtstop',
          column_caption: 'Ign. Off'
        },

        {
          column_name: 'start_loc',
          column_caption: 'Start Location'
        },

        {
          column_name: 'stop_loc',
          column_caption: 'Stop Location'
        },

        {
          column_name: 'start_mileage',
          column_caption: 'Start Mileage (km)'
        },
        {
          column_name: 'stop_mileage',
          column_caption: 'Stop Mileage (km)'
        },
        {
          column_name: 'total_distance',
          column_caption: 'Total Distance (km)'
        },
        {
          column_name: 'total_time',
          column_caption: 'Total Time'
        },
        {
          column_name: 'fuel_cons',
          column_caption: 'Fuel Consumption (km/L)'
        },
        {
          column_name: 'fuel_used',
          column_caption: 'Fuel Used (L)'
        },
        {
          column_name: 'speed_max',
          column_caption: 'Max Speed (km/h)'
        },
        {
          column_name: 'speed_avg',
          column_caption: 'Avg Speed (km/h) '
        },
        {
          column_name: 'speed_limit',
          column_caption: 'Speed Limit (km/h)'
        },


      ],
      default_column: [],
      default_editing: {},
      start_date_dmy: "",
      end_date_dmy: "",
      cust_id: "",
      vid_list: []
    };

    //console.log(props)
    this.loaddata()
    this.loadfleet()
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


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.isLoading != true) {
      //console.log(nextProps)
      this.setState({
        isLoading: true,
        default_column: this.state.column,
        default_editing: this.state.editing
      }, () => {
        this.loaddata()
      })
    }


  }
  // shouldComponentUpdate
  async componentDidUpdate(prevProps, nextState) {
    let { data, start_date_dmy, end_date_dmy, cust_id, vid_list } = this.state
    if (nextState.data !== data) {
      //console.log(">> STATE CHANGE : ", this.state.data)

      for (let index in vid_list) {
        let vid = vid_list[index]
        var api = ENDPOINT_BASE_URL + "fleet/report/driving"

        var object = {
          vid_list: [vid],
          dtstart: start_date_dmy + " 00:00:00",
          dtstop: end_date_dmy + " 00:59:59",
          fleet_id: 0,
          cust_id
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

        for (let idx in data) {
          let vid = data[idx].vid
          //console.log("vid : ", vid)
          if (responseJson.result.length > 0) {
            //console.log("vid new : ", responseJson.result[0].vid)
            if (vid == responseJson.result[0].vid) {
              //console.log("UPDATE")
              data[idx] = responseJson.result[0]
              this.setState({ data })
            }
          }
        }

        //console.log("responseJson : ", responseJson)

      }
      //console.log("RESULT : ", this.state.data)


    }
  }



  async loaddata() {
    var cust_id = 0
    var start_date = this.props.startDate
    var start_date_y = start_date.split('/')[0]
    var start_date_m = start_date.split('/')[1]
    var start_date_d = start_date.split('/')[2]
    var start_date_dmy = start_date_y + '-' + start_date_m + '-' + start_date_d
    var end_date = this.props.endDate
    var end_date_y = end_date.split('/')[0]
    var end_date_m = end_date.split('/')[1]
    var end_date_d = end_date.split('/')[2]
    var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d
    this.props.customer_data.forEach((element) => {
      cust_id = element.int_cust_id
    })

    //console.log(cust_id)
    // var api = ENDPOINT_BASE_URL + "fleet/report/driving"
    var api = ENDPOINT_BASE_URL + "fleet/report/master/driving"

    var object = {
      vid_list: this.props.data,
      dtstart: start_date_dmy + " 00:00:00",
      dtstop: end_date_dmy + " 00:59:59",
      fleet_id: 0,
      cust_id: cust_id
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
      default_column: this.state.column,
      data: responseJson.result,
      default_editing: this.state.editing,
      start_date_dmy,
      end_date_dmy,
      cust_id,
      vid_list: this.props.data
    }, () => {
      this.setState({
        isLoading: false
      })
    })
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

  async loaddatadetail(id) {
    var api = ENDPOINT_BASE_URL + "fleet/report/driving/" + id
    var start_date = this.props.startDate
    var start_date_y = start_date.split('/')[0]
    var start_date_m = start_date.split('/')[1]
    var start_date_d = start_date.split('/')[2]
    var start_date_dmy = start_date_y + '-' + start_date_m + '-' + start_date_d
    var end_date = this.props.endDate
    var end_date_y = end_date.split('/')[0]
    var end_date_m = end_date.split('/')[1]
    var end_date_d = end_date.split('/')[2]
    var end_date_dmy = end_date_y + '-' + end_date_m + '-' + end_date_d
    var object = {
      dtstart: start_date_dmy + " 00:00:00",
      dtstop: end_date_dmy + " 23:59:00",
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
      //console.log('ss')
      this.setState({
        isLoading: false,
        default_column: this.state.columndetail,
        default_editing: this.state.none_edit
      })
    })
  }

  editCallback(e) {

    //console.log(e.row.data.vid)
    this.setState({
      isLoading: true
    }, () => {
      this.loaddatadetail(e.row.data.vid)
      this.props.ReportCallBack('Detail')
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
      //console.log(this.state.fleet)
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














  render() {
    let { fitObjectEnabled, GeofencesEnabled, objectEnabled, clusterEnabled, infoWindowEnabled, arrImg, arrImgActive, alertSetting } = this.state
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
                <div className="form-group row">
                  <Table
                    dataSource={this.state.data}
                    // dataSource={dataSource}
                    mode={"offline"}
                    table_id={4}
                    user_id={this.props.dataLogin.userId} //9999 20
                    editing={this.state.default_editing}

                    selectedCallback={this.selectedCallback}
                    initialCallback={this.tableInitial}
                    deleteCallback={(e) => this.deleteCallback(e)}
                    editCallback={(e) => this.editCallback(e)}
                    column={this.state.default_column}

                  >

                  </Table>
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

export default (connect(mapStateToProps, mapDispatchToProps)(DrivingSummaryOL))
