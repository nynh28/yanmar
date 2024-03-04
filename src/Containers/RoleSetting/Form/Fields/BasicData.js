import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { ButtonGroup, Button } from 'reactstrap'
import DateRangePicker from "react-bootstrap-daterangepicker";
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import Dropdown from 'react-dropdown';
import Modal from 'react-awesome-modal';
import 'react-dropdown/style.css';
import '../styles.css'
import { Popconfirm, Select } from 'antd';
import picProfile0 from './profile0.jpg'
import { t } from '../../../../Components/Translation'
import SaveButton from '../../../../Components/SaveButton'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormSelectGroup from '../../../../Components/FormControls/FormSelectGroup'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'

registerPlugin(FilePondPluginFileValidateType);

const { Option } = Select;

// Define a custom component for handling the root position object ?
class BasicData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      viewImg: false
    };
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    // console.log("componentWillReceiveProps", nextProps)

    this.setState({
      ...nextProps.formData
    })
  }

  modalOpening = (e) => this.setState(state => ({ viewImg: !state.viewImg }))

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

  handleInitFilePond() {
    // console.log("FilePond instance has initialised", this.pond);
  }

  setHeaderSection(title, showLine = true) {
    return <div>
      {showLine && <div className="hr-line-dashed" />}
      <h3>{title}</h3>
      <div style={{ minHeight: '2rem' }}></div>
    </div>
  }

  setFormInput(schema, value, fieldNameLabel, fieldForm, placeholder, disabled = false, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(fieldNameLabel)} {" :"}
        {
          schema.required && schema.required.includes(fieldForm) &&
          <span className="required">*</span>
        }
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
  }

  // setFormLabel(schema, value, fieldNameLabel, flex) {
  //   return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
  //     <label className="control-label" style={{ fontWeight: 500 }}>
  //       {v_em(t(fieldNameLabel))} {" :"}
  //     </label>
  //     <label className="form-control" style={{ fontWeight: 500, border: '#FFF', boxShadow: 'inset 0 1px 1px rgb(255, 255, 255)', backgroundColor: '#EEE', paddingTop: 8 }}>
  //       {value}
  //     </label>
  //   </div>
  // }

  // setFormDropdown(schema, value, fieldNameLabel, list, fieldForm, placeholder, disabled, flex) {
  //   return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
  //     <label className="control-label" style={{ fontWeight: 500 }}>
  //       {v_em(t(fieldNameLabel))} {" :"}
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

  setFormDatepicker(schema, value, fieldNameLabel, fieldForm, placeholder, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {t(fieldNameLabel)} {" :"}
        {
          schema.required && schema.required.includes(fieldForm) &&
          <span className="required">*</span>
        }
      </label>
      <DateRangePicker
        id={value}
        autoUpdateInput={false}
        locale={{ format: "DD/MM/YYYY" }}
        onApply={this.onChangeDate}
        autoApply={true}
        singleDatePicker
      >
        <input
          className="form-control"
          id={fieldForm}
          value={this.state[fieldForm]}
          required={schema.required && schema.required.includes(fieldForm)}
          placeholder={placeholder}
        />
      </DateRangePicker>
    </div>
  }

  setFormUpload(files, fieldForm, label, DriverProfileId, AttachFileType, AttachTypeId, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>{t(label)} {" :"}</label>
      <FilePond
        ref={ref => this.pond = ref}
        name="fileUpload"
        files={files}
        // acceptedFileTypes={['image/png', 'image/jpeg', 'image/gif']}
        server={{
          url: 'https://api-center.onelink-iot.com/v1.0.1/ecm/files',
          timeout: 7000,
          process: {
            headers: {
              'X-API-Key': "AKIAXRLQKYO37QTLBUPJHINO"
            },
            onload: (response) => {
              console.log("response upload", response)
              let fileItems = JSON.parse(response)
              // fileItems = fileItems.files.map(e => {
              //   delete e.destination
              //   delete e.path
              //   return e
              // })
              console.log('File Items', fileItems)
              let attachCode = fileItems.attachCode

              this.setState({
                filesResponse: fileItems
              }, () => this.props.onChange(this.state));
            },
            onerror: (response) => {
              console.log('error')
              return response.data
            },
          },
        }}
        oninit={() => this.handleInitFilePond()}
        onprocessfile={(error, file) => {
          console.log(error)
          // console.log(file.getFile())
        }}
        onupdatefiles={(fileItems) => {
          console.log('File Items', fileItems)

          let lnk = ''
          if (fileItems.length !== 0) {
            console.log('AAAAAA Items', fileItems[0].file)
            if (fileItems[0].file.lastModified) {
              lnk = URL.createObjectURL(fileItems[0].file)
              this.setState({
                // [fieldForm]: fileItems,
                [fieldForm]: lnk,
                // filesSource: fileItems.map(fileItem => fileItem.source)
              }, () => this.props.onChange(this.state));
            }
          } else {
            this.setState({
              // [fieldForm]: fileItems,
              [fieldForm]: lnk,
              // filesSource: fileItems.map(fileItem => fileItem.source)
            }, () => this.props.onChange(this.state));
          }

          // this.setState({
          //   // [fieldForm]: fileItems,
          //   [fieldForm]: lnk,
          //   // filesSource: fileItems.map(fileItem => fileItem.source)
          // }, () => this.props.onChange(this.state));

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

  // setFormRadio(schema, value, fieldNameLabel, fieldForm, flex) {
  //   return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
  //     <label className="control-label" style={{ fontWeight: 500 }}>
  //       {v_em(t(fieldNameLabel))} {" :"}
  //       {
  //         schema.required && schema.required.includes(fieldForm) &&
  //         <span className="required">*</span>
  //       }
  //     </label>

  //     <div>
  //       <ButtonGroup style={{ zIndex: 1 }}>
  //         <Button
  //           className='button-radio-checkbox'
  //           onClick={(e) => {
  //             this.onCheckedButton(false, fieldForm)
  //           }}
  //           active={value === false}
  //         >{v_em(t("no"))}</Button>
  //         <Button
  //           className='button-radio-checkbox'
  //           onClick={(e) => {
  //             this.onCheckedButton(true, fieldForm)
  //           }}
  //           active={value === true}
  //         >{v_em(t("yes"))}</Button>
  //       </ButtonGroup>
  //     </div>
  //   </div>
  // }

  // setFormSingleSelect(schema, value, fieldNameLabel, list, fieldForm, placeholder, disabled, flex) {

  //   return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
  //     <label className="control-label" style={{ fontWeight: 500 }}>
  //       {v_em(t(fieldNameLabel))} {" :"}
  //       {
  //         schema.required && schema.required.includes(fieldForm) &&
  //         <span className="required">*</span>
  //       }
  //     </label>
  //     <Select
  //       // mode="multiple"
  //       showSearch
  //       style={{ width: '100%' }}
  //       placeholder={placeholder}
  //       value={value}
  //       disabled={disabled}
  //       onChange={(selected) => {
  //         this.setState({
  //           [fieldForm]: selected
  //         }, () => this.props.onChange(this.state));
  //       }}
  //       filterOption={(input, option) =>
  //         option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  //       }
  //     >
  //       {
  //         list.map((item) => {
  //           return <Option key={item.key}>{item.value}</Option>
  //         })
  //       }
  //     </Select>
  //   </div>
  // }


  render() {
    const {
      ownerPartnerType,
      ownerPartner,
      userLevel,
      userToken,
      displayName,
      username,
      password,
      confirmPassword,
      mobile,
      email,
      lineId,
      expiredDate,
      loginFailedCount,
      locked,
      //unlocked button
      isActive,
      avartar,
      defaultLanguage,
      master
    } = this.state
    const { schema } = this.props


    // console.log("THIS STATE ADD : ", this.state)

    return (
      <Suspense fallback={null}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {/* {this.setFormSingleSelect(schema, ownerPartnerType, schema.label.ownerPartnerType, schema.list.ownerPartnerType, "ownerPartnerType", "Select ownerPartnerType")}
              {this.setFormSingleSelect(schema, ownerPartner, schema.label.ownerPartner, schema.list.ownerPartner, "ownerPartner", "Select ownerPartner")} */}

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
                mode={"multiple"}
                schema={schema}
                value={ownerPartner}
                label={schema.label.ownerPartner}
                list={schema.list.ownerPartner}
                fieldForm={"ownerPartner"}
                placeholder={"ph_owner_partner_name"}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    ["ownerPartner"]: selected
                  }, () => this.props.onChange(this.state));
                }}
              />

            </div>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {/* {this.setFormSingleSelect(schema, userLevel, schema.label.userLevel, schema.list.userLevel, "userLevel", "Select userLevel")} */}
              <FormSelectSearch
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
              {/* {this.setFormLabel(schema, userToken, schema.label.userToken)} */}
              <FormLabel
                schema={schema}
                value={userToken}
                label={schema.label.userToken}
                flex={1}
              />

            </div>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {/* {this.setFormInput(schema, displayName, schema.label.displayName, "displayName", "Enter your's displayName")}
            {this.setFormInput(schema, username, schema.label.username, "username", "Enter your's username")} */}

              <FormInput
                schema={schema}
                value={displayName}
                label={schema.label.displayName}
                fieldForm={"displayName"}
                placeholder={"ph_owner_partner_name"}
                flex={1}
                onChange={this.onChange("displayName")}
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
              {/* {this.setFormInput(schema, password, schema.label.password, "password", "Enter your's password")}
            {this.setFormInput(schema, confirmPassword, schema.label.confirmPassword, "confirmPassword", "Enter your's confirmPassword")} */}

              <FormInput
                schema={schema}
                value={password}
                label={schema.label.password}
                fieldForm={"password"}
                placeholder={"ph_owner_partner_name"}
                flex={1}
                onChange={this.onChange("password")}
              />

              <FormInput
                schema={schema}
                value={confirmPassword}
                label={schema.label.confirmPassword}
                fieldForm={"confirmPassword"}
                placeholder={"ph_owner_partner_name"}
                flex={1}
                onChange={this.onChange("confirmPassword")}
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
              {/* {this.setFormInput(schema, lineId, schema.label.lineId, "lineId", "Enter your's lineId")} */}
              <FormInput
                schema={schema}
                value={lineId}
                label={schema.label.lineId}
                fieldForm={"lineId"}
                placeholder={"ph_owner_partner_name"}
                flex={1}
                onChange={this.onChange("lineId")}
              />

              {/* {this.setFormDatepicker(schema, expiredDate, schema.label.expiredDate, "expiredDate", "Enter your's expiredDate")} */}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {/* {this.setFormRadio(schema, isActive, schema.label.isActive, "isActive")} */}
              <FormRadio
                schema={schema}
                value={isActive}
                label={schema.label.isActive}
                fieldForm={"isActive"}
                flex={1}
                onClick={(isActive, fieldForm) => {
                  this.onCheckedButton(isActive, fieldForm)
                }}
              />

              {/* {this.setFormSingleSelect(schema, defaultLanguage, schema.label.defaultLanguage, schema.list.defaultLanguage, "defaultLanguage", "Select defaultLanguage")} */}
              <FormSelectSearch
                mode={"multiple"}
                schema={schema}
                value={defaultLanguage}
                label={schema.label.defaultLanguage}
                list={schema.list.defaultLanguage}
                fieldForm={"defaultLanguage"}
                placeholder={"ph_owner_partner_name"}
                flex={1}
                onChange={(selected) => {
                  this.setState({
                    ["defaultLanguage"]: selected
                  }, () => this.props.onChange(this.state));
                }}
              />
            </div>

            <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
              {this.setFormUpload(avartar, "avartar", "avartar")}
              {
                // true &&
                avartar &&
                <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                  {/* <SaveButton
                  className="btn btn-default form-control"
                  name="View"
                  size="sm" style={{ marginTop: 23, backgroundColor: "#c2c2c2", color: "#FFF" }}
                  onClick={() => { console.log(avartar) }}
                /> */}

                  <button onClick={() => this.modalOpening()} type="button">View</button>
                </div>
              }
              <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
            </div>

            {/*
          {avartar && <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
            <img src={avartar}></img>
          </div>} */}

          </div>

          <Modal
            visible={this.state.viewImg}
            width="900"
            maxHeight="600"
            effect="fadeInUp"
            onClickAway={() => this.modalOpening()}
          >

            <div className="ibox-title">
              {/* <h5 style={{ fontWeight: 'bold' }}>Permission Summary</h5> */}
              <div className="ibox-tools">
                <a onClick={() => this.modalOpening()}>
                  <i className="fa fa-times"></i>
                </a>
              </div>
            </div>
            <div className="ibox-content" style={{ textAlign: 'center' }}>
              <img src={avartar} style={{ width: 'auto', height: 'auto', maxHeight: '600px', maxWidth: '100%' }}></img>
            </div>

          </Modal>
        </div >
      </Suspense>
    )
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(BasicData)
