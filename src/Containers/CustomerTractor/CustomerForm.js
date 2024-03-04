import React, { useEffect, useState, Suspense } from "react";
import { connect } from "react-redux";
import CustomerActions from "../../Redux/CustomerRedux";
import PannelBox from "../../Components/PannelBox";
import { t, rTT, Alert } from "../../Components";
import { Row, Col, Select, AutoComplete } from "antd";
import {
  FormInput,
  FormLabel,
  FormSelectSearch,
  FormRadio,
  FormTextArea,
  FormSelectGroup,
} from "../../Components/FormControls";
import { SaveButton, CancelButton, FormLoading } from "../../Components";
import {
  ENDPOINT_BASE_URL_YNM,
  ENDPOINT_BASE_URL,
  YM_BASE_URL,
} from "../../Config/app-config";
import { BoxContrainer, Button } from "../../components_new";

const { Option } = Select;
const CustomerForm = (props) => {
  let { header, language, action, id, dataLogin } = props; // STATE
  let { setIdSelectCustomer } = props; // ACTION

  const [loading, setLoading] = useState({
    visible: false,
    tip: "กำลังโหลด...",
  });
  const [businessTypeList, setBusinessTypeList] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const [sellerLabel, setSellerLabel] = useState("");
  const [formData, setFormData] = useState({
    sellerId: "",
    businessTypeId: "",
    isIndividual: true,
    taxNo: "",
    prefix: "",
    firstname: "",
    lastname: "",
    address: "",
    phoneNo: "",
    email: "",
    lineId: "",
    sellerName: "",
  });
  const [formDataCurrent, setFormDataCurrent] = useState({
    sellerId: "",
    sellerName: "",
    businessTypeId: "",
    isIndividual: true,
    taxNo: "",
    prefix: "",
    firstname: "",
    lastname: "",
    address: "",
    phoneNo: "",
    email: "",
    lineId: "",
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

  let {
    sellerId,
    sellerName,
    businessTypeId,
    isIndividual,
    taxNo,
    prefix,
    firstname,
    lastname,
    address,
    phoneNo,
    email,
    lineId,
  } = formData;

  const setValue = (fieldName, value) =>
    setFormData({ ...formData, [fieldName]: value });

  useEffect(() => {
    // INITAIL MASTER
    getBusinesstype();
    // getSeller();

    // CHECK ACTION FORM
    if (action === "") window.location.replace("#/customer");
    if (action === "edit") getCustomerById(id);
  }, []);

  const getBusinesstype = async () => {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/customer/business`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": dataLogin.redis_key,
            "Accept-Language": language == "ja" ? "jp" : language,
          },
        }
      );

      var data = await response.json();
      let list = data.result.business_type_list.map((e) => ({
        key: e.id,
        value: e.name,
      }));
      setBusinessTypeList(list);
    } catch (error) {
      setBusinessTypeList([]);
    }
  };

  const getSeller = async (value) => {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Dealer?dealer_name=${value}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": props.dataLogin.redis_key,
            "Accept-Language": props.language == "ja" ? "jp" : props.language,
          },
        }
      );

      var data = await response.json();
      let list = data.result.dealer_list.map((e) => ({
        key: e.dealer_id,
        value: e.dealer_name,
        text: e.dealer_name,
      }));
      setSellerList(list);
    } catch (error) {
      setSellerList([]);
    }
  };
  const getCustomerById = async (id) => {
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังโหลด..." });
      var response = await fetch(`${YM_BASE_URL}fleet/setting/customer/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": props.dataLogin.redis_key,
        },
      });

      if (response.status === 200) {
        var data = await response.json();
        let {
          address,
          firstname,
          is_individual,
          business_name,
          business_id,
          email,
          lastname,
          lineId,
          phone,
          prefix,
          dealer_name,
          dealer_id,
          tax_id,
        } = data.result;

        let _data = {
          sellerId: dealer_id || "",
          sellerName: dealer_name || "",
          businessTypeId: business_id || "",
          prefix: prefix || "",
          firstname: firstname,
          lastname: lastname || "",
          isIndividual: is_individual,
          taxNo: tax_id,
          phoneNo: phone || "",
          email: email || "",
          lineId: lineId || "",
          address: address || "",
        };
        _data.businessTypeId = "" + _data.businessTypeId;

        setFormData(_data);
        setSellerLabel(dealer_name);
      }
      setLoading({ ...loading, visible: false });
    } catch (error) {
      setAlert(true, 2, error);
      setLoading({ ...loading, visible: false });
    }
  };

  const saveCustomer = async () => {
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังบันทึก..." });
      setAlert(false, 6);
      let body = {
        dealer_id: parseInt(formDataCurrent.sellerId),
        prefix: prefix,
        firstname: firstname,
        lastname: lastname,
        is_individual: isIndividual,
        tax_id: taxNo,
        phone: phoneNo,
        email: email,
        address: address,
        user_id: dataLogin.user_id,
      };

      if (action === "add") body.business_type_id = parseInt(businessTypeId);

      var response = await fetch(`${YM_BASE_URL}fleet/setting/Createcustomer`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": dataLogin.redis_key,
          "Accept-Language": props.language == "ja" ? "jp" : props.language,
        },
        body: JSON.stringify(body),
      });

      var data = await response.json();

      if ([200, 204].includes(data?.code)) {
        setAlert(true, 1, "บันทึกข้อมูลสำเร็จ");
      }
      if ([409].includes(data?.code)) {
        setAlert(true, 2, "ข้อมูลซ้ำกรุณากรอกใหม");
      }

      setLoading({ ...loading, visible: false });
    } catch (error) {
      setAlert(true, 2, error);
      setLoading({ ...loading, visible: false });
    }
  };

  const editCustomer = async (id) => {
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังบันทึก..." });
      setAlert(false, 6);
      let body = {
        dealer_id: parseInt(formDataCurrent.sellerId),
        prefix: prefix,
        firstname: firstname,
        lastname: lastname,
        is_individual: isIndividual,
        tax_id: taxNo,
        phone: phoneNo,
        email: email,
        address: address,
        user_id: dataLogin.user_id,
      };
      console.log(body);

      if (action === "edit") body.business_type_id = parseInt(businessTypeId);

      var response = await fetch(`${YM_BASE_URL}fleet/setting/customer/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": dataLogin.redis_key,
        },
        body: JSON.stringify(body),
      });

      var data = await response.json();

      if ([200, 204].includes(data?.code)) {
        setAlert(true, 1, "บันทึกข้อมูลสำเร็จ");
      }

      if ([409].includes(data?.code)) {
        setAlert(true, 2, "ข้อมูลซ้ำกรุณากรอกใหม");
      }

      setLoading({ ...loading, visible: false });
    } catch (error) {
      setAlert(true, 2, error);
      setLoading({ ...loading, visible: false });
    }
  };
  const onCheckRequired = () => {
    let messageList = [];
    if (formDataCurrent.sellerId === "")
      messageList.push("โปรดระบุชื่อตัวแทนจำหน่าย");
    if (businessTypeId === "") messageList.push("โปรดเลือกประเภทธุรกิจ");
    if (taxNo === "") messageList.push("โปรดระบุเลขประจำตัวผู้เสียภาษี");
    if (firstname === "") messageList.push("โปรดระบุชื่อ");
    if (
      email !== "" &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    )
      messageList.push("อีเมลไม่ถูกต้อง โปรดระบุอีกครั้ง");

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
    console.log(formDataCurrent),
    (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 3) {
              if (action === "add") {
                saveCustomer();
              }
              if (action === "edit") {
                editCustomer(id);
              }
            }
            if (alertSetting.type === 4) setAlert(false);
            if (alertSetting.type === 1)
              window.location.replace("#/Tractor/customer");
            if (alertSetting.type === 2) setAlert(false);
          }}
          onCancel={() => setAlert(false)}
        />

        <BoxContrainer title="subscription_27">
          <FormLoading loading={loading.visible} tip={loading.tip}>
            <Row>
              <Col xs={24} lg={12}>
                <FormRadio
                  schema={{ required: [""] }}
                  value={isIndividual}
                  label={"customer_3"}
                  fieldForm={"isIndividual"}
                  flex={1}
                  word={["customer_133", "customer_132"]}
                  disabled={false}
                  onClick={(value) => setValue("isIndividual", value)}
                />
              </Col>

              <Col xs={24} lg={12}>
                <div style={{ marginBottom: "10px", marginLeft: "7px" }}>
                  <label className="control-label" style={{ fontWeight: 500 }}>
                    {t("customerTractor_1")}{" "}
                    <span className="text-danger">*</span> :
                  </label>

                  <AutoComplete
                    style={{ width: "99%" }}
                    onSearch={(value) => {
                      if (value.length >= 3) getSeller(value);
                    }}
                    allowClear={true}
                    value={sellerName}
                    placeholder={t("customerTractor_1")}
                    // disabled={sellerId === "" ? true : false}
                    onSelect={(value, option) => {
                      console.log(option.key);
                      setFormDataCurrent({
                        sellerId: option.key !== undefined ? option.key : "",
                      });
                      setValue(
                        "sellerId",
                        option.key !== undefined ? option.key : ""
                      );
                      setValue("sellerName", value !== undefined ? value : "");
                    }}
                    onChange={(e, option) => {
                      setValue("sellerName", e !== undefined ? e : "");
                    }}
                    onClear={() => {
                      getSeller();
                    }}
                  >
                    {sellerList.map((item) => (
                      <Option
                        key={item.key}
                        value={item.value}
                        text={item.text}
                      ></Option>
                    ))}
                  </AutoComplete>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xs={4} lg={2}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={prefix}
                  label={"driver_33"}
                  placeholder="driver_33"
                  onChange={(e) => setValue("prefix", e.target.value)}
                />
              </Col>
              <Col xs={10} lg={5}>
                <FormInput
                  mode={"single"}
                  schema={{ required: ["firstname"] }}
                  fieldForm="firstname"
                  value={firstname}
                  label={"driver_34"}
                  placeholder="driver_34"
                  onChange={(e) => setValue("firstname", e.target.value)}
                />
              </Col>
              <Col xs={10} lg={5}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={lastname}
                  placeholder="driver_35"
                  label={"driver_35"}
                  onChange={(e) => setValue("lastname", e.target.value)}
                />
              </Col>
              <Col xs={24} lg={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: ["taxNo"] }}
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
              <Col xs={24} lg={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={phoneNo}
                  maxLength={10}
                  minLength={1}
                  placeholder={"customer_33"}
                  label={"customer_33"}
                  onChange={(e) => setValue("phoneNo", e.target.value)}
                />
              </Col>

              <Col xs={24} lg={12}>
                <FormSelectSearch
                  mode={"single"}
                  schema={{ required: ["businessType"] }}
                  fieldForm="businessType"
                  value={businessTypeId}
                  list={businessTypeList}
                  label={"customer_47"}
                  placeholder={"customer_47"}
                  onChange={(value) =>
                    setValue("businessTypeId", value !== undefined ? value : "")
                  }
                />
              </Col>
            </Row>

            <Row>
              <Col xs={24} lg={12}>
                <FormInput
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={email}
                  placeholder={"customer_14"}
                  label={"customer_14"}
                  onChange={(e) => setValue("email", e.target.value)}
                />
              </Col>
              <Col xs={24} lg={12}>
                <FormTextArea
                  mode={"single"}
                  maxlength="500"
                  schema={{ required: [""] }}
                  value={address}
                  placeholder={"customer_36"}
                  label={"customer_36"}
                  onChange={(e) => {
                    setValue("address", e.target.value);
                  }}
                />
              </Col>
            </Row>

            <div className="hr-line-dashed" />
            <div className="row" style={{ textAlign: "right", marginRight: 3 }}>
              <Button
                isCancelButton={true}
                onClick={() => window.location.replace("#/Tractor/customer")}
              />

              <Button isSaveButton={true} onClick={() => onCheckRequired()} />
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
  language: state.versatile.language,
  id: state.customer.id,
  action: state.customer.action,
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelectCustomer: (id, action) =>
    dispatch(CustomerActions.setIdSelectCustomer(id, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerForm);
