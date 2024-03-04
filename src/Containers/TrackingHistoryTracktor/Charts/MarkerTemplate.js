import React from 'react';

export default function MarkerTemplate(item) {
  var color = item.series.isVisible() ? item.marker.fill : '#888';
  let legendType = "circle"

  // if (item.text == "Driving" || item.text == "Ign. OFF" || item.text == "Idling") legendType = "square"
  let seriesName = ["Driving", "Ign. OFF", "Idling", "Line Over Speed", "ขับขี่", "ดับเครื่อง", "จอดไม่ดับเครื่อง", "เส้นความเร็วเกิน"]
  if (seriesName.includes(item.text)) legendType = "square"
  if (item.text == "Line Over Speed" || item.text == "เส้นความเร็วเกิน") color = "red"

  return legendType == "circle" ?
    <svg height="100" width="100">
      <circle cx="50" cy="50" r="5" fill={color} />
    </svg>
    :
    <svg>
      <rect x={0} y={0} width={9} height={8} fill={color} ></rect>
    </svg>
}