import React from 'react';

const formatNumber = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0
}).format;

function calculateTotal(pieChart) {
  return formatNumber(pieChart.getAllSeries()[0].getVisiblePoints().reduce((s, p) => s + p.originalValue, 0));
}
export default function TooltipTemplate(pieChart) {
  const country = pieChart.getAllSeries()[0].getVisiblePoints()[0].data.region;
  return (
    <svg>
      <circle cx="100" cy="100" r={pieChart.getInnerRadius() - 6} fill="white"></circle>
      <text textAnchor="middle" x="100" y="90" style={{ fontSize: 18, fill: '#494949', fontFamily: 'Prompt' }}>
        <tspan style={{ fontSize: 18, fill: '#494949', fontFamily: 'Prompt' }} x="100">Total</tspan>
        <tspan x="100" dy="20px" style={{ fontWeight: 600, fontFamily: 'Prompt' }}>{
          calculateTotal(pieChart)
        }
        </tspan>
        <tspan style={{ fontSize: 14, fill: '#494949', fontFamily: 'Prompt' }} dy="20px" x="100">Drivers</tspan>
      </text>
    </svg>
  );
}
