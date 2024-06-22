const { PDFDocument } = require('pdf-lib');
const fs = require('fs-extra');
const path = require('path');

async function repairPDF(inputPath, outputPath) {
  try {
    const pdfBytes = await fs.readFile(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes, { ignoreEncryption: true });
    
    // Basic repair: recreate the PDF
    const pdfBytes2 = await pdfDoc.save();
    
    await fs.ensureDir(path.dirname(outputPath));
    await fs.writeFile(outputPath, pdfBytes2);
    
    console.log('PDF repaired and saved');
  } catch (error) {
    console.error('Error repairing PDF:', error);
    throw error;
  }
}

module.exports = { repairPDF };