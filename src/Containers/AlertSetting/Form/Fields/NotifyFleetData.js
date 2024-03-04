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
class NotifyFleetData extends Component {
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

  openModal() {
    this.setState((state) => ({
        showFormPopupNotifyFleet: !state.showFormPopupNotifyFleet,
        // groupId: [],
        // dupData: false 
      }), () => {
        console.log(this.state)
        this.props.onChange(this.state)
      }
    );
  }

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

  onRowInserting() {
    let { userId } = this.state
    let { schema } = this.props;
    let data = []
    console.log(this.props)
    console.log(userId)

    for(let i=0; i <= userId.length-1; i++){
      let obj = schema.list.userFleet.find(x => x.key === parseInt(userId[i]));
      data.push({key: parseInt(userId[i]), value: obj.value})
    }
    
    // console.log(this)
    
    console.log(data)
    // this.props.onChange({
      // key: parseInt(userId),
      // value: obj.value,
    //   action: "INSERT"
    // })
    this.openModal()
    this.setState({ userId: userId, add: data}, () => {
      this.props.onChange(this.state)
    })
    // this.getGroupName()


    // if (!this.checkDuplicateData()) {
    //   this.props.onChange("INSERT", {
    //       "key": parseInt(this.state.groupId),
    //       "value": this.getGroupName()
    //   })
    //   this.openModal()
    //   this.setState({ dupData: false })
    // }
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
      notifyFleet,
      notifyLevelFleet,
      subjectFleet,
      messageFleet,
      specifyUserFleet,
      showFormPopupNotifyFleet, 
      fleet,
      userId,
      canAdd,
      dupData
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
                  value={notifyFleet}
                  label={schema.label.notifyFleet}
                  fieldForm={"notifyFleet"}
                  flex={2}
                  onClick={(notifyFleet, fieldForm) => {
                    this.onCheckedButton(notifyFleet, fieldForm);
                  }}
                />
              </Col>
            </Row>
            
            {this.state.notifyFleet == true && (
              <div>
                <Row>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={notifyLevelFleet}
                      label={schema.label.notifyLevel}
                      fieldForm={"notifyLevelFleet"}
                      flex={2}
                      name={["Normal", "Important"]}
                      onClick={(notifyLevelFleet, fieldForm) => {
                        this.onCheckedButton(notifyLevelFleet, fieldForm);
                      }}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={subjectFleet}
                      label={schema.label.subject}
                      fieldForm={"subjectFleet"}
                      flex={2}
                      onChange={this.onChange("subjectFleet")}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={12}>
                    <FormTextArea
                      schema={schema}
                      value={messageFleet}
                      label={schema.label.message}
                      fieldForm={"messageFleet"}
                      flex={2}
                      onChange={this.onChange("messageFleet")}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={specifyUserFleet}
                      label={schema.label.specifyUser}
                      fieldForm={"specifyUserFleet"}
                      flex={2}
                      onClick={(specifyUserFleet, fieldForm) => {
                        this.onCheckedButton(specifyUserFleet, fieldForm);
                      }}
                    />
                  </Col>
                </Row>
              </div>
            )}

            {/* <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={notifyLevelFleet}
                  label={schema.label.notifyLevel}
                  fieldForm={"notifyLevelFleet"}
                  flex={2}
                  onClick={(notifyLevelFleet, fieldForm) => {
                    this.onCheckedButton(notifyLevelFleet, fieldForm);
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={subjectFleet}
                  label={schema.label.subject}
                  fieldForm={"subjectFleet"}
                  flex={2}
                  onClick={(subjectFleet, fieldForm) => {
                    this.onCheckedButton(subjectFleet, fieldForm);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={messageFleet}
                  label={schema.label.message}
                  fieldForm={"messageFleet"}
                  flex={2}
                  onClick={(messageFleet, fieldForm) => {
                    this.onCheckedButton(messageFleet, fieldForm);
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={specifyUserFleet}
                  label={schema.label.specifyUser}
                  fieldForm={"specifyUserFleet"}
                  flex={2}
                  onClick={(specifyUserFleet, fieldForm) => {
                    this.onCheckedButton(specifyUserFleet, fieldForm);
                  }}
                />
              </Col>
            </Row> */}
            

            {
              specifyUserFleet == true && <Row>
                <Col lg={12}>
                  <Table
                    btnForm={true}
                    btnFormClick={() => this.openModal()}
                    btnPermissionClick={() => this.openModal()}
                    onRowRemoving={(e) => this.onRowRemoving(e)}
                    dataSource={schema.list.userData}
                    column={[
                      {
                        column_name: "value",
                        column_caption: "Fleet",
                      },
                    ]}
                  ></Table>
                </Col>
              </Row>
            }

            <Modal
              title={t("add_user")}
              visible={showFormPopupNotifyFleet}
              okText={t("add")}
              cancelText={t("cancel")}
              onOk={this.onRowInserting}
              okButtonProps={{ disabled: !canAdd }}
              onCancel={() => this.openModal()}
            >
              <FormSelectSearch
                mode={"single"}
                schema={schema}
                value={fleet}
                label={schema.label.fleet}
                list={schema.list.fleetNav}
                // list={[]}
                fieldForm={"fleet"}
                placeholder={"placeholder"}
                flex={1}
                onChange={(selected) => {
                  this.setState(
                    {
                      ["fleet"]: selected,
                    },
                    () => this.props.onChange(this.state)
                  );
                }}
              />

              {
                fleet !== '' &&
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={userId}
                  label={schema.label.userFleet}
                  list={schema.list.userFleet}
                  // list={[]}
                  fieldForm={"userId"}
                  placeholder={"placeholder"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState(
                      {
                        ["userId"]: selected,
                      },
                      () => this.props.onChange(this.state)
                    );
                  }}
                />
              }
              
              {dupData && (
                <div
                  className="form-group field field-string"
                  style={{
                    padding: "0 10px",
                    marginBottom: -10,
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <span className="text-danger">
                    ไม่สามารถเพิ่มข้อมูล เนื่องจากรายการนี้มีอยู่แล้ว
                  </span>
                </div>
              )}
            </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(NotifyFleetData);
