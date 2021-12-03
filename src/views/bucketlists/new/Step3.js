import React from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Step3 = ({ formProps: { handleClose, nextStep, prevStep, handleChange, formData, handleSubmit, loading, setLoading }}) => {
  return (
    <>
      <DialogContent>
        <DialogContentText>
          Choose a PIN
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="PIN"
          type="text"
          fullWidth
          variant="standard"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          helperText="Choose a 4-10 character PIN to manage this bucketlist"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={prevStep}>Back</Button>
        <LoadingButton loading={loading} disabled={loading} type="submit" onClick={handleSubmit}>Submit</LoadingButton>
      </DialogActions>
    </>
  )
}

export default Step3;