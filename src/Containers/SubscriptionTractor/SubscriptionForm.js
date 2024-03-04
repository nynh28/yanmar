import React, { Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import PannelBox from "../../Components/PannelBox";
import SubscriptionActions from "../../Redux/SubscriptionRedux";
import { t, rTT } from "../../Components/Translation";
import DataTable from "./DataTeble";
import { Row, Col, Select, Button as ButtonAntd } from "antd";
import {
  Forp,
  FormLabel,
  FormSelectSearch,
  FormRadio,
  FormTextArea,
  FormDatepicker,
  FormSelectGroup,
} from "../../Components/FormControls";
import { SaveButton, CancelButton, FormLoading, Alert } from "../../Components";
import MadalAddCustomer from "./MadalAddCustomer";
import { AutoComplete } from "antd";
import { ENDPOINT_BASE_URL, YM_BASE_URL } from "../../Config/app-config";
import moment from "moment";
import { BoxContrainer, Button } from "../../components_new";
import { isEmpty } from "lodash";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import ModalDelete from "./ModalDelete";

const { Option } = Select;
const SubscriptionForm = (props) => {
  let { header, language, action, id, vehicleRegister, dataLogin, contractid } =
    props; // STATE
  let { setVehicleRegister, setIdSelectSubscription, setDealerId } = props; // ACTION
  let { redis_key } = dataLogin;

  const [loading, setLoading] = useState({
    visible: false,
    tip: "กำลังโหลด...",
  });
  const [showModal, setShowModal] = useState(false);
  const [sellerId, setSellerId] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerList, setDealerList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  // const [vehicleRegister, setVehicleRegister] = useState([])
  const [deliveryDate, setDeliveryDate] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    id: "",
    taxNo: "",
    isIndividual: false,
    phoneNo: "",
    businessType: "",
    lineId: "",
    email: "",
    address: "",
    subscriptionDate: "",
  });

  const [subscriptionInfo, setSubscriptionInfo] = useState({
    seller: "",
    buyer: "",
    subscriptionDate: "",
    deliveryDateInfo: "",
  });

  const [infoForUpdateContract, setInfoForUpdateContract] = useState({
    subscriptionId: "",
    contractItemId: "",
  });

  const [alertSetting, setAlertSetting] = useState({
    show: false,
    type: 4,
    content: "",
    messageList: [],
    ErrorSubcode: 0,
    validateCode: false,
    title: "",
  });
  const [customerId, setCustomerId] = useState("");

  let {
    taxNo,
    isIndividual,
    phoneNo,
    businessType,
    lineId,
    email,
    address,
    subscriptionDate,
  } = customerInfo;
  let { seller, buyer, deliveryDateInfo } = subscriptionInfo;

  useEffect(() => {
    if (isEmpty(action)) window.location.replace("#/Tractor/subscription");
    // if (action !== "view") getSeller();
    if (action === "edit" || action === "view") {
      // getSubscriptionById(id);
      getVehicleinfo();
    }
  }, []);

  useEffect(() => {
    return () => {
      setIdSelectSubscription(null, null);
      setVehicleRegister([]);
    };
  }, []);

  // useEffect(() => {
  //   getCustomer();
  // }, [sellerId]);

  const getSeller = async (value) => {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Dealer?dealer_name=${value}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": redis_key,
            "Accept-Language": language,
          },
        }
      );

      var data = await response.json();
      let list = data.result.dealer_list.map((e) => ({
        key: e.dealer_id,
        value: e.dealer_name,
        text: e.dealer_name,
      }));

      setDealerList(list);
    } catch (error) {
      console.log(error);
    }
  };
  const getCustomer = async (value) => {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Customer?dealer_id=${sellerId}&customer_name=${value}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": redis_key,
            "Accept-Language": language,
          },
        }
      );

      var data = await response.json();
      let list = data.result.customer_list.map((e) => ({
        key: e.customer_id,
        value: e.customer_name,
        text: e.customer_name,
      }));
      setCustomerList(list);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerinfo = async (value) => {
    try {
      var resp = await fetch(`${YM_BASE_URL}fleet/setting/customer/${value}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": redis_key,
          "Accept-Language": language,
        },
      });

      var data = await resp.json();
      let cusdata = data.result;
      setCustomerInfo({
        id: cusdata.customer_id,
        taxNo: cusdata.tax_id,
        isIndividual: cusdata.is_individual,
        phoneNo: cusdata.phone,
        businessType: cusdata.business_id,
        email: cusdata.email,
        address: cusdata.address,
      });
    } catch (err) {
      return err;
    }
  };

  // const autoComplete = async (value) => {
  //   try {
  //     var response = await fetch(
  //       `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Buyer?sellerid=${sellerId}&name=${value}`,
  //       {
  //         method: "get",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           "x-api-key": props.header.redisKey,
  //           "Accept-Language": props.language == "ja" ? "jp" : props.language,
  //         },
  //       }
  //     );

  //     var data = await response.json();

  //     setCustomerList(data);
  //   } catch (error) {
  //     setCustomerList([]);
  //   }
  // };

  // const getCustomerInfo = async (customerId) => {
  //   try {
  //     var response = await fetch(
  //       `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Customer/${customerId}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           "x-api-key": props.header.redisKey,
  //           "Accept-Language": props.language == "ja" ? "jp" : props.language,
  //         },
  //       }
  //     );

  //     var data = await response.json();
  //     let {
  //       id,
  //       isIndividual,
  //       phoneNo,
  //       taxNo,
  //       businessType,
  //       address,
  //       lineId,
  //       email,
  //     } = data;

  //     setCustomerInfo({
  //       ...customerInfo,
  //       id: id,
  //       taxNo: taxNo,
  //       isIndividual: isIndividual,
  //       phoneNo: phoneNo || "",
  //       businessType: businessType,
  //       lineId: lineId || "",
  //       email: email || "",
  //       address: address || "",
  //     });
  //   } catch (error) {}
  // };

  const getVehicleinfo = async () => {
    let id = "" + contractid;
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังโหลด..." });
      var resp = await fetch(`${YM_BASE_URL}fleet/setting/Registration/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": redis_key,
          "Accept-Language": props.language,
        },
      });
      var data = await resp.json();
      if (data?.code === 200) {
        let info = data.result;
        setLoading({ ...loading, visible: false, tip: "กำลังโหลด..." });
        setSellerName(info.dealer_name);
        setSellerId(info.dealer_id);
        setCustomerInfo({
          id: info.customer_id,
          taxNo: info.tax_id,
          isIndividual: info.is_individual,
          phoneNo: info.phone,
          businessType: info.business_name,
          email: info.email,
          address: info.address,
          subscriptionDate: info.register_date,
        });
        setCustomerId(info.customer_name);
        setDeliveryDate(info.delivery_date);
        setVehicleRegister([
          {
            model: info.model || "",
            vin_no: info.vin_no,
            engine_no: info.engine_no || "",
            cashPaymentName: info.payment_method_name,
            // cashPaymentName: paymentMethod,
            contractNo: info.leased_no || "",
          },
        ]);
      }
    } catch (err) {}
  };

  const getSubscriptionById = async (id) => {
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังโหลด..." });
      var response = await fetch(`${YM_BASE_URL}fleet/setting/vehicle/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": redis_key,
          "Accept-Language": props.language,
        },
      });

      if (response.status === 200) {
        var data = await response.json();
        getVehicleinfo();
        let {
          vid,
          vin_no,
          model_name,
          engine_no,
          dealer_name,
          dealer_id,
          vehicle_brand_id,
          vehicle_brand_name,
        } = data;

        setCustomerInfo({
          ...customerInfo,
          taxNo: taxNo,
          isIndividual: isIndividual,
          phoneNo: phoneNo || "",
          businessType: businessType,
          lineId: lineId || "",
          email: email || "",
          address: address || "",
        });

        setSubscriptionInfo({
          // ...subscriptionInfo,
          // seller: seller,
          // buyer: buyer,
          // subscriptionDate: moment(subscriptionDate).format("DD-MM-YYYY"),
          // deliveryDateInfo: moment(contractItem.deliveryDate).format(
          //   "DD-MM-YYYY"
          // ),
        });

        setInfoForUpdateContract({
          // subscriptionId: subscriptionId,
          // contractItemId: contractItem?.id,
        });

        // let { model, vin, engineNo, paymentMethod, contractNo } = contractItem;
        setVehicleRegister([
          {
            // model: model || "",
            // vin,
            // engineNo: engineNo || "",
            // cashPayment: paymentMethod === "Leased" ? true : false,
            // cashPaymentName: paymentMethod,
            // contractNo: contractNo || "",
          },
        ]);

        setLoading({ ...loading, visible: false });
      }
    } catch (error) {
      setAlert(true, 2, error);
      setLoading({ ...loading, visible: false });
    }
  };

  const saveSubscription = async () => {
    if (action === "add") {
      try {
        setLoading({ ...loading, visible: true, tip: "กำลังบันทึก..." });
        setAlert(false, 6);
        var test = 0;
        if (vehicleRegister[0].cashPayment == true) {
          test = 2;
        } else {
          test = 1;
        }
        let body = {
          dealer_id: parseInt(sellerId),
          customer_id: customerInfo.id,
          vehicle_id: vehicleRegister[0].vid,
          delivery_date: deliveryDate,
          leased_no: parseInt(customerInfo.taxNo),
          payment_method_id: test,
        };

        let vehicle_id = [];
        vehicleRegister.forEach((item) => {
          vehicle_id.push({});
        });

        // body.contractItems = contractItems;

        var response = await fetch(`${YM_BASE_URL}fleet/setting/Registration`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": header.redisKey,
          },
          body: JSON.stringify(body),
        });

        if (response.status === 200) {
          setAlert(true, 1, "บันทึกข้อมูลสำเร็จ");
        }
        setLoading({ ...loading, visible: false });
      } catch (error) {
        setAlert(true, 2, error);
        setLoading({ ...loading, visible: false });
      }
    } else if (action === "edit") {
      let { subscriptionId, contractItemId } = infoForUpdateContract;
      try {
        setLoading({ ...loading, visible: true, tip: "กำลังบันทึก..." });
        setAlert(false, 6);

        let contractItem = {};
        if (vehicleRegister.length > 0) {
          let { cashPayment, contractNo } = vehicleRegister[0];
          contractItem = {
            cashPayment: !cashPayment,
            contractNo,
          };
        }
        var response = await fetch(
          `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/${contractItemId}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "x-api-key": header.redisKey,
            },
            body: JSON.stringify({ subscriptionId, contractItem }),
          }
        );

        if (response.status === 204) {
          setAlert(true, 1, "บันทึกข้อมูลสำเร็จ");
        }

        setLoading({ ...loading, visible: false });
      } catch (error) {
        setAlert(true, 2, error);
        setLoading({ ...loading, visible: false });
      }
    }
  };

  const onCheckRequired = () => {
    let messageList = [];
    if (action === "add") {
      if (sellerId === "") messageList.push("โปรดเลือกชื่อตัวแทนจำหน่าย");
      if (customerInfo.id === "") messageList.push("โปรดเลือกลูกค้า");
      if (deliveryDate === "") messageList.push("โปรดระบุวันที่ส่งมอบ");
      if (vehicleRegister.length === 0)
        messageList.push("โปรดเลือกรถที่ติดตั้ง");

      // let vehicleIsPass = true;
      // vehicleRegister.forEach((item) => {
      //   let cashPayment = !item.cashPayment;
      //   if (!cashPayment && item.contractNo === "") vehicleIsPass = false;
      // });

      // if (!vehicleIsPass) messageList.push("โปรดระบุเลขที่สัญญาไฟแนนซ์");
    }

    if (messageList.length > 0) setAlert(true, 4, "", messageList);
    else setAlert(true, 3, "save");
  };

  const setAlert = (
    show = false,
    type = 4,
    content = "",
    messageList = [],
    title = ""
  ) => {
    let alert = { ...alertSetting };
    alert.show = show;
    alert.type = type;
    alert.content = content;
    alert.messageList = messageList;
    alert.title = title;
    setAlertSetting(alert);
  };
  return (
    console.log(vehicleRegister),
    (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 3) saveSubscription();
            if (alertSetting.type === 4) setAlert(false);
            if (alertSetting.type === 1)
              window.location.replace("#/Tractor/subscription");
            if (alertSetting.type === 2) setAlert(false);
          }}
          onCancel={() => setAlert(false)}
        />
        <MadalAddCustomer
          sellerId={sellerId}
          visible={showModal}
          onCancel={() => setShowModal(false)}
        />
        <BoxContrainer title={"subscription_64"}>
          <FormLoading loading={loading.visible} tip={loading.tip}>
            <Row>
              <Col xs={24} lg={12}>
                {action === "add" ? (
                  <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
                    <label
                      className="control-label"
                      style={{ fontWeight: 500 }}
                    >
                      {t("dealer")} :
                    </label>

                    <AutoComplete
                      style={{ width: "99%" }}
                      onSearch={(value) => {
                        if (value.length >= 3) getSeller(value);
                      }}
                      // disabled={sellerId === "" ? true : false}
                      allowClear={true}
                      onSelect={(value, option) => {
                        setSellerId(option.key);
                        setSellerName(option.value);
                        setDealerId(option.key);
                      }}
                    >
                      {sellerList.map((item) => (
                        <Option key={item.key} value={item.value}></Option>
                      ))}
                    </AutoComplete>
                  </div>
                ) : (
                  <FormLabel value={sellerName} label={"dealer"} />
                )}
              </Col>

              <Col xs={24} lg={12}>
                <FormLabel value={subscriptionDate} label={"subscription_3"} />
              </Col>
            </Row>

            <Row>
              {action === "add" ? (
                <Col xs={24} lg={12}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <div style={{ marginLeft: "10px", marginBottom: "10px" }}>
                        <label
                          className="control-label"
                          style={{ fontWeight: 500 }}
                        >
                          {t("subscription_27")} :
                        </label>

                        <AutoComplete
                          style={{ width: "99%" }}
                          onSearch={(value) => {
                            if (value.length >= 3) getCustomer(value);
                          }}
                          disabled={sellerId === "" ? true : false}
                          allowClear={true}
                          onSelect={(value, option) => {
                            setCustomerId(option.key);
                            getCustomerinfo(option.key);
                          }}
                        >
                          {customerList.map((item) => (
                            <Option key={item.key} value={item.value}></Option>
                          ))}
                        </AutoComplete>
                      </div>

                      {/* <AutoComplete
                      style={{ width: "100%" }}
                      onSearch={(value) => {
                        if (value.length >= 3) autoComplete(value);
                      }}
                      disabled={sellerId === "" ? true : false}
                      onSelect={(value, option) => {
                        getCustomerInfo(option.key);
                      }}
                    >
                      {customerList.map((item) => (
                        <Option key={item.key} value={item.value}></Option>
                      ))}
                    </AutoComplete> */}
                    </div>

                    <style type="text/css">
                      {`
                        .btn-search-cust {
                               border-radius: 0px 2px 2px 0px !important;
                        }
                      `}
                    </style>
                  </div>
                </Col>
              ) : (
                <Col xs={24} lg={12}>
                  <FormLabel value={customerId} label={"subscription_27"} />
                </Col>
              )}
              <Col xs={24} lg={12}>
                {action === "add" ? (
                  <FormDatepicker
                    schema={{ required: ["deliveryDate"] }}
                    value={deliveryDate}
                    label={"วันที่ส่งมอบ"}
                    fieldForm={"deliveryDate"}
                    placeholder={"วันที่ส่งมอบ"}
                    flex={1}
                    allowClear={false}
                    onChange={(e, value) => {
                      console.log(
                        moment(value, "DD/MM/YYYY").format("YYYY-MM-DD")
                      );
                      setDeliveryDate(
                        moment(value, "DD/MM/YYYY").format("YYYY-MM-DD")
                      );
                    }}
                  />
                ) : (
                  <FormLabel value={deliveryDate} label={"วันที่ส่งมอบ"} />
                )}
              </Col>
            </Row>

            <Row>
              <Col xs={24} lg={12}>
                <FormLabel value={taxNo} label={"customer_81"} />
              </Col>

              <Col xs={24} lg={12}>
                <FormRadio
                  schema={{ required: [""] }}
                  value={isIndividual}
                  label={"customer_3"}
                  fieldForm={"isIndividual"}
                  flex={1}
                  word={["customer_133", "customer_132"]}
                  disabled={true}
                  // onClick={(value) => setValue("isIndividual", value)}
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
                <FormLabel value={phoneNo} label={"subscription_28"} />
              </Col>

              <Col xs={24} lg={12}>
                <FormLabel value={businessType} label={"customer_46"} />
              </Col>
            </Row>

            <Row>
              <Col xs={24} lg={12}>
                <FormLabel value={email} label={"customer_14"} />
              </Col>
              <Col xs={24} lg={12}>
                <FormTextArea
                  schema={{ required: [""] }}
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
                onClick={() =>
                  window.location.replace("#/Tractor/subscription")
                }
              />

              {["add", "edit"].includes(action) && (
                <Button isSaveButton={true} onClick={() => onCheckRequired()} />
              )}
            </div>
          </FormLoading>
        </BoxContrainer>
      </Suspense>
    )
  );
};

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  id: state.subscription.id,
  action: state.subscription.action,
  vehicleRegister: state.subscription.vehicleRegister,
  language: state.versatile.language,
  contractid: state.subscription.contractid,
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelectSubscription: (id, action) =>
    dispatch(SubscriptionActions.setIdSelectSubscription(id, action)),
  setVehicleRegister: (data) =>
    dispatch(SubscriptionActions.setVehicleRegister(data)),
  setDealerId: (id) => dispatch(SubscriptionActions.setDealerId(id)),
  setVehicleData: (data) => dispatch(SubscriptionActions.setVehicleData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionForm);
