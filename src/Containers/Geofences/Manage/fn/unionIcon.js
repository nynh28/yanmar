import { convertXMLtoString, convertStringToObjectURL } from './index'

var parser = new DOMParser();
export function unionIcon(name, shapeText, iconText, fillPreset, iconId) {
  let iconDoc = parser.parseFromString(iconText, "image/svg+xml")
  let shapeTemplate = shapeType(name, fillPreset.shape)
  let icon_sm = iconDoc.getElementsByTagName("svg")[0].innerHTML  // PATH ICON

  var docShape = parser.parseFromString(shapeTemplate.shape, "image/svg+xml");
  var docIcon = parser.parseFromString(icon_sm, "image/svg+xml");

  // SET COLOR, TRANSFORM OF ICON PATH
  docIcon.getElementsByTagName("path")[0].setAttribute("transform", shapeTemplate.transform);
  docIcon.getElementsByTagName("path")[0].setAttribute("fill", fillPreset.icon);

  var svg = docShape.getElementById(shapeTemplate.id);
  var svgPath = docIcon.getElementById(docIcon.getElementsByTagName("path")[0].getAttribute("id"))
  svg.appendChild(svgPath)

  let svgStr = convertXMLtoString(docShape).replace("xmlns=\"\"", "")
  svg = convertStringToObjectURL(svgStr)

  // ENCODE BASE64
  var docSVG = parser.parseFromString(svgStr, "image/svg+xml");
  var SVGDomElement = docSVG.getElementById("icon-svg");
  var serializedSVG = new XMLSerializer().serializeToString(SVGDomElement);
  var base64Data = window.btoa(serializedSVG);

  let fileName = `${name}_${(fillPreset.shape).replace("#", "")}_icon${iconId}_${(fillPreset.icon).replace("#", "")}`
  return {
    svg, base64Data, fileName
  }
}

export function shapeType(type, color) {
  let shapeSVG = {}
  switch (type) {
    case "union":
      shapeSVG = {
        shape: `<svg id="icon-svg" xmlns="http://www.w3.org/2000/svg" width="39.89" height="47.168" viewBox="0 0 39.89 47.168">
        <g id="union_1" data-name="Group 13962" transform="translate(-1870.593 -9266.646)">
          <path id="Union_127" data-name="Union 127" d="M4667.445-7342.686l-2.923-6.916A19.953,19.953,0,0,1,4649-7369.055,19.945,19.945,0,0,1,4668.945-7389a19.947,19.947,0,0,1,19.946,19.946,19.954,19.954,0,0,1-15.522,19.453l-2.923,6.916a1.574,1.574,0,0,1-1.5.853A1.573,1.573,0,0,1,4667.445-7342.686Z" transform="translate(-2778.408 16655.646)" fill="${color}"/>
        </g>
      </svg>`,
        transform: 'translate(1878.538 9274.645)',
        id: 'union_1'
      }
      break;
    case "triangle":
      shapeSVG = {
        shape: `<svg id="icon-svg" xmlns="http://www.w3.org/2000/svg" width="48" height="42" viewBox="0 0 48 42">
        <g id="triangle_1" data-name="Group 13964" transform="translate(-1988.593 -9269.645)">
          <path id="Polygon_39" data-name="Polygon 39" d="M21.4,4.558a3,3,0,0,1,5.209,0l18.83,32.953A3,3,0,0,1,42.83,42H5.17a3,3,0,0,1-2.6-4.488Z" transform="translate(1988.593 9269.645)" fill="${color}"/>
        </g>
      </svg>
      `,
        transform: 'translate(2000.593 9286.729)',
        id: 'triangle_1'
      }
      break;
    case "circle":
      shapeSVG = {
        shape: `<svg id="icon-svg" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42">
    <g id="circle_1" data-name="Group 13966" transform="translate(-2043.593 -9269.645)">
        <circle id="Ellipse_1989" data-name="Ellipse 1989" cx="21" cy="21" r="21" transform="translate(2043.593 9269.645)" fill="${color}"/>
    </g>
  </svg>`,
        transform: 'translate(2052.593 9279.145)',
        id: 'circle_1'
      }
      break;
    case "square":
      shapeSVG = {
        shape: `<svg id="icon-svg" xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42">
        <g id="square_1" data-name="Group 13963" transform="translate(-1930.593 -9269.645)">
          <rect id="Rectangle_6074" data-name="Rectangle 6074" width="42" height="42" rx="5" transform="translate(1930.593 9269.645)" fill="${color}"/>
        </g>
      </svg>
      `,
        transform: 'translate(1939.593 9278.729)',
        id: 'square_1'
      }
      break;
  }
  return shapeSVG
}

export function setIconColor(iconText, color) {
  let iconDoc = parser.parseFromString(iconText, "image/svg+xml")
  let icon_sm = iconDoc.getElementsByTagName("svg")[0].innerHTML  // PATH ICON
  var docIcon = parser.parseFromString(icon_sm, "image/svg+xml");
  docIcon.getElementsByTagName("path")[0].setAttribute("fill", color);
  var svgPath = docIcon.getElementById(docIcon.getElementsByTagName("path")[0].getAttribute("id"))
}