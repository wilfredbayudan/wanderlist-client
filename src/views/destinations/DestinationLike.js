import React, { useState, useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import styled from 'styled-components';

const LikeIcon = styled(FavoriteIcon)`
  color: ${props => props.liked === 'true' ? 'red' : '#757575'};
`;

const DestinationLike = ({ destination, appState }) => {

  const { destinations, setDestinations } = appState;

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (destination.liked) {
      setLiked(true);
    }
  }, [destination.liked, setLiked]);

  const handleLikeToggle = () => {
    const method = liked ? 'dislike' : 'like';
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/destinations/${destination.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ method })
    })
      .then(res => res.json())
      .then(json => {
        setDestinations(destinations.map(mappedDestination => {
          if (mappedDestination.id === destination.id) {
            return {
              ...mappedDestination,
              likes: json,
              liked: true
            }
          }
          return mappedDestination;
        }))
        setLiked(!liked);
      })
      .catch(err => console.log(err))
  }

  return (
    <IconButton onClick={handleLikeToggle}>
      <LikeIcon liked={`${liked}`} />
    </IconButton>
  )  
}

export default DestinationLike;