import React, { Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import CustomerActions from "../../Redux/CustomerRedux";
import { Row, Col } from "reactstrap";
import PannelBox from "../../Components/PannelBox";
import Table from "../../Components/DataGridView/TableCustomerTractor";
import FormSelectGroup from "../../Components/FormControls/FormSelectGroup";
import FormSelectSearch from "../../Components/FormControls/FormSelectSearch";
import FormInput from "../../Components/FormControls/FormInput";
import SaveButton from "../../Components/SaveButton";
import { t, Alert, FormLoading } from "../../Components";
import {
  ENDPOINT_BASE_URL_YNM,
  ENDPOINT_BASE_URL,
  YM_BASE_URL,
} from "../../Config/app-config";
import { BoxContrainer, Button } from "../../components_new";
import { AutoComplete, Select } from "antd";

const { Option } = Select;
let data = [
  {
    customer_id: 1,
    customer_name: "Balloon",
    dealer_id: 1,
    dealer_name: "Moss_Kung",
    business_type: "การเกษตร",
    phone: "08xxxxxxxx",
    email: "Balloon@gmail.com",
    can_edit: 0,
    can_delete: 0,
  },
];

const Customer = (props) => {
  const [loading, setLoading] = useState(false);
  const [sellerList, setSellerList] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [sellerNav, setSellerNav] = useState({});
  const [param, setParam] = useState("");
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
  const [customerdata, setCustomer] = useState([]);

  useEffect(() => {
    props.setIdSelectCustomer(null, "");
  }, []);

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
      }));
      setSellerList(list);
    } catch (error) {
      setSellerList([]);
    }
  };

  const deleteCustomer = async () => {
    try {
      setLoading(true);
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/customer/${customerId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": props.header.redisKey,
            "Accept-Language": props.language,
          },
        }
      );

      var data = await response.json();

      if (data?.code === 200) {
        setAlert(true, 1, "ลบข้อมูลสำเร็จ");
        setLoading(false);
      }
    } catch (error) {
      setAlert(true, 2, error);
      setLoading(false);
    }
  };

  const getcustomerData = async (param) => {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Customer?limit=1000000${param}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": props.header.redisKey,
            "Accept-Language": props.language,
          },
        }
      );

      var data = await response.json();

      if (data?.code === 200) {
        setCustomer(data.result.customer_list);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const editCallback = (e) => {
    props.setIdSelectCustomer(e.row.key.customer_id, "edit");
    props.history.push("customer/customerForm");
  };

  const deleteData = (id) => {};
  const checkVisible = (e) => {
    let visible = true;
    if (e.row.data.editable == true) visible = false;
    return visible;
  };
  const checkdelete = (e) => {
    let visible = true;
    if (e.row.data.can_delete != true) visible = false;
    return visible;
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
    console.log(sellerNav),
    (
      <Suspense fallback={null}>
        <Alert
          setting={alertSetting}
          onConfirm={() => {
            if (alertSetting.type === 1) {
              setAlert(false);
              getcustomerData("");
            }
            if (alertSetting.type === 2) setAlert(false);
            if (alertSetting.type === 3) {
              deleteCustomer();
              setAlert(false);
            }
          }}
          onCancel={() => setAlert(false)}
        />

        <BoxContrainer>
          <div className="flex flex-row space-x-3">
            <div className="flex-1">
              <div>
                <label className="control-label" style={{ fontWeight: 500 }}>
                  {t("customerTractor_1")} :
                </label>

                <AutoComplete
                  style={{ width: "100%" }}
                  onSearch={(value) => {
                    if (value.length >= 3) getSeller(value);
                  }}
                  placeholder={t("customerTractor_1")}
                  allowClear={true}
                  // disabled={sellerId === "" ? true : false}
                  onSelect={(value, option) => {
                    setSellerNav(option);
                  }}
                  onChange={(value, option) => {
                    setSellerNav(option);
                  }}
                  onClear={() => {
                    getSeller();
                    setSellerNav({});
                  }}
                >
                  {sellerList.map((item) => (
                    <Option key={item.key} value={item.value}></Option>
                  ))}
                </AutoComplete>
              </div>
              {/* <FormSelectGroup
              mode={"single"}
              schema={""}
              value={sellerNav}
              list={sellerList}
              label={"dealer"}
              placeholder={"dealer"}
              fieldForm={"dealer"}
              flex={1}
              onChange={(value) =>
                setSellerNav(value !== undefined ? value : "")
              }
            ></FormSelectGroup> */}
            </div>

            <div className="flex-1">
              <FormInput
                schema={""}
                value={customerName}
                label={"customer_80"}
                fieldForm={"customerName"}
                placeholder={"customer_80"}
                flex={1}
                style={{ height: "32px" }}
                onChange={(e) => setCustomerName(e.target.value)}
              ></FormInput>
            </div>

            <div className="text-end">
              <Button
                isSearchButton={true}
                margin={"26px 0px 0px 0px"}
                onClick={() => {
                  let lst = [],
                    param = "";
                  if (sellerNav === undefined) {
                    lst.push("");
                  }
                  if (sellerNav !== undefined)
                    lst.push("dealer_id=" + sellerNav.key);
                  if (customerName !== "")
                    lst.push("customer_name=" + customerName);
                  if (lst.join("&") !== "") param += "&" + lst.join("&");
                  setParam(param);
                  setLoading(true);
                  getcustomerData(param);
                }}
              />
            </div>
          </div>
        </BoxContrainer>

        <BoxContrainer
          title="side_menu_34"
          toolbarRight={
            <>
              <Button
                size="small"
                isAddButton={true}
                onClick={() => {
                  props.setIdSelectCustomer(null, "add");
                  props.history.push("customer/customerForm");
                }}
              />
              <Button
                size="small"
                isAddButton={true}
                text='Import excel'
                onClick={() => {
                  props.history.push("customer/import");
                }}
               />
            </>
          }
        >
          <div style={{ height: `calc(100vh - 361px)` }}>
            <FormLoading loading={loading}>
              <Table
                mode={"offline"}
                // serversideSource={`${YM_BASE_URL}fleet/setting/Customer${param}`}
                dataSource={customerdata}
                xAPIKey={props.dataLogin.redis_key}
                deleteCallback={(e) => deleteCustomer(e.key)}
                editCallback={(e) => {
                  props.setIdSelectCustomer(e.key, "edit");
                  props.history.push("customer/customerForm");
                }}
                tableKey={"customer_id"}
                searchPanel={false}
                height={`calc(100vh - 350px)`}
                editing={{
                  enabled: true,
                  allowUpdating: true,
                  allowDeleting: true,
                }}
                column={[
                  {
                    column_name: "customer_name",
                    column_caption: "realtime_119",
                  },
                  {
                    column_name: "dealer_name",
                    column_caption: "vehicle_2",
                  },
                  {
                    column_name: "phone",
                    column_caption: "user_profile_3",
                  },
                  {
                    column_name: "email",
                    column_caption: "customer_14",
                  },
                  {
                    column_name: "business_type",
                    column_caption: "business_type",
                  },
                ]}
                customButton={[
                  {
                    hint: "View",
                    icon: "edit",
                    visible: checkVisible,
                    onClick: (e) => {
                      editCallback(e);
                      // console.log("EDIT : ", e);
                    },
                  },
                  {
                    hint: "can_delete",
                    icon: "trash",
                    visible: checkdelete,
                    onClick: (e) => {
                      console.log("checkdelete : ", e);
                      setAlert(true, 3, "delete");
                      setCustomerId(e.row.key.customer_id);
                    },
                  },
                ]}
                allowDeleting={{
                  column_name: "deletable",
                  icon: "trash",
                  condition: true,
                  onClick: (e) => deleteData(e),
                }}
                allowUpdating={{
                  column_name: "editable",
                  icon: "",
                  condition: true,
                }}
              ></Table>
            </FormLoading>
          </div>
        </BoxContrainer>
      </Suspense>
    )
  );
};
const mapStateToProps = (state) => ({
  header: state.signin.header,
  language: state.versatile.language,
  dataLogin: state.signin.dataLogin,
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelectCustomer: (id, action) =>
    dispatch(CustomerActions.setIdSelectCustomer(id, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
