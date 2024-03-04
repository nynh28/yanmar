import React, { useEffect, useState, Suspense } from 'react'
import { connect } from 'react-redux'
import CustomerActions from '../../Redux/CustomerRedux'
import PannelBox from '../../Components/PannelBox'
import { t, rTT, Alert } from '../../Components'
import { Row, Col, Select } from 'antd'
import { FormInput, FormLabel, FormSelectSearch, FormRadio, FormTextArea, FormSelectGroup } from '../../Components/FormControls'
import { SaveButton, CancelButton, FormLoading } from '../../Components'
import { ENDPOINT_BASE_URL_YNM, ENDPOINT_BASE_URL } from '../../Config/app-config';
import { BoxContrainer, Button } from "../../components_new";

const { Option } = Select;
const CustomerForm = (props) => {
  let { header, language, action, id } = props // STATE
  let { setIdSelectCustomer } = props // ACTION

  const [loading, setLoading] = useState({ visible: false, tip: "กำลังโหลด..." })
  const [businessTypeList, setBusinessTypeList] = useState([])
  const [sellerList, setSellerList] = useState([])
  const [sellerLabel, setSellerLabel] = useState("")
  const [formData, setFormData] = useState({
    "sellerId": "",
    "businessTypeId": "",
    "isIndividual": true,
    "taxNo": "",
    "prefix": "",
    "firstname": "",
    "lastname": "",
    "address": "",
    "phoneNo": "",
    "email": "",
    "lineId": ""
  })
  const [formDataCurrent, setFormDataCurrent] = useState({
    "sellerId": "",
    "businessTypeId": "",
    "isIndividual": true,
    "taxNo": "",
    "prefix": "",
    "firstname": "",
    "lastname": "",
    "address": "",
    "phoneNo": "",
    "email": "",
    "lineId": ""
  })
  const [alertSetting, setAlertSetting] = useState({
    show: false,
    type: 4,
    content: "",
    messageList: [],
    ErrorSubcode: 0,
    validateCode: false,
    title: ""
  })

  let { sellerId, businessTypeId, isIndividual, taxNo, prefix,
    firstname, lastname, address, phoneNo, email, lineId } = formData

  const setValue = (fieldName, value) => setFormData({ ...formData, [fieldName]: value })

  useEffect(() => {
    // INITAIL MASTER
    getBusinesstype()
    getSeller()

    // CHECK ACTION FORM
    if (action === "") window.location.replace("#/customer")
    if (action === "edit") getCustomerById(id)
  }, [])

  const getBusinesstype = async () => {
    try {
      var response = await fetch(`${ENDPOINT_BASE_URL}/ServiceContract/Yanmar/Dropdown?name=BusinessType`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': header.redisKey,
          'Accept-Language': language == 'ja' ? 'jp' : language
        }
      })

      var data = await response.json();
      let list = data.map(e => ({ key: e.key, value: e.value }))
      setBusinessTypeList(list)
    } catch (error) {
      setBusinessTypeList([])
    }
  }

  const getSeller = async () => {
    try {
      var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/DropdownGroup?name=Seller`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': props.header.redisKey,
          'Accept-Language': props.language == 'ja' ? 'jp' : props.language
        }
      });
      var data = await response.json();

      let list = data.map(e => ({
        groupName: e.groupName,
        items: e.items,
        key: e.key, value: e.value

      }))
      setSellerList(list)
    } catch (error) {
      setSellerList([])
    }
  }

  const getCustomerById = async (id) => {
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังโหลด..." })
      var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Customer/${id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': props.header.redisKey
        }
      });

      if (response.status === 200) {
        var data = await response.json();
        let {
          address, firstname, isIndividual, businessTypeId, email,
          lastname, lineId, phoneNo, prefix, seller, sellerId, taxNo,
        } = data
        console.log("getCustomerById : ", data)

        let _data = {
          "sellerId": sellerId,
          "businessTypeId": businessTypeId || "",
          "prefix": prefix || "",
          "firstname": firstname,
          "lastname": lastname || "",
          "isIndividual": isIndividual,
          "taxNo": taxNo,
          "phoneNo": phoneNo || "",
          "email": email || "",
          "lineId": lineId || "",
          "address": address || ""
        }
        _data.businessTypeId = "" + _data.businessTypeId

        setFormDataCurrent(_data)
        setFormData(_data)
        setSellerLabel(seller)
      }
      setLoading({ ...loading, visible: false })
    } catch (error) {
      setAlert(true, 2, error)
      setLoading({ ...loading, visible: false })
    }
  }

  const saveCustomer = async () => {
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังบันทึก..." })
      setAlert(false, 6)
      let body = {
        "sellerid": parseInt(sellerId),
        "prefix": prefix,
        "firstname": firstname,
        "lastname": lastname,
        "isIndividual": isIndividual,
        "taxNo": taxNo,
        "phoneNo": phoneNo,
        "email": email,
        "lineId": lineId,
        "address": address,
      }

      if (action === "add") body.businessType = parseInt(businessTypeId)
      if (action === "edit") body.businessTypeId = parseInt(businessTypeId)

      var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Customer${action === "edit" ? `/${id}` : ""}`, {
        method: action === "add" ? 'POST' : "PUT",
        headers: {
          "Accept": 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': header.redisKey
        },
        body: JSON.stringify(body)
      })

      if ([200, 204].includes(response.status)) {
        setAlert(true, 1, "บันทึกข้อมูลสำเร็จ")
      }

      setLoading({ ...loading, visible: false })
    } catch (error) {
      setAlert(true, 2, error)
      setLoading({ ...loading, visible: false })
    }
  }

  const onCheckRequired = () => {
    if (action === "edit" && formData === formDataCurrent) {
      setAlert(true, 4, "ข้อมูลไม่มีการเปลี่ยนแปลง")
      return
    }

    let messageList = []
    if (sellerId === "") messageList.push("โปรดระบุชื่อตัวแทนจำหน่าย")
    if (businessTypeId === "") messageList.push("โปรดเลือกประเภทธุรกิจ")
    if (taxNo === "") messageList.push("โปรดระบุเลขประจำตัวผู้เสียภาษี")
    if (firstname === "") messageList.push("โปรดระบุชื่อ")
    if (email !== "" && !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) messageList.push("อีเมลไม่ถูกต้อง โปรดระบุอีกครั้ง")

    if (messageList.length > 0)
      setAlert(true, 4, "", messageList)
    else
      setAlert(true, 3, "save")
  }

  const setAlert = (show = false, type = 4, content = "", messageList = [], title = "") => {
    let alert = { ...alertSetting }
    alert.show = show
    alert.type = type
    alert.content = content
    alert.messageList = messageList
    alert.title = title
    setAlertSetting(alert)
  }

  return <Suspense fallback={null}>
    <Alert
      setting={alertSetting}
      onConfirm={() => {
        if (alertSetting.type === 3) saveCustomer()
        if (alertSetting.type === 4) setAlert(false)
        if (alertSetting.type === 1) window.location.replace("#/customer")
      }}
      onCancel={() => setAlert(false)}
    />

    <BoxContrainer title="subscription_27">
      <FormLoading loading={loading.visible} tip={loading.tip}>

        <Row>
          <Col xs={24} lg={12}>
            {action === "add" ?
              <FormSelectGroup
                mode={"single"}
                schema={{ "required": ["seller"] }}
                fieldForm="seller"
                value={sellerId}
                list={sellerList}
                label={"dealer"}
                placeholder={"dealer"}
                onChange={(value) => setValue("sellerId", value !== undefined ? value : "")}
              /> :
              <FormLabel
                value={sellerLabel}
                label={"dealer"}
              />
            }
          </Col>

          <Col xs={24} lg={12}>
            <FormSelectSearch
              mode={"single"}
              schema={{ "required": ["businessType"] }}
              fieldForm="businessType"
              value={businessTypeId}
              list={businessTypeList}
              label={"customer_47"}
              placeholder={"customer_47"}
              onChange={(value) => setValue("businessTypeId", value !== undefined ? value : "")}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={24} lg={12}>
            <FormRadio
              schema={{ "required": [""] }}
              value={isIndividual}
              label={"customer_3"}
              fieldForm={"isIndividual"}
              flex={1}
              word={['customer_133', 'customer_132']}
              disabled={false}
              onClick={(value) => setValue("isIndividual", value)}

            />
          </Col>

          <Col xs={24} lg={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": ["taxNo"] }}
              fieldForm="taxNo"
              value={taxNo}
              label={"customer_4"}
              maxLength={13}
              minLength={1}
              placeholder={"customer_4"}
              flex={3}
              onChange={(e) => setValue("taxNo", e.target.value)}

            />
          </Col>
        </Row>

        <Row>
          <Col xs={24} lg={4}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={prefix}
              label={"driver_33"}
              placeholder="driver_33"
              onChange={(e) => setValue("prefix", e.target.value)}
            />
          </Col>

          <Col xs={24} lg={8}>
            <FormInput
              mode={"single"}
              schema={{ "required": ["firstname"] }}
              fieldForm="firstname"
              value={firstname}
              label={"driver_34"}
              placeholder="driver_34"
              onChange={(e) => setValue("firstname", e.target.value)}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={lastname}
              placeholder="driver_35"
              label={"driver_35"}
              onChange={(e) => setValue("lastname", e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={24} lg={12}>
            <FormTextArea mode={"single"}
              schema={{ "required": [""] }}
              value={address}
              placeholder={"customer_36"}
              label={"customer_36"}
              onChange={(e) => setValue("address", e.target.value)}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={phoneNo}
              maxLength={10}
              minLength={1}
              placeholder={"customer_33"}
              label={"customer_33"}
              onChange={(e) => setValue("phoneNo", e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={24} lg={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={lineId}
              placeholder={"customer_15"}
              label={"customer_15"}
              onChange={(e) => setValue("lineId", e.target.value)}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FormInput
              mode={"single"}
              schema={{ "required": [""] }}
              value={email}
              placeholder={"customer_14"}
              label={"customer_14"}
              onChange={(e) => setValue("email", e.target.value)}
            />
          </Col>
        </Row>

        <div className="hr-line-dashed" />
        <div className="row" style={{ textAlign: "right", marginRight: 3 }}>
          <Button
            isCancelButton={true}
            onClick={() => window.location.replace("#/customer")} />

          <Button
            isSaveButton={true}
            onClick={() => onCheckRequired()}
          />
        </div>
      </FormLoading>
    </BoxContrainer>
  </Suspense>
}

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  language: state.versatile.language,
  id: state.customer.id,
  action: state.customer.action
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelectCustomer: (id, action) => dispatch(CustomerActions.setIdSelectCustomer(id, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm)
