import React, { Suspense, useState, useEffect } from "react";
import { connect } from "react-redux";
import CustomerActions from "../../Redux/CustomerRedux";
import { Row, Col } from "reactstrap";
import PannelBox from "../../Components/PannelBox";
import Table from "../../Components/DataGridView/Table";
import FormSelectGroup from "../../Components/FormControls/FormSelectGroup";
import FormInput from "../../Components/FormControls/FormInput";
import SaveButton from "../../Components/SaveButton";
import { t, Alert, FormLoading, rTT } from "../../Components";
import {
  ENDPOINT_BASE_URL_YNM,
  ENDPOINT_BASE_URL,
  YM_BASE_URL,
} from "../../Config/app-config";
import { BoxContrainer, Button } from "../../components_new";
import { AutoComplete, Input, Select } from "antd";
import DealerAction from "../../Redux/DealerRedux";
const { Option } = Select;

const DealerTractor = (props) => {
  const [loading, setLoading] = useState(false);
  const [sellerList, setSellerList] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [dealerId, setDealerid] = useState("");
  const [param, setParam] = useState("");
  const [name, setName] = useState("");
  const [test, setTest] = useState([]);
  const [alertSetting, setAlertSetting] = useState({
    show: false,
    type: 4,
    content: "",
    messageList: [],
    ErrorSubcode: 0,
    validateCode: false,
    title: "",
  });

  useEffect(() => {
    props.setIdSelectCustomer(null, "");
    // getSeller();
  }, []);

  const getSeller = async (value) => {
    try {
      var response = await fetch(
        `${YM_BASE_URL}fleet/setting/Dealer?dealer_name=${name}&limit=1000000`,
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
      if (data.result.dealer_list == undefined) {
        setTest([]);
      } else setTest(data.result.dealer_list);

      let list = data.result.dealer_list.map((e) => ({
        key: e.dealer_id,
        value: e.dealer_name,
      }));

      setSellerList(list);
    } catch (error) {
      setSellerList([]);
    }
  };

  // const deleteCustomer = async (id) => {
  //   try {
  //     setLoading(true);
  //     var response = await fetch(
  //       `${ENDPOINT_BASE_URL}ServiceContract/Yanmar/Customer/${id}`,
  //       {
  //         method: "DELETE",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //           "x-api-key": props.header.redis_key,
  //         },
  //       }
  //     );

  //     if (response.status === 204) {
  //       setAlert(true, 1, "ลบข้อมูลสำเร็จ");
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     setAlert(true, 2, error);
  //     setLoading(false);
  //   }
  // };

  const deleteData = async (id) => {
    try {
      const response = await fetch(
        `${YM_BASE_URL}fleet/setting/dealer/${dealerId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": props.dataLogin.redis_key,
          },
        }
      );
      if (response.status === 200) {
        setAlert(true, 1, "ลบข้อมูลสำเร็จ");
        setLoading(false);
        getSeller();
      }
    } catch (err) {
      setAlert(true, 2, err);
      setLoading(false);
    }
  };
  const checkVisible = (e) => {
    let visible = true;
    if (e.row.data.can_edit != true) visible = false;
    return visible;
  };
  const checkdelete = (e) => {
    let visible = true;
    if (e.row.data.can_delete != true) visible = false;
    return visible;
  };
  const editCallback = (e) => {
    props.setIdSelectCustomer(e.row.key, "edit");
    props.history.push("dealer/dealerForm");
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
    <Suspense fallback={null}>
      <Alert
        setting={alertSetting}
        onConfirm={() => {
          if (alertSetting.type === 1) {
            setAlert(false);
            getSeller();
          } else if (alertSetting.type === 3) {
            setAlert(false);
            deleteData();
          }
        }}
        onCancel={() => setAlert(false)}
      />

      <BoxContrainer>
        <div className="flex flex-row space-x-3">
          <div className="flex-1">
            <label className="control-label" style={{ fontWeight: 500 }}>
              {t("dealer")} :
            </label>

            <Input
              placeholder={rTT(t("dealer"))}
              onChange={(e) => {
                console.log(e.target.value);
                setName(e.target.value);
              }}
            ></Input>
          </div>

          <div className="flex-1"></div>

          <div className="text-end">
            <Button
              isSearchButton={true}
              margin={"26px 0px 0px 0px"}
              onClick={() => {
                console.log(name);
                getSeller();
              }}
            />
          </div>
        </div>
      </BoxContrainer>

      <BoxContrainer
        title="realtime_121"
        toolbarRight={
          <>
            <Button
              size="small"
              isAddButton={true}
              onClick={() => {
                props.setIdSelectCustomer(null, "add");
                props.history.push("dealer/dealerForm");
              }}
            />
          </>
        }
      >
        <div style={{ height: `calc(100vh - 361px)` }}>
          <FormLoading loading={loading}>
            <Table
              mode={"offline"}
              dataSource={test}
              searchPanel={false}
              deleteCallback={(e) => deleteData(e.row.key.dealer_id)}
              editCallback={(e) => {
                props.setIdSelectCustomer(e.key.dealer_id, "edit");
                props.history.push("dealer/dealerForm");
              }}
              height={`calc(100vh - 350px)`}
              editing={{
                enabled: true,
                allowUpdating: true,
                allowDeleting: true,
              }}
              column={[
                {
                  column_name: "dealer_name",
                  column_caption: "dealer",
                },
                // {
                //   column_name: "phone",
                //   column_caption: "Phone No",
                // },
                // {
                //   column_name: "address",
                //   column_caption: "address",
                // },
              ]}
              customButton={[
                {
                  hint: "View",
                  icon: "edit",
                  visible: checkVisible,
                  onClick: (e) => {
                    console.log(e.row.key);
                    editCallback(e);
                    console.log("EDIT : ", e);
                  },
                },
                {
                  hint: "can_delete",
                  icon: "trash",
                  visible: checkdelete,
                  onClick: (e) => {
                    setAlert(true, 3, "delete");
                    setDealerid(e.row.key.dealer_id);
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

export default connect(mapStateToProps, mapDispatchToProps)(DealerTractor);

let dataSource = {
  dealer_id: 1,
  dealer_name: "Moss_Kung",
  phone: "08xxxxxxxx",
  address: "1/10 ต.A อ.B จ.C 12345",
  can_edit: 0,
  can_delete: 0,
};
