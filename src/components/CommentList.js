import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import timeAgo from '../utils/timeAgo';
import Collapse from '@mui/material/Collapse';
import { TransitionGroup } from 'react-transition-group';
import { DeleteForever } from '@mui/icons-material';
import styled from 'styled-components';
import stringAvatar from '../utils/stringAvatar';

const DeleteIcon = styled(DeleteForever)`
  cursor: pointer;
  &:hover {
    color: #bb3232;
  }
`;

const CommentList = ({ comments, source, setSource }) => {

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${source.id}/comments/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(json => {
        setSource({
          ...source,
          comments: source.comments.filter(comment => comment.id !== json.id)
        })
      })
      .catch(err => console.log(err));
  }

  const renderComments = comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map(comment => {

    const commentAuthor = comment.created_by || 'Anonymous';

    return (
      <Collapse key={comment.id}>
        <ListItem alignItems="flex-start" key={comment.id}>
          <ListItemAvatar>
            <Avatar {...stringAvatar(commentAuthor)} />
          </ListItemAvatar>
          <ListItemText
            primary={comment.comment}
            secondary={`Posted ${timeAgo(comment.created_at)} by ${commentAuthor}`}
          />
          {comment.author ? <DeleteIcon onClick={() => handleDelete(comment.id)} /> : ''}
        </ListItem>
        <Divider variant="inset" component="li" />
      </Collapse>
    )
  })

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {
        comments.length > 0 ? <TransitionGroup>{renderComments}</TransitionGroup> : 'No comments yet, be the first!'
      }
    </List>
  );
}

export default CommentList;