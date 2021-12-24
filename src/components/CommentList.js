import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const CommentList = ({ comments }) => {

  const renderComments = comments.map(comment => {
    return (
      <React.Fragment key={comment.id}>
        <ListItem alignItems="flex-start" key={comment.id}>
          <ListItemAvatar>
            <Avatar alt={comment.created_by} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.comment}
            secondary={comment.created_by}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </React.Fragment>
    )
  })

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {renderComments}
    </List>
  );
}

export default CommentList;