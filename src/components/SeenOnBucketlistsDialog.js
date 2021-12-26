import React from 'react';
import { useNavigate, useLocation } from 'react-router';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from 'styled-components';
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Span = styled.span`
  color: #646464;
`;

const Title = styled.span`
  color: #008ed9;
`;

const StyledListItem = styled(ListItem)`
  cursor: pointer;
  background-color: ${props => props.current === 'true' ? '#f8ffdd': 'none'};
  font-weight: ${props => props.current === 'true' ? 'bold': 'normal'};
  &:hover {
    background-color: ${props => props.current === 'true' ? 'none' : '#e7f7fe'};
  }
`;

const SeenOnBucketlistsDialog = ({ destination, showSeenOn, setShowSeenOn, appState: { setDisplayContent } }) => {

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  const handleClose = () => {
    setShowSeenOn(false);
  };

  const handleNavigate = (id) => {
    if (location.pathname === `/bucketlists/${id}`) {
      setDisplayContent(true);
      handleClose();
    } else {
      navigate(`/bucketlists/${id}`);
    }
  }

  if (destination && showSeenOn) {
    return (
      <Dialog
        open={showSeenOn}
        onClose={handleClose}
        aria-describedby="alert-dialog-description"
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          <Title>{destination.label}</Title> /
          <Span> Bucketlists</Span>
        </DialogTitle>
        <DialogContent>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          { destination.bucketlists.map(bucketlist => {
            return (
              <React.Fragment key={bucketlist.id}>
                <StyledListItem current={location.pathname === `/bucketlists/${bucketlist.id}` ? 'true' : 'false'} alignItems="flex-start" onClick={() => handleNavigate(bucketlist.id)}>
                  <ListItemText
                    primary={bucketlist.name}
                    secondary={`By ${bucketlist.created_by}`}
                  />
                </StyledListItem>
                <Divider component="li" />
              </React.Fragment>
            )
          })}
        </List>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}

export default SeenOnBucketlistsDialog;