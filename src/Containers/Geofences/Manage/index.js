import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import GeofencesActions from "../../../Redux/GeofencesRedux";
import GeofenceLists from "./GeofenceLists";
import GeofenceForm from "./GeofenceForm";
import {
  ENDPOINT_BASE_URL,
  ENDPOINT_BASE_URL_YNM2,
} from "../../../Config/app-config";
import { get } from "lodash";
import Alert from "../../../Components/Alert";
import { Button } from "../../../components_new";

let icon_attach_id = "",
  formData = "",
  param = "";
const FormManage = (props) => {
  let {
    isFormSetting,
    dataLogin,
    language,
    geofenceId,
    isShowBanner,
    coordinatesText,
    validateSubmit,
    dataForm,
    shapeDetail,
    fileUplaod,
    iconGeofenceType,
    iconPreview,
    isReloadPresetIcon,
  } = props; // props
  let { clearDataForm, setFormData, setStatesGeofencesRedux } = props; // action

  const [alertSetting, setAlertSetting] = useState({
    show: false,
    type: 4,
    content: "",
    messageList: [],
    ErrorSubcode: 0,
    title: "",
  });

  useMemo(() => {
    // #region  CHECK PARAMETER FRON ANOTER PAGE
    try {
      const params = window.location.href.split("?")[1];
      if (params !== undefined) {
        clearDataForm();

        param = window.location.href;
        setStatesGeofencesRedux({
          isFormSetting: true,
          isDrawing: false,
          geofenceId: "",
        });
      }
    } catch {}
    // #endregion
  }, []);

  useEffect(() => {
    loadPreset();
    loadGeofenceType();
    loadGeomType();
    setFormData("app_id", 2);
  }, []);

  useEffect(() => {}, [isFormSetting]);

  useEffect(() => {
    isReloadPresetIcon && loadPreset();
  }, [isReloadPresetIcon]);

  useEffect(() => {
    return () => {
      clearValidateSubmit();
    };
  }, []);

  const clearValidateSubmit = () => {
    setStatesGeofencesRedux({
      validateSubmit: {
        geofenceName: { isErr: false, message: "" },
        geomType: { isErr: false, message: "" },
        coordinates: { isErr: false, message: "" },
        icon: { isErr: false, message: "" },
        alert: { isErr: false, message: "" },
        iconType: { isErr: false, message: "" },
        iconTemplate: { isErr: false, message: "" },
      },
    });
  };

  const changeForm = () => {
    setFormData("app_id", 2);
    clearDataForm();
    clearValidateSubmit();
    setStatesGeofencesRedux({
      isFormSetting: !isFormSetting,
      isDrawing: false,
      geofenceId: "",
    });

    if (param !== "") {
      window.location.replace(param.split("?")[0]);
      param = "";
    }
  };
  const loadPreset = async () => {
    try {
      // var response = await fetch("http://10.8.0.8:5000/prod/fleet/geofence/preseticon?user_id=" + dataLogin.userId, {
      var response = await fetch(
        ENDPOINT_BASE_URL +
          "fleet/geofence/preseticon?user_id=" +
          dataLogin.userId,
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
        setStatesGeofencesRedux({
          presetIconList: data.result,
          isReloadPresetIcon: false,
        });
      }
    } catch {
      setStatesGeofencesRedux({
        presetIconList: [],
        isReloadPresetIcon: false,
      });
    }
  };

  const loadGeofenceType = async () => {
    try {
      // var response = await fetch("http://10.8.0.8:5000/prod/fleet/geofence/geofencetype?user_id=" + dataLogin.userId, {
      var response = await fetch(
        ENDPOINT_BASE_URL +
          "fleet/geofence/geofencetype?user_id=" +
          dataLogin.userId,
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
        setStatesGeofencesRedux({
          geofenceTypeList: data.result,
        });
      }
    } catch {
      setStatesGeofencesRedux({ geofenceTypeList: [] });
    }
  };

  const loadGeomType = async () => {
    try {
      // var response = await fetch("http://10.8.0.8:5000/prod/fleet/geofence/geomtype?user_id=" + dataLogin.userId, {
      var response = await fetch(
        ENDPOINT_BASE_URL +
          "fleet/geofence/geomtype?user_id=" +
          dataLogin.userId,
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
        let newData = data.result.filter((item) => item.key !== 2);
        let defaultGeom = "" + newData[0]?.key;
        setStatesGeofencesRedux({
          geomType: defaultGeom,
          isDrawing: true,
          geomTypeList: newData,
        });
      }
    } catch {
      setStatesGeofencesRedux({ geomTypeList: [] });
    }
  };

  const uploadIconGeofence = async () => {
    let response = "";
    // if (iconGeofenceType === 3) {
    //   // response = await fetch(`http://192.168.6.221:5001/prod/fleet/geofence/icon?user_id=${dataLogin.userId}&attach_type=3&is_preset=${dataForm.is_preset}&filename=${iconPreview.filedName}&base64=${encodeURIComponent(iconPreview.base64Data)}`, {
    //   response = await fetch(ENDPOINT_BASE_URL + `fleet/geofence/icon?user_id=${dataLogin.userId}&attach_type=3&is_preset=${dataForm.is_preset}&filename=${iconPreview.filedName}&base64=${encodeURIComponent(iconPreview.base64Data)}`, {
    //     method: 'POST'
    //   });
    // }
    if (iconGeofenceType === 3) {
      let svgText = atob(iconPreview.base64Data);
      response = await fetch(
        ENDPOINT_BASE_URL +
          `fleet/geofence/iconcustom?user_id=${dataLogin.userId}&attach_type=3&is_preset=${dataForm.is_preset}&filename=${iconPreview.filedName}`,
        {
          method: "POST",
          body: JSON.stringify({
            svg: svgText,
          }),
        }
      );
    } else {
      const formData = new FormData();
      formData.append("file", fileUplaod.file);

      // response = await fetch(`http://10.8.0.8:5000/prod/fleet/geofence/icon?user_id=${dataLogin.userId}&attach_type=1&is_preset=${dataForm.is_preset}`, {
      response = await fetch(
        ENDPOINT_BASE_URL +
          `fleet/geofence/icon?user_id=${dataLogin.userId}&attach_type=1&is_preset=${dataForm.is_preset}`,
        {
          method: "POST",
          body: formData,
          redirect: "follow",
        }
      );
    }

    var data = await response.json();
    // console.log("UPLOAD RESPONSE : ", data)
    if (response.status !== 200) {
      setAlert(true, 4, get(data, "Error.Message"));
      setStatesGeofencesRedux({
        isLoadingGeofence: { visible: false, type: 6 },
      });
      return;
    }

    setFormData("icon_attach_id", get(data, "icon_attach_id", ""));
    icon_attach_id = get(data, "icon_attach_id", "");

    return response;
  };

  const manageGeofence = () => {
    formData = "";
    let _validateSubmit = {
      geofenceName: { isErr: false, message: "" },
      geomType: { isErr: false, message: "" },
      coordinates: { isErr: false, message: "" },
      icon: { isErr: false, message: "" },
      alert: { isErr: false, message: "" },
      iconType: { isErr: false, message: "" },
      iconTemplate: { isErr: false, message: "" },
    };

    //#region VALIDATE DATA
    const validateData = async (icon_attach_id) => {
      let data = JSON.parse(JSON.stringify(dataForm));
      data.icon_attach_id = icon_attach_id;
      data.user_id = dataLogin.userId;

      // return
      data.coordinate = [];
      if (!data.alert_status) {
        data.alert = {};
        data.alert.out_geofence = false;
        data.alert.start_odo = 0;
        data.alert.speed_limit = 0;
      }

      if (data.geom_type == "1") {
        if (get(shapeDetail, "center"))
          data.coordinate.push(shapeDetail.center);
      } else if (data.geom_type == "3") {
        if (get(shapeDetail, "paths")) {
          data.coordinate.push(...shapeDetail.paths);
          let startPoint = data.coordinate[0];
          data.coordinate.push(startPoint); // ADD END POINT SAME START
        }
        data.radius = 0;
      }

      if (data.alert.range_alert_time_visible) data.alert.time_alert = true;
      else {
        data.alert.time_alert = false;
        data.alert.start_alert = "00:00";
        data.alert.end_alert = "00:00";
      }

      if (data.alert.overtime_stay_visible) data.alert.in_geofence = true;
      else {
        data.alert.in_geofence = false;
        data.alert.overtime_stay = 0;
      }

      const validateFormat = () => {
        let txtInput = coordinatesText.trim();
        if (txtInput !== "") {
          let coordinate = txtInput.split("\n");
          if (data?.geom_type == "1") {
            let spLatLng = coordinate[0].split(",");
            if (spLatLng.length === 2) {
              if (spLatLng[1].trim() !== "") {
                let lat = parseFloat(spLatLng[0].trim()),
                  lng = parseFloat(spLatLng[1].trim());
                let dafaultLocation = { lat, lng };
                return { isValid: true, message: "" };
              } else {
                return {
                  isValid: false,
                  message: "พิกัดไม่ถูกต้อง โปรดระบุใหม่",
                };
              }
            } else {
              return {
                isValid: false,
                message: "พิกัดไม่ถูกต้อง โปรดระบุใหม่",
              };
            }
          } else if (data?.geom_type == "3") {
            let coordinate = txtInput.split("\n");
            let coordText = "",
              paths = [],
              isErr = false;
            coordinate.forEach((item) => {
              let spLatLng = item.split(",");

              if (spLatLng.length === 2) {
                if (spLatLng[1].trim() !== "") {
                  let lat = parseFloat(spLatLng[0].trim()),
                    lng = parseFloat(spLatLng[1].trim());
                  paths.push({ lat, lng });

                  if (coordText === "") coordText += `${lat}, ${lng}`;
                  else coordText += `\n${lat}, ${lng}`;
                }
              } else {
                isErr = true;
              }
            });

            if (isErr) {
              return {
                isValid: false,
                message: "พิกัดไม่ถูกต้อง โปรดระบุใหม่",
              };
            } else if (paths.length < 3) {
              return { isValid: false, message: "โปรดระบุพิกัดมากกว่า 2 จุด" };
            } else {
              return { isValid: true, message: "พิกัดไม่ถูกต้อง โปรดระบุใหม่" };
            }
          }
        } else {
          return { isValid: false, message: "พิกัดไม่ถูกต้อง โปรดระบุใหม่" };
        }
      };

      //#region  VALIDATE DATA
      let errorMessage = [];
      if (data.geofence_name === "") {
        errorMessage.push("โปรดระบุชื่อจีโอเฟนซ์ภาษาไทย");
        _validateSubmit.geofenceName = { isErr: true, message: "โปรดระบุ" };
      }
      if (data.geom_type === "") {
        errorMessage.push("โปรดเลือกรูปแบบจีโอเฟนซ์");
        _validateSubmit.geomType = { isErr: true, message: "โปรดระบุ" };
      }
      if (data.icon_attach_id === "") {
        errorMessage.push("โปรดเลือกไอคอนจีโอเฟนซ์");
        _validateSubmit.icon = { isErr: true, message: "โปรดระบุ" };
      }
      // if (data.coordinate.length === 0) {
      //   errorMessage.push("โปรดวาดเส้นจีโอเฟนซ์")
      // }
      // if (data.geom_type == 3 && (data.coordinate.length - 1) === 2) {
      //   errorMessage.push("โปรดวาดเส้นจีโอเฟนซ์มากกว่า 2 จุด")
      // }
      let validateCoordinate = validateFormat();
      if (!validateCoordinate.isValid) {
        errorMessage.push(validateCoordinate.message);
        _validateSubmit.coordinates = {
          isErr: true,
          message: validateCoordinate.message,
        };
      }

      if (data.alert_status) {
        let item = data.alert;

        if (
          !item.in_geofence &&
          !item.out_geofence &&
          (!item.overtime_stay_visible ||
            (item.overtime_stay_visible && item.overtime_stay === "")) &&
          (!item.range_alert_time_visible ||
            (item.range_alert_time_visible &&
              (item.start_alert === "" || item.end_alert === ""))) &&
          (!item.start_odo_visible ||
            (item.start_odo_visible && item.start_odo === "")) &&
          (!item.speed_limit_visible ||
            (item.speed_limit_visible && item.speed_limit === ""))
        ) {
          errorMessage.push("โปรดระบุเงื่อนไขในการแจ้งเตือน อย่างน้อย 1 อย่าง");
          _validateSubmit.alert = {
            isErr: true,
            message: "โปรดระบุอย่างน้อย 1 อย่าง",
          };
        }
      }

      if (errorMessage.length > 0) {
        setAlert(true, 4, "", errorMessage);
        setStatesGeofencesRedux({
          isLoadingGeofence: { visible: false, type: 6 },
          validateSubmit: _validateSubmit,
        });
        return;
      } else {
        data.geom_type = parseInt(data.geom_type);
        data.geofence_type = parseInt(data.geofence_type);

        if (data.alert_status) {
          data.alert.overtime_stay = data.alert.overtime_stay_visible
            ? data.alert.overtime_stay !== ""
              ? parseInt(data.alert.overtime_stay)
              : 0
            : 0;
          data.alert.start_odo = data.alert.start_odo_visible
            ? data.alert.start_odo !== ""
              ? parseInt(data.alert.start_odo)
              : 0
            : 0;
          data.alert.speed_limit = data.alert.speed_limit_visible
            ? data.alert.speed_limit !== ""
              ? parseInt(data.alert.speed_limit)
              : 0
            : 0;
        }

        delete data.alert.overtime_stay_visible;
        delete data.alert.range_alert_time_visible;
        delete data.alert.start_odo_visible;
        delete data.alert.speed_limit_visible;

        // console.log("READY TO SAVE : ", data)
      }

      return data;
      //#endregion
    };
    //#endregion

    if ([1, 3].includes(iconGeofenceType)) {
      if (dataForm.isNewAttach) {
        // UPLOAD ICON FIRST

        //#region ตรวจสอบไอคอนกำหนดเอง ก่อนอัพโหลด
        let errorMessage = [];
        if (iconGeofenceType === 3 && !iconPreview.isCustomUnion.shape) {
          errorMessage.push("โปรดกำหนดรูปแบบไอคอน");
          _validateSubmit.iconType = { isErr: true, message: "โปรดระบุ" };
        }
        if (iconGeofenceType === 3 && !iconPreview.isCustomUnion.icon) {
          errorMessage.push("โปรดกำหนดไอคอน");
          _validateSubmit.iconTemplate = { isErr: true, message: "โปรดระบุ" };
        }

        if (errorMessage.length > 0) {
          setAlert(true, 4, "", errorMessage);
          setStatesGeofencesRedux({
            validateSubmit: _validateSubmit,
          });
          return;
        }
        //#endregion

        setStatesGeofencesRedux({
          isLoadingGeofence: { visible: true, type: 6 },
          validateSubmit: _validateSubmit,
        });
        uploadIconGeofence()
          .then((res) => {
            if (res.ok) {
              validateData(icon_attach_id).then((data) => {
                formData = data;

                if (data !== undefined)
                  setAlert(true, 3, "บันทึกข้อมูล"); //submitData(data)
                else
                  setStatesGeofencesRedux({
                    isLoadingGeofence: { visible: false, type: 6 },
                  });
              });
            }
          })
          .catch((err) => {
            setStatesGeofencesRedux({
              isLoadingGeofence: { visible: false, type: 6 },
            });
          });
      } else {
        validateData(dataForm.icon_attach_id).then((data) => {
          formData = data;
          if (data !== undefined) setAlert(true, 3, "บันทึกข้อมูล"); // submitData(data)
        });
      }
    } else {
      validateData(dataForm.icon_attach_id).then((data) => {
        formData = data;
        if (data !== undefined) setAlert(true, 3, "บันทึกข้อมูล"); // submitData(data)
      });

      setStatesGeofencesRedux({
        validateSubmit: _validateSubmit,
      });
    }
  };

  //#region CREATE GEOFENCE
  const submitData = async (data) => {
    setStatesGeofencesRedux({
      createGeofSucc: false,
      isLoadingGeofence: { visible: true, type: 6 },
    });
    data["app_id"] = 2;
    let body = {
      data: data,
    };
    // var response = await fetch("http://10.8.0.8:5000/prod/fleet/geofence", {
    var response = await fetch(ENDPOINT_BASE_URL_YNM2 + "fleet/geofence", {
      method: geofenceId === "" ? "POST" : "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    var res = await response.json();
    setStatesGeofencesRedux({ isLoadingGeofence: { visible: false, type: 6 } });
    if (res.message === "ok") {
      if (geofenceId === "") {
        // setAlert(
        //   true,
        //   8,
        //   "คุณต้องการสร้างจีโอเฟนซ์ต่อ ?",
        //   [],
        //   "สร้างจีโอเฟนซ์สำเร็จ"
        // );
        setAlert(
          true,
          8,
          "คุณต้องการสร้างจีโอเฟนซ์ต่อ ?",
          [],
          "สร้างจีโอเฟนซ์สำเร็จ"
        );
      } else {
        setAlert(true, 1, "แก้ไขจีโอเฟนซ์สำเร็จ");
      }

      // CLEAR FORM DATA
      if (geofenceId === "") {
        // กรณีสร้างใหม่ ให้เคลียร์ค่า
        setStatesGeofencesRedux({
          shapeDetail: null,
          shapeDefault: null,
          coordinates: [],
          createGeofSucc: true,
        });
        setFormData("geofence_name", "");
        setFormData("geofence_description", "");

        if (data.is_preset)
          setStatesGeofencesRedux({ isReloadPresetIcon: true });
      }
    } else {
      setAlert(true, 2, get(res, "Error.Message", ""));
    }
    setStatesGeofencesRedux({
      validateSubmit: {
        geofenceName: { isErr: false, message: "" },
        geomType: { isErr: false, message: "" },
        coordinates: { isErr: false, message: "" },
        icon: { isErr: false, message: "" },
        alert: { isErr: false, message: "" },
        iconType: { isErr: false, message: "" },
        iconTemplate: { isErr: false, message: "" },
      },
    });
  };
  //#endregion

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
    <div className="box-custom">
      <Alert
        setting={alertSetting}
        onConfirm={() => {
          if (alertSetting.type === 3) submitData(formData);
          if (alertSetting.type === 1) changeForm();

          setAlert(false);
        }}
        onCancel={() => {
          setStatesGeofencesRedux({
            isLoadingGeofence: { visible: false, type: 6 },
          });
          if (alertSetting.type === 8) changeForm();

          setAlert(false);
        }}
      />
      <div className="box-custom-header sticky">
        <div className="flex-container">
          <div className="flex-item-header-left">
            <h3 style={{ marginTop: 9 }}>
              {isFormSetting
                ? geofenceId === ""
                  ? "สร้างจีโอเฟนซ์"
                  : "แก้ไขจีโอเฟนซ์"
                : "รายการจีโอเฟนซ์"}
            </h3>
          </div>
          <div
            className="flex-item-header-right"
            style={{ textAlign: "right", flex: "90% 1" }}
          >
            {isFormSetting ? (
              // <button type="button" className="btn btn-primary btn-sm btn btn-secondary" onClick={() => changeForm()}>
              //   <span >ยกเลิก</span>
              // </button>

              <Button isCancelButton={true} onClick={() => changeForm()} />
            ) : (
              [
                // <Template />,
                // <input id="upload" type="file" onChange={(e) => testImport(e)}></input>,
                // <input id="upload" type="file" onChange={(e) => testImport(e)}>ggggggggg</input>,
                // <input onClick={() => testImport()}>ddddddd</input>,
                // <Button
                //   key="button-3"
                //   icon={<DownloadOutlined />}
                //   onClick={() => exportFile('export')}
                //   style={{ marginRight: 2 }}>
                //   <span >Export</span>
                // </Button>,
                // <button key="button-4" type="button" className="btn btn-primary btn-sm btn btn-secondary" onClick={() => changeForm()}>
                //   <span >สร้างจีโอเฟนซ์</span>
                // </button>

                <Button isAddButton={true} onClick={() => changeForm()} />,
              ]
            )}
          </div>
        </div>
      </div>
      <div className="box-custom-content">
        {isFormSetting ? <GeofenceForm /> : <GeofenceLists />}
      </div>
      {isFormSetting && (
        <div
          className="box-custom-footer"
          style={{ marginTop: isShowBanner ? -25 : 30 }}
        >
          <button
            onClick={() => {
              setFormData("app_id", 2);
              console.log(formData);
              manageGeofence();
            }}
            className="btn"
            style={{
              marginRight: 10,
              backgroundColor: "#1AB394",
              color: "white",
              width: "100%",
            }}
          >
            บันทึก
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  language: state.versatile.language,
  isFormSetting: state.geofences.isFormSetting,
  geofenceList: state.geofences.geofenceList,
  // geofenceDisplay: state.geofences.geofenceDisplay,
  dataForm: state.geofences.dataForm,
  geofenceId: state.geofences.geofenceId,
  shapeDetail: state.geofences.shapeDetail,
  fileUplaod: state.geofences.fileUplaod,
  iconGeofenceType: state.geofences.iconGeofenceType,
  iconPreview: state.geofences.iconPreview,
  isReloadPresetIcon: state.geofences.isReloadPresetIcon,
  coordinatesText: state.geofences.coordinatesText,
  validateSubmit: state.geofences.validateSubmit,
  isShowBanner: state.banner.isShowBanner,
});

const mapDispatchToProps = (dispatch) => ({
  clearDataForm: () => dispatch(GeofencesActions.clearDataForm()),
  setFormData: (filedName, value, isSubObject) =>
    dispatch(GeofencesActions.setFormData(filedName, value, isSubObject)),
  setStatesGeofencesRedux: (obj) =>
    dispatch(GeofencesActions.setStatesGeofencesRedux(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormManage);

const svgToPng = (svgText, margin, fill) => {
  // convert an svg text to png using the browser
  return new Promise(function (resolve, reject) {
    try {
      // can use the domUrl function from the browser
      var domUrl = window.URL || window.webkitURL || window;
      if (!domUrl) {
        throw new Error("(browser doesnt support this)");
      }

      // figure out the height and width from svg text
      var match = svgText.match(/height=\"(\d+)/m);
      var height = match && match[1] ? parseInt(match[1], 10) : 200;
      var match = svgText.match(/width=\"(\d+)/m);
      var width = match && match[1] ? parseInt(match[1], 10) : 200;
      margin = margin || 0;

      // it needs a namespace
      if (!svgText.match(/xmlns=\"/im)) {
        svgText = svgText.replace(
          "<svg ",
          '<svg xmlns="http://www.w3.org/2000/svg" '
        );
      }

      // create a canvas element to pass through
      var canvas = document.createElement("canvas");
      canvas.width = height + margin * 2;
      canvas.height = width + margin * 2;
      var ctx = canvas.getContext("2d");

      // make a blob from the svg
      var svg = new Blob([svgText], {
        type: "image/svg+xml;charset=utf-8",
      });

      // create a dom object for that image
      var url = domUrl.createObjectURL(svg);

      // create a new image to hold it the converted type
      var img = new Image();

      // when the image is loaded we can get it as base64 url
      img.onload = function () {
        // draw it to the canvas
        ctx.drawImage(this, margin, margin);

        // if it needs some styling, we need a new canvas
        if (fill) {
          var styled = document.createElement("canvas");
          styled.width = canvas.width;
          styled.height = canvas.height;
          var styledCtx = styled.getContext("2d");
          styledCtx.save();
          styledCtx.fillStyle = fill;
          styledCtx.fillRect(0, 0, canvas.width, canvas.height);
          styledCtx.strokeRect(0, 0, canvas.width, canvas.height);
          styledCtx.restore();
          styledCtx.drawImage(canvas, 0, 0);
          canvas = styled;
        }
        // we don't need the original any more
        domUrl.revokeObjectURL(url);
        // now we can resolve the promise, passing the base64 url
        resolve(canvas.toDataURL());
      };

      // load the image
      img.src = url;
    } catch (err) {
      console.log("failed to convert svg to png " + err);
    }
  });
};
