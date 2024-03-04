import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import VehicleActions from '../../../../Redux/VehicleRedux'
import CustomerActions from '../../../../Redux/CustomerRedux'
import { get, isEmpty } from 'lodash'
import { Upload } from './Upload';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { Col, Row, Button, ButtonGroup, Table as TableAS } from 'reactstrap'
import DateRangePicker from "react-bootstrap-daterangepicker";
import { FilePond } from 'react-filepond';
import DataGrid, { Texts, Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import BoxCollaps from '../../../../Components/BoxCollaps'
import Tabbed from '../../../../Components/Tabbed'
import { ENDPOINT_BASE_URL } from '../../../../Config/app-config';
import FormInput from '../../../../Components/FormControls/FormInput'
import Table from '../../../../Components/DataGridView/Table';
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormSelectGroup from '../../../../Components/FormControls/FormSelectGroup'
import FormDatepicker from '../../../../Components/FormControls/FormDatepicker'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import FormUploadNew from '../../../../Components/FormControls/FormUploadNew'
import { t } from '../../../../Components/Translation'
import moment from 'moment'
import Alert from '../../../../Components/Alert'
import FormUpload from '../../../../Components/FormControls/FormUpload'
import SetVehicle from './SetVehicle'
import FormSetVehicle from './FormSetVehicle'

const lstUserLavel = [1, 2, 11, 12, 21, 22, 31, 32, 41]
const lstUserLavelOLT = [1, 2, 11, 12, 21]
const lstLevelCanSettingOption = [1, 2]
class VehicleData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      alertSetting2: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      dataDevice: '',
      dataPackage: ''
    }


    this.onChangeDate = this.onChangeDate.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }

  componentDidMount() {

    const { loading, infoVehicleExtension } = this.props


    // this.setAlertSetting(false, 6)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps.formData })
  }

  componentDidUpdate(prevProps) {
    let { statusSubmit, infoVinno, loading, infoVehicleExtension } = this.props

    let { alertSetting2 } = this.state
    if (prevProps.statusSubmit !== statusSubmit) {
      alertSetting2.show = true
      alertSetting2.type = statusSubmit.status ? 1 : 2
      alertSetting2.content = statusSubmit.status ? "Update Profile Successed" : "Update Profile Failed"
      alertSetting2.ErrorSubcode = statusSubmit.ErrorSubcode
      this.setState({ alertSetting2 })
    }


    //      ture  === ture ต้องไม่ทำงาน
    if (prevProps.infoVinno !== infoVinno) {

      if (get(infoVinno, 'canCreate', "") === true) {
        this.setAlertSetting(false, 6)
        // this.setAlertSetting(true, 4, "vehicle_popup")
      } else if (get(infoVinno, 'canCreate', "") === false) {
        this.setAlertSetting(false, 6)
        this.setAlertSetting(true, 4, get(infoVinno, 'message', ""))
      }
    }

    if (prevProps.loading !== loading) {

      if (loading == false) this.setAlertSetting(false, 5)

    }

    if (prevProps.infoVehicleExtension !== infoVehicleExtension) {

      let data_package = get(infoVehicleExtension, 'productPackage', '')
      let data_device = get(infoVehicleExtension, 'device', '')

      // console.log(infoVehicleExtension)


      try {
        this.packageSingle = get(data_package, 'length', 0) <= 1 ? this.packageSingle(data_package) : this.packageMultiple(data_package)
        this.deviceSingle = get(data_device, 'length', 0) <= 1 ? this.deviceSingle(data_device) : this.deviceMultiple(data_device)

      } catch { }
    }

  } //componentDidUpdate


  packageMultiple = e => {


    return <Row style={{ marginLeft: 10, marginBottom: 15, width: 1300 }}>
      <Table
        dataSource={e}
        mode={"offline"}
        tableId={0}
        user_id={0}
        searchPanel={false}
        autoExpandAll={false}
        selectionVisible={false}
        sorting={false}
        ExportEnable={false}
        GroupPanelVisible={false}
        zoomVisible={false}
        selectItemVisible={false}
        editing={{
          enabled: true,
          allowUpdating: false,
          allowDeleting: false
        }}
        column={[
          {
            column_name: 'packageName',
            column_caption: "vehicle_04",
          },
          {
            column_name: 'packageDescription',
            column_caption: "vehicle_05",
          },
          {
            column_name: 'purchaseType',
            column_caption: "vehicle_08",
          },
          {
            column_name: 'paymentPeriod',
            column_caption: "vehicle_06",
          },
          {
            column_name: 'actualPrice',
            column_caption: "vehicle_03",
          },
          {
            column_name: 'nextPaymentDate',
            column_caption: "vehicle_07",
          },
        ]}
        customButton={[
          {
            hint: "View",
            icon: "search",
            visible: true,
            onClick: (e) => this.setState({ dataPackage: e.row.data })
          }
        ]}
      >
      </Table>

    </Row>

  }

  packageSingle = e => {

    let data = e[0]

    return <Row>
      <Col lg="6">
        <FormLabel
          value={get(data, 'packageName', '')}
          label={'vehicle_04'}
        />
        <FormLabel
          value={get(data, 'paymentPeriod', '')}
          label={'vehicle_06'}
        />
        <FormLabel
          value={get(data, 'purchaseType', '')}
          label={'vehicle_08'}
        />
      </Col>
      <Col lg="6" >
        <FormLabel
          value={get(data, 'packageDescription', '')}
          label={'vehicle_05'}
        />

        <FormLabel
          value={get(data, 'nextPaymentDate', '')}
          label={'vehicle_07'}
        />
        <FormLabel
          value={get(data, 'actualPrice', '') === '' ? '' : get(data, 'actualPrice', '') + ' บาท'}
          label={'vehicle_03'}
        />
      </Col>
    </Row>





  }

  deviceMultiple = e => {
    const { schema } = this.props
    const row = schema.label

    return <Row style={{ marginLeft: 10, marginBottom: 15, width: 1300 }}>
      <Table
        dataSource={e}
        mode={"offline"}
        tableId={0}
        user_id={0}
        searchPanel={false}
        autoExpandAll={false}
        selectionVisible={false}
        sorting={false}
        ExportEnable={false}
        GroupPanelVisible={false}
        zoomVisible={false}
        selectItemVisible={false}
        editing={{
          enabled: true,
          allowUpdating: false,
          allowDeleting: false
        }}
        column={[
          {
            column_name: 'productCode',
            column_caption: row.productCode,
          },
          {
            column_name: 'productName',
            column_caption: row.productName,
          },
          {
            column_name: 'productModel',
            column_caption: row.productModel,
          },
          {
            column_name: 'installationDate',
            column_caption: row.firstInstallationDate,
          },
          {
            column_name: 'warrantyVendorStart',
            column_caption: row.warrantyInstallationStartDateVendor
          },
          {
            column_name: 'warrantyVendorEnd',
            column_caption: row.warrantyInstallationEndDateVendor
          },
          {
            column_name: 'warrantyCustStart',
            column_caption: row.warrantyEndDateCust,
          },
          {
            column_name: 'warrantyCustEnd',
            column_caption: row.warrantyInstallationEndDateVendor,
          },
          {
            column_name: 'currentMid',
            column_caption: row.currentMid,
          },
          {
            column_name: 'currentImei',
            column_caption: row.currentImei,
          },
          {
            column_name: 'currentConfig',
            column_caption: row.currentConfig,
          },
          {
            column_name: 'currentImsi',
            column_caption: row.currentImsi,
          },
          {
            column_name: 'currentPhoneNo',
            column_caption: row.currentPhoneNo,
          },
        ]}
        customButton={[
          {
            hint: "View",
            icon: "search",
            visible: true,
            onClick: (e) => this.setState({ dataDevice: e.row.data })
          }
        ]}
      >
      </Table>
    </Row>



  }

  deviceSingle = e => {

    let { schema } = this.props
    let data = e[0]

    return <Row>
      <Col lg="6" >
        <FormLabel
          value={get(data, 'productCode', '')}
          label={schema.label.productCode}
        />

        <FormLabel
          value={get(data, 'productName', '')}
          label={schema.label.productName}
        />

        <FormLabel
          value={get(data, 'productModel', '')}
          label={schema.label.productModel}
        />

        <FormLabel
          value={get(data, 'installationDate', '')}
          label={schema.label.firstInstallationDate}
        />

        <FormLabel
          value={get(data, 'warrantyVendorStart', '')}
          label={schema.label.warrantyInstallationStartDateVendor}
        />

        <FormLabel
          value={get(data, 'warrantyVendorEnd', '')}
          label={schema.label.warrantyInstallationEndDateVendor}
        />
      </Col>
      <Col lg="6" >
        <FormLabel
          value={get(data, 'warrantyCustStart', '')}
          label={'warranty_start_date_cust'}
        />

        <FormLabel
          value={get(data, 'warrantyCustEnd', '')}
          label={'warranty_end_date_cust'}
        />

        <FormLabel
          value={get(data, 'currentImei', '')}
          label={schema.label.currentImei}
        />

        <FormLabel
          value={get(data, 'currentMid', '')}
          label={schema.label.currentMid}
        />

        <FormLabel
          value={get(data, 'currentImsi', '')}
          label={schema.label.currentImsi}
        />

        <FormLabel
          value={get(data, 'currentPhoneNo', '')}
          label={schema.label.currentPhoneNo}
        />
      </Col>
    </Row>


  }



  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting2 } = this.state
    alertSetting2.show = isShow
    alertSetting2.type = type
    alertSetting2.content = content
    alertSetting2.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting2 })
  }

  componentWillMount() {


  }

  handleChange(event) {
    this.validate()
  }

  //DateRangePicker
  handleChangeS = event => {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ inputStart: event.target.value });
  };
  handleChangeF = event => {
    this.setState({ inputFinish: event.target.value });
  };
  handleEvent(event, picker) {
    this.setState({
      inputStart: picker.startDate.format("DD/MM/YYYY"),
      inputFinish: picker.endDate.format("DD/MM/YYYY")
    });
  }
  setHeaderSection(title, showLine = true) {
    return <div>
      {showLine && <div className="hr-line-dashed" />}
      <h3>{title}</h3>
      <div style={{ minHeight: '2rem' }}></div>
    </div>
  }

  setFormDatepicker(schema, field, fieldNameLabel, fieldForm, placeholder, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " "}
        {
          schema.required && schema.required.includes(fieldForm) &&
          <span className="required">*</span>
        }
      </label>
      <DateRangePicker
        id={field}
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

  setFormRedio(schema, value, fieldNameLabel, fieldForm, flex) {

    return <div className="form-group field field-string" style={{ padding: '0 ', flex: flex || 1 }}>
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
              this.onCheckedButton("A", fieldForm)
            }}
            active={value === "A"}
          >Active</Button>
          <Button
            className='button-radio-checkbox'
            onClick={(e) => {
              this.onCheckedButton("D", fieldForm)
            }}
            active={value === "D"}
          >Not Active</Button>
        </ButtonGroup>
      </div>

    </div>
  }

  onCheckedButton(isActive, fieldForm) {
    this.setState({
      [fieldForm]: isActive
    }, () => this.props.onChange(this.state));
  }

  onChange(name, nativeElement = true) {
    return (event) => {
      let value = nativeElement ? event.target.value : event.label
      // console.log("value:", value)
      !nativeElement && this.setState({ [name + "_value"]: event.value }, () => this.props.onChange(this.state));

      this.setState({
        [name]: value
      }, () => this.props.onChange(this.state));
    };
  }


  setFormInput(schema, field, fieldNameLabel, fieldForm, placeholder, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 ', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " :"}
        {
          schema.required && schema.required.includes(fieldForm) &&
          <span className="required">*</span>
        }
      </label>
      <input
        className="form-control" value={field}
        required={schema.required && schema.required.includes(fieldForm)}
        placeholder={placeholder}
        onChange={this.onChange(fieldForm)} />
    </div>
  }

  setFormDropdown(schema, field, fieldNameLabel, list, fieldForm, placeholder, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 ', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + " :"}
        {
          schema.required && schema.required.includes(fieldForm) &&
          <span className="required">*</span>
        }
      </label>
      <Dropdown
        options={schema.list && list}
        onChange={this.onChange(fieldForm, false)}
        value={field}
        placeholder={placeholder} />
    </div>
  }

  onChangeDate(name, value) {
    let sta = { [name]: value }
    let dateStart = moment(value, "DD/MM/YYYY")
    if (name === 'warrantyStartDate' && this.state.warrantyEndDate) {
      if (!(dateStart.isBefore(moment(this.state.warrantyEndDate, "DD/MM/YYYY")))) sta.warrantyEndDate = value
    }
    if (name === 'taxStartDate' && this.state.taxEndDate) {
      if (!(dateStart.isBefore(moment(this.state.taxEndDate, "DD/MM/YYYY")))) sta.taxEndDate = value
    }
    if (name === 'actStartDate' && this.state.actEndDate) {
      if (!(dateStart.isBefore(moment(this.state.actEndDate, "DD/MM/YYYY")))) sta.actEndDate = value
    }
    if (name === 'insuranceStartDate' && this.state.insuranceEndDate) {
      if (!(dateStart.isBefore(moment(this.state.insuranceEndDate, "DD/MM/YYYY")))) sta.insuranceEndDate = value
    }
    this.setState(sta, () => this.props.onChange(this.state));
  }

  onChangeInputDate(fieldForm) {
    this.setState({
      [fieldForm]: this.state[fieldForm]
    }, () => this.props.onChange(this.state));
  }

  //#endregion
  setFormLabel(schema, value, fieldNameLabel, flex) {
    return <div className="form-group field field-string" style={{ padding: '0 ', flex: flex || 1 }}>
      <label className="control-label" style={{ fontWeight: 500 }}>
        {schema.label && fieldNameLabel + "  "}
      </label>
      <label className="form-control" style={{ fontWeight: 500, border: '#FFF', boxShadow: 'inset 0 1px 1px rgb(255, 255, 255)', backgroundColor: '#EEE', paddingTop: 8 }}>
        {value}
      </label>
    </div>
  }



  async getPrintCertificate() {

    this.setAlertSetting(true, 5)
    let { header, formAction } = this.props

    var response = await fetch(ENDPOINT_BASE_URL + 'Vehicles/Profiles/' + formAction.personalId + '/PrintCertification', {

      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': header.idToken,
        'X-API-Key': header.redisKey,

      }
      // body: JSON.stringify({ userId: this.props.dataLogin.userId })
    });


    if (response.ok) {

      // console.log(JSON.stringify(response))
      console.log("xx :", JSON.stringify(response))
      console.log("response", response)

      const linkSource = `data:application/pdf;base64,${response.data}`;
      const downloadLink = document.createElement("a");
      const fileName = "หนังสือรับรองการติดตั้ง.pdf";
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }

    this.setAlertSetting(false, 5)
    // console.log("ddd", data)
  }

  CertificatePrint() {

    const { CertificatePrint, formAction } = this.props


    this.setAlertSetting(true, 5)

    CertificatePrint(formAction.personalId)


  }



  checkVinSHow(data) {
    // console.log("data", data)
  }

  handleInitFilePond() {

  }

  render() {
    const { vehicleBrandNav, licenseDate, modelNav, rentalPeriod, rentalUnitPrice, airtimePackageName, purchaseTypeName, airtimePackageDescription, files, nextPaymentDate,
      airtimeUnitPrice, paymentPeriodName, firstInstallationDate, dltProvinceNav, isRequireCertificated, bodyColor, Description, NextPaymentDate, PaymentPeriod,
      AirtimeunitPrice, warrantyPeriodMonth, RentalUnitPrice, orderingModel, Package, purchaseType, fuelConsumption, minFuelVoltage, maxFuelVoltage, standardTypeNav,
      fuelTank, speedLimit, thermalLimited, dltBodyTypeNav, activeStatusNav, vehicleStatusNav, vendorBodyTypeNav, dltVehicleTypeNav, vehicleTypeNav, insuranceStartDate,
      insuranceNo, DriverName, insuranceCost, insuranceCompany, insuranceType, insuranceEndDate, actStartDate, actEndDate, currentImsi, currentPhoneNo, taxStartDate,
      taxEndDate, specCode, vehicleName, vinNo, chassisNo, engineNo, tire, axle, licensePlateNo, currentMid, currentImei, provinceId, warrantyInstallationStartDateVendor,
      warrantyInstallationEndDateVendor, warrantyStartDateCust, warrantyEndDateCust, warrantyStartDate, warrantyEndDate, customerNav, fleetNav, sellerPartnerNav,
      purchaseDate, purchasePrice, productCode, productName, driverNav, productModel, installationDate, cargoLinkVehicleTypeNav, infoVinno, alertSetting2, attachInfo,
      tabNumber, attachCode, isActive, canCreate, lastCertificateId, dataDevice, dataPackage } = this.state
    const {

      schema, statusSubmit, dataLogin,
      VehicleBrandData, VehicleProvinceData, SellerData, VehicleTypeByLawData, VehicleTypeData, CargoLinkVehicleTypeData,
      VehicleBodyTypeData, VehicleFuelTypeData, CustomerData, FleetData, VehicleModelData, DriverData, VehicleBodyTypeByLawData,
      formAction

    } = this.props

    // console.log(schema)
    // console.log("dataLogin", dataLogin)

    // const canCreate = true
    let checkCanEdit = (canCreate == true || this.props.formAction.action === 'Edit')
    let tabNameDefault = [t("tab_information")]

    let tabPaneDefault = [
      // Vehicle Information
      <div>

        <form onSubmit={() => {
          this.props.checkVinno(vehicleBrandNav, vinNo)
        }} >
          <Row>
            <Col lg="6" >
              <FormSelectSearch
                mode={"single"}
                schema={schema}
                value={vehicleBrandNav}
                label={schema.label.vehicleBrandNav}
                list={VehicleBrandData}
                fieldForm={"vehicleBrandNav"}
                placeholder={"ph_vehicle_brand"}
                flex={1}
                disabled={this.props.formAction.action === 'Edit' ? true : false}
                onChange={(selected) => {


                  this.setState({
                    ["vehicleBrandNav"]: selected || []
                  }, () => this.props.onChange(this.state));
                }}
              />

            </Col>
            <Col lg="6" >
              <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
                <div className="form-group field field-string" style={{ padding: '0', flex: 2 }}>
                  {
                    <FormInput
                      schema={schema}
                      value={vinNo}
                      label={schema.label.vinNo}
                      fieldForm={"vinNo"}
                      placeholder={"ph_vinno"}
                      flex={1}
                      disabled={this.props.formAction.action === 'Edit' ? true : false}
                      maxLength={30}
                      onChange={this.onChange("vinNo")}
                    />
                  }
                </div>
                {
                  this.props.formAction.action !== 'Edit' &&
                  <div className="form-group field field-string" style={{ padding: '0', flex: 1 }}>

                    {/* <Button className="btn btn-default form-control" size="sm" type="submit" style={{ marginTop: 23, backgroundColor: "#c2c2c2", color: "#FFF" }}
                    >Check</Button> */}

                    <Button
                      className="btn btn-default form-control"
                      size="sm" type="submit"
                      style={{ marginTop: 24 }}

                    >{t('my_vehicles_77')}</Button>

                  </div>
                }
              </div>
            </Col>
          </Row>
        </form>

        {
          (canCreate === true || this.props.formAction.action === 'Edit') &&

          <Row>
            <Col lg="6" >
              <FormSelectSearch
                mode={"single"}
                schema={schema}
                value={modelNav}
                label={schema.label.modelNav}
                list={VehicleModelData}
                fieldForm={"modelNav"}
                placeholder={"ph_model"}
                //disabled={vehicleBrandNav === '51' ? true : false}
                flex={1}
                // disabled={Array.isArray(modelNav)}
                onChange={(selected) => {
                  this.setState({
                    ["modelNav"]: selected || []
                  }, () => this.props.onChange(this.state));
                }}
              />
            </Col>
            <Col lg="6" >
              <FormInput
                schema={schema}
                value={specCode}
                label={schema.label.specCode}

                fieldForm={"specCode"}
                placeholder={"ph_spec_code"}
                flex={1}
                //disabled={vehicleBrandNav === '51' ? true : false}
                maxLength={10}
                onChange={this.onChange("specCode")}
              />
            </Col>
          </Row>
        }
        {
          checkCanEdit &&

          <Row>
            <Col lg="6" >

              <FormInput
                schema={schema}
                value={orderingModel}
                label={schema.label.orderingModel}
                fieldForm={"orderingModel"}
                placeholder={"ph_ordering_model"}
                flex={1}
                //disabled={vehicleBrandNav === '51' ? true : false}
                maxLength={30}
                onChange={this.onChange("orderingModel")}
              />
            </Col>
            <Col lg="6" >

            </Col>
          </Row>
        }
        {
          checkCanEdit &&

          <Row>
            <Col lg="6" >
              <FormInput
                schema={schema}
                value={chassisNo}
                label={schema.label.chassisNo}
                fieldForm={"chassisNo"}
                placeholder={"ph_chassis"}
                flex={1}
                //disabled={vehicleBrandNav === '51' ? true : false}
                maxLength={30}
                onChange={this.onChange("chassisNo")}
              />
            </Col>
            <Col lg="6" >
              <FormInput
                schema={schema}
                value={engineNo}
                label={schema.label.engineNo}
                fieldForm={"engineNo"}
                placeholder={"ph_engineno"}
                flex={1}
                //disabled={vehicleBrandNav === '51' ? true : false}
                maxLength={30}
                onChange={this.onChange("engineNo")}
              />
            </Col>
          </Row>
        }
        {
          checkCanEdit &&
          <Row>
            <Col lg="6" >
              <FormInput
                type={"number"}
                schema={schema}
                value={tire}
                // //disabled={vehicleBrandNav === '51' ? true : false}
                label={schema.label.tire}
                fieldForm={"tire"}
                placeholder={"ph_tire"}
                flex={1}
                //disabled={!canCreate}
                onChange={this.onChange("tire")}
              />
            </Col>
            <Col lg="6" >
              <FormInput
                type={"number"}
                schema={schema}
                value={axle}
                label={schema.label.axle}
                fieldForm={"axle"}
                placeholder={"ph_axle"}
                // //disabled={vehicleBrandNav === '51' ? true : false}
                flex={1}
                //disabled={!canCreate}
                onChange={this.onChange("axle")}
              />
            </Col>
          </Row>
        }
        {
          checkCanEdit &&

          <Row>
            <Col lg="6" >

              <FormInput
                schema={schema}
                value={vehicleName}
                label={schema.label.vehicleName}
                fieldForm={"vehicleName"}
                placeholder={"ph_vehicle_name"}
                // //disabled={vehicleBrandNav === '51' ? true : false}
                flex={1}
                //disabled={!canCreate}
                maxLength={50}
                onChange={this.onChange("vehicleName")}
              />
            </Col>
            <Col lg="6" >
              <FormInput
                schema={schema}
                value={bodyColor}
                label={schema.label.bodyColor}
                fieldForm={"bodyColor"}
                placeholder={"ph_body_color"}
                // //disabled={vehicleBrandNav === '51' ? true : false}
                flex={1}
                //disabled={!canCreate}
                maxLength={50}
                onChange={this.onChange("bodyColor")}
              />
            </Col>
          </Row>

        }
        <hr style={{ color: 'black' }} />
        {
          checkCanEdit &&
          <Row>
            <Col lg="6" >
              <FormInput
                schema={schema}
                value={""}
                label={"realtime_157"}
                fieldForm={""}
                placeholder={"realtime_157"}
                // //disabled={vehicleBrandNav === '51' ? true : false}
                flex={1}
                //disabled={!canCreate}
                maxLength={50}
                onChange={this.onChange("")}
              />
            </Col>
          </Row>
        }
      </div >,
    ]

    if (canCreate === true || this.props.formAction.action !== 'Add') {
      tabNameDefault.push(t("tab_license"), t("tab_owner"), t("tab_seller")
        // , t("tab_warranty"), t("tab_tax"), t("tab_act"), t("tab_insurance"),
        //   t("tab_driver"), t("tab_image"), t("tab_type"), t("tab_setting")
      )

      if (checkCanEdit && lstLevelCanSettingOption.includes(dataLogin.userLevelId)) {
        tabNameDefault.push(t("vehicle_30"))
      }

      tabPaneDefault.push(

        // Vehicle License
        <div>

          {
            checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormInput
                  schema={schema}
                  value={licensePlateNo}
                  label={schema.label.licensePlateNo}
                  fieldForm={"licensePlateNo"}
                  placeholder={"ph_license_plate"}
                  flex={1}
                  //disabled={!canCreate}
                  maxLength={20}
                  onChange={this.onChange("licensePlateNo")}
                />
              </Col>
              <Col lg="6" >
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={dltProvinceNav}
                  label={schema.label.dltProvinceNav}
                  list={VehicleProvinceData}
                  fieldForm={"dltProvinceNav"}
                  placeholder={"ph_dlt_province"}
                  flex={1}
                  //disabled={!canCreate}
                  onChange={(selected) => {
                    this.setState({
                      ["dltProvinceNav"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
            </Row>
          }
          {
            checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormDatepicker
                  schema={schema}
                  value={licenseDate}
                  label={schema.label.licenseDate}
                  fieldForm={"licenseDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  onChange={this.onChangeDate}
                />
              </Col>
              <Col lg={!isEmpty(lastCertificateId) ? 4 : 6}>
                <FormInput
                  schema={schema}
                  value={lastCertificateId}
                  label={schema.label.isRequireCertificated}
                  fieldForm={"isRequireCertificated"}
                  placeholder={""}
                  flex={1}
                  //disabled={!canCreate}
                  // onChange={this.onChange("isRequireCertificated")}
                  disabled={true}
                />
              </Col>
              {
                (!isEmpty(lastCertificateId) && isRequireCertificated) &&
                <Col lg="1" style={{ marginTop: 26 }}>
                  <button className="btn btn-default form-control" onClick={() => this.CertificatePrint()} type="button"><i class="fa fa-print"></i></button>
                </Col>
              }

            </Row>

          }

        </div>,

        //Owner
        <div>
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={customerNav}
                  label={schema.label.customerNav}
                  list={CustomerData}
                  fieldForm={"customerNav"}
                  placeholder={"ph_customer"}
                  flex={1}
                  //disabled={!canCreate}
                  onChange={(selected) => {
                    this.setState({
                      ["customerNav"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
              <Col lg="6" >

                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={fleetNav}
                  label={schema.label.fleetNav}
                  list={FleetData}
                  fieldForm={"fleetNav"}
                  placeholder={"ph_fleet"}
                  flex={1}
                  disabled={isEmpty(FleetData) ? true : false}
                  onChange={(selected) => {
                    this.setState({
                      ["fleetNav"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
            </Row>
          }
        </div>,

        //Seller
        <div>
          {checkCanEdit &&
            <Row>
              {lstUserLavel.includes(dataLogin.userLevelId) &&
                <Col lg="6" >
                  <FormSelectSearch
                    mode={"single"}
                    schema={schema}
                    value={sellerPartnerNav}
                    label={schema.label.sellerPartnerNav}
                    list={SellerData}
                    fieldForm={"sellerPartnerNav"}
                    placeholder={"ph_seller_partner"}
                    flex={1}
                    //disabled={!canCreate}
                    onChange={(selected) => {
                      this.setState({
                        ["sellerPartnerNav"]: selected || []
                      }, () => this.props.onChange(this.state));
                    }}
                  />
                </Col>
              }
              <Col lg="6" >
                <FormDatepicker
                  schema={schema}
                  value={purchaseDate}
                  label={schema.label.purchaseDate}
                  fieldForm={"purchaseDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  onChange={this.onChangeDate}
                />
              </Col>
            </Row>
          }
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormInput
                  type={"number"}
                  schema={schema}
                  value={purchasePrice}
                  label={schema.label.purchasePrice}
                  fieldForm={"purchasePrice"}
                  placeholder={"ph_purchase_price"}
                  flex={1}
                  //disabled={!canCreate}
                  onChange={this.onChange("purchasePrice")}
                />
              </Col>
              <Col lg="6" >

              </Col>
            </Row>
          }
        </div>,

        //Warranty
        <div>
          {checkCanEdit &&
            <Row>
              <Col lg="6" >

                <FormDatepicker
                  schema={schema}
                  //disabled={vehicleBrandNav === '51' ? true : false}
                  value={warrantyStartDate}
                  label={schema.label.warrantyStartDate}
                  fieldForm={"warrantyStartDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  onChange={this.onChangeDate}
                />
              </Col>
              <Col lg="6" >
                <FormDatepicker
                  schema={schema}
                  //disabled={vehicleBrandNav === '51' ? true : false}
                  value={warrantyEndDate}
                  label={schema.label.warrantyEndDate}
                  fieldForm={"warrantyEndDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  minDate={warrantyStartDate}
                  onChange={this.onChangeDate}
                />
              </Col>
            </Row>
          }
        </div>,

        // Tax Data
        <div>
          {checkCanEdit &&

            <Row>
              <Col lg="6" >
                <FormDatepicker
                  schema={schema}
                  value={taxStartDate}
                  label={schema.label.taxStartDate}
                  fieldForm={"taxStartDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  onChange={this.onChangeDate}
                />
              </Col>
              <Col lg="6" >
                <FormDatepicker
                  schema={schema}
                  value={taxEndDate}
                  label={schema.label.taxEndDate}
                  fieldForm={"taxEndDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  minDate={taxStartDate}
                  onChange={this.onChangeDate}
                />
              </Col>
            </Row>
          }
        </div>,

        //Data Act
        <div>
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormDatepicker
                  schema={schema}
                  value={actStartDate}
                  label={schema.label.actStartDate}
                  fieldForm={"actStartDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  onChange={this.onChangeDate}
                />
              </Col>
              <Col lg="6" >
                <FormDatepicker
                  schema={schema}
                  value={actEndDate}
                  label={schema.label.actEndDate}
                  fieldForm={"actEndDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  minDate={actStartDate}
                  onChange={this.onChangeDate}
                />
              </Col>
            </Row>
          }
        </div>,

        //Insurance
        <div>
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormDatepicker
                  schema={schema}
                  value={insuranceStartDate}
                  label={schema.label.insuranceStartDate}
                  fieldForm={"insuranceStartDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  onChange={this.onChangeDate}
                />
              </Col>
              <Col lg="6" >
                <FormDatepicker
                  schema={schema}
                  value={insuranceEndDate}
                  label={schema.label.insuranceEndDate}
                  fieldForm={"insuranceEndDate"}
                  placeholder={"DD/MM/YYYY"}
                  flex={1}
                  minDate={insuranceStartDate}
                  onChange={this.onChangeDate}
                />
              </Col>
            </Row>
          }
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormInput
                  schema={schema}
                  value={insuranceCompany}
                  label={schema.label.insuranceCompany}
                  fieldForm={"insuranceCompany"}
                  placeholder={"ph_insurance_company"}
                  flex={1}
                  //disabled={!canCreate}
                  maxLength={100}
                  onChange={this.onChange("insuranceCompany")}
                />
              </Col>
              <Col lg="6" >
                <FormInput
                  schema={schema}
                  value={insuranceType}
                  label={schema.label.insuranceType}
                  fieldForm={"insuranceType"}
                  placeholder={"ph_insurance_type"}
                  flex={1}
                  //disabled={!canCreate}
                  maxLength={100}
                  onChange={this.onChange("insuranceType")}
                />
              </Col>
            </Row>

          }
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormInput
                  schema={schema}
                  value={insuranceNo}
                  label={schema.label.insuranceNo}
                  fieldForm={"insuranceNo"}
                  placeholder={"ph_insurance"}
                  flex={1}
                  //disabled={!canCreate}
                  maxLength={100}
                  onChange={this.onChange("insuranceNo")}
                />
              </Col>
              <Col lg="6" >
                <FormInput
                  type={"number"}
                  schema={schema}
                  value={insuranceCost}
                  label={schema.label.insuranceCost}
                  fieldForm={"insuranceCost"}
                  placeholder={"ph_insurance_cost"}
                  flex={1}
                  //disabled={!canCreate}
                  onChange={this.onChange("insuranceCost")}
                />
              </Col>
            </Row>
          }
        </div>,

        // Driver Information
        <div>
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                {/* {console.log("DriverData :", DriverData)} */}
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={driverNav}
                  label={schema.label.driverNav}
                  list={DriverData}
                  fieldForm={"driverNav"}
                  placeholder={"ph_driver_name"}
                  disabled={isEmpty(DriverData) ? true : false}
                  flex={1}
                  onChange={(selected) => {
                    this.setState({
                      ["driverNav"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
              <Col lg="6" >
              </Col>
            </Row>
          }
        </div>,

        //image
        <div>
          {/* {console.log("\n :", attachInfo)} */}
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormUploadNew
                  schema={{ "required": [""] }}
                  fieldForm="attachCode"
                  listType="file"
                  acceptFileType={["image/jpeg", "image/png", "application/pdf"]}
                  acceptMaxSizeMB={4}
                  label={'subscription_46'}
                  attachCode={attachCode}
                  attachInfo={attachInfo}
                  errorKey={'customer_115'}
                  action={this.props.formAction.action}
                  showRemoveIcon={false}
                  removeFile={(() => {
                    this.setState({
                      ["attachInfo"]: {}
                    }, () => this.props.onChange(this.state))
                  })}
                  response={(res) => {
                    if (res.status) {
                      // console.log("res.status", res.attachInfo)

                      this.setState({
                        ["attachCode"]: res.attachInfo.attachCode,
                        ["attachInfo"]: res.attachInfo
                      }, () => this.props.onChange(this.state))
                    }
                  }}
                />
              </Col>
              <Col lg="6" >
              </Col>
            </Row>
          }
        </div>,

        // Type
        <div>
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={dltVehicleTypeNav}
                  label={schema.label.dltVehicleTypeNav}
                  list={VehicleTypeByLawData}
                  fieldForm={"dltVehicleTypeNav"}
                  placeholder={"ph_vehicle_type"}
                  flex={1}
                  //disabled={!canCreate}
                  onChange={(selected) => {
                    this.setState({
                      ["dltVehicleTypeNav"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
              <Col lg="6" >
                {lstUserLavelOLT.includes(dataLogin.userLevelId) &&
                  <FormSelectSearch
                    mode={"single"}
                    schema={schema}
                    value={vehicleTypeNav}
                    label={schema.label.vehicleTypeNav}
                    list={VehicleTypeData}
                    fieldForm={"vehicleTypeNav"}
                    placeholder={"ph_vehicle_type"}
                    flex={1}
                    //disabled={!canCreate}
                    onChange={(selected) => {
                      this.setState({
                        ["vehicleTypeNav"]: selected || []
                      }, () => this.props.onChange(this.state));
                    }}
                  />
                }
              </Col>
            </Row>
          }
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={cargoLinkVehicleTypeNav}
                  label={schema.label.cargoLinkVehicleTypeNav}
                  list={CargoLinkVehicleTypeData}
                  fieldForm={"cargoLinkVehicleTypeNav"}
                  placeholder={"PH_cargolink"}
                  flex={1}
                  //disabled={!canCreate}
                  onChange={(selected) => {
                    this.setState({
                      ["cargoLinkVehicleTypeNav"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
              <Col lg="6" >
                <FormRadio
                  schema={{ "required": ["isActive"] }}
                  value={isActive}
                  label={schema.label.isActive}
                  fieldForm={"isActive"}
                  flex={1}
                  disabled={this.props.formAction.action === 'Add' ? false : true}
                  onClick={(isActive, fieldForm) => {
                    // console.log('sdfsdf', isActive)
                    this.onCheckedButton(isActive, fieldForm)
                  }}
                />

              </Col>
            </Row>
          }

          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={dltBodyTypeNav}
                  label={schema.label.dltBodyTypeNav}
                  list={VehicleBodyTypeByLawData}
                  fieldForm={"dltBodyTypeNav"}
                  placeholder={"ph_dltbody_type"}
                  flex={1}
                  disabled={isEmpty(VehicleBodyTypeByLawData) ? true : false}
                  onChange={(selected) => {
                    this.setState({
                      ["dltBodyTypeNav"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
              <Col lg="6" >
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={vendorBodyTypeNav}
                  label={schema.label.vendorBodyTypeNav}
                  list={VehicleBodyTypeData}
                  fieldForm={"vendorBodyTypeNav"}
                  placeholder={"ph_vendor_body_type"}
                  flex={1}
                  //disabled={!canCreate}
                  onChange={(selected) => {
                    this.setState({
                      ["vendorBodyTypeNav"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
            </Row>
          }
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                {/* <FormRadio
                   schema={{ "required": ["isActive"] }}
                   value={isActive}
                   label={schema.label.isActive}
                   fieldForm={"isActive"}
                   flex={1}
                   disabled={this.props.formAction.action === 'Add' ? false : true}
                   onClick={(isActive, fieldForm) => {
                     console.log('sdfsdf', isActive)
                     this.onCheckedButton(isActive, fieldForm)
                   }}
                 /> */}
              </Col>
              <Col lg="6" >
              </Col>
            </Row>
          }
        </div>,

        //Setting
        <div>
          {checkCanEdit &&
            <Row>
              {lstUserLavelOLT.includes(dataLogin.userLevelId) &&
                <Col lg="6" >
                  <FormInput
                    type={"number"}
                    schema={schema}
                    value={speedLimit}
                    label={schema.label.speedLimit}
                    fieldForm={"speedLimit"}
                    placeholder={"ph_speed_limit"}
                    flex={1}
                    //disabled={!canCreate}
                    onChange={this.onChange("speedLimit")}
                  />
                </Col>
              }
              {lstUserLavelOLT.includes(dataLogin.userLevelId) &&
                <Col lg="6" >
                  <FormInput
                    type={"number"}
                    schema={schema}
                    value={thermalLimited}
                    label={schema.label.thermalLimited}
                    fieldForm={"thermalLimited"}
                    placeholder={"ph_thermal_limited"}
                    flex={1}
                    //disabled={!canCreate}
                    onChange={this.onChange("thermalLimited")}
                  />
                </Col>
              }
            </Row>
          }
          {checkCanEdit &&
            <Row>
              <Col lg="6" >
                <FormSelectSearch
                  mode={"single"}
                  schema={schema}
                  value={standardTypeNav}
                  label={schema.label.standardTypeNav}
                  list={VehicleFuelTypeData}
                  fieldForm={"standardTypeNav"}
                  placeholder={"ph_standard_type"}
                  flex={1}
                  //disabled={!canCreate}
                  onChange={(selected) => {
                    this.setState({
                      ["standardTypeNav"]: selected || []
                    }, () => this.props.onChange(this.state));
                  }}
                />
              </Col>
              {lstUserLavelOLT.includes(dataLogin.userLevelId) &&
                <Col lg="6" >
                  <FormInput
                    type={"number"}
                    schema={schema}
                    value={fuelTank}
                    label={schema.label.fuelTank}
                    fieldForm={"fuelTank"}
                    placeholder={"ph_fuel_tank"}
                    flex={1}
                    //disabled={!canCreate}
                    onChange={this.onChange("fuelTank")}
                  />
                </Col>
              }
            </Row>
          }
          {checkCanEdit &&
            <Row>
              {lstUserLavelOLT.includes(dataLogin.userLevelId) &&
                <Col lg="6" >
                  <FormInput
                    type={"number"}
                    schema={schema}
                    value={minFuelVoltage}
                    label={schema.label.minFuelVoltage}
                    fieldForm={"minFuelVoltage"}
                    placeholder={"ph_min_fuel_voltage"}
                    flex={1}
                    //disabled={!canCreate}
                    onChange={this.onChange("minFuelVoltage")}
                  />
                </Col>
              }
              {lstUserLavelOLT.includes(dataLogin.userLevelId) &&
                <Col lg="6" >
                  <FormInput
                    type={"number"}
                    schema={schema}
                    value={maxFuelVoltage}
                    label={schema.label.maxFuelVoltage}
                    fieldForm={"maxFuelVoltage"}
                    placeholder={"ph_max_fuel_voltage"}
                    flex={1}
                    //disabled={!canCreate}
                    onChange={this.onChange("maxFuelVoltage")}
                  />
                </Col>
              }
            </Row>
          }
          {checkCanEdit &&
            <Row>
              {lstUserLavelOLT.includes(dataLogin.userLevelId) &&
                <Col lg="6" >
                  <FormInput
                    type={"number"}
                    schema={schema}
                    value={fuelConsumption}
                    label={schema.label.fuelConsumption}
                    fieldForm={"fuelConsumption"}
                    placeholder={"ph_fuel_consumption"}
                    flex={1}
                    //disabled={!canCreate}
                    onChange={this.onChange("fuelConsumption")}
                  />
                </Col>
              }
              <Col lg="6" >
              </Col>
              {/* <FormRadio
                 schema={schema}
                 value={activeStatusNav}
                 label={schema.label.activeStatusNav}
                 fieldForm={"activeStatusNav"}
                 flex={1}
                 onClick={(activeStatusNav, fieldForm) => {
                   this.onCheckedButton(activeStatusNav, fieldForm)
                 }}
               /> */}
            </Row>
          }
        </div>,

        // set Vehicle
        <div style={{ height: '100%' }}>
          {
            (lstUserLavel.includes(dataLogin.userLevelId) && checkCanEdit) &&
            <Row>
              <Col lg="12" >
                <FormSetVehicle />
              </Col>
            </Row>
          }
        </div>


      )

    }


    if (this.props.formAction.action !== 'Add') {


      tabNameDefault.push(t("tab_package"), t("tab_device"), t("tab_history"))
      tabPaneDefault.push(
        // GPS Package
        <div>

          {this.packageSingle}
          {(dataPackage !== '') &&

            <Row>
              <Col lg="6" >
                <FormLabel
                  value={get(dataPackage, 'packageName', '')}
                  label={'vehicle_04'}
                />
                <FormLabel
                  value={get(dataPackage, 'paymentPeriod', '')}
                  label={'vehicle_06'}
                />
                <FormLabel
                  value={get(dataPackage, 'purchaseType', '')}
                  label={'vehicle_08'}
                />


              </Col>
              <Col lg="6" >
                <FormLabel
                  value={get(dataPackage, 'packageDescription', '')}
                  label={'vehicle_05'}
                />

                <FormLabel
                  value={get(dataPackage, 'nextPaymentDate', '')}
                  label={'vehicle_07'}
                />
                <FormLabel
                  value={get(dataPackage, 'actualPrice', '') + ' บาท'}
                  label={'vehicle_03'}
                />
              </Col>
            </Row>
          }
        </div>,

        // GPS Device
        <div>
          {this.deviceSingle}
          {(dataDevice !== '') &&
            <Row>
              <Col lg="6" >
                <FormLabel
                  value={get(dataDevice, 'productCode', '')}
                  label={schema.label.productCode}
                />

                <FormLabel
                  value={get(dataDevice, 'productName', '')}
                  label={schema.label.productName}
                />

                <FormLabel
                  value={get(dataDevice, 'productModel', '')}
                  label={schema.label.productModel}
                />

                <FormLabel
                  value={get(dataDevice, 'installationDate', '')}
                  label={schema.label.firstInstallationDate}
                />

                <FormLabel
                  value={get(dataDevice, 'warrantyVendorStart', '')}
                  label={schema.label.warrantyInstallationStartDateVendor}
                />

                <FormLabel
                  value={get(dataDevice, 'warrantyVendorEnd', '')}
                  label={schema.label.warrantyInstallationEndDateVendor}
                />
              </Col>
              <Col lg="6" >
                <FormLabel
                  value={get(dataDevice, 'warrantyCustStart', '')}
                  label={'warranty_start_date_cust'}
                />

                <FormLabel
                  value={get(dataDevice, 'warrantyCustEnd', '')}
                  label={'warranty_end_date_cust'}
                />

                <FormLabel
                  value={get(dataDevice, 'currentImei', '')}
                  label={schema.label.currentImei}
                />

                <FormLabel
                  value={get(dataDevice, 'currentMid', '')}
                  label={schema.label.currentMid}
                />

                <FormLabel
                  value={get(dataDevice, 'currentImsi', '')}
                  label={schema.label.currentImsi}
                />

                <FormLabel
                  value={get(dataDevice, 'currentPhoneNo', '')}
                  label={schema.label.currentPhoneNo}
                />
              </Col>
            </Row>
          }
        </div>,

        // Service
        <div>
          <div style={{ display: 'flex', flexDirection: 'row', flex: 1, flexGrow: 1 }}>

            <div style={{ display: 'flex', flexDirection: 'row', flex: 2 }}>
              <div className="form-group field field-string" style={{ padding: '0 ', flex: 1 }}>
                <DataGrid
                  id="gridContainer"
                  dataSource=""
                  keyExpr="id"
                  allowColumnReordering={false}
                  showBorders={true}
                >
                  <Paging enabled={true} />
                  <Editing
                    mode="row"
                    allowUpdating={true}
                    allowDeleting={true}
                  />
                  <Column dataField="" caption="No" />
                  <Column dataField="" caption="Time" />
                  <Column dataField="" caption="Details" />
                  <Column dataField="" caption="Technician" />
                  <Column dataField="" caption="Stasus" />
                </DataGrid>
              </div>
            </div>
          </div>
        </div>,

      )
    }

    return (

      <Suspense fallback={null}>
        <Alert
          setting={alertSetting2}
          onConfirm={() => {
            if (alertSetting2.type === 4) {
              alertSetting2.show = false
            }
            else if (alertSetting2.type === 3) {
              alertSetting2.show = false
              this.submitConfirm()
            }
            else if (statusSubmit.status) {
              alertSetting2.show = true
              this.props.history.push("/homePage")
            }
            else {
              alertSetting2.show = false
            }
            this.setState({ alertSetting2 })
          }}
          onCancel={() => {
            alertSetting2.show = false
            this.setState({ alertSetting2 })
          }}
        />
        <Tabbed
          defaultActiveKey={tabNumber}
          tabName={tabNameDefault}
          tabPane={tabPaneDefault}
          onActive={(activeKey) => {
            this.setState({
              ['tabNumber']: ""
            }, () => this.props.onChange(this.state))
          }}
        >
        </Tabbed>

      </Suspense >
    );
  }
}


const mapStateToProps = (state) => ({
  isValid: state.formValidate.isValid,
  infoVehicle: state.vehicle.infoVehicle,
  formAction: state.vehicle.formAction,
  infoVinno: state.vehicle.infoVinno,
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  loading: state.customer.loading,
  infoVehicleExtension: state.vehicle.infoVehicleExtension,
  //dropdown
  VehicleBrandData: state.dropdown.VehicleBrandData,
  VehicleBodyTypeByLawData: state.dropdown.VehicleBodyTypeByLawData,
  VehicleProvinceData: state.dropdown.VehicleProvinceData,
  SellerData: state.dropdown.SellerData,
  VehicleTypeByLawData: state.dropdown.VehicleTypeByLawData,
  VehicleTypeData: state.dropdown.VehicleTypeData,
  CargoLinkVehicleTypeData: state.dropdown.CargoLinkVehicleTypeData,
  VehicleBodyTypeData: state.dropdown.VehicleBodyTypeData,
  VehicleFuelTypeData: state.dropdown.VehicleFuelTypeData,
  CustomerData: state.dropdown.CustomerData,
  FleetData: state.dropdown.FleetData,
  DriverData: state.dropdown.DriverData,
  VehicleModelData: state.dropdown.VehicleModelData,

});
const mapDispatchToProps = (dispatch) => ({
  addVehicle: (data) => dispatch(VehicleActions.addVehicle(data)),
  getInfoVehicle: (data) => dispatch(VehicleActions.getInfoVehicle(data)),
  checkVinno: (VehicleBrandId, VinNo) => dispatch(VehicleActions.checkVinno(VehicleBrandId, VinNo)),
  setVinSuccess1: (VehicleBrandId, VinNo) => dispatch(VehicleActions.setVinSuccess1(VehicleBrandId, VinNo)),

  CertificatePrint: (id) => dispatch(CustomerActions.CertificatePrint(id)),

});

export default connect(mapStateToProps, mapDispatchToProps)(VehicleData)
