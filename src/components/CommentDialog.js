import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CommentList from './CommentList';
import styled from 'styled-components';
import CommentForm from './CommentForm';

const Span = styled.span`
  color: #646464;
`;

const Title = styled.span`
  color: #008ed9;
`;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CommentDialog = ({ source, setSource, type, showComments, setShowComments }) => {

  const handleClose = () => {
    setShowComments(false);
  };

  return (
      <Dialog
        open={showComments}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        keepMounted
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Title>{source.name || source.label}</Title> /
          <Span> Comments</Span>
        </DialogTitle>
        <DialogContent>
          <CommentForm source={source} setSource={setSource} />
          <CommentList comments={source.comments} source={source} setSource={setSource} />
        </DialogContent>
      </Dialog>
  );
}

export default CommentDialog;