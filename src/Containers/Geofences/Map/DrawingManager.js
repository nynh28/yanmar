import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import GeofencesActions from "../../../Redux/GeofencesRedux"
import { MarkerScale } from '../../../helpers/MarkerScale'
import { get } from 'lodash';

let drawingManager, shape, marker
const drawingModeOverlayType = (key) => {
  if (key === '1') return window.google.maps.drawing.OverlayType.CIRCLE
  else if (key === '3') return window.google.maps.drawing.OverlayType.POLYGON
  else return null
}

const setIconMarker = (marker, iconMarker) => {
  marker.setIcon(MarkerScale(iconMarker, 50))
}

const DrawingManager = (props) => {
  let { map, iconMarker, isDrawing, geomType, colorShape,
    shapeDefault, createGeofSucc, shapeDetail } = props // STATE
  let { setStatesGeofencesRedux, setFormData } = props // ACTION

  const refIconMarker = React.useRef(iconMarker);

  useEffect(() => {
    setPolygonPrototype()
    setDrawingManager()
    return () => {
      if (drawingManager) {
        drawingManager.setMap(null);
        drawingManager = null
      }
      if (shape) {
        shape.setMap(null)
        shape = null
      }
      if (marker) {
        marker.setMap(null)
        marker = null
      }
      setStatesGeofencesRedux({ geomType: "1", colorShape: "#000000", shapeDefault: null })
    }
  }, [])

  useEffect(() => {
    if (createGeofSucc) {
      clearShape()
    }
  }, [createGeofSucc])

  useEffect(() => {
    if (drawingManager) {
      clearShape()
      drawingManager.setDrawingMode(drawingModeOverlayType(geomType))
    }
  }, [geomType])

  useEffect(() => {
    if (shapeDetail === null) {
      clearShape()
    }
  }, [shapeDetail])


  useEffect(() => {
    if (drawingManager && shapeDefault)
      setDrawingFromData(shapeDefault.geomType, shapeDefault.paths, shapeDefault.radius)

  }, [shapeDefault])

  useEffect(() => {
    if (drawingManager) {
      if (isDrawing) drawingManager.setDrawingMode(drawingModeOverlayType(geomType))
      else if (drawingManager.getDrawingMode() !== null) drawingManager.setDrawingMode(null)
    }
  }, [isDrawing])

  useEffect(() => {
    if (drawingManager) setColorShapeOptions(colorShape)
  }, [colorShape])

  useEffect(() => {
    if (marker) {
      if (iconMarker) setIconMarker(marker, iconMarker)
      else marker.setIcon(null)
    }
    refIconMarker.current = iconMarker;
    // marker.setIcon('https://maps.google.com/mapfiles/kml/shapes/library_maps.png')
  }, [iconMarker])

  const clearShape = () => {
    if (shape) {
      shape.setMap(null)
      shape = null
    }
    if (marker) {
      marker.setMap(null)
      marker = null
    }
    setStatesGeofencesRedux({ shapeDetail: null })
  }

  const setDrawingFromData = (geomType, lat_lng, radius) => {
    if (shape) shape.setMap(null)

    let option = { fillColor: colorShape, strokeColor: colorShape, editable: true }

    if (geomType == "1") {
      shape = new window.google.maps.Circle({
        center: lat_lng[0], // {lat, lng}
        radius: radius,
        ...option
      });
      shape.setMap(map);
      map.fitBounds(shape.getBounds())
      setEventShape('circle', shape)
    } else if (geomType == "3") {
      shape = new window.google.maps.Polygon({
        paths: lat_lng, //[{lat, lng}, {lat, lng}]
        draggable: true,
        ...option
      });
      shape.setMap(map)
      map.fitBounds(getBounds(shape.getPaths()))
      setEventShape('polygon', shape)
    }
  }

  const getBounds = (paths) => {
    let bd = new window.google.maps.LatLngBounds();
    paths.forEach(function (path) {
      let ar = path.getArray();
      for (let i = 0, l = ar.length; i < l; i++) {
        bd.extend(ar[i]);
      }
    });
    return bd
  }

  const setPolygonPrototype = () => {
    window.google.maps.Polygon.prototype.getBoundingBox = () => {
      let bounds = new window.google.maps.LatLngBounds();
      shape.getPath().forEach(function (element, index) {
        bounds.extend(element)
      })
      return (bounds);
    };

    window.google.maps.Polygon.prototype.getApproximateCenter = (paths) => {
      let boundsHeight = 0,
        boundsWidth = 0,
        centerPoint,
        heightIncr = 0,
        maxSearchLoops,
        maxSearchSteps = 10,
        n = 1,
        northWest,
        polygonBounds = shape.getBoundingBox(paths),
        testPos,
        widthIncr = 0;
      // Get polygon Centroid
      centerPoint = polygonBounds.getCenter();
      if (window.google.maps.geometry.poly.containsLocation(centerPoint, shape)) {
        return centerPoint;
      } else {
        maxSearchLoops = maxSearchSteps / 2;
        northWest = new window.google.maps.LatLng(
          polygonBounds.getNorthEast().lat(),
          polygonBounds.getSouthWest().lng()
        )
        boundsHeight = window.google.maps.geometry.spherical.computeDistanceBetween(
          northWest,
          polygonBounds.getSouthWest()
        );
        heightIncr = boundsHeight / maxSearchSteps;
        boundsWidth = window.google.maps.geometry.spherical.computeDistanceBetween(
          northWest,
          polygonBounds.getNorthEast()
        );
        widthIncr = boundsWidth / maxSearchSteps;

        for (; n <= maxSearchSteps; n++) {
          testPos = window.google.maps.geometry.spherical.computeOffset(
            centerPoint,
            (heightIncr * n),
            0
          );
          if (window.google.maps.geometry.poly.containsLocation(testPos, shape)) {
            break;
          }
          testPos = window.google.maps.geometry.spherical.computeOffset(
            centerPoint,
            (widthIncr * n),
            90
          );
          if (window.google.maps.geometry.poly.containsLocation(testPos, shape)) {
            break;
          }
          // Test point South of Centroid
          testPos = window.google.maps.geometry.spherical.computeOffset(
            centerPoint,
            (heightIncr * n),
            180
          );
          if (window.google.maps.geometry.poly.containsLocation(testPos, shape)) {
            break;
          }
          // Test point West of Centroid
          testPos = window.google.maps.geometry.spherical.computeOffset(
            centerPoint,
            (widthIncr * n),
            270
          );
          if (window.google.maps.geometry.poly.containsLocation(testPos, shape)) {
            break;
          }
        }
        return (testPos);
      }
    };
  }
  const setEventShape = (type, shape) => {
    getShapeDetail(type, shape)
    if (type === 'circle') {
      window.google.maps.event.addListener(shape, 'radius_changed', () => {
        let radius = shape.getRadius()
        if (radius < 10) shape.setRadius(10)
        else if (radius > 1000) shape.setRadius(1000)
        else if (!Number.isInteger(radius)) shape.setRadius(parseInt(radius))
        else getShapeDetail(type, shape)
      });
      window.google.maps.event.addListener(shape, 'center_changed', () => { getShapeDetail(type, shape) });
    } else if (type === 'polygon') {
      // console.log('polygon')
      // console.log(window.google.maps.event.hasListeners(shape, 'set_at'))
      let dragging
      shape.addListener('dragstart', function (event) { dragging = true });
      shape.addListener('dragend', function (event) {
        dragging = false;
        getShapeDetail("polygon", shape)
      });
      shape.getPaths().forEach((path, index) => {
        window.google.maps.event.addListener(path, 'set_at', () => { if (!dragging) getShapeDetail("polygon", shape) });
        window.google.maps.event.addListener(path, 'insert_at', () => { getShapeDetail("polygon", shape) });
        window.google.maps.event.addListener(path, 'remove_at', () => { getShapeDetail("polygon", shape) });
      })
    }
  }

  const getShapeDetail = (type, shape, center) => {
    let data = {}
    if (type === "circle") {
      data.radius = shape.getRadius()
      let i = shape.getCenter()
      data.center = { lat: parseFloat(i.lat().toFixed(8)), lng: parseFloat(i.lng().toFixed(8)) }
      data.geomType = "1"
    } else if (type === "polygon") {
      let array = shape.getPath().getArray(), bounds = new window.google.maps.LatLngBounds();
      let paths = array.map((i) => ({ lat: parseFloat(i.lat().toFixed(8)), lng: parseFloat(i.lng().toFixed(8)) }));
      data.paths = paths
      data.geomType = "3"
      for (let itm of paths) { bounds.extend(itm) }
      try {
        let i = shape.getApproximateCenter(paths)
        data.center = { lat: i.lat(), lng: i.lng() }
      } catch {
        // data.center = center
      }
      // data.center = polygonCenter(paths)
    }

    let coordinatesText = ""
    if (data.geomType == "1") {
      coordinatesText = `${data?.center.lat}, ${data?.center.lng}`
    }
    else if (data.geomType == "3") {
      data.paths.forEach(item => {
        if (coordinatesText === "")
          coordinatesText += `${item?.lat}, ${item?.lng}`
        else
          coordinatesText += `\n${item?.lat}, ${item?.lng}`
      })
    }

    createMarkerCenter(data.center)
    setStatesGeofencesRedux({ shapeDetail: data, coordinatesText })
    setFormData("radius", get(data, 'radius', 10))
  }

  const createMarkerCenter = (center) => {
    if (marker) {
      marker.setPosition(center)
    } else {
      marker = new window.google.maps.Marker({
        position: center,
      });
      marker.setMap(map)
      // marker.setIcon(iconMarker)
      if (refIconMarker.current) setIconMarker(marker, refIconMarker.current)
      else marker.setIcon(null)
      // marker.setIcon('https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png')

    }
  }

  const setDrawingManager = () => {
    try {
      if (drawingManager) {
        drawingManager.setMap(null);
        drawingManager = null
      }
      let mode = isDrawing ? geomType : null
      let manager = {
        drawingMode: drawingModeOverlayType(mode),
        drawingControl: false,
        circleOptions: {
          fillColor: colorShape,
          strokeColor: colorShape,
          // clickable: false,
          editable: true,
          // draggable: true,
          zIndex: 1,
        },
        polygonOptions: {
          fillColor: colorShape,
          strokeColor: colorShape,
          // clickable: false,
          editable: true,
          draggable: true,
          zIndex: 1,
        }
      }
      drawingManager = new window.google.maps.drawing.DrawingManager(manager);
      drawingManager.setMap(map);

      window.google.maps.event.addListener(drawingManager, 'overlaycomplete', (event) => {
        if (shape) shape.setMap(null)
        shape = event.overlay;
        if (event.type === 'circle') {
          let radius = shape.getRadius()
          if (radius < 10) shape.setRadius(10)
          else if (radius > 1000) shape.setRadius(1000)
          else if (!Number.isInteger(radius)) shape.setRadius(parseInt(radius))
        }
        setEventShape(event.type, shape)
      })

    } catch (error) {
      console.log("setDrawingManager : ", error)
    }
  }

  const setColorShapeOptions = () => {
    let { circleOptions, polygonOptions } = drawingManager
    drawingManager.setOptions({ // "#00AAFF"
      circleOptions: {
        ...circleOptions, fillColor: colorShape, strokeColor: colorShape
      },
      polygonOptions: {
        ...polygonOptions, fillColor: colorShape, strokeColor: colorShape
      },
    })
    if (shape) {
      shape.setOptions({
        fillColor: colorShape,
        strokeColor: colorShape
      });
      // shape
    }
  }

  return ""
}

const mapStateToProps = (state) => ({
  header: state.signin.header,
  language: state.versatile.language,
  isFormSetting: state.geofences.isFormSetting,
  isDrawing: state.geofences.isDrawing,
  geomType: state.geofences.geomType,
  iconMarker: state.geofences.iconMarker,
  colorShape: state.geofences.colorShape,
  shapeDefault: state.geofences.shapeDefault,
  createGeofSucc: state.geofences.createGeofSucc,
  shapeDetail: state.geofences.shapeDetail,
});
const mapDispatchToProps = (dispatch) => ({
  setStatesGeofencesRedux: (obj) => dispatch(GeofencesActions.setStatesGeofencesRedux(obj)),
  setFormData: (filedName, value, isSubObject) => dispatch(GeofencesActions.setFormData(filedName, value, isSubObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawingManager)
