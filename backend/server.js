const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { repairPDF } = require('./pdfUtils');

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

app.post('/repair-pdf', upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const inputPath = req.file.path;
    const outputPath = path.join('repaired', `repaired_${req.file.originalname}`);
    
    await repairPDF(inputPath, outputPath);
    
    res.json({ 
      message: 'PDF repaired successfully',
      downloadPath: `/download/${path.basename(outputPath)}`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error repairing PDF' });
  }
});

app.get('/download/:filename', (req, res) => {
  const file = path.join(__dirname, 'repaired', req.params.filename);
  res.download(file);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));