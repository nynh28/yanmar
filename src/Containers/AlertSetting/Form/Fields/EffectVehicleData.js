import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import DriverActions from "../../../../Redux/DriverRedux";
import { Row, ButtonGroup, Button, Col } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Modal from "react-awesome-modal";
import "react-dropdown/style.css";
import "../styles.css";
import Table from '../../Managements/Table'
import { Input } from "reactstrap";
import { Popconfirm, Select } from "antd";
import { t } from "../../../../Components/Translation";
import SaveButton from "../../../../Components/SaveButton";
import FormInput from "../../../../Components/FormControls/FormInput";
import FormTextArea from "../../../../Components/FormControls/FormTextArea";
import FormLabel from "../../../../Components/FormControls/FormLabel";
import FormSelectSearch from "../../../../Components/FormControls/FormSelectSearch";
import FormSelectGroup from "../../../../Components/FormControls/FormSelectGroup";
import FormDatepicker from "../../../../Components/FormControls/FormDatepicker";
import FormRadio from "../../../../Components/FormControls/FormRadio";
import FormUpload from "../../../../Components/FormControls/FormUpload";
import LaddaButton, { S, SLIDE_LEFT } from "react-ladda";

// import '../styles.css'

// Define a custom component for handling the root position object
class AlertSettingData extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...props.formData,
      level: 21
      // inputTypeChange: props.schema.inputTypeChange,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      ...nextProps.formData,
      level: 21
    });
  }

  modalOpening = (e) => this.setState((state) => ({ viewImg: !state.viewImg }));

  handleInitFilePond() {
    // console.log("FilePond instance has initialised", this.pond);
  }

  onChange(name, nativeElement = true) {
    // console.log(this.state)
    return (event) => {
      // if (name == 'coordinates') {
      // this.validate(name,event.target.value)
      // }
      // else{
      console.log(event);
      let value = nativeElement ? event.target.value : event.label;
      console.log(event.target);
      // console.log(event.label)
      console.log(value);
      // console.log(name)

      !nativeElement &&
        this.setState({ [name + "_value"]: event.value }, () =>
          this.props.onChange(this.state)
        );

      this.setState(
        {
          [name]: value,
        },
        () => this.props.onChange(this.state)
      );
      // }
    };
  }

  onCheckedButton(isActive, fieldForm) {
    this.setState(
      {
        [fieldForm]: isActive,
      },
      () => this.props.onChange(this.state)
    );
  }

  setHeaderSection(title, showLine = true) {
    return (
      <div>
        {showLine && <div className="hr-line-dashed" />}
        <h3>{title}</h3>
        <div style={{ minHeight: "2rem" }}></div>
      </div>
    );
  }

  render() {
    const { effectAll } = this.state;
    const { schema } = this.props;
    console.log(this.state.level)

    return (
      <Suspense fallback={null}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
            {/* <Button className="btn btn-default" size="sm" >Create User</Button> */}
            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={effectAll}
                  label={schema.label.effectAll}
                  fieldForm={"effectAll"}
                  flex={2}
                  onClick={(effectAll, fieldForm) => {
                    this.onCheckedButton(effectAll, fieldForm);
                  }}
                />
              </Col>
            </Row>
            {
              console.log(this.state.level == 31 || this.state.level == 32 || this.state.level == 21 || this.state.level == 22)
            }
            {
              //   this.props.dataLogin.userLevelId == 21 || this.props.dataLogin.userLevelId == 22 ? <Form
              this.state.level == 31 || this.state.level == 32 || this.state.level == 21 || this.state.level == 22 ? <Row>
                    <Col lg={11}>
                      <label className="control-label" style={{ fontWeight: 500 }}>
                        Dealer
                      </label>

                      <Table
                        btnForm={true}
                        btnFormClick={() => this.openModal()}
                        btnPermissionClick={() => this.openModal()}
                        onRowRemoving={(e) => this.onRowRemoving(e)}
                        dataSource={[]}
                        column={[
                          {
                            column_name: "dealerNav.value",
                            column_caption: "User",
                          },
                        ]}
                      ></Table>
                    </Col>
                  </Row>
               : 
                console.log("user level not hmst")
              
            }
            {this.state.level == 41 || 
            this.state.level == 42 ||
            this.state.level == 31 ||
            this.state.level == 32 ||
            this.state.level == 21 ||
            this.state.level == 22 ? 
              <Row>
                <Col lg={11}>
                  <label className="control-label" style={{ fontWeight: 500 }}>
                    Customer
                  </label>
                  <Table
                    btnForm={true}
                    btnFormClick={() => this.openModal()}
                    btnPermissionClick={() => this.openModal()}
                    onRowRemoving={(e) => this.onRowRemoving(e)}
                    dataSource={[]}
                    column={[
                      {
                        column_name: "dealerNav.value",
                        column_caption: "User",
                      },
                    ]}
                  ></Table>
                </Col>
              </Row>
             : 
              console.log("user level not dealer")
            }
            {this.state.level == 41 ||
            this.state.level == 42 ||
            this.state.level == 43 ||
            this.state.level == 31 ||
            this.state.level == 32 ||
            this.state.level == 21 ||
            this.state.level == 22 ? 
              <Row>
                <Col lg={11}>
                  <label className="control-label" style={{ fontWeight: 500 }}>
                    Fleet
                  </label>
                  <Table
                    btnForm={true}
                    btnFormClick={() => this.openModal()}
                    btnPermissionClick={() => this.openModal()}
                    onRowRemoving={(e) => this.onRowRemoving(e)}
                    dataSource={[]}
                    column={[
                      {
                        column_name: "dealerNav.value",
                        column_caption: "User",
                      },
                    ]}
                  ></Table>
                </Col>
              </Row>
             : 
              console.log("user level not dealer")
            }
            {this.state.level == 41 ||
            this.state.level == 42 ||
            this.state.level == 43 ||
            this.state.level == 31 ||
            this.state.level == 32 ||
            this.state.level == 21 ||
            this.state.level == 22 ? 
              <Row>
                <Col lg={11}>
                  <Table
                    btnForm={true}
                    btnFormClick={() => this.openModal()}
                    btnPermissionClick={() => this.openModal()}
                    onRowRemoving={(e) => this.onRowRemoving(e)}
                    dataSource={[]}
                    column={[
                      {
                        column_name: "dealerNav.value",
                        column_caption: "User",
                      },
                    ]}
                  ></Table>
                </Col>
              </Row>
             : 
              console.log("user level not dealer")
            }

            <Row>
              <Col lg={11}>
                <label className="control-label" style={{ fontWeight: 500 }}>
                  Vehicle
                </label>
                <Table
                  btnForm={true}
                  btnFormClick={() => this.openModal()}
                  btnPermissionClick={() => this.openModal()}
                  onRowRemoving={(e) => this.onRowRemoving(e)}
                  dataSource={[]}
                  column={[
                    {
                      column_name: "dealerNav.value",
                      column_caption: "User",
                    },
                  ]}
                ></Table>
              </Col>
            </Row>

            {this.state.level == 31 ||
            this.state.level == 32 ||
            this.state.level == 21 ||
            this.state.level == 22 ? 
              <Row>
                <Col lg={11}>
                  <label className="control-label" style={{ fontWeight: 500 }}>
                    Vehicle Status
                  </label>
                  <Table
                    btnForm={true}
                    btnFormClick={() => this.openModal()}
                    btnPermissionClick={() => this.openModal()}
                    onRowRemoving={(e) => this.onRowRemoving(e)}
                    dataSource={[]}
                    column={[
                      {
                        column_name: "dealerNav.value",
                        column_caption: "User",
                      },
                    ]}
                  ></Table>
                </Col>
              </Row>
             : 
              console.log("user level not dealer")
            }
          </div>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  // driverProfile: state.driver.driverProfile,
  // loadingCheck: state.driver.loadingCheck,
  // formAction: state.driver.formAction,
  // driverExisting: state.driver.driverExisting,
});
const mapDispatchToProps = (dispatch) => ({
  // getExistingDriver: (personalId, customerId) => dispatch(DriverActions.getExistingDriver(personalId, customerId)),
  // getDriverProfile: (personalId) => dispatch(DriverActions.getDriverProfile(personalId)),
  // setPersonalIdSelect: (personalId, action) => dispatch(DriverActions.setPersonalIdSelect(personalId, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AlertSettingData);