import React, { Component, Suspense } from 'react'
import { connect } from 'react-redux'
import { Modal, Checkbox } from 'antd';
import { get, isEmpty } from 'lodash'
import Dropdown from 'react-dropdown';
import SubscriptionActions from '../../../../Redux/SubscriptionRedux'
import 'react-dropdown/style.css';
import Table from '../../../../Components/DataGridView/Table.js'
import { Col, Row, ButtonGroup } from 'reactstrap'
import DateRangePicker from "react-bootstrap-daterangepicker";
import { CheckCircleTwoTone, Button, DatePicker } from 'antd';
import Alert from '../../../../Components/Alert'
import Tabbed from '../../../../Components/Tabbed'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormUploadNew from '../../../../Components/FormControls/FormUploadNew'
import FormRadio from '../../../../Components/FormControls/FormRadio'
import FormTextArea from '../../../../Components/FormControls/FormTextArea'
import { t } from '../../../../Components/Translation'
import { ENDPOINT_BASE_URL } from '../../../../Config/app-config';
import MadalAddCustomer from './MadalAddCustomer'
import FormSelectGroup from '../../../../Components/FormControls/FormSelectGroup';



class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.formData,
      alertSetting3: {
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      seller: [],
      cusCode: "",
      URLcodeCusID: "",
      URLcodeCusCode: ENDPOINT_BASE_URL + 'Subscription/GridView/CustomerDTM?CustomerCode=',
      Suggestion: "",
      Suggestion1: "",
      showFormPopup: false,
      canAdd: true


    };



    this.onChangeDate = this.onChangeDate.bind(this);


  }

  componentDidMount() {
    this.getSeller()
    this.getCustomer()
  }

  async getSeller() {
    try {
      var response = await fetch(`https://ck0i7hnfbi.execute-api.ap-southeast-1.amazonaws.com/Prod/ServiceContract/Yanmar/DropdownGroup?name=Seller`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': this.props.header.redisKey,
          'Accept-Language': this.props.language == 'ja' ? 'jp' : this.props.language
        }
      });
      var data = await response.json();
      let list = data.map(e => ({
        groupName: e.groupName,
        items: e.items,
        key: e.key, value: e.value
      }
      ))
      this.setState({
        seller: list
      })
      console.log(this.state.seller)
    } catch (error) {
    }
  }

  async getCustomer() {
    try {
      var response = await fetch(`https://ck0i7hnfbi.execute-api.ap-southeast-1.amazonaws.com/Prod/ServiceContract/Yanmar/Customer?SellerId=1`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': this.props.header.redisKey,
          'Accept-Language': this.props.language == 'ja' ? 'jp' : this.props.language
        }
      });
      var data = await response.json();
      let list = data.map(e => ({
        id: e.id,
        status: e.status,
        seller: e.seller,
        buyer: e.buyer,
        phoneNo: e.phoneNo,
        lineId: e.lineId,
        taxNo: e.taxNo,
        editable: e.editable,
        deleteable: e.deleteable,
      }
      ))
      this.setState({
        customer: list
      })
      console.log(this.state.customer)
    } catch (error) {
    }
  }




  componentDidUpdate(prevProps) {


    let { language } = this.props
    if (prevProps.language !== language) {
      // console.log("statusLoadFile", statusLoadFile)
      this.getSeller()

    }

  }



  componentWillReceiveProps(nextProps) {

    this.setState({ ...nextProps.formData })
  }

  componentDidUpdate(prevProps, nextState) {

    let { infoCreate, infoMap, statusSubmit } = this.props

    if (prevProps.infoCreate !== infoCreate) {


      this.setAlertSetting(false, 5)


    }
    if (prevProps.infoMap !== infoMap) {
      this.setAlertSetting(false, 5)

    }
    if (prevProps.statusSubmit !== statusSubmit) {
      this.setAlertSetting(false, 5)

    }

  }



  componentWillMount() {
    // this.props.getVerifyCust(get(this.props.formAction, "data.subscriptionID", "No Data"))

    let { infoMapping } = this.props
    // console.log("Will", get(infoMapping, 'intCustCode', ''))

    // this.props.VerifyPaymentCust(get(this.props.formAction, "data.subscriptionID", "No Data"))

  }

  setAlertSetting(isShow, type, content = "", ErrorSubcode) {
    let { alertSetting3 } = this.state
    alertSetting3.show = isShow
    alertSetting3.type = type
    alertSetting3.content = content
    alertSetting3.ErrorSubcode = ErrorSubcode
    this.setState({ alertSetting3 })
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
    // console.log(event);
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

  openModal = (e) => {


    this.setState(state => ({ showFormPopup: !state.showFormPopup }))



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

  //   checkVisible(e) {
  //     let visible = false
  //     const lstUserLavel = [1, 2, 11, 12, 21]



  //     let { dataLogin, formAction } = this.props
  //     // console.log("userLevelId", dataLogin.userLevelId)
  //     if (lstUserLavel.includes(dataLogin.userLevelId) && get(formAction, "action", "") === "view") {


  //         visible = true
  //     }
  //     return visible
  // }
  getCreateCusF() {

    let { CustomerNav, payCustId } = this.state
    this.setAlertSetting(true, 5)
    if (CustomerNav !== "") {
      // this.setAlertSetting(true, 5)

      this.props.Map(CustomerNav)

      this.props.getCustomer(CustomerNav)
      this.props.getPay(payCustId)


    }

  }

  getCreateCusP() {

    let { payCustId } = this.state
    this.setAlertSetting(true, 5)
    // console.log("payCustId:", payCustId)
    if (payCustId !== "") {

      this.props.Map(payCustId)
    }

  }



  VerifyCust = () => {



    this.props.VerifyCust(get(this.props.formAction, 'data.subscriptionID', ''))
  }

  VerifyPaymentCust = () => {

    this.props.VerifyPaymentCust(get(this.props.formAction, 'data.subscriptionID', ''))
  }


  searchCus() {
    console.log("customerCodeSuggestion: ", this.state.customerCodeSuggestion)


    this.setState({ Suggestion: this.state.customerCodeSuggestion })
  }

  Searchpay() {
    console.log("customerCodeSuggestion: ", this.state.customerCodeSuggestion1)


    this.setState({ Suggestion1: this.state.customerCodeSuggestion1 })
  }

  MapCustomer(e) {
    let { CustomerNav } = this.state
    let intCustCode = get(e, 'row.data?.code', '')
    this.setAlertSetting(true, 5)
    // this.setAlertSetting(true, 5)
    console.log('MapCustomer')

    this.props.Create(CustomerNav, intCustCode)
  }
  MapPayCustomer(e) {
    this.setAlertSetting(true, 5)
    let { payCustId } = this.state
    let intCustCode = get(e, 'row.data?.code', '')
    console.log('MapPayCustomer')
    this.props.Create(payCustId, intCustCode)
  }





  render() {


    let { header, infoMyDealers, infoPackage, infoCustomerBY } = this.props
    const { taxId_pay, inputS, inputS1, Vertify, isIndividual,
      CustomerCode,
      CustomerCode1,
      mailingAddress_pay, searchGrid, currentAddress_pay,
      email_pay, BusinessType, corporateType, BusinessType_pay, corporateType_pay, alertSetting3, airtimePackageName,


      officialAddress_pay, billingAddress_pay, phoneNo_pay, corporateTypeName_pay, lineId_pay, displayName, mobile, packgeNav, payCustId,
      attachInfo, attachCode, itemStatus, CustomerNav, deliveryDate, subscriptionDate, airtimePackageDescription, DealerNav, taxId, phoneNo, corporateTypeName, lineId,
      email, officialAddress, billingAddress, taxBranchIdPay, isIndividualPay, currentAddress, mailingAddress, subscriberNo, taxBranchId, personalCard, attachInfoType7,
      isVerifyCust, seller,
      isVerifyPaymentCust, customer,
      customerCodeSuggestion, customerCodeSuggestion1, VerifyCustV, VerifyPaymentCustV, tabNumber, pw20, attachInfoType9, Certificated, attachInfoType10,
      personalCardPay, attachInfoType7Pay, pw20Pay, attachInfoType9Pay, CertificatedPay, attachInfoType10Pay, Suggestion, Suggestion1, showFormPopup, canAdd

    } = this.state


    // console.log("xx :", infoMyDealers, "cc :", infoPackage)
    // let isVerifyCust = false
    // let isVerifyPaymentCust = false
    // let CustomerCode = ""
    // let CustomerCode1 = ""


    const { schema, formAction, dataLogin, statusSubmit } = this.props
    const lstUserLavel = [1, 2, 11, 12]
    let tabNameDefault = [t('subscription_6')]
    let tabPaneDefault = [

      //ข้อมูลเจ้าของรถ
      < div >
        <Row>
          <Col lg={6} md={12}>
            <FormSelectGroup
              mode={"single"}
              schema={{ "required": ["DealerNav"] }}
              value={DealerNav}
              label={"customer_2"}
              list={seller}
              fieldForm={"DealerNav"}
              disabled={formAction.action === 'View' || formAction.action === 'Edit' ? true : false}
              placeholder={"customer_2"}
              flex={1}
              onChange={(selected) => {
                this.setState({
                  ["DealerNav"]: selected || []
                }, () => this.props.onChange(this.state));
              }}
            />
          </Col>
          <Col lg={6} md={12}>
            <FormLabel
              value={subscriptionDate}
              label={"subscription_3"}
            />
          </Col>
          <Col lg={6} md={12}>

          </Col>
        </Row>
        <Row >

          <Col lg={6} md={12}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <FormSelectSearch
                mode={"single"}
                schema={{ "required": ["CustomerNav"] }}
                value={CustomerNav}
                label={"subscription_27"}
                list={infoCustomerBY}
                fieldForm={"CustomerNav"}
                disabled={formAction.action === 'View' || formAction.action === 'Edit' ? true : false}
                placeholder={"subscription_27"}
                width={'150px'}
                onChange={(selected) => {
                  this.setState({
                    ["CustomerNav"]: selected || []
                  }, () => this.props.onChange(this.state));
                }}
              />
              <Button className="btn btn-primary btn-sm" style={{ marginTop: '25px', marginRight: '15px' }} onClick={() => { this.openModal() }} ><i className="fa fa-plus" style={{ marginRight: '5px' }}></i>Add</Button>
            </div>
          </Col>

          <Col lg={6} md={12}>
            <FormLabel
              value={deliveryDate}
              label={"customer_142"}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12}>
            <FormLabel
              value={phoneNo}
              label={"subscription_28"}
            />
          </Col>
          <Col lg={6} md={12}>
            <FormRadio
              schema={{ "required": [""] }}
              value={isIndividual}
              label={"customer_3"}
              fieldForm={"isIndividual"}
              flex={1}
              word={['customer_133', 'customer_132']}
              disabled={true}
              onClick={(isIndividual, fieldForm) => {

              }}
            />
          </Col>

          <Col lg={6} md={12}>
            <FormLabel
              value={BusinessType}
              label={"customer_46"}
            />
          </Col>

          <Col lg={6} md={12}>
            <FormLabel
              value={corporateType}
              label={"customer_48"}
            />
          </Col>

          <Col lg={6} md={12}>
            <FormLabel
              value={lineId}
              label={"subscription_29"}
            />
          </Col>
          <Col lg={6} md={12}>
            <FormLabel
              value={email}
              label={"customer_14"}
            />
          </Col>
          <Col lg={12} md={12}>
            <FormTextArea
              schema={{ "required": [""] }}
              value={currentAddress}
              label={"customer_36"}
              disabled={true}
              fieldForm={"currentAddress"}
            />
          </Col>
          <MadalAddCustomer visible={showFormPopup} onCancel={() => this.openModal()} sellerid={this.state.DealerNav} />


          {(lstUserLavel.includes(dataLogin.userLevelId) && formAction.action === 'Edit') &&
            <Col lg={6} md={12}>


              <div className=" field field-string" style={{ flex: 1 }}>
                <div className=" field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                  <div className=" field field-string" style={{ flex: 3, display: 'flex', flexDirection: 'row' }}>

                    <FormLabel
                      color={isVerifyCust === true ? "green" : "red"}
                      value={isVerifyCust === true ? t("yes") : t('no')}
                      label={"subscription_73"}
                    />
                  </div>

                  {isVerifyCust === false &&
                    <div className=" field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                      <Button
                        className="btn btn-default form-control"
                        size="sm" type="submit"
                        style={{ marginTop: 24 }}
                        onClick={() => {
                          this.VerifyCust()


                        }}
                      >{t('subscription_73')}</Button>
                    </div>
                  }
                </div>
              </div>
            </Col>
          }
          {(lstUserLavel.includes(dataLogin.userLevelId) && formAction.action === 'Edit') &&
            <Col lg={6} md={12}>
              <FormLabel

                value={CustomerCode}
                label={"subscription_74"}
              />
            </Col>
          }
          {isIndividual === true &&
            <Col lg={6} md={12}>
              {/* <FormUploadNew
                schema={{ "required": [""] }}
                fieldForm="personalCard"
                listType="file"
                acceptFileType={["image/jpeg", "image/png", "application/pdf"]}
                acceptMaxSizeMB={4}
                label={'customer_16'}
                attachCode={personalCard}
                attachInfo={attachInfoType7}
                errorKey={'customer_115'}
                action={'View'}
                showadd={true}
                removeFile={(() => {
                  this.setState({
                    ["attachInfoType7"]: {}
                  }, () => this.props.onChange(this.state))
                })}
                response={(res) => {
                  if (res.status) {
                    this.setState({
                      ["personalCard"]: res.attachInfo.attachCode,
                      ["attachInfoType7"]: res.attachInfo
                    }, () => this.props.onChange(this.state))
                  }
                }}
              /> */}
            </Col>
          }
          {isIndividual === false &&
            <Col lg={6} md={12}>
              <FormUploadNew
                schema={{ "required": [""] }}
                fieldForm="pw20"
                listType="file"
                acceptFileType={["image/jpeg", "image/png", "application/pdf"]}
                acceptMaxSizeMB={4}
                label={'customer_17'}
                attachCode={pw20}
                attachInfo={attachInfoType9}
                errorKey={'customer_121'}
                showadd={true}
                action={'View'}
                removeFile={(() => {
                  this.setState({
                    ["attachInfoType9"]: {}
                  }, () => this.props.onChange(this.state))
                })}
                response={(res) => {
                  if (res.status) {
                    this.setState({
                      ["pw20"]: res.attachInfo.attachCode,
                      ["attachInfoType9"]: res.attachInfo
                    }, () => this.props.onChange(this.state))
                  }
                }}
              />
            </Col>
          }
          {isIndividual === false &&
            <Col lg={6} md={12}>
              <FormUploadNew
                schema={{ "required": [""] }}
                fieldForm="Certificated"
                listType="file"
                acceptFileType={["image/jpeg", "image/png", "application/pdf"]}
                acceptMaxSizeMB={4}
                errorKey={'customer_116'}
                label={"customer_18"}
                attachCode={Certificated}
                attachInfo={attachInfoType10}
                showadd={true}
                action={'View'}
                removeFile={(() => {
                  this.setState({
                    ["attachInfoType10"]: {}
                  }, () => this.props.onChange(this.state))
                })}
                response={(res) => {
                  if (res.status) {
                    this.setState({
                      ["Certificated"]: res.attachInfo.attachCode,
                      ["attachInfoType10"]: res.attachInfo
                    }, () => this.props.onChange(this.state))
                  }
                }}
              />
            </Col>
          }







        </Row>


        {
          (isVerifyCust === true && (lstUserLavel.includes(dataLogin.userLevelId)) && formAction.action === "Edit" && isEmpty(CustomerCode)) &&
          this.setHeaderSection(t("subscription_69"))}



        < div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>


          {(isVerifyCust === true && (lstUserLavel.includes(dataLogin.userLevelId)) && formAction.action === "Edit" && isEmpty(CustomerCode)) &&


            <Row>
              <Col mb="12" style={{ textAlign: "right", marginBottom: 0, paddingRight: 18 }}>
                <div className="form-inline form-group">
                  <FormInput
                    schema={schema}
                    placeholder={"subscription_68"}
                    label={""}
                    value={customerCodeSuggestion}
                    onChange={(e) => {

                      this.setState({ customerCodeSuggestion: e.target.value })

                    }}
                  />{' '}
                  <Button className="btn btn-primary btn-sm" type="button" style={{ marginTop: 5 }} onClick={() => this.searchCus()}><i class="fa fa-search" style={{ marginRight: 5 }}></i>{t('search')}</Button>{' '}
                  <Button className="btn btn-primary btn-sm" type="button" style={{ marginTop: 5 }} onClick={() => this.getCreateCusF()}><i className="fa fa-plus" style={{ marginRight: 5 }}></i>{t('subscription_70')}</Button>
                </div>
              </Col>
            </Row>
          }

          {(isVerifyCust === true && (lstUserLavel.includes(dataLogin.userLevelId)) && formAction.action === "Edit" && isEmpty(CustomerCode)) &&
            <Table

              mode={"api"}
              serversideSource={!isEmpty(Suggestion) ? ENDPOINT_BASE_URL + 'Subscription/GridView/CustomerDTM?CustomerCode=' + Suggestion : ENDPOINT_BASE_URL + 'Subscription/GridView/CustomerDTM?CustID=' + CustomerNav}
              author={header.idToken}
              xAPIKey={header.redisKey}
              table_id={14}
              // settingTemplate={false}
              // showSetting={true}
              searchPanel={false}
              user_id={this.props.dataLogin.userId}
              editing={{
                enabled: true,
                allowUpdating: false,
                allowDeleting: false
              }}
              // selectedCallback={}
              initialCallback={this.tableInitial}
              // deleteCallback={(e) => this.deleteCallback(e)}
              // editCallback={(e) => this.MapCustomer(e)}
              autoExpandAll={false}
              remoteOperations={false}
              customButton={[
                {
                  hint: "Matching",
                  icon: "copy",
                  visible: true,
                  onClick: (e) => {
                    // do something ...
                    this.MapCustomer(e)
                  }
                },

              ]}

              column={[
                {
                  column_name: 'code',
                  column_caption: "subscription_74",
                },
                {
                  column_name: 'fullName',
                  column_caption: "customer_67",
                },
                {
                  column_name: 'contactPhone',
                  column_caption: "customer_68",
                },
                {
                  column_name: 'taxNo',
                  column_caption: "customer_81",
                },
              ]}
            >
            </Table>
          }

        </div>

      </div >,


      ////////
      < div >

        <Row>
          <Col lg={6} md={12}>
            <FormSelectSearch
              mode={"single"}
              schema={{ "required": ["payCustId"] }}
              value={payCustId}
              label={"subscription_39"}
              list={infoCustomerBY}
              disabled={formAction.action === 'View' || formAction.action === 'Edit' ? true : false}
              fieldForm={"payCustId"}
              placeholder={"subscription_39"}
              flex={1}
              onChange={(selected) => {
                this.setState({
                  ["payCustId"]: selected || []
                }, () => this.props.onChange(this.state));
              }}
            />
          </Col>
          <Col lg={6} md={12}>

            <div className=" field field-string" style={{ flex: 1 }}>
              <div className=" field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                <FormLabel
                  value={taxId_pay}
                  label={"customer_81"}
                  flex={3}
                />
                {isIndividual === false &&
                  <FormLabel
                    value={taxBranchIdPay}
                    label={""}
                    flex={1}
                  />

                }
              </div>
            </div>

          </Col>
          <Col lg={6} md={12}>
            <FormLabel
              value={phoneNo_pay}
              label={"subscription_28"}
            />
          </Col>
          <Col lg={6} md={12}>
            {/* <FormLabel
              value={corporateTypeName}
              label={"subscription_33"}
            /> */}

            <FormRadio
              schema={{ "required": [""] }}
              value={isIndividualPay}
              label={"customer_3"}
              fieldForm={"isIndividualPay"}
              flex={1}
              word={['customer_133', 'customer_132']}
              disabled={true}
              onClick={(isIndividual, fieldForm) => {

              }}
            />
          </Col>

          <Col lg={6} md={12}>
            <FormLabel
              value={BusinessType_pay}
              label={"customer_46"}
            />
          </Col>

          <Col lg={6} md={12}>
            <FormLabel
              value={corporateType_pay}
              label={"customer_48"}
            />
          </Col>

          <Col lg={6} md={12}>
            <FormLabel
              value={lineId_pay}
              label={"subscription_29"}
            />
          </Col>
          <Col lg={6} md={12}>
            <FormLabel
              value={email_pay}
              label={"customer_14"}
            />
          </Col>
          <Col lg={12} md={12}>
            <FormTextArea
              schema={{ "required": [""] }}
              value={currentAddress_pay}
              label={"customer_36"}
              disabled={true}
              fieldForm={"currentAddress"}
            />
          </Col>
          {(lstUserLavel.includes(dataLogin.userLevelId) && formAction.action === 'Edit') &&
            <Col lg={6} md={12}>


              <div className=" field field-string" style={{ flex: 1 }}>
                <div className=" field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                  <div className=" field field-string" style={{ flex: 3, display: 'flex', flexDirection: 'row' }}>

                    <FormLabel
                      color={isVerifyPaymentCust === true ? "green" : "red"}
                      value={isVerifyPaymentCust === true ? t("yes") : t('no')}
                      label={"subscription_73"}
                    />
                  </div>

                  {isVerifyPaymentCust === false &&
                    <div className=" field field-string" style={{ flex: 1, display: 'flex', flexDirection: 'row' }}>
                      <Button
                        className="btn btn-default form-control"
                        size="sm" type="submit"
                        style={{ marginTop: 24 }}
                        onClick={() => {
                          this.VerifyPaymentCust()
                        }}
                      >{t('subscription_73')}</Button>
                    </div>
                  }
                </div>
              </div>
            </Col>
          }
          {
            (lstUserLavel.includes(dataLogin.userLevelId) && formAction.action === 'Edit') &&
            <Col lg={6} md={12}>
              <FormLabel

                value={CustomerCode1}
                label={"subscription_74"}
              />
            </Col>
          }
          {isIndividual === true &&
            <Col lg={6} md={12}>
              <FormUploadNew
                schema={{ "required": [""] }}
                fieldForm="personalCardPay"
                listType="file"
                acceptFileType={["image/jpeg", "image/png", "application/pdf"]}
                acceptMaxSizeMB={4}
                label={'customer_16'}
                attachCode={personalCardPay}
                attachInfo={attachInfoType7Pay}
                errorKey={'customer_115'}
                action={formAction.action}
                showadd={true}
                removeFile={(() => {
                  this.setState({
                    ["attachInfoType7Pay"]: {}
                  }, () => this.props.onChange(this.state))
                })}
                response={(res) => {
                  if (res.status) {
                    this.setState({
                      ["personalCardPay"]: res.attachInfo.attachCode,
                      ["attachInfoType7Pay"]: res.attachInfo
                    }, () => this.props.onChange(this.state))
                  }
                }}
              />
            </Col>
          }
          {isIndividual === false &&
            <Col lg={6} md={12}>
              <FormUploadNew
                schema={{ "required": [""] }}
                fieldForm="pw20Pay"
                listType="file"
                acceptFileType={["image/jpeg", "image/png", "application/pdf"]}
                acceptMaxSizeMB={4}
                label={'customer_17'}
                attachCode={pw20Pay}
                attachInfo={attachInfoType9Pay}
                errorKey={'customer_121'}
                showadd={true}
                action={formAction.action}
                removeFile={(() => {
                  this.setState({
                    ["attachInfoType9Pay"]: {}
                  }, () => this.props.onChange(this.state))
                })}
                response={(res) => {
                  if (res.status) {
                    this.setState({
                      ["pw20Pay"]: res.attachInfo.attachCode,
                      ["attachInfoType9Pay"]: res.attachInfo
                    }, () => this.props.onChange(this.state))
                  }
                }}
              />
            </Col>
          }
          {isIndividual === false &&
            <Col lg={6} md={12}>
              <FormUploadNew
                schema={{ "required": [""] }}
                fieldForm="CertificatedPay"
                listType="file"
                acceptFileType={["image/jpeg", "image/png", "application/pdf"]}
                acceptMaxSizeMB={4}
                errorKey={'customer_116'}
                label={"customer_18"}
                attachCode={CertificatedPay}
                attachInfo={attachInfoType10Pay}
                showadd={true}
                action={formAction.action}
                removeFile={(() => {
                  this.setState({
                    ["attachInfoType10Pay"]: {}
                  }, () => this.props.onChange(this.state))
                })}
                response={(res) => {
                  if (res.status) {
                    this.setState({
                      ["CertificatedPay"]: res.attachInfo.attachCode,
                      ["attachInfoType10Pay"]: res.attachInfo
                    }, () => this.props.onChange(this.state))
                  }
                }}
              />
            </Col>
          }



        </Row>

        {
          (isVerifyPaymentCust === true && (lstUserLavel.includes(dataLogin.userLevelId)) && formAction.action === 'Edit' && isEmpty(CustomerCode1)) &&
          this.setHeaderSection(t("subscription_69"))}


        < div className="form-group field field-string" style={{ padding: '0 10px', flex: 1 }}>

          {((lstUserLavel.includes(dataLogin.userLevelId)) && formAction.action === 'Edit' && isEmpty(CustomerCode1)) &&
            <Row>
              <Col mb="12" style={{ textAlign: "right", marginBottom: 0, paddingRight: 18 }}>
                <div className="form-inline form-group">

                  <FormInput
                    schema={schema}
                    placeholder={"subscription_68"}
                    label={""}
                    value={customerCodeSuggestion1}
                    onChange={(e) => {

                      this.setState({ customerCodeSuggestion1: e.target.value })

                    }}
                  />{' '}
                  <Button className="btn btn-primary btn-sm" type="button" style={{ marginTop: 5 }} onClick={() => this.Searchpay()}><i class="fa fa-search" style={{ marginRight: 5 }}></i>{t('search')}</Button>{' '}
                  <Button className="btn btn-primary btn-sm" type="button" style={{ marginTop: 5 }} onClick={() => this.getCreateCusP()}><i className="fa fa-plus" style={{ marginRight: 5 }} ></i>{t('subscription_70')}</Button>
                </div>
              </Col>
            </Row>
          }


          {(isVerifyPaymentCust === true && (lstUserLavel.includes(dataLogin.userLevelId)) && formAction.action === 'Edit' && isEmpty(CustomerCode1)) &&
            <Table
              //subcription CustomerDTM
              mode={"api"}
              // serversideSource={CustomerCode1 !== "" ? ENDPOINT_BASE_URL + 'Subscription/GridView/CustomerDTM?CustID=' + payCustId + '&CustomerCode=' + customerCodeSuggestion1 : ENDPOINT_BASE_URL + 'Subscription/GridView/CustomerDTM?CustID=' + payCustId}
              serversideSource={!isEmpty(Suggestion1) ? ENDPOINT_BASE_URL + 'Subscription/GridView/CustomerDTM?CustomerCode=' + Suggestion1 : ENDPOINT_BASE_URL + 'Subscription/GridView/CustomerDTM?CustID=' + payCustId}

              author={header.idToken}
              xAPIKey={header.redisKey}
              table_id={78}
              // settingTemplate={false}
              // showSetting={false}
              searchPanel={false}
              user_id={this.props.dataLogin.userId}
              editing={{
                enabled: true,
                allowUpdating: false,
                allowDeleting: false
              }}
              // selectedCallback={}
              initialCallback={this.tableInitial}
              // deleteCallback={(e) => this.deleteCallback(e)}
              // editCallback={(e) => this.MapPayCustomer(e)}
              autoExpandAll={false}
              remoteOperations={false}
              customButton={[
                {
                  hint: "Matching",
                  icon: "copy",
                  visible: true,
                  onClick: (e) => {
                    // do something ...
                    this.MapPayCustomer(e)
                  }
                },

              ]}
              column={[
                {
                  column_name: 'code',
                  column_caption: "subscription_74",
                },
                {
                  column_name: 'fullName',
                  column_caption: "customer_67",
                },
                {
                  column_name: 'contactPhone',
                  column_caption: "customer_68",
                },
                {
                  column_name: 'taxNo',
                  column_caption: "customer_81",
                },
              ]}
            >
            </Table>
          }




        </div >




      </div>,

      ////
      < div >
        <Row>
          <Col lg={6} md={12}>
            {/* <FormSelectSearch
              mode={"single"}
              schema={{ "required": ["packgeNav"] }}
              value={packgeNav}
              disabled={formAction.action === 'View' || formAction.action === 'Edit' ? true : false}
              label={"subscription_40"}
              list={infoPackage}
              fieldForm={"packgeNav"}
              placeholder={"subscription_40"}
              flex={1}
              onChange={(selected) => {
                this.setState({
                  ["packgeNav"]: selected || []
                }, () => this.props.onChange(this.state));
              }}
            /> */}
          </Col>
          <Col lg={6} md={12}>
            <FormLabel
              value={airtimePackageDescription}
              label={"subscription_41"}
            />
          </Col>
        </Row>


      </div>,




    ]



    return (



      <Suspense fallback={null}>
        {/* <Alert
          setting={alertSetting3}
          onConfirm={() => {
            if (alertSetting3.type === 4) {
              alertSetting3.show = false
            }
            else {
              alertSetting3.show = false
            }
            this.setState({ alertSetting3 })
          }}
          onCancel={() => {
            alertSetting3.show = false
            this.setState({ alertSetting3 })
          }}
        /> */}

        <Alert
          setting={alertSetting3}
          onConfirm={() => {
            if (alertSetting3.type === 3) {
              alertSetting3.show = false

            }
            //if success
            else if (statusSubmit.key) {
              alertSetting3.show = true
              alertSetting3.show = false
            }
            else if (statusSubmit.status) {
              alertSetting3.show = true
              this.props.history.push("/subscription")
            }
            else {
              alertSetting3.show = false
              // alertSetting3.type = 2
              // alertSetting3.content = action + " User Failed"
            }
            this.setState({ alertSetting3 })
          }}
          onCancel={() => {
            alertSetting3.show = false
            this.setState({ alertSetting3 })
          }}
        />


        <Tabbed style={{}}
          id="Tabdata"
          defaultActiveKey={tabNumber}
          tabName={tabNameDefault}
          tabPane={tabPaneDefault}
        >
          onActive={(activeKey) => {
            this.setState({
              ['tabNumber']: ""
            }, () => this.props.onChange(this.state))
          }}
        </Tabbed>

      </Suspense >
    );
  }
}



