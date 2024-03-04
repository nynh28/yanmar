import React, { Component } from 'react'
import { connect } from 'react-redux'
import DriverActions from '../../../../Redux/DriverRedux'
import { Row, ButtonGroup, Button, Col } from 'reactstrap'
import DateRangePicker from "react-bootstrap-daterangepicker";
import DataGrid, { Column, Paging, Selection, Editing, Lookup } from 'devextreme-react/data-grid';
import { FilePond } from 'react-filepond';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
// import '../styles.css'
import Tabbed from '../../../../Components/Tabbed'
import BoxCollaps from '../../../../Components/BoxCollaps'
import SaveButton from '../../../../Components/SaveButton'
import picProfile0 from './profile0.jpg'

import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import FormUpload from '../../../../Components/FormControls/FormUpload'
import { t } from '../../../../Components/Translation'

// Define a custom component for handling the root position object ?
class BasicData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      inputTypeChange: props.schema.inputTypeChange,
    };

    this.getExistingDriver = this.getExistingDriver.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onRowUpdating = this.onRowUpdating.bind(this);
    this.onRowUpdated = this.onRowUpdated.bind(this);
    this.onRowRemoving = this.onRowRemoving.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log("CHANGE componentWillReceiveProps")
    this.setState({
      ...nextProps.formData,
      inputTypeChange: nextProps.schema.inputTypeChange,
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

  onChangeDate(event, picker) {
    let value = picker.startDate.format("DD/MM/YYYY")
    this.setState({
      [event.target.children[0].id]: value
    }, () => this.props.onChange(this.state));

    this.setState({ [event.target.children[0].id]: picker.startDate.format("DD/MM/YYYY") })
  }
  onChangeInputDate(fieldForm) {
    this.setState({
      [fieldForm]: this.state[fieldForm]
    }, () => this.props.onChange(this.state));
  }

  //#endregion

  handleInitFilePond(e) {


  }

  setHeaderSection(title, showLine = true) {
    return <div>
      {showLine && <div className="hr-line-dashed" />}
      <h3>{title}</h3>
      <div style={{ minHeight: '2rem' }}></div>
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
    let attachCode = ""

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
              attachCode = fileItems.attachCode

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
            // [fieldForm]: attachCode,
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



  getExistingDriver(value) {
    // 3160400394808
    if (value !== "") {
      this.props.getExistingDriver(value, "")
      this.props.setPersonalIdSelect(value, this.props.formAction.action)
    }
  }

  componentWillMount() {
    // this.props.getExistingDriver(3160400394808, "")
  }

  onRowUpdating(e) {
    console.log("onRowUpdating", e)
    e.cancel = true

    // this.setState({
    //   [fieldForm]: isActive
    // }, () => this.props.onChange(this.state));


  }
  onRowUpdated(e) {
    console.log("onRowUpdated", e)
    e.cancel = true
  }


  onRowUpdating(e) {
    e.cancel = false
    console.log("onRowUpdating", e)

  }
  onRowRemoving(e) {
    console.log("onRowRemoving", e)
    e.cancel = true
  }

  onRowInserting(e) {
    console.log("onRowInserting", e)
    e.cancel = true

    let { drivers } = this.state
  }

  render() {
    const {
      personalID, prefix, firstname, lastname, nickname, personalCard, lastUpdated,
      houseNo, villageNo, building, roomNo, soi, road,
      villageName, subDistrict, district, province, country,
      postalCode, phone1, ext1, phone2, ext2, houseNo_current,
      villageNo_current, building_current, roomNo_current, soi_current, road_current,
      villageName_current, subDistrict_current, district_current, province_current, country_current,
      postalCode_current, phone1_current, ext1_current, phone2_current, ext2_current,
      userName, mobile, email, lineId, employeeCode, displayName, department, position, startDate, endDate,
      cardType, cardNo, expireedDate, description, personalCardUpload, FileUpload,
      inputTypeChange, driverProfileCards, drivers, driverFile, isCurrentSameOfficial, intCustId, isActive,
      licenseData
    } = this.state
    const { schema, driverExisting, formAction, loadingCheck, redio } = this.props

    // console.log("BasicData", schema)
    // console.log("licenseData", licenseData)
    // console.log("a", schema.label.licenseData.items.label.cardType)
    // console.log("b", schema.label.licenseData.items.label.cardNo)

    return (
      <Tabbed
        tabName={[t('information'), t('address'), t('user'), t('license_card'), t('employee')]}
        tabPane={[
          // Driver Information Tab
          <div>
            {
              this.props.formAction.action === "add" &&
              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormDropdown(schema, intCustId, schema.label.intCustId, schema.list.intCustId, "intCustId", "Select your's Driver's Customer")}
                <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
              </div>
            }

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                {this.setFormInput(schema, personalID, schema.label.personalID, "personalID", '', formAction.action === "edit" && true, 6)}
                <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                  <SaveButton
                    className="btn btn-default form-control"
                    loading={this.props.loadingCheck}
                    name="Check"
                    size="sm" style={{ marginTop: 23, backgroundColor: "#c2c2c2", color: "#FFF" }}
                    onClick={() => {
                      this.getExistingDriver(personalID)
                    }}
                  />
                </div>
              </div>
              <div className="form-group field field-string" style={{ flex: 1 }}>
                {this.setFormInput(schema, nickname, schema.label.nickname, "nickname", "Enter your's Driver's Nickname")}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                {/* {this.setFormInput(schema, prefix, schema.label.prefix, "prefix", 'Prefix Name', false, 1)}
                {this.setFormInput(schema, firstname, schema.label.firstname, "firstname", "Enter your's Driver's Name", false, 3)}
                {this.setFormInput(schema, lastname, schema.label.lastname, "lastname", "Enter your's Driver's Last Name", false, 3)} */}


                <div className="form-group field field-string" style={{ flex: 1 }}>
                  <label style={{ fontWeight: 500, padding: '0 10px' }}>Driver's Name - Last Name : </label>
                  <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                      <input
                        type="text"
                        className="form-control" value={prefix}
                        required={schema.required && schema.required.includes('prefix')}
                        onChange={this.onChange("prefix")}
                        placeholder="Prefix" />
                    </div>

                    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 3 }}>
                      <input
                        type="text"
                        className="form-control" value={firstname}
                        required={schema.required && schema.required.includes('firstname')}
                        onChange={this.onChange("firstname")}
                        placeholder="Enter your's Driver's Name" />
                    </div>

                    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 3 }}>
                      <input
                        type="text"
                        className="form-control" value={lastname}
                        required={schema.required && schema.required.includes('lastname')}
                        onChange={this.onChange("lastname")}
                        placeholder="Enter your's Driver's Last Name" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-group field field-string" style={{ flex: 1 }}>
                {this.setFormUpload(personalCard, "personalCard", "Personal Card", 1, 6, 1)}
              </div>
            </div>
          </div >,

          // Address Tab
          <div>
            <BoxCollaps boxid={1} title={'Official Address'}>
              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormDropdown(schema, country, schema.label.country, schema.list.country, "country", "Select your's Driver's Country")}
                <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, houseNo, schema.label.houseNo, "houseNo", "Enter your's Driver's House No.")}
                {this.setFormInput(schema, villageNo, schema.label.villageNo, "villageNo", "Enter your's Driver's Village No.")}
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, building, schema.label.building, "building", "Enter your's Driver's Building")}
                {this.setFormInput(schema, roomNo, schema.label.roomNo, "roomNo", "Enter your's Driver's Room No.")}
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, soi, schema.label.soi, "soi", "Enter your's Driver's Soi")}
                {this.setFormInput(schema, road, schema.label.road, "road", "Enter your's Driver's Road")}
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, villageName, schema.label.villageName, "villageName", "Enter your's Driver's Village Name")}
                {
                  inputTypeChange.country === "select" ?
                    this.setFormDropdown(schema, subDistrict, schema.label.subDistrict, schema.list.subDistrict, "subDistrict", "Select your's Driver's Sub District") :
                    this.setFormInput(schema, subDistrict, schema.label.subDistrict, "subDistrict", "Enter your's Driver's Sub District")
                }
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {
                  inputTypeChange.country === "select" ?
                    this.setFormDropdown(schema, district, schema.label.district, schema.list.district, "district", "Select your's Driver's District")
                    : this.setFormInput(schema, district, schema.label.district, "district", "Enter your's Driver's District")
                }
                {
                  inputTypeChange.country === "select" ?
                    this.setFormDropdown(schema, province, schema.label.province, schema.list.province, "province", "Select your's Driver's Province")
                    : this.setFormInput(schema, province, schema.label.province, "province", "Enter your's Driver's Province")
                }
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, postalCode, schema.label.postalCode, "postalCode", "Enter your's Driver's Postal Code")}
                <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, phone1, schema.label.phone1, "phone1", "Enter your's Driver's Phone Number", false, 3)}
                {this.setFormInput(schema, ext1, schema.label.ext1, "ext1", '', false, 1)}
                {this.setFormInput(schema, phone2, schema.label.phone2, "phone2", "Enter your's Driver's Phone Number", false, 3)}
                {this.setFormInput(schema, ext2, schema.label.ext2, "ext2", '', false, 1)}
              </div>
            </BoxCollaps>

            <BoxCollaps boxid={2} title={'Current Address'}>
              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormRedio(schema, isCurrentSameOfficial, schema.label.isCurrentSameOfficial, "isCurrentSameOfficial")}
                <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormDropdown(schema, country_current, schema.label.country_current, schema.list.country_current, "country_current", "Select your's Driver's Country", isCurrentSameOfficial)}
                <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, houseNo_current, schema.label.houseNo_current, "houseNo_current", "Enter your's Driver's House No.", isCurrentSameOfficial)}
                {this.setFormInput(schema, villageNo_current, schema.label.villageNo_current, "villageNo_current", "Enter your's Driver's Village No.", isCurrentSameOfficial)}
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, building_current, schema.label.building_current, "building_current", "Enter your's Driver's Building", isCurrentSameOfficial)}
                {this.setFormInput(schema, roomNo_current, schema.label.roomNo_current, "roomNo_current", "Enter your's Driver's Room No.", isCurrentSameOfficial)}
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, soi_current, schema.label.soi_current, "soi_current", "Enter your's Driver's Soi", isCurrentSameOfficial)}
                {this.setFormInput(schema, road_current, schema.label.road_current, "road_current", "Enter your's Driver's Road", isCurrentSameOfficial)}
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, villageName_current, schema.label.villageName_current, "villageName_current", "Enter your's Driver's Village Name", isCurrentSameOfficial)}
                {
                  inputTypeChange.country_current === "select" ?
                    this.setFormDropdown(schema, subDistrict_current, schema.label.subDistrict_current, schema.list.subDistrict_current, "subDistrict_current", "Select your's Driver's Sub District", isCurrentSameOfficial)
                    : this.setFormInput(schema, subDistrict_current, schema.label.subDistrict_current, "subDistrict_current", "Enter your's Driver's Sub District", isCurrentSameOfficial)
                }
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {
                  inputTypeChange.country_current === "select" ?
                    this.setFormDropdown(schema, district_current, schema.label.district_current, schema.list.district_current, "district_current", "Select your's Driver's District", isCurrentSameOfficial)
                    : this.setFormInput(schema, district_current, schema.label.district_current, "district_current", "Enter your's Driver's District", isCurrentSameOfficial)
                }
                {
                  inputTypeChange.country_current === "select" ?
                    this.setFormDropdown(schema, province_current, schema.label.province_current, schema.list.province_current, "province_current", "Select your's Driver's Province", isCurrentSameOfficial)
                    : this.setFormInput(schema, province_current, schema.label.province_current, "province_current", "Enter your's Driver's Province", isCurrentSameOfficial)
                }
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, postalCode_current, schema.label.postalCode_current, "postalCode_current", "Enter your's Driver's Postal Code", isCurrentSameOfficial)}
                <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                {this.setFormInput(schema, phone1_current, schema.label.phone1_current, "phone1_current", "Enter your's Driver's Phone Number", isCurrentSameOfficial, 3)}
                {this.setFormInput(schema, ext1_current, schema.label.ext1_current, "ext1_current", '', isCurrentSameOfficial, 1)}
                {this.setFormInput(schema, phone2_current, schema.label.phone2_current, "phone2_current", "Enter your's Driver's Phone Number", isCurrentSameOfficial, 3)}
                {this.setFormInput(schema, ext2_current, schema.label.ext2_current, "ext2_current", '', isCurrentSameOfficial, 1)}
              </div>
            </BoxCollaps>
          </div>,

          // User Tab
          <div>
            {
              this.props.formAction.action === "add" &&
              <Row>
                <Col lg={12} style={{ marginLeft: 10, marginBottom: 10 }}>

                  <Button type="button" className="btn btn-default" size="sm" >Create User</Button>
                </Col>
              </Row>
            }

            {/* <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {this.setFormInput(schema, userName, schema.label.userName, "userName", "", true)}

              <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                <label className="control-label" style={{ fontWeight: 500 }}>Avatar :</label>
                <div>
                  <img alt="image" className="img-circle" src={picProfile0} style={{ width: 34, height: 34 }} />
                </div>

              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {this.setFormInput(schema, mobile, schema.label.mobile, "mobile", "", true)}
              {this.setFormInput(schema, email, schema.label.email, "email", "", true)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {this.setFormInput(schema, lineId, schema.label.lineId, "lineId", "", true)}
              <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
            </div> */}



            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {this.setFormLabel(schema, userName, schema.label.userName)}

              <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                <label className="control-label" style={{ fontWeight: 500 }}>Avatar :</label>
                <div>
                  <img alt="image" className="img-circle" src={picProfile0} style={{ width: 34, height: 34 }} />
                </div>

              </div>
            </div>


            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {this.setFormLabel(schema, mobile, schema.label.mobile)}
              {this.setFormLabel(schema, email, schema.label.email)}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {this.setFormLabel(schema, lineId, schema.label.lineId)}
              <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
            </div>
            {/* 
            {
              this.props.formAction.action === "edit" && [
                this.setHeaderSection("Driver License Card"),
                <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                  <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                    <DataGrid
                      id="gridContainer"
                      dataSource={schema.list.driverProfileCards}
                      keyExpr="id"
                      allowColumnReordering={false}
                      showBorders={true}
                      onRowUpdating={this.onRowUpdating}
                      onRowUpdated={this.onRowUpdated}
                      onRowRemoving={this.onRowRemoving}
                    >
                      <Paging enabled={true} />
                      <Editing
                        mode="row"
                        allowUpdating={true}
                        allowDeleting={true}
                      />


                      <Column dataField="dltCardTypeNav.value" caption="Card Type" />
                      <Column dataField="cardId" caption="Card No." />
                      <Column dataField="dltProvinceNav.value" caption="Province" />
                      <Column dataField="cardExpiredDate" caption="Expired Date" />
                      <Column dataField="isLifetime" caption="Lifetime" />
                    </DataGrid>
                  </div>
                </div>
              ]
            } */}
          </div>,

          // License Card Tab
          <div>
            {/* {
              this.props.formAction.action === "edit" && */}
            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                <DataGrid
                  id="gridContainer"
                  dataSource={schema.list.driverProfileCards}
                  keyExpr="id"
                  allowColumnReordering={false}
                  showBorders={true}
                  onRowUpdating={this.onRowUpdating}
                  onRowUpdated={this.onRowUpdated}
                  onRowRemoving={this.onRowRemoving}
                >
                  <Paging enabled={true} />
                  <Editing
                    mode="row"
                    allowUpdating={true}
                    allowDeleting={true}
                  />
                  <Column dataField="dltCardTypeNav.value" caption="Card Type" />
                  <Column dataField="cardId" caption="Card No." />
                  <Column dataField="dltProvinceNav.value" caption="Province" />
                  <Column dataField="cardExpiredDate" caption="Expired Date" />
                  <Column dataField="isLifetime" caption="Lifetime" />
                </DataGrid>
              </div>
            </div>
            {/* } */}
          </div>,

          // Employee Tab
          <div>
            {
              schema.list.drivers.length !== 0 && (formAction.action === "edit" || driverExisting.isExisting) ?
                <div>
                  {
                    schema.list.drivers.map((item, index) =>
                      <BoxCollaps boxid={index + 10} title={'Employee : ' + item.displayName}>
                        <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                          <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            {this.setFormInput(schema, item.employeeCode, schema.label.employeeCode, "employeeCode", "Enter your's Empployee Code ")}
                            {this.setFormInput(schema, item.displayName, schema.label.displayName, "displayName", "Enter your's Empployee Display Name ")}
                          </div>
                          <div className="form-group field field-string" style={{ flex: 1 }}>
                            {this.setFormUpload(FileUpload, "")}
                          </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                          {this.setFormInput(schema, item.department, schema.label.department, "department", "Select your's Empployee's Department")}
                          {this.setFormInput(schema, item.position, schema.label.position, "position", "Enter your's Empployee's Position")}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                          {this.setFormInput(schema, item.startDate, schema.label.startDate, "startDate", "DD/MM/YYYY")}
                          {this.setFormInput(schema, item.endDate, schema.label.endDate, "endDate", "DD/MM/YYYY")}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                          {this.setFormRedio(schema, isActive, schema.label.isActive, "isActive")}
                          <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
                        </div>

                        <div>
                          <div className="hr-line-dashed" />
                          <Row>
                            <div className="pull-left" >
                              <h3>Employee Card</h3>
                            </div>
                          </Row>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
                          <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
                            <DataGrid
                              id={'gridContainer' + index}
                              dataSource={[...item.driverCardInfos]}
                              keyExpr="id"
                              allowColumnReordering={false}
                              showBorders={true}
                              onInitNewRow={this.onInitNewRow}
                              onRowInserting={this.onRowInserting}
                              onRowUpdating={this.onRowUpdating}
                              onRowUpdated={this.onRowUpdated}
                              onRowRemoving={this.onRowRemoving}
                            >
                              <Paging enabled={true} />
                              <Editing
                                mode="row"
                                allowUpdating={true}
                                allowDeleting={true}
                                allowAdding={true}
                              />
                              <Column
                                dataField="cardTypeNav.value"
                                caption="Card Type"
                                width={200}
                              >
                                <Lookup dataSource={schema.list.cardType} displayExpr="label" valueExpr="value" />
                              </Column>
                              <Column dataField="cardId" caption="Card No." width={200} />
                              <Column
                                dataField="cardExpired"
                                width={200}
                                dataType="date" />
                              <Column dataField="description" caption="Description" />
                            </DataGrid>
                          </div>
                        </div>
                      </BoxCollaps>
                    )
                  }
                </div> :
                <div>
                  <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                    <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {this.setFormInput(schema, employeeCode, schema.label.employeeCode, "employeeCode", "Enter your's Empployee Code ")}
                      {this.setFormInput(schema, displayName, schema.label.displayName, "displayName", "Enter your's Empployee Display Name ")}
                    </div>
                    <div className="form-group field field-string" style={{ flex: 1 }}>
                      {this.setFormUpload(driverFile, "driverFile", "Driver File")}

                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                    {this.setFormInput(schema, department, schema.label.department, "department", "Select your's Empployee's Department")}
                    {this.setFormInput(schema, position, schema.label.position, "position", "Enter your's Empployee's Position")}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                    {this.setFormDatepicker(schema, startDate, schema.label.startDate, "startDate", "DD/MM/YYYY")}
                    {this.setFormDatepicker(schema, endDate, schema.label.endDate, "endDate", "DD/MM/YYYY")}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                    {this.setFormRedio(schema, isActive, schema.label.isActive, "isActive")}
                    <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}></div>
                  </div>
                </div>
            }
          </div>

          // LIST
          , <div>
            {/* <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              {this.setFormInput(schema, licenseData.label.cardType, schema.label.licenseData.items.label.cardType, "cardType", "Select your's Empployee's Card Type")}
              {this.setFormInput(schema, licenseData.label.cardNo, schema.label.licenseData.items.label.cardNo, "cardNo", "Enter your's Empployee's Card No.")}
            </div> */}
          </div>
        ]
        }   >
      </Tabbed >
    )
  }
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  driverProfile: state.driver.driverProfile,
  loadingCheck: state.driver.loadingCheck,
  formAction: state.driver.formAction,
  driverExisting: state.driver.driverExisting,
  CardTypeData: state.dropdown.CardTypeData,
});
const mapDispatchToProps = (dispatch) => ({
  getExistingDriver: (personalId, customerId) => dispatch(DriverActions.getExistingDriver(personalId, customerId)),
  getDriverProfile: (personalId) => dispatch(DriverActions.getDriverProfile(personalId)),
  setPersonalIdSelect: (personalId, action) => dispatch(DriverActions.setPersonalIdSelect(personalId, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicData)