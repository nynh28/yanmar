import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import MaintenanceActions from "../../Redux/MaintenanceHistoryRedux";
import Table from "../../Components/DataGridView/Table.js";
import Loading from "./Loading";
import { t } from "../../Components/Translation";
import { calculateToDuration } from "../../Functions/DateMoment";
import moment from "moment";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.exportName = "";
  }

  componentWillMount() {
    this.headerCustom = {
      list: [
        {
          text: this.setTextHeader(),
          merge_cell: true,
          font: { size: 12 },
          alignment: { vertical: "middle" },
          height: 30,
        },
      ],
    };
    this.exportName =
      "Maintenance_History_" +
      this.props.vin_no_search +
      "_" +
      this.props.endDate;
  }

  shouldComponentUpdate(nextProps) {
    let {
      historyData,
      vin_no_search,
      lsx_vehicle_name,
      xlsx_license_plate_no,
      endDate,
    } = this.props;
    if (nextProps.historyData !== historyData) {
      this.headerCustom = {
        list: [
          {
            text: this.setTextHeader(),
            merge_cell: true,
            font: { size: 12 },
            alignment: { vertical: "middle" },
            height: 30,
          },
        ],
      };
      this.exportName = "Maintenance_History_" + vin_no_search + "_" + endDate;

      return true;
    }
    return false;
  }

  setTextHeader() {
    let { vin_no_search, xlsx_vehicle_name, xlsx_license_plate_no, endDate } =
      this.props;
    return [
      t("history_89"),
      " : ",
      xlsx_license_plate_no || "-",
      ", ",
      t("history_90"),
      " : ",
      xlsx_vehicle_name || "-",
      ", ",
      t("history_91"),
      " : ",
      vin_no_search || "-",
      ", ",
      t("Maintenace_History_1"),
      " : ",
      endDate,
    ];
  }

  render() {
    let { dataMaintanance, historyData } = this.props;

    return (
      <Suspense fallback={null}>
        <Loading />
        <Table
          mode={"offline"}
          dataSource={historyData}
          table_id={10}
          user_id={this.props.dataLogin.userId}
          editing={{ enabled: false }}
          headerCustom={this.headerCustom}
          showSetting={true}
          columnCount="JOB_Number"
          height={`calc(100vh - 450px)`}
          exportName={this.exportName}
          cookiesOptions={{
            enable: true,
            name: "MaintenanceHistory",
          }}
          column={[
            {
              column_caption: "Model_Code",
              column_name: "model",
            },
            {
              column_caption: "other_reports_142", //chassis
              column_name: "vin_no",
              // column_render: (e) => moment(e.value).format('DD/MM/YYYY')
            },
            {
              column_caption: "other_reports_143", //engine
              column_name: "engine_no",
              // column_render: (e) => moment(e.value).format('DD/MM/YYYY')
            },
            {
              column_caption: "dealer",
              column_name: "seller",
            },
            {
              column_caption: "customer_80", // cust name
              column_name: "cust_name",
            },
            {
              column_caption: "current_phone", // cusphone
              column_name: "official_tel",
            },
            {
              column_caption: "realtime_158", //delivery date
              column_name: "delivery_date",
            },
            {
              column_caption: "realtime_157", // fianace
              column_name: "leased_no",
            },
            {
              column_caption: "other_reports_144", //working hour
              column_name: "current_engine_hour",
            },
            {
              column_caption: "event",
              column_name: "event_name",
            },
            {
              column_caption: "other_reports_157", //ouccer at
              column_name: "condition_val",
              // column_render: (e) => calculateToDuration(e.value, "hideSec")
            },
            {
              column_caption: "Maintenace_14", // apponitment
              column_name: "appointment",
            },
            {
              column_caption: "Maintenace_18", // note
              column_name: "note",
              // column_render: (e) => parseFloat(e.value)
            },
            // {
            //   column_caption: 'Maintenace_History_16',
            //   column_name: "Sublet Type"
            // },
            // {
            //   column_caption: 'Maintenace_History_17',
            //   column_name: "Sublet Invoice"
            // },
            // {
            //   column_caption: 'Maintenace_History_18',
            //   column_name: "Sublet text"
            // }
          ]}
        />
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  dataMaintanance: state.maintenanceHistory.dataMaintanance,
  vin_no_search: state.maintenanceHistory.vin_no_search,
  xlsx_vehicle_name: state.maintenanceHistory.xlsx_vehicle_name,
  xlsx_license_plate_no: state.maintenanceHistory.xlsx_license_plate_no,
  endDate: state.maintenanceHistory.endDate,
  historyData: state.maintenanceHistory.historyData,
});

const mapDispatchToProps = (dispatch) => ({
  setValue: (isLoading) => dispatch(MaintenanceActions.setValue(isLoading)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataTable)
);
