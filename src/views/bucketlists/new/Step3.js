import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Step3 = ({ formProps: { handleClose, nextStep, prevStep, handleChange, formData, handleSubmit, loading, setLoading }}) => {
  
  const [formDisabled, setFormDisabled] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (formData.pin.length > 0) {
      const regex = /^\d{4,10}$/;
      if (regex.test(formData.pin)) {
        setFormDisabled(false);
        setError(false);
      } else {
        setFormDisabled(true);
        setError('Pin must be 4-10 digits')
      }
    }
  }, [formData.pin]);
  
  return (
    <>
      <DialogContent>
        <DialogContentText>
          Choose a PIN
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          label="PIN"
          type="text"
          error={!!error}
          fullWidth
          variant="standard"
          name="pin"
          value={formData.pin}
          onChange={handleChange}
          helperText={error ? error : "Choose a 4-10 digit PIN to manage this bucketlist"}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={prevStep}>Back</Button>
        <LoadingButton loading={loading} disabled={formDisabled} type="submit" onClick={handleSubmit}>Submit</LoadingButton>
      </DialogActions>
    </>
  )
}

export default Step3;