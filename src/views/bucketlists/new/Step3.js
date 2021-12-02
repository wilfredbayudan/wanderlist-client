import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Step3 = ({ formProps: { handleClose, nextStep, prevStep, handleChange, formData, handleSubmit }}) => {
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
        <Button type="submit" onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </>
  )
}

export default Step3;