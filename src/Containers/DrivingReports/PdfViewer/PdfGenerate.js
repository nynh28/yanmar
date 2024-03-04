import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { t } from "../../../Components/Translation";
import { Row, Col } from "reactstrap";
import jsPDF from "jspdf"; // check the docs for this: https://parall.ax/products/jspdf
import html2canvas from "html2canvas";
import $ from "jquery";
import "./driver.css";
import { css } from "@emotion/core";
import { PulseLoader } from "react-spinners";
import FrontPageDriverReport from "./FrontPageDriverReport";
import BackPageDriverReport from "./BackPageDriverReport";
import ComponentToPrint from "./ComponentToPrint";
import { IconButton } from "@material-ui/core";
import ReactToPrint from "react-to-print";
import html2PDF from "jspdf-html2canvas";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  position: absolute;
  top: 54vh;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
`;

class PdfGenerate extends Component {
  constructor(props) {
    super(props);
    this.print = this.print.bind(this);
    this.state = { page: 0, loading: false };
  }

  async print() {
    $("body").css({ overflowY: "hidden" });
    this.setState({ loading: true });
    const HTML_Width = 210;
    const HTML_Height = 297;
    const top_left_margin = 0;
    const canvas_image_width = HTML_Width;
    const canvas_image_height = HTML_Height;
    const pdf = new jsPDF("l", "mm", "a4");
    for (let i = 0; i < $(".printreport").length; i++) {
      await html2canvas($(".printreport")[i], { scale: 3 }).then((canvas) => {
        this.setState({ page: i + 1 });
        const imgData = canvas.toDataURL("image/png", 1);
        pdf.addImage(
          imgData,
          "PNG",
          top_left_margin,
          top_left_margin,
          canvas_image_height,
          canvas_image_width
        );
        if (i != $(".printreport").length - 1) {
          pdf.addPage();
        }
      });
    }
    pdf.save("Daliy_Report.pdf");
    $("body").css({ overflowY: "auto" });
    this.setState({ loading: false, page: 0 });
  }

  // print() {
  //   const page = document.getElementById("page");
  //   console.log("page :> ", page);

  //   html2PDF(page, {
  //     jsPDF: {
  //       orientation: "l",
  //       unit: "mm",
  //       format: "a4",
  //     },
  //     image: { type: "jpeg", quality: 1 },
  //     html2canvas: { scale: 3 },
  //     margin: {
  //       top: 0,
  //       right: 0,
  //       bottom: 0,
  //       left: 0,
  //     },
  //     output: "./pdf/generate.pdf",
  //   });
  // }

  render() {
    const { loading, page } = this.state;
    const { custDriving, dailyData } = this.props;
    return (
      <div>
        <div
          style={{
            textAlign: "center",
            padding: 20,
            filter: loading ? "blur(1px)" : "none",
            opcity: loading ? 0.8 : 1,
          }}
        >
          {/* <IconButton
            id="print"
            style={{
              height: 35,
              width: 80,
              padding: 0,
              borderRadius: "5px 5px",
              border: "1px solid #e7eaec",
            }}
            onClick={this.print}
          >
            <i className="fa fa-print"></i>
            <span style={{ paddingLeft: 5 }}>{t("print")}</span>
          </IconButton> */}
          <ReactToPrint
            trigger={() => (
              <IconButton
                id="print"
                style={{
                  height: 35,
                  width: 80,
                  padding: 0,
                  borderRadius: "5px 5px",
                  border: "1px solid #e7eaec",
                }}
              >
                <i className="fa fa-print"></i>
                <span style={{ paddingLeft: 5 }}>{t("print")}</span>
              </IconButton>
            )}
            content={() => this.componentRef}
          />
          <center>
            <Row
              style={{
                overflowX: "hidden",
                overflowY: "hidden",
                marginTop: 10,
              }}
            >
              <Col lg={12}>
                <ComponentToPrint refPrint={(el) => (this.componentRef = el)} />
              </Col>
            </Row>
          </center>
        </div>
        {loading ? (
          <div>
            <span
              style={{
                display: "block",
                margin: "0 auto",
                position: "absolute",
                top: "47vh",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              {page} / {$(".printreport").length}
            </span>
            <PulseLoader
              css={override}
              size={30}
              margin={10}
              color={"rgb(54, 215, 183)"}
              loading={loading}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  custDriving: state.drivingreport.custDriving,
  dailyData: state.drivingreport.dailyData,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PdfGenerate);
