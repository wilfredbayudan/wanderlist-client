import React from 'react';
import { IconButton } from '@mui/material';
import { Comment } from '@mui/icons-material';

const CommentAction = ({ setShowComments }) => {
  
  return (
    <IconButton onClick={() => setShowComments(true)}>
      <Comment />
    </IconButton>
  )
};

export default CommentAction;