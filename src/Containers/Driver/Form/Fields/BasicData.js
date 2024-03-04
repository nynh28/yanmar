import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import DriverActions from '../../../../Redux/DriverRedux'
import { Row, Col } from 'reactstrap'
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
import { Button, Modal } from 'antd';
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import FormUpload from '../../../../Components/FormControls/FormUpload'
import FormUploadNew from '../../../../Components/FormControls/FormUploadNew'
import Table from './Table'
import LicenseCard from './LicenseCard'
import EmployeeCard from './EmployeeCard'
import { t } from '../../../../Components/Translation'

// Define a custom component for handling the root position object ?
class BasicData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      showPopupEmployeeCard: false,
      showPopupLicenseCard: false
    };
    this.onChangeDate = this.onChangeDate.bind(this);
    this.openModal = this.openModal.bind(this)
    this.getExistingDriver = this.getExistingDriver.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.formData,

      showPopupEmployeeCard: false,
      showPopupLicenseCard: false
    })
  }

  onChange(name, nativeElement = true) {
    return (event) => {
      let value = nativeElement ? event.target.value : event.label
      !nativeElement && this.setState({ [name + "_Name"]: event.value }, () => this.props.onChange(this.state));
      this.setState({
        [name]: value
      }, () => this.props.onChange(this.state));
    };
  }

  //#region  DATE PICKER
  onChangeDate(name, value) {
    let sta = {
      [name]: value
    }
    this.setState(sta, () => this.props.onChange(this.state));
  }

  //#endregion

  onCheckedButton(isActive, fieldForm) {
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));
  }

  openModal() {
    this.setState(state => ({
      showPopupEmployeeCard: !state.showPopupEmployeeCard
    }))
  }


  // Check Driver Status
  getExistingDriver(intCustId, personalID) {
    if (intCustId !== "" && personalID !== "") {
      this.props.getExistingDriver(intCustId, personalID)

    }
  }

  //#region DATAGRID MANAGE
  onChangeTable(action, data) {
    if (this.props.formAction.action === "Add") {
      if (action === "INSERT") {
        this.addToTableList(data)
      }
      else {
        this.removeFromTableList(data.id)
      }
    }
    else {
      if (action === "INSERT") {
        this.addToTableList(data)
      }
      else if (action === "UPDATE") {

      }
      else {
        let delType = data.id.split("_")[0];
        if (delType === "GET") {
          this.updateDeleteStatus(data)
          this.removeFromTableList(data.id)
        }
        else {
          this.removeFromTableList(data.id)
        }
      }
    }
  }

  updateDeleteStatus(data) {
    let { employeeCardDeleteList } = this.state
    let newData = [...employeeCardDeleteList]
    newData.push(
      {
        "action": "DELETE",
        "cardTypeNav": {
          "key": parseInt(data.cardTypeNav.key)
        },
        "cardId": data.cardId
      })

    this.setState({
      ["employeeCardDeleteList"]: newData,
    }, () => this.props.onChange(this.state));

    // let { userRoleInfoDelete} = this.state

    // let newData = [...userRoleInfoDelete]
    // newData.push({
    //   "action": "DELETE",
    //   "roleNav": { "key": parseInt(data.roleNav.key) }
    // })
    // this.setState({ userRoleInfoDelete: newData })
  }

  removeFromTableList(data) {
    const { schema } = this.props

    let index = schema.list.employeeCardList.findIndex(x => x.id === data);
    if (index > -1) {
      let newData = [...schema.list.employeeCardList]
      newData.splice(index, 1)
      this.setState({
        ["employeeCardList"]: newData
      }, () => this.props.onChange(this.state));
    }
  }

  addToTableList(data) {
    const { schema } = this.props
    let newData = [...schema.list.employeeCardList]
    newData.push(data)

    this.setState({
      ["employeeCardList"]: newData
    }, () => this.props.onChange(this.state));
  }
  //#endregion

  render() {
    let {
      intCustId, intCustName, lastUpdate, personalId, prefix, firstname, lastname, nickname, personalCard_attachCode, personalCard_attachInfo, lastUpdated,
      houseNo, villageNo, building, roomNo, soi, road, villageName, subDistrict, subDistrict_Name, district, district_Name, province, province_Name, country, postalCode, phone1, ext1, phone2, ext2,
      isCurrentSameOfficial, houseNo_current, villageNo_current, building_current, roomNo_current, soi_current, road_current, villageName_current, subDistrict_current, subDistrict_current_Name, district_current, district_current_Name, province_current, province_current_Name, country_current, postalCode_current, phone1_current, ext1_current, phone2_current, ext2_current,
      displayName, username, password, confirmPassword, mobile, expiredDate, email, lineId, defaultLanguage, user_acttachCode, user_acttachInfo,
      employeeCode, displayName_emp, department, position, startDate, endDate, isActive, personalCard2_attachtCode, personalCard2_attachhInfo,
      tabActive
    } = this.state
    const { schema, formAction } = this.props

    return (
      <Suspense fallback={null}>
        <Tabbed
          id="tab_driver"
          defaultActiveKey={tabActive}
          onActive={(tabActive) => this.setState({
            ["tabActive"]: tabActive
          }, () => this.props.onChange(this.state))
          }
          tabName={[t('information'), t('driver_26'), t('driver_27'), t('driver_28'), t('driver_29')]}
          tabPane={[
            // Driver Information Tab
            <div>
              {
                formAction.action === "Add" && <div>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormSelectSearch
                        mode={"single"}
                        schema={schema}
                        value={intCustId}
                        label={schema.label.intCustId}
                        list={schema.list.intCustId}
                        // list={[]}
                        fieldForm={"intCustId"}
                        placeholder={"driver_76"}
                        flex={1}
                        onChange={(selected) => {
                          this.setState({
                            ["intCustId"]: selected || []
                          }, () => this.props.onChange(this.state));
                        }}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={lastUpdate}
                        label={schema.label.lastUpdate}
                        flex={1}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <div style={{ display: 'flex', flexDirection: 'row', flex: 1, flexGrow: 1 }}>
                        <FormInput
                          schema={schema}
                          value={personalId}
                          label={schema.label.personalId}
                          fieldForm={"personalId"}
                          placeholder={"driver_78"}
                          flex={5}
                          onChange={this.onChange("personalId")}
                        />
                        <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1, marginTop: 26 }}>
                          <Button
                            style={{ width: 100 }}
                            onClick={() => {
                              this.getExistingDriver(intCustId, personalId)
                            }}
                          >{t("driver_123")}</Button>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              }

              {
                formAction.action === "Edit" && <div>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={intCustName}
                        label={schema.label.intCustId}
                        flex={1}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={lastUpdated}
                        label={schema.label.lastUpdated}
                        flex={1}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={personalId}
                        label={schema.label.personalId}
                        flex={1}
                      />
                    </Col>
                  </Row>
                </div>
              }

              <Row>
                <Col lg={6} md={12}>
                  <div className="form-group field field-string" style={{ flex: 1 }}>
                    <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                      <FormInput
                        schema={schema}
                        value={prefix}
                        label={schema.label.prefix}
                        fieldForm={"prefix"}
                        placeholder={"driver_79"}
                        flex={1}
                        onChange={this.onChange("prefix")}
                      />

                      <FormInput
                        schema={schema}
                        value={firstname}
                        label={schema.label.firstname}
                        fieldForm={"firstname"}
                        placeholder={"driver_80"}
                        flex={3}
                        onChange={this.onChange("firstname")}
                      />

                      <FormInput
                        schema={schema}
                        value={lastname}
                        label={schema.label.lastname}
                        fieldForm={"lastname"}
                        placeholder={"driver_81"}
                        flex={3}
                        onChange={this.onChange("lastname")}
                      />
                    </div>
                  </div>
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={nickname}
                    label={schema.label.nickname}
                    fieldForm={"nickname"}
                    placeholder={"driver_82"}
                    flex={1}
                    onChange={this.onChange("nickname")}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  {/* <FormUpload
                    schema={{ "required": [""] }}
                    fieldForm="personalCard_attachCode"
                    listType="file"
                    label={schema.label.personalCard}
                    attachCode={personalCard_attachCode}
                    attachInfo={personalCard_attachInfo}
                    action={formAction.action}
                    removeFile={(() => {
                      this.setState({
                        ["personalCard_attachInfo"]: {}
                      }, () => this.props.onChange(this.state))
                    })}
                    response={(res) => {
                      if (res.status) {
                        this.setState({
                          ["personalCard_attachCode"]: res.attachInfo.attachCode,
                          ["personalCard_attachInfo"]: res.attachInfo
                        }, () => this.props.onChange(this.state))
                      }
                    }}
                  /> */}
                  <FormUploadNew
                    schema={{ "required": [""] }}
                    fieldForm="personalCard_attachCode"
                    listType="file"
                    // acceptFileType={["image/jpeg", "image/png", "application/pdf"]}
                    // acceptMaxSizeMB={4}
                    label={schema.label.personalCard}
                    attachCode={personalCard_attachCode}
                    attachInfo={personalCard_attachInfo}
                    // errorKey={'customer_115'}
                    action={"manage"}
                    removeFile={(() => {
                      this.setState({
                        ["personalCard_attachInfo"]: {}
                      }, () => this.props.onChange(this.state))
                    })}
                    response={(res) => {
                      if (res.status) {
                        this.setState({
                          ["personalCard_attachCode"]: res.attachInfo.attachCode,
                          ["personalCard_attachInfo"]: res.attachInfo
                        }, () => this.props.onChange(this.state))
                      }
                    }}
                  />
                  {/* <FormUploadNew
                    schema={{ "required": [""] }}
                    fieldForm="personalCard_attachCode"
                    listType="file"
                    // acceptFileType={["image/jpeg", "image/png", "application/pdf"]}
                    // acceptMaxSizeMB={4}
                    label={schema.label.personalCard}
                    attachCode={personalCard_attachCode}
                    attachInfo={personalCard_attachInfo}
                    action={formAction.action}
                    removeFile={((e) => {
                      console.log("removeFile : ", e)
                      this.setState({
                        ["personalCard_attachInfo"]: {}
                      }, () => this.props.onChange(this.state))
                    })}
                    response={(res) => {
                      if (res.status) {
                        this.setState({
                          ["personalCard_attachCode"]: res.attachInfo.attachCode,
                          ["personalCard_attachInfo"]: res.attachInfo
                        }, () => this.props.onChange(this.state))
                      }
                    }}
                  /> */}
                </Col>
              </Row>
            </div >,

            // Address Tab
            <div>
              <BoxCollaps boxid={1} title={t('official_address')}>
                <Row>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={houseNo}
                      label={schema.label.houseNo}
                      fieldForm={"houseNo"}
                      placeholder={"driver_83"}
                      flex={1}
                      onChange={this.onChange("houseNo")}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={villageNo}
                      label={schema.label.villageNo}
                      fieldForm={"villageNo"}
                      placeholder={"driver_84"}
                      flex={1}
                      onChange={this.onChange("villageNo")}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={building}
                      label={schema.label.building}
                      fieldForm={"building"}
                      placeholder={"driver_85"}
                      flex={1}
                      onChange={this.onChange("building")}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={roomNo}
                      label={schema.label.roomNo}
                      fieldForm={"roomNo"}
                      placeholder={"driver_86"}
                      flex={1}
                      onChange={this.onChange("roomNo")}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={soi}
                      label={schema.label.soi}
                      fieldForm={"soi"}
                      placeholder={"driver_87"}
                      flex={1}
                      onChange={this.onChange("soi")}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={road}
                      label={schema.label.road}
                      fieldForm={"road"}
                      placeholder={"driver_88"}
                      flex={1}
                      onChange={this.onChange("road")}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={villageName}
                      label={schema.label.villageName}
                      fieldForm={"villageName"}
                      placeholder={"driver_89"}
                      flex={1}
                      onChange={this.onChange("villageName")}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    {
                      country == 1 ?
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={subDistrict}
                          label={schema.label.subDistrict}
                          list={schema.list.subDistrict}
                          fieldForm={"subDistrict"}
                          disabled={province.length === 0 || district.length === 0}
                          placeholder={"driver_90"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["subDistrict"]: selected || []
                              // ["subDistrict"]: selected || [].key,
                              // ["subDistrict_Name"]: selected || [].label
                            }, () => this.props.onChange(this.state));
                          }}
                        /> :
                        <FormInput
                          schema={schema}
                          value={subDistrict_Name}
                          label={schema.label.subDistrict}
                          fieldForm={"subDistrict_Name"}
                          placeholder={"driver_90"}
                          flex={1}
                          onChange={this.onChange("subDistrict_Name")}
                        />
                    }
                  </Col>
                </Row>

                {
                  country == 1 ?
                    <Row>
                      <Col lg={6} md={12}>
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={district}
                          label={schema.label.district}
                          list={schema.list.district}
                          fieldForm={"district"}
                          disabled={province.length === 0}
                          placeholder={"driver_91"}
                          flex={1}
                          labelInValue={true}
                          onChange={(selected) => {
                            this.setState({
                              ["district"]: selected || []
                              // ["district"]: selected || [].key,
                              // ["district_Name"]: selected || [].label
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                      </Col>
                      <Col lg={6} md={12}>
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={province}
                          label={schema.label.province}
                          list={schema.list.province}
                          fieldForm={"province"}
                          disabled={country.length === 0}
                          placeholder={"driver_92"}
                          flex={1}
                          labelInValue={true}
                          onChange={(selected) => {
                            this.setState({
                              ["province"]: selected || []
                              // ["province"]: selected || [].key,
                              // ["province_Name"]: selected || [].label
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                      </Col>
                    </Row> :
                    <Row>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={district_Name}
                          label={schema.label.district}
                          fieldForm={"district_Name"}
                          placeholder={"driver_91"}
                          flex={1}
                          onChange={this.onChange("district_Name")}
                        />
                      </Col>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={province_Name}
                          label={schema.label.province}
                          fieldForm={"province_Name"}
                          placeholder={"driver_92"}
                          flex={1}
                          onChange={this.onChange("province_Name")}
                        />
                      </Col>
                    </Row>
                }

                <Row>
                  <Col lg={6} md={12}>
                    <FormSelectSearch
                      mode={"single"}
                      schema={schema}
                      value={country}
                      label={schema.label.country}
                      list={schema.list.country}
                      fieldForm={"country"}
                      placeholder={"driver_93"}
                      flex={1}
                      onChange={(selected) => {
                        this.setState({
                          ["country"]: selected || []
                        }, () => this.props.onChange(this.state));
                      }}
                    />
                  </Col>
                  <Col lg={6} md={12}>
                    <FormInput
                      schema={schema}
                      value={postalCode}
                      label={schema.label.postalCode}
                      fieldForm={"postalCode"}
                      placeholder={"driver_94"}
                      flex={1}
                      onChange={this.onChange("postalCode")}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg={6} md={12}>
                    <div className="form-group field field-string" style={{ flex: 1 }}>
                      <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <FormInput
                          schema={schema}
                          value={phone1}
                          label={schema.label.phone1}
                          fieldForm={"phone1"}
                          placeholder={"driver_95"}
                          flex={3}
                          onChange={this.onChange("phone1")}
                        />

                        <FormInput
                          schema={schema}
                          value={ext1}
                          label={schema.label.ext1}
                          fieldForm={"ext1"}
                          placeholder={"driver_96"}
                          flex={1}
                          onChange={this.onChange("ext1")}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg={6} md={12}>
                    <div className="form-group field field-string" style={{ flex: 1 }}>
                      <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                        <FormInput
                          schema={schema}
                          value={phone2}
                          label={schema.label.phone2}
                          fieldForm={"phone2"}
                          placeholder={"driver_95"}
                          flex={3}
                          onChange={this.onChange("phone2")}
                        />

                        <FormInput
                          schema={schema}
                          value={ext2}
                          label={schema.label.ext2}
                          fieldForm={"ext2"}
                          placeholder={"driver_96"}
                          flex={1}
                          onChange={this.onChange("ext2")}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </BoxCollaps>

              <BoxCollaps boxid={2} title={t('current_address')}>
                <Row>
                  <Col lg={6} md={12}>
                    <FormRadio
                      schema={schema}
                      value={isCurrentSameOfficial}
                      label={schema.label.isCurrentSameOfficial}
                      fieldForm={"isCurrentSameOfficial"}
                      flex={1}
                      onClick={(isCurrentSameOfficial, fieldForm) => {
                        this.onCheckedButton(isCurrentSameOfficial, fieldForm)
                      }}
                    />
                  </Col>
                </Row>

                {
                  !isCurrentSameOfficial && <div>
                    <Row>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={houseNo_current}
                          label={schema.label.houseNo_current}
                          fieldForm={"houseNo_current"}
                          placeholder={"driver_83"}
                          flex={1}
                          onChange={this.onChange("houseNo_current")}
                        />
                      </Col>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={villageNo_current}
                          label={schema.label.villageNo_current}
                          fieldForm={"villageNo_current"}
                          placeholder={"driver_84"}
                          flex={1}
                          onChange={this.onChange("villageNo_current")}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={building_current}
                          label={schema.label.building_current}
                          fieldForm={"building_current"}
                          placeholder={"driver_85"}
                          flex={1}
                          onChange={this.onChange("building_current")}
                        />
                      </Col>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={roomNo_current}
                          label={schema.label.roomNo_current}
                          fieldForm={"roomNo_current"}
                          placeholder={"driver_86"}
                          flex={1}
                          onChange={this.onChange("roomNo_current")}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={soi_current}
                          label={schema.label.soi_current}
                          fieldForm={"soi_current"}
                          placeholder={"driver_87"}
                          flex={1}
                          onChange={this.onChange("soi_current")}
                        />
                      </Col>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={road_current}
                          label={schema.label.road_current}
                          fieldForm={"road_current"}
                          placeholder={"driver_88"}
                          flex={1}
                          onChange={this.onChange("road_current")}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={villageName_current}
                          label={schema.label.villageName_current}
                          fieldForm={"villageName_current"}
                          placeholder={"driver_89"}
                          flex={1}
                          onChange={this.onChange("villageName_current")}
                        />
                      </Col>
                      <Col lg={6} md={12}>

                        {
                          country_current == 1 ?
                            <FormSelectSearch
                              mode={"single"}
                              schema={schema}
                              value={subDistrict_current}
                              label={schema.label.subDistrict_current}
                              list={schema.list.subDistrict_current}
                              fieldForm={"subDistrict_current"}
                              disabled={province_current.length === 0 || district_current.length === 0}
                              placeholder={"driver_90"}
                              flex={1}
                              labelInValue={true}
                              onChange={(selected) => {
                                this.setState({
                                  ["subDistrict_current"]: selected || []
                                  // ["subDistrict_current"]: selected || [].key,
                                  // ["subDistrict_current_Name"]: selected || [].label
                                }, () => this.props.onChange(this.state));
                              }}
                            /> :
                            <FormInput
                              schema={schema}
                              value={subDistrict_current_Name}
                              label={schema.label.subDistrict_current}
                              fieldForm={"subDistrict_current_Name"}
                              placeholder={"driver_90"}
                              flex={1}
                              onChange={this.onChange("subDistrict_current_Name")}
                            />
                        }
                      </Col>
                    </Row>

                    {
                      country_current == 1 ?
                        <Row>
                          <Col lg={6} md={12}>
                            <FormSelectSearch
                              mode={"single"}
                              schema={schema}
                              value={district_current}
                              label={schema.label.district_current}
                              list={schema.list.district_current}
                              fieldForm={"district_current"}
                              disabled={province_current.length === 0}
                              placeholder={"driver_91"}
                              flex={1}
                              labelInValue={true}
                              onChange={(selected) => {
                                this.setState({
                                  ["district_current"]: selected || []
                                  // ["district_current"]: selected || [].key,
                                  // ["district_current_Name"]: selected || [].label
                                }, () => this.props.onChange(this.state));
                              }}
                            />
                          </Col>
                          <Col lg={6} md={12}>
                            <FormSelectSearch
                              mode={"single"}
                              schema={schema}
                              value={province_current}
                              label={schema.label.province_current}
                              list={schema.list.province_current}
                              fieldForm={"province_current"}
                              disabled={country_current.length === 0}
                              placeholder={"driver_92"}
                              flex={1}
                              labelInValue={true}
                              onChange={(selected) => {
                                this.setState({
                                  ["province_current"]: selected || []
                                  // ["province_current"]: selected || [].key,
                                  // ["province_current_Name"]: selected || [].label
                                }, () => this.props.onChange(this.state));
                              }}
                            />
                          </Col>
                        </Row> :
                        <Row>
                          <Col lg={6} md={12}>
                            <FormInput
                              schema={schema}
                              value={district_current_Name}
                              label={schema.label.district_current}
                              fieldForm={"district_current_Name"}
                              placeholder={"driver_91"}
                              flex={1}
                              onChange={this.onChange("district_current_Name")}
                            />
                          </Col>
                          <Col lg={6} md={12}>
                            <FormInput
                              schema={schema}
                              value={province_current_Name}
                              label={schema.label.province_current}
                              fieldForm={"province_current_Name"}
                              placeholder={"driver_92"}
                              flex={1}
                              onChange={this.onChange("province_current_Name")}
                            />
                          </Col>
                        </Row>
                    }
                    <Row>
                      <Col lg={6} md={12}>
                        <FormSelectSearch
                          mode={"single"}
                          schema={schema}
                          value={country_current}
                          label={schema.label.country_current}
                          list={schema.list.country_current}
                          fieldForm={"country_current"}
                          placeholder={"driver_93"}
                          flex={1}
                          onChange={(selected) => {
                            this.setState({
                              ["country_current"]: selected || []
                            }, () => this.props.onChange(this.state));
                          }}
                        />
                      </Col>
                      <Col lg={6} md={12}>
                        <FormInput
                          schema={schema}
                          value={postalCode_current}
                          label={schema.label.postalCode_current}
                          fieldForm={"postalCode_current"}
                          placeholder={"driver_94"}
                          flex={1}
                          onChange={this.onChange("postalCode_current")}
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={6} md={12}>
                        <div className="form-group field field-string" style={{ flex: 1 }}>
                          <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <FormInput
                              schema={schema}
                              value={phone1_current}
                              label={schema.label.phone1_current}
                              fieldForm={"phone1_current"}
                              placeholder={"driver_95"}
                              flex={3}
                              onChange={this.onChange("phone1_current")}
                            />

                            <FormInput
                              schema={schema}
                              value={ext1_current}
                              label={schema.label.ext1_current}
                              fieldForm={"ext1_current"}
                              placeholder={"driver_96"}
                              flex={1}
                              onChange={this.onChange("ext1_current")}
                            />
                          </div>
                        </div>
                      </Col>
                      <Col lg={6} md={12}>
                        <div className="form-group field field-string" style={{ flex: 1 }}>
                          <div className="form-group field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                            <FormInput
                              schema={schema}
                              value={phone2_current}
                              label={schema.label.phone2_current}
                              fieldForm={"phone2_current"}
                              placeholder={"driver_95"}
                              flex={3}
                              onChange={this.onChange("phone2_current")}
                            />

                            <FormInput
                              schema={schema}
                              value={ext2_current}
                              label={schema.label.ext2_current}
                              fieldForm={"ext2_current"}
                              placeholder={"driver_96"}
                              flex={1}
                              onChange={this.onChange("ext2_current")}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                }

              </BoxCollaps>
            </div >,

            // User Tab
            <div>
              {
                formAction.action === "Add" && <div>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={displayName}
                        label={schema.label.displayName}
                        fieldForm={"displayName"}
                        placeholder={"driver_99"}
                        flex={1}
                        onChange={this.onChange("displayName")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={username}
                        label={schema.label.username}
                        fieldForm={"username"}
                        placeholder={"driver_100"}
                        flex={1}
                        onChange={this.onChange("username")}
                      />
                    </Col>
                  </Row>

                  {/* <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        type="password"
                        schema={schema}
                        value={password}
                        label={schema.label.password}
                        fieldForm={"password"}
                        placeholder={"driver_101"}
                        flex={1}
                        onChange={this.onChange("password")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        type="password"
                        schema={schema}
                        value={confirmPassword}
                        label={schema.label.confirmPassword}
                        fieldForm={"confirmPassword"}
                        placeholder={"driver_102"}
                        flex={1}
                        onChange={this.onChange("confirmPassword")}
                      />
                    </Col>
                  </Row> */}

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={mobile}
                        label={schema.label.mobile}
                        fieldForm={"mobile"}
                        placeholder={"driver_103"}
                        flex={1}
                        onChange={this.onChange("mobile")}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormInput
                        type="email"
                        schema={schema}
                        value={email}
                        label={schema.label.email}
                        fieldForm={"email"}
                        placeholder={"driver_104"}
                        flex={1}
                        onChange={this.onChange("email")}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormInput
                        schema={schema}
                        value={lineId}
                        label={schema.label.lineId}
                        fieldForm={"lineId"}
                        placeholder={"driver_105"}
                        flex={1}
                        onChange={this.onChange("lineId")}
                      />
                    </Col>

                    <Col lg={6} md={12}>
                      <FormDatepicker
                        schema={schema}
                        value={expiredDate}
                        label={schema.label.expiredDate}
                        fieldForm={"expiredDate"}
                        placeholder={"driver_106"}
                        flex={1}
                        onChange={this.onChangeDate}
                        onClear={() => {
                          this.setState({
                            ['expiredDate']: ''
                          }, () => this.props.onChange(this.state));
                        }}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormUpload
                        schema={{ "required": [""] }}
                        fieldForm="avartar"
                        listType="picture-card"
                        endPoint="UserManage/Files/Avatar"
                        label={schema.label.avartar}
                        attachCode={user_acttachCode}
                        attachInfo={user_acttachInfo}
                        action={formAction.action}
                        removeFile={(() => {
                          this.setState({
                            ["user_acttachInfo"]: {}
                          }, () => this.props.onChange(this.state))
                        })}
                        response={(res) => {
                          if (res.status) {
                            this.setState({
                              ["user_acttachInfo"]: res.attachInfo,
                              ["user_acttachCode"]: res.attachInfo.attachCode
                            }, () => this.props.onChange(this.state))
                          }
                        }}
                      />
                    </Col>

                    <Col lg={6} md={12}>
                      <FormSelectSearch
                        mode={"single"}
                        schema={schema}
                        value={defaultLanguage}
                        label={schema.label.defaultLanguage}
                        list={schema.list.defaultLanguage}
                        fieldForm={"defaultLanguage"}
                        placeholder={""}
                        flex={1}
                        onChange={(selected) => {
                          this.setState({
                            ["defaultLanguage"]: selected || []
                          }, () => this.props.onChange(this.state));
                        }}
                      />
                    </Col>
                  </Row>
                </div>

              }

              {
                formAction.action === "Edit" && <div>
                  <Row>
                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={displayName}
                        label={schema.label.displayName}
                        flex={1}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={username}
                        label={schema.label.username}
                        flex={1}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={mobile}
                        label={schema.label.mobile}
                        flex={1}
                      />
                    </Col>
                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={email}
                        label={schema.label.email}
                        flex={1}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={lineId}
                        label={schema.label.lineId}
                        flex={1}
                      />
                    </Col>

                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={expiredDate}
                        label={schema.label.expiredDate}
                        flex={1}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col lg={6} md={12}>
                      <FormUpload
                        schema={{ "required": [""] }}
                        fieldForm="avartar"
                        listType="picture-card"
                        disabled={true}
                        label={schema.label.avartar}
                        attachCode={user_acttachCode}
                        attachInfo={user_acttachInfo}
                        action={formAction.action}
                        removeFile={(() => {
                          this.setState({
                            ["user_acttachInfo"]: {}
                          }, () => this.props.onChange(this.state))
                        })}
                        response={(res) => {
                          if (res.status) {
                            this.setState({
                              ["user_acttachCode"]: res.attachInfo.attachCode
                            }, () => this.props.onChange(this.state))
                          }
                        }}
                      />
                    </Col>

                    <Col lg={6} md={12}>
                      <FormLabel
                        schema={schema}
                        value={defaultLanguage}
                        label={schema.label.defaultLanguage}
                        flex={1}
                      />
                    </Col>
                  </Row>
                </div>
              }
            </div>,

            // License Card Tab
            <div>
              <LicenseCard
                data={schema.list.lisenceCardList}
              />
            </div>,

            // Employee Tab
            <div>
              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={employeeCode}
                    label={schema.label.employeeCode}
                    fieldForm={"employeeCode"}
                    placeholder={"driver_108"}
                    flex={1}
                    onChange={this.onChange("employeeCode")}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={displayName_emp}
                    label={schema.label.displayName_emp}
                    fieldForm={"displayName_emp"}
                    placeholder={"driver_109"}
                    flex={1}
                    onChange={this.onChange("displayName_emp")}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={department}
                    label={schema.label.department}
                    fieldForm={"department"}
                    placeholder={"driver_110"}
                    flex={1}
                    onChange={this.onChange("department")}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormInput
                    schema={schema}
                    value={position}
                    label={schema.label.position}
                    fieldForm={"position"}
                    placeholder={"driver_111"}
                    flex={1}
                    onChange={this.onChange("position")}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
                  <FormDatepicker
                    id={"testID"}
                    schema={schema}
                    value={startDate}
                    label={schema.label.startDate}
                    fieldForm={"startDate"}
                    placeholder={"driver_112"}
                    flex={1}
                    onChange={this.onChangeDate}
                  />
                </Col>
                <Col lg={6} md={12}>
                  <FormDatepicker
                    schema={schema}
                    value={endDate}
                    label={schema.label.endDate}
                    fieldForm={"endDate"}
                    placeholder={"driver_113"}
                    flex={1}
                    onChange={this.onChangeDate}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={6} md={12}>
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
                </Col>
                <Col lg={6} md={12}>
                  <FormUpload
                    schema={{ "required": [""] }}
                    fieldForm="personalCard2_attachtCode"
                    listType="file"
                    label={schema.label.personalCard}
                    attachCode={personalCard2_attachtCode}
                    attachInfo={personalCard2_attachhInfo}
                    action={formAction.action}
                    removeFile={(() => {
                      this.setState({
                        ["personalCard2_attachhInfo"]: {}
                      }, () => this.props.onChange(this.state))
                    })}
                    response={(res) => {
                      if (res.status) {
                        this.setState({
                          ["personalCard2_attachtCode"]: res.attachInfo.attachCode
                        }, () => this.props.onChange(this.state))
                      }
                    }}
                  />
                  {/*
                  <FormUpload
                    schema={{ "required": [""] }}
                    fieldForm="personalCard2_attachtCode"
                    listType="audio"
                    label={schema.label.personalCard}
                    attachCode={personalCard2_attachtCode}
                    attachInfo={personalCard2_attachhInfo}
                    response={(res) => {
                      if (res.status) {
                        this.setState({
                          ["personalCard2_attachtCode"]: res.attachInfo.attachCode
                        }, () => this.props.onChange(this.state))
                      }
                    }}
                  /> */}
                </Col>
              </Row>

              <BoxCollaps boxid={3} title={t('employee_card')}>
                <EmployeeCard
                  data={schema.list.employeeCardList}
                  onChange={(action, data) => this.onChangeTable(action, data)}
                />
              </BoxCollaps>
            </div>
          ]
          }>
        </Tabbed >
      </Suspense >)
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
  getExistingDriver: (intCustId, personalId) => dispatch(DriverActions.getExistingDriver(intCustId, personalId)),
  getDriverProfile: (personalId) => dispatch(DriverActions.getDriverProfile(personalId)),
  setPersonalIdSelect: (personalId, action) => dispatch(DriverActions.setPersonalIdSelect(personalId, action)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BasicData)