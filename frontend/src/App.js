import React, { useState } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme, CssBaseline, Zoom, Fade } from '@mui/material';
import { Button, CircularProgress, Typography, Container, Box, AppBar, Toolbar, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BuildIcon from '@mui/icons-material/Build';
import GetAppIcon from '@mui/icons-material/GetApp';
import ThemeToggle from './components/ThemeToggle';
import InfoTooltip from './components/InfoTooltip';
import useTheme from './hooks/useTheme';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isRepairing, setIsRepairing] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const { theme, toggleTheme } = useTheme();

  const materialTheme = createTheme({
    palette: {
      mode: theme,
      primary: {
        main: '#6200EA',
      },
      secondary: {
        main: '#00C853',
      },
      background: {
        default: theme === 'dark' ? '#121212' : '#f0f0f0',
        paper: theme === 'dark' ? '#1E1E1E' : '#ffffff',
      },
    },
    typography: {
      fontFamily: "'Poppins', sans-serif",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            padding: '10px 20px',
          },
        },
      },
    },
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setDownloadLink('');
  };

  const handleRepair = async () => {
    if (!file) {
      setMessage('Please choose a PDF file first');
      return;
    }

    setIsRepairing(true);
    const formData = new FormData();
    formData.append('pdf', file);

    try {
      const response = await axios.post('http://localhost:5000/repair-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage(response.data.message);
      setDownloadLink(response.data.downloadPath);
    } catch (error) {
      setMessage('Error repairing PDF');
    } finally {
      setIsRepairing(false);
    }
  };

  return (
    <ThemeProvider theme={materialTheme}>
      <CssBaseline />
      <div className={`App ${theme}`}>
        <AppBar position="fixed" color="transparent" elevation={0}>
          <Toolbar>
            <Box flexGrow={1} />
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm">
          <Fade in={true} timeout={1000}>
            <Paper elevation={10} className="container">
              <Typography variant="h3" component="h1" gutterBottom className="title">
                PDF Repair
              </Typography>
              <Typography variant="subtitle1" gutterBottom className="subtitle">
                Repair your damaged PDFs in seconds!
              </Typography>
              <input
                accept=".pdf"
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="raised-button-file">
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                  className="hover-button upload-button"
                >
                  Choose PDF file
                </Button>
              </label>
              <InfoTooltip title="Upload a PDF file that needs repair">
                <span className="info-icon">ⓘ</span>
              </InfoTooltip>
              {file && (
                <Fade in={true}>
                  <Typography variant="body2" className="file-name">{file.name}</Typography>
                </Fade>
              )}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleRepair}
                disabled={!file || isRepairing}
                startIcon={isRepairing ? <CircularProgress size={24} /> : <BuildIcon />}
                className="hover-button repair-button"
              >
                {isRepairing ? 'Repairing...' : 'Repair PDF'}
              </Button>
              <InfoTooltip title="Attempt to repair the uploaded PDF">
                <span className="info-icon">ⓘ</span>
              </InfoTooltip>
              {message && (
                <Fade in={true}>
                  <Typography className="message">{message}</Typography>
                </Fade>
              )}
              {downloadLink && (
                <Zoom in={true}>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={`http://localhost:5000${downloadLink}`}
                    startIcon={<GetAppIcon />}
                    className="hover-button download-button"
                  >
                    Download Repaired PDF
                  </Button>
                </Zoom>
              )}
            </Paper>
          </Fade>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;