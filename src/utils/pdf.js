import html2pdf from "html2pdf.js";
export function exportToPDF(elementId, filename = "协议.pdf") {
  const element = document.getElementById(elementId);
  if (!element) return;
  html2pdf()
    .set({
      margin: 0.5,
      filename,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    })
    .from(element)
    .save();
}