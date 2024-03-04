import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Table from "../../Components/DataGridView/Table.js";
import { FormLoading } from "../../components_new";

class DataTable extends Component {
  shouldComponentUpdate(prevProps) {
    let { vehicleData, isLoadingVehicles } = this.props;
    if (
      prevProps.vehicleData !== vehicleData ||
      prevProps.isLoadingVehicles !== isLoadingVehicles
    ) {
      return true;
    }
    return false;
  }

  render() {
    let { isLoadingVehicles, vehicleData } = this.props;
    console.log(vehicleData);
    return (
      <Suspense fallback={null}>
        <FormLoading loading={isLoadingVehicles}>
          <Table
            mode={"offline"}
            dataSource={vehicleData}
            table_id={4}
            cookiesOptions={{
              enable: true,
              name: "MyVehicles",
            }}
            height={`calc(100vh - 470px)`}
            columnCount={
              this.props.isDealer ? "customer_name" : "license_plate_no"
            }
            user_id={this.props.dataLogin.userId}
            editing={{ enabled: false }}
            headerCustom={this.headerCustom}
            column={[
              {
                column_name: "model_code",
                column_caption: "my_vehicles_13",
              },
              {
                column_name: "chassis_no",
                column_caption: "other_reports_142",
              },
              {
                column_name: "engine_no",
                column_caption: "other_reports_143",
              },
              {
                column_name: "cust_name",
                column_caption: "customer_80",
              },
              {
                column_name: "phone_no",
                column_caption: "customer_33",
              },
              {
                column_name: "dealer_name",
                column_caption: "dealer",
              },
              {
                column_name: "delivery_date",
                column_caption: "realtime_158",
              },
              {
                column_name: "leased_no",
                column_caption: "realtime_157",
              },
              {
                column_name: "all_working_hours",
                column_caption: "realtime_170",
              },
              {
                column_name: "working_hours",
                column_caption: "other_reports_149",
              },
              {
                column_name: "working_hours_start",
                column_caption: "other_reports_150",
              },
              {
                column_name: "working_hours_end",
                column_caption: "other_reports_151",
              },
              {
                column_name: "maintenance_status",
                column_caption: "Maintenace_History_2",
              },
              {
                column_name: "fuel_level",
                column_caption: "other_reports_155",
              },
              {
                column_name: "fuel_used_rate",
                column_caption: "other_reports_32",
              },
              {
                column_name: "fuel_usage",
                column_caption: "other_reports_33",
              },
              {
                column_name: "battery_voltage",
                column_caption: "my_vehicles_29",
              },
              {
                column_name: "coolant_temp",
                column_caption: "my_vehicles_33",
              },
              {
                column_name: "hydraulic_oil_temp",
                column_caption: "other_reports_156",
              },
              {
                column_name: "pto",
                column_caption: "other_reports_153",
              },
            ]}
          />
        </FormLoading>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  vehicleData: state.myVehicles.vehicleData,
  isLoadingVehicles: state.myVehicles.isLoadingVehicles,
});

export default withRouter(connect(mapStateToProps)(DataTable));
