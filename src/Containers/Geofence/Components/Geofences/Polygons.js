import React, { useState } from 'react';
import { Polygon, Marker } from '@react-google-maps/api'
const Polygons = (props) => {

  const [polygon, setPolygon] = useState(null)
  const [marker, setMarker] = useState(null)

    return (
      <div>
        <Polygon
          onLoad={polygon => setPolygon(polygon)}
          paths={JSON.parse(props.data.coordinate.toLowerCase())}
        />
        <Marker
          onLoad={marker => setMarker(marker)}
          icon={props.data.iconUrl ? {
            url: props.data.iconUrl + '_icon',
            // scaledSize: new window.google.maps.Size(24, 24)
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

export default Polygons;
