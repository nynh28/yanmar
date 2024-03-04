import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Row, ButtonGroup, Col } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import Dropdown from "react-dropdown";
import GeofenceActions from '../../../../Redux/GeofenceRedux';
// import '../../../../Redux/GeofenceRedux'
// import 'react-dropdown/style.css'
// import '../styles.css'
import { Upload, message, Button } from 'antd';
import { UploadOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import Modal from "react-awesome-modal";
import "react-dropdown/style.css";
import "../styles.css";
import "../../iconPresent.css"
import { Popconfirm, Select, Modal } from "antd";
import { t } from "../../../../Components/Translation";
import SaveButton from "../../../../Components/SaveButton";
import FormInput from "../../../../Components/FormControls/FormInput";
import FormLabel from "../../../../Components/FormControls/FormLabel";
import FormSelectSearch from "../../../../Components/FormControls/FormSelectSearch";
import FormSelectGroup from "../../../../Components/FormControls/FormSelectGroup";
import FormDatepicker from "../../../../Components/FormControls/FormDatepicker";
import FormRadio from "../../../../Components/FormControls/FormRadio";
import FormRadioCustom from "../../../../Components/FormControls/FormRadioCustom";
import FormUpload from "../../../../Components/FormControls/FormUpload";
import { ENDPOINT_BASE_URL } from '../../../../Config/app-config';

// import '../styles.css'
registerPlugin(FilePondPluginFileValidateType);
// Define a custom component for handling the root position object
class GeofenceTypeData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      // viewImg: false,
      // inputTypeChange: props.schema.inputTypeChange,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData,
      // inputTypeChange: nextProps.schema.inputTypeChange,
    }, 
    // () => {
    //   if (this.state.iconSource == 2){
    //     console.log(this.state.iconSource)
    //     this.props.getPresentIcon()
    //   }
    // }
    );
  }

  // componentDidUpdate(prevState, prevProps){
  //   console.log(prevState.iconSource)
  //   console.log(this.state.iconSource)

  //   if(prevState.iconSource != this.state.iconSource){
  //   //   console.log(this.state.formData.GeofenceTypeDetail.geofenceTypeData.iconSource)
  //     if (this.state.iconSource == 2){
  //       console.log(this.state.iconSource)
  //       this.props.getPresentIcon()
  //     }
  //   }
  // }

  openModal() {
    this.setState((state) => ({
      showFormPopupPreIcon: !state.showFormPopupPreIcon,
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
    return (event) => {
      let value = nativeElement ? event.target.value : event.label;
      console.log(name);
      console.log(value);

      if (name == "geofenceTypeName" || name == "geofenceTypeDescription") {
        if (value != " ") {
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
        }
      } else {
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
      }
    };
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

  setFormInput(
    schema,
    value,
    fieldNameLabel,
    fieldForm,
    placeholder,
    disabled = false,
    flex
  ) {
    return (
      <div
        className="form-group field field-string"
        style={{ padding: "0 10px", flex: flex || 1 }}
      >
        <label className="control-label" style={{ fontWeight: 500 }}>
          {t(fieldNameLabel)} {" :"}
          {schema.required && schema.required.includes(fieldForm) && (
            <span className="required">*</span>
          )}
        </label>
        <input
          className="form-control"
          value={value}
          required={schema.required && schema.required.includes(fieldForm)}
          placeholder={placeholder}
          disabled={disabled}
          onChange={this.onChange(fieldForm)}
        // ref={(c) => { console.log(c) }}
        // ref={(c) => { c.setAttribute("setCustomValidity", `${true} ? 'Confirm email does not match' : ''`); }}
        />
      </div>
    );
  }

  onCheckedButton(isActive, fieldForm) {
    this.setState(
      {
        [fieldForm]: isActive,
      },
      () => this.props.onChange(this.state)
    );
  }

  render() {
    const {
      // geofenceTypeName,
      // geofenceTypeDescription,
      name,
      description,
      nameEn,
      descriptionEn,
      nameJa,
      descriptionJa,
      geofenceTypeNav,
      sourceTypeNav,
      attachCode,
      attachInfo,
      iconSource,
      isShare,
      isHazard,
      isActive,
      partnerType,
      partnerName,
      showFormPopupPreIcon,
      chooseAttachIcon,
    } = this.state;
    const { schema } = this.props;
    let imageUrlInitial = ""

    console.log(this.state);
    console.log(this.props);

    return (
      <Suspense fallback={null}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
            {/* <Button className="btn btn-default" size="sm" >Create User</Button> */}

            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={partnerType.value}
                  label={schema.label.partnerType}
                  fieldForm={"partnerType"}
                  placeholder={""}
                  disabled={true}
                  flex={1}
                  onChange={this.onChange("partnerType")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={partnerName}
                  label={schema.label.partnerName}
                  list={schema.list.partnerName}
                  fieldForm={"partnerName"}
                  placeholder={"Select your's PartnerName"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState(
                      {
                        ["partnerName"]: selected,
                      },
                      () => this.props.onChange(this.state)
                    );
                  }}
                />
              </Col>
            </Row>

            {/* <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={geofenceTypeName}
                  label={schema.label.geofenceTypeNameTH}
                  fieldForm={"geofenceTypeName"}
                  placeholder={""}
                  flex={1}
                  onChange={this.onChange("geofenceTypeName")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={geofenceTypeDescription}
                  label={schema.label.geofenceTypeDescriptionTH}
                  fieldForm={"geofenceTypeDescription"}
                  placeholder={""}
                  flex={1}
                  onChange={this.onChange("geofenceTypeDescription")}
                />
              </Col>
            </Row> */}

            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={name}
                  label={schema.label.name}
                  fieldForm={"name"}
                  placeholder={""}
                  onKeyDown={this.keyPress}
                  // disabled={true}
                  flex={1}
                  onChange={this.onChange("name")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={description}
                  label={schema.label.description}
                  fieldForm={"description"}
                  placeholder={""}
                  // disabled={true}
                  flex={1}
                  onKeyDown={this.keyPress}
                  onChange={this.onChange("description")}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={nameEn}
                  label={schema.label.nameEn}
                  fieldForm={"nameEn"}
                  placeholder={""}
                  onKeyDown={this.keyPress}
                  // disabled={true}
                  flex={1}
                  onChange={this.onChange("nameEn")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={descriptionEn}
                  label={schema.label.descriptionEn}
                  fieldForm={"descriptionEn"}
                  placeholder={""}
                  // disabled={true}
                  flex={1}
                  onKeyDown={this.keyPress}
                  onChange={this.onChange("descriptionEn")}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={nameJa}
                  label={schema.label.nameJa}
                  fieldForm={"nameJa"}
                  placeholder={""}
                  onKeyDown={this.keyPress}
                  // disabled={true}
                  flex={1}
                  onChange={this.onChange("nameJa")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={descriptionJa}
                  label={schema.label.descriptionJa}
                  fieldForm={"descriptionJa"}
                  placeholder={""}
                  // disabled={true}
                  flex={1}
                  onKeyDown={this.keyPress}
                  onChange={this.onChange("descriptionJa")}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={isHazard}
                  label={schema.label.isHazard}
                  fieldForm={"isHazard"}
                  flex={1}
                  onClick={(isHazard, fieldForm) => {
                    this.onCheckedButton(isHazard, fieldForm);
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormRadio
                  schema={schema}
                  value={isActive}
                  label={schema.label.isActive}
                  fieldForm={"isActive"}
                  flex={1}
                  onClick={(isActive, fieldForm) => {
                    this.onCheckedButton(isActive, fieldForm);
                  }}
                />
              </Col>
            </Row>

            <Row>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={sourceTypeNav}
                  label={schema.label.sourceTypeNav}
                  list={schema.list.sourceTypeNav}
                  fieldForm={"sourceTypeNav"}
                  placeholder={"Select your's sourceTypeNav"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState(
                      {
                        ["sourceTypeNav"]: selected,
                      },
                      () => this.props.onChange(this.state)
                    );
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                {/* <Row>
                  <Col lg={12}>
                    <FormRadioCustom
                      schema={schema}
                      value={iconSource}
                      label={schema.label.iconSource}
                      radio={schema.radio.iconSource}
                      // name={schema.radio.iconSourceName}
                      fieldForm={"iconSource"}
                      flex={1}
                      onClick={(iconSource, fieldForm) => {
                        this.onCheckedButton(iconSource, fieldForm);
                      }}
                    />
                  </Col>
                </Row> */}
                <Row>
                  <Col md={4}>
                      <FormUpload
                        schema={schema}
                        fieldForm="iconFile"
                        listType="picture-card"
                        label={"geofence_type_21"}
                        endPoint={"Geofence/Files/Icon"}
                        attachCode={attachCode}
                        attachInfo={attachInfo}
                        response={(res) => {
                          console.log("RESP : ", res);
                          if (res.status) {
                            this.setState(
                              {
                                iconSource: 3,
                                attachCode: res.attachInfo.attachCode,
                                attachInfo: res.attachInfo,
                                chooseAttachIcon: {name: "", attachUrl: "", attachCode: ""}
                              },
                              () => this.props.onChange(this.state)
                            );
                          }
                        }}
                      />
                  </Col>
                  <Col md={8}>
                    <div className="form-group field field-string" style={{padding: '0 10px', flex: 1}}>
                      <label className="control-label" style={{ fontWeight: 500 }}>
                        {t('geofence_type_22')}
                        {/* {
                          schema.required && schema.required.includes(fieldForm) && [
                            <span className="text-danger">*</span>, " :"
                          ]
                        } */}
                      </label>
                      <div>
                        {
                          schema.radio.iconPresent.map(e => {
                            console.log(e)
                            return (
                              <label style={{padding: '30 30px',}}>
                                <input style={{padding: '30 30px'}} className="icon-present" type="radio" name="iconPresent" value={e.attachCode} 
                                  checked={chooseAttachIcon.attachCode == e.attachCode ? true : false}
                                  onClick={
                                    () => this.setState({
                                      iconSource: 2 ,
                                      chooseAttachIcon: chooseAttachIcon.attachCode != e.attachCode ? e : {name: "", attachUrl: "", attachCode: ""}
                                    }, () => this.props.onChange(this.state))}/>
                                <img style={{width: 60, height: 60,padding: '5 5px'}}  src={e.attachUrl}/>
                              </label>
                            )
                          })
                        }
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* {
                  iconSource == 2 && 
                  <Row>
                    <Col lg={6}>
                      <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                        <div>
                          <label className="control-label" style={{ fontWeight: 500 }}>
                            {t("Choose File")}
                          </label>

                        </div>
                        <Button onClick={() => {
                          this.props.getPersentIcon()
                          this.openModal()
                        }}>
                          <UploadOutlined /> {t("Choose File")}
                        </Button>
                      </div >
                    </Col>
                    <Col lg={6}>
                      <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                        <Upload
                          disabled={true}
                          name="avatar"
                          listType="picture-card"
                          className={this.props.className || "avatar-uploader"}
                          showUploadList={false}
                        >
                          {imageUrlInitial && <img src={imageUrlInitial} alt="avatar" style={{ width: '100%' }} />}
                        </Upload>
                      </div>
                    </Col>
                  </Row>
                    :
                    iconSource == 3 && <Row>
                      <Col lg={12}>
                        <FormUpload
                          schema={schema}
                          fieldForm="iconFile"
                          listType="picture-card"
                          label={"icon_attach_file"}
                          endPoint={"Geofence/Files/Icon"}
                          attachCode={attachCode}
                          attachInfo={attachInfo}
                          response={(res) => {
                            console.log("RESP : ", res);
                            if (res.status) {
                              this.setState(
                                {
                                  ["attachCode"]: res.attachInfo.attachCode,
                                },
                                () => this.props.onChange(this.state)
                              );
                            }
                          }}
                        />
                      </Col>
                    </Row>
                } */}
                <Modal
                  title={t("choose_icon")}
                  visible={showFormPopupPreIcon}
                  okText={t("choose")}
                  cancelText={t("cancel")}
                  onOk={() => this.setState({ attachCode: chooseAttachIcon, chooseAttachIcon: '' })}
                  okButtonProps={{ disabled: chooseAttachIcon === '' }}
                  onCancel={() => this.openModal()}
                />

                      {/* </div> */}
                    </Col>
                  </Row>


                

                
                {/* <Modal
                  title={t("choose_icon")}
                  visible={showFormPopupPreIcon}
                  okText={t("choose")}
                  cancelText={t("cancel")}
                  onOk={() => this.setState({attachCode: chooseAttachIcon.attachCode, iconUrl: chooseAttachIcon.attachUrl, chooseAttachIcon: '', showFormPopupPreIcon: !this.state.showFormPopupPreIcon}, () => {
                    this.props.onChange(this.state)
                    // imageUrlInitial = this.state.iconUrl
                  })}
                  okButtonProps={{ disabled: chooseAttachIcon === '' }}
                  onCancel={() => {
                    // this.setState({chooseAttachIcon: ''})
                    this.openModal()
                  }}
                >
                  {
                    schema.radio.iconPresent.map(e => {
                      console.log(e)
                      return (
                        <label>
                          <input className="icon-present" type="radio" name="iconPresent" value={e.attachCode} onClick={() => this.setState({chooseAttachIcon: e})}/>
                          <img style={{width: 150, height: 'auto'}}  src={e.attachUrl}/>
                        </label>
                      )
                    })
                  }
                </Modal> */}




                {/* <Row>
                  <Col lg={12}>
                    <Upload disabled={true} 
                      // name="avatar" */}
                {/* // listType="picture-card"
                      // className={this.props.className || "avatar-uploader"}
                      // showUploadList={false}
                      // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      > */}
                {/* beforeUpload={this.beforeUpload}
                      onChange={this.handleUpload}> */}
                {/* {imageUrlInitial ? <img src={imageUrlInitial} alt="avatar" style={{ width: '100%' }} /> : t("upload")}
                      <Button onClick={() => console.log('click')}>
                        <UploadOutlined/> {t("upload")}
                      </Button><br />
                    </Upload>
                  </Col>
                </Row> */}
                {/* <Row>
                  <Col lg={12}>
                    <FormUpload
                      schema={schema}
                      fieldForm="iconFile"
                      listType="picture-card"
                      label={"icon_attach_file"}
                      attachCode={attachCode}
                      attachInfo={attachInfo}
                      response={(res) => {
                        console.log("RESP : ", res);
                        if (res.status) {
                          this.setState(
                            {
                              ["attachCode"]: res.attachInfo.attachCode,
                            },
                            () => this.props.onChange(this.state)
                          );
                        }
                      }}
                    />
                  </Col>
                </Row> */}
            {/* {this.setFormUpload(attachCode, "attachCode", "icon_attach_file")} */}
            {
              // true &&
              // attachCode &&
              // <div>
              //   <br/>
              //   <SaveButton
              //     // name={t("view")}
              //     name={"view"}
              //     loading={this.props.loading}
              //     onClick={() => this.modalOpening()}
              //   />
              // </div>
            }


          </div>
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  loading: state.geofence.loading,
  presentIcon: state.geofence.presentIcon,
  // driverProfile: state.driver.driverProfile,
  // loadingCheck: state.driver.loadingCheck,
  // formAction: state.driver.formAction,
  // driverExisting: state.driver.driverExisting,
});
const mapDispatchToProps = (dispatch) => ({
  // getPresentIcon: () => dispatch(GeofenceActions.getPresentIcon()),
  // getExistingDriver: () => dispatch(DriverActions.getExistingDriver()),
  // getExistingDriver: (personalId, customerId) => dispatch(DriverActions.getExistingDriver(personalId, customerId)),
  // getDriverProfile: (personalId) => dispatch(DriverActions.getDriverProfile(personalId)),
  // setPersonalIdSelect: (personalId, action) => dispatch(DriverActions.setPersonalIdSelect(personalId, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GeofenceTypeData);


// {
//   iconSource == 2 ? <Row>
//   <Col lg={6}>
//     <div className="form-group field field-string" style={{padding: '0 10px', flex: 1}}>
//       <div>
//         {/* { */}
//         <label className="control-label" style={{ fontWeight: 500 }}>
//           {t("Choose File")}
//         </label>
            
//       </div>
//       <Button onClick={() => {
//         this.openModal()
        
//         console.log(this.state)
//         }}>
//         <UploadOutlined /> {t("Choose File")}
//       </Button>
//         {/* } */}

//       {/* <Alert
//         setting={alertSetting}
//         onConfirm={() => {
//           this.setState({ alertSetting: false })
//         }}
//         onCancel={() => {
//           alertSetting.show = false
//           this.setState({ alertSetting })
//         }}
//       /> */}
//     </div >
//   </Col>
//   <Col lg={6}>
//     <div className="form-group field field-string" style={{padding: '0 10px', flex: 1}}>
//       <Upload
//         disabled={true}
//         name="avatar"
//         listType="picture-card"
//         className={this.props.className || "avatar-uploader"}
//         showUploadList={false}
//       >
//         {this.state.iconUrl !== "" && <img src={this.state.iconUrl} alt="avatar" style={{ width: '100%' }} />}
//         {/* {imageUrlInitial ? <img src={imageUrlInitial} alt="avatar" style={{ width: '100%' }} /> : t("")} */}
//       </Upload>
//     </div>
//   </Col>
// </Row>
// : iconSource == 3 && <Row>
//   <Col lg={12}>
//     <FormUpload
//       schema={schema}
//       fieldForm="iconFile"
//       listType="picture-card"
//       label={"icon_attach_file"}
//       endPoint={ENDPOINT_BASE_URL + "Geofence/Files/Icon"}
//       attachCode={attachCode}
//       attachInfo={attachInfo}
//       response={(res) => {
//         console.log("RESP : ", res);
//         if (res.status) {
//           this.setState(
//             {
//               ["attachCode"]: res.attachInfo.attachCode,
//             },
//             () => this.props.onChange(this.state)
//           );
//         }
//       }}
//     />
//   </Col>
// </Row>
// }