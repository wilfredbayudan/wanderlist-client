import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Step2 = ({ formProps: { nextStep, prevStep, handleChange, formData }}) => {
  return (
    <>
      <DialogContent>
        <DialogContentText>
          Provide some additional details about your bucketlist.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          multiline
          rows={4}
          id="description"
          label="Description"
          name="description"
          fullWidth
          variant="standard"
          onChange={handleChange}
          value={formData.description}
          required
        />
        <TextField
          margin="dense"
          id="created_by"
          label="Created By"
          name="created_by"
          fullWidth
          variant="standard"
          onChange={handleChange}
          value={formData.created_by}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={prevStep}>Back</Button>
        <Button onClick={nextStep} type="submit">Next</Button>
      </DialogActions>
    </>
  )
}

export default Step2;