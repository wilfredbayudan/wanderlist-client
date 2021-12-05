import React from 'react';
import styled from 'styled-components';
import { AddLocationAltOutlined } from '@mui/icons-material';

import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';

const ListItem = styled.li`
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  color: #aaaaaa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:hover {
    background-color: #d7f2ff;
    color: #000000;
  }
`;

const LocationLabel = styled.span`
  cursor: pointer;
`

const AddLocation = styled(AddLocationAltOutlined)`
  cursor: pointer;
  color: #1295a9;
  &:hover {
    color: #44c4d8;
  }
`;

const SearchResultsItem = ({ appState, location, authPin }) => {

  const { setBucketlist, bucketlist, setViewport, viewport, setLoaderStatus } = appState;

  const handleLabelClick = () => {
    setViewport({
      ...viewport,
      longitude: location.lng,
      latitude: location.lat,
      zoom: 6,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    });
  }

  const handleAddClick = (e) => {
    e.stopPropagation();
    const postBody = {
      lng: location.lng,
      lat: location.lat,
      label: location.label
    }
    setLoaderStatus(true);
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${bucketlist.id}/locations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'PIN': authPin
      },
      body: JSON.stringify(postBody)
    })
      .then(res => res.json())
      .then(json => {
        setLoaderStatus(false);
        setBucketlist({
          ...bucketlist,
          bucketlist_locations: [
            ...bucketlist.bucketlist_locations,
            json
          ]
        });
        console.log(json);
      })
      .catch(err => console.log(err))
  }
  
  return (
    <ListItem onClick={handleLabelClick}>
      <LocationLabel>{location.label}</LocationLabel>
      <AddLocation onClick={handleAddClick} />
    </ListItem>
  )
}

export default SearchResultsItem; 