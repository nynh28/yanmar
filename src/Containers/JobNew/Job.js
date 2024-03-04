import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import DataGrid, { Texts, Column, FilterRow, HeaderFilter, SearchPanel, Grouping, GroupPanel, Paging, Export, Selection, MasterDetail, Editing } from 'devextreme-react/data-grid';
import {
  Row, Label, Col, Form, Input, FormGroup, Button
} from 'reactstrap'
import { GoogleMap, LoadScript, Marker, Polyline, OverlayView, MarkerClusterer, DirectionsService, DirectionsRenderer } from '@react-google-maps/api'

import jobMock from './mock'


class Job extends Component {

  constructor(props) {
    super(props)

    this.state = {
      renderMarker: false,
      isShowMarker: false,
      locationMarker: { lat: null, lng: null },
      centerDefault: { lat: 13.786377, lng: 100.608755 },
      zoomDefault: 5,
      course: 0,
      dO: [],
      newdO: [],

      selectMarker: {},

      response: null,
      renderDirection: false

    }

    this.selectJob = this.selectJob.bind(this);
    this.selectPlace = this.selectPlace.bind(this);
    this.directionsCallback = this.directionsCallback.bind(this)


  }


  componentDidUpdate(prevProps, prevState) {
    if (prevState.dO !== this.state.dO) {
      this.setState({ renderDirection: true })
    }

  }

  componentDidMount() {

  }

  onClickAdd() {
    this.props.history.push("/job/planForm")
    // this.props.setData('add')
  }

  onCenterChange() {
    if (this.map !== undefined) this.setState({ lat: this.map.getCenter().lat(), lng: this.map.getCenter().lng() })
  }

  selectJob({ selectedRowsData }) {
    // let dO = []
    // // this.state.dO.length = 0
    // this.setState({ dO: [] })
    // if (selectedRowsData.length > 0) {
    //   let newdO = [...selectedRowsData[0].dO]
    //   this.setState({ newdO })
    // }

    let dO = selectedRowsData.length > 0 ? [...selectedRowsData[0].dO] : []
    this.setState({ dO })
    this.fitBounds(dO)
    this.setState({ selectMarker: {} })
  }

  // componentDidUpdate(prevState) {
  //   if (prevState.newdO !== this.state.newdO) {
  //     this.setState({ dO: this.state.newdO })
  //   }

  // }

  fitBounds(dO) {
    const bounds = new window.google.maps.LatLngBounds();

    this.state.dO.map(item => {
      bounds.extend({ lat: item.lat, lng: item.lng });
    });

    this.map.fitBounds(bounds);
  };

  selectPlace({ selectedRowsData }) {
    let { selectMarker } = this.state


    if (selectedRowsData.length > 0) {
      let { namePlace, lat, lng } = selectedRowsData[0]
      selectMarker.name = namePlace
      selectMarker.center = { lat, lng }
      this.setState(prevState => prevState)
    } else {
      this.setState({ selectMarker: {} })
    }

  }

  markerMap(item) {

    return (
      <Marker
        position={{ lat: item.lat, lng: item.lng }}
        title={item.namePlace}
      // onClick={() => {
      //   this.onClickMarker(this.state.locationMarker)
      // }}
      />
    )
  }

