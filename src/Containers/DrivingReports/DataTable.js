import React, { Component, Suspense } from "react";
import Table from "../../Components/DataGridView/Table.js";
import { connect } from "react-redux";
import moment from "moment";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.selectedCallback = this.selectedCallback.bind(this);
  }

  selectedCallback(e) {
    this.selectedRow = e.selectedRowsData;
    this.props.selectedCallback(e);
  }

  render() {
    let { lstDriverTable, dataLogin } = this.props;
    return (
      <Suspense fallback={null}>
        <Table
          dataSource={lstDriverTable ? [...lstDriverTable] : []}
          mode={"offline"}
          table_id={4}
          cookiesOptions={{
            enable: true,
            name: "DrivingReport",
          }}
          user_id={dataLogin.userId} //9999 20
          selectedCallback={this.selectedCallback}
          column={[
            {
              column_name: "vin_no",
              column_caption: "other_reports_18",
            },
            {
              column_name: "vehicle_name",
              column_caption: "other_reports_19",
            },
            {
              column_name: "model_code",
              column_caption: "other_reports_21",
            },
            {
              column_name: "fleet_name",
              column_caption: "other_reports_25",
            },
            {
              column_name: "license_plate_no",
              column_caption: "other_reports_20",
            },
            {
              column_name: "province_name",
              column_caption: "other_reports_26",
            },
          ]}
        ></Table>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLogin: state.signin.dataLogin,
    // lstDriverTable: state.analysisReport.lstDriverTable,
    headerData: state.analysisReport.headerData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
