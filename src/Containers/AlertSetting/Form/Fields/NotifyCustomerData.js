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
class NotifyCustomerData extends Component {
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
        showFormPopupNotifyCustomer: !state.showFormPopupNotifyCustomer,
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

  onRowInserting() {
    let { userId } = this.state
    let { schema } = this.props;
    let data = []
    console.log(this.props)
    console.log(userId)

    for(let i=0; i <= userId.length-1; i++){
      let obj = schema.list.userCustomer.find(x => x.key === parseInt(userId[i]));
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
  }


    // if (!this.checkDuplicateData()) {
    //   this.props.onChange("INSERT", {
    //       "key": parseInt(this.state.groupId),
    //       "value": this.getGroupName()
    //   })
    //   this.openModal()
    //   this.setState({ dupData: false })
    // 

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
      notifyCustomer,
      notifyLevelCustomer,
      subjectCustomer,
      messageCustomer,
      specifyUserCustomer,
      showFormPopupNotifyCustomer, 
      customer,
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
                  value={notifyCustomer}
                  label={schema.label.notifyCustomer}
                  fieldForm={"notifyCustomer"}
                  flex={2}
                  onClick={(notifyCustomer, fieldForm) => {
                    this.onCheckedButton(notifyCustomer, fieldForm);
                  }}
                />
              </Col>
            </Row>

            {this.state.notifyCustomer == true && (
              <div>
                <Row>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={notifyLevelCustomer}
                      label={schema.label.notifyLevel}
                      fieldForm={"notifyLevelCustomer"}
                      flex={2}
                      name={["Normal", "Important"]}
                      onClick={(notifyLevelCustomer, fieldForm) => {
                        this.onCheckedButton(notifyLevelCustomer, fieldForm);
                      }}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={subjectCustomer}
                      label={schema.label.subject}
                      fieldForm={"subjectCustomer"}
                      flex={2}
                      onChange={this.onChange("subjectCustomer")}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={12}>
                    <FormTextArea
                      schema={schema}
                      value={messageCustomer}
                      label={schema.label.message}
                      fieldForm={"messageCustomer"}
                      flex={2}
                      onChange={this.onChange("messageCustomer")}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={specifyUserCustomer}
                      label={schema.label.specifyUser}
                      fieldForm={"specifyUserCustomer"}
                      flex={2}
                      onClick={(specifyUserCustomer, fieldForm) => {
                        this.onCheckedButton(specifyUserCustomer, fieldForm);
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
                  value={notifyLevelCustomer}
                  label={schema.label.notifyLevel}
                  fieldForm={"notifyLevelCustomer"}
                  flex={2}
                  onClick={(notifyLevelCustomer, fieldForm) => {
                    this.onCheckedButton(notifyLevelCustomer, fieldForm);
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={subjectCustomer}
                  label={schema.label.subject}
                  fieldForm={"subjectCustomer"}
                  flex={2}
                  onClick={(subjectCustomer, fieldForm) => {
                    this.onCheckedButton(subjectCustomer, fieldForm);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={messageCustomer}
                  label={schema.label.message}
                  fieldForm={"messageCustomer"}
                  flex={2}
                  onClick={(messageCustomer, fieldForm) => {
                    this.onCheckedButton(messageCustomer, fieldForm);
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={specifyUserCustomer}
                  label={schema.label.specifyUser}
                  fieldForm={"specifyUserCustomer"}
                  flex={2}
                  onClick={(specifyUserCustomer, fieldForm) => {
                    this.onCheckedButton(specifyUserCustomer, fieldForm);
                  }}
                />
              </Col>
            </Row> */}

            {
              specifyUserCustomer == true && <Row>
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
                        column_caption: "Customer",
                      },
                    ]}
                  ></Table>
                </Col>
              </Row>
            }
            <Modal
              title={t("add_user")}
              visible={showFormPopupNotifyCustomer}
              okText={t("add")}
              cancelText={t("cancel")}
              onOk={this.onRowInserting}
              okButtonProps={{ disabled: !canAdd }}
              onCancel={() => this.openModal()}
            >
              <FormSelectSearch
                mode={"single"}
                schema={schema}
                value={customer}
                label={schema.label.customer}
                list={schema.list.customerNav}
                // list={[]}
                fieldForm={"customer"}
                placeholder={"placeholder"}
                flex={1}
                onChange={(selected) => {
                  this.setState(
                    {
                      ["customer"]: selected,
                    },
                    () => this.props.onChange(this.state)
                  );
                }}
              />

              {
                customer !== '' &&
                <FormSelectSearch
                  mode={"multiple"}
                  schema={schema}
                  value={userId}
                  label={schema.label.userCustomer}
                  list={schema.list.userCustomer}
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
export default connect(mapStateToProps, mapDispatchToProps)(NotifyCustomerData);
