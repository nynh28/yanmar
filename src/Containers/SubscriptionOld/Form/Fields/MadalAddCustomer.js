import React, { Component } from 'react'
import { connect } from 'react-redux'
// import BasicData from "./Form/Fields/BasicData"
// import { setSchema } from './Form/schema.js'
import { Modal } from 'antd';
import { Col, Row } from 'reactstrap'
import FormInput from '../../../../Components/FormControls/FormInput'
import FormLabel from '../../../../Components/FormControls/FormLabel'
import FormSelectSearch from '../../../../Components/FormControls/FormSelectSearch'
import FormTextArea from '../../../../Components/FormControls/FormTextArea'
import FormRadio from '../../../../Components/FormControls/FormRadio';
import FormSelectGroup from '../../../../Components/FormControls/FormSelectGroup';
import { t } from '../../../../Components/Translation'
import { useTranslation } from 'react-i18next'
const lstTaxBranch = ['taxId', 'taxBranchId', 'groupTaxId', 'groupTaxBranchId', 'mobile']

const FormInputCus = (arg) => {
  const { t } = useTranslation()

  return (
    <input
      className="form-control"
      type={arg.type}
      value={arg.value}
      required={arg.required}
      placeholder={t(arg.placeholder)}
      onChange={(e) => {
        arg.onChange(e)
        if (e.target.value !== '') {
          e.target.setCustomValidity("");
        }
      }}
      onInvalid={(e) => {
        // console.log("onInvalid : ", e)
        if (e.target.value === '') {
          e.target.setCustomValidity(t('invalid_field_required'));
        } else {
          e.target.setCustomValidity("");
        }
      }}
    />

  )
}

