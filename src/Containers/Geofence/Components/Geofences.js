import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import Polygon from './Geofences/Polygons'
import Line from './Geofences/Line'
import Point from './Geofences/Point'
import InfoGeof from './Geofences/InfoGeof';
import RealtimeActions from '../../../Redux/RealtimeRedux'

const Geofences = () => {
  const { selectData, geofencesEnabled } = useSelector((state) => state.geofence)
  const [infoWin, setInfoWin] = useState()
  const [anchor, setAnchor] = useState()

  const dispatch = useDispatch()
  const getGeofenceDetail = (geofenceId) => dispatch(RealtimeActions.getGeofenceDetail(geofenceId))

  const markerLoadHandler = (anchor, id) => {
    // if (info === undefined) {

    //   this.setState({ infoWin: null })
    // } else {

    //   this.setState({ infoWin: { anchor, info } })

    // }
    // console.log(id, anchor)
    getGeofenceDetail(id)
    setAnchor(anchor)
  };

  console.log(selectData)

  return (
    <div>
      {selectData.length !== 0 &&
        selectData.map((data, i) => {
          if (data.geomTypeName === 'Polygon') return <Polygon data={data} markerLoadHandler={(anchor) => markerLoadHandler(anchor, data.id)} />
          if (data.geomTypeName === 'Line') return <Line data={data} markerLoadHandler={(anchor) => markerLoadHandler(anchor, data.id)} />
          if (data.geomTypeName === 'Point') return <Point data={data} markerLoadHandler={(anchor) => markerLoadHandler(anchor, data.id)} />
          // return
        })
      }

      <InfoGeof infoWin={infoWin} anchor={anchor} markerLoadHandler={(anchor) => markerLoadHandler(anchor, null)} />

    </div>

  )
}

export default Geofences;
