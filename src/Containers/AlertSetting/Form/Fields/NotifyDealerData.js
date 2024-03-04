import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import DriverActions from "../../../../Redux/DriverRedux";
import { Row, ButtonGroup, Button, Col } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

import "react-dropdown/style.css";
import "../styles.css";
// import Table from "../../../../Components/DataGridView/Table.js";
import { Input } from "reactstrap";
import { Popconfirm, Select, Modal } from "antd";
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
import AlertSettingActions from "../../../../Redux/AlertSettingRedux";
// import '../styles.css'

// Define a custom component for handling the root position object
class NotifyDealerData extends Component {
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
        showFormPopupNotifyDealer: !state.showFormPopupNotifyDealer,
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

  onCheckedButton(isActive, fieldForm) {
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));

  }

  checkDuplicateData() {
    let index = this.props.data.findIndex(x => x.groupNav.key === parseInt(this.state.groupId))
    if (index > -1) {
      this.setState({ dupData: true })
      return true
    }
    else {
      return false
    }
  }

  onRowInserting() {
    let { userId, groupId } = this.state
    let { schema } = this.props;
    let data = []
    console.log(this.props)
    console.log(userId)

    for(let i=0; i <= userId.length-1; i++){
      let obj = schema.list.userDealer.find(x => x.key === parseInt(userId[i]));
      data.push({user_id: parseInt(userId[i]), user_display_name: obj.value, receiver_user_type: this.state.dealer})
    }
    
    groupId.push()

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
      notifyDealer,
      notifyLevelDealer,
      subjectDealer,
      messageDealer,
      specifyUserDealer,
      showFormPopupNotifyDealer, 
      dealer,
      userId,
      canAdd,
      dupData,
      userLoading
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
                  value={notifyDealer}
                  label={schema.label.notifyDealer}
                  fieldForm={"notifyDealer"}
                  flex={2}
                  onClick={(notifyDealer, fieldForm) => {
                    this.onCheckedButton(notifyDealer, fieldForm);
                  }}
                />
              </Col>
            </Row>

            {this.state.notifyDealer == true && (
              <div>
                <Row>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={notifyLevelDealer}
                      label={schema.label.notifyLevel}
                      fieldForm={"notifyLevelDealer"}
                      flex={2}
                      name={["Normal", "Important"]}
                      onClick={(notifyLevelDealer, fieldForm) => {
                        this.onCheckedButton(notifyLevelDealer, fieldForm);
                      }}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={subjectDealer}
                      label={schema.label.subject}
                      fieldForm={"subjectDealer"}
                      flex={2}
                      onChange={this.onChange("subjectDealer")}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={12}>
                    <FormTextArea
                      schema={schema}
                      value={messageDealer}
                      label={schema.label.message}
                      fieldForm={"messageDealer"}
                      flex={2}
                      onChange={this.onChange("messageDealer")}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={specifyUserDealer}
                      label={schema.label.specifyUser}
                      fieldForm={"specifyUserDealer"}
                      flex={2}
                      onClick={(specifyUserDealer, fieldForm) => {
                        this.onCheckedButton(specifyUserDealer, fieldForm);
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
                  value={notifyLevelDealer}
                  label={schema.label.notifyLevel}
                  fieldForm={"notifyLevelDealer"}
                  flex={2}
                  onClick={(notifyLevelDealer, fieldForm) => {
                    this.onCheckedButton(notifyLevelDealer, fieldForm);
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={subjectDealer}
                  label={schema.label.subject}
                  fieldForm={"subjectDealer"}
                  flex={2}
                  onClick={(subjectDealer, fieldForm) => {
                    this.onCheckedButton(subjectDealer, fieldForm);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={messageDealer}
                  label={schema.label.message}
                  fieldForm={"messageDealer"}
                  flex={2}
                  onClick={(messageDealer, fieldForm) => {
                    this.onCheckedButton(messageDealer, fieldForm);
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={specifyUserDealer}
                  label={schema.label.specifyUser}
                  fieldForm={"specifyUserDealer"}
                  flex={2}
                  onClick={(specifyUserDealer, fieldForm) => {
                    this.onCheckedButton(specifyUserDealer, fieldForm);
                  }}
                />
              </Col>
            </Row> */}

            {
              specifyUserDealer == true && <Row>
                <Col lg={12}>
                  <Table
                    btnForm={true}
                    btnFormClick={() => this.openModal()}
                    btnPermissionClick={() => this.openModal()}
                    onRowRemoving={(e) => this.onRowRemoving(e)}
                    dataSource={schema.list.userData}
                    column={[
                      {
                        column_name: "user_display_name",
                        column_caption: "Dealer",
                      },
                    ]}
                  ></Table>
                </Col>
              </Row>
            }

            <Modal
              title={t("add_user")}
              visible={showFormPopupNotifyDealer}
              okText={t("add")}
              cancelText={t("cancel")}
              onOk={this.onRowInserting}
              okButtonProps={{ disabled: userId == '' }}
              onCancel={() => this.openModal()}
            >
              <FormSelectSearch
                mode={"single"}
                schema={schema}
                value={dealer}
                label={schema.label.dealer}
                list={schema.list.dealerNav}
                // list={[]}
                fieldForm={"dealer"}
                placeholder={"placeholder"}
                flex={1}
                onChange={(selected) => {
                  this.props.getDropdownUserDealer(selected)
                  this.setState(
                    {
                      ["dealer"]: selected,
                      userLoading: true,
                      userId: ''
                    },
                    () => this.props.onChange(this.state)
                  );
                }}
              />

              {
                dealer !== '' && userLoading == false &&
                <FormSelectSearch
                  mode={"multiple"}
                  schema={schema}
                  value={userId}
                  label={schema.label.userDealer}
                  list={schema.list.userDealerNav}
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
  getDropdownAlert: (id) => dispatch(AlertSettingActions.getDropdownAlert(id)),
  getDropdownUserDealer: (id) => dispatch(AlertSettingActions.getDropdownUserDealer(id)),
  // getExistingDriver: (personalId, customerId) => dispatch(DriverActions.getExistingDriver(personalId, customerId)),
  // getDriverProfile: (personalId) => dispatch(DriverActions.getDriverProfile(personalId)),
  // setPersonalIdSelect: (personalId, action) => dispatch(DriverActions.setPersonalIdSelect(personalId, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NotifyDealerData);
