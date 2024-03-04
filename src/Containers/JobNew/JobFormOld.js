import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import PannelBox from '../../Components/PannelBox'
import {
  Col, Row, ListGroup, ListGroupItem, Input, Button, Table, FormGroup, Label
} from 'reactstrap'

import FormGenerator from '../../Components/FormGenerator/Form'
import { formValidation } from "../../Components/FormGenerator/validate";
import SaveButton from '../../Components/SaveButton'
import CancelButton from '../../Components/CancelButton'

// Import Search Bar Components
// import SearchBar from 'material-ui-search-bar';

// Import React Scrit Libraray to load Google object
// import Script from 'react-load-script';

// import Autocomplete from '@material-ui/lab/Autocomplete';


import {
  GoogleMap, LoadScript, LoadScriptNext, Marker, Polyline, Autocomplete, DirectionsService, DirectionsRenderer
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

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


class JobForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      centerDefault: { lat: 13.784998, lng: 100.611255 },
      jobRoute: [
        { lat: 13.784998, lng: 100.611255 },
        { lat: 13.785122, lng: 100.611034 },
        { lat: 13.785337, lng: 100.610651 },
        { lat: 13.785587, lng: 100.610222 },
        { lat: 13.785756, lng: 100.609901 },
        { lat: 13.786093, lng: 100.609279 },
        { lat: 13.780547, lng: 100.607822 }
      ],
      city: '',
      query: '',
      inputPlaces: '',
      response: null,
      travelMode: 'DRIVING',
      origin: '',
      destination: '',
      isRunDirection: false,
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
      form: {
        "title": "Form",
        "showHeaderTitle": false,
        "formName": "Form",
        "girdFormColumn": 1,
        "fieldRow": [
          {
            "properties": {
              "jobName": {
                "type": "string",
                "title": "Name",
                "required": true
              }
            }
          },
          {
            "properties": {
              "jobType": {
                "type": "select",
                "title": "Type",
                "required": true,
                "selectOption": [
                  {
                    "value": "001",
                    "name": "Type 01"
                  },
                  {
                    "value": "002",
                    "name": "Type 02"
                  },
                  {
                    "value": "003",
                    "name": "Type 03"
                  }
                ]
              }
            }
          }
        ]
      },
      files: [
        // {
        //   source: "index.html",
        //   options: {
        //     type: "local"
        //   }
        // }
      ]
    }
    this.handleChange = this.handleChange.bind(this);

    this.inputPlaces = React.createRef();

    this.autocomplete = null

    this.onLoad = this.onLoad.bind(this)
    this.onPlaceChanged = this.onPlaceChanged.bind(this)

    this.searchPlaces = this.searchPlaces.bind(this)

    this.directionsCallback = this.directionsCallback.bind(this)
  }
  handleChange(event) {

    this.setState({ inputPlaces: event.target.value });
  }


  // onPlacesChanged() {
  //   console.log(this.searchBox.getPlaces());
  // }

  //////////////////////////////////////////////////
  onLoad(autocomplete) {
    console.log(">> autocomplete <<")
    console.log(autocomplete)
    //  console.log('autocomplete: ', autocomplete)



    this.autocomplete = autocomplete
  }

  onPlaceChanged() {

    console.log(">> onPlaceChanged <<")

    if (this.autocomplete !== null) {
      console.log(this.autocomplete.getPlace())

      console.log(this.autocomplete.getPlace().geometry.location.lat() + ',' + this.autocomplete.getPlace().geometry.location.lng())

      // console.log(JSON.stringify(this.autocomplete.getPlace()))
    } else {
      console.log('Autocomplete is not loaded yet!')
    }
  }

  searchPlaces() {
    console.log(">> searchPlaces <<")
    console.log("INPUT : " + this.state.inputPlaces)
    //console.log(this.autocomplete.getPlace())
    //console.log(JSON.stringify(this.autocomplete.getPlace()))

    //console.log(this.autocomplete)
    // console.log(this.autocomplete.getPlace())

    // var defaultBounds = new google.maps.LatLngBounds(
    //   new google.maps.LatLng(-33.8902, 151.1759),
    //   new google.maps.LatLng(-33.8474, 151.2631));

    // // var searchBox = new google.maps.places.SearchBox(this.state.inputPlaces, {
    // //   bounds: defaultBounds
    // // });
    // // var searchBox = new google.maps.places.SearchBox(this.state.inputPlaces);
    // let searchBox = new google.maps.places.Autocomplete(this.state.inputPlaces);
    // searchBox.addListener('places_changed', searchBox.getPlaces());

    // const options = {
    //   types: ['(cities)'],
    // };

    // // Initialize Google Autocomplete
    // /*global google*/ // To disable any eslint 'google not defined' errors
    // let autocomplete = new google.maps.places.Autocomplete(
    //   this.state.inputPlaces,
    //   options,
    // );

    // // Avoid paying for data that you don't need by restricting the set of
    // // place fields that are returned to just the address components and formatted
    // // address.
    // autocomplete.setFields(['address_components', 'formatted_address']);

    // const addressObject = autocomplete.getPlace();
    // console.log(addressObject)
    //console.log(searchBox.getPlaces())
  }

  //////////////////////////////////////////////////

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ['(cities)'],
    };

    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'),
      options,
    );

    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(['address_components', 'formatted_address']);

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);

  }

  handlePlaceSelect = () => {

    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name,
          query: addressObject.formatted_address,
        }
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {

  }


  componentDidMount() {

  }
  //---------- Direction Service ---------------
  directionsCallback(response) {
    console.log(response)

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
      } else {
        console.log('response: ', response)
      }
    }
  }


  //------------------------------------------------


  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  render() {


    const { component: Component, ...rest } = this.props
    return (
      <Row>
        <Col lg="6">
          <PannelBox title={'Job'} {...rest}>
            <div className="contrainner">

              {/* <LoadScript id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=places"}>
                <Autocomplete
                  onLoad={this.onLoad}
                  onPlaceChanged={this.onPlaceChanged}
                >
                  <Input
                    type="text"
                    placeholder="Customized your placeholder"
                  />
                </Autocomplete>
              </LoadScript> */}

              {/* <FormGenerator schema={this.state.form} /> */}

              <div className="form-horizontal">
                <Row>
                  {/* <FilePond
                    ref={ref => (this.pond = ref)}
                    files={this.state.files}
                    allowMultiple={true}
                    maxFiles={3}
                    server="https://api-center.onelink-iot.com/v1.0.0/api/ecm/files/temp"
                    // server="/api"
                    oninit={() => this.handleInit()}
                    onupdatefiles={fileItems => {
                      // Set currently active file objects to this.state
                      this.setState({
                        files: fileItems.map(fileItem => fileItem.file)
                      });
                    }}
                  /> */}
                </Row>
                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <Label lg="2" className="control-label">Name :</Label>
                      <Col lg="10">
                        <Input
                          id="fullName"
                          name="contact"
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <Label lg="2" className="control-label">Type :</Label>
                      <Col lg="10">
                        <Input
                          type="select"
                          id="fullName"
                          name="contact"
                        >
                          <option value={'01'}>Type 1</option>
                          <option value={'02'}>Type 2</option>
                          <option value={'03'}>Type 3</option>
                          <option value={'04'}>Type 4</option>
                        </Input>
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <Label lg="2" className="control-label">Place :</Label>
                      <Col lg="10">
                        <Input
                          id="fullName"
                          name="contact"
                          placeholder="Customized your placeholder"
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                </Row>
              </div>

              {/* <Row>
                <Col lg={12}>
                  <LoadScript id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=places"}>
                    <Col lg={10}>
                      <Input
                        type="text"
                        placeholder="Customized your placeholder"
                        value={this.state.inputPlaces}
                        onChange={this.handleChange}
                      />
                    </Col>
                    <Col lg={2}>
                      <Button color="info" onClick={() => this.searchPlaces()}>OK</Button>
                    </Col>
                  </LoadScript>
                </Col>
              </Row> */}


              <div className="hr-line-dashed" />
              {/* <ListGroup>
                <ListGroupItem>Cras justo odio</ListGroupItem>
                <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                <ListGroupItem>Morbi leo risus</ListGroupItem>
                <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                <ListGroupItem>Vestibulum at eros</ListGroupItem>
              </ListGroup> */}
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
                          <Button color="danger">ลบ</Button>
                        </td>
                      </tr>
                    );
                  })
                  }
                </tbody>
              </Table>
            </div>

            <div className="hr-line-dashed" />
            <div className="row" style={{ textAlign: "right" }}>
              <CancelButton loading={false} onClick={() => {
                //  this.setState({ loading: true })
                this.props.history.push("/job")
              }} />
            </div>
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
                    <LoadScriptNext id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A&libraries=places"}>
                      <GoogleMap
                        onLoad={map => { this.map = map }}
                        // zoom={this.state.zoomDefault}
                        zoom={15}
                        mapContainerStyle={{
                          width: '100%',
                          height: '500px'
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
                    </LoadScriptNext>
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

  // data: state.login.data
});

const mapDispatchToProps = (dispatch) => ({

  // setTest: test => dispatch(PopupActions.setTest(test))
});


export default connect(mapStateToProps, mapDispatchToProps)(JobForm)
