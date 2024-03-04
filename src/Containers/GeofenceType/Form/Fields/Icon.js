import React from 'react';
// import Sparkline, { Size, Tooltip } from 'devextreme-react/sparkline';

export default function icon(data) {
  console.log(data)
  return (
    <div>
      <img src={data}/>
    </div>
  );
}
