import React, { Component } from "react";
import { InfoBox, Marker, OverlayView } from "@react-google-maps/api";
import { get, isEqual } from 'lodash'

const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
class MapMarker extends Component {
  state = {
    mapMarker: null
  };

  render() {
    const { clusterer, markerData, icon, infoWindowEnabled, yAxis, visible } = this.props;
    const { mapMarker } = this.state;

    // console.log('markerData', markerData)
    // const getPixelPositionOffset = (offsetWidth, offsetHeight, labelAnchor) => {
    //   return {
    //     x: offsetWidth + labelAnchor.x,
    //     y: offsetHeight + labelAnchor.y,
    //   };
    // };

    const onLoad = mapMarker => {
      this.setState({
        mapMarker
      });
    };


    // let _licenseplate = get(markerData, 'info.licenseplate')
    // if (_licenseplate == "") _licenseplate = get(markerData, 'info.vehicle_name')
    // if (_licenseplate == "") _licenseplate = get(markerData, 'info.vin_no')

    let _licenseplate = get(markerData, 'info.vehicle_name')
    if (_licenseplate == "") _licenseplate = get(markerData, 'info.licenseplate')
    if (_licenseplate == "") _licenseplate = get(markerData, 'info.vin_no')

    return [
      <Marker
        icon={icon}
        clusterer={clusterer}
        onLoad={onLoad}
        position={{
          lat: markerData.gps.lat,
          lng: markerData.gps.lng
        }}
        onClick={() => this.props.onClick()}
        visible={visible}
      // label={{
      //   color: 'rgb(35, 234, 33)',
      //   backgroundColor: 'rgb(35, 234, 33)',
      //   text: markerData.info.licenseplate.replace("-", "‑")
      // }}

      // labelStyle={{ backgroundColor: '#fff' }}
      >

        {mapMarker && (
          <InfoBox
            anchor={mapMarker}
            options={{

              pixelOffset: new window.google.maps.Size(-37.5, yAxis),
              closeBoxURL: "",
              disableAutoPan: false,
              pane: "floatPane",
              // isHidden: !infoWindowEnabled
              isHidden: !infoWindowEnabled || !visible
            }}
            // position={{
            //   lat: markerData.gps.lat,
            //   lng: markerData.gps.lng
            // }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{ padding: 5 }}>
              {/* {console.log('InfoBox', information.info.licenseplate)} */}
              {/* <span style={{ backgroundColor: 'white', opacity: 0.75, padding: 5 }}><b>{markerData.info.licenseplate.replace("-", "‑")}</b></span> */}
              <span style={{ backgroundColor: 'white', opacity: 0.75, padding: 5 }}><b>{_licenseplate.replace("-", "‑")}</b></span>
            </div>
          </InfoBox>

        )}


      </Marker >

    ];
  }
}


export default (MapMarker)


