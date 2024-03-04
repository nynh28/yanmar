import React, { Suspense, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PannelBox from '../../Components/PannelBox'
import SubscriptionActions from '../../Redux/SubscriptionRedux'
import { t } from '../../Components/Translation'
import DataTable from './DataTeble'
import { Row, Col, Select, Button as ButtonAntd } from 'antd'
import { Forp, FormLabel, FormSelectSearch, FormRadio, FormTextArea, FormDatepicker, FormSelectGroup } from '../../Components/FormControls'
import { SaveButton, CancelButton, FormLoading, Alert } from '../../Components'
import MadalAddCustomer from './MadalAddCustomer'
import { AutoComplete } from 'antd';
import { ENDPOINT_BASE_URL } from '../../Config/app-config';
import moment from 'moment';
import { BoxContrainer, Button } from "../../components_new";
import { isEmpty } from 'lodash'


const { Option } = Select;
const SubscriptionForm = (props) => {
  let { header, language, action, id, vehicleRegister } = props // STATE
  let { setVehicleRegister, setIdSelectSubscription } = props // ACTION

  const [loading, setLoading] = useState({ visible: false, tip: "กำลังโหลด..." })
  const [showModal, setShowModal] = useState(false)
  const [sellerId, setSellerId] = useState("")
  const [sellerList, setSellerList] = useState([])
  const [customerList, setCustomerList] = useState([])
  // const [vehicleRegister, setVehicleRegister] = useState([])
  const [deliveryDate, setDeliveryDate] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    "id": "",
    "taxNo": "",
    "isIndividual": false,
    "phoneNo": "",
    "businessType": "",
    "lineId": "",
    "email": "",
    "address": ""
  })

  const [subscriptionInfo, setSubscriptionInfo] = useState({
    "seller": "",
    "buyer": "",
    "subscriptionDate": "",
    "deliveryDateInfo": ""
  })

  const [infoForUpdateContract, setInfoForUpdateContract] = useState({
    "subscriptionId": "",
    "contractItemId": ""
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

  let { taxNo, isIndividual, phoneNo, businessType, lineId, email, address } = customerInfo
  let { subscriptionDate, seller, buyer, deliveryDateInfo } = subscriptionInfo

  useEffect(() => {
    if (isEmpty(action)) window.location.replace("#/subscription")
    if (action !== "view") getSeller()
    if (action === "view" || action === "edit") getSubscriptionById(id)
  }, [])

  useEffect(() => {
    return () => {
      setIdSelectSubscription(null, null)
      setVehicleRegister([])
    }
  }, [])

  const getSeller = async () => {
    try {
      var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/DropdownGroup?name=Seller`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
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

  const autoComplete = async (value) => {
    try {
      var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Buyer?sellerid=${sellerId}&name=${value}`, {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': props.header.redisKey,
          'Accept-Language': props.language == 'ja' ? 'jp' : props.language
        }
      });

      var data = await response.json();

      setCustomerList(data)
    }

    catch (error) {
      setCustomerList([])
    }
  }

  const getCustomerInfo = async (customerId) => {
    try {
      var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Customer/${customerId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': props.header.redisKey,
          'Accept-Language': props.language == 'ja' ? 'jp' : props.language
        }
      });

      var data = await response.json();
      let { id, isIndividual, phoneNo, taxNo, businessType, address, lineId, email
      } = data

      setCustomerInfo({
        ...customerInfo,
        "id": id,
        "taxNo": taxNo,
        "isIndividual": isIndividual,
        "phoneNo": phoneNo || "",
        "businessType": businessType,
        "lineId": lineId || "",
        "email": email || "",
        "address": address || ""
      })
    }
    catch (error) {
    }
  }

  const getSubscriptionById = async (id) => {
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังโหลด..." })
      var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': props.header.redisKey,
          'Accept-Language': props.language == 'ja' ? 'jp' : props.language
        }
      });

      if (response.status === 200) {
        var data = await response.json();
        let {
          subscriptionId, subscriptionDate, contractItem, seller, buyer, isIndividual,
          phoneNo, taxNo, businessType, address, lineId, email
        } = data


        // console.log("getSubscriptionById : ", data)
        setCustomerInfo({
          ...customerInfo,
          "taxNo": taxNo,
          "isIndividual": isIndividual,
          "phoneNo": phoneNo || "",
          "businessType": businessType,
          "lineId": lineId || "",
          "email": email || "",
          "address": address || ""
        })

        setSubscriptionInfo({
          ...subscriptionInfo,
          "seller": seller,
          "buyer": buyer,
          "subscriptionDate": moment(subscriptionDate).format('DD-MM-YYYY'),
          "deliveryDateInfo": moment(contractItem.deliveryDate).format('DD-MM-YYYY'),
        })

        setInfoForUpdateContract({
          "subscriptionId": subscriptionId,
          "contractItemId": contractItem?.id
        })

        let { model, vin, engineNo, paymentMethod, contractNo } = contractItem
        setVehicleRegister([{
          model: model || "",
          vin,
          engineNo: engineNo || "",
          cashPayment: paymentMethod === "Leased" ? true : false,
          cashPaymentName: paymentMethod,
          contractNo: contractNo || "",
        }])

        setLoading({ ...loading, visible: false })
      }
    }

    catch (error) {
      setAlert(true, 2, error)
      setLoading({ ...loading, visible: false })
    }
  }

  const saveSubscription = async () => {
    if (action === "add") {
      try {
        setLoading({ ...loading, visible: true, tip: "กำลังบันทึก..." })
        setAlert(false, 6)

        let body = {
          "sellerId": sellerId,
          "buyerId": customerInfo.id,
          "contractItems": []
        }

        let contractItems = []
        vehicleRegister.forEach(item => {
          contractItems.push({
            "subscriberId": item.subscriberId,
            "deliveryDate": moment(deliveryDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
            "cashPayment": !item.cashPayment,
            "contractNo": item.contractNo
          })
        })

        body.contractItems = contractItems

        var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar`, {
          method: 'POST',
          headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': header.redisKey
          },
          body: JSON.stringify(body)
        })

        if (response.status === 200) {
          setAlert(true, 1, "บันทึกข้อมูลสำเร็จ")
        }
        setLoading({ ...loading, visible: false })
      } catch (error) {
        setAlert(true, 2, error)
        setLoading({ ...loading, visible: false })
      }
    }
    else if (action === "edit") {
      let { subscriptionId, contractItemId } = infoForUpdateContract
      try {
        setLoading({ ...loading, visible: true, tip: "กำลังบันทึก..." })
        setAlert(false, 6)

        let contractItem = {}
        if (vehicleRegister.length > 0) {
          let { cashPayment, contractNo } = vehicleRegister[0]
          contractItem = {
            cashPayment: !cashPayment,
            contractNo
          }
        }
        var response = await fetch(`${ENDPOINT_BASE_URL}ServiceContract/Yanmar/${contractItemId}`, {
          method: 'PUT',
          headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': header.redisKey
          },
          body: JSON.stringify({ subscriptionId, contractItem })
        })

        if (response.status === 204) {
          setAlert(true, 1, "บันทึกข้อมูลสำเร็จ")
        }

        setLoading({ ...loading, visible: false })
      } catch (error) {
        setAlert(true, 2, error)
        setLoading({ ...loading, visible: false })
      }
    }
  }

  const onCheckRequired = () => {

    let messageList = []
    if (action === "add") {
      if (sellerId === "") messageList.push("โปรดเลือกชื่อตัวแทนจำหน่าย")
      if (customerInfo.id === "") messageList.push("โปรดเลือกลูกค้า")
      if (deliveryDate === "") messageList.push("โปรดระบุวันที่ส่งมอบ")
      if (vehicleRegister.length === 0) messageList.push("โปรดเลือกรถที่ติดตั้ง")

      let vehicleIsPass = true
      vehicleRegister.forEach(item => {
        let cashPayment = !item.cashPayment
        if (!cashPayment && item.contractNo === "") vehicleIsPass = false
      })

      if (!vehicleIsPass) messageList.push("โปรดระบุเลขที่สัญญาไฟแนนซ์")
    }

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
        if (alertSetting.type === 3) saveSubscription()
        if (alertSetting.type === 4) setAlert(false)
        if (alertSetting.type === 1) window.location.replace("#/subscription")
      }}
      onCancel={() => setAlert(false)}
    />
    <MadalAddCustomer sellerId={sellerId} visible={showModal} onCancel={() => setShowModal(false)} />

    <BoxContrainer title={"subscription_64"}>
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
                onChange={(value) => setSellerId(value !== undefined ? value : "")}
              />
              :
              <FormLabel
                value={seller}
                label={"dealer"}
              />
            }
          </Col>

          <Col xs={24} lg={12}>
            <FormLabel
              value={subscriptionDate}
              label={"subscription_3"}
            />
          </Col>
        </Row>

        <Row>
          {action === "add" ?
            <Col xs={24} lg={12}>
              <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10 }}>
                <div style={{ flex: '90%' }}>
                  <label className="control-label" style={{ fontWeight: 500 }}>
                    {t("subscription_27")} <span className="text-danger">*</span> :
                  </label>

                  <AutoComplete
                    style={{ width: '100%' }}
                    onSearch={(value) => {
                      if (value.length >= 3) autoComplete(value)
                    }}
                    disabled={sellerId === "" ? true : false}
                    onSelect={(value, option) => { getCustomerInfo(option.key) }}
                  >
                    {customerList.map((item) => (
                      <Option key={item.key} value={item.value}></Option>
                    ))}
                  </AutoComplete>
                </div>
                <div style={{ flex: '10%' }}>
                  <ButtonAntd
                    className="btn btn-primary btn-sm btn-search-cust"
                    style={{ marginTop: '25px', marginRight: '15px' }}
                    onClick={() => setShowModal(true)}
                    disabled={sellerId === "" ? true : false}
                  >
                    <i className="fa fa-plus" style={{ marginRight: '5px' }} />{t('add')}
                  </ButtonAntd>
                </div>

                <style type="text/css">
                  {
                    `
                        .btn-search-cust {
                               border-radius: 0px 2px 2px 0px !important;
                        }
                      `
                  }
                </style>
              </div>
            </Col>
            : <Col xs={24} lg={12}>
              <FormLabel
                value={buyer}
                label={"subscription_27"}
              />
            </Col>}
          <Col xs={24} lg={12}>
            {
              action === "add" ?
                <FormDatepicker
                  schema={{ "required": ["deliveryDate"] }}
                  value={deliveryDate}
                  label={"วันที่ส่งมอบ"}
                  fieldForm={"deliveryDate"}
                  placeholder={"วันที่ส่งมอบ"}
                  flex={1}
                  allowClear={false}
                  onChange={(e, value) => {
                    setDeliveryDate(value)
                  }}
                /> :
                <FormLabel
                  value={deliveryDateInfo}
                  label={"วันที่ส่งมอบ"}
                />
            }

          </Col>
        </Row>

        <Row>
          <Col xs={24} lg={12}>
            <FormLabel
              value={taxNo}
              label={"customer_81"}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FormLabel
              value={isIndividual ? "บุคคลธรรมดา" : "นิติบุคคล"}
              label={"customer_3"}
            />
            {/* <FormRadio
              schema={{ "required": [""] }}
              value={isIndividual}
              label={"customer_3"}
              fieldForm={"isIndividual"}
              flex={1}
              word={['customer_133', 'customer_132']}
              disabled={true}
              onClick={(isIndividual, fieldForm) => { }}
            /> */}
          </Col>
        </Row>

        <Row>
          <Col xs={24} lg={12}>
            <FormLabel
              value={phoneNo}
              label={"subscription_28"}
            />
          </Col>

          <Col xs={24} lg={12}>
            <FormLabel
              value={businessType}
              label={"customer_46"}
            />
          </Col>
        </Row>

        <Row>
          <Col xs={24} lg={12}>
            <FormLabel
              value={lineId}
              label={"subscription_29"}
            />
          </Col>
          <Col xs={24} lg={12}>
            <FormLabel
              value={email}
              label={"customer_14"}
            />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <FormTextArea
              schema={{ "required": [""] }}
              value={address}
              label={"customer_36"}
              disabled={true}
              fieldForm={"currentAddress"}
            />
          </Col>

        </Row>

        <Row style={{ padding: 10 }}>
          <Col span={24}>
            <DataTable
              disabled={sellerId === "" ? true : false}
              sellerId={sellerId}
            />
          </Col>
        </Row>

        <div className="hr-line-dashed" />
        <div className="row" style={{ textAlign: "right", marginRight: 3 }}>
          <Button
            isCancelButton={true}
            onClick={() => window.location.replace("#/subscription")} />

          {
            ["add", "edit"].includes(action) && <Button
              isSaveButton={true}
              onClick={() => onCheckRequired()}
            />}

        </div>
      </FormLoading>
    </BoxContrainer>
  </Suspense>
}


const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  id: state.subscription.id,
  action: state.subscription.action,
  vehicleRegister: state.subscription.vehicleRegister
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelectSubscription: (id, action) => dispatch(SubscriptionActions.setIdSelectSubscription(id, action)),
  setVehicleRegister: (data) => dispatch(SubscriptionActions.setVehicleRegister(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionForm)
