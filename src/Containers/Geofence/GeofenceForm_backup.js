/* eslint-disable default-case */
/* eslint-disable no-duplicate-case */
import React, { Component } from "react";
import { connect } from "react-redux";
import GeofenceActions from "../../Redux/GeofenceRedux";
// import FormValidateActions from '../../Redux/FormValidateRedux'

import Form from "react-jsonschema-form";
import { setSchema } from "./Form/setSchema.js";
import GeofenceData from "./Form/Fields/GeofenceData";
import SelectWidget from "../../Components/FormGenerator/widgets/SelectWidget";
import { Col, Row, Button, Input } from "reactstrap";
import { diff } from "json-diff";
import { get, has } from "lodash";

import PannelBox from "../../Components/PannelBox";

// import FormGenerator from "../../Components/FormGenerator/Form";
// import { formValidation } from "../../Components/FormGenerator/validate";
// import { resetForm } from "../../Components/FormGenerator/resetForm";
import MapDraw from "./MapDraw";

import Alert from "../../Components/Alert";
import { t, v, v_em } from "../../Components/Translation";

import SaveButton from "../../Components/SaveButton";
import CancelButton from "../../Components/CancelButton";
// import forEach from "lodash/forEach";

export const fields = {
  geofenceData: GeofenceData,
};

export const uiSchema = {
  GeofenceDetail: {
    geofenceData: {
      "ui:field": "geofenceData",
    },
  },
};

class GeofenceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: true,
      titleFormType: "",
      loading: false,
      select: [],
      datas: [],
      type: "",
      coordinates: [{ lat: 0, lng: 0 }],
      radius: 0,
      alert: {
        confirm: null,
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0,
        validateCode: true
      },
      centerDefualt: {
        lat: 13.786377,
        lng: 100.608755
      },
      zoomDefualt: 6,
      centers: [{ lat: 0, lng: 0 }],
      oldRadius: null,
      // iconUrl: null,
      // iconPoint: {lat:null, lng:null},
      // geofenceTypeNav: "",
      // geofenceTypeNav_value: "",
      geomTypeNav: "",
      // geomTypeNav_value: "",
      formData: {
        GeofenceDetail: {
          geofenceData: {
            partnerType: this.props.profileUser.partnerTypeName,
            // partnerType_value: this.props.profileUser.partnerType,
            partnerName: this.props.profileUser.partnerId + '',
            partnerName_value: "",
            // geofenceName: "",
            // geofenceDescription: "",
            name: "",
            description: "",
            nameEn: "",
            descriptionEn: "",
            nameJa: "",
            descriptionJa: "",
            geofenceTypeNav: undefined,
            geofenceTypeNav_value: "",
            sourceTypeNav: "",
            isShare: true,
            isHazard: false,
            isActive: true,
            geomTypeNav: undefined,
            // geomTypeNav_value: "",
            coordinates: [],
            iconPoint: "",
            radius: 0,
            iconAttachId: "",
            iconUrl: null,
            iconSource: 1,
            attachCode: "",
            attachInfo: {
              fileName: "",
              attachCode: "",
              fileUrl: "",
            },
            filesResponse: "",
            mode: "",
            chooseAttachIcon: {
              name: "",
              attachCode: "",
              attachUrl: "",
            },
          },
        },
      },
      iconSourceRadio: [{ key: 'Geofence Type', value: '1' }, { key: 'Present', value: '2' }, { key: 'Custom', value: '3' }],
      iconPresentRadio: [{ attachCode: '', attachUrl: '', name: '' }],
      attachInfoByGeofenceType: { attachCode: "", fileName: "", fileUrl: null },
      partnerNameList: [],
      geomTypeNavList: [],
      geofenceTypeNavList: [],
    };
    this.getPathsPoint = this.getPathsPoint.bind(this);
    this.getPathsPolygon = this.getPathsPolygon.bind(this);
    this.getPathsPolyline = this.getPathsPolyline.bind(this);
    this.require = this.require.bind(this)
  }

  componentDidMount() {
    // this.props.getGeofenceType()
    // console.log("ID SELECTED : " + this.props.id);
    window.scrollTo(0, 0);
    // console.log(this.state.formData);
    // console.log(this.props.geofenceType)
    // this.props.getGeomType()
    if (this.props.typeForm == null) {
      // console.log("idselected not null");
      this.props.setData("add", {});
      // this.props.infoVehicle(this.props.idSelected)
      this.setState({ titleFormType: "Add" })
    }

    if (this.props.id != null) {
      // console.log("idselected not null");
      this.props.getGeofence(this.props.id);
      // this.props.infoVehicle(this.props.idSelected)
      // this.state.formData.GeofenceTypeDetail.geofenceTypeData = this.props.geofenceType
      // this.props.getGeofenceType(this.props.)
      // this.onFormChange()
      this.setAlert(true, 5)
      this.setState({ titleFormType: "Edit" });
    } else {
      // console.log("idselected is null");
      this.props.getDropdownPartnerName();
      this.props.getDropdownGeofenceType(parseInt(this.props.profileUser.partnerId))
      this.setState({ titleFormType: "Add" });
    }
  }

  componentWillUnmount() {
    this.props.setData(null);
    this.props.idSelected(null, null);
    this.setState({
      formData: {
        GeofenceDetail: {
          geofenceData: {
            partnerType: "",
            partnerName: "",
            partnerName_value: "",
            // geofenceName: "",
            // geofenceDescription: "",
            name: "",
            description: "",
            nameEn: "",
            descriptionEn: "",
            nameJa: "",
            descriptionJa: "",
            geofenceTypeNav: undefined,

            // sourceTypeNav: "",
            isShare: true,
            isHazard: false,
            isActive: true,
            geomTypeNav: undefined,
            coordinates: [],
            iconPoint: "",
            radius: 0,
            iconSource: 1,
            chooseAttachIcon: { name: "", attachUrl: "", attachCode: "" },
            attachCode: "",
            filesResponse: "",
            attachIconByGeofence: { attachCode: "", fileName: "", fileUrl: "" },
          },
        },
      },
      typeForm: null,
    });
    // console.log(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    let { geofence } = this.props;
    // console.log(this.state.formData);
    // console.log(this.props);
    // console.log(this.props.geofence)
    // console.log(this.prevProps)
    // console.log(this.prevState)
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm === null) {
        // this.props.history.push("geofence");
      }
    }

    if (this.props.isGeofence) {
      // console.log(this.props.geofence)
      if (prevProps.geofence !== geofence) {
        const { formData } = JSON.parse(JSON.stringify(this.state));

        // this.state.formData.GeofenceTypeDetail.geofenceTypeData = this.props.geofenceType
        // console.log(this.state.formData.GeofenceDetail.geofenceData);
        // console.log(geofence);

        let _formData = formData.GeofenceDetail.geofenceData;
        _formData.partnerType = get(geofence, "partnerTypeNav.value", "");
        _formData.partnerName = get(geofence, "partnerNav.key", "") + "";
        // _formData.geofenceName = get(geofence, "geofenceName", "");
        // _formData.geofenceDescription = get(geofence,"geofenceDescription", "");
        _formData.name = get(geofence, "name", "");
        _formData.description = get(geofence, "description", "");
        _formData.nameEn = get(geofence, "nameEn", "");
        _formData.descriptionEn = get(geofence, "descriptionEn", "");
        _formData.nameJa = get(geofence, "nameJa", "");
        _formData.descriptionJa = get(geofence, "descriptionJa", "");
        _formData.geofenceTypeNav = get(geofence, "geofenceTypeNav.key", "") + "";
        // _formData.geofenceTypeNav_value = get(geofence, 'geofenceTypeNav.key', '')
        // _formData.partnerName = get(geofence, "partnerName.key", "");
        // _formData.partnerName_value = get(geofence, 'partnerName.key', '')
        _formData.isShare = get(geofence, "isShare", "");
        _formData.isHazard = get(geofence, "isHazard", "");
        _formData.isActive = get(geofence, "isActive", "");
        _formData.geomTypeNav = get(geofence, "geomTypeNav.key", "") + "";
        // _formData.geomTypeNav_value = get(geofence, 'geomTypeNav.key', '')
        // _formData.coordinates = JSON.stringify(get(geofence, 'coordinates', ''))
        _formData.coordinates = this.formatText(
          get(geofence, "coordinates", "")
        );
        _formData.iconSource = get(geofence, "iconSourceNav.key", "");
        _formData.radius = parseInt(get(geofence, "radius", "0"));
        _formData.iconPoint = get(geofence, "iconPoint", "");
        _formData.attachCode = get(geofence, "attachInfo.attachCode", "");
        _formData.attachInfo = get(geofence, "attachInfo", "");
        _formData.iconAttachId = get(geofence, "iconAttachId", "");
        _formData.iconUrl = get(geofence, "iconUrl", "");
        _formData.filesResponse = get(geofence, "filesResponse", "");

        this.props.getDropdownPartnerName();
        // this.setState({formData: this.props.geofence})

        formData.GeofenceDetail.geofenceData = _formData;
        switch (get(geofence, "geomTypeNav.key", "")) {
          case 1:
            this.setState({
              formData: formData,
              centers: get(geofence, "coordinates", ""),
              radius: parseInt(get(geofence, "radius", "")),
              type: "circle",
              mode: "edit",
            });
            break;
          case 2:
            this.setState({
              formData: formData,
              polyline: get(geofence, "coordinates", ""),
              type: "polyline",
              mode: "edit",
            });
            break;
          case 3:
            this.setState({
              formData: formData,
              polygon: get(geofence, "coordinates", ""),
              type: "polygon",
              mode: "edit",
            });
            break;
        }


        // console.log(this.state.formData);
      }
    }

    if (prevProps.statusSubmit !== this.props.statusSubmit) {

      // console.log(this.setAlert(true, 3))
      // console.log(this.props.statusSubmit)
      let { alert } = this.state
      alert.show = true
      alert.type = this.props.statusSubmit.status ? 1 : 2
      alert.content = this.props.statusSubmit.status ? this.state.titleFormType == 'Add' ? "geofence_33" : this.state.titleFormType == 'Edit' && "geofence_34" : this.state.titleFormType + " Geofence Failed"
      // alert.content = this.props.statusSubmit.status ? this.state.titleFormType + " Geofence Successed" : this.state.titleFormType + " Geofence Failed"
      alert.ErrorSubcode = this.props.statusSubmit.ErrorSubcode
      this.setState({ alert }, () => {
        // console.log(this.state.alert)
      })
    }
    // console.log(this.props.geofenceTypeNav)
    // console.log(prevProps.geofenceTypeNav)
    // console.log(this.props.geomTypeNav)
    // console.log(prevProps.geomTypeNav)
    // prevProps.geofenceType !== this.props.geofenceTypeNav && console.log(this.props.geofenceType)
    prevProps.partnerName !== this.props.partnerName && this.setState({ partnerNameList: this.props.partnerName })
    if (prevProps.geofenceTypeNavList !== this.props.geofenceTypeNavList) {
      // this.props.getIconByGeofenceType(parseInt(this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav))
      this.setAlert(false, 5)
      // let { formData } = JSON.parse(JSON.stringify(this.state))
      // formData.GeofenceDetail.geofenceData.geofenceTypeNav = null
      // this.setState({formData})
      this.setState({ geofenceTypeNavList: this.props.geofenceTypeNavList })
    }
    if (prevProps.geomTypeNavList !== this.props.geomTypeNavList) {
      // console.log(this.props.geomTypeNavList)
      this.setState({ geomTypeNavList: this.props.geomTypeNavList })
      this.props.getPresentIcon()
    };

    // prevProps.iconPresent !== this.props.iconPresent && this.setState({iconPresentRadio: this.props.iconPresent})

    if (prevProps.attachInfoByGeofenceType !== this.props.attachInfoByGeofenceType) {
      // console.log(this.props.attachInfoByGeofenceType)
      this.setAlert(false, 5)
      this.setState({
        attachInfoByGeofenceType: this.props.attachInfoByGeofenceType
        // }, () => console.log(this.state.attachInfoByGeofenceType))
      })
    }
    prevProps.iconPresent !== this.props.iconPresent && this.setState({ iconPresentRadio: this.props.iconPresent })

    if (prevProps.iconSourceData !== this.props.iconSourceData) {
      let iconSource = JSON.parse(JSON.stringify(this.props.iconSourceData))
      if (this.props.history.location.pathname == "/geofenceTypeForm") {
        // iconSource.findIndex(v => v)
        iconSource.shift()

      }
      // console.log(iconSource)
      // this.setState({iconSourceValue: iconSource.map(e => e.key), iconSourceName: iconSource.map(e => e.value)})
      this.setState({ iconSourceRadio: iconSource })
    }
    // setTimeout(function(){ this.forceUpdate() }.bind(this), 1500);
    // prevProps.geofenceType !== this.props.geofenceType && this.setState({geofenceTypeNav: this.renameKey(this.props.geofenceTypeNav)})
    // prevProps.geomTypeNav !== this.props.geomTypeNav && this.setState({geomTypeNav: this.renameKey(this.props.geomTypeNav)})

    // if (this.props.geofenceTypeNav.length !== this.state.geofenceTypeNav.length) {
    //   console.log(this.state.geofenceTypeNav)
    //   // this.state.formInfo.fieldRow[1].properties.geofenceType.selectOption = this.props.geofenceType
    //   this.setState({geofenceTypeNav: this.renameKey(this.props.geofenceTypeNav)})
    //   // this.setState({ geofenceTypeNav: this.props.geofenceTypeNav })
    // }

    // if (this.props.geomTypeNav.length !== this.state.geomTypeNav.length) {
    //   console.log(this.state.geomTypeNav)
    //   // this.state.formInfo.fieldRow[1].properties.geofenceType.selectOption = this.props.geofenceType
    //   this.setState({geomTypeNav: this.renameKey(this.props.geomTypeNav)})
    //   // this.setState({ geomTypeNav: this.props.geomTypeNav })
    // }
    // console.log(this.state.formData)
  }

  componentWillMount() {
    // console.log("_____componentWillMount______");
  }

  // getOwnPropertyNames = oject => {
  //   return Object.getOwnPropertyNames(JSON.parse(JSON.stringify(oject)))
  // }

  setBindingFormData(data, objectsName, fieldList) {
    let formBasic = Object.getOwnPropertyNames(
      this.state.formData.GeofenceDetail.geofenceData
    );
    for (let index in fieldList) {
      let found = formBasic.find((x) => x === fieldList[index]);
      found !== undefined &&
        this.bindingData(fieldList[index], data[objectsName][fieldList[index]]);
    }
  }

  renameKey(data) {
    let result = [];
    for (let index in data)
      result.push({ label: data[index].value, value: data[index].key });
    return result;
  }

  formatText(e) {
    let data = "";
    if (typeof e == "object") {
      // console.log(e);

      for (let i = 0; i <= e.length - 1; i++) {
        if (e.length == 1) {
          // console.log(e[i].lat);
          data += e[i].lat + ", " + e[i].lng;
        } else {
          if (i == 0) {
            // console.log(e[i].lat);
            data += e[i].lat + ", " + e[i].lng;
          } else {
            // console.log(e[i].lat);
            data += "\n" + e[i].lat + ", " + e[i].lng;
          }
        }
      }
      // console.log(data);
    }
    return data;
  }

  validate(e) {
    console.log(e);
    let data = [];
    let length = e.split("\n").length - 1;
    let coordinate = e.split("\n");
    // let latlng = e.split(',')
    // let index = Math.floor(textSplit.length / 2)-1
    // console.log(length);
    // console.log(length%2)
    // console.log(index)
    // console.log(index*2)
    // console.log(textSplit)
    // if(length%2 == 0){
    if (length !== data.length) {
      for (let i = 0; i <= length; i++) {
        // console.log(i);
        // console.log(coordinate);
        // console.log(coordinate[i]);

        // console.log((i*2)+1)
        if (coordinate[i].split(",")[0] != "" && coordinate[i].split(",")[1] != "") {
          data.push({
            lat: parseFloat(coordinate[i].split(",")[0]),
            lng: parseFloat(coordinate[i].split(",")[1]),
          });
        }
      }
      // console.log(data);
      return data;
    }
    else {
      // console.log(coordinate);
      // console.log(coordinate[0]);
      if (coordinate[0].split(",")[0] != "" && coordinate[0].split(",")[1] != "") {
        data.push({
          lat: parseFloat(coordinate[0].split(",")[0]),
          lng: parseFloat(coordinate[0].split(",")[1]),
        });
      }
      // data.push({lat: parseFloat(textSplit[0]), lng: parseFloat(textSplit[1])})
      // console.log(data);
      return data;
    }
    // }
    // else{
    //   console.log('wrong format')
    //   return null
    // }
    // for(let i=0; 0<=)
  }

  require(formData, errors) {
    console.log(formData)
    // console.log(this.props)
    if (formData.GeofenceDetail.geofenceData.geofenceTypeNav == '' || formData.GeofenceDetail.geofenceData.geofenceTypeNav == undefined) {
      let msg = this.props.language == 'th' ? 'โปรดเลือกประเภทจีโอเฟนช์' : 'Please select Group Type'
      // errors.GeofenceDetail.geofenceData.geofenceTypeNav.addError('โปรดเลือกประเภทจีโอเฟนช์')
      this.setAlert(true, 2, msg, 400, false)
      // console.log(this.props.refGeofenceType.current.offsetBottom)
      // document.getElementById("geofenceTypeNav").scrollIntoView()
      window.scrollTo(0, 200)
      this.setState({ loading: false });
      // errors.pass2.addError("Passwords don't match");
    }
    return errors;
  }

  // ErrorListTemplate(props) {
  //   const { errors } = props;
  //   console.log(errors)
  //   return (
  //     <div>
  //       <h2>Custom error list</h2>
  //       <ul>
  //         {errors.map(error => (
  //             <li key={error.stack}>
  //               {error.stack}
  //             </li>
  //           ))}
  //       </ul>
  //     </div>
  //   );
  // }

  onFormChange(v) {
    // console.log(v);
    // console.log(this.state.formData)

    // this.keyPress(v)

    // let data = this.validate(
    //   v.formData.GeofenceDetail.geofenceData.coordinates
    // );
    // console.log(data);

    if (v.formData.GeofenceDetail.geofenceData.mode == 'key') {
      let data = this.validate(
        v.formData.GeofenceDetail.geofenceData.coordinates
      );
      // console.log(data);
      if (v.formData.GeofenceDetail.geofenceData.type == "3") {
        if (data[data.length - data.length].lat !== data[data.length - 1].lat && data[data.length - data.length].lng !== data[data.length - 1].lng) {
          data.push({
            lat: parseFloat(data[data.length - data.length].lat),
            lng: parseFloat(data[data.length - data.length].lng),
          });
        }
        //   console.log(v)
        //   if(typeof v.formData.GeofenceDetail.geofenceData.coordinates == 'object'){

        //     if(v.formData.GeofenceDetail.geofenceData.coordinates.length != undefined){
        // if(v.formData.GeofenceDetail.geofenceData.coordinates.trim()[0] == "["){

        if (data.length >= 4) {
          let { formData } = this.state;
          formData = JSON.parse(JSON.stringify(formData));
          formData.GeofenceDetail.geofenceData.coordinates = v.formData.GeofenceDetail.geofenceData.coordinates;
          formData.GeofenceDetail.geofenceData.geomTypeNav = "3";
          formData.GeofenceDetail.geofenceData.radius = 0;
          // formData.GeofenceDetail.geofenceData.radius = 0;
          // let polygon = JSON.parse(this.state.polygon.push(v.formData.GeofenceDetail.geofenceData.coordinates))
          // let polygon = JSON.parse(v.formData.GeofenceDetail.geofenceData.coordinates)
          this.setState({
            formData,
            polygon: data,
            type: "polygon",
            mode: "",
          });
        }
        else {
          // console.log("wrong format polygon", v.formData.GeofenceDetail.geofenceData.coordinates);
        }
        // }
        //     }
        //     else{
        //       let polygon = []
        //       JSON.parse(this.state.polygon.push(v.formData.GeofenceDetail.geofenceData.coordinates))

        //     }

        //   }
        //   else if(typeof v.formData.GeofenceDetail.geofenceData.coordinates == 'string'){

        //   }
      }

      if (v.formData.GeofenceDetail.geofenceData.type == "2") {
        // console.log(data);
        // if(v.formData.GeofenceDetail.geofenceData.coordinates.trim()[0] == "["){
        if (data.length >= 2) {
          let { formData } = this.state;
          formData = JSON.parse(JSON.stringify(formData));
          formData.GeofenceDetail.geofenceData.coordinates = v.formData.GeofenceDetail.geofenceData.coordinates;
          formData.GeofenceDetail.geofenceData.geomTypeNav = "2";
          formData.GeofenceDetail.geofenceData.radius = 0;
          // let polygon = JSON.parse(this.state.polygon.push(v.formData.GeofenceDetail.geofenceData.coordinates))
          // let polygon = JSON.parse(v.formData.GeofenceDetail.geofenceData.coordinates)
          this.setState({
            formData,
            polyline: data,
            type: "polyline",
            mode: "",
          });
        }
        else {
          // console.log("wrong format polyline",v.formData.GeofenceDetail.geofenceData.coordinates);
        }
        // }
      }

      if (v.formData.GeofenceDetail.geofenceData.type == "1") {
        // console.log(data);
        // if(v.formData.GeofenceDetail.geofenceData.coordinates.trim()[0] == "["){
        // console.log(data.length);
        if (data.length == 1) {
          let { formData } = this.state;
          formData = JSON.parse(JSON.stringify(formData));
          // let center = v.formData.GeofenceDetail.geofenceData.coordinates
          let radius = parseInt(v.formData.GeofenceDetail.geofenceData.radius);
          formData.GeofenceDetail.geofenceData.geomTypeNav = "1";
          formData.GeofenceDetail.geofenceData.coordinates =
            v.formData.GeofenceDetail.geofenceData.coordinates;
          formData.GeofenceDetail.geofenceData.radius = radius;

          this.setState({
            formData,
            centers: data,
            radius: radius,
            type: "circle",
            mode: "",
          });
        }
        else {
          // console.log("wrong format circle", v.formData.GeofenceDetail.geofenceData.coordinates);
        }
        // }
      }
      else {
        // console.log("value", v);
        let diffValue = get(
          diff(this.state.formData, v.formData),
          "GeofenceDetail.geofenceData",
          undefined
        );
        if (diffValue === undefined) return;

        //#region  Update state.formData
        let objects = Object.getOwnPropertyNames(diffValue);
        // console.log("objects", objects);
        for (let index in objects) {
          // console.log(objects[index]);
          if (objects[index] !== "partnerType__added" && objects[index] !== "type__added") {
            this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"]);
          }
        }
      }
    } else {
      // console.log("wrong format");
      // console.log("value", v);
      let diffValue = get(
        diff(this.state.formData, v.formData),
        "GeofenceDetail.geofenceData",
        undefined
      );
      // console.log(diffValue)
      if (diffValue === undefined) return;

      //#region  Update state.formData
      let objects = Object.getOwnPropertyNames(diffValue);
      // console.log("objects", objects);
      for (let index in objects) {
        // console.log(objects[index]);
        if ("" + objects[index] === "chooseAttachIcon") {
          let { formData } = JSON.parse(JSON.stringify(this.state))
          // console.log(formData)
          // console.log(fieldName)
          // console.log(value)
          // formData.GeofenceTypeDetail.geofenceTypeData[fieldName] = value

          // console.log(diffValue[objects[index]+''])
          // console.log(diffValue[objects[index]+''].name['__new'])
          formData.GeofenceDetail.geofenceData.chooseAttachIcon.name = diffValue[objects[index] + ''].name['__new']
          formData.GeofenceDetail.geofenceData.chooseAttachIcon.attachCode = diffValue[objects[index] + ''].attachCode['__new']
          formData.GeofenceDetail.geofenceData.chooseAttachIcon.attachUrl = diffValue[objects[index] + ''].attachUrl['__new']
          this.setState({ formData })
        }
        else if ("" + objects[index] === "attachInfo") {
          let { formData } = JSON.parse(JSON.stringify(this.state))
          // console.log(formData)
          // console.log(fieldName)
          // console.log(value)
          // formData.GeofenceTypeDetail.geofenceTypeData[fieldName] = value

          // console.log(diffValue[objects[index]+''])
          // console.log(diffValue[objects[index]+''].fileName['__new'])
          // console.log(formData.GeofenceDetail.geofenceData.attachInfo)

          formData.GeofenceDetail.geofenceData.attachInfo.fileName = diffValue[objects[index] + ''].fileName && diffValue[objects[index] + ''].fileName['__new']
          formData.GeofenceDetail.geofenceData.attachInfo.fileUrl = diffValue[objects[index] + ''].fileUrl && diffValue[objects[index] + ''].fileUrl['__new']
          formData.GeofenceDetail.geofenceData.attachInfo.attachCode = diffValue[objects[index] + ''].attachCode && diffValue[objects[index] + ''].attachCode['__new']
          this.setState({ formData })
        }
        else if (objects[index] === "geofenceTypeNav") {
          let { formData } = JSON.parse(JSON.stringify(this.state))
          // console.log(diffValue["" + objects[index]])
          // console.log(diffValue["" + objects[index]]["__new"])
          if (diffValue["" + objects[index]]["__new"] == undefined && diffValue["" + objects[index]]["__new"] == '') {
            this.props.getIconByGeofenceType(parseInt(diffValue["" + objects[index]]["__new"]))
            this.setState({ attachInfoByGeofenceType: { attachCode: "", fileName: "", fileUrl: null } })
            // this.setState({iconPresentRadio: [{attachCode:'', attachUrl:'', name:''}]})
          }

          formData.GeofenceDetail.geofenceData.geofenceTypeNav = diffValue["" + objects[index]]["__new"]
          this.setState({ formData })
          // this.bindingData("" + objects[index],diffValue["" + objects[index]]["__new"]);
        }
        else if (objects[index] === "partnerName") {
          let { formData } = JSON.parse(JSON.stringify(this.state))
          // console.log(parseInt(diffValue["" + objects[index]]["__new"]))
          this.props.getDropdownGeofenceType(parseInt(diffValue["" + objects[index]]["__new"]))
          formData.GeofenceDetail.geofenceData.partnerName = diffValue["" + objects[index]]["__new"]
          formData.GeofenceDetail.geofenceData.geofenceTypeNav = ""
          // formData.GeofenceDetail.geofenceData.iconSource = "1"
          this.setState({ formData })
          // this.bindingData("" + objects[index],diffValue["" + objects[index]]["__new"]);
        }
        else if (objects[index] !== "partnerType__added" && objects[index] !== "type__added") {
          this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"]);
        }
      }
    }
  }

  bindingData(fieldName, value) {
    // console.log(fieldName, value);
    let { formData } = this.state;
    // console.log(formData)
    //  let _formData = formData
    // console.log(fieldName);
    // console.log(value);
    formData.GeofenceDetail.geofenceData[fieldName] = value;
    this.setState({ formData: formData });
    // console.log(formData);
  }

  dropdownChange(fieldName, value, key) {
    //#region  Dropdown change binding condition
    let { formData, inputTypeChange, defaultValue } = this.state;

    switch (fieldName) {
      case "geofenceTypeNav":
        formData.GeofenceDetail.geofenceData.geofenceTypeNav = value;
        formData.GeofenceDetail.geofenceData.geofenceTypeNav_value = key;
        break;
      case "geomTypeNav":
        formData.GeofenceDetail.geofenceData.geomTypeNav = value;
        formData.GeofenceDetail.geofenceData.geomTypeNav_value = key;
        break;
      case "geofenceTypeNav_current":
        formData.GeofenceDetail.geofenceData.geofenceTypeNav_current =
          formData.GeofenceDetail.geofenceData.geofenceTypeNav_current.value;
        formData.GeofenceDetail.geofenceData.geofenceTypeNav_value_current =
          formData.GeofenceDetail.geofenceData.geofenceTypeNav_value_current.key;
        break;
      case "geomTypeNav_current":
        formData.GeofenceDetail.geofenceData.geomTypeNav_current =
          formData.GeofenceDetail.geofenceData.geomTypeNav_current.value;
        formData.GeofenceDetail.geofenceData.geomTypeNav_value_current =
          formData.GeofenceDetail.geofenceData.geomTypeNav_value_current.key;
        break;
    }
    //#endregion
    this.setState({ formData, inputTypeChange });
  }

  setAlert(isShow, type, content = "", ErrorSubcode, validateCode) {
    let { alert } = this.state;
    alert.show = isShow;
    alert.type = type;
    alert.content = content;
    alert.ErrorSubcode = ErrorSubcode;
    alert.validateCode = validateCode
    this.setState({ alert });
  }

  submitConfirm() {
    let { formData } = this.state
    // console.log("formDataSubmit : ", formData)

    if (this.props.typeForm === "edit") {
      let data = this.mappingFieldsUpdate(formData.GeofenceDetail);
      // console.log("Form Update", formData.GeofenceDetail);
      this.props.editGeofence(data);
      this.setAlert(true, 6)
    }
    else {
      let data = this.mappingFieldsInsert(formData.GeofenceDetail);
      // console.log("Form Insert", data);
      this.props.addGeofence(data);
      this.setAlert(true, 6)
    }
  }

  submit(FormData) {
    // console.log(this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav != undefined && this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav != '')
    if (this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav != undefined && this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav != '') {
      // console.log(this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav == undefined && this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav == '')
      if (this.state.titleFormType == 'Add') {
        this.setAlert(true, 3, "geofence_10")
      }
      else if (this.state.titleFormType == 'Edit') {
        this.setAlert(true, 3, "geofence_35")
      }
      // console.log(this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav == undefined && this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav == '')
      // let msg = this.props.language == 'th' ? 'โปรดเลือกประเภทจีโอเฟนช์' : 'Please select Group Type'
      // this.setAlert(true, 2, msg, 400, false)
    }
    else {
      // console.log(this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav == undefined && this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav == '')
      // if(this.state.titleFormType == 'Add'){
      //   this.setAlert(true, 3, "geofence_10")
      // }
      // else if(this.state.titleFormType == 'Edit'){
      //   this.setAlert(true, 3, "geofence_35")
      // }
      // console.log(this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav == undefined && this.state.formData.GeofenceDetail.geofenceData.geofenceTypeNav == '')
      let msg = this.props.language == 'th' ? 'โปรดเลือกประเภทจีโอเฟนช์' : 'Please select Group Type'
      this.setAlert(true, 2, msg, 400, false)
      window.scrollTo(0, 200)
      // window.scrollTo(0, )
      // console.log(this.props.refGeofenceType.current.offsetBottom)
      // window.scrollTo(0, this.props.refGeofenceType.current.offsetBottom)
      // document.getElementById("form").s
      this.setState({ loading: false });
    }
    // this.setAlert(true, 3, this.props.typeForm + " Geofence")
  }



  // if (this.props.typeForm === "edit") {
  //   // Update Driver
  //   // let data = this.mappingFieldsUpdate(FormData.formData.GeofenceTypeDetail)
  //   let data = this.mappingFieldsUpdate(FormData.formData.GeofenceDetail);
  //   console.log("Form Update", FormData.formData.GeofenceDetail);
  //   // console.log(JSON.stringify(data))
  //   this.props.editGeofence(data);
  // } else {
  //   // Create new Driver
  //   // if (this.state.type === "draw") {
  //   let data = this.mappingFieldsInsert(FormData.formData.GeofenceDetail);
  //   console.log("Form Insert", data);
  //   this.props.addGeofence(data);
  // }
  // else {

  //   let coodinate = []
  //   this.FormData.formData.GeofenceDetail.geofenceData.coordinates.split(',').forEach(element => {
  //     // element.coordinates
  //   });
  // }


  mappingFieldsInsert(FormData) {
    let dt = FormData.geofenceData;
    // console.log(dt)
    if (dt.iconSource == 1) {
      let data = {
        partnerTypeNav: {
          key: parseInt(this.props.profileUser.intPartnerType),
        },
        partnerNav: {
          key: parseInt(dt.partnerName),
          // "value": this.props.partnerType
        },
        // geofenceName: dt.geofenceName,
        // geofenceDescription: dt.geofenceDescription,
        name: dt.name,
        description: dt.description,
        nameEn: dt.nameEn,
        descriptionEn: dt.descriptionEn,
        nameJa: dt.nameJa,
        descriptionJa: dt.descriptionJa,
        geofenceTypeNav: {
          // "key": dt.geofenceTypeNav_value,
          // key: '13',
          key: parseInt(dt.geofenceTypeNav)
        },
        isHazard: dt.isHazard,
        isShare: dt.isShare,
        isActive: dt.isActive,
        geomTypeNav: {
          // "key": dt.geomTypeNav_value,
          key: parseInt(dt.geomTypeNav),
        },
        coordinates:
          dt.geomTypeNav == 1 ? this.state.centers : dt.geomTypeNav == 2
            ? this.state.polyline : dt.geomTypeNav == 3 && this.state.polygon,
        // "iconPoint": this.state.iconPoint,
        radius: parseInt(dt.radius),
        iconSourceNav: {
          key: dt.iconSource
        },
        // attachCode: dt.iconSource == 1 ? "" : dt.iconSource == 2 ? dt.chooseAttachIcon.attachCode :dt.attachCode,
      }
      // console.log(data)
      return data;
    }
    else if (dt.iconSource == 2 || dt.iconSource == 3) {
      let data = {
        partnerTypeNav: {
          key: parseInt(this.props.profileUser.intPartnerType),
        },
        partnerNav: {
          key: parseInt(dt.partnerName),
          // "value": this.props.partnerType
        },
        // geofenceName: dt.geofenceName,
        // geofenceDescription: dt.geofenceDescription,
        name: dt.name,
        description: dt.description,
        nameEn: dt.nameEn,
        descriptionEn: dt.descriptionEn,
        nameJa: dt.nameJa,
        descriptionJa: dt.descriptionJa,
        geofenceTypeNav: {
          // "key": dt.geofenceTypeNav_value,
          // key: '13',
          key: parseInt(dt.geofenceTypeNav)
        },
        isHazard: dt.isHazard,
        isShare: dt.isShare,
        isActive: dt.isActive,
        geomTypeNav: {
          // "key": dt.geomTypeNav_value,
          key: parseInt(dt.geomTypeNav),
        },
        coordinates:
          dt.geomTypeNav == 1 ? this.state.centers : dt.geomTypeNav == 2
            ? this.state.polyline : dt.geomTypeNav == 3 && this.state.polygon,
        // "iconPoint": this.state.iconPoint,
        radius: parseInt(dt.radius),
        iconSourceNav: {
          key: dt.iconSource
        },
        attachCode: dt.iconSource == 1 ? "" : dt.iconSource == 2 ? dt.chooseAttachIcon.attachCode : dt.attachCode,
      }
      // console.log(data)
      return data;
    }

  }

  keyPress(e) {
    if (e.keyCode == 13) {
      e.preventDefault();
      // console.log('press enter value', e.target.value);
      // put the login here
    }
  }

  mappingFieldsUpdate(FormData) {
    let dt = FormData.geofenceData;
    if (dt.iconSource == 1) {
      let data = [
        {
          partnerTypeNav: {
            key: parseInt(this.props.profileUser.intPartnerType),
          },
          partnerNav: {
            key: parseInt(dt.partnerName),
          },
          // geofenceName: dt.geofenceName,
          // geofenceDescription: dt.geofenceDescription,
          name: dt.name,
          description: dt.description,
          nameEn: dt.nameEn,
          descriptionEn: dt.descriptionEn,
          nameJa: dt.nameJa,
          descriptionJa: dt.descriptionJa,
          geofenceTypeNav: {
            // "key": dt.geofenceTypeNav_value,
            key: parseInt(dt.geofenceTypeNav),
            // key: '13',
          },
          isHazard: dt.isHazard,
          isShare: dt.isShare,
          isActive: dt.isActive,
          geomTypeNav: {
            // "key": dt.geomTypeNav_value,
            key: parseInt(dt.geomTypeNav),
          },
          coordinates: dt.geomTypeNav == 1 ? this.state.centers : dt.geomTypeNav == 2
            ? this.state.polyline : dt.geomTypeNav == 3 && this.state.polygon,
          // "iconPoint": this.state.iconPoint,
          radius: parseInt(dt.radius),
          iconSourceNav: {
            key: dt.iconSource
          },
          iconPoint: dt.iconPoint,
          // attachCode: dt.iconSource == 1 ? "" : dt.iconSource == 2 ? dt.chooseAttachIcon.attachCode :dt.attachCode,
        },
        {
          id: this.props.id,
        },
      ];
      // console.log(data)
      return data;
    }
    else if (dt.iconSource == 2 || dt.iconSource == 3) {
      let data = [
        {
          partnerTypeNav: {
            key: parseInt(this.props.profileUser.intPartnerType),
          },
          partnerNav: {
            key: parseInt(dt.partnerName),
          },
          // geofenceName: dt.geofenceName,
          // geofenceDescription: dt.geofenceDescription,
          name: dt.name,
          description: dt.description,
          nameEn: dt.nameEn,
          descriptionEn: dt.descriptionEn,
          nameJa: dt.nameJa,
          descriptionJa: dt.descriptionJa,
          geofenceTypeNav: {
            // "key": dt.geofenceTypeNav_value,
            key: parseInt(dt.geofenceTypeNav),
            // key: '13',
          },
          isHazard: dt.isHazard,
          isShare: dt.isShare,
          isActive: dt.isActive,
          geomTypeNav: {
            // "key": dt.geomTypeNav_value,
            key: parseInt(dt.geomTypeNav),
          },
          coordinates: dt.geomTypeNav == 1 ? this.state.centers : dt.geomTypeNav == 2
            ? this.state.polyline : dt.geomTypeNav == 3 && this.state.polygon,
          // "iconPoint": this.state.iconPoint,
          radius: parseInt(dt.radius),
          iconSourceNav: {
            key: dt.iconSource
          },
          iconPoint: dt.iconPoint,
          attachCode: dt.iconSource == 1 ? "" : dt.iconSource == 2 ? dt.chooseAttachIcon.attachCode : dt.attachCode,
        },
        {
          id: this.props.id,
        },
      ];
      // console.log(data)
      return data;
    }
  }

  submitData() {
    // if (this.props.isValid && this.state.data.geomType) {

    if (this.state.geomType == "point" && this.state.data["radius"] !== 0 && this.state.data["coordinate"] !== null) {
      this.props.typeForm === "add" ? this.props.addGeofence(this.state.datas) : this.updataData(this.state.datas);
      // console.log("add raius");
      // console.log(this.state.datas);
    } else if (
      this.state.geomType == "polygon" ||
      (this.state.geomType == "polyline" &&
        this.state.data["radius"] === 0 &&
        this.state.data["coordinate"] !== null)
    ) {
      this.props.typeForm === "add"
        ? this.props.addGeofence(this.state.datas)
        : this.updataData(this.state.datas);
      // console.log("add polygon or polyline");
      // console.log(this.state.datas);
    } else {
      this.setState({ loading: false });
      // console.log("error");
    }



    // this.updataData()
    // }
    // else {
    //   console.log('error')
    //   this.setState({ loading: false })
    // }
  }

  updataData() {
    let { data } = this.state;
    let { geofence } = this.props;

    // console.log(">> UPDATA DATA <<");
    // console.log(data);
    // console.log(geofence);

    let updateGeofence = [];

    for (let name in data) {
      if (geofence[name] != undefined) {
        if (data[name] != geofence[name]) {
          updateGeofence.push({
            op: "replace",
            path: "/" + name,
            value: data[name],
          });
        }
      }
    }
    // console.log(">> UPDATE CHANGE ONLY <<");
    // console.log(updateGeofence);
    if (updateGeofence.length > 0) {
      let geofence = {
        id: updateGeofence.id,
        array: updateGeofence,
      };

      // console.log(geofence);
      this.props.editGeofence(geofence);
      //  setTimeout(() => this.props.history.push("truck"), 500)
      this.setState({ loading: false });
    } else {
      alert("ไม่มีข้อมูลเปลี่ยนแปลง");
      this.setState({ loading: false });
    }
  }

  getPathsPolygon(polygon) {
    let { formData } = this.state;
    // let _formData = formData
    // let { coordinates, geomTypeNav } = this.state.formData.GeofenceDetail.geofenceData
    formData = JSON.parse(JSON.stringify(formData));
    // formData.GeofenceDetail.geofenceData.coordinates = e.target.value
    var coordinate = polygon.getPath().getArray();
    var polygons = [];


    coordinate.forEach((i) => polygons.push({ lat: i.lat(), lng: i.lng() }));
    let data = this.formatText(polygons)
    // console.log(data)
    // formData.GeofenceDetail.geofenceData.coordinates = data
    // formData.GeofenceDetail.geofenceData.coordinates = JSON.stringify(polygon);
    formData.GeofenceDetail.geofenceData.coordinates = data;
    // coordinates = data
    // this.bindingData('geomTypeNav','Polygon')
    // this.bindingData('geomTypeNav_value',3)
    formData.GeofenceDetail.geofenceData.radius = 0;
    formData.GeofenceDetail.geofenceData.geomTypeNav = "3";
    // formData.GeofenceDetail.geofenceData.geomTypeNav_value = 3
    // this.state.formData.GeofenceDetail.geofenceData. = getRadius
    this.setState({ formData, polygon: polygons, type: "polygon", mode: "draw", edit: null, });
    // console.log(formData);
    // this.setState({ type: "draw" })
    // this.setState({geomTypeNav: '3', type: "draw"})
    // this.bindingData('geomTypeNav', '3')
    // this.bindingData('coordinates', coordinate)
    // this.bindingData('radius', 0)
    // this.setState({formData:{GeofenceDetail:{geofenceData:{geomTypeNav :'Polygon'}}}})
    // this.setState({coordinates: formData.GeofenceDetail.geofenceData.coordinates})
    // console.log('Polygon')
    // console.log(this.state.formData)
    // console.log(formData)
    // console.log(this.state.formData.GeofenceDetail.geofenceData)
    // console.log(coordinates)
  }

  getPathsPolyline(polyline) {
    let { formData } = this.state;
    formData = JSON.parse(JSON.stringify(formData));
    // this.state.formData.GeofenceDetail.geofenceData.coordinates = []
    // console.log(polyline)
    // console.log(this.props)
    var coordinate = polyline.getPath().getArray();
    // console.log(polyline.getPath().getArray());

    let polylines = [];


    coordinate.forEach((i) => polylines.push({ lat: i.lat(), lng: i.lng() }));
    let data = this.formatText(polylines)
    // formData.GeofenceDetail.geofenceData.coordinates = data
    formData.GeofenceDetail.geofenceData.coordinates = data;

    formData.GeofenceDetail.geofenceData.radius = 0;
    formData.GeofenceDetail.geofenceData.geomTypeNav = "2";
    // this.state.formData.GeofenceDetail.geofenceData.geomTypeNav_value = 2
    this.setState({
      formData: formData,
      polyline: polylines,
      type: "polyline",
      mode: "draw",
      edit: null,
    });
    // this.setState({ geomTypeNav: '2', type: "draw" })

    // console.log("Line");
    // console.log(this.state.formData.GeofenceDetail.geofenceData);
  }

  getPathsPoint(circle, edit) {
    // let { coordinates, geomTypeNav, radius } = this.state.formData.GeofenceDetail.geofenceData
    let { formData } = this.state;
    // formData = JSON.parse(JSON.stringify(formData))
    // let state = JSON.parse(JSON.stringify(this.state))
    // this.state.formData.GeofenceDetail.geofenceData.coordinates = []
    var getCoordinate = circle.getCenter();
    var getRadius = parseInt(circle.getRadius());
    // let oldRadius = parseInt(circle.getRadius())
    // console.log(getCoordinate.lat())
    // console.log(getCoordinate.lng())
    // console.log(circle);
    // console.log(edit);
    // console.log(getRadius);
    // console.log(this.state.radius);
    // console.log(this.state.oldRadius);
    // console.log(this.state.center.lat != getCoordinate.lat())
    // console.log(this.state.center.lat != getCoordinate.lat())
    // if(this.state.center.lat != getCoordinate.lat() || this.state.center.lng != getCoordinate.lng()){
    if (edit == "add") {
      formData = JSON.parse(JSON.stringify(formData));
      let centers = JSON.parse(JSON.stringify(this.state.centers))
      // this.setState({})
      // coordinates = [{ lat: getCoordinate.lat(), lng: getCoordinate.lng() }]
      // geomTypeNav = 'Point'
      // radius = getRadius
      // this.state.coordinates.push({ lat: getCoordinate.lat(), lng: getCoordinate.lng() })
      let circles = [];
      circles.push({ lat: getCoordinate.lat(), lng: getCoordinate.lng() });
      let data = this.formatText(circles)
      // console.log(circles)
      formData.GeofenceDetail.geofenceData.radius = getRadius;
      formData.GeofenceDetail.geofenceData.coordinates = data;
      // console.log(this.state.radius)
      // formData.GeofenceDetail.geofenceData.radius = getRadius
      formData.GeofenceDetail.geofenceData.geomTypeNav = "1";
      // console.log(formData)
      centers = circles
      // console.log(centers)
      // console.log(this.state)
      this.setState({
        formData: formData,
        oldRadius: getRadius,
        radius: getRadius,
        centers,
        type: "circle",
        mode: "draw",
        edit: null,
      });
      // console.log(formData)
    }
    if (
      (edit == "center" && this.state.centers[0].lat != getCoordinate.lat()) ||
      this.state.centers[0].lng != getCoordinate.lng()
    ) {
      formData = JSON.parse(JSON.stringify(formData));
      // this.setState({})
      // coordinates = [{ lat: getCoordinate.lat(), lng: getCoordinate.lng() }]
      // geomTypeNav = 'Point'
      // radius = getRadius
      // this.state.coordinates.push({ lat: getCoordinate.lat(), lng: getCoordinate.lng() })
      let circles = [];
      circles.push({ lat: getCoordinate.lat(), lng: getCoordinate.lng() });
      let data = this.formatText(circles)
      formData.GeofenceDetail.geofenceData.coordinates = data;
      // console.log(this.state.radius)
      // formData.GeofenceDetail.geofenceData.radius = getRadius
      formData.GeofenceDetail.geofenceData.geomTypeNav = "1";
      this.setState({
        formData: formData,
        centers: circles,
        type: "circle",
        mode: "draw",
        edit: null,
      });
      // console.log(this.state.radius)
    }

    // if(getRadius != 0 && this.state.radius != getRadius && this.state.oldRadius != getRadius){
    if (
      edit == "radius" &&
      getRadius != 0 &&
      this.state.radius != getRadius &&
      this.state.oldRadius != getRadius
    ) {
      formData = JSON.parse(JSON.stringify(formData));
      // console.log(this.state.radius)
      formData.GeofenceDetail.geofenceData.radius = getRadius;
      // this.state.radius = getRadius
      // this.state.oldRadius = getRadius
      this.setState({
        formData: formData,
        oldRadius: getRadius,
        radius: getRadius,
        type: "circle",
        mode: "draw",
        edit: null,
      });
      // console.log(this.state.radius)
      // console.log(getRadius);
      // console.log(this.state.formData.GeofenceDetail.geofenceData.radius);
      // console.log(this.state.oldRadius);
    }
    // console.log("Point");
    // console.log(this.state);
  }

  getPathsRectangle(rectangle) {
    var coordinates = {
      centers: {
        lat: rectangle.getMap().center.lat(),
        lng: rectangle.getMap().center.lng(),
      },
      bounds: {
        north: rectangle.getBounds().Za.i,
        south: rectangle.getBounds().Za.j,
        east: rectangle.getBounds().Ua.j,
        west: rectangle.getBounds().Ua.j,
      },
    };
    // console.log(coordinates.getBounds());
    // console.log(coordinates.constructor());
    // console.log(coordinates.getMap().center.lat());
    // console.log(coordinates.getMap().center.lng());
    // console.log(coordinates.getBounds());
    // console.log(coordinates.getBounds());
    // console.log(coordinates[0].lat());
    // coordinates.forEach( (i)=> {
    //   console.log(i)
    //   this.state.data.coordinate.push({lat : i.lat, lng: i.lat})
    // });
    // console.log(this.state.data.coordinate)
    // this.state.data.coordinate.lat = coordinates[0].lat
    // this.state.data.coordinate.lng = coordinates[0].lng
  }

  toolBoxCustom() {
    return (
      <div className="ibox-tools" id="form">
        <Input type="select" disabled="true" value="">
          <option value="">
            {!this.props.profileUser.partnerType
              ? "โปรดเลือก"
              : this.props.profileUser.partnerType}
          </option>
        </Input>
      </div>
    );
  }

  testChange(e) {
    // console.log(e.target.value);
    let { formData } = this.state;
    formData = JSON.parse(JSON.stringify(formData));
    formData.GeofenceDetail.geofenceData.geofenceName = e.target.value;

    this.setState({ formData });
  }

  render() {
    let { formData, geofenceTypeNavList, geomTypeNavList, titleFormType, iconSourceRadio, iconPresentRadio, partnerNameList, attachInfoByGeofenceType, alert } = this.state;
    const { component: Component, ...rest } = this.props;
    // console.log(formData)
    // console.log(this);
    // console.log(this.props);
    return (
      <div>
        <Alert
          setting={alert}
          onConfirm={() => {
            if (alert.type === 4) {
              alert.show = false
            }
            else if (alert.type === 3) {
              alert.show = false
              this.submitConfirm(alert.content)
            }
            else if (this.props.statusSubmit.status) {
              alert.show = true
              this.props.submitStatus(false)
              this.props.history.push("/geofence")
            }
            else {
              alert.show = false
            }
            this.setState({ alert })
          }}
          onCancel={() => {
            alert.show = false
            this.setState({ alert })
          }}
        />

        <PannelBox title={titleFormType == 'Add' ? t("geofence_10") : t("geofence_35")}>
          {/* <input onChange={(e) => {
          let _formData = this.state.formData

          _formData.GeofenceDetail.geofenceData.radius = e.target.value
          this.setState({formData: _formData})
      }}></input> */}

          {/* <input onChange={(e) => this.testChange(e)} /> */}
          <Form
            className="title-form"
            id={"form_user"}
            schema={setSchema(geofenceTypeNavList, geomTypeNavList, partnerNameList, iconSourceRadio, iconPresentRadio, attachInfoByGeofenceType)}
            uiSchema={uiSchema}
            fields={fields}
            formData={formData}
            onChange={v => this.onFormChange(v)}
            onSubmit={v => this.submit(v)}
            validate={this.require}
          // ErrorList={this.ErrorListTemplate}
          // onError={v => console.log(v)}
          >
            <Row>
              <MapDraw
                // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&v=3.exp&libraries=geometry,drawing,places"
                // loadingElement={<div style={{ height: `100%` }} />}
                // containerElement= {<div style={{ height: `400px` }} />}
                // visible={true}
                form={true}
                zoomDefualt={this.state.zoomDefualt}
                centerDefualt={this.state.centerDefualt}
                showIcon={this.state.formData.GeofenceDetail.geofenceData.coordinates != '' && this.state.formData.GeofenceDetail.geofenceData.coordinates != ' ' && this.state.formData.GeofenceDetail.geofenceData.coordinates != undefined}
                polygon={this.state.polygon}
                polyline={this.state.polyline}
                circle={this.state.circle}
                center={this.state.centers}
                radius={this.state.radius}
                iconUrl={
                  null
                  // this.state.formData.GeofenceDetail.geofenceData.iconSource == 1 ?
                  // this.state.attachInfoByGeofenceType.fileUrl == null ? '' : this.state.attachInfoByGeofenceType.fileUrl + '_icon' : this.state.formData.GeofenceDetail.geofenceData.iconSource == 2 ?
                  // this.state.formData.GeofenceDetail.geofenceData.chooseAttachIcon.attachUrl + '_icon' : this.state.formData.GeofenceDetail.geofenceData.iconSource == 3 &&
                  // this.state.formData.GeofenceDetail.geofenceData.attachInfo.fileUrl + '_icon'
                }
                iconPoint={
                  this.state.formData.GeofenceDetail.geofenceData.geomTypeNav == 1 ? this.state.centers[0] : this.state.formData.GeofenceDetail.geofenceData.geomTypeNav == 2
                    ? this.state.polyline[0] : this.state.formData.GeofenceDetail.geofenceData.geomTypeNav == 3 && this.state.polygon[0]
                  // this.state.formData.GeofenceDetail.geofenceData.geomTypeNav == 1 ?
                  // this.state.attachInfoByGeofenceType.fileUrl : this.state.formData.GeofenceDetail.geofenceData.geomTypeNav == 2 ?
                  // this.state.formData.GeofenceDetail.geofenceData.chooseAttachIcon.attachUrl : this.state.formData.GeofenceDetail.geofenceData.geomTypeNav == 3 &&
                  // this.state.formData.GeofenceDetail.geofenceData.attachInfo.attachUrl
                }
                mode={this.state.mode}
                mapElement={<div style={{ height: `100%` }} />}
                getPathsPolygon={(e) => this.getPathsPolygon(e)}
                getPathsPolyline={(e) => this.getPathsPolyline(e)}
                getPathsPoint={(e, edit) => this.getPathsPoint(e, edit)}
                type={this.state.type}
                // radius={this.props.geofence.radius}
                // onChangeLat={(type, overlay, edit) => console.log(overlay)}
                onChange={(type, overlay, edit) =>
                  type == "polygon"
                    ? this.getPathsPolygon(overlay)
                    : type == "polyline"
                      ? this.getPathsPolyline(overlay)
                      : type == "circle" && this.getPathsPoint(overlay, edit)
                }
              ></MapDraw>
            </Row>
            <div className="hr-line-dashed" />
            <div className="row" style={{ textAlign: "right" }}>
              <CancelButton
                name={t("geofence_31")}
                loading={false}
                onClick={() => {
                  this.props.history.push("/geofence");
                }}
              />
              <SaveButton form="form_user" name={t("geofence_32")} loading={this.props.loading} />
            </div>
          </Form>
        </PannelBox>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  error: state.geofence.error,
  // groupType: state.signin.groupType,
  // userGroup: state.signin.userGroup,
  refGeofenceType: state.geofence.refGeofenceType,
  iconSourceData: state.geofence.iconSourceData,
  iconPresent: state.geofence.iconPresent,
  dataLogin: state.signin.dataLogin,
  currentUser: state.signin.currentUser,
  isValid: state.formValidate.isValid,
  profileUser: state.signin.profileUser,
  id: state.geofence.idSelected,
  typeForm: state.geofence.typeForm,
  statusSubmit: state.geofence.statusSubmit,
  action: state.geofence.action,
  geofence: state.geofence.geofence,
  isGeofence: state.geofence.isGeofence,
  geofenceTypeNavList: state.geofence.geofenceTypeNav,
  geomTypeNavList: state.geofence.geomTypeNav,
  partnerName: state.geofence.partnerName,
  success: state.geofence.success,
  loading: state.geofence.loading,
  attachInfoByGeofenceType: state.geofence.attachInfoByGeofenceType,
  language: state.versatile.language,
});
const mapDispatchToProps = (dispatch) => ({
  setData: (typeForm) => dispatch(GeofenceActions.setData(typeForm)),
  // setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data)),
  getPresentIcon: () => dispatch(GeofenceActions.getPresentIcon()),
  getIconByGeofenceType: (id) => dispatch(GeofenceActions.getIconByGeofenceType(id)),
  addGeofence: (geofence) => dispatch(GeofenceActions.addGeofence(geofence)),
  editGeofence: (geofence) => dispatch(GeofenceActions.editGeofence(geofence)),
  getDropdownPartnerName: () => dispatch(GeofenceActions.getDropdownPartnerName()),
  getDropdownGeofenceType: (id) => dispatch(GeofenceActions.getDropdownGeofenceType(id)),
  getGeofence: (id) => dispatch(GeofenceActions.getGeofence(id)),
  idSelected: (typeForm, id) => dispatch(GeofenceActions.idSelected(typeForm, id)),
  submitStatus: (status, ErrorSubcode) => dispatch(GeofenceActions.submitStatus(status, ErrorSubcode)),
  // getGeomType: () => dispatch(GeofenceActions.getGeomType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeofenceForm);
