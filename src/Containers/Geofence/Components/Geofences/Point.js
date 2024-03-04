import React, { useState } from 'react';
import { Marker, Circle } from '@react-google-maps/api';


const getPixelPositionOffset = (offsetWidth, offsetHeight, labelAnchor) => {
  return {
      x: offsetWidth + labelAnchor.x,
      y: offsetHeight + labelAnchor.y,
  };
};

const Point = (props) => {
  const [marker, setMarker] = useState(null)

  return (
    <div>
      <Circle
        center={JSON.parse(props.data.coordinate.toLowerCase())[0]}
        options={{
          radius: parseInt(props.data.radius),
        }}
      />
      <Marker
        onLoad={marker => setMarker(marker)}
        // icon={data.iconUrl}
        icon={props.data.iconUrl ? {
          url: props.data.iconUrl + '_icon',
          // scaledSize: new window.google.maps.Size(24, 24)
          // anchor: { x: 50, y: 50 }
        } : undefined}
        position={JSON.parse(props.data.iconPoint.toLowerCase())}
        onClick={() => {
          props.markerLoadHandler(marker)
        }}
      >
      </Marker>
    </div>
  )
}

export default Point
