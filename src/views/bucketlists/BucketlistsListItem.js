import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import mapLocationData from '../../utils/mapLocationData';
import { FlyToInterpolator } from 'react-map-gl';
import { easeCubic } from 'd3-ease';
import { EditOutlined } from '@mui/icons-material';

const Bucketlist = styled.li`
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
  cursor: pointer;
  background-color: ${props => props.isAuthor ? '#f1ffb6' : '#ffffff'};
  &:hover {
    background-color: #d7f2ff;
  }
`;

const Name = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
`;

const Description = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9em;
  color: #1a1a1a;
`;

const CreatedBy = styled.span`
  display: block;
  width: 100%;
  text-align: right; 
  font-size: 0.8em;
  color: #696969;
`;

const BucketlistsListItem = ( { appState: { bucketlist, setLoaderStatus, setMarkers, setBucketlist, setCurrentList, viewport, setViewport }, selectedBucketlist }) => {

  const navigate = useNavigate();

  const coordinates = mapLocationData(selectedBucketlist.bucketlist_destinations);

  function assignMarkers() {
    setMarkers(coordinates);
    setCurrentList({ name: selectedBucketlist.name, created_by: selectedBucketlist.created_by })
    setViewport({
      ...viewport,
      latitude: 11.1784,
      longitude: 90.8129,
      zoom: 1,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator(),
      transitionEasing: easeCubic
    });
  }

  function handleClick() {
    if (bucketlist && bucketlist.id === selectedBucketlist.id) {
      navigate(`/bucketlists/${selectedBucketlist.id}${selectedBucketlist.pin ? `?pin=${selectedBucketlist.pin}` : ''}`);
      return;
    }
    setLoaderStatus(true);
    fetch(`${process.env.REACT_APP_WANDERLIST_API}/bucketlists/${selectedBucketlist.id}`)
    .then(res => res.json())
    .then(json => {
      setLoaderStatus(false);
      setBucketlist(json);
      navigate(`/bucketlists/${selectedBucketlist.id}${selectedBucketlist.pin ? `?pin=${selectedBucketlist.pin}` : ''}`);
    })
    .catch(err => console.log(err));
  }

  return (
    <Bucketlist onMouseEnter={assignMarkers} onClick={handleClick} isAuthor={selectedBucketlist.pin}>
      <Name>{selectedBucketlist.name}{selectedBucketlist.pin ? <EditOutlined /> : null}</Name>
      <Description>{selectedBucketlist.description}</Description>
      <CreatedBy>By {selectedBucketlist.created_by}</CreatedBy>
    </Bucketlist>
  )
};

export default BucketlistsListItem;
