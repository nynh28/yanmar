import React, { Component } from 'react'
import { connect } from 'react-redux'
import GeofenceActions, { reducer } from '../../Redux/GeofenceRedux'
import FormValidateActions from '../../Redux/FormValidateRedux'

import SelectWidget from "../../Components/FormGenerator/widgets/SelectWidget";
import { Col, Row, Button } from 'reactstrap'
import TextAreaWidget from "../../Components/FormGenerator/widgets/TextAreaWidget";
import AudioAnalyser from "react-audio-analyser"

import PannelBox from '../../Components/PannelBox'
import FormGenerator from '../../Components/FormGenerator/Form'
import { formValidation } from "../../Components/FormGenerator/validate";
import { resetForm } from "../../Components/FormGenerator/resetForm";
// import MapDraw from "./MapDraw"

import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'

class PromotionForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      titleFormType: "",
      loading: false,
      select: [],
      datas: [],
      coordinate: [],
      geomType: null,
      radius: null,
      data: {
        // type: null,
        id: 0,
        partnerId: 0,
        partnerType: 0,
        geofenceType: 0,
        geomType: null,
        radius: 0,
        isDohHazard: null,
        geofenceName: null,
        geofenceDescription: null,
        coordinate: [],
        locationId: 0,
        iconAttachId: 0,
        dohHazardId: 0,
        isShare: null,
        activeStatus: null
      },

      formInfo: {
        "title": "Promotion",
        "showHeaderTitle": false,
        "formName": "propmotion",
        "girdFormColumn": 2,
        "setDisabledField": false,
        "disabledField": ['id', 'c_id'],
        "fieldRow": [
          {
            "properties": {
              "geofenceName": {
                "type": "text",
                "title": "ชื่อ Promotion",
                "value": "",
                "required": true,
              },
            //   "geofenceDescription": {
            //     "type": "text",
            //     "title": "รายละเอียด Geofence",
            //     "value": "",
            //     "required": true,
            //   },
            }
          },
          {
            "properties": {
              "geofenceType": {
                "type": "date",
                "title": "วันที่เริ่มต้น promotion",
                "value": "",
                // "selectOption": this.props.geofenceType,
                "required": true,
              },
              "isDohHazard": {
                "type": "date",
                "title": "วันที่สิ้นสุด promotion",
                "value": "",
                // "radioButton": [
                //   {
                //     "checked": false,
                //     "value": true,
                //     "name": "ใช่"
                //   },
                //   {
                //     "checked": false,
                //     "value": false,
                //     "name": "ไม่ใช่"
                //   }
                // ],
                "required": true,
              },
            }
          },
          {
            "properties": {
              "dealerLocationRequire": {
                "type": "radio",
                "title": "ระบุที่อยู่ dealer",
                "required": true,
                "radioButton": [
                  {
                    "checked": false,
                    "value": true,
                    "name": "ใช่"
                  },
                  {
                    "checked": false,
                    "value": false,
                    "name": "ไม่ใช่"
                  }
                ]
              },
              "dealerClientOnly": {
                "type": "radio",
                "title": "ตัวแทนจำหน่ายเท่านั้น",
                "required": true,
                "radioButton": [
                  {
                    "checked": false,
                    "value": true,
                    "name": "ใช่"
                  },
                  {
                    "checked": false,
                    "value": false,
                    "name": "ไม่ใช่"
                  }
                ]
              },
            },
          },
          {
            "properties": {
              "textOrVoice": {
                "type": "radio",
                "title": "ชนิดข้อความ",
                "required": true,
                "radioButton": [
                  {
                    "checked": false,
                    "value": true,
                    "name": "ตัวอักษรและรูปภาพ"
                  },
                  {
                    "checked": false,
                    "value": false,
                    "name": "ข้อความเสียง"
                  }
                ]
              },
            },
          },
        ]
      },
      isUpload: null
    }
  }


  componentDidMount() {
    // this.props.getGeofenceType()
    console.log("ID SELECTED : " + this.props.idSelected)
    window.scrollTo(0, 0);
    if (this.props.idSelected != null) {
      // this.props.infoVehicle(this.props.idSelected)
      this.setState({ titleFormType: "Edit" })
    }
    else {
      this.setState({ titleFormType: "Add" })
    }

    if (this.props.typeForm == null) {
      console.log("idselected not null")
      this.props.setData('add', {})
      // console.log.
      // this.props.infoVehicle(this.props.idSelected)
      // this.setState({ titleFormType: "Edit" })
    }
  }


  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.formInfo)
    // console.log(this.props.geofence)
    // console.log(this.prevProps)
    // console.log(this.prevState)
    if (prevProps.typeForm !== this.props.typeForm) {
      if (this.props.typeForm === null) {
        this.props.history.push("promotion")
      }
    }

    // if (this.props.geofenceType.length !== this.state.select.length){
      // this.state.formInfo.fieldRow[1].properties.geofenceType.selectOption = this.props.geofenceType
    // //   var type = []
    // //   this.props.geofenceType.forEach((i) => {
    // //     console.log(i)
    // //     type.push(JSON.stringify({"value": i.id, "name": i.geofenceName}))
    // //   })
    // //   console.log(type)
    // //   console.log(this.state.select.length == 0)
      // this.setState({select: this.props.geofenceType})  
    // }
      // console.log(this.state.select)
  }
  

  componentWillMount() {
    console.log("_____componentWillMount______")
  }

  // shouldComponentUpdate(nextProps, nextState, nextContext) {
  //   console.log(nextProps.geofenceType)
  //   console.log(nextState.geofenceType)
  //   // return this.state.select == null
  //   // return this.state.geofenceType !== this.props.geofenceType || this.state.geofenceType !== nextProps.geofenceType || this.state.geofenceType !== nextProps.geofenceType
  // }

  onClickSubmit() {
    this.props.setErrorList(true)

    // Form Validate
    let formData = formValidation([this.state.formInfo])

    console.log(">>>> FORM DATA <<<<<<")
    console.log(this.props.typeForm)
    console.log(formData)

    // Set Form Data
    for (let props in this.state.data) {
      let value = formData[props]
      if (value == undefined) value = ""
      this.state.data[props] = value
      if (props == "isShare" || props == "isDohHazard") {
        this.state.data[props] = (value == "true")
      }
      else if (props == "iconAttachId" || props == "locationId" || props == "dohHazardId" || props == "geofenceType"){
        this.state.data[props] = Number(value)
      }
    }

    this.state.data['id'] = 0
    this.state.data['partnerId'] = 0
    this.state.data['partnerType'] = 0
    this.state.data['dohHazardId'] = 0
    this.state.data['geomType'] = this.state.geomType
    this.state.data['radius'] = this.state.radius
    this.state.data['coordinate'] = this.state.coordinate

    this.state.datas.push(this.state.data)

    setTimeout(() => this.submitData(), 500)
  }

  submitData() {
    if (this.props.isValid && this.state.data.geomType) {
      if (this.state.geomType == 'circle' && this.state.data['radius'] !== 0 && this.state.data['coordinate'] !== null) {
        this.props.typeForm === 'add' ? this.props.addGeofence(this.state.datas) : this.updataData()
        console.log('add raius')
        console.log(this.state.datas)
      }
      else if (this.state.geomType == 'polygon' || this.state.geomType == 'polyline' && this.state.data['radius'] === 0 && this.state.data['coordinate'] !== null) {
        this.props.typeForm === 'add' ? this.props.addGeofence(this.state.datas) : this.updataData()
        console.log('add polygon or polyline')
        console.log(this.state.datas)
      }
      else {
        this.setState({ loading: false })
        console.log('error')
      }
      // this.updataData()
    }
    else {
      console.log('error')
      this.setState({ loading: false })
    }
  }

  updataData() {
    let { data } = this.state
    let { geofence } = this.props

    console.log(">> UPDATA DATA <<")
    console.log(data)
    console.log(geofence)

    let updateGeofence = []

    for (let name in data) {

      if (geofence[name] != undefined) {
        if (data[name] != geofence[name]) {
          updateGeofence.push({ "op": "replace", "path": "/" + name, "value": data[name] })
        }
      }
    }
    console.log(">> UPDATE CHANGE ONLY <<")
    console.log(updateGeofence)
    if (updateGeofence.length > 0) {
      let geofence = {
        id: updateGeofence.id,
        array: updateGeofence
      }


      console.log(geofence)
      this.props.editGeofence(geofence)
      //  setTimeout(() => this.props.history.push("truck"), 500)
      this.setState({ loading: false })
    }
    else {
      alert("ไม่มีข้อมูลเปลี่ยนแปลง")
      this.setState({ loading: false })
    }
  }

  getPathsPolygon(polygon) {
    var coordinates = (polygon.getPath().getArray());
    var data = []

    coordinates.forEach( i=> data.push({lat : i.lat(), lng: i.lng()}) );

    this.setState({geomType: 'polygon', coordinate: data, radius: 0})
    console.log(this.state.geomType)
    console.log(this.state.coordinate)
    console.log(this.state.radius)
  }
  
  getPathsPolyline(polyline) {
    var coordinates = (polyline.getPath().getArray());
    console.log(polyline.getPath().getArray());
    // console.log(coordinates[0].lat());
    var data = []
    coordinates.forEach( (i)=> {
      // console.log(i)
      data.push({lat : i.lat(), lng: i.lng()})
    });
    this.setState({geomType: 'polyline', coordinate: data, radius: 0})
    console.log(this.state.geomType)
    console.log(this.state.coordinate)
    console.log(this.state.radius)
  }

  getPathsCircle(circle) {
    var coordinates = (circle.getCenter());
    var radius = (circle.getRadius())
    // var data = [{lat: coordinates.lat(), lng: coordinates.lng()}]
    // console.log(radius)
    // console.log(coordinates);
    // this.state.coordinate.push({lat: coordinates.lat(), lng: coordinates.lng()})
    // this.state.radius = radius
    this.setState({geomType: 'circle', coordinate: [{lat: coordinates.lat(), lng: coordinates.lng()}], radius: radius})
    console.log(this.state.geomType)
    console.log(this.state.coordinate)
    console.log(this.state.radius)

  }

  getPathsRectangle(rectangle) {
    var coordinates = {
      center: {
        lat: rectangle.getMap().center.lat(),
        lng: rectangle.getMap().center.lng()
      },
      bounds: {
        north: rectangle.getBounds().Za.i,
        south: rectangle.getBounds().Za.j,
        east: rectangle.getBounds().Ua.j,
        west: rectangle.getBounds().Ua.j,
      }
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

  render() {
    const { component: Component, ...rest } = this.props
    const { status, audioSrc } = this.state;
    const audioProps = {
        audioType: "audio/wav", // Temporarily only supported audio/wav, default audio/webm
        status, // Triggering component updates by changing status
        audioSrc,
        startCallback: (e) => {
          console.log("succ start", e)
        },
        pauseCallback: (e) => {
          console.log("succ pause", e)
        },
        stopCallback: (e) => {
          this.setState({
            audioSrc: window.URL.createObjectURL(e)
          })
          console.log("succ stop", window.URL.createObjectURL(e))
  
          // var c = new Client();
          // c.on('ready', function () {
          //   c.put(window.URL.createObjectURL(e), '/VOICE_BC/sound1.wav', function (err) {
          //     if (err) throw err;
          //     c.end();
          //   });
          // });
          // connect to localhost:21 as anonymous
          // c.connect({
          //   host: '61.19.242.71',
          //   port: 21,
          //   user: 'r10v2',
          //   password: 'onelink@2012',
  
          // });
          // const Ftp = new jsftp({
          //   host: "61.19.242.71",
          //   port: 21, // defaults to 21
          //   user: "r10v2", // defaults to "anonymous"
          //   pass: "onelink@2012" // defaults to "@anonymous"
          // });
        }
      }
    return (
      <PannelBox title={this.state.titleFormType + ' Geofence'} {...rest}>
        <div>
          <Row>
            <Col lg={12}>
              {/* { this.props.geofenceType.length !== 0 ? <FormGenerator schema={this.state.formInfo}  {...rest} /> : <div/>} */}
              <FormGenerator schema={this.state.formInfo}  {...rest} />
              {this.state.formInfo.fieldRow[3].properties.textOrVoice.radioButton.value == true ? <TextAreaWidget type='textare' length={255} /> : <AudioAnalyser {...audioProps}>
          <div className="btn-box">
            {
              status !== "recording" &&
              <button onClick={() => this.controlAudio("recording")}>record</button>
            }
            {
              status === "recording" &&
              <button onClick={() => this.controlAudio("paused")}>pause</button>
            }
              <button onClick={() => this.controlAudio("inactive")}>stop</button>
          </div>
        </AudioAnalyser>}
            </Col>
            {/* <SelectWidget
                          type={'select'}
                          name={'ประเภท geofence'}
                          required={true}
                          // value={item.properties[propsName].value}
                          selectOption={this.state.select}/> */}
          </Row>
          {/* <Row> */}
            {/* <Col lg={12}>

              <MapDraw getPathsPolygon={(e) => this.getPathsPolygon(e)} getPathsPolyline={(e) => this.getPathsPolyline(e)} getPathsCircle={(e) => this.getPathsCircle(e)}>
              </MapDraw> */}
              {/* <FormGenerator schema={this.state.formInfo}  {...rest} /> */}
              
            {/* </Col> */}
          {/* </Row> */}
          <div style={{ minHeight: '1rem' }}></div>

          <div className="hr-line-dashed" />
          <Row>
            <div className="pull-left">
              <Button className="btn btn-warning" style={{ marginRight: 10 }} size="md" onClick={() => {
                //  this.setState({ loading: true })

                // resetForm([this.state.formInfo])
              }}  >{this.props.typeForm === "add" ? "Clear" : "Reset"}</Button>
              
            </div>
            <div className="pull-right">
              <CancelButton loading={false} onClick={() => {
                this.setState({ loading: true })
                this.props.history.push("promotion")
              }} />

              <SaveButton loading={this.props.loading} onClick={() => {
                this.setState({ loading: true })
                // this.onClickSubmit()
              }} />
            </div>
          </Row>
        </div>
      </PannelBox>
    )
  }
}

const mapStateToProps = (state) => ({
    error: state.geofence.error,
    // groupType: state.signin.groupType,
    // userGroup: state.signin.userGroup,
    currentUser: state.signin.currentUser,
    isValid: state.formValidate.isValid,
    // businessPartnerId: state.signin.businessPartnerId,
    // partnerId: state.signin.partnerId,
    // partnerTypeName: state.signin.partnerTypeName,
    idSelected: state.geofence.idSelected,
    typeForm: state.geofence.typeForm,
    geofence: state.geofence.geofence,
    geofenceType: state.geofence.geofenceType,
    success: state.geofence.success,
    loading: state.geofence.loading,


});
const mapDispatchToProps = (dispatch) => ({
    setData: (typeForm) => dispatch(GeofenceActions.setData(typeForm)),
    setErrorList: (data) => dispatch(FormValidateActions.setErrorList(data)),
    // addGeofence: (geofence) => dispatch(GeofenceActions.addGeofence(geofence)),
    // editGeofence: (geofence) => dispatch(GeofenceActions.editGeofence(geofence)),
    // getGeofenceType: () => dispatch(GeofenceActions.getGeofenceType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PromotionForm)
