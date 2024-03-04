import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Table from '../../Components/DataGridView/Table.js'
import Loading from './Loading'
import { get, isEmpty } from 'lodash'
import { t } from "../../Components/Translation";
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import MyDriverActions from '../../Redux/MyDriversRedux'
import { Switch } from 'antd';
import moment from 'moment'
import CompetModal from './CompetModal'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class DataTable extends Component {

  componentWillMount() {
    let { headerData, driverData } = this.props

    if (headerData, driverData) {
      let text = this.getTextHeader(headerData)
      if (text) {
        this.headerCustom = {
          list: [
            { text, merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
          ]
        }
      }

    }

    this.props.setValue("ShowPopCompet", { id: null, show: false })
  }

  shouldComponentUpdate(prevProps) {
    if (prevProps.driverData != this.props.driverData) {
      let text = this.getTextHeader(prevProps.headerData)
      if (text) {
        this.headerCustom = {
          list: [
            { text, merge_cell: true, font: { size: 12 }, alignment: { vertical: 'middle' }, height: 30 },
          ]
        }
      }

      // return false
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

  async updateCompetition(id, value, vehicle_id = 0) {
    let { dataLogin, language } = this.props

    let response = await fetch(ENDPOINT_BASE_URL + "fleet/setting/driver/competition/" + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
      body: JSON.stringify({
        "user_id": dataLogin.userId,
        "competition": value,
        "vehicle_id": vehicle_id
      })
    })

    if (response.status === 201)
      this.updateDataStore(id, value)
    else
      this.updateDataStore(id, !value)

  }

  updateDataStore(id, isCompet) {
    let { dataSource, dataStore, driverData } = this.props
    dataStore.push([{
      type: 'update',
      key: id,
      data: { competition: isCompet }
    }])

    console.log("dataSource : ", dataSource)

    dataSource.reload()
    let _driverData = JSON.parse(JSON.stringify(driverData))
    let idx = _driverData.findIndex((item) => item.id === id)
    if (_driverData[idx]) {
      _driverData[idx].competition = isCompet
      this.props.setStateReduxMyDrivers({ driverData: _driverData })
    }
  }

  render() {

    let column = [
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
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          return data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
      },
      {
        column_name: 'working_hours_per_day',
        column_caption: "my_drivers_21",
        column_render: (data) => {
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
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
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          return data.value.toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
      },
      {
        column_name: 'fuel_usage',
        column_caption: "my_drivers_24",
        column_render: (data) => {
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          return data.value.toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
      }, {
        column_name: 'fuel_consumption',
        column_caption: "my_drivers_25",
        column_render: (data) => {
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          return data.value.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          return (data.value / 60).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          return data.value.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
      },
      {
        column_name: 'over_rpm',
        column_caption: "my_drivers_36",
        column_render: (data) => {
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          var num = data.value;
          var hours = (num / 60);
          var rhours = Math.floor(hours);
          var minutes = (hours - rhours) * 60;
          var rminutes = Math.round(minutes);
          return (rhours).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + "." + rminutes
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
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          return (data.value).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
      },
      {
        column_name: 'sharp_turn',
        column_caption: "my_drivers_40"
      },
      {
        column_name: 'fleet_ranking',
        column_caption: "my_drivers_46"
      },
      {
        column_name: 'ranking',
        column_caption: "my_drivers_41"
      },
      {

        column_name: 'safety_score',
        column_caption: "my_drivers_43",
        column_render: (data) => {
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          return parseInt(data.value)
        },
      },
      {
        column_name: 'eco_score',
        column_caption: "my_drivers_42",
        column_render: (data) => {
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          return parseInt(data.value)
        }
      },
      {
        column_name: 'total_score',
        column_caption: "my_drivers_44",
        column_render: (data) => {
          if (data.value == "N/A" || data.value == null || typeof data.value !== 'number') {
            return (<div>{data.value}</div>)
          }
          if (data.value == 0) {
            return (<div>{"N/A"}</div>)
          }
          return parseInt(data.value)
        }
      },
      {
        column_name: 'grade',
        column_caption: "my_drivers_47"
      }
    ]

    if (this.props.isDealer) {
      column.unshift(
        {
          column_name: 'customer_name',
          column_caption: "other_reports_127"
        },
        {
          column_name: 'prefix',
          column_caption: "my_drivers_11"
        },
        {
          column_name: 'firstname',
          column_caption: "my_drivers_12"
        },
        {
          column_name: 'lastname',
          column_caption: "my_drivers_13"
        },
        {
          column_name: 'personal_id',
          column_caption: "my_drivers_53"
        },
        {
          column_name: 'telephone_no',
          column_caption: "my_drivers_48"
        },
        {
          column_name: 'driver_license_type',
          column_caption: "my_drivers_15"
        },
        {
          column_name: 'expire_date',
          column_caption: "my_drivers_16",
          column_render: (e) => {
            if (!isEmpty(e.value))
              return moment(e.value).format('DD/MM/YYYY')
            else
              return ""
          }
        },
        {
          column_name: 'vehicle_name',
          column_caption: "my_drivers_49",
          column_render: (e) => {
            let vehicleName = get(e.data, 'vehicle_name')
            if (vehicleName == "") vehicleName = get(e.data, 'licenseplate')
            if (vehicleName == "") vehicleName = get(e.data, 'vin_no')
            return vehicleName
          }
        }
      )
    }
    else {
      column.unshift(
        {
          column_name: 'prefix',
          column_caption: "my_drivers_11"
        },
        {
          column_name: 'firstname',
          column_caption: "my_drivers_12"
        },
        {
          column_name: 'lastname',
          column_caption: "my_drivers_13"
        },
        {
          column_name: 'personal_id',
          column_caption: "my_drivers_53"
        },
        {
          column_name: 'driver_license_type',
          column_caption: "my_drivers_15"
        },
        {
          column_name: 'expire_date',
          column_caption: "my_drivers_16",
          column_render: (e) => {
            if (!isEmpty(e.value))
              return moment(e.value).format('DD/MM/YYYY')
            else
              return ""
          }
        }
      )
    }
    if (this.props.isHino) {
      column.unshift({
        column_name: 'competition',
        column_caption: "my_drivers_50",
        column_render: (e) => {
          return (<center>
            <Switch
              checkedChildren={t('my_drivers_52')}
              unCheckedChildren={t('my_drivers_51')}
              defaultChecked={e.value}
              onClick={(checked) => {
                if (checked)
                  this.props.setValue("ShowPopCompet", { id: e.data.id, show: true })
                else
                  this.updateCompetition(e.data.id, checked)
              }}
            />
          </center>)
        }
      })
    }

    return (
      <Suspense fallback={null}>
        <Loading />
        <CompetModal
          onSubmit={(id, vehicle_id) => this.updateCompetition(id, true, vehicle_id)}
          onCancle={(id) => this.updateDataStore(id, false)}
        />
        <Table
          mode={"offline"}
          // dataSource={this.props.driverData ? [...this.props.driverData] : []}
          dataSource={this.props.dataSource}
          table_id={8}
          user_id={this.props.dataLogin.userId}
          editing={{ enabled: false }}
          headerCustom={this.headerCustom}
          cookiesOptions={{
            enable: true,
            name: "MyDrivers"
          }}
          // columnCount={this.props.isDealer ? "customer_name" : this.props.isHino ? "competition" : "prefix"}
          column={column}
        />
      </Suspense >
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  driverData: state.myDrivers.driverData,
  headerData: state.myDrivers.headerData
});

const mapDispatchToProps = (dispatch) => ({
  setStateReduxMyDrivers: (object) => dispatch(MyDriverActions.setStateReduxMyDrivers(object)),
  setValue: (name, value) => dispatch(MyDriverActions.setValue(name, value)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTable))
