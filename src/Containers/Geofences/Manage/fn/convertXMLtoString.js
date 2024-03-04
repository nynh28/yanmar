export function convertXMLtoString(doc) {
  let xmlString = ""
  //IE
  if (window.ActiveXObject) {
    xmlString = doc.xml;
  }
  // code for Mozilla, Firefox, Opera, etc.
  else {
    xmlString = (new XMLSerializer()).serializeToString(doc);
  }
  return xmlString
}