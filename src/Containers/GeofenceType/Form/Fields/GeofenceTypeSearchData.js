import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import '../../../../i18n'

import { Row, ButtonGroup, Button, Col } from 'reactstrap'
import DateRangePicker from "react-bootstrap-daterangepicker";
import DataGrid, { Column, Paging, Selection, Editing } from 'devextreme-react/data-grid';
import { FilePond } from 'react-filepond';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../styles.css'
import Tabbed from '../../../../Components/Tabbed'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormSelectGroup from '../../../../Components/FormControls/FormSelectGroup'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'

import { t } from '../../../../Components/Translation'
// Define a custom component for handling the root position object ?
class GeofenceTypeSearchData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData
    };
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onCheckedButton = this.onCheckedButton.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData
    })
  }

  componentDidUpdate(prevProps) {
    let { language } = this.props
    if (prevProps.language !== language) {
    }
  }

  onChange(name, nativeElement = true) {
    return (event) => {
      let value = nativeElement ? event.target.value : event.label
      !nativeElement && this.setState({ [name + "_value"]: event.value }, () => this.props.onChange(this.state));
      this.setState({
        [name]: value
      }, () => this.props.onChange(this.state));
    };
  }

  //#region  DATE PICKER
  onChangeDate(name, value) {
    let sta = { [name]: value }
    this.setState(sta, () => this.props.onChange(this.state));
  }

  onChangeInputDate(fieldForm) {
    this.setState({
      [fieldForm]: this.state[fieldForm]
    }, () => this.props.onChange(this.state));
  }
  //#endregion

  handleInitFilePond(fieldForm) { }

  setHeaderSection(title, showLine = true) {
    return <div>
      {showLine && <div className="hr-line-dashed" />}
      <h3>{title}</h3>
      <div style={{ minHeight: '2rem' }}></div>
    </div>
  }

  setFormDatepicker(schema, value, fieldNameLabel, fieldForm, placeholder, flex) {
    // return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
    //   <label className="control-label" style={{ fontWeight: 500 }}>
    //     {v_em(t(fieldNameLabel))} {" :"}
    //     {
    //       schema.required && schema.required.includes(fieldForm) &&
    //       <span className="required">*</span>
    //     }
    //   </label>
    //   <DateRangePicker
    //     id={value}
    //     autoUpdateInput={false}
    //     locale={{ format: "DD/MM/YYYY" }}
    //     onApply={this.onChangeDate}
    //     autoApply={true}
    //     singleDatePicker
    //   >
    //     <input
    //       className="form-control"
    //       id={fieldForm}
    //       value={this.state[fieldForm]}
    //       required={schema.required && schema.required.includes(fieldForm)}
    //       placeholder={placeholder}
    //     />
    //   </DateRangePicker>
    // </div>
  }

  setFormUpload(files, fieldForm, label, DriverProfileId, AttachFileType, AttachTypeId, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>{label}</label>
      <FilePond
        ref={ref => this.pond = ref}
        name="fileUpload"
        files={files}
        server={{
          url: 'https://api-center.onelink-iot.com/v1.0.1/ecm/files?DriverProfileId=' + DriverProfileId + '&AttachFileType=' + AttachFileType + '&AttachTypeId=' + AttachTypeId,
          timeout: 7000,
          process: {
            headers: {
              "Authorization": this.props.header.idToken
            },
            onload: (response) => {
              console.log("response upload", response)
              let fileItems = JSON.parse(response)
              // fileItems = fileItems.files.map(e => {
              // delete e.destination
              // delete e.path
              // return e
              // })
              console.log('File Items', fileItems)
              let attachCode = fileItems.attachCode

              this.setState({
                filesResponse: fileItems
              }, () => this.props.onChange(this.state));
            },
            onerror: (response) => response.data,
          },
        }}
        oninit={() => this.handleInitFilePond()}
        onprocessfile={(error, file) => {
          // console.log(file.getFile())
        }}
        onupdatefiles={(fileItems) => {
          console.log('File Items', fileItems)
          // Set current file objects to this.state
          this.setState({
            [fieldForm]: fileItems,
            // filesSource: fileItems.map(fileItem => fileItem.source)
          }, () => this.props.onChange(this.state));
        }}
        labelIdle='ลากและวางไฟล์ หรือ <span className="filepond--label-action"> เลือก </span>'
      />
    </div>
  }

  onCheckedButton(isActive, fieldForm) {
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));
  }


  render() {
    const {
      ownerPartnerType,
      ownerPartnerName,
      userLevel,
      username,
      mobile,
      email,
      expired,
      locked,
      partnerType,
      partnerName,
      roleName,
      functions,
      action,
      permission,
      active,
      activeTab
    } = this.state
    const { schema, dataLogin } = this.props

    return (<div>
      <Suspense fallback={null}>
        <Tabbed
          tabPosition={'top'}
          defaultActiveKey={activeTab}
          onActive={active => {
            this.setState({
              ["activeTab"]: active
            }, () => this.props.onChange(this.state));
          }}
          tabName={[t("information"), t("role")]}
          tabPane={[
            <div>
              {dataLogin.userLevelId !== 41 && dataLogin.userLevelId !== 42 && <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                <FormSelectSearch
                  mode={"multiple"}
                  schema={schema}
                  value={ownerPartnerType}
                  label={schema.label.ownerPartnerType}
                  list={schema.list.ownerPartnerType}
                  fieldForm={"ownerPartnerType"}
                  placeholder={"ph_owner_partner_name"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["ownerPartnerType"]: selected
                    }, () => this.props.onChange(this.state));
                  }}
                />

                <FormSelectSearch
                  schema={schema}
                  value={ownerPartnerName}
                  label={schema.label.ownerPartnerName}
                  list={schema.list.ownerPartnerName}
                  fieldForm={"ownerPartnerName"}
                  placeholder={"ph_owner_partner_name"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["ownerPartnerName"]: selected
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </div>}

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                <FormSelectGroup
                  mode={"multiple"}
                  schema={schema}
                  value={userLevel}
                  label={schema.label.userLevel}
                  list={schema.list.userLevel}
                  fieldForm={"userLevel"}
                  placeholder={"ph_owner_partner_name"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["userLevel"]: selected
                    }, () => this.props.onChange(this.state));
                  }}
                />

                <FormInput
                  schema={schema}
                  value={username}
                  label={schema.label.username}
                  fieldForm={"username"}
                  placeholder={"ph_owner_partner_name"}
                  flex={1}
                  onChange={this.onChange("username")}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                <FormInput
                  schema={schema}
                  value={mobile}
                  label={schema.label.mobile}
                  fieldForm={"mobile"}
                  placeholder={"ph_owner_partner_name"}
                  flex={1}
                  onChange={this.onChange("mobile")}
                />

                <FormInput
                  schema={schema}
                  value={email}
                  label={schema.label.email}
                  fieldForm={"email"}
                  placeholder={"ph_owner_partner_name"}
                  flex={1}
                  onChange={this.onChange("email")}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                <FormRadio
                  schema={schema}
                  value={expired}
                  label={schema.label.expired}
                  fieldForm={"expired"}
                  flex={1}
                  onClick={(isActive, fieldForm) => {
                    this.onCheckedButton(isActive, fieldForm)
                  }}
                />

                <FormRadio
                  schema={schema}
                  value={locked}
                  label={schema.label.locked}
                  fieldForm={"locked"}
                  flex={1}
                  onClick={(isActive, fieldForm) => {
                    this.onCheckedButton(isActive, fieldForm)
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                <FormRadio
                  schema={schema}
                  value={active}
                  label={schema.label.active}
                  fieldForm={"active"}
                  flex={1}
                  onClick={(isActive, fieldForm) => {
                    this.onCheckedButton(isActive, fieldForm)
                  }}
                />
              </div>
            </div>
            ,// ----------------------- Search 2 -----------------------
            <div>
              {dataLogin.userLevelId !== 41 && dataLogin.userLevelId !== 42 &&
                <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                  <FormSelectSearch
                    mode={"multiple"}
                    schema={schema}
                    value={partnerType}
                    label={schema.label.partnerType}
                    list={schema.list.ownerPartnerType}
                    fieldForm={"partnerType"}
                    placeholder={"ph_owner_partner_name"}
                    flex={1}
                    onChange={(selected) => {
                      this.setState({
                        ["partnerType"]: selected
                      }, () => this.props.onChange(this.state));
                    }}
                  />

                  <FormSelectSearch
                    schema={schema}
                    value={partnerName}
                    label={schema.label.partnerName}
                    list={schema.list.partnerName}
                    fieldForm={"partnerName"}
                    placeholder={"ph_owner_partner_name"}
                    flex={1}
                    onChange={(selected) => {
                      this.setState({
                        ["partnerName"]: selected
                      }, () => this.props.onChange(this.state));
                    }}
                  />
                </div>
              }

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                <FormSelectGroup
                  mode={"multiple"}
                  schema={schema}
                  value={roleName}
                  label={schema.label.roleName}
                  list={schema.list.roleName}
                  fieldForm={"roleName"}
                  placeholder={"ph_owner_partner_name"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["roleName"]: selected
                    }, () => this.props.onChange(this.state));
                  }}
                />

                <FormSelectSearch
                  schema={schema}
                  value={functions}
                  label={schema.label.functions}
                  list={schema.list.functions}
                  fieldForm={"functions"}
                  placeholder={"ph_owner_partner_name"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["functions"]: selected
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                <FormSelectGroup
                  mode={"multiple"}
                  schema={schema}
                  value={action}
                  label={schema.label.action}
                  list={schema.list.action}
                  fieldForm={"action"}
                  placeholder={"ph_owner_partner_name"}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["action"]: selected
                    }, () => this.props.onChange(this.state));
                  }}
                />

                <FormRadio
                  schema={schema}
                  value={permission}
                  label={schema.label.permission}
                  fieldForm={"permission"}
                  flex={1}
                  onClick={(isActive, fieldForm) => {
                    this.onCheckedButton(isActive, fieldForm)
                  }}
                />
              </div>
            </div>
          ]}
        ></Tabbed>
      </Suspense>

    </div >)
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(GeofenceTypeSearchData)
