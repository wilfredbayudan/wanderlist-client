import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

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

  useEffect(() => {
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/destinations/${id}`)
      .then(res => res.json())
      .then(json => setDestination(json))
      .catch(err => console.log(err));
  }, [id])

  if (destination && destination.id === id) {

    const latLong = `${destination.lat}° ${destination.lng}°`;

    return (
      <>
        <Label>{destination.label}</Label>
        <Coordinates>{latLong}</Coordinates>
        <SeenOn>Seen on <b>{destination.bucketlists.length}</b> bucketlists</SeenOn>
        <Likes><b>{destination.likes}</b> likes</Likes>
      </>
    )
  }
  return <CircularProgress />;
}

export default DestinationPopup;