const mapStateToProps = (state) => ({
  header: state.signin.header,
  dataLogin: state.signin.dataLogin,

  formAction: state.subscription.formAction,
  statusSubmit: state.subscription.statusSubmit,
  infoCreate: state.subscription.infoCreate,
  infoMap: state.subscription.infoMap,
  infoMyDealers: state.subscription.infoMyDealers,
  infoPackage: state.subscription.infoPackage,
  infoPackageID: state.subscription.infoPackageID,
  infoCustomerBY: state.subscription.infoCustomerBY,
  infogetCustomer: state.subscription.infogetCustomer,
  infogetPay: state.subscription.infogetPay,


});
const mapDispatchToProps = (dispatch) => ({
  VerifyCust: (id) => dispatch(SubscriptionActions.VerifyCust(id)),
  VerifyPaymentCust: (id) => dispatch(SubscriptionActions.VerifyPaymentCust(id)),

  getCustomer: (id) => dispatch(SubscriptionActions.getCustomer(id)),
  getPay: (id) => dispatch(SubscriptionActions.getPay(id)),
  // map == craete
  Map: (id) => dispatch(SubscriptionActions.Map(id)),
  // craete == map
  Create: (id, code) => dispatch(SubscriptionActions.Create(id, code)),



  // checkVinno: (VehicleBrandId, VinNo) => dispatch(VehicleActions.checkVinno(VehicleBrandId, VinNo))
});


export default connect(mapStateToProps, mapDispatchToProps)(Data)
