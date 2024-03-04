let zoomCurrent = 1
const zoomChange = (gridId) => {
  switch (zoomCurrent) {
    case 1:
      zoomCurrent = 2
      document.getElementById(gridId).style.zoom = 1.3
      break;
    case 2:
      zoomCurrent = 3
      document.getElementById(gridId).style.zoom = 1.6
      break;
    default:
      zoomCurrent = 1
      document.getElementById(gridId).style.zoom = 1
      break;
  }
  return {
    zoomChange
  }
}

const setDefaultZoom = () => zoomCurrent = 1

export default {
  zoomChange,
  setDefaultZoom
}
