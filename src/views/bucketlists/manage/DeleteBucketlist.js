import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { DeleteForever } from '@mui/icons-material';
import styled from 'styled-components';
import { LoadingButton } from '@mui/lab';
import { Dialog, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { TextField } from '@mui/material';

const DeleteIcon = styled(DeleteForever)`
  cursor: pointer;
  &:hover {
    color: #bb3232;
  }
`;

const DeleteBucketlist = ({ appState, authPin }) => {

  const { setBucketlist, setCurrentList, setMarkers, bucketlist, bucketlists, setBucketlists } = appState;

  const [confirmPrompt, setConfirmPrompt] = useState(false);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pinInput, setPinInput] = useState('');

  const navigate = useNavigate();

  const handleClose = () => {
    setConfirmPrompt(false);
  }

  const handleOpen = () => {
    setConfirmPrompt(true);
  }

  const handleDeleteClick = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${bucketlist.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'PIN': authPin
      },
    })
      .then(res => res.json())
      .then(json => {
        setBucketlist(null);
        setBucketlists(bucketlists.filter(filteredList => filteredList.id !== json.id));
        handleClose();
        setCurrentList(null);
        setMarkers([]);
        navigate('/bucketlists')
      })
      .catch(err => console.log(err));
  }

  const handleChange = e => {
    setPinInput(e.target.value);
  }

  useEffect(() => {
    if (pinInput === authPin) {
      setDeleteDisabled(false);
    } else {
      setDeleteDisabled(true);
    }
  }, [pinInput, authPin, setDeleteDisabled]);

  return (
    <>
      <DeleteIcon onClick={handleOpen} />
      <Dialog
        open={confirmPrompt}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Confirm your PIN to delete.
          </DialogContentText>
          <TextField
                label="PIN"
                size="small"
                value={pinInput}
                onChange={handleChange}
              />
        </DialogContent>
        <DialogActions>
          <LoadingButton disabled={deleteDisabled} loading={loading} variant="outlined" color="primary" startIcon={<Delete />} onClick={handleDeleteClick}>
            Delete
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default DeleteBucketlist;