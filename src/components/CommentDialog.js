import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import CommentList from './CommentList';

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
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Comments for {source.name || source.label}
          </DialogContentText>
          <CommentList comments={source.comments} />
        </DialogContent>
      </Dialog>
  );
}

export default CommentDialog;