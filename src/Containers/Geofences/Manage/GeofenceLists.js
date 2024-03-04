import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import Table from "../../../Components/DataGridView/Table.js";
import GeofencesActions from "../../../Redux/GeofencesRedux";
import CommonActions from "../../../Redux/CommonRedux";
import { get } from "lodash";
import { Switch } from "antd";
import Alert from "../../../Components/Alert";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { ENDPOINT_BASE_URL } from "../../../Config/app-config";

let dataSource, datagrids, dataStore;

const GeofenceLists = (props) => {
  let {
    dataLogin,
    language,
    geofDP,
    geofDisplayDelete,
    // function
    setStatesGeofencesRedux,
    setStateCommonRedux,
  } = props;

  const [alertSetting, setAlertSetting] = useState({});
  // console.log('props', props)

  useMemo(() => {
    setStatesGeofencesRedux({ geofenceDisplay: [] });
    dataStore = new ArrayStore({ key: "id", data: [] });
    dataSource = new DataSource({
      store: dataStore,
      reshapeOnPush: true,
    });
  }, []);

  useEffect(() => {
    loadGeofenceList();
  }, []);

  useEffect(() => {
    return () => {
      dataStore.clear();
      dataSource.reload();
    };
  }, []);

  useEffect(() => {
    if (dataSource) dataSource.reload();
  }, [dataLogin]);

  useEffect(() => {
    if (geofDisplayDelete) setAlertSetting(geofDisplayDelete);
  }, [geofDisplayDelete]);

  // useEffect(() => {
  //   if (loadingGL) {
  //     if (datagrids && geofDP) datagrids.instance.selectRows(geofDP)
  //   }
  // }, [loadingGL])
  const checkIconShare = (ele) => {
    get(ele, "row.data.canPrintCertificate", "");
    // console.log('checkIconShare', get(ele, 'row.data', ''))
    return "fas fa-eye";
  };

  const loadGeofenceList = async (isLoading = true) => {
    let page = 0,
      geofenceList = [];
    setStatesGeofencesRedux({
      isLoadingGeofence: { visible: isLoading, type: 5 },
    });

    while (page !== undefined) {
      try {
        // let response = await fetch("http://10.8.0.8:5000/prod/fleet/geofence/geofencelist?user_id="
        let response = await fetch(
          ENDPOINT_BASE_URL +
            "fleet/geofence/geofencelist?user_id=" +
            dataLogin.userId +
            "&page=" +
            page +
            "&per_page=100",
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Accept-Language": language,
            },
          }
        );

        let data = await response.json();
        if (data.message === "ok") {
          let list = get(data, "result.geofence_list");
          await setDataStore(list);
          geofenceList.push(...list);
          page = get(data, "result.LastEvaluatedKey.page");
        } else {
          page = undefined;
          break;
        }
      } catch {
        page = undefined;
        break;
      }
      setTimeout(() => {
        dataSource.reload();
      }, 500);
    }
    setStatesGeofencesRedux({ isLoadingGeofence: { visible: false } });
    // setLoadingGL(true)
    if (!!datagrids && !!geofDP) {
      // console.log('test', (!!datagrids && !!geofDP), datagrids, geofDP)
      // datagrids.instance.selectRows(geofDP)
      // setTimeout(() => {
      //   datagrids.instance.selectRows(geofDP)
      // }, 500)
    }
    // setValues("geofenceList", geofenceList)
    setStatesGeofencesRedux({ geofenceList: geofenceList });
    setTimeout(() => {
      dataSource.reload();
    }, 1000);
  };

  const deleteGeofenceById = async (id) => {
    setStatesGeofencesRedux({ isLoadingGeofence: { visible: true, type: 6 } });
    try {
      // let response = await fetch("http://10.8.0.8:5000/prod/fleet/geofence"
      let response = await fetch(
        ENDPOINT_BASE_URL +
          "fleet/geofence" +
          "?user_id=" +
          dataLogin.userId +
          "&geofence_id=" +
          id,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        }
      );

      let data = await response.json();
      // setStatesGeofencesRedux({ isLoadingGeofence: { visible: false, type: 5 } })
      if (data.message === "ok") {
        dataStore.push([
          {
            type: "remove",
            key: id,
          },
        ]);
      }
      dataSource.reload();
      let arr = datagrids.instance.getSelectedRowKeys();
      let idx = arr.indexOf(id);
      if (idx !== -1) {
        arr.splice(idx, 1);
        datagrids.instance.selectRows(arr);
      }
      loadGeofenceList(false);
      setStatesGeofencesRedux({ isLoadingGeofence: { visible: false } });
    } catch {
      dataSource.reload();
      setStatesGeofencesRedux({ isLoadingGeofence: { visible: false } });
      loadGeofenceList(false);
    }
  };

  const changeActiveGeofence = async (id, value) => {
    // dataSource.reload()
    // console.log('changeActiveGeofence', id, value)
    let status_view;
    if (value === "I") status_view = "A";
    else status_view = "I";

    setStatesGeofencesRedux({ isLoadingGeofence: { visible: true, type: 6 } });
    try {
      let response = await fetch(
        ENDPOINT_BASE_URL +
          "fleet/geofence/viewgeofence" +
          "?user_id=" +
          dataLogin.userId +
          "&geofence_id=" +
          id +
          "&status_view=" +
          status_view,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
        }
      );

      let data = await response.json();
      // console.log('data', data)
      // setStatesGeofencesRedux({ isLoadingGeofence: { visible: false, type: 5 } })
      if (data.message === "ok") {
        dataStore.push([
          {
            type: "update",
            key: id,
            data: { active_status: status_view },
          },
        ]);
      }
      dataSource.reload();
      setStatesGeofencesRedux({ isLoadingGeofence: { visible: false } });
      setStateCommonRedux({ isReloadGeofenceType: true });
    } catch {
      dataSource.reload();
      setStatesGeofencesRedux({ isLoadingGeofence: { visible: false } });
      setStateCommonRedux({ isReloadGeofenceType: true });
    }
  };

  const setDataStore = (list) => {
    if (list.length > 0) {
      list.forEach((item) => {
        dataStore.push([
          {
            type: "insert",
            data: item,
          },
        ]);
      });
    }
    // console.log('sdf')
  };

  // console.log('geofenceDisplay', geofenceDisplay)
  return (
    <>
      <Alert
        setting={alertSetting}
        onConfirm={() => {
          if (alertSetting.api === "change")
            changeActiveGeofence(alertSetting.key, alertSetting.value);
          if (alertSetting.api === "remove") {
            setStatesGeofencesRedux({ geofDisplayDelete: null });
            deleteGeofenceById(alertSetting.key);
          }
          setAlertSetting({ show: false });
        }}
        onCancel={() => {
          if (dataSource) dataSource.reload();
          if (alertSetting.api === "remove") {
            setStatesGeofencesRedux({ geofDisplayDelete: null });
          }
          setAlertSetting({ show: false });
        }}
      />
      <Table
        mode={"offline"}
        datagrids={(ref) => {
          if (ref) datagrids = ref;
        }}
        dataSource={dataSource}
        table_id={12}
        user_id={dataLogin.userId}
        height={`calc(100vh - 175px)`}
        alternateColor={true}
        loadStore={false}
        showSetting={false}
        defaultPageSize={25}
        selectedCallback={(e) => {
          setStatesGeofencesRedux({ geofenceDisplay: e.selectedRowKeys });
        }}
        reloadTable={() => {
          if (dataSource) dataSource.reload();
        }}
        // cookiesOptions={{
        //   enable: true,
        //   name: "Geofences"
        // }}
        editing={{
          enabled: true,
          allowUpdating: true,
          allowDeleting: true,
        }}
        editCallback={(e) => {
          setStatesGeofencesRedux({ isFormSetting: true, geofenceId: e.key });
        }}
        deleteCallback={(e) => {
          deleteGeofenceById(e.key);
        }}
        columnCount="geofence_name"
        column={[
          {
            column_name: "geofence_name",
            column_caption: "geofence_3",
            column_render: (e) => {
              return (
                <div>
                  <img
                    className="image-zoom-grid"
                    src={get(e.data, "url")}
                    height={22}
                    width={22}
                    style={{ marginRight: 5 }}
                  />
                  {e.value}
                </div>
              );
            },
            column_group: (e) => e.value,
            column_export: (e) => e.value,
          },
          // {
          //   column_name: 'geofence_type_name',
          //   column_caption: 'geofence_4'
          // },
          {
            column_name: "admin_level1_name",
            column_caption: "geofence_5",
          },
          {
            column_name: "created_by",
            column_caption: "geofence_6",
          },
          {
            column_name: "created_date",
            column_caption: "geofence_7",
            // column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
          },
          {
            column_name: "updated_by",
            column_caption: "geofence_8",
          },
          {
            column_name: "updated_date",
            column_caption: "geofence_9",
            // column_render: (e) => moment(e.value).format('DD/MM/YYYY HH:mm:ss')
          },
          {
            column_name: "active_status",
            column_caption: "Active",
            column_render: (e) => {
              return (
                <Switch
                  checked={e.value === "A"}
                  size="small"
                  onChange={() => {
                    // if (dataSource) dataSource.reload()
                    setAlertSetting({
                      api: "change",
                      show: true,
                      type: 3,
                      content: "บันทึกข้อมูล",
                      key: e.key,
                      value: e.value,
                    });
                  }}
                />
              );
              // onChange={() => changeActiveGeofence(e.key, e.value)} />
            },
            column_export: (e) => (e.value === "A" ? "Active" : "Inactive"),
            // column_render: (e) => {
            //   console.log('e.value', e)
            //   return <div
            //     style={{ cursor: "pointer", color: "#337ab7" }}
            //     onClick={() => changeActiveGeofence(e.key, e.value)}
            //   >{e.value === "A" ?
            //     <i class="fas fa-eye"></i> :
            //     <i class="fas fa-eye-slash"></i>}
            //   </div>
            // },
            fixed: true,
            alignment: "center",
            allowGrouping: false,
            allowFiltering: false,
          },
        ]}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  geofDisplayDelete: state.geofences.geofDisplayDelete,
  // geofenceDisplay: state.geofences.geofenceDisplay,
  // dataSource: state.geofences.dataSource,
});

const mapDispatchToProps = (dispatch) => ({
  setStatesGeofencesRedux: (obj) =>
    dispatch(GeofencesActions.setStatesGeofencesRedux(obj)),
  setStateCommonRedux: (obj) =>
    dispatch(CommonActions.setStateCommonRedux(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeofenceLists);
