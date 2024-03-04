import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from "../../Components/DataGridView/Table";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_BASE_URL_YNM,
} from "../../Config/app-config";
import { t } from "../../Components/Translation";
import SubscriptionActions, {
  setVehicleData,
} from "../../Redux/SubscriptionRedux";
import { Row, Col, Button } from "reactstrap";

import ModalAddcar from "./ModalAddcar";
import ModalEditVehicle from "./ModalEditVehicle";
import ModalDelete from "./ModalDelete";

const Subscription = (props) => {
  let { dataLogin, sellerId, action, vehicleRegister } = props; // STATE
  let { setVehicleRegister, setDefaultVehicleRegister } = props; // ACTION
  let { idToken, redisKey, user_id } = dataLogin;
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [dataVehicle, setDataVehicle] = useState({
    isShow: false,
    info: {},
  });
  const [showModalDelete, setShowModalDelete] = useState(false);
  useEffect(() => {
    if (dataVehicle.isShow) {
      setShowModalEdit(true);
    }
  }, [dataVehicle]);

  const deleteCallback = (e) => {
    let vehicles = JSON.parse(JSON.stringify(vehicleRegister));

    setVehicleRegister(
      vehicles.filter((item) => {
        return item.id !== e;
      })
    );

    setSelectedId((current) =>
      current.filter((selectedId) => {
        return selectedId !== e;
      })
    );
  };

  const setDefaultCashPayment = (vehicle) => {
    let data = [];
    vehicle.forEach((item) => {
      let info = { ...item };
      info.cashPayment = true;
      info.cashPaymentName = "เงินสด";
      info.contractNo = "";
      data.push(info);
    });
    return data;
  };

  return (
    <>
      <ModalAddcar
        sellerId={sellerId}
        visible={showModal}
        selected={selectedId}
        onCancel={() => setShowModal(false)}
        onClick={(value, e) => {
          let vehicles = JSON.parse(JSON.stringify(vehicleRegister));
          setShowModal(false);
          setVehicleRegister([...vehicles, ...setDefaultCashPayment(value)]);
          setSelectedId([...selectedId, ...e]);
        }}
        tablevehicles={vehicleRegister}
      />

      <ModalDelete
        visible={showModalDelete}
        onCancel={() => setShowModalDelete(false)}
      />

      <ModalEditVehicle
        visible={showModalEdit}
        dataInfo={dataVehicle}
        onUpdating={(info) => {
          let vehicles = JSON.parse(JSON.stringify(vehicleRegister));
          let tablevehiclesLast = [...vehicles];
          let idx = vehicleRegister.findIndex(
            (item) => item.subscriberId === info.subscriberId
          );
          if (idx > -1) {
            tablevehiclesLast[idx].cashPayment = info.cashPayment;
            tablevehiclesLast[idx].cashPaymentName = info.cashPaymentName;
            tablevehiclesLast[idx].contractNo = info.contractNo;
          }
          setVehicleRegister(tablevehiclesLast);
          setShowModalEdit(false);
        }}
        onCancel={() => {
          setDataVehicle({ ...dataVehicle, isShow: false });
          setShowModalEdit(false);
        }}
      />

      <Row>
        <Col lg="12">
          {action === "add" ? (
            <Row style={{ textAlign: "right", margin: "5px 0px" }}>
              <Button
                className="btn btn-primary btn-sm"
                disabled={props.disabled}
                onClick={() => {
                  // console.log("CLICK OPEN")
                  setShowModal(true);
                }}
              >
                <i className="fa fa-plus"></i> {t("add")}
              </Button>
            </Row>
          ) : action === "edit" ? (
            <Row style={{ textAlign: "right", margin: "5px 0px" }}>
              <Button
                className="btn btn-danger btn-sm"
                disabled={props.disabled}
                onClick={() => {
                  setShowModalDelete(true);
                }}
              >
                {t("ยกเลิกสัญญา")}
              </Button>
            </Row>
          ) : (
            ""
          )}
          <Table
            mode={"offline"}
            dataSource={vehicleRegister}
            author={idToken}
            xAPIKey={redisKey}
            user_id={user_id}
            table_id={4}
            showSetting={false}
            ExportEnable={false}
            selectItemVisible={false}
            zoomVisible={false}
            selectionVisible={false}
            searchPanel={false}
            GroupPanelVisible={false}
            editing={{
              enabled: ["add", "edit"].includes(action) ? true : false,
            }}
            autoExpandAll={false}
            tableKey={"subscriberId"}
            columnCount="subscriberNo"
            column={[
              {
                column_name: "model",
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
                column_name: "cashPaymentName",
                column_caption: "วิธีการชำระเงิน",
              },
              {
                column_name: "contractNo",
                column_caption: "เลขที่สัญญาไฟแนนซ์",
              },
            ]}
            customButton={[
              {
                hint: "Edit",
                icon: "edit",
                onClick: (e) => {
                  let data = e.row.data;
                  // setVehicleData(data);
                  console.log(data);
                  setDefaultVehicleRegister(data);
                  setDataVehicle({
                    ...dataVehicle,
                    isShow: true,
                    info: data,
                  });
                },
              },
              {
                hint: "Delete",
                icon: "trash",
                visible: action === "add",
                onClick: (e) => {
                  deleteCallback(e.row.key.id);
                },
              },
            ]}
          ></Table>
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  e: state.subscription.id,
  action: state.subscription.action,
  vehicleRegister: state.subscription.vehicleRegister,
});

const mapDispatchToProps = (dispatch) => ({
  setIdSelectSubscription: (id, action) =>
    dispatch(SubscriptionActions.setIdSelectSubscription(id, action)),
  setVehicleRegister: (data) =>
    dispatch(SubscriptionActions.setVehicleRegister(data)),
  setDefaultVehicleRegister: (data) =>
    dispatch(SubscriptionActions.setDefaultVehicleRegister(data)),
  setVehicleData: (data) => dispatch(SubscriptionActions.setVehicleData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscription);
