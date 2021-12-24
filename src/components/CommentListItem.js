import React from 'react';
import { DeleteForever } from '@mui/icons-material';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import timeAgo from '../utils/timeAgo';
import Collapse from '@mui/material/Collapse';
import styled from 'styled-components';

const DeleteIcon = styled(DeleteForever)`
  cursor: pointer;
  &:hover {
    color: #bb3232;
  }
`;

const CommentListItem = ({ comment, source, setSource }) => {

  console.log(comment)

  return (
    <Collapse key={comment.id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment.created_by} />
        </ListItemAvatar>
        <ListItemText
          primary={comment.comment}
          secondary={`Posted ${timeAgo(comment.created_at)} by ${comment.created_by}`}
        />
        {comment.author ? <DeleteIcon /> : ''}
      </ListItem>
      <Divider variant="inset" component="li" />
    </Collapse>
  )
}

export default CommentListItem;