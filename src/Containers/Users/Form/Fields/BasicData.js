import React, { Component } from 'react'
import { connect } from 'react-redux'
import DriverActions from '../../../../Redux/DriverRedux'
import { Row, ButtonGroup, Button, Col } from 'reactstrap'
import DateRangePicker from "react-bootstrap-daterangepicker";
import DataGrid, { Column, Paging, Selection, Editing } from 'devextreme-react/data-grid';
import { FilePond } from 'react-filepond';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../styles.css'


import picProfile0 from './profile0.jpg'

// Define a custom component for handling the root position object ?
class BasicData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData
    };
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData
    })
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

  handleInitFilePond(fieldForm) {

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
        {schema.label && fieldNameLabel + " :"}
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
        onChange={this.onChange(fieldForm)} />
    </div>
  }

  setFormLabel(schema, value, fieldNameLabel, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " : "}
      </label>
      <label className="form-control" style={{ fontWeight: 500, border: '#FFF', boxShadow: 'inset 0 1px 1px rgb(255, 255, 255)', backgroundColor: '#EEE', paddingTop: 8 }}>
        {value}
      </label>
    </div>
  }

  setFormDropdown(schema, value, fieldNameLabel, list, fieldForm, placeholder, disabled, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " :"}
        {
          schema.required && schema.required.includes(fieldForm) &&
          <span className="required">*</span>
        }
      </label>
      <Dropdown
        className="dropdownStyle"
        options={schema.list && list}
        onChange={this.onChange(fieldForm, false)}
        value={value}
        disabled={disabled}
        placeholder={placeholder} />
    </div>
  }

  setFormDatepicker(schema, value, fieldNameLabel, fieldForm, placeholder, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " :"}
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

  setFormRedio(schema, value, fieldNameLabel, fieldForm, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " :"}
        {
          schema.required && schema.required.includes(fieldForm) &&
          <span className="required">*</span>
        }
      </label>

      <div>
        <ButtonGroup style={{ zIndex: 1 }}>
          <Button
            className='button-radio-checkbox'
            onClick={(e) => {
              this.onCheckedButton(false, fieldForm)
            }}
            active={value === false}
          >No</Button>
          <Button
            className='button-radio-checkbox'
            onClick={(e) => {
              this.onCheckedButton(true, fieldForm)
            }}
            active={value === true}
          >Yes</Button>
        </ButtonGroup>
      </div>
    </div>
  }


  render() {
    const {
      userLevelNav,
      ownerPartnerNav,
      username,
      password,
      displayName,
      email,
      mobile,
      lineId,
      expiredDate,
      avatar
    } = this.state
    const { schema } = this.props

    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 2 }}>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
            {this.setFormDropdown(schema, userLevelNav, schema.label.userLevelNav, schema.list.userLevelNav, "userLevelNav", "Select User Level")}
            {this.setFormDropdown(schema, ownerPartnerNav, schema.label.ownerPartnerNav, schema.list.ownerPartnerNav, "ownerPartnerNav", "Select Owner Partner", schema.list.ownerPartnerNav.length > 0 ? false : true)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
            {this.setFormInput(schema, username, schema.label.username, "username", "Enter your's username")}
            {this.setFormInput(schema, password, schema.label.password, "password", "Enter your's password")}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
            {this.setFormInput(schema, displayName, schema.label.displayName, "displayName", "Enter your's Display Name")}
            {this.setFormInput(schema, lineId, schema.label.lineId, "lineId", "Enter your's Line ID")}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
            {this.setFormInput(schema, mobile, schema.label.mobile, "mobile", "Enter your's Mobile")}
            {this.setFormInput(schema, email, schema.label.email, "email", "Enter your's Email")}
          </div>

          <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
            {this.setFormDatepicker(schema, expiredDate, schema.label.expiredDate, "expiredDate", "Enter your's expiredDate")}
            {this.setFormUpload(avatar, "avatar", "Avatar File")}
          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header
});
const mapDispatchToProps = (dispatch) => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(BasicData)
