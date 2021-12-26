import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import { TextField } from '@mui/material';

const ManageUrl = ({ manageUrl }) => {

  const [tooltipOpen, setTooltipOpen] = useState(false);
  
  const handleClose = () => {
    setTooltipOpen(false);
  };

  const handleOpen = () => {
    setTooltipOpen('Click to copy');
  };

  const copyToClipboard = (e) => {

    e.target.select();
    document.execCommand('copy');
    setTooltipOpen('Copied to clipboard!')
    
  }

  return (
    <Tooltip open={!!tooltipOpen} onClose={handleClose} onOpen={handleOpen} title={tooltipOpen} arrow>
      <TextField onClick={copyToClipboard} fullWidth label="Manage this listing at" size="small" value={manageUrl}/>
    </Tooltip>
  )
}

export default ManageUrl;