import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import $ from "jquery";

export async function ExportPDF() {
  $("#lb-loading-page").text(``);
  let pdf = jsPDF("p", "px", "a4", true);
  let headerHeight;
  let file_name = `Detail of`;

  const output = document.createElement("div");
  output.setAttribute("style", "width: 1670px;");

  await html2canvas($(".container-timeline")[0], {
    scale: window.devicePixelRatio,
    taintTest: false,
    allowTaint: false,
    useCORS: true,
    height: 2034,
  }).then(function (canvas) {
    let imgData = canvas.toDataURL("image/png", 2.0);
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    headerHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, headerHeight);
  });
  pdf.setProperties({ title: file_name });
  window.open(pdf.output("bloburl"));
  return true;
}