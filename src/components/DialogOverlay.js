import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const DialogOverlay = ({ appState: { dialog, setDialog }}) => {

  const handleClose = () => {
    setDialog(false);
  };

  return (
      <Dialog
        open={!!dialog}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialog}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default DialogOverlay;