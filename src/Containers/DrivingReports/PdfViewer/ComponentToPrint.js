import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import FrontPageDriverReport from "./FrontPageDriverReport";
import BackPageDriverReport from "./BackPageDriverReport";
import "./driver.css";

class ComponentToPrint extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, loading: false };
  }

  render() {
    const { custDriving, dailyData } = this.props;
    // console.log("custDriving : ", custDriving)
    // console.log("dailyData : ", dailyData)
    return (
      <div media="print" size="A4" ref={(el) => this.props.refPrint(el)}>
        <style type="text/css">
          {`@page {
              size: A4 landscape;
              margin: 0 !important;
          }`}
        </style>
        {custDriving &&
          custDriving.map((element, index) => {
            const found =
              dailyData &&
              dailyData.find((ele) => {
                if (ele.info && ele.info.licenseplate) {
                  let licens = ele.info.licenseplate.split(" ")
                  let licenseplate = ""
                  if (licens.length > 2) {
                    for (let index = 0; index < licens.length; index++) {
                      if (index !== (licens.length - 1)) {
                        if (licenseplate === "")
                          licenseplate = licens[index]
                        else
                          licenseplate += " " + licens[index]
                      }
                    }
                  }
                  else {
                    licenseplate = licens[0]
                  }

                  return (
                    licenseplate == element.info.license_plate_no
                  );

                  // return (
                  //   ele.info.licenseplate.split(" ")[0] ==
                  //   element.info.license_plate_no
                  // );

                } else return false;
              });

            if (found) {
              let trips = [];
              for (let i = 0; i < Math.ceil(found.trips.length / 40); i++) {
                const count = i * 40;
                trips.push({
                  data: found.trips.slice(count, count + 40),
                });
              }
              return (
                <div key={index}>
                  <FrontPageDriverReport
                    dailyData={found}
                    dataSource={element}
                  />
                  {trips.map((value, idx) => {
                    return (
                      <div key={idx}>
                        <BackPageDriverReport
                          page={idx}
                          dailyData={found}
                          trips={value.data}
                          dataSource={element}
                        />
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  custDriving: state.drivingreport.custDriving,
  dailyData: state.drivingreport.dailyData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ComponentToPrint);
