import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { DeleteOutlined } from '@mui/icons-material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const DeleteDialog = ({ label, deleteDialog, setDeleteDialog, handleDelete}) => {

  const handleClose = () => {
    setDeleteDialog(false);
  };

  const handleDeleteClick = () => {
    setDeleteDialog(false);
    handleDelete();
  }

  return (
      <Dialog
        open={deleteDialog}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Remove <b>{label}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleDeleteClick} startIcon={<DeleteOutlined />} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default DeleteDialog;