import React from 'react';

export default function MarkerTemplate(item) {
  var color = item.visible ? item.marker.fill : '#888';
  return (
    <svg height="100" width="100">
      <circle cx="50" cy="50" r="6" fill={color} />
    </svg>
  );
}