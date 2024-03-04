import { convertXMLtoString } from './convertXMLtoString'

export function setFillIconColor(svg, color) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "application/xml");
  var x = doc.getElementsByTagName("path")[0];
  x.setAttribute("fill", color.icon);
  return convertXMLtoString(doc)
}