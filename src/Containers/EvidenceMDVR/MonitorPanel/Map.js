import React, { Component, Suspense, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import GoogleMapReact from "google-map-react";
import useSupercluster from "use-supercluster";
import { GOOGLE_MAP_API_KEY } from '../../../Config/app-config';
import Tail from './Tail'
const Marker = ({ children }) => children;


const Map = (props) => {
  let { dataLogin, language } = props
  const [mapRef, setMapRef] = useState(null)

  console.log(">> RENDER Map <<")


  useEffect(() => {
    // console.log("mapRef : ", mapRef)
  }, [])

  return (
    <div className='evidence-map'>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${GOOGLE_MAP_API_KEY}`,
          region: language,
          language: language,
          libraries: "drawing,geometry"
        }}
        defaultCenter={{ lat: 13.786377, lng: 100.608755 }}
        defaultZoom={5}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          setMapRef(map)
        }}
        onChange={({ zoom, bounds }) => {

        }}
        onDrag={() => {

        }}
        onDragEnd={() => {

        }}
        onZoomAnimationStart={() => {

        }}
        onZoomAnimationEnd={() => {

        }}
        options={{
          gestureHandling: 'greedy',
          zoomControl: false,
          zoomControlOptions: {
            position: 5,
          },
          mapTypeControl: false,
          streetViewControl: false,
          streetViewControlOptions: {
            position: 5,
          },
          rotateControl: false,
          fullscreenControl: false
        }}
      >
        {
          mapRef !== null && <>
            <Tail map={mapRef} />
          </>
        }


        {/* <Marker
          key={231}
          lat={14.080848}
          lng={100.196234}
        >
          <div
            className="div-marker"
            style={{
              cursor: 'pointer',
              background: 'none',
              border: 'none'
            }}
            onClick={() => alert("OK")}
          >
            <span className="tooltipMarker"
              style={{
                fontSize: 12,
                width: (50 / 2),
                transform: 'translate(-100%, -50%)'

              }}>{"TEEXT"}</span>
          </div>
        </Marker> */}
      </GoogleMapReact>
    </div >
  )
}


const mapStateToProps = (state) => ({
  dataLogin: state.signin.dataLogin,
  header: state.signin.header,
  language: state.versatile.language
});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Map)

