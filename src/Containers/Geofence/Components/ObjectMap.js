import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Marker } from '@react-google-maps/api';
import SearchBox from './SearchBox';
import Geofences from './Geofences';
import GeofenceActions from '../../../Redux/GeofenceRedux';
import MapControlsCustom from '../../../Components/GoogleMap/MapControlsCustom';


const ObjectMap = (props) => {
  // const search = useRef()
  const { selectData, zoomSelected, centerSelected, geofencesEnabled } = useSelector((state) => state.geofence)
  const { language } = useSelector((state) => state.versatile)

  const [mapType, setMapType] = useState('roadmap')

  const dispatch = useDispatch()
  const resetSelectRow = () => dispatch(GeofenceActions.resetSelectRow())
  const getGeofenceByTypesGeof = (GeofenceTypeIds) => dispatch(GeofenceActions.getGeofenceByTypesGeof(GeofenceTypeIds))
  const setStateReduxGeofence = (objState) => dispatch(GeofenceActions.setStateReduxGeofence(objState))
  // console.log(props.map)
  return (
    <div>
      <MapControlsCustom
        position={1}
        key={`map-control-${language}`}
        map={props.map}
        width="auto"
        clusterHidden={true}
        fitObjectHidden={true}
        licensePlateHidden={true}
        geofencesrHidden={false}
        objectHidden={true}
        dashboardHidden={true}
        infoHidden={true}
        measureHidden={true}
        geofencesEnabled={geofencesEnabled}
        mapType={mapType}
        // onObjectChange={value => this.setState({ objectEnabled: value })}
        onGeofencesChange={value => getGeofenceByTypesGeof(value)}
        onMapTypeChange={value => setStateReduxGeofence({ mapType: value })}
      />
      <SearchBox
        map={props.map}
        search={(search) => props.search(search)}
        onPlacesChanged={
          props.onPlacesChanged
        }
      />
      <div>
        {/* {
          selectData && <Marker
            // visible={selectData != null}
            position={selectData.iconPoint}
            // position={this.state.type == 'circle' ? this.state.center : this.state.type == 'polygon' ? this.state.polygon[this.state.polygon.length]}
            icon={{
              url: selectData.iconUrl,
              // anchor: new window.google.maps.Point(5, 58),
            }}
          />
        } */}

        {
          props.place && <Marker
            // visible={props.place != null}
            position={props.place.location}
          />
        }


      </div>
      <Geofences />


    </div>
  )
}

export default ObjectMap
