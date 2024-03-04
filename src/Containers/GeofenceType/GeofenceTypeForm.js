/* eslint-disable default-case */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import GeofenceActions from '../../Redux/GeofenceRedux'
// import FormValidateActions from '../../Redux/FormValidateRedux'
import Form from "react-jsonschema-form"
import { setSchema } from './Form/setSchema.js'
import GeofenceTypeData from "./Form/Fields/GeofenceTypeData"
import { diff } from 'json-diff';
import { get } from 'lodash'
import { Input } from "reactstrap";
import './Form/styles.css'
import PannelBox from '../../Components/PannelBox'
// import FormGenerator from '../../Components/FormGenerator/Form'
// import { formValidation } from "../../Components/FormGenerator/validate";
// import { resetForm } from "../../Components/FormGenerator/resetForm";

import Alert from '../../Components/Alert'
import { t } from '../../Components/Translation'

import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'


export const fields = {
  geofenceTypeData: GeofenceTypeData,
}

export const uiSchema = {
  GeofenceTypeDetail: {
    geofenceTypeData: {
      "ui:field": "geofenceTypeData"
    },
  }
}

class GeofenceTypeForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      defualt: {
        GeofenceTypeDetail: {
          geofenceTypeData: {
            // geofenceTypeName: "",
            // geofenceTypeDescription: "",
            name: "",
            description: "",
            nameEn: "",
            descriptionEn: "",
            nameJa: "",
            descriptionJa: "",
            geofenceTypeNav: "",
            sourceTypeNav: "",
            sourceTypeNav_value: "",
            sourceTypeNav_current: "",
            sourceTypeNav_value_current: "",
            partnerName: "",
            partnerName_value: "",
            partnerName_current: "",
            partnerName_value_current: "",
            partnerType: "",
            // isShare: "",
            isHazard: "",
            isActive: "",
            attachCode: "",
            filesResponse: "",
          }
        }
      },
      titleFormType: "",
      loading: false,
      alert: {
        confirm: null,
        show: false,
        type: 3,
        content: "",
        ErrorSubcode: 0
      },
      formData: {
        GeofenceTypeDetail: {
          geofenceTypeData: {
            // geofenceTypeName: "",
            // geofenceTypeDescription: "",
            name: "",
            description: "",
            nameEn: "",
            descriptionEn: "",
            nameJa: "",
            descriptionJa: "",
            geofenceTypeNav: "",
            sourceTypeNav: "1",
            // sourceTypeNav_value: 1,
            // sourceTypeNav_current: "",
            // sourceTypeNav_value_current: "",
            partnerType: {
              key: this.props.profileUser.intPartnerType,
              value: this.props.profileUser.partnerTypeName
            },
            partnerName: "",
            // partnerName_value: "",
            // partnerName_current: "",
            // partnerName_value_current: "",
            // isShare: "",
            iconSource: "",
            isHazard: false,
            isActive: true,
            attachCode: "",
            attachInfo: {
              attachCode: "",
              fileName: "",
              fileUrl: "",
            },
            iconAttachId: "",
            filesResponse: "",
            iconUrl: "",
            showFormPopupPreIcon: false,
            chooseAttachIcon: {
              name: "",
              attachCode: "",
              attachUrl: "",
            },

          }
        }
      },
      sourceTypeNavList: [{ key: 1, value: "Customize" }],
      // sourceTypeNavList_current: [],
      partnerNameList: [],
      partnerTypeList: [],
      // iconSource: [],
      // {
      //   "key": 2,
      //   "value": "Preset EN"
      // },
      // {
      //   "key": 3,
      //   "value": "Custome EN"
      // }
      iconSourceRadio: [{ key: 'Present', value: '2' }, { key: 'Custom', value: '3' }],
      iconPresentRadio: [{ attachCode: '', attachUrl: '', name: '' }],
      // iconSourceName: ['Preset', 'Custom'],
      // viewImg: false,
      // partnerNameList_current: [],
      // defaultValue: {
      //   sourceType: "Customize",
      //   sourceType_current: "Customize"
      // },
      // inputTypeChange: {
      //   sourceType: 'select',
      //   sourceType_current: 'select'
      // },
      isUpload: null
    }
    // this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    console.log(this.props)
    console.log("ID SELECTED : " + this.props.id)
    window.scrollTo(0, 0);
    // console.log(this.state.formData)
    // console.log(this.props.geofenceType)
    // console.log(this.props.partnerId)
    // console.log(this.props.partnerTypeId)
    // console.log(this.props.profileUser)
    // console.log(this.props.partnerType)
    // this.props.getSourceType()
    if (this.props.typeForm === null) {
      console.log("idselected not null")
      this.props.setData('add', {})
      // this.props.infoVehicle(this.props.idSelected)
      // this.setState({ titleFormType: "Edit" })
    }

    if (this.props.id !== null) {
      console.log("idselected not null")
      // this.props.infoVehicle(this.props.idSelected)
      // this.state.formData.GeofenceTypeDetail.geofenceTypeData = this.props.geofenceType
      this.props.getGeofenceType(this.props.id)
      this.setAlert(true, 5)
      // this.onFormChange()
      this.setState({ titleFormType: "Edit" })
    }
    else {
      console.log("idselected is null")
      console.log(this.props.dataLogin.userLevelId)
      this.props.getSourceType(this.props.dataLogin.userLevelId)
      this.setState({ titleFormType: "Add" })
    }
  }


  componentDidUpdate(prevProps, prevState) {
    let { geofenceType } = this.props

    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm === null) {
        this.props.history.push("geofenceType")
        // const { formData } = this.state
        // let _formData = formData.GeofenceTypeDetail.geofenceTypeData
        // this.formData.GeofenceTypeDetail.geofenceTypeDataformData.partnerType = this.props.partnerType
      }
    }

    // console.log(prevState.formData.GeofenceTypeDetail.geofenceTypeData.iconSource)
    // console.log(this.state.formData.GeofenceTypeDetail.geofenceTypeData.iconSource)

    // if(prevState.formData.GeofenceTypeDetail.geofenceTypeData.iconSource != this.state.formData.GeofenceTypeDetail.geofenceTypeData.iconSource){
    // //   console.log(this.state.formData.GeofenceTypeDetail.geofenceTypeData.iconSource)
    //   if (this.state.formData.GeofenceTypeDetail.geofenceTypeData.iconSource == 2){
    //     console.log(this.state.formData.GeofenceTypeDetail.geofenceTypeData.iconSource)
    //     this.props.getPresentIcon()
    //   }
    // }

    if (this.props.isGeofenceType) {
      if (prevProps.geofenceType !== geofenceType) {
        const { formData } = JSON.parse(JSON.stringify(this.state))

        // console.log(this.state.formData.GeofenceTypeDetail.geofenceTypeData)
        // console.log(this.props.partnerType)
        let _formData = formData.GeofenceTypeDetail.geofenceTypeData
        _formData.partnerType = get(geofenceType, 'partnerTypeNav.value', '')
        // _formData.geofenceTypeName = get(geofenceType, 'geofenceTypeName', '')
        // _formData.geofenceTypeDescription = get(geofenceType, 'geofenceTypeDescription', '')
        _formData.name = get(geofenceType, "name", "");
        _formData.description = get(geofenceType, "description", "");
        _formData.nameEn = get(geofenceType, "nameEn", "");
        _formData.descriptionEn = get(geofenceType, "descriptionEn", "");
        _formData.nameJa = get(geofenceType, "nameJa", "");
        _formData.descriptionJa = get(geofenceType, "descriptionJa", "");
        _formData.sourceTypeNav = get(geofenceType, 'sourceTypeNav.key', '') + ''
        _formData.sourceTypeNav_value = get(geofenceType, 'sourceTypeNav.value', '')
        _formData.partnerName = get(geofenceType, 'partnerNav.key', '') + ''
        _formData.partnerName_value = get(geofenceType, 'partnerNav.value', '')
        _formData.iconSource = get(geofenceType, "iconSourceNav.key", "");
        _formData.isHazard = get(geofenceType, 'isHazard', '')
        _formData.isActive = get(geofenceType, 'isActive', '')
        _formData.attachInfo = get(geofenceType, 'attachInfo', '')
        _formData.attachCode = get(geofenceType, 'attachInfo.attachCode', '')
        _formData.iconAttachId = get(geofenceType, 'iconAttachId', '')
        _formData.filesResponse = get(geofenceType, 'filesResponse', '')
        _formData.iconUrl = get(geofenceType, 'iconUrl', '')


        this.props.getSourceType(this.props.dataLogin.userLevelId)

        formData.GeofenceTypeDetail.geofenceTypeData = _formData
        this.setState({ formData: formData }, () => console.log(this.state.formData))
        this.setAlert(false, 5)
      }
    }

    if (prevProps.statusSubmit !== this.props.statusSubmit) {
      // console.log(this.setAlert(true, 3))
      console.log(this.props.statusSubmit)
      let { alert } = this.state
      alert.show = true
      alert.type = this.props.statusSubmit.status ? 1 : 2
      // if()
      alert.content = this.props.statusSubmit.status ? this.state.titleFormType == 'Add' ? "geofence_type_25" : this.state.titleFormType == 'Edit' && "geofence_type_26" : this.state.titleFormType + " Geofence Type Failed"
      alert.ErrorSubcode = this.props.statusSubmit.ErrorSubcode
      this.setState({ alert }, () => console.log(this.state.alert))
    }

    if (prevProps.language !== this.props.language) {
      // console.log("formLabel > ", formLabel)
    }

    prevProps.sourceType !== this.props.sourceType && this.setState({ sourceTypeNavList: this.props.sourceType })
    prevProps.partnerName !== this.props.partnerName && this.setState({ partnerNameList: this.props.partnerName })

    prevProps.iconPresent !== this.props.iconPresent && this.setState({ iconPresentRadio: this.props.iconPresent })

    if (prevProps.iconSourceData !== this.props.iconSourceData) {
      let iconSource = JSON.parse(JSON.stringify(this.props.iconSourceData))
      if (this.props.history.location.pathname == "/geofenceTypeForm") {
        // iconSource.findIndex(v => v)
        iconSource.shift()

      }
      console.log(iconSource)
      // this.setState({iconSourceValue: iconSource.map(e => e.key), iconSourceName: iconSource.map(e => e.value)})
      this.setState({ iconSourceRadio: iconSource })
    }
    // prevProps.iconSourceData !== this.props.iconSourceData && 

  }

  componentWillMount() {
    this.props.getPresentIcon()
    console.log("_____componentWillMount______")
  }

  componentWillUnmount() {
    this.props.setData(null)
    this.props.idSelected(null, null)
    this.setState({
      formData: {
        GeofenceTypeDetail: {
          geofenceTypeData: {
            geofenceTypeName: "",
            geofenceTypeDescription: "",
            sourceTypeNav: "",
            sourceTypeNav_value: "",
            sourceTypeNav_current: "",
            sourceTypeNav_value_current: "",
            // isShare: "",
            isHazard: "",
            isActive: "",
            attachCode: "",
            filesResponse: "",

          }
        }
      },
      typeForm: null
    })
    console.log(this.state)

  }

  setAlert(isShow, type, content = "", ErrorSubcode) {
    let { alert } = this.state;
    alert.show = isShow;
    alert.type = type;
    alert.content = content;
    alert.ErrorSubcode = ErrorSubcode;
    this.setState({ alert });
  }

  // getOwnPropertyNames = oject => {
  //   return Object.getOwnPropertyNames(JSON.parse(JSON.stringify(oject)))
  // }

  setBindingFormData(data, objectsName, fieldList) {
    let formBasic = Object.getOwnPropertyNames(this.state.formData.GeofenceTypeDetail.geofenceTypeData)
    for (let index in fieldList) {
      let found = formBasic.find(x => x === fieldList[index]);
      found !== undefined && this.bindingData(fieldList[index], data[objectsName][fieldList[index]])
    }
  }

  renameKey(data) {
    let result = []
    for (let index in data) result.push({ label: data[index].value, value: data[index].key })
    return result
  }

  onFormChange(v) {

    // console.log("value", v)
    let diffValue = get(diff(this.state.formData, v.formData), 'GeofenceTypeDetail.geofenceTypeData', undefined)
    if (diffValue === undefined) return

    //#region  Update state.formData
    let objects = Object.getOwnPropertyNames(diffValue)
    console.log("objects", diffValue)

    for (let index in objects) {
      if ("" + objects[index] === "chooseAttachIcon") {
        let { formData } = JSON.parse(JSON.stringify(this.state))
        // console.log(formData)
        // console.log(fieldName)
        // console.log(value)
        // formData.GeofenceTypeDetail.geofenceTypeData[fieldName] = value

        console.log(diffValue[objects[index] + ''])
        console.log(diffValue[objects[index] + '']['__new'])
        formData.GeofenceTypeDetail.geofenceTypeData.chooseAttachIcon.name = diffValue[objects[index] + ''].name['__new']
        formData.GeofenceTypeDetail.geofenceTypeData.chooseAttachIcon.attachCode = diffValue[objects[index] + ''].attachCode['__new']
        formData.GeofenceTypeDetail.geofenceTypeData.chooseAttachIcon.attachUrl = diffValue[objects[index] + ''].attachUrl['__new']
        this.setState({ formData })
      }
      else if ("" + objects[index] === "attachInfo") {
        let { formData } = JSON.parse(JSON.stringify(this.state))
        // console.log(formData)
        // console.log(fieldName)
        // console.log(value)
        // formData.GeofenceTypeDetail.geofenceTypeData[fieldName] = value

        console.log(diffValue[objects[index] + ''])
        console.log(diffValue[objects[index] + '']['__new'])
        formData.GeofenceTypeDetail.geofenceTypeData.attachInfo.attachCode = diffValue[objects[index] + ''].attachCode['__new']
        formData.GeofenceTypeDetail.geofenceTypeData.attachInfo.fileName = diffValue[objects[index] + ''].fileName['__new']
        formData.GeofenceTypeDetail.geofenceTypeData.attachInfo.fileUrl = diffValue[objects[index] + ''].fileUrl['__new']
        this.setState({ formData })
      }
      else {
        this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
      }
      // console.log(objects[index])
      // console.log(diffValue[objects[index]+''])
      // if ("" + objects[index] === "sourceTypeNav"
      //   || "" + objects[index] === "sourceTypeNav_current"
      //   || "" + objects[index] === "partnerName"
      //   || "" + objects[index] === "partnerName_current"
      // ) {
      //   // console.log(diffValue[objects[index]+''])
      //   // console.log(diffValue[objects[index]+'']['__new'])
      //   this.dropdownChange("" + objects[index], diffValue["" + objects[index]]["__new"], diffValue["" + objects[index] + "_value"]["__new"])
      // }
      // else if ("" + objects[index] !== "inputTypeChange__added" && "" + objects[index] !== "isHazard" && "" + objects[index] !== "isActive" && "" + objects[index] !== "sourceTypeNav_value" && "" + objects[index] !== "partnerName_value") {
      //   // console.log(diffValue[objects[index]+'']['__new'])
      //   if(diffValue["" + objects[index]]["__old"] !== ""){
      //     console.log('not trim')
      //     console.log(diffValue["" + objects[index]]["__old"])
      //     this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
      //   }
      //   else{
      //     console.log('trim')
      //     console.log(diffValue["" + objects[index]]["__old"])
      //     this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"].trim())
      //   }
      // }
      // else if ("" + objects[index] == "isHazard" || "" + objects[index] == "isActive" || "" + objects[index] == "sourceTypeNav_value" || "" + objects[index] == "partnerName_value") {
      //   // console.log(diffValue[objects[index]+'']['__new'])
      //   this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
      // }
    }
    // let { formData } = this.state

    //#endregion
  }

  bindingData(fieldName, value) {
    let { formData } = this.state
    // console.log(formData)
    // console.log(fieldName)
    // console.log(value)
    formData.GeofenceTypeDetail.geofenceTypeData[fieldName] = value
    this.setState({ formData })

    console.log(this.state.formData)
  }

  dropdownChange(fieldName, value, key) {
    //#region  Dropdown change binding condition
    let { formData } = this.state

    // console.log(fieldName)
    // console.log(value)
    // console.log(key)

    switch (fieldName) {
      case "sourceTypeNav":
        formData.GeofenceTypeDetail.geofenceTypeData.sourceTypeNav = value
        formData.GeofenceTypeDetail.geofenceTypeData.sourceTypeNav_value = key
        break;
      case "sourceTypeNav_current":
        formData.GeofenceTypeDetail.geofenceTypeData.sourceTypeNav_current = value
        formData.GeofenceTypeDetail.geofenceTypeData.sourceTypeNav_value_current = key
        break;
      case "partnerName":
        formData.GeofenceTypeDetail.geofenceTypeData.partnerName = value
        formData.GeofenceTypeDetail.geofenceTypeData.partnerName_value = key
        break;
      case "partnerName_current":
        formData.GeofenceTypeDetail.geofenceTypeData.partnerName_current = value
        formData.GeofenceTypeDetail.geofenceTypeData.partnerName_value_current = key
        break;
    }
    //#endregion
    this.setState({ formData: formData })
  }

  submitConfirm() {
    let { formData } = this.state
    console.log("formDataSubmit : ", formData)
    console.log("typeForm: ", this.props.typeForm)

    if (this.props.typeForm === "edit") {
      let data = this.mappingFieldsUpdate(formData.GeofenceTypeDetail);
      console.log("Form Update", data);
      this.props.editGeofenceType(data);
      this.setAlert(true, 6)
    }
    else {
      let data = this.mappingFieldsInsert(formData.GeofenceTypeDetail);
      console.log("Form Insert", data);
      this.props.addGeofenceType(data);
      this.setAlert(true, 6)
    }
  }

  submit(FormData) {
    if (this.state.titleFormType === 'Add') {
      this.setAlert(true, 3, "geofence_type_9")
    }
    else if (this.state.titleFormType === 'Edit') {
      this.setAlert(true, 3, "geofence_type_27")
    }

  }

  // submit(FormData) {

  //   if (this.props.typeForm === "edit") {
  //     // Update Driver
  //     // let data = this.mappingFieldsUpdate(FormData.formData.GeofenceTypeDetail)
  //     let data = this.mappingFieldsUpdate(FormData.formData.GeofenceTypeDetail)
  //     console.log("Form Update", FormData)
  //     // console.log(JSON.stringify(data))
  //     this.props.editGeofenceType(data)
  //   }
  //   else {
  //     // Create new Driver
  //     let data = this.mappingFieldsInsert(FormData.formData.GeofenceTypeDetail)
  //     console.log("Form Insert", data)
  //     this.props.addGeofenceType(data)
  //   }
  // }

  mappingFieldsInsert(FormData) {
    let dt = FormData.geofenceTypeData
    if (dt.iconSource === 1) {
      let data = {
        "partnerTypeNav": {
          "key": this.props.profileUser.intPartnerType,
          // "value": this.props.partnerType
        },
        "partnerNav": {
          "key": parseInt(dt.partnerName),
          // "value": this.props.partnerType
        },
        // "geofenceTypeName": dt.geofenceTypeName,
        // "geofenceTypeDescription": dt.geofenceTypeDescription,
        "name": dt.name,
        "description": dt.description,
        "nameEn": dt.nameEn,
        "descriptionEn": dt.descriptionEn,
        "nameJa": dt.nameJa,
        "descriptionJa": dt.descriptionJa,
        "sourceTypeNav": {
          "key": parseInt(dt.sourceTypeNav),
          // "value": dt.sourceTypeNav
        },
        "isHazard": dt.isHazard,
        "iconSourceNav": {
          "key": dt.iconSource,
        },
        "iconSource": dt.iconSource,
        // "isShare": dt.isShare,
        "isActive": dt.isActive,
      }

      return data

    }
    else if (dt.iconSource === 2 || dt.iconSource === 3) {
      let data = {
        "partnerTypeNav": {
          "key": this.props.profileUser.intPartnerType,
          // "value": this.props.partnerType
        },
        "partnerNav": {
          "key": parseInt(dt.partnerName),
          // "value": this.props.partnerType
        },
        // "geofenceTypeName": dt.geofenceTypeName,
        // "geofenceTypeDescription": dt.geofenceTypeDescription,
        "name": dt.name,
        "description": dt.description,
        "nameEn": dt.nameEn,
        "descriptionEn": dt.descriptionEn,
        "nameJa": dt.nameJa,
        "descriptionJa": dt.descriptionJa,
        "sourceTypeNav": {
          "key": parseInt(dt.sourceTypeNav),
          // "value": dt.sourceTypeNav
        },
        "isHazard": dt.isHazard,
        "iconSourceNav": {
          "key": dt.iconSource,
        },
        "iconSource": dt.iconSource,
        // "isShare": dt.isShare,
        "isActive": dt.isActive,
        "attachCode": dt.iconSource === 2 ? dt.chooseAttachIcon.attachCode : dt.attachCode
      }

      return data
    }

  }

  mappingFieldsUpdate(FormData) {
    let dt = FormData.geofenceTypeData
    if (dt.iconSource === 1) {
      let data = [{
        "partnerTypeNav": {
          "key": parseInt(this.props.profileUser.intPartnerType),
          // "value": this.props.partnerType
        },
        "partnerNav": {
          "key": parseInt(dt.partnerName),
          // "value": this.props.partnerType
        },
        "name": dt.name,
        "description": dt.description,
        "nameEn": dt.nameEn,
        "descriptionEn": dt.descriptionEn,
        "nameJa": dt.nameJa,
        "descriptionJa": dt.descriptionJa,
        // "geofenceTypeName": dt.geofenceTypeName,
        // "geofenceTypeDescription": dt.geofenceTypeDescription,
        "sourceTypeNav": {
          "key": parseInt(dt.sourceTypeNav),
          // "value": dt.sourceTypeNav
        },
        "isHazard": dt.isHazard,
        "iconSourceNav": {
          "key": dt.iconSource,
        },
        // "iconSource": dt.iconSource,
        // "isShare": dt.isShare,
        "isActive": dt.isActive,
      },
      {
        "id": this.props.id
      }]

      return data

    }
    else if (dt.iconSource === 2 || dt.iconSource === 3) {
      let data = [{
        "partnerTypeNav": {
          "key": parseInt(this.props.profileUser.intPartnerType),
          // "value": this.props.partnerType
        },
        "partnerNav": {
          "key": parseInt(dt.partnerName),
          // "value": this.props.partnerType
        },
        "name": dt.name,
        "description": dt.description,
        "nameEn": dt.nameEn,
        "descriptionEn": dt.descriptionEn,
        "nameJa": dt.nameJa,
        "descriptionJa": dt.descriptionJa,
        // "geofenceTypeName": dt.geofenceTypeName,
        // "geofenceTypeDescription": dt.geofenceTypeDescription,
        "sourceTypeNav": {
          "key": parseInt(dt.sourceTypeNav),
          // "value": dt.sourceTypeNav
        },
        "isHazard": dt.isHazard,
        "iconSourceNav": {
          "key": dt.iconSource,
          "value": dt.iconSource === 2 ? "Preset" : "Custome"
        },
        // "iconSource": dt.iconSource,
        // "isShare": dt.isShare,
        "isActive": dt.isActive,
        "attachCode": dt.iconSource === 2 ? dt.chooseAttachIcon.attachCode : dt.attachCode
      },
      {
        "id": this.props.id
      }
      ]

      return data
    }
  }

  handleChange(event) {
    var file = event.target.files[0];
    if (file) {
      var fileReader = new FileReader();
      const scope = this
      fileReader.onload = function (event) {

        let contents = event.target.result;
        scope.props.setDataCsv(contents)
      }
      fileReader.readAsText(file);
    }
  }

  toolBoxCustom() {
    return (
      <div className="ibox-tools">
        <Input type="select" disabled='true' value="">
          <option value="">{!this.props.profileUser.partnerType ? 'โปรดเลือก' : this.props.profileUser.partnerType}</option>
        </Input>
      </div>
    )
  }

  render() {
    let {
      formData, sourceTypeNavList, partnerNav, sourceTypeNavList_current, partnerNav_current, partnerNameList, partnerNameList_current, iconSourceRadio, iconPresentRadio, alert
    } = this.state

    console.log(this.props)
    console.log(this.state.formData)

    // const { component: Component, ...rest } = this.props

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
              this.props.history.push("/geofenceType")
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
        <PannelBox title={t('GeofenceType Form')}>
          <Form
            className="title-form"
            schema={
              setSchema(sourceTypeNavList, partnerNameList, iconSourceRadio, iconPresentRadio)
            }
            uiSchema={uiSchema}
            fields={fields}
            formData={formData}
            onChange={v => this.onFormChange(v)}
            onSubmit={v => this.submit(v)}
            onError={v => console.log(v)}
          >
            <div className="hr-line-dashed" />
            <div className="row" style={{ textAlign: "right" }}>
              <CancelButton
                name={t("geofence_type_23")}
                loading={false}
                onClick={() => {
                  this.props.history.push("/geofenceType")
                }} />
              <SaveButton
                name={t("geofence_type_24")}
                loading={this.props.loading}
              />
            </div>
          </Form>
        </PannelBox>
      </div>

    )
  }
}

