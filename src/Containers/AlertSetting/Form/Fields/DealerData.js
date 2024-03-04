import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import DriverActions from "../../../../Redux/DriverRedux";
import { Row, ButtonGroup, Button, Col } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Modal from "react-awesome-modal";
import "react-dropdown/style.css";
import "../styles.css";
// import Table from "../../../../Components/DataGridView/Table.js";
import { Input } from "reactstrap";
import { Popconfirm, Select } from "antd";
import { t } from "../../../../Components/Translation";
import Table from '../../Managements/Table'
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
      // inputTypeChange: props.schema.inputTypeChange,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      ...nextProps.formData,
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
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));

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
    const {
      ownerPartnerName,
      notifyHMST,
      notifyLevelHMST,
      subjectHMST,
      messageHMST,
      specifyHMST,

      notifyDealer,
      notifyLevelDealer,
      subjectDealer,
      messageDealer,
      specifyDealer,

      notifyCustomer,
      notifyLevelCustomer,
      subjectCustomer,
      messageCustomer,
      specifyCustomer,

      notifyFleet,
      notifyLevelFleet,
      subjectFleet,
      messageFleet,
      specifyFleet,

      notifyDriver,
      notifyLevelDriver,
      subjectDriver,
      messageDriver,
      specifyDriver,

      notifyGroup,
      notifyLevelGroup,
      subjectGroup,
      messageGroup,

      notifyGPSDevice,
      notifyLevelGPSDevice,
      voiceFile,
    } = this.state;
    const { schema } = this.props;

    return (
      <Suspense fallback={null}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
            {/* <Button className="btn btn-default" size="sm" >Create User</Button> */}
            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={notifyHMST}
                  label={schema.label.notifyHMST}
                  fieldForm={"notifyHMST"}
                  flex={2}
                  onClick={(notifyHMST, fieldForm) => {
                    this.onCheckedButton(notifyHMST, fieldForm);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={notifyLevelHMST}
                  label={schema.label.notifyLevel}
                  fieldForm={"notifyLevelHMST"}
                  flex={2}
                  onClick={(notifyLevelHMST, fieldForm) => {
                    this.onCheckedButton(notifyLevelHMST, fieldForm);
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={subjectHMST}
                  label={schema.label.subject}
                  fieldForm={"subjectHMST"}
                  flex={2}
                  onClick={(subjectHMST, fieldForm) => {
                    this.onCheckedButton(subjectHMST, fieldForm);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={messageHMST}
                  label={schema.label.message}
                  fieldForm={"messageHMST"}
                  flex={2}
                  onClick={(messageHMST, fieldForm) => {
                    this.onCheckedButton(messageHMST, fieldForm);
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={specifyHMST}
                  label={schema.label.specifyUser}
                  fieldForm={"subjectHMST"}
                  flex={2}
                  onClick={(specifyHMST, fieldForm) => {
                    this.onCheckedButton(specifyHMST, fieldForm);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Table
                  btnForm={true}
                  btnFormClick={() => this.openModal()}
                  btnPermissionClick={() => this.openModal()}
                  onRowRemoving={(e) => this.onRowRemoving(e)}
                  dataSource={[]}
                  column={[
                    {
                      column_name: "dealerNav.value",
                      column_caption: "Dealer",
                    },
                    {
                      column_name: "manageLevelNav.value",
                      column_caption: "Manage Level",
                    },
                  ]}
                ></Table>
              </Col>
            </Row>
          </div>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  headers: state.signin.header,
  dataLogin: state.signin.dataLogin,
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
