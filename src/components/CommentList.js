import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import timeAgo from '../utils/timeAgo';

const CommentList = ({ comments }) => {

  const renderComments = comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(comment => {
    return (
      <React.Fragment key={comment.id}>
        <ListItem alignItems="flex-start" key={comment.id}>
          <ListItemAvatar>
            <Avatar alt={comment.created_by} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.comment}
            secondary={`Posted by ${comment.created_by} ${timeAgo(comment.created_at)}`}
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