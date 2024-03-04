import { Component } from 'react'
import { createPortal } from 'react-dom'
export default class MapControl extends Component {

  componentWillMount() {
    this.controlDiv = document.createElement('div')
    this.controlDiv.id = this.props.id
    this.controlDiv.style.width = this.props.width || "100%";
    this.controlDiv.style.zIndex = this.props.zIndex || 1;
    this.props.map.controls[this.props.position].push(this.controlDiv)
  }

  render() {
    return createPortal(this.props.children, this.controlDiv)
  }
}

/* สร้างกล่องเข้าไปใน Map

  # Controls
    https://developers.google.com/maps/documentation/javascript/controls

  # DefinitelyTyped
    https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/googlemaps/index.d.ts

  # ControlPosition
    BOTTOM_CENTER = 11
    BOTTOM_LEFT = 10
    BOTTOM_RIGHT = 12
    LEFT_BOTTOM = 6
    LEFT_CENTER = 4
    LEFT_TOP = 5
    RIGHT_BOTTOM = 9
    RIGHT_CENTER = 8
    RIGHT_TOP = 7
    TOP_CENTER = 2
    TOP_LEFT = 1
    TOP_RIGHT = 3

*/
