import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import DrivingCompetitionActions from '../../Redux/DrivingCompetitionRedux'
import Table from '../../Components/DataGridView/Table.js'
import Loading from './Loading'
import { t } from "../../Components/Translation";
import moment from 'moment'
import { numberWithComma } from '../../Functions/Calculation'

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.exportName = "TEST"
  }

  render() {
    let { dataSource } = this.props

    return (
      <Suspense fallback={null}>
        <Loading />
        <Table
          mode={"offline"}
          dataSource={dataSource}
          table_id={10}
          user_id={this.props.dataLogin.userId}
          editing={{ enabled: false }}
          headerCustom={this.headerCustom}
          showSetting={true}
          columnCount="driver_name"
          exportName={this.exportName}
          cookiesOptions={{
            enable: true,
            name: "DrivingCompet"
          }}
          column={[
            {
              column_name: 'driver_name',
              column_caption: 'driving_compet_2',
              fixed: true,
              fixedPosition: 'left',
            },
            {
              column_name: 'personal_id',
              column_caption: 'driving_compet_3'
            },
            {
              column_name: 'cust_name',
              column_caption: 'driving_compet_4'
            },
            {
              column_name: 'licenseplate',
              column_caption: 'driving_compet_5'
            },
            {
              column_name: 'vin_no',
              column_caption: 'driving_compet_6'
            },
            {
              column_name: 'model_code',
              column_caption: 'driving_compet_7'
            },
            {
              column_name: 'class_type_name',
              column_caption: 'driving_compet_8'
            },
            {
              column_name: 'dealer_name',
              column_caption: 'driving_compet_9'
            },
            {
              column_name: 'distance',
              column_caption: 'driving_compet_10',
              column_render: (data) => {
                return numberWithCommas(data.value.toFixed(1))
              }
            },
            {
              column_caption: 'driving_compet_11',
              subTable: [
                {
                  column_name: 'score_exceed_speed',
                  column_caption: 'driving_compet_12',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_exceed_rpm',
                  column_caption: 'driving_compet_13',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_harsh_start',
                  column_caption: 'driving_compet_14',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_harsh_acc',
                  column_caption: 'driving_compet_15',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_harsh_brake',
                  column_caption: 'driving_compet_16',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_sharp_turn',
                  column_caption: 'driving_compet_17',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'safety_score',
                  column_caption: 'driving_compet_18',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                }
              ]
            },
            {
              column_caption: 'driving_compet_19',
              subTable: [
                {
                  column_name: 'score_long_idling',
                  column_caption: 'driving_compet_20',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_exhaust',
                  column_caption: 'driving_compet_21',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_rpm_high',
                  column_caption: 'driving_compet_22',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_rpm_low',
                  column_caption: 'driving_compet_23',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_shift_up',
                  column_caption: 'driving_compet_24',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'score_shift_down',
                  column_caption: 'driving_compet_25',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                },
                {
                  column_name: 'eco_score',
                  column_caption: 'driving_compet_26',
                  column_render: (data) => {
                    return numberWithCommas(data.value.toFixed(2))
                  }
                }
              ]
            },
            {
              column_name: 'total_score',
              column_caption: 'driving_compet_27',
              column_render: (data) => {
                return numberWithCommas(data.value.toFixed(2))
              }
            }
          ]}
        />
      </Suspense >
    )
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  dataMaintanance: state.drivingCompetition.dataMaintanance,
  vin_no_search: state.drivingCompetition.vin_no_search,
  xlsx_vehicle_name: state.drivingCompetition.xlsx_vehicle_name,
  xlsx_license_plate_no: state.drivingCompetition.xlsx_license_plate_no,
  endDate: state.drivingCompetition.endDate,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (isLoading) => dispatch(DrivingCompetitionActions.setValue(isLoading))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTable))
