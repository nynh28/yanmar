import React, { Component, Suspense } from 'react';
import Table from '../../Components/DataGridView/Table.js'
import Swal from 'sweetalert2'
import { connect } from 'react-redux'
import FormSelect from '../../Components/FormControls/Basic/FormSelect'
import AnalysisReportActions from '../../Redux/AnalysisReportRedux'
import moment from 'moment'
import { ButtonGroup, Button } from 'reactstrap'
import FormDatePicker_dev from '../../Components/FormControls/FormDatepickerNew';
import { t } from '../../Components/Translation'
import Alert from '../../Components/Alert'
import { get, isEmpty } from 'lodash'
import { ENDPOINT_BASE_URL, ENDPOINT_SETTING_REPORT_BASE_URL } from '../../Config/app-config';

class DataTable extends Component {
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
      // start_date: moment().startOf('month'),
      // end_date: moment().subtract(1, 'days'),
      // // start_date: moment().day(-2).format('DD/MM/YYYY'),
      // // end_date: moment().day(-1).format('DD/MM/YYYY'),
      // start_date_timestamp: moment().startOf('month').unix(),
      // end_date_timestamp: moment().subtract(1, 'days').unix(),
      alertSetting: {
        show: false,
        type: 2,
        content: "",
        validateCode: false
      },
      // start_date_timestamp: 0,
      // end_date_timestamp: 0
    }

    this.selectedCallback = this.selectedCallback.bind(this)

  }

  componentWillMount() {
    let { headerData, lstDriverTable } = this.props
    if (headerData, lstDriverTable) {
      let text = this.getTextHeader(headerData)
      if (text) {
        this.headerCustom = {
          list: [
            { text, merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
          ]
        }
      }

    }
  }

  shouldComponentUpdate(prevProps) {
    if (prevProps.lstDriverTable != this.props.lstDriverTable) {
      let text = this.getTextHeader(prevProps.headerData)
      if (text) {
        this.headerCustom = {
          list: [
            { text, merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
          ]
        }
      }
      return true
    }
    else
      return false
  }

  getTextHeader(headerData) {

    if (headerData) {
      let text = []

      if (headerData.dealer_name) text.push(t('export_1'), ' : ', headerData.dealer_name, ', ')
      if (headerData.customer_name) text.push(t('export_2'), ' : ', headerData.customer_name, ', ')
      if (headerData.fleet_name) text.push(t('export_3'), ' : ', headerData.fleet_name, ', ')
      text.push(t('export_4'), ' : ',
        moment(get(headerData, 'start_date'), "YYYY-MM-DD").format("DD/MM/YYYY"),
        ' ', t('export_5'), ' ',
        moment(get(headerData, 'stop_date'), "YYYY-MM-DD").format("DD/MM/YYYY"))

      return text
    }

  }

  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData
    this.props.selectedCallback(e)
  }


  render() {
    let { lstDriverTable, dataLogin } = this.props
    let { alertSetting } = this.state

    let column = [
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
      }
    ]


    if (this.props.isDealer) {
      column.unshift({
        column_name: 'customer_name',
        column_caption: "other_reports_127"
      })
    }

    return (
      <Suspense fallback={null}>
        <Table
          dataSource={lstDriverTable ? [...lstDriverTable] : []}
          mode={"offline"}
          table_id={4}
          headerCustom={this.headerCustom}
          cookiesOptions={{
            enable: true,
            name: "AnalysisReport"
          }}
          user_id={dataLogin.userId} //9999 20
          selectedCallback={this.selectedCallback}
          // initialCallback={this.tableInitial}
          column={column}
        >

        </Table>
      </Suspense>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    dataLogin: state.signin.dataLogin,
    lstDriverTable: state.analysisReport.lstDriverTable,
    headerData: state.analysisReport.headerData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // setStateReduxAnalysisReport: (objState) => dispatch(AnalysisReportActions.setStateReduxAnalysisReport(objState)),
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(DataTable))
