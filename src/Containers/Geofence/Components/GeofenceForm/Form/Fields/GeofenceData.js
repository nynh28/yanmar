import React, { Component, Suspense } from "react";
import { connect } from "react-redux";
import { Row, ButtonGroup, Button, Col } from "reactstrap";
import { FilePond } from "react-filepond";
import GeofenceActions from "../../../../../../Redux/GeofenceRedux";
import "react-dropdown/style.css";
import "../styles.css";
import { Input } from "reactstrap";
import { Popconfirm, Select } from "antd";
import { t } from "../../../../../../Components/Translation";
// import SaveButton from "../../../../../../Components/SaveButton";
import FormInput from "../../../../../../Components/FormControls/FormInput";
// import FormTextArea from "../../../../../../Components/FormControls/FormTextArea";
// import FormLabel from "../../../../../../Components/FormControls/FormLabel";
import FormSelectSearch from "../../../../../../Components/FormControls/FormSelectSearch";
// import FormSelectGroup from "../../../../../../Components/FormControls/FormSelectGroup";
// import FormDatepicker from "../../../../../../Components/FormControls/FormDatepicker";
import FormRadio from "../../../../../../Components/FormControls/FormRadio";
import FormUpload from "../../../../../../Components/FormControls/FormUpload";
// import LaddaButton, { S, SLIDE_LEFT } from "react-ladda";

// import '../styles.css'

