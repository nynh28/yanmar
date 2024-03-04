import React, { Component } from "react";
import { Row, Col, Progress } from "reactstrap";
import $ from "jquery";
import { t } from "../../Components/Translation";

export default class HeaderFillInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <div
        id={"manage-ibox-" + this.props.boxid}
        className="ibox"
        style={{
          boxShadow: "rgb(222, 222, 222) 0px 2px 3px",
          marginBottom: 6,
        }}
      >
        <div
          className="ibox-title"
          style={{
            borderColor: "#f3f3f4",
            borderWidth: "2px 0px 0",
            paddingTop: 7,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{ marginBottom: 5, display: "flex", alignItems: "center" }}
            >
              {t("driver_report_34")}
            </h3>
            <a
              className="btn btn-white btn-md"
              title="Config"
              style={{ backgroundColor: "grey" }}
              onClick={() => this.props.onClick()}
            >
              <i
                className="fa fa-cogs"
                style={{ fontSize: 16, color: "white", marginRight: 5 }}
              ></i>
              <span style={{ color: "white" }}>{t("other_reports_23")}</span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
