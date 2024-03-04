import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import GeofencesActions from "../../../Redux/GeofencesRedux";
import { useTranslation } from "react-i18next";
import { AutoComplete, Input, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ENDPOINT_BASE_URL } from "../../../Config/app-config";
import ArrayStore from "devextreme/data/array_store";

export const dataStore = new ArrayStore({ key: "id", data: [] });

const FIX_NUM = 1;

let delayTimer,
  tSearch = "",
  controller;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const InputSearch = (arg) => {
  const { t } = useTranslation();

  let {
    len,
    idx,
    value,
    onChange,
    onCancel,
    options,
    onSearch,
    onSelect,
    loading,
  } = arg;

  return (
    <AutoComplete
      value={value}
      key={"input-" + idx}
      // notFoundContent={false}
      notFoundContent={
        loading &&
        value.length >= FIX_NUM && (
          <div style={{ textAlign: "center" }}>
            <Spin indicator={antIcon} />
          </div>
        )
      }
      style={{ width: "100%" }}
      options={!loading && value.length >= FIX_NUM ? options : []}
      // filterOption={true}
      filterOption={(inputValue, option) =>
        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
      onChange={onChange}
      onSearch={onSearch}
      onSelect={onSelect}
    >
      <Input placeholder={t("ค้นหาจีโอเฟนซ์แบ่งปัน")} />
    </AutoComplete>
  );
};

const FullTextSearch = (props) => {
  let { dataLogin, map, setStatesGeofencesRedux, valueSearch } = props;

  // console.log('props', props)
  const [value, setValue] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  useMemo(() => {
    // setStatesGeofencesRedux({ geofenceDetailSearch: undefined, geofenceBySearch: undefined })
    if (valueSearch) setValue(valueSearch);
  }, []);
  useEffect(() => {
    return () => {
      setStatesGeofencesRedux({ geofenceBySearch: [], valueSearch: "" });
      // setStatesGeofencesRedux({ geofenceDetailSearch: undefined, geofenceBySearch: undefined })
    };
  }, []);

  const funcSetDataInput = (key, value, opt) => {
    if (key === "search") {
      searchAPI(value);
    } else if (key === "select") {
      // console.log('opt', opt)
      // geofenceBySearch
      setStatesGeofencesRedux({ geofenceBySearch: [opt], valueSearch: value });
    }
    setValue(value);
  };

  const searchAPI = async (text) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(async () => {
      if (text.length >= FIX_NUM && (!tSearch || !text.includes(tSearch))) {
        tSearch = text;
        if (controller) {
          controller.abort();
        }
        setLoading(true);
        controller = new AbortController();
        // const response = await fetch("http://10.8.0.8:5000/prod/" +
        const response = await fetch(
          ENDPOINT_BASE_URL +
            "fleet/geofence/search" +
            "?user_id=" +
            dataLogin.userId +
            "&geofence_name=" +
            text,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            signal: controller.signal,
          }
        ).catch(handleError);
        if (response.ok) {
          const data = await response.json();
          // console.log('data', data)
          if (data?.code === 200) {
            let _opt = data.result;
            _opt.forEach((itm) => {
              itm.value = itm.geofence_name;
            });
            // console.log('_opt', _opt)
            setOptions(_opt);
            setLoading(false);
          } else if (!data.message.includes("aborted")) {
            setOptions([]);
            setLoading(false);
          }
        }
      }
      setLoading(false);
    }, 500);
  };

  const handleError = (err) => {
    return new Response(
      JSON.stringify({
        code: 400,
        message: err.message,
      })
    );
  };

  // console.log('geofenceDisplay', geofenceDisplay)
  return (
    <div style={{ padding: 10 }}>
      <InputSearch
        value={value}
        options={options}
        loading={loading}
        onSearch={(value, opt) => funcSetDataInput("search", value, opt)}
        onSelect={(value, opt) => funcSetDataInput("select", value, opt)}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  language: state.versatile.language,
  valueSearch: state.geofences.valueSearch,
  // dataSource: state.geofences.dataSource,
});

const mapDispatchToProps = (dispatch) => ({
  setStatesGeofencesRedux: (obj) =>
    dispatch(GeofencesActions.setStatesGeofencesRedux(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FullTextSearch);
