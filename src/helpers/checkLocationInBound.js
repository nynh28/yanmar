export function checkLocationInBound(map, listGeof) {
  for (let i in listGeof) {
    if (map) {
      let { position, point, polyline, polygon, circle } = listGeof[i]
      const bd = map.getBounds()
      let latlng = new window.google.maps.LatLng(position.lat, position.lng)
      let visible = false
      if (bd.contains(latlng)) visible = true
      if (point) point.setVisible(visible)
      if (polyline) polyline.setVisible(visible)
      if (polygon) polygon.setVisible(visible)
      if (circle) circle.setVisible(visible)
    }
  }
}
