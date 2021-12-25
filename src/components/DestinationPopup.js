import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import DestinationLike from '../views/destinations/DestinationLike';
import SeenOnBucketlistsDialog from './SeenOnBucketlistsDialog';

const PopupDiv = styled.div`
  cursor: default;
`;

const Label = styled.h3`
  margin: 2px;
  padding: 0;
`;

const Coordinates = styled.p`
  margin: 10px 2px;
  padding: 0;
  font-size: 0.8em;
  color: #9a9a9a;
`;

const SeenOn = styled.p`
  margin: 10px 2px;
  padding: 0;
  font-size: 0.8em;
  color: #373737;
  cursor: pointer;
  &:hover {
    color: #008ed9;
  }
`;

const Likes = styled.p`
  margin: 10px 2px 2px 2px;
  padding: 0;
  font-size: 0.9em;
  color: #373737;
  text-align: right;
`;

const DestinationPopup = ({ appState, id }) => {

  const [destination, setDestination] = useState(null);
  const [showSeenOn, setShowSeenOn] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/destinations/${id}`)
      .then(res => res.json())
      .then(json => setDestination(json))
      .catch(err => console.log('An error!'));
  }, [id])

  if (destination && destination.id === id) {

    const latLong = `${destination.lat}° ${destination.lng}°`;

    return (
      <PopupDiv>
        <Label>{destination.label}</Label>
        <Coordinates>{latLong}</Coordinates>
        <SeenOn onClick={() => setShowSeenOn(true)}>Seen on <b>{destination.bucketlists.length}</b> bucketlists</SeenOn>
        <SeenOnBucketlistsDialog showSeenOn={showSeenOn} setShowSeenOn={setShowSeenOn} destination={destination} />
        <Likes><DestinationLike appState={appState} destination={destination} setPopupDestination={setDestination} /><b>{destination.likes}</b> likes</Likes>
      </PopupDiv>
    )
  }
  return <CircularProgress />;
}

export default DestinationPopup;