import React, { Suspense, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import GeofencesActions from "../../../Redux/GeofencesRedux";
import "../Styles/layout.css";
import "../Styles/preset.css";
import { Col, Row, Badge } from "reactstrap";
import {
  Select,
  Checkbox,
  Tabs,
  Switch,
  Input,
  Slider,
  TimePicker,
  InputNumber,
  Radio,
  Tooltip,
  Popconfirm,
} from "antd";
import { useTranslation } from "react-i18next";
import { get, isEmpty } from "lodash";
import moment from "moment";
import UploadFile from "./UploadFile";
import { TwitterPicker } from "react-color";
import images from "../Manage/Icons";
import {
  convertStringToObjectURL,
  setFillIconColor,
  setFillShapeColor,
  unionIcon,
  shapeType as setShape,
} from "./fn";
import { ENDPOINT_BASE_URL } from "../../../Config/app-config";
import { Button } from "../../../components_new";

const format = "HH:mm";
const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;

//#region DATA INPUT
const setPreviewIcon = (
  isUrl = false,
  url = "",
  base64Data = "",
  filedName = "",
  isCustomUnion = { shape: false, icon: false }
) => {
  return { isUrl, url, base64Data, filedName, isCustomUnion };
};

const SelectSearch = (arg) => {
  const { t } = useTranslation();

  return (
    <Select
      allowClear={false}
      mode={"single"}
      showSearch={arg.showSearch}
      style={{ width: "100%" }}
      placeholder={t(arg.placeholder)}
      value={arg.value}
      onChange={arg.onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {!isEmpty(arg.list) &&
        arg.list !== null &&
        arg.list.map((item) => {
          return <Option key={item.key}>{t(item.value)}</Option>;
        })}
    </Select>
  );
};

const LangaugeSelect = (arg) => {
  return (
    <Select
      status={arg.status}
      value={arg.value}
      style={{ width: "20%" }}
      onChange={(value) => arg.onChange(value)}
    >
      <Option value="TH">TH</Option>
      <Option value="EN">EN</Option>
      <Option value="JP">JP</Option>
    </Select>
  );
};

//#endregion
let iconIdFocus = "",
  fileName = "";
let timeoutOnKey = null;
const GeofenceForm = (props) => {
  const { t } = useTranslation();
  let {
    dataLogin,
    geofenceId,
    presetIconList,
    geofenceTypeList,
    geomTypeList,
    dataForm,
    previewFileUpload,
    iconPreview,
    shapeEditCurrent,
    shapeDetail,
    coordinatesText,
    geomType,
    validateSubmit,
  } = props; // STATE
  let { setFormData, clearDataForm, setFormDataEdit, setStatesGeofencesRedux } =
    props; // action
  //#region STATE
  const ref = useRef(null);
  const [fillPreset, setFillPreset] = useState({
    shape: "#c8ced3",
    icon: "#5b5b5b",
  });
  const [shapeFocus, setShapeFocus] = useState("");
  const [colorType, setColorType] = useState(1);
  const [tabActiveKey, setTabActiveKey] = useState("1");
  const [iconCustom, setIconCustom] = useState({ shape: "", icon: "" });
  const [geofenceNameLng, setGeofenceNameLng] = useState("TH");
  const [descriptionLng, setDescriptionLng] = useState("TH");
  const [isNewIcon, setIsNewIcon] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(true);
  //#endregion

  useEffect(() => {
    //#region  CHECK PARAMETER FRON ANOTER PAGE
    setFormData("app_id", 2);
    let parmLocation = "";
    try {
      const param = window.location.href.split("?")[1];
      if (typeof param !== undefined) {
        parmLocation = JSON.parse(atob(param));
      }
    } catch {}
    //#endregion

    if (geofenceId !== "") {
      loadGeofenceData();
      setStatesGeofencesRedux({
        iconPreview: setPreviewIcon(true, previewFileUpload),
        isDrawing: true,
      });
    } else {
      setFormData("geofence_type", "" + get(geofenceTypeList[0], "key", ""));
      setFormData("isNewAttach", false);

      let iconUrl = "";
      if (geofenceTypeList.length > 0) {
        iconUrl = geofenceTypeList[0].url;
        setFormData("icon_attach_id", geofenceTypeList[0].icon_attach_id);
      }

      if (geomType !== "") {
        setFormData("geom_type", geomType);
      }

      if (parmLocation !== "") {
        setFormData("geom_type", "1");
        // setFormData("coordinate", [parmLocation])
        setStatesGeofencesRedux({
          geomType: 1,
          isDrawing: true,
          shapeDefault: {
            geomType: "" + 1,
            radius: 10,
            // center: dt.center_point,
            paths: [parmLocation],
          },
          // iconMarker: dt.attach.url
        });
      }

      setStatesGeofencesRedux({
        iconPreview: setPreviewIcon(true, iconUrl),
        iconMarker: iconUrl,
        iconGeofenceType: 2,
        previewFileUpload: "",
        isDrawing: true,
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      // UNMOUNT
      setStatesGeofencesRedux({
        coordinatesText: "",
        iconMarker: null,
        geofenceId: "",
        iconPreview: setPreviewIcon(),
        previewFileUpload: "",
        isLoadingGeofence: { visible: false, type: 6 },
      });
    };
  }, []);

  useEffect(() => {
    if (geofenceId === "") {
      //#region  CHECK PARAMETER FRON ANOTER PAGE
      try {
        const param = window.location.href.split("?")[1];
        if (typeof param !== undefined) {
          setFormData(
            "geofence_type",
            "" + get(geofenceTypeList[0], "key", "")
          );
          let iconUrl = "";
          if (geofenceTypeList.length > 0) {
            iconUrl = geofenceTypeList[0].url;
            setFormData("icon_attach_id", geofenceTypeList[0].icon_attach_id);
          }

          setStatesGeofencesRedux({
            iconPreview: setPreviewIcon(true, iconUrl),
            iconMarker: iconUrl,
          });
        }
      } catch {}
      //#endregion
    }
  }, [geofenceTypeList]);

  useEffect(() => {
    // RERENDER
  }, [fillPreset]);

  useEffect(() => {
    if (previewFileUpload !== "") {
      setIsNewIcon(true);
      setStatesGeofencesRedux({
        iconPreview: setPreviewIcon(true, previewFileUpload),
        iconMarker: previewFileUpload,
        iconGeofenceType: 1,
      });
    }
    // RERENDER
  }, [previewFileUpload]);

  useEffect(() => {}, [dataForm]);

  const loadGeofenceData = async () => {
    setStatesGeofencesRedux({ isLoadingGeofence: { visible: true, type: 5 } });
    try {
      // var response = await fetch(`http://10.8.0.8:5000/prod/fleet/geofence?geofence_id=${geofenceId}&user_id=${dataLogin.userId}`, {
      var response = await fetch(
        ENDPOINT_BASE_URL +
          `fleet/geofence?geofence_id=${geofenceId}&user_id=${dataLogin.userId}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      let data = await response.json();

      if (data.message === "ok") {
        let dt = data.result;
        dt.isNewAttach = false;
        setFormDataEdit(dt);
        setTabActiveKey("" + dt.attach.attach_type);
        setStatesGeofencesRedux({
          iconPreview: setPreviewIcon(true, dt.attach.url),
          geomType: "" + dt.geom_type,
          shapeDefault: {
            geomType: "" + dt.geom_type,
            radius: dt.radius,
            center: dt.center_point,
            paths: [...dt.coordinate],
          },
          shapeEditCurrent: {
            geomType: "" + dt.geom_type,
            radius: dt.radius,
            center: dt.center_point,
            paths: [...dt.coordinate],
          },
          iconMarker: dt.attach.url,
        });
        // CHECK ICON CUSTOM
        if (dt.attach.attach_type === 3) {
          const name = dt.attach.attach_name.split("_");
          fileName = dt.attach.attach_name;
          let iconId = name[2].split("icon")[1];
          let shapeColor = name[1];
          let iconColor = name[3];

          setDefaultShapeAndIcon("shape", name[0], `#${shapeColor}`); // Set Shape
          setDefaultShapeAndIcon("icon", iconId, `#${iconColor}`); // Set Icon
          setShapeFocus(name[0]);
          iconIdFocus = iconId;
        }
      }
    } catch {
      clearDataForm();
    }
    setStatesGeofencesRedux({ isLoadingGeofence: { visible: false, type: 5 } });
  };

  const setDefaultShapeAndIcon = async (type, ref, color) => {
    let attribute = type === "shape" ? "name" : "id";
    let iconInfo = images[type].find((x) => x[attribute] == ref);

    let icCustom = iconCustom,
      _fillPreset = fillPreset;
    await fetch(iconInfo.path)
      .then((response) => response.text())
      .then((svg) => {
        if (type === "shape") {
          _fillPreset.shape = color;
          icCustom.shape = svg;
        }
        if (type === "icon") {
          _fillPreset.icon = color;
          svg = setFillIconColor(svg, _fillPreset);
          icCustom.icon = svg;
        }
        setFillPreset(_fillPreset);
        setIconCustom(icCustom);
      });
  };

  const setUnionIcon = async (
    type,
    icon,
    isSVGtext = false,
    shapeType = "",
    iconId = ""
  ) => {
    let icCustom = iconCustom;
    if (shapeType === "") shapeType = shapeFocus;

    if (isSVGtext) {
      let svgBlob = unionIcon(
        shapeType,
        icCustom.shape,
        icCustom.icon,
        fillPreset,
        iconId
      );
      setFileNameIconCustom(shapeFocus, iconIdFocus);
      setStatesGeofencesRedux({
        iconPreview: setPreviewIcon(
          true,
          svgBlob.svg,
          svgBlob.base64Data,
          fileName,
          { shape: true, icon: true }
        ),
        iconMarker: svgBlob.svg,
      });
    } else {
      await fetch(icon)
        .then((response) => response.text())
        .then((svg) => {
          let svgBlob = convertStringToObjectURL(svg);
          if (type === "shape") {
            svg = setFillShapeColor(svg, fillPreset, shapeType);
            icCustom.shape = svg;
          }
          if (type === "icon") {
            svg = setFillIconColor(svg, fillPreset);
            icCustom.icon = svg;
          }
          setIconCustom(icCustom);

          //#region CHECK UNION ICON
          if (icCustom.shape !== "" && icCustom.icon !== "") {
            // Union Icon
            let svgBlob = unionIcon(
              shapeType,
              icCustom.shape,
              icCustom.icon,
              fillPreset,
              iconId
            );
            setStatesGeofencesRedux({
              iconPreview: setPreviewIcon(
                true,
                svgBlob.svg,
                svgBlob.base64Data,
                fileName,
                { shape: true, icon: true }
              ),
              iconMarker: svgBlob.svg,
            });
          } else if (icCustom.shape !== "") {
            let svgBlob = convertStringToObjectURL(
              setShape(shapeType, fillPreset.shape).shape
            );
            setStatesGeofencesRedux({
              iconPreview: setPreviewIcon(true, svgBlob, "", "", {
                shape: true,
                icon: false,
              }),
              iconMarker: svgBlob,
            });
          } else if (icCustom.icon !== "") {
            // let svgBlobIcon = convertStringToObjectURL(setIconColor(svgBlob, fillPreset.icon))
            setStatesGeofencesRedux({
              iconPreview: setPreviewIcon(true, svgBlob, "", "", {
                shape: false,
                icon: true,
              }),
              iconMarker: svgBlob,
            });
          }
          //#endregion
        });
    }
    setStatesGeofencesRedux({ iconGeofenceType: 3 });
    setFormData("isNewAttach", true);
  };

  const setFillShapeAndIconChange = (color) => {
    let icCustom = iconCustom,
      svgBlob = "";
    setColorIconCustom(color);
    if (icCustom.shape !== "" && icCustom.icon !== "") {
      setUnionIcon("shape", "", true, "", { shape: true, icon: true });
    } else if (icCustom.shape !== "" && colorType === 1) {
      let svgShape = setFillShapeColor(
        icCustom.shape,
        { shape: color },
        shapeFocus
      );
      svgBlob = convertStringToObjectURL(svgShape);
      icCustom.shape = svgShape;
      setStatesGeofencesRedux({
        iconPreview: setPreviewIcon(true, svgBlob, "", "", {
          shape: true,
          icon: false,
        }),
        iconMarker: svgBlob,
      });
    } else if (icCustom.icon !== "" && colorType === 2) {
      let svgIcon = setFillIconColor(icCustom.icon, { icon: color });
      svgBlob = convertStringToObjectURL(svgIcon);
      icCustom.icon = svgIcon;
      setStatesGeofencesRedux({
        iconPreview: setPreviewIcon(true, svgBlob, "", "", {
          shape: false,
          icon: true,
        }),
        iconMarker: svgBlob,
      });
    }
    setIconCustom(icCustom);
  };

  const setColorIconCustom = (color) => {
    let _fillPreset = fillPreset;
    if (colorType === 1) _fillPreset.shape = color;
    if (colorType === 2) _fillPreset.icon = color;

    setFillPreset(_fillPreset);
  };

  const setFileNameIconCustom = (shape = "", iconId = "") => {
    let name = `${shape}_${fillPreset.shape.replace(
      "#",
      ""
    )}_icon${iconId}_${fillPreset.icon.replace("#", "")}`;
    fileName = name;
  };

  const CheckboxGroup = (arg) => {
    return (
      <div className="row" style={{ paddingTop: 5 }}>
        <Checkbox
          checked={arg.checked}
          onChange={(e) => setFormData(arg.filedName, e.target.checked, true)}
        >
          <label className="label-input">{arg.text}</label>
        </Checkbox>
        <br />
        {arg.children && <div style={{ marginLeft: 25 }}>{arg.children}</div>}
      </div>
    );
  };

  const setRadiueChange = (value) => {
    let _shapeDefault = { ...shapeDetail };
    _shapeDefault.radius = value;
    _shapeDefault.paths = [shapeDetail.center];
    setStatesGeofencesRedux({ shapeDefault: _shapeDefault });
  };

  const setShowOnMap = (coordinates) => {
    // console.log(coordinates)
    if (coordinates === "") clearCoodinatesText();
    let _validateSubmit = {
      geofenceName: { isErr: false, message: "" },
      geomType: { isErr: false, message: "" },
      coordinates: { isErr: false, message: "" },
      icon: { isErr: false, message: "" },
      alert: { isErr: false, message: "" },
      iconType: { isErr: false, message: "" },
      iconTemplate: { isErr: false, message: "" },
    };

    let txtInput = coordinates.trim();
    if (txtInput !== "") {
      let coordinate = txtInput.split("\n");
      if (dataForm?.geom_type == "1") {
        let spLatLng = coordinate[0].split(",");
        let isErr = false;
        if (spLatLng.length === 2) {
          if (spLatLng[1].trim() !== "") {
            let lat = parseFloat(spLatLng[0].trim()),
              lng = parseFloat(spLatLng[1].trim());

            let dafaultLocation = { lat, lng };
            // console.log('dafaultLocation : ', dafaultLocation)
            if (
              Number.isNaN(dafaultLocation.lat) ||
              Number.isNaN(dafaultLocation.lng)
            ) {
              isErr = true;
            } else {
              setStatesGeofencesRedux({
                coordinatesText: `${lat}, ${lng}`,
                shapeDefault: {
                  geomType: dataForm.geom_type,
                  radius: dataForm.radius,
                  center: dafaultLocation,
                  paths: [dafaultLocation],
                },
              });
            }
          } else isErr = true;
        } else isErr = true;

        _validateSubmit.coordinates = {
          isErr,
          message: "พิกัดไม่ถูกต้อง โปรดระบุใหม่",
        };
        setStatesGeofencesRedux({
          validateSubmit: _validateSubmit,
        });
      } else if (dataForm?.geom_type == "3") {
        let coordinate = txtInput.split("\n");
        let coordText = "",
          paths = [];
        let isErr = false,
          message = "พิกัดไม่ถูกต้อง โปรดระบุใหม่";
        coordinate.forEach((item) => {
          let spLatLng = item.split(",");
          if (spLatLng.length === 2) {
            if (spLatLng[1].trim() !== "") {
              let lat = parseFloat(spLatLng[0].trim()),
                lng = parseFloat(spLatLng[1].trim());

              if (Number.isNaN(lat) || Number.isNaN(lng)) isErr = true;
              else {
                paths.push({ lat, lng });
                if (coordText === "") coordText += `${lat}, ${lng}`;
                else coordText += `\n${lat}, ${lng}`;
              }
            } else isErr = true;
          } else isErr = true;
        });

        if (paths.length < 3) {
          isErr = true;
          message = "โปรดระบุพิกัดมากกว่า 2 จุด";
          setStatesGeofencesRedux({
            shapeDefault: {
              geomType: dataForm.geom_type,
              radius: dataForm.radius,
              paths: paths,
            },
          });
        }

        _validateSubmit.coordinates = { isErr, message };
        if (isErr) {
          setStatesGeofencesRedux({
            validateSubmit: _validateSubmit,
          });
        } else {
          setStatesGeofencesRedux({
            validateSubmit: _validateSubmit,
            coordinatesText: coordText,
            shapeDefault: {
              geomType: dataForm.geom_type,
              radius: dataForm.radius,
              paths: paths,
            },
          });
        }
      }
    } else {
      setStatesGeofencesRedux({
        validateSubmit: {
          ..._validateSubmit,
          coordinates: { isErr: true, message: "โปรดระบุ" },
        },
      });
      setStatesGeofencesRedux({ coordinatesText: "" });
    }
  };

  const clearCoodinatesText = () => {
    setStatesGeofencesRedux({
      coordinatesText: "",
      isDrawing: true,
      shapeDetail: null,
    });
  };

  const setExample = () => {
    if (dataForm?.geom_type == "1") {
      let dafaultLocation = { lat: 13.788455, lng: 100.61043 };
      setFormData("radius", 1000);
      setStatesGeofencesRedux({
        coordinatesText: "13.788455, 100.610430",
        shapeDefault: {
          geomType: dataForm.geom_type,
          radius: 1000,
          center: dafaultLocation,
          paths: [dafaultLocation],
        },
      });
    } else if (dataForm?.geom_type == "3") {
      let dafaultCenter = {
        lat: 13.788422928506684,
        lng: 100.60974755390733,
      };
      let dafaultLocation = [
        {
          lat: 13.78484902773825,
          lng: 100.6052950869426,
        },
        {
          lat: 13.782744215249146,
          lng: 100.60990848644822,
        },
        {
          lat: 13.791934395693797,
          lng: 100.61420002087205,
        },
        {
          lat: 13.794101641764222,
          lng: 100.60962953671067,
        },
      ];

      setStatesGeofencesRedux({
        coordinatesText:
          "13.78484902773825, 100.6052950869426\n13.782744215249146, 100.60990848644822\n13.791934395693797, 100.61420002087205\n13.794101641764222, 100.60962953671067",
        shapeDefault: {
          geomType: dataForm.geom_type,
          radius: dataForm.radius,
          center: dafaultCenter,
          paths: dafaultLocation,
        },
      });
    }
  };

  const removeLettersAndNumbers = (str) => {
    return str.replace(
      /[A-Za-zก-ฮๅ/_ุึๆไำะัีเ้่าแืใ๐ํ๊ฯโ็๋์!@#$%^&*()+`{}<>?"'\]\[]/g,
      ""
    );
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      let objDiv = document.getElementById("geofence-form");
      objDiv.scrollTo({
        top: objDiv.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  };

  // console.log(">>> RENDER FORM <<< : ", dataForm)

  return (
    <Suspense fallback={null}>
      {/* <div className="form-group row margin-bottom">
        <label className="label-input">รหัสสถานี : </label>
        <Input
          placeholder="รหัสสถานี"
          value={dataForm.geofence_code}
          onChange={(e) => {
            setFormData("geofence_code", e.target.value);
          }}
        />
      </div>

      <div className="form-group row margin-bottom">
        <label className="label-input">รหัสอ้างอิง : </label>
        <Input
          placeholder="รหัสอ้างอิง"
          value={dataForm.geofence_code_ref}
          onChange={(e) => {
            setFormData("geofence_code_ref", e.target.value);
          }}
        />
      </div> */}

      <div className="form-group row margin-bottom">
        <label className="label-input">
          ชื่อจีโอเฟนซ์<span className="require">*</span> :
          {validateSubmit.geofenceName.isErr && (
            <span className="require">
              {" "}
              {validateSubmit.geofenceName.message}
            </span>
          )}
        </label>
        <div id="selected-1">
          <Input.Group compact>
            <LangaugeSelect
              status={validateSubmit.geofenceName.isErr ? "error" : ""}
              value={geofenceNameLng}
              onChange={(value) => setGeofenceNameLng(value)}
            />
            <Input
              style={{ width: "80%" }}
              status={validateSubmit.geofenceName.isErr ? "error" : ""}
              placeholder="ชื่อจีโอเฟนซ์"
              value={
                geofenceNameLng === "TH"
                  ? dataForm.geofence_name
                  : geofenceNameLng === "EN"
                  ? dataForm.geofence_name_en
                  : dataForm.geofence_name_jp
              }
              onChange={(e) => {
                setFormData("app_id", 2);
                if (geofenceNameLng === "TH")
                  setFormData("geofence_name", e.target.value);
                else if (geofenceNameLng === "EN")
                  setFormData("geofence_name_en", e.target.value);
                else if (geofenceNameLng === "JP")
                  setFormData("geofence_name_jp", e.target.value);
              }}
            />
          </Input.Group>
          <style type="text/css">
            {`
              #selected-1 > .ant-input-group > .ant-select> .ant-select-selector {
                   border-radius: 6px 0px 0px 6px !important;
              }

               #selected-1 > .ant-input-group > input {
                    border-radius: 0px 6px 6px 0px !important;
                    padding: 2.5px 11px !important;
              }
              `}
          </style>
        </div>
      </div>

      <div className="form-group row margin-bottom">
        <label className="label-input">รายละเอียด : </label>
        <div id="selected-2">
          <Input.Group compact>
            <LangaugeSelect
              value={descriptionLng}
              onChange={(value) => {
                setFormData("app_id", 2);
                setDescriptionLng(value);
              }}
            />
            <TextArea
              style={{ width: "80%" }}
              autoSize={{
                minRows: 1,
                maxRows: 4,
              }}
              placeholder="รายละเอียด"
              value={
                descriptionLng === "TH"
                  ? dataForm.geofence_description
                  : descriptionLng === "EN"
                  ? dataForm.geofence_description_en
                  : dataForm.geofence_description_jp
              }
              onChange={(e) => {
                setFormData("app_id", 2);
                if (descriptionLng === "TH")
                  setFormData("geofence_description", e.target.value);
                else if (descriptionLng === "EN")
                  setFormData("geofence_description_en", e.target.value);
                else if (descriptionLng === "JP")
                  setFormData("geofence_description_jp", e.target.value);
              }}
            />
          </Input.Group>

          <style type="text/css">
            {`
              #selected-2 > .ant-input-group > .ant-select> .ant-select-selector {
                     border-radius: 6px 0px 0px 6px !important;
              }

              #selected-2 > .ant-input-group > textarea {
                border-radius: 0px 6px 6px 0px !important;
                padding: 2px 11px !important;
              }
              `}
          </style>
        </div>
      </div>

      {/* <div className="form-group row margin-bottom">
        <label className="label-input">ประเภท : </label>
        <SelectSearch
          list={geofenceTypeList}
          value={"" + dataForm.geofence_type}
          showSearch={true}
          placeholder={"ประเภท"}
          flex={1}
          onChange={(value) => {
            setFormData("geofence_type", value);
            if (["2", "7"].includes(value)) setFormData("is_hazard", true);
            else setFormData("is_hazard", false);

            let info = geofenceTypeList.find((x) => x.key == value);
            setStatesGeofencesRedux({
              iconPreview: setPreviewIcon(true, info.url),
              iconMarker: info.url,
              iconGeofenceType: 2,
            });
            setFormData("icon_attach_id", info.icon_attach_id);
          }}
        />
      </div> */}
      <div className="form-group row margin-bottom">
        <label className="label-input">
          รูปร่าง<span className="require">*</span> :{" "}
        </label>
        <SelectSearch
          list={geomTypeList}
          showSearch={false}
          placeholder={"รูปร่าง"}
          flex={1}
          value={"" + dataForm.geom_type}
          onChange={(value) => {
            setFormData("app_id", 2);
            setFormData("geom_type", value);
            setStatesGeofencesRedux({
              geomType: value,
              isDrawing: true,
              coordinatesText: "",
            });
          }}
        />
      </div>

      {dataForm.geom_type == "1" && (
        <div className="form-group row margin-bottom">
          <label className="label-input">รัศมี (เมตร) : </label>
          <Row>
            <Col lg={8}>
              <Slider
                min={10}
                max={1000}
                onChange={(value) => {
                  setFormData("app_id", 2);
                  setFormData("radius", value);
                  setRadiueChange(value);
                }}
                value={
                  typeof dataForm.radius === "number" ? dataForm.radius : 10
                }
              />
            </Col>
            <Col lg={4}>
              <InputNumber
                min={10}
                max={1000}
                step={10}
                style={{ width: 100 }}
                value={dataForm.radius}
                onChange={(value) => {
                  setFormData("app_id", 2);
                  setFormData("radius", value);
                  setRadiueChange(value);
                }}
              />
            </Col>
          </Row>
        </div>
      )}

      {
        <>
          <div className="form-group row margin-bottom">
            <label className="label-input">
              {t("geofence_28")}
              <span className="require">*</span> :
              <Tooltip
                title={
                  <div className="box-desc">
                    <div className="flex flex-col">
                      <div
                        className="flex-1"
                        style={{ borderBottom: "1px solid #e0e0e0" }}
                      >
                        {/* <span className="topic"><InfoCircleTwoTone twoToneColor="blue" /> วิธีกำหนดจีโอเฟนซ์</span> */}
                        <span className="topic">
                          <i className="fa fa-info-circle" aria-hidden="true" />{" "}
                          วิธีกำหนดพิกัด
                        </span>
                      </div>

                      {/* <span className="title" style={{ marginTop: 5 }}>วิธีที่ 1 </span> */}
                      <Badge
                        color="primary"
                        style={{
                          width: 50,
                          marginTop: 20,
                          fontSize: 14,
                          paddingBottom: 0,
                        }}
                      >
                        วิธีที่ 1{" "}
                      </Badge>
                      <span className="desc" style={{ marginLeft: 6 }}>
                        {" "}
                        - ใช้เครื่องมือวาด แล้วคลิกสร้างบนแผนที่
                      </span>
                      <div className="flex-1 text-center">
                        <img
                          style={{ height: 40 }}
                          src={require("./Icons/img/drawing-opts.jpg")}
                        ></img>
                      </div>

                      <div className="hr-line-dashed"></div>
                      {/* <span className="title" style={{ marginTop: 5 }}>วิธีที่ 2 </span> */}
                      <Badge
                        color="primary"
                        style={{
                          width: 50,
                          marginTop: 5,
                          fontSize: 14,
                          paddingBottom: 0,
                        }}
                      >
                        วิธีที่ 2{" "}
                      </Badge>
                      <span style={{ marginLeft: 3, fontSize: 14 }}>
                        รูปแบบ Point
                      </span>
                      <span className="desc" style={{ marginLeft: 12 }}>
                        {" "}
                        - ป้อนละติจูด, ลองติจูด 1 ตำแหน่ง
                      </span>
                      <div className="flex-1 text-center">
                        <img
                          style={{ height: 68 }}
                          src={require("./Icons/img/point.jpg")}
                        ></img>
                      </div>
                      <div className="hr-line-dashed"></div>
                      <span style={{ marginLeft: 3, fontSize: 14 }}>
                        รูปแบบ Polygon
                      </span>
                      <span className="desc" style={{ marginLeft: 12 }}>
                        {" "}
                        - ป้อนละติจูด, ลองติจูด อย่างน้อย 3 ตำแหน่ง <br />
                        (1 บรรทัดแทน 1 ตำแหน่ง)
                      </span>
                      <img src={require("./Icons/img/polygon.jpg")}></img>
                    </div>
                    {/* <img src={require('./Icons/img/drawing-opts.jpg')}></img> */}
                  </div>
                }
                placement="leftTop"
                // mouseLeaveDelay={10000}
              >
                {/* <Popconfirm
                placement="leftTop"
                title={"Are you sure to delete this task?"}
                description={"Delete the task"}
                onConfirm={() => { alert("") }}
                okText="Yes"
                cancelText="No"
                showCancel={false}
              > */}
                <span style={{ marginLeft: 4 }} onClick={() => {}}>
                  {/* <InfoCircleTwoTone twoToneColor="blue" /> */}
                  <i
                    className="fa fa-info-circle"
                    style={{ color: "blue", cursor: "pointer" }}
                    aria-hidden="true"
                  />
                </span>
                {/* </Popconfirm> */}
                <style type="text/css">
                  {`
                     .ant-tooltip-placement-leftBottom{
                      left: 846px !important;
                      top: 100px !important;
                      transform-origin: 254px 512px;
                     }

                      .ant-tooltip-inner {
                        min-width: 300px;
                        min-height: 500px;
                        padding: 6px 8px;
                        color: #fff;
                        text-align: left;
                        text-decoration: none;
                        word-wrap: break-word;
                        background-color: rgba(0, 0, 0, 0) !important;
                        border-radius: 6px !important;
                        box-shadow : rgb(0 0 0 / 30%) 0px 0px 0px !important;
                    }
               `}
                </style>
              </Tooltip>
              {validateSubmit.coordinates.isErr && (
                <span className="require">
                  {" "}
                  {validateSubmit.coordinates.message}
                </span>
              )}
            </label>
            {dataForm.geom_type == "1" ? (
              <Input
                status={validateSubmit.coordinates.isErr ? "error" : ""}
                placeholder={t("ละติจูด, ลองติจูด")}
                value={coordinatesText}
                onChange={(e) => {
                  let value = e.target.value;
                  setStatesGeofencesRedux({
                    coordinatesText: removeLettersAndNumbers(value),
                  });
                  setFormData("app_id", 2);
                  clearTimeout(timeoutOnKey);
                  timeoutOnKey = setTimeout(() => {
                    setShowOnMap(removeLettersAndNumbers(value));
                  }, 500);
                }}
              />
            ) : (
              <TextArea
                status={validateSubmit.coordinates.isErr ? "error" : ""}
                style={{ width: "100%" }}
                rows={5}
                placeholder={t("ละติจูด, ลองติจูด")}
                value={coordinatesText}
                onChange={(e) => {
                  setFormData("app_id", 2);
                  let value = e.target.value;
                  setStatesGeofencesRedux({
                    coordinatesText: removeLettersAndNumbers(value),
                  });
                  clearTimeout(timeoutOnKey);
                  timeoutOnKey = setTimeout(() => {
                    setShowOnMap(removeLettersAndNumbers(value));
                  }, 500);
                }}
              />
            )}

            <div className="text-end">
              <Button
                icon={
                  <i
                    className="fa fa-file"
                    style={{ marginRight: 5, fontSize: 13 }}
                  />
                }
                text="ตัวอย่าง"
                size="small"
                isCancelButton={true}
                onClick={() => setExample()}
              />

              <Button
                icon={
                  <i
                    className="fa fa-refresh"
                    style={{ marginRight: 5, fontSize: 13 }}
                  />
                }
                text="คืนค่า"
                size="small"
                isCancelButton={true}
                onClick={() => {
                  setFormData("app_id", 2);
                  if (geofenceId === "") {
                    clearCoodinatesText();
                  } else {
                    let { center, geomType, paths, radius } = shapeEditCurrent;
                    if (geomType == "1") {
                      setStatesGeofencesRedux({
                        shapeDefault: {
                          geomType: geomType,
                          radius: radius,
                          center: center,
                          paths: paths,
                        },
                      });
                    } else if (geomType == "3") {
                      setStatesGeofencesRedux({
                        shapeDefault: {
                          geomType: geomType,
                          radius: radius,
                          paths: paths,
                        },
                      });
                    }
                  }
                }}
              />
            </div>
          </div>
        </>
      }

      {/* <div className="form-group row">
        <Row>
          <Col lg={6} md={12} style={{ textAlign: 'end' }} >
            <label className="label-input" >ใช้งาน : <Switch className="scale-box" checked={dataForm.active_status === "A" ? true : false} onChange={(value) => setFormData("active_status", value ? "A" : "I")} /></label>
          </Col>

          <Col lg={6} md={12} >
            <label className="label-input" >แบ่งปัน : <Switch className="scale-box" checked={dataForm.is_share} onChange={(value) => setFormData("is_share", value)} /></label>
          </Col>
        </Row>

        <Row>
          <Col lg={6} md={12} style={{ textAlign: 'end' }}>
            <label className="label-input" >แจ้งเตือน : <Switch className="scale-box" checked={dataForm.alert_status} onChange={(value) => setFormData("alert_status", value)} /></label>
          </Col>

          <Col lg={6} md={12} >
            <label className="label-input" >พรีเซต : <Switch className="scale-box" checked={dataForm.is_preset} onChange={(value) => setFormData("is_preset", value)} /></label>
          </Col>
        </Row>
      </div> */}

      <div className="hr-line-dashed"></div>
      <div className="form-group row margin-bottom" style={{ marginTop: 6 }}>
        <label className="label-input">เปิดใช้งาน : </label>
        <Switch
          className="scale-box"
          checked={dataForm.active_status === "A" ? true : false}
          onChange={(value) => {
            setFormData("app_id", 2);
            setFormData("active_status", value ? "A" : "I");
          }}
        />

        {/* <label className="label-input-space">แบ่งปัน : </label>
        <Switch
          className="scale-box"
          checked={dataForm.is_share}
          onChange={(value) => setFormData("is_share", value)}
        /> */}

        <label className="label-input-space">แจ้งเตือน : </label>
        <Switch
          className="scale-box"
          checked={dataForm.alert_status}
          onChange={(value) => {
            setFormData("app_id", 2);
            setFormData("alert_status", value);
          }}
        />
      </div>

      {dataForm.alert_status && (
        <div>
          {/* <div className="hr-line-dashed"></div> */}
          <div className="form-group row margin-bottom">
            <label className="label-input">
              เงื่อนไขในการแจ้งเตือน<span className="require">*</span> :
              {validateSubmit.alert.isErr && (
                <span className="require"> {validateSubmit.alert.message}</span>
              )}
            </label>
            <div
              className="form-group row"
              style={{ marginTop: -15, marginLeft: 5 }}
            >
              <div className="col-lg-12" style={{ margin: 15 }}>
                {/* <div className="row" style={{ paddingTop: 5 }}>
                  <Checkbox
                    checked={dataForm.alert.overtime_stay_visible}
                    onChange={(e) => {
                      setFormData("app_id", 2);
                      setFormData(
                        "alert.overtime_stay_visible",
                        e.target.checked,
                        true
                      );
                    }}
                  >
                    <label className="label-input">เข้าจีโอเฟนส์</label>
                  </Checkbox>
                  <br />
                  <div style={{ marginLeft: 25 }}>
                    <Input
                      style={{ width: 85 }}
                      placeholder="0"
                      value={dataForm.alert.overtime_stay}
                      onChange={(e) => {
                        setFormData("app_id", 2);
                        setFormData(
                          "alert.overtime_stay",
                          e.target.value,
                          true
                        );
                      }}
                      disabled={
                        dataForm.alert.overtime_stay_visible ? false : true
                      }
                    />{" "}
                    (นาที.)
                  </div>
                </div> */}

                <CheckboxGroup
                  text="ออกจีโอเฟนส์"
                  checked={dataForm.alert.out_geofence}
                  filedName="alert.out_geofence"
                />
                <CheckboxGroup
                  text="ช่วงเวลาในการแจ้งเตือน"
                  checked={dataForm.alert.range_alert_time_visible}
                  filedName="alert.range_alert_time_visible"
                >
                  <TimePicker
                    allowClear={false}
                    style={{ width: 90 }}
                    value={moment(dataForm.alert.start_alert, format)}
                    format={format}
                    onChange={(time, timeString) => {
                      setFormData("app_id", 2);
                      setFormData("alert.start_alert", timeString, true);
                    }}
                    disabled={
                      dataForm.alert.range_alert_time_visible ? false : true
                    }
                  />
                  {` - `}
                  <TimePicker
                    allowClear={false}
                    style={{ width: 90 }}
                    value={moment(dataForm.alert.end_alert, format)}
                    format={format}
                    onChange={(time, timeString) => {
                      setFormData("app_id", 2);
                      setFormData("alert.end_alert", timeString, true);
                    }}
                    disabled={
                      dataForm.alert.range_alert_time_visible ? false : true
                    }
                  />
                </CheckboxGroup>

                {/* <CheckboxGroup text="เริ่มจาก ODO" checked={dataForm.alert.start_odo_visible} filedName="alert.start_odo_visible">
                <Input
                  style={{ width: 80 }}
                  placeholder="0"
                  value={dataForm.alert.start_odo}
                  onChange={(e) => setFormData("alert.start_odo", e.target.value, true)}
                  disabled={dataForm.alert.start_odo_visible ? false : true}
                /> (กม.)
              </CheckboxGroup> */}
                {/* <div className="row" style={{ paddingTop: 5 }}>
                  <Checkbox
                    checked={dataForm.alert.start_odo_visible}
                    onChange={(e) =>
                      setFormData(
                        "alert.start_odo_visible",
                        e.target.checked,
                        true
                      )
                    }
                  >
                    <label className="label-input">เริ่มจาก ODO</label>
                  </Checkbox>
                  <br />
                  <div style={{ marginLeft: 25 }}>
                    <Input
                      style={{ width: 85 }}
                      placeholder="0"
                      value={dataForm.alert.start_odo}
                      onChange={(e) =>
                        setFormData("alert.start_odo", e.target.value, true)
                      }
                      disabled={dataForm.alert.start_odo_visible ? false : true}
                    />{" "}
                    (กม.)
                  </div>
                </div> */}

                {/* <CheckboxGroup text="จำกัดความเร็ว" checked={dataForm.alert.speed_limit_visible} filedName="alert.speed_limit_visible">
                <Input
                  style={{ width: 80 }}
                  placeholder="0"
                  value={dataForm.alert.speed_limit}
                  onChange={(e) => setFormData("alert.speed_limit", e.target.value, true)}
                  disabled={dataForm.alert.speed_limit_visible ? false : true}
                /> (กม./ชม.)
              </CheckboxGroup> */}
                {/* <div className="row" style={{ paddingTop: 5 }}>
                  <Checkbox
                    checked={dataForm.alert.speed_limit_visible}
                    onChange={(e) =>
                      setFormData(
                        "alert.speed_limit_visible",
                        e.target.checked,
                        true
                      )
                    }
                  >
                    <label className="label-input">จำกัดความเร็ว</label>
                  </Checkbox>
                  <br />
                  <div style={{ marginLeft: 25 }}>
                    <Input
                      style={{ width: 85 }}
                      placeholder="0"
                      value={dataForm.alert.speed_limit}
                      onChange={(e) =>
                        setFormData("alert.speed_limit", e.target.value, true)
                      }
                      disabled={
                        dataForm.alert.speed_limit_visible ? false : true
                      }
                    />{" "}
                    (กม./ชม.)
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hr-line-dashed"></div>
      <div className="form-group row margin-bottom">
        <label className="label-input">
          ไอคอนจีโอเฟนซ์<span className="require">*</span> :
          {validateSubmit.icon.isErr && (
            <span className="require"> {validateSubmit.icon.message}</span>
          )}
        </label>{" "}
        <div
          className="flex-container-custom scale-box"
          style={{ backgroundColor: "#f6f6f6", height: 120 }}
        >
          <div
            style={{
              textAlign: "center",
              paddingTop: iconPreview.isUrl ? 30 : 0,
            }}
          >
            {iconPreview.isUrl && iconPreview.url !== "" && (
              <img
                style={{ width: 70, height: 70, padding: "5 5px" }}
                src={iconPreview.url}
              />
            )}
          </div>
        </div>
      </div>
      {isNewIcon && ["1", "3"].includes(tabActiveKey) && (
        <label className="label-input" style={{ marginBottom: 10 }}>
          กำหนดเป็นพรีเซต :{" "}
          <Switch
            className="scale-box"
            checked={dataForm.is_preset}
            onChange={(value) => {
              setFormData("app_id", 2);
              setFormData("is_preset", value);
            }}
          />
        </label>
      )}
      {
        // dataForm.geofence_type == "8" &&
        <div className="form-group row scale-box" style={{ paddingBottom: 30 }}>
          {/* <div className="col-lg-12"> */}
          <Tabs
            type="card"
            centered
            size="small"
            activeKey={tabActiveKey}
            onChange={(key) => {
              setFormData("app_id", 2);
              setTabActiveKey(key);
              scrollToEnd();
            }}
          >
            <TabPane
              tab={
                <span>
                  <i className="fa fa-upload" /> อัพโหลด
                </span>
              }
              key="1"
            >
              <UploadFile />
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i className="fa fa-sliders" /> พรีเซต
                </span>
              }
              key="2"
            >
              {presetIconList.map((dt) => {
                return (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setFormData("app_id", 2);
                      setStatesGeofencesRedux({
                        previewFileUpload: "",
                        // iconPreview: { isUrl: true, url: dt.url, base64Data: "", filedName: "" },
                        iconPreview: setPreviewIcon(true, dt.url),
                        iconMarker: dt.url,
                        iconGeofenceType: 2,
                      });
                      setFormData("icon_attach_id", dt.icon_attach_id);
                      setFormData("isNewAttach", false);
                    }}
                  >
                    <img
                      className="image-zoom"
                      style={{ width: 45, height: 45, padding: "5 5px" }}
                      src={dt.url}
                    />
                  </span>
                );
              })}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <i className="fa fa-cog" /> กำหนดเอง
                </span>
              }
              key="3"
            >
              <div className="flex-container-custom">
                <div>
                  <label className="label-title">
                    กำหนดรูปแบบ<span className="require">*</span> :
                    {validateSubmit.iconType.isErr && (
                      <span className="require">
                        {" "}
                        {validateSubmit.iconType.message}
                      </span>
                    )}
                  </label>
                  <br />
                  <div style={{ textAlign: "center" }}>
                    {images.shape.map((dt) => {
                      return (
                        <span
                          className="icon-shape"
                          onClick={async () => {
                            setFormData("app_id", 2);
                            setIsNewIcon(true);
                            setFileNameIconCustom(dt.name, iconIdFocus);
                            setStatesGeofencesRedux({ previewFileUpload: "" });
                            setShapeFocus(dt.name);
                            setUnionIcon("shape", dt.path, false, dt.name);
                            setColorType(1);
                          }}
                        >
                          <img
                            className="image-zoom"
                            style={{ width: 40, height: 40, padding: "5 5px" }}
                            src={dt.path}
                          />
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="label-title">
                    กำหนดไอคอน<span className="require">*</span> :
                    {validateSubmit.iconTemplate.isErr && (
                      <span className="require">
                        {" "}
                        {validateSubmit.iconTemplate.message}
                      </span>
                    )}
                  </label>
                  <br />
                  {images.icon.map((dt) => {
                    return (
                      <span
                        className="icon-sub"
                        onClick={() => {
                          setFormData("app_id", 2);
                          setIsNewIcon(true);
                          iconIdFocus = dt.id;
                          setFileNameIconCustom(shapeFocus, dt.id);
                          setStatesGeofencesRedux({ previewFileUpload: "" });
                          setUnionIcon("icon", dt.path, false, "", dt.id);
                          setColorType(2);
                        }}
                      >
                        <img
                          className="image-zoom"
                          style={{ width: 20, height: 20, padding: "5 5px" }}
                          src={dt.path}
                        />
                      </span>
                    );
                  })}
                </div>

                <div>
                  <label className="label-title">
                    เลือกสี :{" "}
                    <Radio.Group
                      onChange={(e) => {
                        setFormData("app_id", 2);
                        setColorType(e.target.value);
                      }}
                      value={colorType}
                    >
                      <Radio value={1}>
                        {" "}
                        <label className="label-title">รูปแบบ</label>
                      </Radio>
                      <Radio value={2}>
                        {" "}
                        <label className="label-title">ไอคอน</label>
                      </Radio>
                    </Radio.Group>
                  </label>

                  <TwitterPicker
                    color={colorType === 1 ? fillPreset.shape : fillPreset.icon}
                    triangle="hide"
                    // colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#FFFFFF']}
                    colors={[
                      "#f44336",
                      "#e91e63",
                      "#9c27b0",
                      "#673ab7",
                      "#3f51b5",
                      "#2196f3",
                      "#03a9f4",
                      "#00bcd4",
                      "#009688",
                      "#4caf50",
                      "#8bc34a",
                      "#cddc39",
                      "#ffeb3b",
                      "#ffc107",
                      "#ff9800",
                      "#ff5722",
                      "#795548",
                      "#607d8b",
                      "#000000",
                      "#FFFFFF",
                    ]}
                    onChangeComplete={(color) => {
                      // console.log(color)
                      // var aRgbHex = '1502BE'.match(/.{1,2}/g);
                      // let rgb = `rgb(${parseInt(aRgbHex[0], 16)},${parseInt(aRgbHex[1], 16)},${parseInt(aRgbHex[2], 16)})`
                      // console.log("rgb : ", rgb)
                      setFillShapeAndIconChange(color.hex);
                    }}
                  />
                </div>
              </div>
            </TabPane>
          </Tabs>
          {/* </div> */}
        </div>
      }
    </Suspense>
  );
};

const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  presetIconList: state.geofences.presetIconList,
  geofenceTypeList: state.geofences.geofenceTypeList,
  geomType: state.geofences.geomType,
  geomTypeList: state.geofences.geomTypeList,
  dataForm: state.geofences.dataForm,
  geofenceId: state.geofences.geofenceId,
  previewFileUpload: state.geofences.previewFileUpload,
  iconPreview: state.geofences.iconPreview,
  shapeDetail: state.geofences.shapeDetail,
  coordinatesText: state.geofences.coordinatesText,
  validateSubmit: state.geofences.validateSubmit,
  shapeEditCurrent: state.geofences.shapeEditCurrent,
});

const mapDispatchToProps = (dispatch) => ({
  setFormData: (filedName, value, isSubObject) =>
    dispatch(GeofencesActions.setFormData(filedName, value, isSubObject)),
  setFormDataEdit: (data) => dispatch(GeofencesActions.setFormDataEdit(data)),
  clearDataForm: () => dispatch(GeofencesActions.clearDataForm()),
  setStatesGeofencesRedux: (obj) =>
    dispatch(GeofencesActions.setStatesGeofencesRedux(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeofenceForm);
