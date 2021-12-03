import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

function NewBucketlistPage({ appState: { setDisplayContent, bucketlists, setBucketlists, setBucketlist }}) {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    created_by: '',
    pin: ''
  })

  const navigate = useNavigate();

  useEffect(() => {
    setDisplayContent(false);
  }, [setDisplayContent])

  const handleClose = () => {
    navigate('/bucketlists');
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const nextStep = () => {
    setStep(step + 1);
  }

  const prevStep = () => {
    setStep(step - 1);
  }

  const handleSubmit = () => {
    console.log('Submitting form...');
    setLoading(true);
    // Submit Form
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        console.log(json);
        setBucketlists([
          ...bucketlists,
          json
        ]);
        setBucketlist(json);
        navigate(`/bucketlists/${json.id}?pin=${json.pin}`);
      })
      .catch(err => console.log(err))
  }

  const formProps = {
    step, setStep,
    formData, setFormData,
    nextStep, prevStep,
    handleChange, handleClose,
    handleSubmit, 
    loading, setLoading
  }

  const renderStep = () => {
    switch(step) {
      case 1:
        return <Step1 formProps={formProps} />
      case 2:
        return <Step2 formProps={formProps} />
      case 3:
        return <Step3 formProps={formProps} />
      default:
        return <>Invalid Action</>
    }
  }

  return (
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create a Bucketlist</DialogTitle>
        <form onSubmit={(e) => e.preventDefault()}>
          {renderStep()}
        </form>
      </Dialog>
  );
}

export default NewBucketlistPage;