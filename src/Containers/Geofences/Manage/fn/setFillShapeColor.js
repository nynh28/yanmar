import { convertXMLtoString } from './convertXMLtoString'

export function setFillShapeColor(svg, color, name) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, "application/xml");

  let tagName = ""
  if (name === "triangle" || name === "union") tagName = "path"
  else if (name === "square") tagName = "rect"
  else if (name === "circle") tagName = "circle"

  var x = doc.getElementsByTagName(tagName)[0];
  x.setAttribute("fill", color.shape);
  return convertXMLtoString(doc)
}