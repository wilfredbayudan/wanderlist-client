import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Divider } from '@mui/material';

const Form = styled.form`

`;

const FormAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
`; 

const CommentForm = ({ source, setSource }) => {

  const [formData, setFormData] = useState({
    created_by: '',
    comment: ''
  });

  const [loading, setLoading] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);

  useEffect(() => {
    if (postSuccess) {
      setTimeout(() => {
        setPostSuccess(false);
      }, 3000)
    }
  }, [postSuccess, setPostSuccess])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleForm = (e) => {
    e.preventDefault();
  }

  const handleSubmit = () => {
    setLoading(true);
    console.log(formData);
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${source.id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setLoading(false);
        setPostSuccess(true);
        setFormData({
          ...formData,
          comment: ''
        });
        const newComment = {
          ...json,
          author: true
        };
        setSource({
          ...source,
          comments: [
            ...source.comments,
            newComment
          ]
        });
      })
      .catch(err => console.log(err))
  }

  return (
    <Form onSubmit={handleForm}>
      <TextField
        autoFocus
        margin="dense"
        id="created_by"
        label="Your Name"
        name="created_by"
        size="small"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={formData.created_by}
        required
      />
      <TextField
        margin="dense"
        multiline
        size="small"
        rows={3}
        id="comment"
        label="Comment"
        name="comment"
        fullWidth
        variant="standard"
        onChange={handleChange}
        value={formData.comment}
        required
      />
      <FormAction>
        <span>{postSuccess ? "Your comment has been posted!" : ''}</span>
        <LoadingButton loading={loading} onClick={handleSubmit}>Post</LoadingButton>
      </FormAction>
      <Divider />
    </Form>    
  )
}

export default CommentForm;