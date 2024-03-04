import React, { Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import SubscriptionActions, {
  setDealerId,
} from "../../Redux/SubscriptionRedux";
import Table from "../../Components/DataGridView/Table";
import {
  ENDPOINT_BASE_URL_YNM,
  ENDPOINT_BASE_URL_YNM2,
  YM_BASE_URL,
} from "../../Config/app-config";
import { get } from "lodash";
import { BoxContrainer, Button } from "../../components_new";
import axios from "axios";
import { FormSelectSearch } from "../../Components/FormControls";
import FormSelect from "../../Components/FormControls/Basic/FormSelect";
import { AutoComplete, Select } from "antd";
import { t } from "../../helpers/Translation";

const { Option } = Select;

const test = [
  { key: 1, value: "test1" },
  { key: 2, value: "test2" },
];

const Subscription = (props) => {
  let { dataLogin, subscriptPermission, language, history } = props; // STATE
  let { setIdSelectSubscription, setSubscriptPermission, setContractId } =
    props; // ACTION
  let { idToken, redis_key, user_id } = dataLogin;

  const [test2, setTest] = useState([]);
  const [dealerList, setDealerList] = useState([]);
  const [dealerName, setDealerName] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [customerName, setCusName] = useState("");
  const [vinList, setVinList] = useState([]);
  const [vinNo, setVinNo] = useState("");
  const [cusID, setCusId] = useState(undefined);
  const [dID, setdId] = useState("");
  const [vid, setvid] = useState(undefined);

  useEffect(() => {
    // getPermissionUser()
    // getRegis();
  }, []);

  const getRegis = async () => {
    var CID;
    if (cusID === undefined) {
      CID = "";
    } else {
      CID = cusID.key;
    }
    var VID;
    if (vid == undefined) {
      VID = "";
    } else {
      VID = vid;
    }
    try {
      var resp = await fetch(
        `${YM_BASE_URL}fleet/setting/Registration?limit=1000000&customer_id=${CID}&dealer_id=${dID}&vid=${VID}`,
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

      var data = await resp.json();
      if (data?.code == 200) {
        setTest(data.result.data_list);
      }
    } catch (err) {
      return err;
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
      if (data?.code === 200) {
        setDealerList(list);
        setDealerName("");
        setDealerId("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCustomer = async (value) => {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Customer?customer_name=${value}`,
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
      if (data?.code === 200) {
        setCustomerList(list);
        setCusId("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getVin = async (value) => {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Vehicle?vin_no=${value}`,
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
      let list = data.result.vehicle_list.map((e) => ({
        key: e.id,
        value: e.vin_no,
        text: e.vin_no,
      }));
      if (data?.code === 200) {
        setVinList(list);
        setvid("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onChangeForm = () => {
    props.setIdSelectSubscription(null, "add");
    window.location.replace("#/Tractor/subscription/subscriptionForm");
  };

  const viewCallback = (e) => {
    console.log(e);
    props.setIdSelectSubscription(e.row.key.vid, "view");
    setContractId(e.row.key.contract_item_id);
    window.location.replace("#/Tractor/subscription/subscriptionForm");
  };

  const editCallback = (e) => {
    console.log(e);
    props.setIdSelectSubscription(e.row.key.vid, "edit");
    setContractId(e.row.key.contract_item_id);
    window.location.replace("#/Tractor/subscription/subscriptionForm");
  };

  const checkVisible = (e) => {
    let itemStatusID = get(e, "row.data.key.can_view", "");
    return itemStatusID !== 0 && itemStatusID !== 3;
  };

  return (
    <Suspense fallback={null}>
      <>
        <BoxContrainer
          footer={
            <div className="row" style={{ textAlign: "right" }}>
              <Button
                isSearchButton={true}
                onClick={() => {
                  getRegis();
                }}
              />
            </div>
          }
        >
          <Row>
            <Col lg={12} md={12}>
              <div style={{ flex: "90%" }}>
                <label className="control-label" style={{ fontWeight: 500 }}>
                  {t("customer_80")} :
                </label>

                <AutoComplete
                  style={{ width: "97%" }}
                  onSearch={(value) => {
                    if (value.length >= 3) getCustomer(value);
                  }}
                  placeholder={t("customer_80")}
                  allowClear={true}
                  // disabled={sellerId === "" ? true : false}
                  onSelect={(value, option) => {
                    setCusId(option);
                  }}
                  onClear={() => {
                    getCustomer();
                    setCusId();
                  }}
                >
                  {customerList.map((item) => (
                    <Option key={item.key} value={item.value}></Option>
                  ))}
                </AutoComplete>
              </div>
            </Col>
            <Col lg={12} md={12}>
              <div>
                <label className="control-label" style={{ fontWeight: 500 }}>
                  {t("dealer")} :
                </label>

                <AutoComplete
                  style={{ width: "97%" }}
                  onSearch={(value) => {
                    if (value.length >= 3) getSeller(value);
                  }}
                  placeholder={t("dealer")}
                  // disabled={sellerId === "" ? true : false}
                  allowClear={true}
                  onSelect={(value, option) => {
                    setdId(option.key);
                    setDealerName(option.value);
                  }}
                  onClear={() => {
                    getSeller();
                    setdId();
                  }}
                >
                  {dealerList.map((item) => (
                    <Option key={item.key} value={item.value}></Option>
                  ))}
                </AutoComplete>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12}>
              <div>
                <label className="control-label" style={{ fontWeight: 500 }}>
                  {t("realtime_172")} :
                </label>

                <AutoComplete
                  style={{ width: "97%" }}
                  onSearch={(value) => {
                    if (value.length >= 3) getVin(value);
                  }}
                  placeholder={t("realtime_172")}
                  // disabled={sellerId === "" ? true : false}
                  allowClear={true}
                  onSelect={(value, option) => {
                    setvid(option.key);
                  }}
                  onClear={() => {
                    getVin();
                    setvid();
                  }}
                >
                  {vinList.map((item) => (
                    <Option key={item.key} value={item.value}></Option>
                  ))}
                </AutoComplete>
              </div>
            </Col>
          </Row>
        </BoxContrainer>
        <BoxContrainer
          title="side_menu_24"
          toolbarRight={
            <>
              <Button
                size="small"
                isAddButton={true}
                onClick={() => {
                  onChangeForm();
                }}
              />
               <Button
                size="small"
                isAddButton={true}
                text='Import excel'
                onClick={() => {
                  props.history.push("subscription/import");
                  // this.props.history.push("/Tractor/subscription/import");
                }}
               />
            </>
          }
        >
          <div style={{ height: `calc(100vh - 228px)` }}>
            <Table
              mode={"offline"}
              dataSource={test2}
              // serversideSource={}
              // author={idToken}
              // xAPIKey={redis_key}
              user_id={user_id}
              table_id={4}
              defaultPageSize={25}
              height={`calc(100vh - 300px)`}
              showSetting={false}
              // selectedCallback={(e) => {
              //   console.log(e.selectedRowKeys)
              //   setSubscriptionId(e.selectedRowKeys)
              // }}
              searchPanel={false}
              editing={{
                enabled: true,
                allowUpdating: false,
                allowDeleting: false,
              }}
              autoExpandAll={false}
              key={"id"}
              // columnCount="subscriberNo"
              customButton={[
                {
                  hint: "Edit",
                  icon: "edit",
                  visible: (e) => checkVisible(e),
                  onClick: (e) => editCallback(e),
                },
                {
                  hint: "view",
                  icon: "fa fa-eye",
                  visible: (e) => checkVisible(e),
                  onClick: (e) => viewCallback(e),
                },
              ]}
              column={[
                {
                  column_name: "seller_name",
                  column_caption: "ผู้ขายลูกค้า",
                },
                {
                  column_name: "buyer_name",
                  column_caption: "ชื่อลูกค้า",
                },
                {
                  column_name: "model_name",
                  column_caption: "รุ่นรถ",
                },
                {
                  column_name: "vin_no",
                  column_caption: "เลขรถ",
                },
                {
                  column_name: "engine_no",
                  column_caption: "เลขเครื่อง",
                },
                {
                  column_name: "payment_type_name",
                  column_caption: "วิธีการชำระเงิน",
                },
                {
                  column_name: "leased_no",
                  column_caption: "เลขที่สัญญาไฟแนนซ์",
                },
              ]}
            />
          </div>
        </BoxContrainer>
      </>
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  subscriptPermission: state.subscription.subscriptPermission,
  language: state.versatile.language,
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelectSubscription: (id, action) =>
    dispatch(SubscriptionActions.setIdSelectSubscription(id, action)),
  setSubscriptPermission: (data) =>
    dispatch(SubscriptionActions.setSubscriptPermission(data)),
  setContractId: (contractid) =>
    dispatch(SubscriptionActions.setContractId(contractid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
