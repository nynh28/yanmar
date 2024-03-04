import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Polyline, Marker } from '@react-google-maps/api'

const Line = (props) => {
  const [polyline, setPolyline] = useState(null);
  const [marker, setMarker] = useState(null)
  console.log(props)
  return (
    <div>
      <Polyline
        onLoad={polyline => setPolyline(polyline)}
        id={'polyline'}
        path={JSON.parse(props.data.coordinate.toLowerCase())}
      />
      <Marker
        onLoad={marker => setMarker(marker)}
        icon={props.data.iconUrl ? {
          url: props.data.iconUrl,
          scaledSize: new window.google.maps.Size(24, 24)
          // anchor: { x: 50, y: 50 }
        } : undefined}
        position={JSON.parse(props.data.iconPoint.toLowerCase())}
        onClick={() => {
          props.markerLoadHandler(marker)
        }}
      />
    </div>
  )
}

export default Line;
