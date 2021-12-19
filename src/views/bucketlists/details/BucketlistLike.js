import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';

const LikeIcon = styled(FavoriteIcon)`
  color: ${props => props.liked === 'true' ? 'red' : '#757575'};
`;

const BucketlistLike = ({ appState }) => {

  const { bucketlist, setBucketlist, bucketlists, setBucketlists } = appState;

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (bucketlists && bucketlists.find(list => list.id === bucketlist.id).liked) {
      setLiked(true);
    }
  }, [bucketlist.id, bucketlists, setLiked]);

  const handleLikeToggle = () => {
    const method = liked ? 'dislike' : 'like';
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${bucketlist.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ method })
    })
      .then(res => res.json())
      .then(json => {
        setBucketlist({
          ...bucketlist,
          likes: json
        })
        setBucketlists(bucketlists.map(mappedList => {
          if (mappedList.id === bucketlist.id) {
            return {
              ...mappedList,
              liked: !liked
            }
          }
          return mappedList;
        }))
        setLiked(!liked);
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <IconButton onClick={handleLikeToggle}>
        <LikeIcon liked={`${liked}`} />
      </IconButton>
      {bucketlist.likes}
    </>
  )  
}

export default BucketlistLike;