const mapStateToProps = (state) => ({
  error: state.geofence.error,
  // groupType: state.signin.groupType,
  // userGroup: state.signin.userGroup,
  // currentUser: state.signin.currentUser,
  language: state.versatile.language,
  isGeofenceType: state.geofence.isGeofenceType,
  sourceType: state.geofence.sourceType,
  isValid: state.formValidate.isValid,
  partnerName: state.geofence.partnerName,
  profileUser: state.signin.profileUser,
  dataLogin: state.signin.dataLogin,
  iconSourceData: state.geofence.iconSourceData,
  iconPresent: state.geofence.iconPresent,
  id: state.geofence.idSelected,
  statusSubmit: state.geofence.statusSubmit,
  action: state.geofence.action,
  geofenceType: state.geofence.geofenceType,
  typeForm: state.geofence.typeForm,
  edit: state.geofence.edit,
  success: state.geofence.success,
  loading: state.geofence.loading,

});
const mapDispatchToProps = (dispatch) => ({
  setData: (typeForm) => dispatch(GeofenceActions.setData(typeForm)),
  getGeofenceType: (data) => dispatch(GeofenceActions.getGeofenceType(data)),
  addGeofenceType: (geofenceType) => dispatch(GeofenceActions.addGeofenceType(geofenceType)),
  // getDropdown: (id) => dispatch(GeofenceActions.getDropdown(id)),
  getPresentIcon: () => dispatch(GeofenceActions.getPresentIcon()),
  editGeofenceType: (data) => dispatch(GeofenceActions.editGeofenceType(data)),
  getSourceType: (id) => dispatch(GeofenceActions.getSourceType(id)),
  // getPartnerName: () => dispatch(GeofenceActions.getPartnerName()),
  idSelected: (typeForm, id) => dispatch(GeofenceActions.idSelected(typeForm, id)),
  submitStatus: (status, ErrorSubcode) => dispatch(GeofenceActions.submitStatus(status, ErrorSubcode)),
  // editGeofenceType: (data) => dispatch(GeofenceActions.editGeofenceType(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GeofenceTypeForm)
