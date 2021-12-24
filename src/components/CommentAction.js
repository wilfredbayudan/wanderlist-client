import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { Comment } from '@mui/icons-material';
import CommentDialog from './CommentDialog';

const CommentAction = ({ source, setSource, type }) => {
  
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <IconButton onClick={() => setShowComments(true)}>
        <Comment />
      </IconButton>
      {source.comments.length}
      <CommentDialog
        source={source}
        setSource={setSource}
        type={type}
        showComments={showComments}
        setShowComments={setShowComments}
      />
    </>
  )
};

export default CommentAction;