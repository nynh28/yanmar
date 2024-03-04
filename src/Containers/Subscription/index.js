import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SubscriptionActions from "../../Redux/SubscriptionRedux";
import Table from "../../Components/DataGridView/TableVehicles";
import { ENDPOINT_BASE_URL_YNM, YM_BASE_URL } from "../../Config/app-config";
import { get } from "lodash";
import { BoxContrainer, Button } from "../../components_new";
import axios from "axios";

const Subscription = (props) => {
  let { dataLogin, subscriptPermission } = props; // STATE
  let { setIdSelectSubscription, setSubscriptPermission } = props; // ACTION
  let { idToken, redisKey, userId } = dataLogin;

  useEffect(() => {
    getPermissionUser();
  }, []);

  const getPermissionUser = async () => {
    await axios
      .get(`${YM_BASE_URL}fleet/get_user_manage_subscription?user_id=${userId}`)
      .then((response) => {
        let permission = response?.data?.result;
        if (response.status === 200) setSubscriptPermission(permission);
        else
          setSubscriptPermission({
            canView: false,
            canAdd: false,
            canEdit: false,
            canDelete: false,
          });
      })
      .catch((error) => {
        setSubscriptPermission({
          canView: false,
          canAdd: false,
          canEdit: false,
          canDelete: false,
        });
      });
  };

  const onChangeForm = () => {
    props.setIdSelectSubscription(null, "add");
    window.location.replace("#/subscription/subscriptionForm");
  };

  const viewCallback = (e) => {
    props.setIdSelectSubscription(e.row.key, "view");
    window.location.replace("#/subscription/subscriptionForm");
  };

  const editCallback = (e) => {
    props.setIdSelectSubscription(e.row.key, "edit");
    window.location.replace("#/subscription/subscriptionForm");
  };

  const checkVisible = (e) => {
    let itemStatusID = get(e, "row.data.itemStatusID", "");
    return itemStatusID !== 0 && itemStatusID !== 3;
  };

  return (
    <>
      <BoxContrainer
        title="side_menu_24"
        toolbarRight={
          <>
            {subscriptPermission.canAdd && (
              <Button
                size="small"
                isAddButton={true}
                onClick={() => {
                  onChangeForm();
                }}
              />
            )}
          </>
        }
      >
        <div style={{ height: `calc(100vh - 228px)` }}>
          <Table
            mode={"api"}
            serversideSource={`${ENDPOINT_BASE_URL_YNM}ServiceContract/Yanmar`}
            author={idToken}
            xAPIKey={redisKey}
            user_id={userId}
            table_id={4}
            defaultPageSize={25}
            height={`calc(100vh - 300px)`}
            showSetting={true}
            // selectedCallback={(e) => {
            //   console.log(e.selectedRowKeys)
            //   setSubscriptionId(e.selectedRowKeys)
            // }}
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
                visible: subscriptPermission.canEdit,
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
                column_name: "seller",
                column_caption: "ผู้ขายลูกค้า",
              },
              {
                column_name: "model",
                column_caption: "รุ่นรถ",
              },
              {
                column_name: "vin",
                column_caption: "เลขรถ",
              },
              {
                column_name: "engineNo",
                column_caption: "เลขเครื่อง",
              },
              {
                column_name: "paymentMethod",
                column_caption: "วิธีการชำระเงิน",
              },
              {
                column_name: "contractNo",
                column_caption: "เลขที่สัญญาไฟแนนซ์",
              },
            ]}
          />
        </div>
      </BoxContrainer>
    </>
  );
};

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  subscriptPermission: state.subscription.subscriptPermission,
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelectSubscription: (id, action) =>
    dispatch(SubscriptionActions.setIdSelectSubscription(id, action)),
  setSubscriptPermission: (data) =>
    dispatch(SubscriptionActions.setSubscriptPermission(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