class MadalAddCustomer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sellerid: "",
      officialAddress: "",
      taxId: "",
      phoneNo: "",
      lineId: "",
      email: "",
      isIndividual: true,
      taxBranchId: "",
      vendorBusinessType: {},
    }
    let body = [{

      "prefix": this.state.prefix,
      "firstname": this.state.firstname,
      "lastname": this.state.lastname,
      "isIndividual": this.state.isIndividual,
      "business_type": 1,
      "tax_no": this.state.taxId,
      "phoneNo": this.state.phoneNo,
      "email": this.state.email,
      "lineId": this.state.lineId,
      "address": this.state.officialAddress,
    }]


  }


  componentDidMount() {
    this.getSeller()
    this.getBusinesstype()
    this.postCustomer()
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

    } catch (error) {

    }
  }

  async getBusinesstype() {
    try {
      var response = await fetch(`https://ck0i7hnfbi.execute-api.ap-southeast-1.amazonaws.com/Prod/ServiceContract/Yanmar/Dropdown?name=BusinessType`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': this.props.header.redisKey,
          'Accept-Language': this.props.language == 'ja' ? 'jp' : this.props.language
        }
      });

      var data = await response.json();
      let list = data.map(e => ({ key: e.key, value: e.value }))

      this.setState({
        businessType: list
      })
      // console.log(this.state.businessType)

    } catch (error) {

    }
  }

  postCustomer = async () => {
    console.log("test1")
    try {
      var response = await fetch(`https://ck0i7hnfbi.execute-api.ap-southeast-1.amazonaws.com/Prod/ServiceContract/Yanmar/Customer`, {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': this.props.header.redisKey,
          'Accept-Language': this.props.language == 'ja' ? 'jp' : this.props.language
        },
        body:
          JSON.stringify({
            "sellerid": this.prop.DealerNav,
            "prefix": this.state.prefix,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "isIndividual": this.state.isIndividual,
            "business_type": this.state.vendorBusinessType,
            "tax_no": this.state.taxId,
            "phoneNo": this.state.phoneNo,
            "email": this.state.email,
            "lineId": this.state.email,
            "address": this.state.officialAddress,
          })
      })
      console.log(response)


    } catch (error) {

    }
  }

  openModal = (e) => {


    this.setState(state => ({ showFormPopup: !state.showFormPopup }))



  }

  componentDidUpdate(prevProps) {


    let { language } = this.props
    if (prevProps.language !== language) {
      // console.log("statusLoadFile", statusLoadFile)
      this.getSeller()
      this.getBusinesstype()
    }

  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     ...nextProps.formData,
  //     inputTypeChange: nextProps.schema.inputTypeChange,
  //   })
  // }

  render() {

    const { isIndividual,
      businessType, vendorBusinessTypeNav,


      taxId, phoneNo, lineId,
      email, officialAddress, seller, taxBranchId, showFormPopup1, tax

    } = this.state

    const { prefix, firstname, lastname, schema, body } = this.props
    return (


      <Modal
        title={t("subscription_70")}
        width={1000}
        visible={this.props.visible}
        okText={t("add")}
        cancelText={t("cancel")}
        onOk={() => this.postCustomer()}
        onCancel={() => this.props.onCancel()}
      >

        <Row>
          <Col lg={6} md={12}>
            <FormRadio
              schema={{ "required": [""] }}
              value={isIndividual}
              label={"customer_3"}
              fieldForm={"isIndividual"}
              flex={1}
              word={['customer_133', 'customer_132']}
              disabled={false}
              onClick={(isIndividual, fieldForm) => {
                this.setState({ isIndividual })
                this.onCheckedButton(isIndividual, fieldForm)
              }}
            />
          </Col>
          <Col lg={6} md={12}>
            <div className=" field field-string" style={{ flex: 3, display: 'flex', flexDirection: 'row' }}>
              {
                <FormInput
                  mode={"single"}
                  schema={{ "required": [""] }}
                  value={taxId}
                  label={"customer_4"}
                  maxLength={13}
                  minLength={1}
                  placeholder={"customer_4"}
                  flex={3}
                  // onChange={(e) => {
                  //   this.setState({
                  //     ['taxId']: e.target.value.trim()
                  //   }, () => this.props.onChange(this.state));
                  // }}
                  onChange={(e) => {
                    console.log(e.target.value)
                    this.setState({
                      taxId: e.target.value
                    })
                  }}
                />
              }


              {isIndividual === false &&

                <FormInput
                  mode={"single"}
                  schema={{ "required": [""] }}
                  value={taxBranchId}
                  label={""}
                  maxLength={5}
                  minLength={1}
                  fieldForm={"taxBranchId"}
                  flex={1}
                  // onChange={(e) => {
                  //   this.setState({
                  //     ['taxBranchId']: e.target.value.trim()
                  //   }, () => this.props.onChange(this.state));
                  // }}
                  onChange={(e) => this.setState({ taxBranchId: e.target.value })}
                />
              }

              {/* <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={taxId}
              label={"customer_4"}
              onChange={(e) => this.setState({ taxId: e.target.value })}
            /> */}
            </div>
          </Col>
        </Row>
        <Row >
          <Col lg={2} md={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={prefix}
              label={"customer_6"}
              onChange={(e) => {
                console.log(e.target.value)
                this.setState({ prefix: e.target.value });
              }}
            />

          </Col>
          <Col lg={4} md={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              placeholders={"customer_7"}
              value={firstname}
              label={"customer_7"}
              onChange={(e) => {
                console.log(e.target.value)
                this.setState({ firstname: e.target.value });
              }}
            />
          </Col>
          <Col lg={6} md={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={lastname}
              placeholders={"customer_8"}
              label={"customer_8"}
              onChange={(e) => {
                console.log(e.target.value)
                this.setState({ lastname: e.target.value })
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={phoneNo}
              maxLength={10}
              minLength={1}
              placeholders={"customer_33"}
              label={"customer_33"}
              onChange={(e) => {
                console.log(e.target.value)
                this.setState({ phoneNo: e.target.value });
              }}
            />
          </Col>
          <Col lg={6} md={12}>
            <FormSelectSearch
              mode={"single"}
              schema={{ "required": [""] }}
              value={vendorBusinessTypeNav}
              list={businessType}
              label={"customer_47"}
              onChange={(e) => {
                console.log(e)
                console.log(businessType)
                this.setState({ vendorBusinessType: e })
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={6} md={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={lineId}
              placeholders={"customer_15"}
              label={"customer_15"}
              onChange={(e) => { this.setState({ lineId: e.target.value }); }}
            />
          </Col>
          <Col lg={6} md={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={email}
              placeholders={"customer_14"}
              label={"customer_14"}
              onChange={(e) => { this.setState({ email: e.target.value }); }}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={24}>
            <FormTextArea mode={"single"}
              schema={{ "required": [""] }}
              value={officialAddress}
              placeholders={"customer_36"}
              label={"customer_36"}
              onChange={(e) => this.setState({ officialAddress: e.target.value })}
            />
          </Col>
        </Row>
      </Modal>
    )
  }
}
const mapStateToProps = (state) => ({
  header: state.signin.header,
  language: state.versatile.language

})

export default connect(mapStateToProps)(MadalAddCustomer)
