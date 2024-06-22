import React from 'react';
import { IconButton, Tooltip, Zoom } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <Tooltip title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} TransitionComponent={Zoom}>
      <IconButton onClick={toggleTheme} color="inherit" className="theme-toggle" size="large">
        {theme === 'dark' ? <Brightness7Icon fontSize="large" /> : <Brightness4Icon fontSize="large" />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;