  directionsCallback(response) {
    console.log(response)
    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(
          () => ({
            response
          })
        )
        this.setState({ renderDirection: false })
      } else {
        console.log('response: ', response.status)
      }
    }
  }

  setDirectionsService() {
    console.log('---------- setDirectionsService ----------')
    let { dO } = this.state
    let waypoints = []
    if (dO.length > 2) {
      for (let i = 1; i < dO.length - 1; i++) {
        waypoints.push({
          location: dO[i].lat + ',' + dO[i].lng,
          stopover: true
        })
      }
    }
    console.log(waypoints)
    return (
      <DirectionsService
        // required
        options={{
          origin: dO[0].lat + ',' + dO[0].lng,
          destination: dO[dO.length - 1].lat + ',' + dO[dO.length - 1].lng,
          waypoints: waypoints,
          travelMode: 'DRIVING'
        }}
        // required
        callback={this.directionsCallback}

      />
    )
  }




  displayIndex(object) {
    console.log('displayIndex ----------->>', object)
    return object.rowIndex + 1
  }

  render() {
    return (
      // <div className="contrainner">
      <div className="form-horizontal" >
        <Row>
          {/* <Col lg="6"> */}
          <Col lg="12">
            <div className="ibox float-e-margins">
              <div className="ibox-content" style={{ paddingLeft: 35, paddingRight: 35, borderWidth: ' 4px 0px 0px ', borderColor: '#e7eaec' }}>
                <Row style={{ textAlign: "right", marginTop: 5, marginBottom: 5 }}>
                  <Button className="btn btn-primary btn-sm" onClick={() => this.onClickAdd()}><i className="fa fa-plus"></i>{' '}Add</Button>
                </Row>

                <Row>
                  <DataGrid id={'gridContainer'}
                    // selection={{ mode: 'single' }}
                    ref={this.dataGrid}
                    dataSource={jobMock}
                    keyExpr={'id'}
                    showBorders={true}
                    allowColumnReordering={true}
                    onContentReady={this.detectContentReady}
                    onSelectionChanged={this.selectJob}
                  //   onInitialized={this.onInitialized}
                  // selection={{ mode: 'single' }}
                  >
                    <GroupPanel visible={true} />
                    {/* <Grouping autoExpandAll={this.state.autoExpandAll} /> */}
                    <Paging defaultPageSize={15} />

                    {/* <Editing
                        mode={'window'}
                        useIcons="plus"

                        allowDeleting={true}
                        allowUpdating={true}>

                      </Editing> */}

                    <FilterRow visible={false} />
                    <HeaderFilter visible={false} />
                    <SearchPanel visible={true}
                      width={240}
                      placeholder={'Search...'} />
                    <Export enabled={true} fileName={'TEST'} allowExportSelectedData={true} />
                    <Selection mode={'multiple'} />
                    {/* <Selection mode={'single'} /> */}

                    <Column dataField={'name'} minWidth={120} />
                    <Column dataField={'type'} minWidth={80} />

                  </DataGrid>
                </Row>
              </div>
            </div>
          </Col>
          {/* <Col lg="6">
            <div className="ibox float-e-margins">
              <div className="ibox-title" style={{ paddingBottom: 0 }}>
                <h5>Tracking Status</h5>
                <div className="ibox-tools">
                  <div style={{ textAlign: 'right' }}>
                    <div className="ibox-tools" style={{ float: 'none', marginRight: 5 }}>
                      <Button className="btn btn-primary btn-sm" onClick={() => {
                        console.log('delete ---> Job')

                      }}><i className="fas fa-trash-alt"></i></Button>
                    </div>
                    <div className="ibox-tools" style={{ float: 'none' }}>
                      <Button className="btn btn-primary btn-sm" onClick={() => {
                        console.log('edit ---> Job')

                      }}><i className="fas fa-edit"></i></Button>
                    </div>
                  </div>
                </div>
                <div className="ibox-content" style={{ padding: 0 }} >
                  <Row>

                    <Col style={{ padding: 0 }}>
                      <LoadScript id="script-loader" googleMapsApiKey={"AIzaSyDNwWt4rwJJ953rjpfYPJwoYYfq-JYYZ1A"}>
                        <GoogleMap
                          onLoad={map => { this.map = map }}
                          zoom={this.state.zoomDefault}
                          center={this.state.centerDefault}
                          mapContainerStyle={{
                            width: '100%',
                            height: '310px'
                          }}
                          isableDefaultUI={true}
                          onDragEnd={this.onCenterChange.bind(this)}
                          mapContainerClassName={"map"}
                          id='event-map'
                          options={{
                            zoomControl: true,
                            streetViewControl: false,
                            fullscreenControl: true,
                            mapTypeControl: false,
                          }}
                        >

                          {this.state.selectMarker.name !== undefined &&
                            <OverlayView
                              position={this.state.selectMarker.center}
                              mapPaneName={'markerLayer'}
                            >
                              <div
                                style={{
                                  background: `white`,
                                  border: `1px solid #ccc`,
                                  padding: 5
                                }}
                              >
                                {this.state.selectMarker.name}

                              </div>
                            </OverlayView>
                          }

                        </GoogleMap>
                      </LoadScript>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Place</h5>
                <div className="ibox-tools">
                </div>
                <div className="ibox-content">
                  <Row>
                    <Col lg="12">
                      <DataGrid id={'place'}
                        selection={{ mode: 'single' }}
                        ref={this.dataGrid}
                        dataSource={this.state.dO}
                        keyExpr={'id'}
                        showBorders={true}
                        allowColumnReordering={false}
                        onSelectionChanged={this.selectPlace}
                      >
                        <GroupPanel visible={false} />
                        <Paging defaultPageSize={5} />
                        <FilterRow visible={false} />
                        <HeaderFilter visible={false} />
                        <SearchPanel visible={true}
                          width={240}
                          placeholder={'Search...'} />
                        <Export enabled={true} fileName={'TEST'} allowExportSelectedData={true} />
                        <Selection mode={'multiple'} />

                        <Column dataField={'id'} caption="No." width={60} />
                        <Column dataField={'namePlace'} />
                      </DataGrid>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

          </Col> */}
        </Row>
      </div>
    )
  }
}


const mapStateToProps = (state) => ({

  // data: state.login.data
});

const mapDispatchToProps = (dispatch) => ({

  // setTest: test => dispatch(PopupActions.setTest(test))
});


export default connect(mapStateToProps, mapDispatchToProps)(Job)
