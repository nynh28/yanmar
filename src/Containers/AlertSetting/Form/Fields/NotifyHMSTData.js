import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Row, ButtonGroup, Button, Col } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
// import Modal from "antd";
import "react-dropdown/style.css";
import "../styles.css";
// import Table from "../../../../Components/DataGridView/Table.js";
import { Input } from "reactstrap";
import { Popconfirm, Select, Modal } from "antd";
import { t } from "../../../../Components/Translation";
import Table from "../../Managements/Table";
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
class NotifyHMSTData extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      ...props.formData,
      // showFormPopupNotifyHMST: false,
      // groupId: [],
      // canAdd: false,
      // dupData: false,
      // inputTypeChange: props.schema.inputTypeChange,
    };
    // this.setTabEnable = this.setTabEnable.bind(this);
    this.onRowInserting = this.onRowInserting.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      ...nextProps.formData,
      // showFormPopupNotifyHMST: false,
    });
  }

  // componentDidUpdate(prevState){
  //   if (prevState.groupId !== this.state.groupId) {
  //     this.validateSave()
  //   }
  // }

  openModal() {
    this.setState((state) => ({
        showFormPopupNotifyHMST: !state.showFormPopupNotifyHMST,
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

  getGroupName() {
    let { userId } = this.state
    let { schema } = this.props;
    let obj = schema.list.userHMSTNav.find(x => x.key === parseInt(userId));
    console.log(userId)
    console.log(schema)
    console.log(obj)
    return obj.value
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
    let { userId } = this.state
    let { schema } = this.props;
    let data = []
    console.log(this.props)
    console.log(userId)

    for(let i=0; i <= userId.length-1; i++){
      let obj = schema.list.userHMST.find(x => x.key === parseInt(userId[i]));
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

  onRowRemoving(e) {
    this.props.onChange("DELETE", {
      "id": e.data.id,
      "action": "DELETE",
      "groupNav": {
        "key": e.data.groupNav.key
      }
    })
  }

  validateSave() {
    let { groupId } = this.state
    groupId.length > 0 ? this.setState({ canAdd: true }) : this.setState({ canAdd: false })
  }

  render() {
    const {
      ownerPartnerName,
      notifyHMST,
      notifyLevelHMST,
      subjectHMST,
      messageHMST,
      specifyUserHMST,
      showFormPopupNotifyHMST, 
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

            {this.state.notifyHMST == true && (
              <div>
                <Row>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={notifyLevelHMST}
                      label={schema.label.notifyLevel}
                      fieldForm={"notifyLevelHMST"}
                      flex={2}
                      name={["Normal", "Important"]}
                      onClick={(notifyLevelHMST, fieldForm) => {
                        this.onCheckedButton(notifyLevelHMST, fieldForm);
                      }}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={subjectHMST}
                      label={schema.label.subject}
                      fieldForm={"subjectHMST"}
                      flex={2}
                      onChange={this.onChange("subjectHMST")}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={12}>
                    <FormTextArea
                      schema={schema}
                      value={messageHMST}
                      label={schema.label.message}
                      fieldForm={"messageHMST"}
                      flex={2}
                      onChange={this.onChange("messageHMST")}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={specifyUserHMST}
                      label={schema.label.specifyUser}
                      fieldForm={"specifyUserHMST"}
                      flex={2}
                      onClick={(specifyUserHMST, fieldForm) => {
                        this.onCheckedButton(specifyUserHMST, fieldForm);
                      }}
                    />
                  </Col>
                </Row>
              </div>
            )}

            {specifyUserHMST == true && this.state.notifyHMST == true && (
              <Row>
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
                        column_caption: "User",
                      },
                    ]}
                  ></Table>
                </Col>
              </Row>
            )}
            <Modal
              title={t("add_user")}
              visible={showFormPopupNotifyHMST}
              okText={t("add")}
              cancelText={t("cancel")}
              onOk={this.onRowInserting}
              okButtonProps={{ disabled: userId === '' }}
              onCancel={() => this.openModal()}
            >
              <FormSelectSearch
                mode={"multiple"}
                schema={schema}
                value={userId}
                label={schema.label.userHMST}
                list={schema.list.userHMST}
                // list={[]}
                fieldForm={"userId"}
                placeholder={"placeholder"}
                flex={1}
                onChange={(selected) => {
                  console.log(selected)
                  this.setState(
                    {
                      ["userId"]: selected,
                    },
                    // () => this.props.onChange(this.state)
                  );
                }}
              />
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
export default connect(mapStateToProps, mapDispatchToProps)(NotifyHMSTData);
