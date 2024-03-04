import React from 'react';
const formatNumber = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0
}).format;

function calculateTotal(pieChart) {
  return formatNumber(pieChart.getAllSeries()[0].getVisiblePoints().reduce((s, p) => s + p.originalValue, 0));
}

export default function TooltipTemplate(pieChart) {
  const language = pieChart.getAllSeries()[0].getVisiblePoints()[0].data.language;

  let myDrivers = "My Drivers"
  let total = "Total"
  let drivers = "Drivers"

  if (language == "th") {
    myDrivers = "คนขับของฉัน"
    total = "ทั้งหมด"
    drivers = "คนขับ"
  }

  return (
    <svg>
      <circle cx="100" cy="100" r={pieChart.getInnerRadius() - 6} fill="white"></circle>
      <text textAnchor="middle" x="100" y="70" style={{ fontSize: 18, fill: '#494949', fontFamily: 'Prompt' }}>
        {/* <tspan style={{ fontSize: 16, fill: '#494949', fontFamily: 'Prompt' }} x="100">My Drivers</tspan> */}
        <tspan style={{ fontSize: 16, fill: '#494949', fontFamily: 'Prompt' }} x="100">{myDrivers}</tspan>
      </text>
      <text textAnchor="middle" x="100" y="95" style={{ fontSize: 18, fill: '#494949', fontFamily: 'Prompt' }}>
        <tspan style={{ fontSize: 14, fill: '#494949', fontFamily: 'Prompt', opacity: 0.5 }} x="100"> {total}</tspan>
        <tspan x="100" dy="25px" style={{ fontWeight: 600, fontFamily: 'Prompt' }}>{
          calculateTotal(pieChart)
        }</tspan>
        <tspan style={{ fontSize: 14, fill: '#494949', fontFamily: 'Prompt', color: 'gray', opacity: 0.5 }} dy="25px" x="100"> {drivers}</tspan>
      </text>
    </svg>
  );
}