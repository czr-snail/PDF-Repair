import React from 'react';
import { Tooltip } from '@mui/material';

function InfoTooltip({ children, title }) {
  return (
    <Tooltip title={title} arrow>
      {children}
    </Tooltip>
  );
}

export default InfoTooltip;