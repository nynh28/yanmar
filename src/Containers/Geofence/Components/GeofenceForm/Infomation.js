import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Form from "react-jsonschema-form";
import { Row } from "reactstrap";
import { diff } from "json-diff";
import { get, has } from "lodash";

import { t } from "../../../../Components/Translation";
import SaveButton from "../../../../Components/SaveButton";
import CancelButton from "../../../../Components/CancelButton";

import { setSchema } from "./Form/setSchema.js";
import GeofenceData from "./Form/Fields/GeofenceData";
import MapDraw from "./MapDraw";

import GeofenceActions from "../../../../Redux/GeofenceRedux";

let _position = undefined
let _firstLoad = true

const Information = ({ onAlert, onSubmit, onCancel, location }) => {
  const fields = {
    geofenceData: GeofenceData,
  };

  const uiSchema = {
    GeofenceDetail: {
      geofenceData: {
        "ui:field": "geofenceData",
      },
    },
  };

  const dispatch = useDispatch()
  // const getDropdownPartnerName = () => dispatch(GeofenceActions.getDropdownPartnerName())
  const getDropdownGeofenceType = (id) => dispatch(GeofenceActions.getDropdownGeofenceType(id))
  const getIconByGeofenceType = (id) => dispatch(GeofenceActions.getIconByGeofenceType(id))
  const cleanData = () => dispatch(GeofenceActions.cleanData())

  const { language } = useSelector(state => state.versatile);
  const { profileUser } = useSelector(state => state.signin);
  const { loading, idSelected, geofence, geofenceTypeList, geomTypeNavList, attachInfoByGeofenceType, iconPresent, iconSourceRadio, partnerNameList } = useSelector(state => state.geofence)

  const [type, setType] = useState(null)
  const [paths, setPaths] = useState([])
  const [radius, setRadius] = useState(null)

  const [formData, setFormData] = useState({
    GeofenceDetail: {
      geofenceData: {
        partnerType: profileUser.partnerTypeName,
        partnerName: profileUser.partnerId + '',
        name: null,
        description: null,
        nameEn: null,
        descriptionEn: null,
        nameJa: null,
        descriptionJa: null,
        geofenceTypeNav: undefined,
        geofenceTypeNav_value: null,
        sourceTypeNav: null,
        isShare: true,
        isHazard: false,
        isActive: true,
        geomTypeNav: null,
        coordinates: [],
        iconPoint: null,
        radius: 0,
        iconAttachId: null,
        iconUrl: null,
        iconSource: 1,
        attachCode: null,
        attachInfo: {
          fileName: null,
          attachCode: null,
          fileUrl: null,
        },
        filesResponse: null,
        mode: null,
        chooseAttachIcon: {
          name: null,
          attachCode: null,
          attachUrl: null,
        },
      },
    },
  })

  useEffect(() => {
    // let params = get(props, 'location.search').substr(1)
    if (location && _firstLoad) {
      let params = location.substr(1)
      try {
        let { lat, lng } = JSON.parse(atob(params))
        // // _formData.GeofenceDetail.geofenceData.radius = 123
        _position = { lat, lng }
        let _formData = JSON.parse(JSON.stringify(formData))
        _formData.GeofenceDetail.geofenceData.geofenceTypeNav = undefined
        _formData.GeofenceDetail.geofenceData.coordinates = `${lat}, ${lng}`
        _formData.GeofenceDetail.geofenceData.geomTypeNav = "1"

        setFormData(_formData)
        setType("circle")
        setRadius(0)
        setPaths([{ lat, lng }])
      }
      catch (err) { }
    } else if (!location) _position = undefined
    _firstLoad = false
  })

  const formatText = (e) => {
    let data = "";
    if (typeof e == "object") {

      for (let i = 0; i <= e.length - 1; i++) {
        if (e.length == 1) {
          data += e[i].lat + ", " + e[i].lng;
        }
        else {
          if (i == 0) {
            data += e[i].lat + ", " + e[i].lng;
          }
          else {
            data += "\n" + e[i].lat + ", " + e[i].lng;
          }
        }
      }
    }
    return data;
  }

  const validate = (e) => {
    console.log(e);
    let data = [];
    let length = e.split("\n").length - 1;
    let coordinate = e.split("\n");
    if (length !== data.length) {
      for (let i = 0; i <= length; i++) {
        if (coordinate[i].split(",")[0] != "" && coordinate[i].split(",")[1] != "") {
          data.push({
            lat: parseFloat(coordinate[i].split(",")[0]),
            lng: parseFloat(coordinate[i].split(",")[1]),
          });
        }
      }
      return data;
    }
    else {
      if (coordinate[0].split(",")[0] != "" && coordinate[0].split(",")[1] != "") {
        data.push({
          lat: parseFloat(coordinate[0].split(",")[0]),
          lng: parseFloat(coordinate[0].split(",")[1]),
        });
      }
      return data;
    }
  }

  const bindingData = (fieldName, value) => {
    console.log('fieldName:', fieldName)
    console.log('value:', value)
    let form = JSON.parse(JSON.stringify(formData));
    form.GeofenceDetail.geofenceData[fieldName] = value;
    setFormData((prevState) => {
      return {
        GeofenceDetail: {
          geofenceData: {
            ...prevState.GeofenceDetail.geofenceData,
            [fieldName]: value
          }
        }
      }
    })
  }

  const onFormChange = (v) => {
    if (v.formData.GeofenceDetail.geofenceData.mode == 'key') {
      let data = validate(
        v.formData.GeofenceDetail.geofenceData.coordinates
      );
      if (v.formData.GeofenceDetail.geofenceData.type == "3") {
        if (data[data.length - data.length].lat !== data[data.length - 1].lat && data[data.length - data.length].lng !== data[data.length - 1].lng) {
          data.push({
            lat: parseFloat(data[data.length - data.length].lat),
            lng: parseFloat(data[data.length - data.length].lng),
          });
        }
        if (data.length >= 4) {
          let form = JSON.parse(JSON.stringify(formData));
          form.GeofenceDetail.geofenceData.coordinates = v.formData.GeofenceDetail.geofenceData.coordinates;
          form.GeofenceDetail.geofenceData.geomTypeNav = "3";
          form.GeofenceDetail.geofenceData.radius = 0;
          setFormData((prevState) => {
            return {
              GeofenceDetail: {
                geofenceData: {
                  ...prevState.GeofenceDetail.geofenceData,
                  geomTypeNav: "3",
                  coordinates: v.formData.GeofenceDetail.geofenceData.coordinates,
                  radius: 0,
                }
              }
            }
          })
          setPaths(data)
          setRadius(0)
          setType('polygon')
        }
      }

      if (v.formData.GeofenceDetail.geofenceData.type == "2") {
        if (data.length >= 2) {
          let form = JSON.parse(JSON.stringify(formData));
          form.GeofenceDetail.geofenceData.coordinates = v.formData.GeofenceDetail.geofenceData.coordinates;
          form.GeofenceDetail.geofenceData.geomTypeNav = "2";
          form.GeofenceDetail.geofenceData.radius = 0;
          setFormData((prevState) => {
            return {
              GeofenceDetail: {
                geofenceData: {
                  ...prevState.GeofenceDetail.geofenceData,
                  geomTypeNav: "2",
                  coordinates: v.formData.GeofenceDetail.geofenceData.coordinates,
                  radius: 0,
                }
              }
            }
          })
          setPaths(data)
          setRadius(0)
          setType('polyline')
        }
        else {
        }
      }

      if (v.formData.GeofenceDetail.geofenceData.type == "1") {
        console.log('circle')
        if (data.length == 1) {
          let form = JSON.parse(JSON.stringify(formData));
          let radius = Number(v.formData.GeofenceDetail.geofenceData.radius);
          form.GeofenceDetail.geofenceData.geomTypeNav = "1";
          form.GeofenceDetail.geofenceData.coordinates = v.formData.GeofenceDetail.geofenceData.coordinates;
          form.GeofenceDetail.geofenceData.radius = radius;
          setFormData((prevState) => {
            return {
              GeofenceDetail: {
                geofenceData: {
                  ...prevState.GeofenceDetail.geofenceData,
                  geomTypeNav: "1",
                  coordinates: v.formData.GeofenceDetail.geofenceData.coordinates,
                  radius: radius,
                }
              }
            }
          })
          setPaths(data)
          setRadius(radius)
          setType('circle')
        }
      }
      else {
        let diffValue = get(
          diff(formData, v.formData),
          "GeofenceDetail.geofenceData",
          undefined
        );
        if (diffValue === undefined) return;

        let objects = Object.getOwnPropertyNames(diffValue);
        for (let index in objects) {
          if (objects[index] !== "partnerType__added" && objects[index] !== "type__added" && objects[index].split("__deleted").length == 0) {
            bindingData("" + objects[index], diffValue["" + objects[index]]["__new"]);
          }
        }
      }
    }
    else {
      let diffValue = get(
        diff(formData, v.formData),
        "GeofenceDetail.geofenceData",
        undefined
      );
      if (diffValue === undefined) return;

      let objects = Object.getOwnPropertyNames(diffValue);
      for (let index in objects) {
        let form = JSON.parse(JSON.stringify(formData))
        if ("" + objects[index] === "chooseAttachIcon") {
          form.GeofenceDetail.geofenceData.chooseAttachIcon.name = diffValue[objects[index] + ''].name['__new']
          form.GeofenceDetail.geofenceData.chooseAttachIcon.attachCode = diffValue[objects[index] + ''].attachCode['__new']
          form.GeofenceDetail.geofenceData.chooseAttachIcon.attachUrl = diffValue[objects[index] + ''].attachUrl['__new']
          setFormData((prevState) => {
            return {
              GeofenceDetail: {
                geofenceData: {
                  ...prevState.GeofenceDetail.geofenceData,
                  chooseAttachIcon: {
                    name: diffValue[objects[index] + ''].name['__new'],
                    attachCode: diffValue[objects[index] + ''].attachCode['__new'],
                    attachUrl: diffValue[objects[index] + ''].attachUrl['__new']
                  }
                }
              }
            }
          })
        }
        else if ("" + objects[index] === "attachInfo") {
          form.GeofenceDetail.geofenceData.attachInfo.fileName = diffValue[objects[index] + ''].fileName && diffValue[objects[index] + ''].fileName['__new']
          form.GeofenceDetail.geofenceData.attachInfo.fileUrl = diffValue[objects[index] + ''].fileUrl && diffValue[objects[index] + ''].fileUrl['__new']
          form.GeofenceDetail.geofenceData.attachInfo.attachCode = diffValue[objects[index] + ''].attachCode && diffValue[objects[index] + ''].attachCode['__new']
          setFormData((prevState) => {
            return {
              GeofenceDetail: {
                geofenceData: {
                  ...prevState.GeofenceDetail.geofenceData,
                  attachInfo: {
                    fileName: diffValue[objects[index] + ''].fileName && diffValue[objects[index] + ''].fileName['__new'],
                    fileUrl: diffValue[objects[index] + ''].fileUrl && diffValue[objects[index] + ''].fileUrl['__new'],
                    attachCode: diffValue[objects[index] + ''].attachCode && diffValue[objects[index] + ''].attachCode['__new']
                  }
                }
              }
            }
          })
        }
        else if (objects[index] === "geofenceTypeNav") {
          if (diffValue["" + objects[index]]["__new"] == undefined && diffValue["" + objects[index]]["__new"] == '') {
            getIconByGeofenceType(parseInt(diffValue["" + objects[index]]["__new"]))
          }
          form.GeofenceDetail.geofenceData.geofenceTypeNav = diffValue["" + objects[index]]["__new"]
          setFormData((prevState) => {
            return {
              GeofenceDetail: {
                geofenceData: {
                  ...prevState.GeofenceDetail.geofenceData,
                  geofenceTypeNav: diffValue["" + objects[index]]["__new"]
                }
              }
            }
          })
        }
        else if (objects[index] === "partnerName") {
          getDropdownGeofenceType(parseInt(diffValue["" + objects[index]]["__new"]))
          form.GeofenceDetail.geofenceData.partnerName = diffValue["" + objects[index]]["__new"]
          form.GeofenceDetail.geofenceData.geofenceTypeNav = ""
          setFormData((prevState) => {
            return {
              GeofenceDetail: {
                geofenceData: {
                  ...prevState.GeofenceDetail.geofenceData,
                  partnerName: diffValue["" + objects[index]]["__new"],
                  geofenceTypeNav: undefined
                }
              }
            }
          })
        }
        else if (objects[index] !== "partnerType__added" && objects[index] !== "type__added" && objects[index] !== "partnerName__added" && diffValue["" + objects[index]]) {
          console.log('objects[index]:', objects[index])
          console.log('diffValue["" + objects[index]]:', diffValue["" + objects[index]])
          bindingData("" + objects[index], diffValue["" + objects[index]]["__new"]);
        }
      }
    }
  }

  const getPaths = (polygon, type) => {
    let data = JSON.parse(JSON.stringify(formData));
    let getPath = polygon.getPath().getArray();
    // paths.length = [];
    let paths = []
    getPath.forEach((i) => paths.push({ lat: i.lat(), lng: i.lng() }));
    let textPaths = formatText(paths)
    data.GeofenceDetail.geofenceData.coordinates = textPaths;
    data.GeofenceDetail.geofenceData.radius = 0;
    data.GeofenceDetail.geofenceData.geomTypeNav = type == "polygon" ? "3" : "2";
    setFormData(data)
    setPaths((prevState) => {
      return [...paths]
    })
    setType(type)
  }

  const getPathsPoint = (circle, edit) => {
    var getCenter = circle.getCenter();
    console.log(circle.radius);
    console.log(circle.getRadius());
    var getRadius = parseInt(circle.getRadius());
    if (edit == "add") {
      console.log('add Circle')
      let data = JSON.parse(JSON.stringify(formData));
      let paths = []
      paths.push({ lat: getCenter.lat(), lng: getCenter.lng() });
      let textCircle = formatText(paths)
      data.GeofenceDetail.geofenceData.radius = getRadius;
      data.GeofenceDetail.geofenceData.coordinates = textCircle;
      data.GeofenceDetail.geofenceData.geomTypeNav = "1";
      setFormData((prevState) => {
        return {
          GeofenceDetail: {
            geofenceData: {
              ...prevState.GeofenceDetail.geofenceData,
              radius: getRadius,
              coordinates: textCircle,
              geomTypeNav: "1"
            }
          }
        }
      })
      setPaths((prevState) => {
        return paths
      })
      setRadius(getRadius)
      setType('circle')
    }
    else if (
      (edit == "center" && paths.length != 0) && (paths[0].lat != getCenter.lat() || paths[0].lng != getCenter.lng())
    ) {
      console.log('center:', { lat: getCenter.lat(), lng: getCenter.lng() })
      console.log('radius:', getRadius)
      console.log('Previous Center:', formData)
      let data = JSON.parse(JSON.stringify(formData));
      console.log('Edit Center:', data)
      let textCircle = formatText(paths)
      data.GeofenceDetail.geofenceData.coordinates = textCircle;
      data.GeofenceDetail.geofenceData.geomTypeNav = "1";
      setFormData((prevState) => {
        return {
          GeofenceDetail: {
            geofenceData: {
              ...prevState.GeofenceDetail.geofenceData,
              coordinates: textCircle,
              geomTypeNav: "1"
            }
          }
        }
      })
      setPaths((prevState) => {
        return [{ lat: getCenter.lat(), lng: getCenter.lng() }]
      })
      setRadius(getRadius)
    }
    else if (
      (edit == "radius" && paths.length != 0) && getRadius != 0 && radius != getRadius
    ) {
      let data = JSON.parse(JSON.stringify(formData));
      console.log('Edit Radius:', data);
      console.log('Edit Radius:', getRadius);
      data.GeofenceDetail.geofenceData.radius = getRadius;
      data.GeofenceDetail.geofenceData.geomTypeNav = "1";
      setFormData((prevState) => {
        return {
          GeofenceDetail: {
            geofenceData: {
              ...prevState.GeofenceDetail.geofenceData,
              radius: getRadius,
              geomTypeNav: "1"
            }
          }
        }
      })
      setRadius(getRadius)
    }
  }

  const require = (formData, errors) => {
    console.log(formData)
    if (formData.GeofenceDetail.geofenceData.geofenceTypeNav == '' || formData.GeofenceDetail.geofenceData.geofenceTypeNav == undefined) {
      let msg = language == 'th' ? 'โปรดเลือกประเภทจีโอเฟนช์' : 'Please select Group Type'
      onAlert(true, 2, msg, 400, false)
      window.scrollTo(0, 200)
    }
    return errors;
  }

  useEffect(() => {
    console.log('paths:', paths)
  }, [paths])

  useEffect(() => {
    if (geofence) {
      let data = formData.GeofenceDetail.geofenceData;
      data.name = get(geofence, "name", "");
      data.description = get(geofence, "description", "");
      data.nameEn = get(geofence, "nameEn", "");
      data.descriptionEn = get(geofence, "descriptionEn", "");
      data.nameJa = get(geofence, "nameJa", "");
      data.descriptionJa = get(geofence, "descriptionJa", "");
      data.geofenceTypeNav = get(geofence, "geofenceTypeNav.key", "") + "";
      data.isShare = get(geofence, "isShare", "");
      data.isHazard = get(geofence, "isHazard", "");
      data.isActive = get(geofence, "isActive", "");
      data.geomTypeNav = get(geofence, "geomTypeNav.key", "") + "";
      data.coordinates = formatText(get(geofence, "coordinates", ""));
      data.iconSource = get(geofence, "iconSourceNav.key", "");
      data.radius = parseInt(get(geofence, "radius", "0"));
      data.iconPoint = get(geofence, "iconPoint", "");
      data.attachCode = get(geofence, "attachInfo.attachCode", "");
      data.attachInfo = get(geofence, "attachInfo", "");
      data.iconAttachId = get(geofence, "iconAttachId", "");
      data.iconUrl = get(geofence, "iconUrl", "");
      data.filesResponse = get(geofence, "filesResponse", "");
      // getDropdownPartnerName();
      setFormData((prevState) => {
        return {
          GeofenceDetail: {
            geofenceData: {
              ...prevState.GeofenceDetail.geofenceData,
              partnerType: get(geofence, "partnerTypeNav.value", undefined),
              partnerName: get(geofence, "partnerNav.key", null) + "",
              name: get(geofence, "name", null),
              description: get(geofence, "description", null),
              nameEn: get(geofence, "nameEn", null),
              descriptionEn: get(geofence, "descriptionEn", null),
              nameJa: get(geofence, "nameJa", null),
              descriptionJa: get(geofence, "descriptionJa", null),
              geofenceTypeNav: geofence.geofenceTypeNav.key ? geofence.geofenceTypeNav.key + "" : undefined,
              isShare: get(geofence, "isShare", null),
              isHazard: get(geofence, "isHazard", null),
              isActive: get(geofence, "isActive", null),
              geomTypeNav: geofence.geomTypeNav.key ? geofence.geomTypeNav.key + "" : undefined,
              coordinates: formatText(get(geofence, "coordinates", null)),
              iconPoint: get(geofence, "iconPoint", null),
              radius: parseInt(get(geofence, "radius", 0)),
              iconAttachId: get(geofence, "iconAttachId", null),
              iconUrl: get(geofence, "iconUrl", null),
              iconSource: get(geofence, "iconSourceNav.key", null),
              attachCode: get(geofence, "attachInfo.attachCode", null),
              attachInfo: get(geofence, "attachInfo", {
                fileName: null,
                attachCode: null,
                fileUrl: null,
              }),
              filesResponse: get(geofence, "filesResponse", null),
            }
          }
        }
      })
      switch (get(geofence, "geomTypeNav.key", "")) {
        case 1:
          setPaths(get(geofence, "coordinates", ""))
          setRadius(parseInt(get(geofence, "radius", "")))
          setType('circle')
          break;
        case 2:
          setPaths(get(geofence, "coordinates", ""))
          setType('polyline')
          break;
        case 3:
          setPaths(get(geofence, "coordinates", ""))
          setType('polygon')
          break;
      }
    }
    return cleanData
  }, [geofence])

  return (
    <Form
      className="title-form"
      id={"form_user"}
      schema={setSchema(geofenceTypeList, geomTypeNavList, partnerNameList, iconSourceRadio, iconPresent, attachInfoByGeofenceType)}
      uiSchema={uiSchema}
      fields={fields}
      formData={formData}
      onChange={v => onFormChange(v)}
      onSubmit={v => onSubmit(formData, paths)}
      validate={require}
    >
      <Row>
        <MapDraw
          form={true}
          showIcon={formData.GeofenceDetail.geofenceData.coordinates && formData.GeofenceDetail.geofenceData.coordinates != ' '}
          position={_position}
          geoType={type}
          paths={paths}
          radius={radius}
          iconUrl={null}
          iconPoint={paths[0]}
          mapElement={<div style={{ height: `100%` }} />}
          getPaths={(paths, type) => getPaths(paths, type)}
          getPathsPoint={(circle, edit) => getPathsPoint(circle, edit)}
          type={type}
          onChange={(type, overlay, edit) => type == "polygon"
            ? getPaths(overlay, type)
            : type == "polyline"
              ? getPaths(overlay, type) : type == "circle"
              && getPathsPoint(overlay, edit)}
        >

        </MapDraw>
      </Row>
      <div className="hr-line-dashed" />
      <div className="row" style={{ textAlign: "right" }}>
        <CancelButton name={t("geofence_31")} loading={false} onClick={onCancel} />
        <SaveButton form="form_user" name={t("geofence_32")} loading={loading} />
      </div>
    </Form>
  )
}

export default Information
