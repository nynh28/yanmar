
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import UserActions from '../../Redux/UserRedux'
// import DropdownActions from '../../Redux/DropdownRedux'
import PannelBox from '../../Components/PannelBox'
import Form from "react-jsonschema-form"
import { setSchemaJob } from './Form/schema.js'
import JobData from "./Form/Fields/JobData"
import { diff } from 'json-diff';
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'
import './Form/styles.css'
import { get } from 'lodash'
import moment from 'moment'
import {
  Col, Row, ListGroup, ListGroupItem, Input, Button, Table, FormGroup, Label
} from 'reactstrap'
import {
  GoogleMap, LoadScript, Marker, Polyline, Autocomplete, DirectionsService, DirectionsRenderer
} from '@react-google-maps/api'


// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CustomTitleField = () => { return '' }

export const fields = {
  TitleField: CustomTitleField,
  basicData: JobData
}

export const uiSchema = {
  UserDetail: {
    basicData: {
      "ui:field": "basicData"
    }
  }
}

class JobForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      centerDefault: { lat: 13.784998, lng: 100.611255 },
      loading: false,
      formData: {
        UserDetail: {
          basicData: {
            jobId: '',
            license: '',
            license_value: '',
            typeWork: '',
            typeWork_value: '',
            typeTrip: '',
            typeTrip_value: '',
            deliveryDay: '',
            deliveryDay_value: '',
            typeVehicle: '',
            typeVehicle_value: '',
            date: '',
            path: '',
            path_value: '',
            station: '',
            station_value: '',
            timeToStation: '',
            timeStay: '',


          }
        }
      },
      licenseList: [],
      typeWorkList: [],
      typeTripList: [],
      deliveryDayList: [],
      typeVehicleList: [],
      pathList: [],
      stationList: [],
      Direction: [
        {
          placeName: "NODE A",
          location: { lat: 13.785405, lng: 100.610538 }
        },
        {
          placeName: "NODE B",
          location: { lat: 13.784393, lng: 100.608450 }
        },
        {
          placeName: "NODE C",
          location: { lat: 13.780647, lng: 100.607408 }
        }
      ],
    }
  }


  componentWillMount() {

  }

  componentWillUnmount() {


  }

  componentDidUpdate(prevProps, prevState) {
    // let { formData } = this.state
    // let { UserLevelOwnerData } = this.props

    // if (prevProps.UserLevelOwnerData !== UserLevelOwnerData) {
    //   this.setState({ userLevelNavList: this.renameKey(UserLevelOwnerData) })
    // }
  }

  renameKey(data) {
    let result = []
    for (let index in data) result.push({ label: data[index].value, value: data[index].key })
    return result
  }

  onFormChange(v) {
    let diffValue = get(diff(this.state.formData, v.formData), 'UserDetail.basicData', undefined)
    if (diffValue === undefined) return

    //#region  Update state.formData
    let objects = Object.getOwnPropertyNames(diffValue)
    // for (let index in objects) {
    //   this.bindingData("" + objects[index], diffValue["" + objects[index]]["__new"])
    // }
  }
  // //#endregion


  bindingData(fieldName, value) {
    let { formData } = this.state
    formData.UserDetail.basicData[fieldName] = value
    this.setState({ formData })
  }


  submit(FormData) {
  }

  mappingFieldsInsert(FormData) {
    let dt = FormData.basicData
    let data = {
      "prefix": dt.prefix_value,
      "name": dt.name,
    }

    return data
  }

  mappingFieldsUpdate(FormData) {
    let dt = FormData.basicData
    let data = {
      "prefix": dt.prefix_value,
      "name": dt.name,
    }
    return data
  }

  render() {
    let { formData, licenseList, typeWorkList, typeTripList, deliveryDayList, typeVehicleList, pathList, stationList } = this.state

    const log = (type) => console.log.bind(console, type);

    return (
      <Row>
        <Col lg="6">
          <PannelBox title={'Job'}>
            <Form
              className="title-form"
              schema={
                setSchemaJob(licenseList, typeWorkList, typeTripList, deliveryDayList, typeVehicleList, pathList, stationList)
              }
              uiSchema={uiSchema}
              fields={fields}
              formData={formData}
              onChange={v => this.onFormChange(v)}
              onSubmit={v => this.submit(v)}
              onError={log("errors")}
            >
              <div className="hr-line-dashed" />
              <div className="row" style={{ textAlign: "right" }}>
                <CancelButton
                  loading={false}
                  onClick={() => {
                    this.props.history.push("/job")
                  }} />
                <SaveButton
                  loading={this.props.loading}
                />
              </div>
            </Form>


            <br />
            <Table hover bordered striped={false} responsive>
              <thead>
                <tr>
                  <th>Place</th>
                  <th>location</th>
                  <th style={{ width: '10%' }}></th>
                </tr>
              </thead>
              <tbody>

                {this.state.Direction.map((obj, index) => {
                  return (
                    <tr>
                      <td>{obj.placeName}</td>
                      <td>{obj.location.lat}, {obj.location.lng}</td>
                      <td>
                        {/* <button onClick={() => this.onRemoveItem(obj.id)}>Delete</button> */}
                        <Button color="danger">Delete</Button>
                      </td>
                    </tr>
                  );
                })
                }
              </tbody>
            </Table>
            {/* เวลาที่ใช้ในการจัดส่ง - ชั่วโมง */}
          </PannelBox>
        </Col>

        <Col lg="6">
          <div className="ibox float-e-margins">
            <div className="ibox-title" style={{ paddingBottom: 0 }}>
              <h3 style={{ fontWeight: 'bold', fontSize: 22 }}>Map</h3>
              <div className="ibox-tools">
              </div>
              <div className="ibox-content" style={{ padding: 0 }}>
                <Row style={{ paddingTop: 5 }}>
                  <Col lg="12" style={{ padding: 0 }}>
                    <LoadScript id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=places"}>
                      <GoogleMap
                        onLoad={map => { this.map = map }}
                        // zoom={this.state.zoomDefault}
                        zoom={15}
                        mapContainerStyle={{
                          width: '100%',
                          minHeight: '500px',
                          height: '100%'
                        }}
                        isableDefaultUI={true}
                        center={this.state.centerDefault}
                        //   onDragEnd={this.onCenterChange.bind(this)}
                        mapContainerClassName={"map"}
                        id='event-map'
                        options={{
                          zoomControl: true,
                          streetViewControl: false,
                          fullscreenControl: true,
                          mapTypeControl: false,
                        }}
                      >

                        {this.state.isRunDirection &&
                          <DirectionsService
                            // required
                            options={{
                              origin: { lat: 13.785405, lng: 100.610538 },
                              destination: { lat: 13.787185, lng: 100.607335 },
                              travelMode: this.state.travelMode,
                              waypoints: [
                                {
                                  location: { lat: 13.784393, lng: 100.608450 },
                                  stopover: true
                                },
                                {
                                  location: { lat: 13.780647, lng: 100.607408 },
                                  stopover: true
                                }
                              ]
                            }}

                            // required
                            callback={this.directionsCallback}
                            // optional
                            onLoad={directionsService => {
                              console.log('DirectionsService onLoad directionsService: ', directionsService)
                            }}
                            // optional
                            onUnmount={directionsService => {
                              console.log('DirectionsService onUnmount directionsService: ', directionsService)
                            }}
                          />
                        }

                        {
                          this.state.response !== null && (
                            <DirectionsRenderer
                              // required
                              options={{
                                directions: this.state.response
                              }}
                              // optional
                              onLoad={directionsRenderer => {
                                console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                              }}
                              // optional
                              onUnmount={directionsRenderer => {
                                console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                              }}
                            />
                          )
                        }
                      </GoogleMap>
                    </LoadScript>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </Col>

      </Row>
    )
  }
}

const mapStateToProps = (state) => ({
  // UserLevelOwnerData: state.dropdown.UserLevelOwnerData,
});
const mapDispatchToProps = (dispatch) => ({
  // getDataDropdown: (optionGroup, key) => dispatch(DropdownActions.getDataDropdown(optionGroup, key))
});

export default connect(mapStateToProps, mapDispatchToProps)(JobForm)