// Define a custom component for handling the root position object
class GeofenceData extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    this.state = {
      ...props.formData,
      // inputTypeChange: props.schema.inputTypeChange,
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    this.setState({
      ...nextProps.formData,
      // mode: ''
    });
  }

  modalOpening = (e) => this.setState((state) => ({ viewImg: !state.viewImg }));

  handleInitFilePond() {
    // console.log("FilePond instance has initialised", this.pond);
  }

  validate(label, value) {
    if (label === "coordinates") {
      // if(has(diffValue["" + objects[index]]["__new"][0], 'lat') && has(diffValue["" + objects[index]]["__new"][0], 'lng')){
      //   this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
      // }
      // console.log(value);
      let iNew = value.length - 1;
      let iOld = value.length - 2;
      if (value.length == 1) {
        // console.log("start");
        switch (value[iNew]) {
          case "0":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "1":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "2":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "3":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "4":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "5":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "6":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "7":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "8":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "9":
            this.setState({ [label]: "lat: " + value }, () =>
              this.props.onChange(this.state)
            );
            break;
          default:
            // console.log("not number");
            // this.bindingData("" + objects[index], "lat: "+diffValue["" + objects[index]]["__old"])
            break;
        }
      } else {
        // console.log("continue");
        let geom, old;
        // console.log(value.split(',').length)
        // console.log(value.split(',').length/2)
        // console.log(Math.floor(value.split(',').length/2))
        // console.log(Math.floor(value.split(',').length/2) % 2)
        if (value.split(",").length == 2) {
          geom = "lng: ";
        } else if (value.split(",").length % 2 == 0) {
          geom = "lng: ";
        } else if (value.split(",").length % 2 == 1) {
          geom = "lat: ";
        }
        switch (value[iNew]) {
          case "0":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "1":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "2":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "3":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "4":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "5":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "6":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "7":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "8":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case "9":
            this.setState({ [label]: value }, () =>
              this.props.onChange(this.state)
            );
            break;
          case ",":
            // console.log("key ,");
            old = value.slice(0, iNew);
            // console.log(old)
            if (value[iOld] == ".") {
              this.setState(
                { [label]: old + "0" + value[iNew] + " " + geom },
                () => this.props.onChange(this.state)
              );
              // this.bindingData("" + objects[index], diffValue["" + objects[index]]["__old"] + "0 " + diffValue["" + objects[index]]["__new"][iNew] +  geom)
            }
            // else if(value[iOld] == ":"){
            //   this.setState({ [label]: old + "0" + value[iNew] }, () => this.props.onChange(this.state));
            //   // this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
            // }
            else if (
              value[iOld] == ":" ||
              value[iOld] == " " ||
              value[iOld] == ""
            ) {
              this.setState(
                { [label]: old + "0" + value[iNew] + " " + geom },
                () => this.props.onChange(this.state)
              );
            } else {
              this.setState({ [label]: old + value[iNew] + " " + geom }, () =>
                this.props.onChange(this.state)
              );
            }

            break;
          case ".":
            // console.log('key .')
            old = value.slice(0, iNew);
            if (value[iOld] == ".") {
              // console.log("not key .");
              // this.setState({ [label]: old + "0" + value[iNew] }, () => this.props.onChange(this.state));
              // this.bindingData("" + objects[index], diffValue["" + objects[index]]["__old"])
            } else if (value.split(".").length > value.split(":").length) {
              // console.log("key . more");
              // this.bindingData("" + objects[index], diffValue["" + objects[index]]["__old"])
            } else if (
              value[iOld] == ":" ||
              value[iOld] == " " ||
              value[iOld] == ""
            ) {
              this.setState({ [label]: old + "0" + value[iNew] }, () =>
                this.props.onChange(this.state)
              );
              // this.setState({ [label]: old + "0" + value[iNew] }, () => this.props.onChange(this.state));
            } else {
              // console.log(value[iOld])
              // console.log(value[iOld] == ":" || value[iOld] == " " || value[iOld] == "")
              this.setState({ [label]: value }, () =>
                this.props.onChange(this.state)
              );
              // this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
            }
            // this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
            break;
          default:
            // console.log("cant key this value");
            // this.bindingData("" + objects[index], diffValue["" + objects[index]]["__old"])
            break;
        }

        // if(diffValue["" + objects[index]]["__old"] == "" && typeof diffValue["" + objects[index]]["__new"] == 'number' || diffValue["" + objects[index]]["__new"] == '.'){
        //   this.bindingData("" + objects[index], "lat: "+diffValue["" + objects[index]]["__new"])
        // }
        // else if (diffValue["" + objects[index]]["__old"] == "" && diffValue["" + objects[index]]["__new"] == ',') {
        //   this.bindingData("" + objects[index], "lat: ")
        // }
        // else if (diffValue["" + objects[index]]["__new"] === "," && diffValue["" + objects[index]]["__old"].split(',').length % 2 !== 0) {
        //   this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"]+ " lat:")
        // }
        // else if (diffValue["" + objects[index]]["__new"] === "," && diffValue["" + objects[index]]["__old"].split(',').length % 2 !== 1) {
        //   this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"]+ " lng:")
        // }
        // else if (diffValue["" + objects[index]]["__new"] !== "" ) {
        //   this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"]+ " lng:")
        // }
      }
    }
  }

  keyPress(e){
    if(e.keyCode == 13){
      e.preventDefault();
      // console.log('press enter value', e.target.value);
       // put the login here
    }
 }

  onChange(name, nativeElement = true) {
    // console.log(this.state)
    return (event) => {
      this.keyPress(event)
      // if (name == 'coordinates') {
      // this.validate(name,event.target.value)
      // }
      // else{
      // console.log("OnChange Event---------",event);
      let value = nativeElement ? event.target.value : event.label;
      // console.log(event.target);
      // console.log(event.label)
      // console.log("OnChange Event---------",value);
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

  setHeaderSection(title, showLine = true) {
    return (
      <div>
        {showLine && <div className="hr-line-dashed" />}
        <h3>{title}</h3>
        <div style={{ minHeight: "2rem" }}></div>
      </div>
    );
  }

  setFormLabel(schema, value, fieldNameLabel, flex) {
    return (
      <div
        className="form-group field field-string"
        style={{ padding: "0 10px", flex: flex || 1 }}
      >
        <label className="control-label" style={{ fontWeight: 500 }}>
          {schema.label && fieldNameLabel + " : "}
        </label>
        <label
          className="form-control"
          style={{
            fontWeight: 500,
            border: "#FFF",
            boxShadow: "inset 0 1px 1px rgb(255, 255, 255)",
            backgroundColor: "#EEE",
            paddingTop: 8,
          }}
        >
          {value}
        </label>
      </div>
    );
  }

  setFormInput(
    schema,
    value,
    fieldNameLabel,
    fieldForm,
    placeholder,
    disabled,
    flex
  ) {
    return (
      <div
        className="form-group field field-string"
        style={{ padding: "0 10px", flex: flex || 1 }}
      >
        <label className="control-label" style={{ fontWeight: 500 }}>
          {schema.label && fieldNameLabel + " :"}
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
        />
      </div>
    );
  }

  setFormIntInput(
    schema,
    value,
    fieldNameLabel,
    fieldForm,
    placeholder,
    disabled,
    flex
  ) {
    return (
      <div
        className="form-group field field-string"
        style={{ padding: "0 10px", flex: flex || 1 }}
      >
        <label className="control-label" style={{ fontWeight: 500 }}>
          {schema.label && fieldNameLabel + " :"}
          {schema.required && schema.required.includes(fieldForm) && (
            <span className="required">*</span>
          )}
        </label>
        <input
          className="form-control"
          value={value}
          required={schema.required && schema.required.includes(fieldForm)}
          type="number"
          placeholder={placeholder}
          disabled={disabled}
          onChange={this.onChange(fieldForm)}
        />
      </div>
    );
  }

  setFormTextArea(
    schema,
    field,
    fieldNameLabel,
    fieldForm,
    placeholder,
    disabled,
    flex
  ) {
    return (
      <div
        className="form-group field field-string"
        style={{ padding: "0 10px", flex: flex || 1 }}
      >
        <label className="control-label" style={{ fontWeight: 500 }}>
          {schema.label && fieldNameLabel + " :"}
          {schema.required && schema.required.includes(field) && (
            <span className="required">*</span>
          )}
        </label>
        <Input
          type="textarea"
          className="form-control"
          disabled={disabled}
          // value={field}
          required={schema.required && schema.required.includes(field)}
          placeholder={placeholder}
          onChange={this.onChange(fieldForm)}

        />
      </div>
    );
  }

  // setFormDropdown(schema, value, fieldNameLabel, list, fieldForm, placeholder, disabled, flex) {
  //   return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
  //     <label className="control-label" style={{ fontWeight: 500 }}>
  //       {schema.label && fieldNameLabel + " :"}
  //       {
  //         schema.required && schema.required.includes(fieldForm) &&
  //         <span className="required">*</span>
  //       }
  //     </label>
  //     <Dropdown
  //       className="dropdownStyle"
  //       options={schema.list && list}
  //       onChange={this.onChange(fieldForm, false)}
  //       value={value}
  //       disabled={disabled}
  //       placeholder={placeholder} />
  //   </div>
  // }
  // }

  setFormUpload(
    files,
    fieldForm,
    label,
    DriverProfileId,
    AttachFileType,
    AttachTypeId,
    flex
  ) {
    let attachCode = "";

    return (
      <div
        className="form-group field field-string"
        style={{ padding: "0 10px", flex: flex || 1 }}
      >
        <label className="control-label" style={{ fontWeight: 500 }}>
          {label}
        </label>
        <FilePond
          ref={(ref) => (this.pond = ref)}
          name="fileUpload"
          files={files}
          server={{
            url:
              "https://api-center.onelink-iot.com/v1.0.1/ecm/files?AttachFileType=12",
            timeout: 30000,
            process: {
              headers: {
                Authorization: this.props.header.idToken,
              },
              onload: (response) => {
                // console.log("response upload", response);
                // let fileItems = JSON.parse(response)
                let fileItems = response + "";
                // fileItems = fileItems.files.map(e => {
                // delete e.destination
                // delete e.path
                // return e
                // })
                // console.log("File Items", fileItems);
                // attachCode = fileItems.attachCode

                this.setState(
                  {
                    filesResponse: fileItems,
                  },
                  () => this.props.onChange(this.state)
                );
              },
              onerror: (response) => response.data,
            },
          }}
          oninit={() => this.handleInitFilePond()}
          onprocessfile={(error, file) => {
            // console.log(file.getFile())
          }}
          onupdatefiles={(fileItems) => {
            // console.log("File Items", fileItems);
            // Set current file objects to this.state
            this.setState(
              {
                [fieldForm]: fileItems,
                // [fieldForm]: attachCode,
                // filesSource: fileItems.map(fileItem => fileItem.source)
              },
              () => this.props.onChange(this.state)
            );
          }}
          labelIdle='ลากและวางไฟล์ หรือ <span className="filepond--label-action"> เลือก </span>'
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

  setFormRadio(schema, value, fieldNameLabel, fieldForm, flex) {
    return (
      <div
        className="form-group field field-string"
        style={{ padding: "0 10px", flex: flex || 1 }}
      >
        <label className="control-label" style={{ fontWeight: 500 }}>
          {schema.label && fieldNameLabel + " :"}
          {schema.required && schema.required.includes(fieldForm) && (
            <span className="required">*</span>
          )}
        </label>

        <div>
          <ButtonGroup style={{ zIndex: 1 }}>
            <Button
              className="button-radio-checkbox"
              onClick={(e) => {
                this.onCheckedButton(false, fieldForm);
              }}
              active={value === false}
            >
              No
            </Button>
            <Button
              className="button-radio-checkbox"
              onClick={(e) => {
                this.onCheckedButton(true, fieldForm);
              }}
              active={value === true}
            >
              Yes
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }

  render() {
    const {
      partnerType,
      partnerName,
      // geofenceName,
      // geofenceDescription,
      name,
      description,
      nameEn,
      descriptionEn,
      nameJa,
      descriptionJa,
      geofenceTypeNav,
      isShare,
      isHazard,
      isActive,
      geomTypeNav,
      coordinates,
      iconPoint,
      iconSource,
      radius,
      chooseAttachIcon,
      attachCode,
      attachInfo,
    } = this.state;
    const { schema } = this.props;

    return (
      <Suspense fallback={null}>
        <div style={{ display: "flex", flexDirection: "row", marginBottom: 0 }}>
          <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
            <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={partnerType}
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
                      () => {
                        // console.log(selected)
                        this.props.onChange(this.state)
                      }
                    );
                  }}
                />
              </Col>
            </Row>

            {/* <Row>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={geofenceName}
                  label={schema.label.geofenceName}
                  fieldForm={"geofenceName"}
                  placeholder={""}
                  onKeyDown={this.keyPress}
                  // disabled={true}
                  flex={1}
                  onChange={this.onChange("geofenceName")}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={geofenceDescription}
                  label={schema.label.geofenceDescription}
                  fieldForm={"geofenceDescription"}
                  placeholder={""}
                  // disabled={true}
                  flex={1}
                  onKeyDown={this.keyPress}
                  onChange={this.onChange("geofenceDescription")}
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
                <Row>
                  <Col lg={12} md={12}>
                    <FormSelectSearch
                      ref={(e) => this.props.createRef(e)}
                      mode={"single"}
                      schema={schema}
                      value={geofenceTypeNav}
                      // label={schema.label.geofenceTypeNav}
                      id={"geofenceTypeNav"}
                      label={schema.label.geofenceTypeNav}
                      list={schema.list.geofenceTypeNav}
                      fieldForm={"geofenceTypeNav"}
                      placeholder={"Select your's Group Type"}
                      flex={1}
                      onChange={(selected) => {
                        this.setState(
                          {
                            ["geofenceTypeNav"]: selected,
                          },
                          () => this.props.onChange(this.state)
                        );
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={4} md={12}>
                    <FormRadio
                      schema={schema}
                      value={isActive}
                      label={schema.label.isActive}
                      fieldForm={"isActive"}
                      flex={3}
                      onClick={(isActive, fieldForm) => {
                        this.onCheckedButton(isActive, fieldForm);
                      }}
                    />
                  </Col>
                  <Col lg={4} md={12}>
                    <FormRadio
                      schema={schema}
                      value={isHazard}
                      label={schema.label.isHazard}
                      fieldForm={"isHazard"}
                      flex={3}
                      onClick={(isHazard, fieldForm) => {
                        this.onCheckedButton(isHazard, fieldForm);
                      }}
                    />
                  </Col>
                  <Col lg={4} md={12}>
                    <FormRadio
                      schema={schema}
                      value={isShare}
                      label={schema.label.isShare}
                      fieldForm={"isShare"}
                      flex={3}
                      onClick={(isShare, fieldForm) => {
                        this.onCheckedButton(isShare, fieldForm);
                      }}
                    />
                  </Col>

                </Row>
                <Row>
                  <Col lg={12} md={12}>
                    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                      <label style={{color: 'red'}}>{t("geofence_21")}</label> {t("geofence_22")}
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={6} md={12}>
                <Row>
                  <Col md={4}>
                  <FormUpload
                        schema={schema}
                        fieldForm="iconFile"
                        listType="picture-card"
                        label={"geofence_23"}
                        endPoint={"Geofence/Files/Icon"}
                        attachCode={attachCode}
                        attachInfo={attachInfo}
                        response={(res) => {
                          // console.log("RESP : ", res);
                          if (res.status) {
                            this.setState(
                              {
                                iconSource: 3,
                                attachInfo: res.attachInfo,
                                attachCode: res.attachInfo.attachCode,
                                chooseAttachIcon: {name: "", attachUrl: "", attachCode: ""}
                              },
                              () => this.props.onChange(this.state)
                            );
                          }
                        }}
                      />
                  </Col>
                {/* </Row>
                <Row> */}
                  <Col md={8}>
                    <div className="form-group field field-string" style={{padding: '0 10px', flex: 1}}>
                      <label className="control-label" style={{ fontWeight: 500 }}>
                        {t('geofence_24')}
                        {/* {
                          schema.required && schema.required.includes(fieldForm) && [
                            <span className="text-danger">*</span>, " :"
                          ]
                        } */}
                      </label>
                      <div>
                        {/* {
                          schema.icon.attachCode != 0 &&
                          <label style={{padding: '30 30px',}}>
                            <input style={{padding: '30 30px'}} className="icon-present" type="radio" name="iconPresent" value={schema.icon.attachCode}
                              checked={chooseAttachIcon.attachCode == schema.icon.attachCode ? true : false}
                              onClick={
                                () => this.setState({
                                  iconSource: 2 ,
                                  chooseAttachIcon: chooseAttachIcon.attachCode != schema.icon.attachCode ? {name: schema.icon.fileName, attachUrl: schema.icon.fileUrl, attachCode: schema.icon.attachCode} : {name: "", attachUrl: "", attachCode: ""},
                                }, () => this.props.onChange(this.state))}/>
                            <img style={{width: 60, height: 60,padding: '5 5px'}}  src={schema.icon.fileUrl}/>
                        </label>
                        } */}
                         {
                          schema.radio.iconPresent.map(e => {
                            // console.log(e)
                            return (
                              <label style={{padding: '30 30px',}}>
                                <input style={{padding: '30 30px'}} className="icon-present" type="radio" name="iconPresent" value={e.attachCode}
                                  checked={chooseAttachIcon.attachCode == e.attachCode ? true : false}
                                  onClick={
                                    () => this.setState({
                                      iconSource: chooseAttachIcon.attachCode != e.attachCode ? 2 : 1 ,
                                      chooseAttachIcon: chooseAttachIcon.attachCode != e.attachCode ? e : {name: "", attachUrl: null, attachCode: ""}
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
                <Row>
                  <Col lg={12}>
                    <div className="form-group field field-string" style={{padding: '0 10px', flex: 1}}>
                      <Button
                        style={{
                          backgroundColor: "#1ab394",
                          borderRadius: 2.5,
                          // marginRight: 10,
                          // marginTop: 25,
                        }}
                        disabled={geofenceTypeNav == '' || geofenceTypeNav == undefined}
                        onClick={() => {
                          // console.log(schema)
                          this.setState({
                            iconSource: 1,
                            chooseAttachIcon: {name: "", attachUrl: "", attachCode: ""},
                            attachInfo: {
                              fileName: "",
                              fileUrl: schema.list.geofenceTypeNav.find((e) => e.key == geofenceTypeNav).iconUrl,
                              attachCode: ""
                            },
                            attachCode: schema.icon.attachCode
                          }, () => {
                            // console.log(this.state.attachInfo)
                            this.props.onChange(this.state)})
                        }
                        }
                      >
                        <div
                          style={{ paddingLeft: 'cal(10vw - 100)', paddingRight: 'cal(10vw - 100px)', color: "white" }}
                        >
                          {t("geofence_25")}
                        </div>
                      </Button>
                    </div>
                  </Col>
                </Row>

              </Col>
            </Row>

            {/* <br/> */}

            <Row>
              <Col lg={6} md={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={geomTypeNav}
                  label={schema.label.geomTypeNav}
                  // label={"Shape"}
                  list={schema.list.geomTypeNav}
                  fieldForm={"geomTypeNav"}
                  placeholder={"Select your's geomTypeNav"}
                  flex={1}
                  // disabled={true}
                  onChange={(selected) => {
                    this.setState(
                      {
                        ["geomTypeNav"]: selected,
                      }
                      // , () => this.props.onChange(this.state)
                    );
                  }}
                />
              </Col>
              <Col lg={6} md={12}>
                <FormInput
                  schema={schema}
                  value={radius}
                  label={schema.label.radius}
                  fieldForm={"radius"}
                  // disabled={true}
                  placeholder={""}
                  flex={1}
                  onKeyDown={this.keyPress}
                  onChange={(e) => this.setState({ radius: e.target.value })}
                />
              </Col>
            </Row>
            <Row>
              <Col lg={10} md={12}>
                <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                  <label className="control-label" style={{ fontWeight: 500 }}>
                    {t(schema.label.coordinates)}
                    {schema.required &&
                      schema.required.includes("coordinates") && [
                        <span className="text-danger">*</span>,
                        " :",
                      ]}
                  </label>
                  <textarea
                    // type={text}
                    className="form-control"
                    value={coordinates}
                    required={
                      schema.required && schema.required.includes("coordinates")
                    }
                    // placeholder={t(arg.placeholder)}
                    disabled={false}
                    // onChange={arg.onChange}
                    onChange={(e) => {
                      this.setState({ coordinates: e.target.value });
                      if (e.target.value !== "") {
                        e.target.setCustomValidity("");
                      }
                    }}
                    onInvalid={(e) => {
                      // console.log("onInvalid : ", e)
                      if (e.target.value === "") {
                        e.target.setCustomValidity(t("invalid_field_required"));
                      } else {
                        e.target.setCustomValidity("");
                      }
                    }}
                  />
                </div>
              </Col>
              <Col lg={2} md={12}>
                <div className="hidden-md hidden-sm hidden-xs" style={{height: 25}}>
                  &nbsp;
                </div>
                  <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                    <Button
                      style={{
                        backgroundColor: "#1ab394",
                        borderRadius: 2.5,
                        // marginRight: 10,
                        // marginTop: 25,
                      }}
                      onClick={() =>
                        this.props.onChange({
                          type: this.state.geomTypeNav,
                          coordinates: this.state.coordinates,
                          radius: this.state.radius,
                          mode: 'key'
                        })
                      }
                    >
                      <div
                        style={{ paddingLeft: 'cal(10vw - 100)', paddingRight: 'cal(10vw - 100px)', color: "white" }}
                      >
                        {t("geofence_29")}
                      </div>
                    </Button>
                  </div>

              </Col>
            </Row>




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
  getDropdownGeofenceType: (id) => dispatch(GeofenceActions.getDropdownGeofenceType(id)),
  createRef: (ref) => dispatch(GeofenceActions.createRef(ref))
  // getExistingDriver: (personalId, customerId) => dispatch(DriverActions.getExistingDriver(personalId, customerId)),
  // getDriverProfile: (personalId) => dispatch(DriverActions.getDriverProfile(personalId)),
  // setPersonalIdSelect: (personalId, action) => dispatch(DriverActions.setPersonalIdSelect(personalId, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GeofenceData);
