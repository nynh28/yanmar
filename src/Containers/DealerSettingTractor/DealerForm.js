import React, { useEffect, useState, Suspense } from "react";
import { connect } from "react-redux";
import CustomerActions from "../../Redux/CustomerRedux";
import PannelBox from "../../Components/PannelBox";
import { t, rTT, Alert } from "../../Components";
import { Row, Col, Select, Input } from "antd";
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
import e from "cors";

const { Option } = Select;
const DelaerFormTractor = (props) => {
  let { header, language, action, id } = props; // STATE
  let { setIdSelectCustomer } = props; // ACTION

  const [loading, setLoading] = useState({
    visible: false,
    tip: "กำลังโหลด...",
  });
  const [businessTypeList, setBusinessTypeList] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const [sellerLabel, setSellerLabel] = useState("");
  const [formData, setFormData] = useState({
    address: "",
    phoneNo: "",
  });
  const [formDataCurrent, setFormDataCurrent] = useState({
    address: "",
    phoneNo: "",
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
    getSeller(id);

    // CHECK ACTION FORM
    if (action === "") window.location.replace("#/customer");
    if (action === "edit") getCustomerById(id);
  }, []);

  const getSeller = async (id) => {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Dealer?dealer_name=${id.dealer_name}&page=1&limit=10`,
        // `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/DropdownGroup?name=Seller`,
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
      console.log(data.result.dealer_list);
      let list = data.result.dealer_list.map((e) => ({
        key: e.dealer_id,
        value: e.dealer_name,
      }));
      console.log(list);
      setSellerList(list);
      // setTest(data.result.dealer_list);
    } catch (error) {
      setSellerList([]);
    }
  };

  const getCustomerById = async (id) => {
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังโหลด..." });
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/dealer/${id.dealer_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": props.dataLogin.redis_key,
            // user_id: props.dataLogin.user_id,
          },
        }
      );

      if (response.status === 200) {
        var data = await response.json();
        let { address, phoneNo, dealer_name, dealer_id } = data.result;

        let _data = {
          sellerId: dealer_id,
          phoneNo: phoneNo || "",
          address: address || "",
        };
        _data.businessTypeId = "" + _data.businessTypeId;

        setFormDataCurrent(_data);
        setFormData(_data);
        setSellerLabel(dealer_name);
      }
      setLoading({ ...loading, visible: false });
    } catch (error) {
      setAlert(true, 2, error);
      setLoading({ ...loading, visible: false });
    }
  };

  const saveCustomer = async (id) => {
    console.log(id);
    try {
      setLoading({ ...loading, visible: true, tip: "กำลังบันทึก..." });
      setAlert(false, 6);
      let body = {
        firstname: sellerLabel,
        user_id: props.dataLogin.user_id,
      };

      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/dealer/${id.dealer_id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": props.dataLogin.redis_key,
          },
          body: JSON.stringify(body),
        }
      );

      console.log(response);

      if ([200, 204].includes(response.status)) {
        setAlert(true, 1, "บันทึกข้อมูลสำเร็จ");
      }

      setLoading({ ...loading, visible: false });
    } catch (error) {
      setAlert(true, 2, error);
      setLoading({ ...loading, visible: false });
    }
  };

  const CreateDealer = async () => {
    let body = {
      dealer_name: sellerLabel,
      user_id: props.dataLogin.user_id,
    };
    try {
      var response = await fetch(`${YM_BASE_URL}fleet/setting/Createdealer`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": props.dataLogin.redis_key,
        },
        body: JSON.stringify(body),
      });
      var data = await response.json();
      if ([200, 204].includes(data?.code)) {
        setAlert(true, 1, "บันทึกข้อมูลสำเร็จ");
      }
      if ([409].includes(data?.code)) {
        setAlert(true, 2, "ข้อมูลซ้ำ");
      }
    } catch {}
  };

  const onCheckRequired = () => {
    // if (action === "edit") {
    //   setAlert(true, 4, "ข้อมูลไม่มีการเปลี่ยนแปลง");
    //   return;
    // }

    let messageList = [];
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
    console.log("hi", action),
    (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 3) {
              if (action === "edit") {
                saveCustomer(id);
              } else {
                CreateDealer();
              }
            }
            if (alertSetting.type === 4) setAlert(false);
            if (alertSetting.type === 2) setAlert(false);
            if (alertSetting.type === 1)
              window.location.replace("#/Tractor/dealer");
          }}
          onCancel={() => setAlert(false)}
        />

        <BoxContrainer title="dealer">
          <FormLoading loading={loading.visible} tip={loading.tip}>
            <Row>
              <Col xs={24} lg={12}>
                {action === "add" ? (
                  <div
                    style={{ width: "97%", marginLeft: 10, marginBottom: 10 }}
                  >
                    <label>
                      {t("dealer")} <span className="text-danger">*</span>:
                    </label>
                    <Input
                      mode={"single"}
                      schema={{ required: ["seller"] }}
                      fieldForm="seller"
                      placeholder={rTT(t("dealer"))}
                      onChange={
                        (e) => setSellerLabel(e.target.value)
                        // setValue("sellerId", value !== undefined ? value : "")
                      }
                    />
                  </div>
                ) : (
                  <div
                    style={{ width: "97%", marginLeft: 10, marginBottom: 10 }}
                  >
                    <label>
                      {t("dealer")} <span className="text-danger">*</span>:
                    </label>
                    <Input
                      value={sellerLabel}
                      label={"dealer"}
                      onChange={(e) => setSellerLabel(e.target.value)}
                    />
                  </div>
                )}
              </Col>

              {/* <Col xs={24} lg={12}>
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
              </Col> */}
            </Row>

            {/* <Row>
              <Col xs={24} lg={12}>
                <FormTextArea
                  mode={"single"}
                  schema={{ required: [""] }}
                  value={address}
                  placeholder={"customer_36"}
                  label={"customer_36"}
                  onChange={(e) => setValue("address", e.target.value)}
                />
              </Col>
            </Row> */}

            <div className="hr-line-dashed" />
            <div className="row" style={{ textAlign: "right", marginRight: 3 }}>
              <Button
                isCancelButton={true}
                onClick={() => window.location.replace("#/Tractor/dealer")}
              />

              <Button
                isSaveButton={true}
                onClick={() => {
                  // CreateDealer();
                  onCheckRequired();
                }}
              />
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

export default connect(mapStateToProps, mapDispatchToProps)(DelaerFormTractor);
