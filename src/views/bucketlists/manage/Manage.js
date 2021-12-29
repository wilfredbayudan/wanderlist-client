import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import styled from 'styled-components';
import { TextField } from '@mui/material';

const DialogText = styled(DialogContentText)`
  margin-bottom: 10px;
`;

const ManageContainer = styled.div`
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ManageSpan = styled.span`
  cursor: pointer;
  font-size: 0.9em;
  color: #008ed9;
  cursor: pointer;
  &:hover {
    color: #02a8ff;
  }
`;

const Manage = ({ bucketlistId, isAuth, exitManageMode, manageMode, setManageMode }) => {

  const [manageDialog, setManageDialog] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setManageDialog(true);
  };

  const handleClose = () => {
    setManageDialog(false);
  };

  const handlePinChange = (e) => {
    setPinInput(e.target.value);
  }

  const navigate = useNavigate();

  const handleVerify = () => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${bucketlistId}/auth`, {
      headers: {
        'PIN': pinInput
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.permission) {
          // Correct PIN
          setLoading(false);
          navigate(`/bucketlists/${bucketlistId}?pin=${pinInput}`)
        } else {
          // Invalid PIN
          setPinInput('');
          setLoading(false);
          setError(true);
        }
      })
      .catch(err => console.log(err))
  }

  const handleExit = () => {
    handleClose();
    exitManageMode();
    navigate(`/bucketlists/${bucketlistId}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleEnterManage = () => {
    if (isAuth) {
      setManageMode(true);
    } else {
      handleOpen();
    }
  }

  if (isAuth && manageMode) {
    return (
      <ManageContainer>
        <ManageSpan onClick={handleExit}>Exit Manage Mode</ManageSpan>
      </ManageContainer>
    )
  }

  return (
      <>
        <ManageContainer>
          <ManageSpan onClick={handleEnterManage}>Manage This Listing</ManageSpan>
        </ManageContainer>
        <Dialog
          open={manageDialog}
          onClose={handleClose}
          aria-describedby="alert-dialog-description"
        >
          <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogText id="alert-dialog-description">
              Enter Bucketlist PIN to continue.
            </DialogText>
            <TextField
              label="PIN"
              autoFocus
              size="small"
              fullWidth
              name="pinInput"
              value={pinInput}
              onChange={handlePinChange}
              error={error}
              helperText={error ? 'Invalid PIN' : 'Please verify your PIN to manage this listing.'}
            />
          </DialogContent>
          <DialogActions>
            <LoadingButton type="submit" loading={loading} variant="outlined" color="primary" onClick={handleVerify}>
              VERIFY PIN
            </LoadingButton>
          </DialogActions>
          </form>
        </Dialog>
      </>
  );
}

export default Manage;