import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import Slide from '@mui/material/Slide';
import { Divider } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Span = styled.span`
  color: #646464;
`;

const Title = styled.span`
  color: #008ed9;
`;

const SeenOnBucketlistsDialog = ({ destination, showSeenOn, setShowSeenOn }) => {

  const handleClose = () => {
    setShowSeenOn(false);
  };

  if (destination && showSeenOn) {
    return (
      <Dialog
        open={showSeenOn}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        keepMounted
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Title>{destination.label}</Title> /
          <Span> Bucketlists</Span>
        </DialogTitle>
        <DialogContent>
          List here
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}

export default SeenOnBucketlistsDialog;