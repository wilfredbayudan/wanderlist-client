import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Step1 = ({ formProps: { handleClose, nextStep, handleChange, formData }}) => {

  const [formDisabled, setFormDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setFormDisabled(true);
    const timer = setTimeout(() => {
      if (formData.name.length > 0) {
        setLoading(true);
        fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/findby/name/${formData.name}`)
          .then(res => res.json())
          .then(json => {
            if (json.length === 0) {
              setLoading(false);
              setFormDisabled(false);
              setError(false);
            } else {
              setLoading(false);
              setFormDisabled(true);
              setError(`A bucketlist with the name "${formData.name}" already exists.`)
              console.log('Already found with same title')
              // More error handling here
            }
          })
          .catch(err => console.log(err))
      }
    }, 600)

    return () => {
      clearTimeout(timer);
    };

  }, [formData.name, setFormDisabled, setLoading, setError])

  const renderAvailable = () => {
    if (formData.name.length > 0 && !formDisabled) {
      return <>"{formData.name}" is available!</>
    }
  }

  return (
    <>
      <DialogContent>
        <DialogContentText>
          To get started, choose a title for your bucketlist.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={handleChange}
          error={!!error}
          helperText={error ? error : renderAvailable()}
          value={formData.name}
          name="name"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <LoadingButton loading={loading} onClick={nextStep} type="submit" disabled={formDisabled}>Next</LoadingButton>
      </DialogActions>
    </>
  )
}

export default Step1;